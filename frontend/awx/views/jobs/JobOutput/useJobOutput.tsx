import { useCallback, useRef, useState, useEffect } from 'react';
import { ItemsResponse, requestGet } from '../../../../common/crud/Data';
import { useAwxWebSocketSubscription } from '../../../common/useAwxWebSocket';
import { Job } from '../../../interfaces/Job';
import { JobEvent } from '../../../interfaces/JobEvent';
import type { IToolbarFilter } from '../../../../../framework';

type WebSocketMessage = {
  group_name?: string;
  type?: string;
  status?: string;
  inventory_id?: number;
};

const WS_EVENTS_BATCH_SIZE = 15;

export function useJobOutput(
  job: Job,
  toolbarFilters: IToolbarFilter[],
  filters: Record<string, string[]>,
  pageSize: number
) {
  const isQuerying = useRef({ querying: false });
  const [jobEventCount, setJobEventCount] = useState(1);
  const [jobEvents, setJobEvents] = useState<Record<number, JobEvent>>({});

  const getJobOutputEvent = useCallback((counter: number) => jobEvents[counter + 1], [jobEvents]);

  const isFiltered = Object.keys(filters).length > 0;
  const queryJobOutputEvent = useCallback(
    (counter: number) => {
      const jobEvent = jobEvents[counter + 1];
      if (jobEvent || isQuerying.current.querying) {
        return jobEvent;
      }
      isQuerying.current.querying = true;

      const eventsSlug = job.type === 'job' ? 'job_events' : 'events';

      const page = Math.floor((counter + 1) / pageSize) + 1;
      const filterString = getFiltersQueryString(toolbarFilters, filters);
      const qsParts = ['order_by=counter', `page=${page}`, `page_size=${pageSize}`];
      if (filterString) {
        qsParts.push(filterString);
      }
      requestGet<ItemsResponse<JobEvent>>(
        `/api/v2/${job.type}s/${job.id.toString()}/${eventsSlug}/?${qsParts.join('&')}`
      )
        .then((itemsResponse) => {
          setJobEventCount(itemsResponse.count);
          setJobEvents((jobEvents) => {
            jobEvents = { ...jobEvents };
            let i = Object.keys(jobEvents).length + 1;
            for (const jobEvent of itemsResponse.results) {
              if (isFiltered) {
                jobEvents[i] = jobEvent;
                i++;
              } else {
                jobEvents[jobEvent.counter] = jobEvent;
              }
            }
            return jobEvents;
          });
        })
        .catch()
        .finally(() => {
          isQuerying.current.querying = false;
        });
      return jobEvent;
    },
    [job.id, job.type, jobEvents, pageSize, filters, toolbarFilters, isFiltered]
  );

  const batchedEvents = useRef([] as JobEvent[]);
  const batchTimeout = useRef(undefined as ReturnType<typeof setTimeout> | undefined);
  const addBatchedEvents = useCallback(() => {
    if (isFiltered) {
      return;
    }
    const maxCounter = batchedEvents.current.reduce(
      (max, event) => Math.max(max, event.counter),
      jobEventCount
    );
    setJobEvents((jobEvents) => {
      batchedEvents.current.forEach((message: JobEvent) => {
        jobEvents[message.counter] = message;
      });
      batchedEvents.current = [];
      return jobEvents;
    });
    setJobEventCount(maxCounter);
  }, [isFiltered, jobEventCount]);

  const eventGroup = `${job.type}_events`;
  const handleWebSocketMessage = useCallback(
    (message?: WebSocketMessage) => {
      if (message?.group_name === eventGroup) {
        const jobEvent = message as JobEvent;
        batchedEvents.current.push(jobEvent);
        clearTimeout(batchTimeout.current);
        if (batchedEvents.current.length >= WS_EVENTS_BATCH_SIZE) {
          addBatchedEvents();
        } else {
          batchTimeout.current = setTimeout(addBatchedEvents, 500);
        }
      }
    },
    [addBatchedEvents, eventGroup]
  );
  useAwxWebSocketSubscription(
    {
      control: ['limit_reached_1'],
      jobs: ['summary', 'status_changed'],
      [eventGroup]: [job.id],
    },
    handleWebSocketMessage as (message: unknown) => void
  );

  useEffect(() => {
    setJobEventCount(1);
    setJobEvents({});
  }, [filters]);

  return { jobEventCount, getJobOutputEvent, queryJobOutputEvent };
}

function getFiltersQueryString(
  toolbarFilters: IToolbarFilter[],
  filters: Record<string, string[]>
) {
  if (!filters) {
    return '';
  }
  const parts = [];
  for (const key in filters) {
    const toolbarFilter = toolbarFilters?.find((filter) => filter.key === key);
    if (toolbarFilter) {
      const values = filters[key];
      if (values.length > 0) {
        // queryString ? (queryString += '&') : (queryString += '?');
        if (values.length > 1) {
          parts.push(values.map((value) => `or__${toolbarFilter.query}=${value}`).join('&'));
        } else {
          parts.push(`${toolbarFilter.query}=${values.join(',')}`);
        }
      }
    }
  }
  return parts.join('&');
}

// Autogenerated file. Please do not modify.

// If you want to modify fields to interface, create new one in the folder above and create interface with the same name.
// You can then add, modify or even delete existing interface fields. Delete is done with Omit, note however it returns new interface.
// Those autogenerated interfaces does not contains all types, some of them are unknown - those are candidates for custom modification.
// See readme in folder above for more information.

/* eslint-disable @typescript-eslint/no-empty-interface */

// URL of interface:
// /api/pulp/api/v3/workers/{pulp_id}/

/*
Base serializer for use with :class:`pulpcore.app.models.Model`

This ensures that all Serializers provide values for the 'pulp_href` field.

The class provides a default for the ``ref_name`` attribute in the
ModelSerializers's ``Meta`` class. This ensures that the OpenAPI definitions
of plugins are namespaced properly.
*/
export interface WorkerResponse {
  pulp_href: string;
  // Timestamp of creation.
  pulp_created: string;
  // The name of the worker.
  name: string;
  // Timestamp of the last time the worker talked to the service.
  last_heartbeat: string;
  // The task this worker is currently executing, or empty if the worker is not currently assigned to a task.
  current_task: string;
}

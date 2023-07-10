import '@patternfly/patternfly/components/Wizard/wizard.css';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PageWizardContext } from './PageWizardState';

type PageWizardStepState =
  | {
      title: string;
      hasError?: boolean;
      substeps?: { [title: string]: ReactNode | undefined };
    }
  | undefined;

const PageWizardStepContext = createContext<
  [PageWizardStepState, Dispatch<SetStateAction<PageWizardStepState>>]
>([undefined, () => null]);

// const usePageWizardStepSetError()

export type PageWizardStepProps = {
  title: string;
  children?: ReactNode;
  content?: ReactNode;
};

export function PageWizardStep(props: PageWizardStepProps) {
  const { title, children, content } = props;
  const [wizardState, setWizardState] = useContext(PageWizardContext);

  let className = 'pf-c-wizard__nav-link';
  if (wizardState.activeStep === title || wizardState.activeParent === title) {
    className += ' pf-m-current';
  }

  const [parentStepState, setParentStepState] = useContext(PageWizardStepContext);

  const [stepState, setStepState] = useState<PageWizardStepState>({ title });

  useEffect(() => {
    setParentStepState((parentStepState) => {
      if (!parentStepState) return undefined;
      const substeps = parentStepState?.substeps ?? {};
      substeps[title] = content;
      return { ...parentStepState, substeps };
    });
    return () =>
      setParentStepState((parentStepState) => {
        if (!parentStepState || !parentStepState.substeps) return undefined;
        const substeps = { ...parentStepState.substeps };
        delete substeps[title];
        return { ...parentStepState, substeps };
      });
  }, [content, setParentStepState, title]);

  const onClick = () => {
    setWizardState((wizardState) => {
      if (stepState?.substeps) {
        const subStepTitles = Object.keys(stepState?.substeps);
        if (subStepTitles.length > 0) {
          const subStepContent = stepState.substeps[subStepTitles[0]];
          return {
            ...wizardState,
            activeParent: title,
            activeStep: subStepTitles[0],
            content: subStepContent,
          };
        }
      }
      return { ...wizardState, activeParent: parentStepState?.title, activeStep: title, content };
    });
  };

  return (
    <PageWizardStepContext.Provider value={[stepState, setStepState]}>
      <li className="pf-c-wizard__nav-item">
        <button className={className} onClick={onClick}>
          {title}
        </button>
        {children && <ol className="pf-c-wizard__nav-list">{children}</ol>}
      </li>
    </PageWizardStepContext.Provider>
  );
}

import '@patternfly/patternfly/components/Wizard/wizard.css';
import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';

export interface PageWizardState {
  activeParent?: string;
  activeStep?: string;
  content?: ReactNode;
}

export const PageWizardContext = createContext<
  [PageWizardState, Dispatch<SetStateAction<PageWizardState>>]
>([{}, () => null]);

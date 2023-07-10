import '@patternfly/patternfly/components/Wizard/wizard.css';
import { ReactNode, useEffect, useState } from 'react';
import { useFrameworkTranslations } from '../useFrameworkTranslations';
import { PageWizardContext, PageWizardState } from './PageWizardState';

export interface PageWizardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  onClose: () => void;
}

export function PageWizard<T = unknown>(props: PageWizardProps) {
  const { title, description, children, onClose } = props;
  const [wizardState, setWizardState] = useState<PageWizardState>({});
  const [translations] = useFrameworkTranslations();

  useEffect(() => {
    setWizardState((wizardState) => {
      if (!wizardState.activeStep) {
        setWizardState({ ...wizardState, activeStep: 'Step 2' });
      }
      return wizardState;
    });
  }, []);

  // const [isSubmitted, setIsSubmitted] = useState(false);
  // if (isSubmitted) {
  //   return <ProgressState onClose={onClose} />;
  // }

  return (
    <PageWizardContext.Provider value={[wizardState, setWizardState]}>
      <div className="pf-c-wizard">
        <div className="pf-c-wizard__header">
          <button
            className="pf-c-button pf-m-plain pf-c-wizard__close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
          <h1 className="pf-c-title pf-m-3xl pf-c-wizard__title">{title}</h1>
          <div className="pf-c-wizard__description">{description}</div>
        </div>
        <button
          aria-label="Wizard Header Toggle"
          className="pf-c-wizard__toggle"
          aria-expanded="false"
        >
          <span className="pf-c-wizard__toggle-list">
            {wizardState.activeParent && (
              <span className="pf-c-wizard__toggle-list-item">
                <span className="pf-c-wizard__toggle-num">2</span>
                {wizardState.activeParent}
                <i
                  className="fas fa-angle-right pf-c-wizard__toggle-separator"
                  aria-hidden="true"
                />
              </span>
            )}
            <span className="pf-c-wizard__toggle-list-item">{wizardState.activeStep}</span>
          </span>
          <span className="pf-c-wizard__toggle-icon">
            <i className="fas fa-caret-down" aria-hidden="true"></i>
          </span>
        </button>
        <div className="pf-c-wizard__outer-wrap">
          <div className="pf-c-wizard__inner-wrap">
            <nav className="pf-c-wizard__nav" aria-label="Steps">
              {children && <ol className="pf-c-wizard__nav-list">{children}</ol>}
            </nav>
            <main className="pf-c-wizard__main">
              <div
                className="pf-c-wizard__main-body"
                style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}
              >
                {wizardState.content}
              </div>
            </main>
          </div>
          <footer className="pf-c-wizard__footer">
            <button className="pf-c-button pf-m-primary" type="submit">
              {translations.nextText}
            </button>
            <button className="pf-c-button pf-m-secondary" type="button">
              {translations.backText}
            </button>
            <div className="pf-c-wizard__footer-cancel">
              <button className="pf-c-button pf-m-link" type="button" onClick={onClose}>
                {translations.cancelText}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </PageWizardContext.Provider>
  );
}

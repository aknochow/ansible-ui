/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@patternfly/patternfly/components/Wizard/wizard.css';
import { Form } from '@patternfly/react-core';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function PageWizardForm(props: { children?: ReactNode; defaultValues?: any }) {
  const form = useForm({ defaultValues: props.defaultValues });
  // const { formState } = form;
  // const { errors } = formState;
  // const hasErrors = Object.keys(errors).length > 0;
  return (
    <FormProvider {...form}>
      <Form>{props.children}</Form>
    </FormProvider>
  );
}

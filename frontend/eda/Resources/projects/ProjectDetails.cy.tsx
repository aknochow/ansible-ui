/* eslint-disable i18next/no-literal-string */
import { ProjectDetails } from './ProjectDetails';
import { RouteObj } from '../../../Routes';

describe('ProjectDetails', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/eda/v1/projects/1/',
      },
      {
        fixture: 'edaProject.json',
      }
    );
  });

  it('Component renders and displays project', () => {
    it('Project details are displayed correctly', () => {
      cy.mount(<ProjectDetails />, {
        path: RouteObj.EdaProjectDetails,
        initialEntries: [RouteObj.EdaProjectDetails.replace(':id', '1')],
      });
      cy.get('#name').should('have.text', 'Sample Project');
      cy.contains('dd#name>div', 'Sample Project').should('exist');
      cy.get('#description').should('have.text', 'Sample project description');
      cy.get('#source-control-type').should('have.text', 'Git');
      cy.get('#source-control-url').should('have.text', 'https://github.com/ansible/ansible-ui');
      cy.get('#import-state').should('have.text', 'completed');
    });
  });
});

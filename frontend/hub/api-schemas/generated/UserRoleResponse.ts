// Autogenerated file. Please do not modify.

// If you want to modify fields to interface, create new one in the folder above and create interface with the same name.
// You can then add, modify or even delete existing interface fields. Delete is done with Omit, note however it returns new interface.
// Those autogenerated interfaces does not contains all types, some of them are unknown - those are candidates for custom modification.
// See readme in folder above for more information.

/* eslint-disable @typescript-eslint/no-empty-interface */

// URL of interface:
// /api/pulp/api/v3/users/{user_pk}/roles/{pulp_id}/

// Serializer for UserRole.
export interface UserRoleResponse {
  pulp_href: string;
  // Timestamp of creation.
  pulp_created: string;
  role: string;
  // pulp_href of the object for which role permissions should be asserted. If set to 'null', permissions will act on either domain or model-level.
  content_object: string;
  description: string;
  permissions: unknown;
  // Domain this role should be applied on, mutually exclusive with content_object.
  domain: string;
}

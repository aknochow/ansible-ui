// Autogenerated file. Please do not modify.

// If you want to modify fields to interface, create new one in the folder above and create interface with the same name.
// You can then add, modify or even delete existing interface fields. Delete is done with Omit, note however it returns new interface.
// Those autogenerated interfaces does not contains all types, some of them are unknown - those are candidates for custom modification.
// See readme in folder above for more information.

/* eslint-disable @typescript-eslint/no-empty-interface */

// URL of interface:
// /api/pulp/api/v3/remotes/
// Part of response collection PulpItemsResponse

/*
Every remote defined by a plugin should have a Remote serializer that inherits from this
class. Please import from `pulpcore.plugin.serializers` rather than from this module directly.
*/
export interface RemoteResponse {
  pulp_href: string;
  // Timestamp of creation.
  pulp_created: string;
  // A unique name for this remote.
  name: string;
  // The URL of an external content source.
  url: string;
  // A PEM encoded CA certificate used to validate the server certificate presented by the remote server.
  ca_cert: string;
  // A PEM encoded client certificate used for authentication.
  client_cert: string;
  // If True, TLS peer validation must be performed.
  tls_validation: boolean;
  // The proxy URL. Format: scheme://host:port
  proxy_url: string;
  pulp_labels: unknown;
  // Timestamp of the most recent update of the remote.
  pulp_last_updated: string;
  // Total number of simultaneous connections. If not set then the default value will be used.
  download_concurrency: number;
  // Maximum number of retry attempts after a download failure. If not set then the default value (3) will be used.
  max_retries: number;
  /*
	The policy to use when downloading content.

* `immediate` - immediate
* `When syncing, download all metadata and content now.` - When syncing, download all metadata and content now.
	*/
  policy: unknown;
  // aiohttp.ClientTimeout.total (q.v.) for download-connections. The default is null, which will cause the default from the aiohttp library to be used.
  total_timeout: number;
  // aiohttp.ClientTimeout.connect (q.v.) for download-connections. The default is null, which will cause the default from the aiohttp library to be used.
  connect_timeout: number;
  // aiohttp.ClientTimeout.sock_connect (q.v.) for download-connections. The default is null, which will cause the default from the aiohttp library to be used.
  sock_connect_timeout: number;
  // aiohttp.ClientTimeout.sock_read (q.v.) for download-connections. The default is null, which will cause the default from the aiohttp library to be used.
  sock_read_timeout: number;
  // Headers for aiohttp.Clientsession
  headers: unknown;
  // Limits requests per second for each concurrent downloader
  rate_limit: number;
  // List of hidden (write only) fields
  hidden_fields: unknown;
}

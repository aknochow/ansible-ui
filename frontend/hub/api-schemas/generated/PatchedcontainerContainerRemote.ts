// Autogenerated file. Please do not modify.

// If you want to modify fields to interface, create new one in the folder above and create interface with the same name.
// You can then add, modify or even delete existing interface fields. Delete is done with Omit, note however it returns new interface.
// Those autogenerated interfaces does not contains all types, some of them are unknown - those are candidates for custom modification.
// See readme in folder above for more information.

/* eslint-disable @typescript-eslint/no-empty-interface */

// A Serializer for ContainerRemote.
export interface PatchedcontainerContainerRemote {
  // A unique name for this remote.
  name: string;
  // The URL of an external content source.
  url: string;
  // A PEM encoded CA certificate used to validate the server certificate presented by the remote server.
  ca_cert: string;
  // A PEM encoded client certificate used for authentication.
  client_cert: string;
  // A PEM encoded private key used for authentication.
  client_key: string;
  // If True, TLS peer validation must be performed.
  tls_validation: boolean;
  // The proxy URL. Format: scheme://host:port
  proxy_url: string;
  // The username to authenticte to the proxy.
  proxy_username: string;
  // The password to authenticate to the proxy. Extra leading and trailing whitespace characters are not trimmed.
  proxy_password: string;
  // The username to be used for authentication when syncing.
  username: string;
  // The password to be used for authentication when syncing. Extra leading and trailing whitespace characters are not trimmed.
  password: string;
  pulp_labels: unknown;
  // Total number of simultaneous connections. If not set then the default value will be used.
  download_concurrency: number;
  // Maximum number of retry attempts after a download failure. If not set then the default value (3) will be used.
  max_retries: number;
  /*
	
        immediate - All manifests and blobs are downloaded and saved during a sync.
        on_demand - Only tags and manifests are downloaded. Blobs are not
                    downloaded until they are requested for the first time by a client.
        streamed - Blobs are streamed to the client with every request and never saved.
        

* `immediate` - When syncing, download all metadata and content now.
* `on_demand` - When syncing, download metadata, but do not download content now. Instead, download content as clients request it, and save it in Pulp to be served for future client requests.
* `streamed` - When syncing, download metadata, but do not download content now. Instead,download content as clients request it, but never save it in Pulp. This causes future requests for that same content to have to be downloaded again.
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
  // Name of the upstream repository
  upstream_name: string;
  /*
	
            A list of tags to include during sync.
            Wildcards *, ? are recognized.
            'include_tags' is evaluated before 'exclude_tags'.
            
	*/
  include_tags: unknown;
  /*
	
            A list of tags to exclude during sync.
            Wildcards *, ? are recognized.
            'exclude_tags' is evaluated after 'include_tags'.
            
	*/
  exclude_tags: unknown;
  // A URL to a sigstore to download image signatures from
  sigstore: string;
}

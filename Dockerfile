# base
FROM --platform=${TARGETPLATFORM:-linux/amd64} nginx:alpine as base
EXPOSE 8080
RUN mkdir -m 0775 -p /var/lib/nginx
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /var/lib/nginx
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
RUN adduser -S nonroot -u 1001 -G root

# awx-ui
FROM --platform=${TARGETPLATFORM:-linux/amd64} base as awx-ui
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /nginx/awx.conf /etc/nginx/templates/default.conf.template
COPY /build/awx /usr/share/nginx/html
USER nonroot

# hub-ui
FROM --platform=${TARGETPLATFORM:-linux/amd64} base as hub-ui
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /nginx/hub.conf /etc/nginx/templates/default.conf.template
COPY /build/hub /usr/share/nginx/html
USER nonroot

# eda-ui
FROM --platform=${TARGETPLATFORM:-linux/amd64} base as eda-ui
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY /nginx/eda.conf /etc/nginx/templates/default.conf.template
COPY /build/eda /usr/share/nginx/html
USER nonroot
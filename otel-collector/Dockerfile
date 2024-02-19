FROM otel/opentelemetry-collector-contrib:0.90.1
COPY config.yaml /etc/otel-collector-config.yaml
EXPOSE 4317 4318
ENV OTLPHTTP_ENDPOINT1 to_be_defined
ENV OTLPHTTP_AUTH_HEADER1 to_be_defined
CMD ["--config", "/etc/otel-collector-config.yaml"]

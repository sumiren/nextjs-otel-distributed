import {NodeSDK} from '@opentelemetry/sdk-node'
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-http'
import {Resource} from '@opentelemetry/resources'
import {SemanticResourceAttributes} from '@opentelemetry/semantic-conventions'
import {SimpleSpanProcessor, AlwaysOnSampler} from '@opentelemetry/sdk-trace-node'
import {HttpInstrumentation} from "@opentelemetry/instrumentation-http";
import {SimpleLogRecordProcessor} from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import {W3CTraceContextPropagator} from "@opentelemetry/core";

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'nextjs-otel-frontend',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
  })),
  logRecordProcessor: new SimpleLogRecordProcessor(new OTLPLogExporter({
    url: 'http://localhost:4318/v1/logs',
  })),
  instrumentations: [
    new HttpInstrumentation()
  ],

  textMapPropagator: new W3CTraceContextPropagator(),

})

sdk.start()
console.log('opentelemetry initialized')

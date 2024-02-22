import {NodeSDK} from '@opentelemetry/sdk-node'
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-http'
import {Resource} from '@opentelemetry/resources'
import {SemanticResourceAttributes} from '@opentelemetry/semantic-conventions'
import {SimpleSpanProcessor} from '@opentelemetry/sdk-trace-node'

import {SimpleLogRecordProcessor} from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import {getNodeAutoInstrumentations} from "@opentelemetry/auto-instrumentations-node";
import {PrismaInstrumentation} from "@prisma/instrumentation";


const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'nextjs-otel-backend',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces"
  })),
  logRecordProcessor: new SimpleLogRecordProcessor(new OTLPLogExporter({
    url: 'http://localhost:4318/v1/logs',
  })),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": { enabled: false }

    }),
    new PrismaInstrumentation()
  ]
})
sdk.start()
console.log('opentelemetry initialized')

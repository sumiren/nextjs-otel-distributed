import {context, trace} from "@opentelemetry/api";

export const calcTraceparent = () => {
  const currentSpan = trace.getSpan(context.active());
  const traceId = currentSpan?.spanContext().traceId;
  const spanId = currentSpan?.spanContext().spanId;
  return `00-${traceId}-${spanId}-01`;
}

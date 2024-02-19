import * as logsAPI from "@opentelemetry/api-logs";
import {SeverityNumber} from "@opentelemetry/api-logs";
import {calcTraceparent} from "@/utils/otel";


export const dynamic = 'force-dynamic'

const logger = logsAPI.logs.getLogger('default');

export default async function Home() {
  const response = await fetch("http://localhost:3001/animals", {
    headers: {
      'traceparent': calcTraceparent(),
    }
  })

  const animals = await response.json()

  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: `got animals from backend: ${JSON.stringify(animals)}`,
    attributes: { 'log.type': 'LogRecord' },
  });

  return (
    <main>
      {
        animals.map((animal: any) => (
          <div key={animal.id}>{animal.name}</div>
        ))
      }
    </main>
  );
}

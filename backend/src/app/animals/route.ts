import {SeverityNumber} from "@opentelemetry/api-logs";
import * as logsAPI from "@opentelemetry/api-logs";
import { PrismaClient } from '@prisma/client'
import {NextResponse} from "next/server";

const prisma = new PrismaClient()
const logger = logsAPI.logs.getLogger('default');

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  const animals = await prisma.animals.findMany()

  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: `selected animals from db: ${JSON.stringify(animals)}`,
    attributes: { 'log.type': 'LogRecord' },
  });

  return NextResponse.json(animals)
}

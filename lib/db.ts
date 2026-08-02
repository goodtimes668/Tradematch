import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = process.env.DATABASE_PATH || path.join(DATA_DIR, "tradematch.db");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

declare global {
  // eslint-disable-next-line no-var
  var __tradematchDb: Database.Database | undefined;
}

function createConnection() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      zip TEXT,
      trade_interest TEXT,
      availability TEXT,
      message TEXT,
      quiz_result TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      school TEXT,
      source TEXT NOT NULL DEFAULT 'apply'
    );
  `);
  return db;
}

export const db = globalThis.__tradematchDb ?? createConnection();

if (process.env.NODE_ENV !== "production") {
  globalThis.__tradematchDb = db;
}

import type { Lead, LeadStatus } from "./lead-types";
export type { Lead, LeadStatus } from "./lead-types";
export { LEAD_STATUSES } from "./lead-types";

export interface NewLead {
  name: string;
  email: string;
  phone?: string;
  zip?: string;
  trade_interest?: string;
  availability?: string;
  message?: string;
  quiz_result?: string;
  source?: string;
}

export function insertLead(lead: NewLead): Lead {
  const stmt = db.prepare(`
    INSERT INTO leads (name, email, phone, zip, trade_interest, availability, message, quiz_result, source)
    VALUES (@name, @email, @phone, @zip, @trade_interest, @availability, @message, @quiz_result, @source)
  `);
  const info = stmt.run({
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? null,
    zip: lead.zip ?? null,
    trade_interest: lead.trade_interest ?? null,
    availability: lead.availability ?? null,
    message: lead.message ?? null,
    quiz_result: lead.quiz_result ?? null,
    source: lead.source ?? "apply",
  });
  return getLead(Number(info.lastInsertRowid))!;
}

export function getLead(id: number): Lead | undefined {
  return db.prepare(`SELECT * FROM leads WHERE id = ?`).get(id) as
    | Lead
    | undefined;
}

export function listLeads(): Lead[] {
  return db
    .prepare(`SELECT * FROM leads ORDER BY created_at DESC, id DESC`)
    .all() as Lead[];
}

export function updateLeadStatus(
  id: number,
  status: LeadStatus,
  school?: string | null
): Lead | undefined {
  db.prepare(
    `UPDATE leads SET status = ?, school = COALESCE(?, school) WHERE id = ?`
  ).run(status, school ?? null, id);
  return getLead(id);
}

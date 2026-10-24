import fs from "fs";
import path from "path";
import initSqlJs, { Database, SqlValue } from "sql.js";

export type DbRow = Record<string, SqlValue>;

const SCHEMA = `
CREATE TABLE IF NOT EXISTS staff (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  pw_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin','staff')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('pending','active','disabled')),
  failed_logins INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  pw_hash TEXT NOT NULL,
  failed_logins INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  consent_at TEXT,
  created_at TEXT NOT NULL,
  anonymised_at TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token_hash TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL CHECK (kind IN ('staff','customer')),
  user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  revoked_at TEXT
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  service_sku TEXT NOT NULL,
  price_hkd INTEGER NOT NULL,
  stage TEXT NOT NULL DEFAULT 'New Trial Lead',
  attendance_hint TEXT,
  payment_status TEXT NOT NULL DEFAULT 'unpaid',
  reminder_status TEXT NOT NULL DEFAULT 'none',
  consent_pics INTEGER NOT NULL DEFAULT 0,
  consent_at TEXT,
  marketing_opt_in INTEGER NOT NULL DEFAULT 0,
  customer_id TEXT,
  is_sample INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lead_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lead_id TEXT NOT NULL,
  at TEXT NOT NULL,
  by_name TEXT NOT NULL,
  text TEXT NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lead_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lead_id TEXT NOT NULL,
  from_stage TEXT,
  to_stage TEXT NOT NULL,
  at TEXT NOT NULL,
  by_name TEXT NOT NULL,
  why TEXT NOT NULL DEFAULT '',
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  customer_id TEXT,
  service_sku TEXT NOT NULL,
  price_hkd INTEGER NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  attendance TEXT NOT NULL DEFAULT 'booked',
  created_at TEXT NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reminders (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  lead_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'pending',
  scheduled_for TEXT NOT NULL,
  draft_whatsapp TEXT,
  draft_email_subject TEXT,
  draft_email_body TEXT,
  updated_at TEXT NOT NULL,
  UNIQUE (booking_id, kind),
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

let dbInstance: Database | null = null;
let initPromise: Promise<Database> | null = null;
let dbPathCached: string | null = null;

function resolveDbPath(): string {
  if (dbPathCached) return dbPathCached;
  const env = process.env.DATABASE_PATH;
  dbPathCached = env
    ? path.isAbsolute(env)
      ? env
      : path.join(process.cwd(), env)
    : path.join(process.cwd(), "data", "salon.db");
  return dbPathCached;
}

export function persist(): void {
  if (!dbInstance) return;
  const p = resolveDbPath();
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const data = dbInstance.export();
  fs.writeFileSync(p, Buffer.from(data));
}

function applySchema(database: Database): void {
  database.run(SCHEMA);
  database.run(`CREATE INDEX IF NOT EXISTS leads_stage_idx ON leads(stage)`);
  database.run(`CREATE INDEX IF NOT EXISTS bookings_date_idx ON bookings(date)`);
  database.run(`CREATE INDEX IF NOT EXISTS reminders_state_idx ON reminders(state)`);
}

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;
  if (!initPromise) {
    initPromise = (async () => {
      const wasmPath = path.join(
        process.cwd(),
        "node_modules",
        "sql.js",
        "dist",
        "sql-wasm.wasm",
      );
      const SQL = await initSqlJs({
        locateFile: () => wasmPath,
      });
      const p = resolveDbPath();
      fs.mkdirSync(path.dirname(p), { recursive: true });
      if (fs.existsSync(p)) {
        const buf = fs.readFileSync(p);
        dbInstance = new SQL.Database(buf);
      } else {
        dbInstance = new SQL.Database();
      }
      applySchema(dbInstance);
      persist();
      return dbInstance;
    })();
  }
  return initPromise;
}

export function all(
  database: Database,
  sql: string,
  params: SqlValue[] = [],
): DbRow[] {
  const stmt = database.prepare(sql);
  stmt.bind(params);
  const out: DbRow[] = [];
  while (stmt.step()) out.push(stmt.getAsObject() as DbRow);
  stmt.free();
  return out;
}

export function one(
  database: Database,
  sql: string,
  params: SqlValue[] = [],
): DbRow | null {
  const rows = all(database, sql, params);
  return rows[0] ?? null;
}

export function run(
  database: Database,
  sql: string,
  params: SqlValue[] = [],
): void {
  database.run(sql, params);
}

export function nextId(prefix: string): string {
  const n = randomDigits(4);
  return `${prefix}${n}${Date.now().toString(36).slice(-4)}`;
}

function randomDigits(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
}

/** Reset singleton — used by seed script after writing file */
export function resetDbSingleton(): void {
  if (dbInstance) {
    try {
      dbInstance.close();
    } catch {
      /* ignore */
    }
  }
  dbInstance = null;
  initPromise = null;
}

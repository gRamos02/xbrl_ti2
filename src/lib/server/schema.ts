import { date, integer, numeric, pgTable,serial,text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users",{
	id: serial('id').primaryKey(),
	fullName: text('full_name'),
    password: varchar('password')
})

export const xbrlFilesTable = pgTable("xbrl_files", {
	id: serial('id').primaryKey(),
    user_id: integer(),
    file_name: varchar().notNull(),
    storage_url: text(),
})

export const xbrlMetadataTable = pgTable("xbrl_metadata",{
	id: serial('id').primaryKey(),
    xbrl_file_id: integer(),
    key_name: varchar(),
    key_value: text(),
})

export const financialReportsTable = pgTable("financial_reports", {
    id: serial("id").primaryKey(), // Identificador único del reporte
    reportName: varchar("report_name"), //Nombre asociadoa  reporte
    companyId: integer("company_id"), // Relación con la empresa
    periodStart: date("period_start"), // Fecha de inicio del período
    periodEnd: date("period_end"), // Fecha de fin del período
    currencyCode: varchar("currency_code", { length: 3 }), // Código de la moneda (ISO 4217)
    totalRevenue: numeric("total_revenue", { precision: 18, scale: 2 }), // Ingresos totales
    totalExpenses: numeric("total_expenses", { precision: 18, scale: 2 }), // Gastos totales
    netIncome: numeric("net_income", { precision: 18, scale: 2 }), // Utilidad neta
    totalAssets: numeric("total_assets", { precision: 18, scale: 2 }), // Activos totales
    totalLiabilities: numeric("total_liabilities", { precision: 18, scale: 2 }), // Pasivos totales
    equity: numeric("equity", { precision: 18, scale: 2 }), // Patrimonio o capital contable
    cashAndCashEquivalents: numeric("cash_and_cash_equivalents", { precision: 18, scale: 2 }), // Efectivo y equivalentes de efectivo
    accountsReceivable: numeric("accounts_receivable", { precision: 18, scale: 2 }), // Cuentas por cobrar
    inventory: numeric("inventory", { precision: 18, scale: 2 }), // Inventario
    accountsPayable: numeric("accounts_payable", { precision: 18, scale: 2 }), // Cuentas por pagar
    longTermDebt: numeric("long_term_debt", { precision: 18, scale: 2 }), // Deuda a largo plazo
    retainedEarnings: numeric("retained_earnings", { precision: 18, scale: 2 }), // Utilidades retenidas
    reportGeneratedAt: timestamp("report_generated_at", { withTimezone: true }).defaultNow(), // Fecha y hora de generación del reporte
});


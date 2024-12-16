// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

export interface FinancialReport {
	id: number; // Identificador único del reporte
	reportName?: string;
	companyId?: number; // Identificador de la empresa (relacionado con la tabla de usuarios u otra tabla de empresas)
	periodStart?: string; // Fecha de inicio del período (formato YYYY-MM-DD)
	periodEnd?: string; // Fecha de fin del período (formato YYYY-MM-DD)
	currencyCode?: string; // Código de la moneda (ISO 4217, ej. USD, MXN)
	totalRevenue?: number; // Ingresos totales
	totalExpenses?: number; // Gastos totales
	netIncome?: number; // Utilidad neta
	totalAssets?: number; // Activos totales
	totalLiabilities?: number; // Pasivos totales
	equity?: number; // Patrimonio o capital contable
	cashAndCashEquivalents?: number; // Efectivo y equivalentes de efectivo
	accountsReceivable?: number; // Cuentas por cobrar
	inventory?: number; // Inventario
	accountsPayable?: number; // Cuentas por pagar
	longTermDebt?: number; // Deuda a largo plazo
	retainedEarnings?: number; // Utilidades retenidas
	reportGeneratedAt?: string; // Fecha y hora de generación del reporte (formato ISO 8601)
}

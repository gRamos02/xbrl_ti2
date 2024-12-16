// import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { financialReportsTable } from '$lib/server/schema';

export const GET: RequestHandler = async () => {
    const results = await db.query.financialReportsTable.findMany();
    return json(results); // Devuelve una lista de reportes financieros
};

export const POST: RequestHandler = async ({ request }) => {
    const columns = await request.json();
    console.log(columns);
    // const newUser = await db.insert(usersTable).values({ fullName, phone });
    const newReport = await db.insert(financialReportsTable)
    .values({
        reportName: columns.report_name,
        totalRevenue: columns.total_revenue ?? null,
        totalExpenses: columns.total_expenses ?? null,
        netIncome: columns.net_income ?? null,
        totalAssets: columns.total_assets ?? null,
        totalLiabilities: columns.total_liabilities ?? null,
        equity: columns.equity ?? null,
        cashAndCashEquivalents: columns.cash_and_cash_equivalents ?? null,
        accountsReceivable: columns.accounts_receivable ?? null,
        inventory: columns.inventory ?? null,
        accountsPayable: columns.accounts_payable ?? null,
        longTermDebt: columns.long_term_debt ?? null,
        retainedEarnings: columns.retained_earnings ?? null,
    })
    .returning();

    return json(newReport[0]);
};
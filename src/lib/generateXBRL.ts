import { create } from 'xmlbuilder2';
import type { FinancialReport } from '../app';

// Función para generar el XML
export const generateXbrl = (financialReport: FinancialReport): string => {
    const {
        companyId,
        // reportName,
        periodStart,
        periodEnd,
        currencyCode,
        totalRevenue,
        totalExpenses,
        netIncome,
        totalAssets,
        totalLiabilities,
        equity,
        cashAndCashEquivalents,
        accountsReceivable,
        inventory,
        accountsPayable,
        longTermDebt,
        retainedEarnings,
        reportGeneratedAt
    } = financialReport;

    // Crear el XML base
    const root = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('xbrl', { xmlns: 'http://www.xbrl.org/2003/instance' });

    // Contexto
    const context = root.ele('context', { id: 'Period' });
    const entity = context.ele('entity');
    entity.ele('identifier', { scheme: 'http://example.com/companies' }).txt(companyId ? companyId.toString() : '');
    context.ele('period')
        .ele('startDate').txt(periodStart ?? '').up()
        .ele('endDate').txt(periodEnd ?? '').up();

    // Unidad
    if (currencyCode) {
        root.ele('unit', { id: 'USD' })
            .ele('measure').txt(`iso4217:${currencyCode}`);
    }

    // Función auxiliar para agregar un elemento solo si tiene valor
    const addItem = (name: string, value: number | string | undefined) => {
        if (value !== null && value !== undefined) {
            root.ele('item', { name, contextRef: 'Period', unitRef: 'USD' })
                .txt(typeof value === 'number' ? value.toFixed(2) : value);
        }
    };

    // Agregar elementos financieros
    addItem('TotalRevenue', totalRevenue);
    addItem('TotalExpenses', totalExpenses);
    addItem('NetIncome', netIncome);
    addItem('TotalAssets', totalAssets);
    addItem('TotalLiabilities', totalLiabilities);
    addItem('Equity', equity);
    addItem('CashAndCashEquivalents', cashAndCashEquivalents);
    addItem('AccountsReceivable', accountsReceivable);
    addItem('Inventory', inventory);
    addItem('AccountsPayable', accountsPayable);
    addItem('LongTermDebt', longTermDebt);
    addItem('RetainedEarnings', retainedEarnings);

    // Fecha de generación
    if (reportGeneratedAt) {
        root.ele('generatedAt').txt(reportGeneratedAt);
    }

    return root.end({ prettyPrint: true });
};

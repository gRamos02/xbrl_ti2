// import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;
    console.log(id)
    const result = await db.query.financialReportsTable.findFirst({
        where: (financialReportsTable, { eq }) => eq(financialReportsTable.id, id)
    })
	return json(result); 
};
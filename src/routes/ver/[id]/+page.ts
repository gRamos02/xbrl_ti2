// src/routes/ver/[id]/+page.ts
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const { id } = params;
    console.log('ID: ', id)
    // Llamada a tu API para obtener los datos del reporte
    const response = await fetch(`/api/reportes/${id}`);
    if (!response.ok) {
        throw new Error('No se pudo cargar el reporte');
    }
    const reporte = await response.json();

    // Devuelve el reporte como datos para la página
    return {
        reporte
    };
};

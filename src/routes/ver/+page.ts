import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    // Llamada a tu API para obtener todos los reportes
    const response = await fetch('/api/reportes');
    if (!response.ok) {
        throw new Error('No se pudieron cargar los reportes financieros');
    }
    const reportes = await response.json();

    // Devuelve los reportes como datos para la página
    return {
        reportes
    };
};

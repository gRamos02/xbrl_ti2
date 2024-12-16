<script lang="ts">
	import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    export let data: PageData;

    function navigateToReport(id: number) {
        // window.location.href = `/ver/${id}`;
        goto(`/ver/${id}`)
    }
</script>

<div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold">Reportes Financieros</h1>
    <p class="text-lg">Haz clic en un reporte para ver los detalles</p>

    <!-- Tabla de reportes -->
    <table class="table table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
            <tr>
                <th class="border px-4 py-2">ID</th>
                <th class="border px-4 py-2">Nombre del Reporte</th>
                <th class="border px-4 py-2">Fecha de Generación</th>
            </tr>
        </thead>
        <tbody>
            {#each data.reportes as reporte}
                <tr class="cursor-pointer hover:bg-gray-100" on:click={() => navigateToReport(reporte.id)}>
                    <td class="border px-4 py-2">{reporte.id}</td>
                    <td class="border px-4 py-2">{reporte.reportName}</td>
                    <td class="border px-4 py-2">{new Date(reporte.reportGeneratedAt).toLocaleDateString()}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

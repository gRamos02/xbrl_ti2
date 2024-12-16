<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { generateXbrl } from '$lib/generateXBRL';
	import { isLoading } from '$lib/stores/loadingStore';
	import LoadingModal from '$lib/components/LoadingModal.svelte';
	export let data: PageData;

	// Filtrar claves con valores no nulos
	let filteredData: { key: string; value: any }[] = [];

	onMount(() => {
		// Filtra las propiedades del objeto reporte que no sean nulas
		filteredData = Object.entries(data.reporte)
			.filter(([_, value]) => value !== null)
			.map(([key, value]) => ({ key, value }));
	});

	// Descargar archivo JSON
	function downloadJSON() {
		const jsonContent = JSON.stringify(data.reporte, null, 2);
		const blob = new Blob([jsonContent], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `reporte_${data.reporte.reportName}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}

	// Descargar archivo XBRL
	function downloadXBRL() {
		isLoading.set(true);
		try {
			// Genera el contenido del XBRL a partir del reporte
			const xbrlContent = generateXbrl(data.reporte);

			// Crea un Blob con el contenido generado
			const blob = new Blob([xbrlContent], { type: 'application/xml' });
			const url = URL.createObjectURL(blob);

			// Crea un enlace para descargar el archivo
			const a = document.createElement('a');
			a.href = url;
			a.download = `reporte_${data.reporte.reportName}.xbrl`;
			a.click();

			// Libera el objeto URL
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error al generar o descargar el archivo XBRL:', error);
		}finally{
			isLoading.set(false);
		}
	}
</script>

<LoadingModal show={$isLoading} />
<div class="container mx-auto p-6">
	<h1 class="text-3xl font-bold">Reporte: {data.reporte.reportName}</h1>
	<p class="text-lg">ID del Reporte: {data.reporte.id}</p>

	<!-- Tabla de valores no nulos -->
	<table class="table table-auto w-full mt-4">
		<thead>
			<tr>
				<th class="px-4 py-2">Columna</th>
				<th class="px-4 py-2">Valor</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredData as { key, value }}
				<tr>
					<td class="border px-4 py-2">{key}</td>
					<td class="border px-4 py-2">{value}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<!-- Botones para descargar -->
	<div class="mt-4">
		<button class="btn variant-filled" on:click={downloadJSON}>
			Descargar JSON 
		</button>
		<button class="btn variant-filled-primary" on:click={downloadXBRL}>
			Descargar XBRL 
		</button>
	</div>
</div>

<script lang="ts">
	import { FileButton } from '@skeletonlabs/skeleton';
	import { parseXbrlFile } from 'xbrl-parser';
	let xbrlData: Array<{ concept: string; value: string }> = [];
	let fileError = '';

	// Función para manejar la carga del archivo y procesarlo con xbrl-parser
	async function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target?.files?.[0];
		if (file && file.type === 'text/xml') {
			const reader = new FileReader();
			reader.onload = async () => {
				try {
					// Procesa el archivo XBRL con la librería xbrl-parser
					const xbrl = parseXbrlFile(reader.result as string);
					
					// Convierte los datos a un formato que podamos usar en una tabla
					xbrlData = Object.entries(xbrl).map(([concept, value]) => ({ concept, value: value.toString() }));
                    console.log(xbrlData)
					fileError = '';
				} catch (error) {
					fileError = 'Error al procesar el archivo XBRL.';
				}
			};
			reader.onerror = () => {
				fileError = 'Error al leer el archivo.';
			};
			reader.readAsText(file);
		} else {
			fileError = 'Por favor, sube un archivo XBRL válido (XML).';
		}
	}
</script>

<div class="container mx-auto p-8 space-y-6">
	<h1 class="text-3xl font-bold">Visualización de Datos XBRL</h1>
	<p class="text-lg">Sube un archivo XBRL para ver sus datos clave en formato de tabla.</p>

	<!-- Componente para subir archivos -->
	<div class="btn-group-vertical variant-filled">
		<FileButton name="files" button="Subir" width="w-full" on:change={handleFileUpload}>Subir</FileButton>
	</div>

	{#if fileError}
		<p class="text-red-500">{fileError}</p>
	{/if}

	<!-- Tabla para mostrar los datos del archivo XBRL -->
	{#if xbrlData.length > 0}
		<div class="table-container mt-6 overflow-auto">
			<table class="table table-hover w-full border-collapse border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="border p-2">Concepto</th>
						<th class="border p-2">Valor</th>
					</tr>
				</thead>
				<tbody>
					{#each xbrlData as row}
						<tr>
							<td class="border p-2">{row.concept}</td>
							<td class="border p-2">{row.value}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

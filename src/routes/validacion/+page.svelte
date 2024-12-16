<script lang="ts">
	import { CodeBlock, FileButton } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let xblrContent = '';
	let fileError = '';

	// Función para manejar la carga del archivo
	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target?.files?.[0];
		if (file && file.type === 'text/xml') {
			const reader = new FileReader();
			reader.onload = () => {
				xblrContent = reader.result as string;
				fileError = '';
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
	<h1 class="text-3xl font-bold">Lectura de Archivos XBRL</h1>
	<p class="text-lg">Sube un archivo XBRL para visualizar su contenido y facilitar su análisis.</p>

	<!-- Componente para subir archivos -->
	<div class="btn-group-vertical variant-filled">
		<!-- <button>Actualizar</button> -->
		<button>Borrar</button>
		<FileButton name="files" button="Subir" width="w-full" on:change={handleFileUpload}>Subir</FileButton>
		<button>Descargar</button>
	</div>

	{#if fileError}
		<p class="text-red-500">{fileError}</p>
	{/if}

	<!-- Bloque de código para mostrar el contenido del archivo XBRL -->
	{#if xblrContent}
		<h2 class="text-2xl font-semibold mt-6">Contenido del Archivo XBRL</h2>
		<CodeBlock language="xml" code={xblrContent}></CodeBlock>
	{/if}
</div>

<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import logotec from '$lib/assets/logotec.gif'

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores, Toast, Modal } from '@skeletonlabs/skeleton';
	import LoadingModal from '$lib/components/LoadingModal.svelte';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { isLoading } from '$lib/stores/loadingStore';
	initializeStores();
</script>
<LoadingModal show={$isLoading}/>
<Modal />
<Toast/>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<img src={logotec} class="w-24 h-24" alt="teclogo" />
				<strong class="text-xl uppercase">XBLR Servicios</strong>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<!-- Lista de enlaces de navegación -->
				<nav class="flex space-x-4">
					<a href="/" class="text-lg text-white-700 hover:text-blue-200 btn variant-filled">Inicio</a>
					<a href="/validacion" class="text-lg text-white-700 hover:text-blue-200 btn variant-filled">Validar</a>
					<a href="/generacion" class="text-lg text-white-700 hover:text-blue-200 btn variant-filled">Generación de Archivos</a>
					<a href="/ver" class="text-lg text-white-700 hover:text-blue-200 btn variant-filled">Registros</a>
					<!-- <a href="/ejemplos" class="text-lg text-white-700 hover:text-blue-200 btn variant-filled">Ejemplos y Tutoriales</a> -->
					<a href="/contacto" class="text-lg text-white-700 hover:text-blue-200 btn variant-filled">Acerca de</a>
				</nav>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

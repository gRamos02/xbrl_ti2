<script lang="ts">
	import { goto } from '$app/navigation';
	import LoadingModal from '$lib/components/LoadingModal.svelte';
	import { isLoading } from '$lib/stores/loadingStore';
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type ModalSettings,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let columns: { column: string; value: string }[] = [];
	let selectedColumn = ''; // Columna seleccionada
	let columnValue = ''; // Valor para la columna seleccionada

	// Opciones del dropdown
	const columnOptions: AutocompleteOption<string>[] = [
		{ label: 'Total Revenue', value: 'total_revenue' },
		{ label: 'Total Expenses', value: 'total_expenses' },
		{ label: 'Net Income', value: 'net_income' },
		{ label: 'Total Assets', value: 'total_assets' },
		{ label: 'Total Liabilities', value: 'total_liabilities' },
		{ label: 'Equity', value: 'equity' },
		{ label: 'Cash and Cash Equivalents', value: 'cash_and_cash_equivalents' },
		{ label: 'Accounts Receivable', value: 'accounts_receivable' },
		{ label: 'Inventory', value: 'inventory' },
		{ label: 'Accounts Payable', value: 'accounts_payable' },
		{ label: 'Long Term Debt', value: 'long_term_debt' },
		{ label: 'Retained Earnings', value: 'retained_earnings' }
	];

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	function addColumn() {
		if (selectedColumn && columnValue) {
			columns = [{ column: selectedColumn, value: columnValue }, ...columns];
			// columns.push({ column: selectedColumn, value: columnValue });
			selectedColumn = '';
			columnValue = '';
		}
	}

	function removeColumn(column: string) {
		const aux = columns.filter((c) => c.column != column);
		columns = [...aux];
		console.log(columns);
	}

	function generateXBRL() {
		console.log('Generating XBRL:', columns);
		// Lógica para generar el archivo XBRL aquí
	}

	async function save() {
		isLoading.set(true);
		let reportName;
		const modal: ModalSettings = {
			type: 'prompt',
			// Data
			title: 'Introduce nombre.',
			body: 'Introduce un nombre para el registro',
			// Populates the input value and attributes
			valueAttr: { type: 'text', minlength: 3, maxlength: 10, required: true },
			// Returns the updated response value
			response: async (r: string) => {
				if (!r) {
					isLoading.set(false);
					return;
				}
				reportName = r;
				columns = [{ column: 'report_name', value: reportName }, ...columns];
				//Add
				const body = columns.reduce(
					(acc, item) => {
						acc[item.column] = item.value;
						return acc;
					},
					{} as Record<string, string>
				);

				const response = await fetch('/api/reportes', {
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'content-type': 'application/json'
					}
				});

				const report = await response.json();
				console.log($isLoading)
				console.log(report);
				isLoading.set(false)
				goto(`/ver/${report.id}`)
			}
		};
		modalStore.trigger(modal);
	}
</script>

<LoadingModal show={$isLoading} />
<div class="container mx-auto p-6 space-y-6">
	<h1 class="text-3xl font-bold">Generar Archivo XBRL</h1>
	<p class="text-lg">Selecciona columnas y asigna valores para crear un reporte financiero.</p>

	<!-- Sección para seleccionar columnas -->
	<div class="flex flex-col space-y-4">
		<div>
			<h2 class="text-xl font-semibold">Tipo de Columna</h2>
			<select
				class="select"
				placeholder="Selecciona una columna"
				bind:value={selectedColumn}
				on:select={(e) => {
					console.log(e);
				}}
				on:change={(e) => {
					console.log(selectedColumn);
				}}
			>
				{#each columnOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>
		<div>
			<h2 class="text-xl font-semibold">Valor de la Columna</h2>
			<input
				type="text"
				class="input input-filled w-full"
				bind:value={columnValue}
				placeholder="Escribe el valor"
			/>
		</div>
		<button class="btn variant-filled" on:click={addColumn}> Agregar Columna </button>
	</div>

	<!-- Tabla de columnas seleccionadas -->
	{#if columns.length > 0}
		<div class="table-container mt-6">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Columna</th>
						<th>Valor</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{#each columns as { column, value }, index}
						<tr>
							<td>{column}</td>
							<td>{value}</td>
							<td>
								<button
									class="btn btn-sm variant-filled-error"
									on:click={() => removeColumn(column)}
								>
									Eliminar
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	<!-- Botón para generar el archivo -->
	<div class="flex space-x-2">
		<button class="btn variant-filled-tertiary mt-6" on:click={save}> Guardar Registro </button>
		<button class="btn variant-filled mt-6" on:click={generateXBRL}>
			Solo Generar Archivo XBRL
		</button>
	</div>
</div>

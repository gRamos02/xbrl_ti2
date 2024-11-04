<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Bienvenido a servicios de XBLR</h2>
		<!-- / -->
		<div class="flex justify-center">
			<p class="text-2xl text-justify mb-4">
				Bienvenidos a nuestra plataforma de servicios para archivos XBRL, diseñada para simplificar
				la lectura, generación y análisis de datos financieros. A través de nuestras herramientas,
				ofrecemos una experiencia amigable y completa para gestionar información en formato XBRL,
				facilitando la comprensión de datos complejos y la creación de informes personalizados.
				Nuestros servicios incluyen:
			</p>
		</div>

		<!-- Lista de servicios -->
		<ul class="text-left text-xl list-disc list-inside space-y-4">
			<li>
				<strong>Lectura de Archivos XBRL:</strong> Cargue archivos XBRL para visualizar su contenido
				de manera clara y estructurada, facilitando la interpretación de datos financieros complejos.
			</li>
			<li>
				<strong>Generación de Archivos XBRL:</strong> Cree archivos XBRL a partir de datos
				personalizados, cumpliendo con los estándares y regulaciones para informes financieros
				digitales.
			</li>
			<li>
				<strong>Análisis y Visualización de Datos:</strong> Visualice datos clave mediante gráficos
				interactivos y tablas personalizables para comprender mejor la información financiera y las
				tendencias.
			</li>
			<li>
				<strong>Ejemplos y Tutoriales:</strong> Acceda a ejemplos prácticos y guías detalladas sobre
				el uso de archivos XBRL, ideal para usuarios que buscan aprender o perfeccionar sus
				habilidades.
			</li>
		</ul>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>

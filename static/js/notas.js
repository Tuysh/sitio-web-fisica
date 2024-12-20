/* === COMPONENTE === */

class Router {
  constructor(basePath = './pages/') {
    this.basePath = basePath; // Directorio base donde se encuentran los archivos HTML
    this.currentRoute = null;
    this.mainContent = document.getElementById('main-content');

    this.initializeEvents();
    this.loadRoute('home'); // Ruta inicial
  }

  initializeEvents() {
    document.querySelectorAll('[data-route]').forEach((button) => {
      button.addEventListener('click', (e) => {
        const route = e.target.closest('[data-route]').id; // Usa el id del botón
        this.loadRoute(route);
      });
    });
  }

  loadRoute(route) {
    this.currentRoute = route;

    // Limpiar el contenido previo
    this.mainContent.innerHTML = '';

    // Crear y configurar el iframe
    const iframe = document.createElement('iframe');
    iframe.src = `${this.basePath}${route}.html`; // Construir la ruta automáticamente
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';

    // Agregar el iframe al contenedor principal
    this.mainContent.appendChild(iframe);

    // Actualizar la clase activa en el menú
    document.querySelectorAll('[data-route]').forEach((button) => {
      if (button.id === route) {
        button.classList.add('bg-gray-700');
      } else {
        button.classList.remove('bg-gray-700');
      }
    });
  }
}

class BotonComponente extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const name = this.getAttribute("name") || "No Name";
    const idName = this.getAttribute("idName") || "id";

    this.shadowRoot.innerHTML = `
      <style>

        button {
          border: none;
        }

        button:hover {
          background-color: rgb(55 65 81 / 0.8);
        }

        .w-full {
          width: 100%;
        }

        .text-left {
          text-align: left;
        }

        .px-3 {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }

        .py-2 {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .rounded {
          border-radius: 0.25rem;
        }

        .hover\:bg-gray-700:hover {
            background-color: rgb(55 65 81 / var(1, 1));
        }

        .text-sm {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }

        button,
        input,
        optgroup,
        select,
        textarea {
          font-family: inherit;
          /* 1 */
          font-feature-settings: inherit;
          /* 1 */
          font-variation-settings: inherit;
          /* 1 */
          font-size: 100%;
          /* 1 */
          font-weight: inherit;
          /* 1 */
          line-height: inherit;
          /* 1 */
          letter-spacing: inherit;
          /* 1 */
          color: inherit;
          /* 1 */
          margin: 0;
          /* 2 */
          padding: 0;
          /* 3 */
        }

        button,
        select {
          text-transform: none;
        }


        button,
        input:where([type='button']),
        input:where([type='reset']),
        input:where([type='submit']) {
          -webkit-appearance: button;
          /* 1 */
          background-color: transparent;
          /* 2 */
          background-image: none;
          /* 2 */
        }

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
          height: auto;
        }

        ::-webkit-file-upload-button {
          -webkit-appearance: button;
          /* 1 */
          font: inherit;
          /* 2 */
        }

        button,
        [role="button"] {
          cursor: pointer;
        }

        :disabled {
          cursor: default;
        }


      </style>
      <button id="${idName}" data-route class="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-sm">
        <i class="fas fa-file-alt mr-2"></i> ${name}
      </button>
    `;

  }

  connectedCallback() {
    const router = new Router();
  }
}

customElements.define("boton-component", BotonComponente)

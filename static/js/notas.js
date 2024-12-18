class Router {
  constructor(routes) {
    this.routes = routes
    this.currentRoute = 'home'
    this.mainContent = document.getElementById('main-content')

    this.initializeEvents()
    this.loadRoute('home')
  }

  initializeEvents() {
    document.querySelectorAll('[data-route]').forEach(button => {
      button.addEventListener('click', (e) => {
        const route = e.target.closest('[data-route]').dataset.route
        this.loadRoute(route)
      })
    })
  }

  loadRoute(route) {
    this.currentRoute = route

    this.mainContent.innerHTML = this.routes[route]

    document.querySelectorAll('[data-route]').forEach(button => {
      if (button.dataset.route === route) {
        button.classList.add('bg-gray-700')
      } else {
        button.classList.remove('bg-gray-700')
      }
    })
  }
}

const routes = {
  home: `
        <div class="max-w-4xl mx-auto">
          <h1 class="text-2xl font-semibold mb-6">Bienvenido al Curso de Física</h1>
          <div class="bg-gray-800 rounded-lg p-6">
            <p class="text-gray-300">Selecciona una sección del menú para comenzar.</p>
          </div>
        </div>
      `,
  first: `
        <div class="max-w-4xl mx-auto">
          <h1 class="text-2xl font-semibold mb-6">Campo Eléctrico</h1>

          <div class="space-y-6">
            <div class="bg-gray-800 rounded-lg p-6 space-y-4">
              <h2 class="text-xl font-medium">Introducción al Campo Eléctrico</h2>

              <p class="text-gray-300">
                El campo eléctrico es un concepto fundamental en el estudio del electromagnetismo.
                Representa la influencia que una carga eléctrica ejerce sobre el espacio que la rodea.
              </p>

              <div class="grid grid-cols-2 gap-6 mt-6">
                <div class="bg-gray-700 p-4 rounded-lg">
                  <div class="flex justify-center mb-4">
                    <svg class="w-32 h-32" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#60A5FA" stroke-width="2" />
                      <line x1="50" y1="50" x2="90" y2="50" stroke="#60A5FA" stroke-width="2" />
                      <line x1="50" y1="50" x2="50" y2="90" stroke="#60A5FA" stroke-width="2" />
                      <line x1="50" y1="50" x2="10" y2="50" stroke="#60A5FA" stroke-width="2" />
                      <line x1="50" y1="50" x2="50" y2="10" stroke="#60A5FA" stroke-width="2" />
                      <line x1="50" y1="50" x2="78" y2="78" stroke="#60A5FA" stroke-width="2" />
                      <line x1="50" y1="50" x2="22" y2="78" stroke="#60A5FA" stroke-width="2" />
                      <line x1="50" y1="50" x2="78" y2="22" stroke="#60A5FA" stroke-width="2" />
                      <line x1="50" y1="50" x2="22" y2="22" stroke="#60A5FA" stroke-width="2" />
                    </svg>
                  </div>
                  <p class="text-sm text-gray-300 text-center">
                    Representación de líneas de campo eléctrico
                  </p>
                </div>

                <div class="bg-gray-700 p-4 rounded-lg">
                  <div class="text-center space-y-4">
                    <h3 class="font-medium">Ecuación Fundamental</h3>
                    <div class="text-2xl font-mono">E = F/q</div>
                    <p class="text-sm text-gray-300">
                      Donde:<br>
                      E = Campo eléctrico<br>
                      F = Fuerza eléctrica<br>
                      q = Carga de prueba
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
  second: `
        <div class="max-w-4xl mx-auto">
          <h1 class="text-2xl font-semibold mb-6">Magnetismo</h1>
          <div class="bg-gray-800 rounded-lg p-6">
            <p class="text-gray-300">Contenido del segundo parcial...</p>
          </div>
        </div>
      `
}

const router = new Router(routes)

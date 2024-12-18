const body = document.querySelector('body');

/* === COMPONENTES === */

class NavbarComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const level = this.getAttribute("level") || "./";

    this.shadowRoot.innerHTML = `
      <style>
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: white;
          height: 60px;
          z-index: 1000;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 20px;
          font-weight: bold;
          color: #171717;
          text-decoration: none;
        }

        .nav-menu {
          display: flex;
          gap: 24px;
          list-style: none;
        }

        .nav-link {
          color: #171717;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
        }

        .menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          z-index: 2000;
          display: none;
          flex-direction: column;
          padding: 20px;
        }

        .mobile-menu.active {
          display: flex;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 40px;
        }

        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: flex-start;
          padding: 20px;
        }

        .mobile-menu-links a {
          color: #171717;
          text-decoration: none;
          font-size: 24px;
          font-weight: 500;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }

          .menu-button {
            display: block;
          }
        }

        @media (hover: hover) {
          .nav-link {
            position: relative;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 12px;
            right: 12px;
            height: 2px;
            background-color: #171717;
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }

          .nav-link:hover::after {
            transform: scaleX(1.5);
          }
        }

      </style>
      <nav class="navbar">
        <div class="navbar-container">
          <a href="${level}/index.html" class="logo">FísicaLab</a>
          <ul class="nav-menu">
            <li><a href="${level}notas/index.html" class="nav-link">Notas</a></li>
            <li><a href="${level}simuladores/index.html" class="nav-link">Simuladores</a></li>
          </ul>
          <button class="menu-button" id="menuBtn">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </nav>
      <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <a href="${level}/index.html" class="logo">FísicaLab</a>
            <button class="close-button" id="closeBtn">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                </svg>
            </button>
        </div>
        <div class="mobile-menu-links">
            <a href="${level}notas/index.html">Notas</a>
            <a href="${level}simuladores/index.html">Simuladores</a>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const menuBtn = shadow.getElementById("menuBtn");
    const closeBtn = shadow.getElementById("closeBtn");
    const mobileMenu = shadow.getElementById("mobileMenu");
    const body = document.body;

    function openMenu() {
      mobileMenu.classList.add("active");
      body.style.overflow = "hidden";
    }

    function closeMenu() {
      mobileMenu.classList.remove("active");
      body.style.overflow = "auto";
    }

    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);

    const mobileLinks = mobileMenu.getElementsByTagName("a");
    for (let link of mobileLinks) {
      link.addEventListener("click", closeMenu);
    }
  }
}

customElements.define("navbar-component", NavbarComponent)

/* === FOOTER === */

const footer = document.createElement('footer');
footer.className = 'footer';
footer.innerHTML = `
<div class="footer-container">
  <p class="footer-link">Hecho con ❤️ </p>
</div>`;

/* === CONFIGURACIÓN DEL LA BARRA PARA MOVILES === */

const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileMenu = document.getElementById('mobileMenu');

function moveToButton(element, parent) {
  parent.appendChild(element)
}


document.addEventListener('DOMContentLoaded', function () {
  moveToButton(footer, body)
})

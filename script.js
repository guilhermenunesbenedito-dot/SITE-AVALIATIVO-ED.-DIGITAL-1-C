// --- GESTÃO DE DADOS (Simulação de API) ---
const filmes = [
    { titulo: "Oppenheimer", nota: "9.2", critica: "Uma obra-prima visual e sonora sobre o dilema humano." },
    { titulo: "Spider-Man: Across the Spider-Verse", nota: "9.5", critica: "A melhor animação da década, com estilo único." },
    { titulo: "Duna: Parte 2", nota: "9.0", critica: "Épico e imersivo. O cinema de ficção científica no seu ápice." },
    { titulo: "Pobres Criaturas", nota: "8.8", critica: "Provocante, bizarro e tecnicamente impecável." },
    { titulo: "Barbie", nota: "8.5", critica: "Uma sátira inteligente com design de produção brilhante." }
];

const faqs = [
    { q: "Quem escreve as críticas?", a: "Nossa equipe de especialistas e editores convidados." },
    { q: "Posso enviar minha avaliação?", a: "Em breve abriremos um portal para usuários logados." }
];

// --- RENDERIZAÇÃO DINÂMICA ---
function initApp() {
    const movieGrid = document.getElementById('movie-grid');
    const faqContainer = document.getElementById('faq-container');
    const carouselContainer = document.getElementById('carousel-container');

    // Cards de Filmes
    movieGrid.innerHTML = filmes.map(f => `
        <article class="card">
            <div class="card-content">
                <span class="rating">★ ${f.nota}</span>
                <h3>${f.titulo}</h3>
                <p>${f.critica}</p>
            </div>
        </article>
    `).join('');

    // Acordeão FAQ
    faqContainer.innerHTML = faqs.map((item, i) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-${i}">
                ${item.q}
            </button>
            <div id="faq-${i}" class="accordion-content">
                <p>${item.a}</p>
            </div>
        </div>
    `).join('');

    // Destaques Carrossel
    carouselContainer.innerHTML = filmes.slice(0, 3).map((f, i) => `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
            <h2>Destaque: ${f.titulo}</h2>
            <p>Nota: ${f.nota}</p>
        </div>
    `).join('');
}

// --- CONTROLES DE ACESSIBILIDADE ---
let currentFontSize = 16;
document.getElementById('font-up').addEventListener('click', () => {
    currentFontSize += 2;
    document.documentElement.style.setProperty('--font-size-base', currentFontSize + 'px');
});

document.getElementById('font-down').addEventListener('click', () => {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.documentElement.style.setProperty('--font-size-base', currentFontSize + 'px');
    }
});

document.getElementById('btn-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// --- LÓGICA DO ACORDEÃO ---
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('accordion-header')) {
        const content = e.target.nextElementSibling;
        const isExpanded = e.target.getAttribute('aria-expanded') === 'true';
        e.target.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('active');
    }
});

// --- LÓGICA DO CARROSSEL ---
let currentSlide = 0;
function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-item');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

document.getElementById('prev').addEventListener('click', () => moveSlide(-1));
document.getElementById('next').addEventListener('click', () => moveSlide(1));

// --- SCROLL REVEAL (Intersection Observer) ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

const colorBoxes = document.querySelectorAll('.color-box');
const contenedorTexto = document.getElementById('contenedor-texto');
const textos = contenedorTexto.querySelectorAll('p');

function elegirColorTexto(color) {
    const colores = {
        red: '#ffffff',
        green: '#ffffff',
        blue: '#ffffff',
        yellow: '#111111',
        orange: '#111111',
        purple: '#ffffff'
    };

    return colores[color] || '#111111';
}

function crearExplosion(color, box) {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.setProperty('--burst-color', color);

    const rect = box.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    explosion.style.left = `${centerX}px`;
    explosion.style.top = `${centerY}px`;

    const particulas = 18;

    for (let i = 0; i < particulas; i++) {
        const particula = document.createElement('span');
        particula.className = 'particle';

        const angulo = (Math.PI * 2 * i) / particulas;
        const distancia = 35 + Math.random() * 65;
        const x = Math.cos(angulo) * distancia;
        const y = Math.sin(angulo) * distancia;

        particula.style.setProperty('--dx', `${x}px`);
        particula.style.setProperty('--dy', `${y}px`);
        particula.style.setProperty('--size', `${5 + Math.random() * 8}px`);
        particula.style.setProperty('--particle-color', color);

        explosion.appendChild(particula);
    }

    document.body.appendChild(explosion);
    setTimeout(() => explosion.remove(), 900);
}

colorBoxes.forEach((box) => {
    box.addEventListener('click', () => {
        const bgColor = box.dataset.bgcolor;
        const textColor = elegirColorTexto(bgColor);

        colorBoxes.forEach((item) => item.classList.remove('selected'));
        box.classList.add('selected');

        contenedorTexto.style.backgroundColor = bgColor;
        textos.forEach((parrafo) => {
            parrafo.style.color = textColor;
        });

        crearExplosion(bgColor, box);
    });
});

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
    });
});

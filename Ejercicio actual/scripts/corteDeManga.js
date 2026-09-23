const enlaceInicio = document.querySelector('.enlace-inicio');

enlaceInicio.addEventListener('click', () => {
        // Quita la clase y fuerza un reflujo para que el navegador pueda reiniciar la animación.
        enlaceInicio.classList.remove('animar-gesto');
        void enlaceInicio.offsetWidth;
        // Vuelve a añadir la clase y activa el pseudo-elemento animado definido en CSS.
        enlaceInicio.classList.add('animar-gesto');
});
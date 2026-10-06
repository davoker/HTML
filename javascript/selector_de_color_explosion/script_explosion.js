/* ================================================================
   SELECTOR DE COLOR - EXPLOSIÓN + JUEGO DE OVNIS
   ----------------------------------------------------------------
   ESTRUCTURA DEL ARCHIVO (por bloques):
     BLOQUE 1 → Selector de color (ejercicio original)
     BLOQUE 2 → Motor de efectos: familias y lanzamiento
     BLOQUE 3 → Los 104 EFECTOS DE CLIC (click en cualquier punto)
     BLOQUE 4 → Los 12 EFECTOS DE BOTÓN (cada pulsación de caja)
     BLOQUE 5 → Clícula global: lanza un efecto aleatorio
     BLOQUE 6 → JUEGO DE OVNIS: 13 naves cada 10 s + puntuación
   No usa ninguna librería: es JavaScript y CSS puros.
   ================================================================ */

/* ================================================================
   BLOQUE 1 - SELECTOR DE COLOR (ejercicio original)
   ================================================================ */

const colorBoxes = document.querySelectorAll('.color-box');
const contenedorTexto = document.getElementById('contenedor-texto');
const textos = contenedorTexto.querySelectorAll('p');

/* Devuelve un color de texto visible para cada fondo de color */
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

/* Explosión "original" del ejercicio: fogonazo + nube hongo +
   18 partículas. Ahora recibe las COORDENADAS (x, y) para poder
   reutilizarse en las cajas y en los ovnis destruidos. */
function crearExplosion(color, x, y) {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.setProperty('--burst-color', color);

    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;

    const particulas = 18;

    for (let i = 0; i < particulas; i++) {
        const particula = document.createElement('span');
        particula.className = 'particle';

        const angulo = (Math.PI * 2 * i) / particulas;
        const distancia = 35 + Math.random() * 65;
        const px = Math.cos(angulo) * distancia;
        const py = Math.sin(angulo) * distancia;

        particula.style.setProperty('--dx', `${px}px`);
        particula.style.setProperty('--dy', `${py}px`);
        particula.style.setProperty('--size', `${5 + Math.random() * 8}px`);
        particula.style.setProperty('--particle-color', color);

        explosion.appendChild(particula);
    }

    document.body.appendChild(explosion);
    setTimeout(() => explosion.remove(), 900);
}

/* ================================================================
   BLOQUE 2 - MOTOR DE EFECTOS
   Un efecto es un objeto { nom, fam, ...parámetros }.
   "fam" (familia) decide QUÉ renderizador lo dibuja y qué keyframes
   de CSS usa. Así 104 efectos comparten solo 13 familias.
   ================================================================ */

/* Límite de grupos de efectos vivos a la vez (evita que un click
   compulsivo sature el navegador) */
let efectosVivos = 0;
const MAX_EFECTOS = 60;

/* Elige un color al azar de la lista; "extra" (el color de la caja
   pulsada) se añade para que aparezca también en el efecto */
function elegirColor(lista, extra) {
    const pool = (extra) ? [extra, extra].concat(lista || []) : (lista || ['#ffffff']);
    return pool[Math.floor(Math.random() * pool.length)];
}

/* Pequeño generador de números aleatorios dentro de un rango */
function azar(min, max) {
    return min + Math.random() * (max - min);
}

/* ---------------------------------------------------------------
   2.1 RENDERIZADORES (uno por familia)
   Cada uno recibe: el contenedor, la definición y el color extra.
   --------------------------------------------------------------- */
const RENDER = {

    /* CHISPAS: partículas disparadas en radial (con gravedad opcional) */
    chispas(cont, d, extra) {
        const n = d.n || 20;
        for (let i = 0; i < n; i++) {
            const p = document.createElement('span');
            p.className = 'part ' + (d.form ? 'f-' + d.form : 'f-circulo');

            let dx;
            let dy;
            if (d.grav) {
                // Con gravedad: deriva lateral y caída hacia abajo
                dx = azar(-0.6, 0.6) * (d.dist || 120);
                dy = azar(60, 150);
            } else {
                // Radial puro
                const ang = (Math.PI * 2 * i) / n + azar(-0.25, 0.25);
                const dist = (d.dist || 120) * azar(0.5, 1.3);
                dx = Math.cos(ang) * dist;
                dy = Math.sin(ang) * dist;
            }

            p.style.setProperty('--dx', dx.toFixed(1) + 'px');
            p.style.setProperty('--dy', dy.toFixed(1) + 'px');
            p.style.setProperty('--s', ((d.size || 11) * azar(0.6, 1.5)).toFixed(1) + 'px');
            p.style.setProperty('--c', elegirColor(d.cols, extra));
            if (d.retardo) {
                p.style.animationDelay = Math.round(azar(0, d.retardo)) + 'ms';
            }
            cont.appendChild(p);
        }
    },

    /* ANILLO: ondas expansivas (1, 2, 3... aros con retardo) */
    anillo(cont, d, extra) {
        const n = d.n || 1;
        for (let i = 0; i < n; i++) {
            const aro = document.createElement('span');
            aro.className = 'aro' + (d.form === 'cuadrado' ? ' aro-cuadrado' : '');
            aro.style.setProperty('--size', ((d.size || 200) + i * 26) + 'px');
            aro.style.setProperty('--grosor', (d.grosor || 6) + 'px');
            aro.style.setProperty('--c', elegirColor(d.cols, extra));
            aro.style.animationDelay = (i * (d.retraso || 170)) + 'ms';
            cont.appendChild(aro);
        }
    },

    /* SÍMBOLOS: emojis o letras lanzados con giro */
    simbolos(cont, d, extra) {
        const sims = d.sims || ['✨'];
        const n = d.n || 10;
        for (let i = 0; i < n; i++) {
            const s = document.createElement('span');
            s.className = 'simbolo';
            s.textContent = sims[Math.floor(Math.random() * sims.length)];

            const ang = (Math.PI * 2 * i) / n + azar(-0.2, 0.2);
            const dist = (d.dist || 130) * azar(0.55, 1.25);

            s.style.setProperty('--dx', (Math.cos(ang) * dist).toFixed(1) + 'px');
            s.style.setProperty('--dy', (Math.sin(ang) * dist).toFixed(1) + 'px');
            s.style.setProperty('--sz', azar(22, 40).toFixed(0) + 'px');
            s.style.setProperty('--c', elegirColor(d.cols, extra));
            if (d.retardo) {
                s.style.animationDelay = Math.round(azar(0, d.retardo)) + 'ms';
            }
            cont.appendChild(s);
        }
    },

    /* TEXTO: palabras grandes que estallan (modo "radiante" opcional) */
    texto(cont, d, extra) {
        const palabras = d.palabras || ['¡BOOM!'];
        palabras.forEach((pal, i) => {
            const p = document.createElement('span');
            p.className = 'palabra';
            p.textContent = pal;
            p.style.setProperty('--sz', (d.size || 44) + 'px');
            p.style.setProperty('--c', elegirColor(d.cols, extra));

            let dx = 0;
            let dy = 0;
            if (d.radiante) {
                // Las palabras salen desplazadas alrededor del centro
                const ang = (Math.PI * 2 * i) / palabras.length;
                const dist = azar(70, 120);
                dx = (Math.cos(ang) * dist).toFixed(0);
                dy = (Math.sin(ang) * dist).toFixed(0);
            } else if (d.dx !== undefined) {
                dx = d.dx;
                dy = d.dy || 0;
            }

            p.style.setProperty('--dx', dx + 'px');
            p.style.setProperty('--dy', dy + 'px');
            p.style.animationDelay = (i * (d.retraso || 120)) + 'ms';
            cont.appendChild(p);
        });
    },

    /* RAYOS: destellos radiales desde el centro (giro opcional) */
    rayos(cont, d, extra) {
        if (d.giro) cont.classList.add('gira');
        const n = d.n || 8;
        for (let i = 0; i < n; i++) {
            const r = document.createElement('span');
            r.className = 'rayo';
            r.style.setProperty('--rot', ((360 / n) * i).toFixed(1) + 'deg');
            r.style.setProperty('--largo', (d.largo || 160) + 'px');
            r.style.setProperty('--grosor', (d.grosor || 8) + 'px');
            r.style.setProperty('--c', elegirColor(d.cols, extra));
            r.style.animationDelay = (i * (d.retraso || 40)) + 'ms';
            cont.appendChild(r);
        }
    },

    /* ESPIRAL: partículas que giran 540º mientras se alejan */
    espiral(cont, d, extra) {
        const n = d.n || 20;
        for (let i = 0; i < n; i++) {
            const p = document.createElement('span');
            p.className = 'espiral-p';
            p.style.setProperty('--a', ((360 / n) * i).toFixed(1) + 'deg');
            p.style.setProperty('--r', (d.radio || 125) + 'px');
            p.style.setProperty('--s', azar(7, 14).toFixed(1) + 'px');
            p.style.setProperty('--c', elegirColor(d.cols, extra));
            p.style.animationDelay = (i * (d.retraso || 45)) + 'ms';
            cont.appendChild(p);
        }
    },

    /* LLUVIA: gotas/símbolos que caen desde arriba con viento */
    lluvia(cont, d, extra) {
        const sims = d.sims;
        const n = d.n || 20;
        const area = d.area || 240;
        const viento = d.viento || 0;
        for (let i = 0; i < n; i++) {
            let p;
            if (sims) {
                p = document.createElement('span');
                p.className = 'simbolo';
                p.textContent = sims[Math.floor(Math.random() * sims.length)];
                p.style.setProperty('--sz', azar(20, 36).toFixed(0) + 'px');
            } else {
                p = document.createElement('span');
                p.className = 'part ' + (d.form ? 'f-' + d.form : 'f-circulo');
                p.style.setProperty('--s', ((d.size || 10) * azar(0.7, 1.5)).toFixed(1) + 'px');
            }

            const x0 = azar(-area / 2, area / 2);
            p.style.setProperty('--x0', x0.toFixed(1) + 'px');
            p.style.setProperty('--x1', (x0 + viento * azar(0.5, 1.5)).toFixed(1) + 'px');
            p.style.setProperty('--y', azar(140, 320).toFixed(0) + 'px');
            p.style.setProperty('--c', elegirColor(d.cols, extra));
            p.style.animationDelay = Math.round(azar(0, d.retraso || 700)) + 'ms';
            cont.appendChild(p);
        }
    },

    /* FUENTE: chorro que sube y vuelve a caer */
    fuente(cont, d, extra) {
        const n = d.n || 28;
        for (let i = 0; i < n; i++) {
            const p = document.createElement('span');
            p.className = 'part ' + (d.form ? 'f-' + d.form : 'f-circulo');
            p.style.setProperty('--ux', azar(-35, 35).toFixed(1) + 'px');
            p.style.setProperty('--uy', azar(70, 160).toFixed(0) + 'px');
            p.style.setProperty('--dx', azar(-75, 75).toFixed(1) + 'px');
            p.style.setProperty('--dy', azar(50, 130).toFixed(0) + 'px');
            p.style.setProperty('--s', ((d.size || 10) * azar(0.6, 1.6)).toFixed(1) + 'px');
            p.style.setProperty('--c', elegirColor(d.cols, extra));
            p.style.animationDelay = Math.round(azar(0, d.retraso || 350)) + 'ms';
            cont.appendChild(p);
        }
    },

    /* HUMO: nubes suaves que ascienden y se deshacen */
    humo(cont, d, extra) {
        const n = d.n || 11;
        for (let i = 0; i < n; i++) {
            const p = document.createElement('span');
            p.className = 'part f-circulo';
            p.style.setProperty('--dx', azar(-60, 60).toFixed(1) + 'px');
            p.style.setProperty('--up', azar(130, 240).toFixed(0) + 'px');
            p.style.setProperty('--s', azar(28, 70).toFixed(0) + 'px');
            p.style.setProperty('--c', elegirColor(d.cols, extra));
            p.style.animationDelay = Math.round(azar(0, d.retraso || 500)) + 'ms';
            cont.appendChild(p);
        }
    },

    /* DISCO: manchas que se expanden, rebotan y revientan */
    disco(cont, d, extra) {
        const n = d.n || 2;
        for (let i = 0; i < n; i++) {
            const p = document.createElement('span');
            p.className = 'part f-circulo';
            p.style.setProperty('--s', Math.round((d.size || 140) * (1 - i * 0.22)) + 'px');
            p.style.setProperty('--c', elegirColor(d.cols, extra));
            p.style.animationDelay = (i * 130) + 'ms';
            cont.appendChild(p);
        }
    },

    /* ESTALLIDO: un símbolo gigante que tiembla y se va */
    estallido(cont, d) {
        const c = document.createElement('span');
        c.className = 'central';
        c.textContent = d.txt || '💥';
        c.style.setProperty('--sz', (d.size || 60) + 'px');
        cont.appendChild(c);
    },

    /* CONFETI: papelitos que revolotean cayendo */
    confeti(cont, d, extra) {
        const n = d.n || 30;
        for (let i = 0; i < n; i++) {
            const p = document.createElement('span');
            p.className = 'part';
            p.style.setProperty('--s', azar(6, 14).toFixed(1) + 'px');
            p.style.setProperty('--h', azar(10, 22).toFixed(1) + 'px');
            p.style.setProperty('--dx', azar(-120, 120).toFixed(1) + 'px');
            p.style.setProperty('--dy', azar(40, 170).toFixed(0) + 'px');
            p.style.setProperty('--r', Math.round(azar(-450, 450)) + 'deg');
            p.style.setProperty('--c', elegirColor(d.cols, extra));
            p.style.animationDelay = Math.round(azar(0, d.retraso || 300)) + 'ms';
            cont.appendChild(p);
        }
    },

    /* ECO: el mismo símbolo repetido con retardo (eco visual) */
    eco(cont, d, extra) {
        const sims = d.sims || ['✨'];
        const n = d.n || 6;
        for (let i = 0; i < n; i++) {
            const s = document.createElement('span');
            s.className = 'simbolo';
            s.textContent = sims[Math.floor(Math.random() * sims.length)];

            const ang = (Math.PI * 2 * i) / n;
            const dist = (d.dist || 150) * (0.7 + i * 0.08);

            s.style.setProperty('--dx', (Math.cos(ang) * dist).toFixed(1) + 'px');
            s.style.setProperty('--dy', (Math.sin(ang) * dist).toFixed(1) + 'px');
            s.style.setProperty('--sz', (24 + i * 6) + 'px');
            s.style.setProperty('--c', elegirColor(d.cols, extra));
            s.style.animationDelay = (i * (d.retraso || 250)) + 'ms';
            cont.appendChild(s);
        }
    }
};

/* ---------------------------------------------------------------
   2.2 LANZAMIENTO: crea el contenedor, lo pinta en (x, y) y lo
   borra solo cuando la animación ha terminado.
   --------------------------------------------------------------- */
function lanzarEfecto(def, x, y, extraColor) {
    if (!def || efectosVivos >= MAX_EFECTOS) return;

    const dur = (def.dur || 900) + (def.retraso || def.retardo || 0);

    const cont = document.createElement('div');
    cont.className = 'fx-cont fx-' + def.fam + (def.grav ? ' con-gravedad' : '');
    cont.style.left = x + 'px';
    cont.style.top = y + 'px';
    cont.style.setProperty('--dur', (def.dur || 900) + 'ms');

    const render = RENDER[def.fam] || RENDER.chispas;
    render(cont, def, extraColor);

    document.body.appendChild(cont);
    efectosVivos++;
    setTimeout(() => {
        cont.remove();
        efectosVivos--;
    }, dur + 500);
}

/* ================================================================
   BLOQUE 3 - LOS 104 EFECTOS DE CLIC
   Se lanzan al azar cada vez que se hace click en CUALQUIER punto
   de la página (el BLOQUE 5 se encarga de eso).
   Cada efecto: nombre propio + familia + parámetros.
   ================================================================ */

const EFECTOS_CLIC = [

    /* ---- Familia CHISPAS (12) ---- */
    { nom: 'Fuegos artificiales', fam: 'chispas', cols: ['#ffd60a', '#ff3b30', '#ffffff'], n: 30, dist: 150, dur: 950, form: 'circulo' },
    { nom: 'Tormenta neón', fam: 'chispas', cols: ['#00f5ff', '#ff00e5', '#c8ff00'], n: 34, dist: 170, dur: 900, form: 'cuadrado' },
    { nom: 'Estática roja', fam: 'chispas', cols: ['#ff0033', '#ff5c5c', '#8c001d'], n: 24, dist: 110, dur: 700, form: 'cuadrado', size: 8 },
    { nom: 'Luciérnagas', fam: 'chispas', cols: ['#c6ff6b', '#7cff6b', '#eaffb2'], n: 18, dist: 130, dur: 1400, form: 'circulo', retardo: 350 },
    { nom: 'Cristales de hielo', fam: 'chispas', cols: ['#bff3ff', '#7fd4ff', '#ffffff'], n: 22, dist: 140, dur: 850, form: 'rombo' },
    { nom: 'Granizo', fam: 'chispas', cols: ['#e8f6ff', '#a8dcff'], n: 26, dist: 90, dur: 900, grav: true, size: 9 },
    { nom: 'Meteorito', fam: 'chispas', cols: ['#ff9f1c', '#ff5400', '#ffe08a'], n: 16, dist: 165, dur: 950, form: 'estrella', grav: true },
    { nom: 'Corazones perdidos', fam: 'chispas', cols: ['#ff5fa2', '#ff9ecb', '#ff0055'], n: 15, dist: 125, dur: 1150, form: 'corazon' },
    { nom: 'Destellos dorados', fam: 'chispas', cols: ['#ffd23f', '#fff3b0', '#f5a623'], n: 26, dist: 150, dur: 1000, form: 'estrella' },
    { nom: 'Viñetas moradas', fam: 'chispas', cols: ['#b388ff', '#7c4dff', '#e0b0ff'], n: 28, dist: 135, dur: 800, form: 'cuadrado' },
    { nom: 'Abanico veloz', fam: 'chispas', cols: ['#00ffa3', '#00d0ff', '#ffffff'], n: 44, dist: 95, dur: 600, form: 'circulo', size: 7 },
    { nom: 'Trueno azul', fam: 'chispas', cols: ['#4fa3ff', '#ffffff', '#1c4bff'], n: 22, dist: 145, dur: 850, grav: true, form: 'triangulo' },

    /* ---- Familia ANILLO (8) ---- */
    { nom: 'Onda expansiva', fam: 'anillo', cols: ['#4fd1ff'], n: 1, size: 230, grosor: 7, dur: 900 },
    { nom: 'Dobles anillos', fam: 'anillo', cols: ['#ffffff', '#4fd1ff'], n: 2, size: 210, dur: 1000 },
    { nom: 'Radar militar', fam: 'anillo', cols: ['#7cff6b', '#2e9e2e'], n: 3, size: 250, grosor: 5, dur: 1200 },
    { nom: 'Aro cuadrado', fam: 'anillo', cols: ['#ff9f1c', '#ff5400'], n: 2, size: 200, form: 'cuadrado', dur: 950 },
    { nom: 'Impacto rojo', fam: 'anillo', cols: ['#ff0033'], n: 1, size: 170, grosor: 12, dur: 600 },
    { nom: 'Hipnosis', fam: 'anillo', cols: ['#b388ff', '#7c4dff', '#e0b0ff', '#ffffff'], n: 4, size: 240, dur: 1300 },
    { nom: 'Burbuja gigante', fam: 'anillo', cols: ['#7fffe0', '#ffffff'], n: 2, size: 280, grosor: 4, dur: 1050 },
    { nom: 'Sismo', fam: 'anillo', cols: ['#c9a227', '#6b6b6b', '#ffffff'], n: 3, size: 300, grosor: 9, dur: 950 },

    /* ---- Familia SÍMBOLOS (13) ---- */
    { nom: 'Estrellas fugaces', fam: 'simbolos', sims: ['⭐'], n: 10, dist: 150, dur: 950 },
    { nom: 'Chispazo eléctrico', fam: 'simbolos', sims: ['⚡'], n: 9, dist: 130, dur: 700 },
    { nom: 'Llama salvaje', fam: 'simbolos', sims: ['🔥'], n: 9, dist: 140, dur: 1000 },
    { nom: 'Bomba cómica', fam: 'simbolos', sims: ['💥'], n: 7, dist: 160, dur: 850 },
    { nom: 'Corazones rosas', fam: 'simbolos', sims: ['💖', '💕'], n: 12, dist: 135, dur: 1100 },
    { nom: 'Dinero fácil', fam: 'simbolos', sims: ['💸', '💵', '💰'], n: 9, dist: 150, dur: 1000 },
    { nom: 'Fiesta sorpresa', fam: 'simbolos', sims: ['🎉', '🎊'], n: 11, dist: 145, dur: 950 },
    { nom: 'Caritas locas', fam: 'simbolos', sims: ['😂', '🤪', '😎'], n: 10, dist: 130, dur: 1050 },
    { nom: 'Invasión alienígena', fam: 'simbolos', sims: ['👽', '🛸'], n: 9, dist: 155, dur: 1000 },
    { nom: 'Jardín de flores', fam: 'simbolos', sims: ['🌸', '🌷', '🌹'], n: 12, dist: 140, dur: 1150 },
    { nom: 'Frutas del trópico', fam: 'simbolos', sims: ['🍓', '🍋', '🍉'], n: 10, dist: 135, dur: 1000 },
    { nom: 'Señales de paz', fam: 'simbolos', sims: ['👍', '✌️', '🤙'], n: 9, dist: 125, dur: 950 },
    { nom: 'Diana perfecta', fam: 'simbolos', sims: ['🎯'], n: 8, dist: 150, dur: 800 },

    /* ---- Familia TEXTO (8) ---- */
    { nom: '¡BOOM!', fam: 'texto', palabras: ['¡BOOM!'], cols: ['#ff9f1c'], size: 56, dur: 900 },
    { nom: '¡ZAS!', fam: 'texto', palabras: ['¡ZAS!'], cols: ['#ff2d55'], size: 50, dur: 850, dx: 40, dy: -40 },
    { nom: 'BAM!', fam: 'texto', palabras: ['BAM!'], cols: ['#ffd60a'], size: 54, dur: 850, dx: -50, dy: 30 },
    { nom: 'POW!', fam: 'texto', palabras: ['POW!'], cols: ['#4fa3ff'], size: 52, dur: 850, dx: 55, dy: 35 },
    { nom: '¡PLASH!', fam: 'texto', palabras: ['¡PLASH!'], cols: ['#00f5ff'], size: 44, dur: 950 },
    { nom: 'CRASH!', fam: 'texto', palabras: ['CRASH!'], cols: ['#ff0033', '#ffffff'], size: 58, dur: 950, dx: -60, dy: -30 },
    { nom: 'Letras sueltas', fam: 'texto', palabras: ['A', 'X', 'Z', 'Q', 'Ñ'], cols: ['#b388ff', '#7cff6b', '#ffd60a'], size: 40, dur: 1000, radiante: true, retraso: 90 },
    { nom: 'WOW!', fam: 'texto', palabras: ['WOW!', 'WOW!'], cols: ['#ff5fa2', '#00f5ff', '#ffd60a'], size: 50, dur: 1000, radiante: true },

    /* ---- Familia RAYOS (8) ---- */
    { nom: 'Rayo cruz', fam: 'rayos', cols: ['#ffffff', '#ffd60a'], n: 4, largo: 170, grosor: 10, dur: 750 },
    { nom: 'Sol radiante', fam: 'rayos', cols: ['#ffd23f', '#ff9f1c'], n: 12, largo: 150, grosor: 8, dur: 900 },
    { nom: 'Abanico cian', fam: 'rayos', cols: ['#00f5ff', '#7fffe0'], n: 6, largo: 190, grosor: 9, dur: 800, giro: true },
    { nom: 'Pinchos rosas', fam: 'rayos', cols: ['#ff5fa2', '#ffb3d1'], n: 10, largo: 140, grosor: 7, dur: 750 },
    { nom: 'Láser verde', fam: 'rayos', cols: ['#7cff6b'], n: 5, largo: 240, grosor: 5, dur: 650 },
    { nom: 'Ventisca', fam: 'rayos', cols: ['#bff3ff', '#4fa3ff', '#ffffff'], n: 16, largo: 130, grosor: 6, dur: 1000 },
    { nom: 'Meteoros', fam: 'rayos', cols: ['#ff9f1c', '#ff5400'], n: 8, largo: 175, grosor: 9, dur: 700, giro: true },
    { nom: 'Aurora boreal', fam: 'rayos', cols: ['#7cff6b', '#00f5ff', '#b388ff', '#ff5fa2'], n: 12, largo: 185, grosor: 10, dur: 1150, giro: true },

    /* ---- Familia ESPIRAL (6) ---- */
    { nom: 'Torbellino cian', fam: 'espiral', cols: ['#00f5ff', '#7fffe0'], n: 24, radio: 130, dur: 1200 },
    { nom: 'Molino naranja', fam: 'espiral', cols: ['#ff9f1c', '#ffd60a'], n: 18, radio: 120, dur: 1000 },
    { nom: 'Galaxia', fam: 'espiral', cols: ['#b388ff', '#00f5ff', '#ff5fa2', '#ffd60a'], n: 28, radio: 150, dur: 1400 },
    { nom: 'Ráfaga rosa', fam: 'espiral', cols: ['#ff5fa2', '#ffffff'], n: 16, radio: 110, dur: 900, retraso: 30 },
    { nom: 'Remolino venenoso', fam: 'espiral', cols: ['#c6ff6b', '#7cff6b', '#3a8f00'], n: 22, radio: 140, dur: 1100 },
    { nom: 'Chispero dorado', fam: 'espiral', cols: ['#ffd23f', '#fff3b0'], n: 20, radio: 125, dur: 1300, retraso: 55 },

    /* ---- Familia LLUVIA (8) ---- */
    { nom: 'Chaparrón azul', fam: 'lluvia', cols: ['#4fa3ff', '#bff3ff'], n: 26, area: 260, dur: 1300, viento: 30 },
    { nom: 'Lágrimas moradas', fam: 'lluvia', cols: ['#b388ff', '#7c4dff'], n: 22, area: 230, dur: 1400, viento: -40 },
    { nom: 'Gotas de sangre', fam: 'lluvia', cols: ['#ff0033', '#8c001d'], n: 24, area: 210, dur: 1200, form: 'circulo', size: 12 },
    { nom: 'Lluvia de estrellas', fam: 'lluvia', sims: ['⭐', '✨'], n: 16, area: 280, dur: 1500 },
    { nom: 'Nevada', fam: 'lluvia', sims: ['❄️', '⛄'], n: 18, area: 300, dur: 1800, viento: 50 },
    { nom: 'Dulces caídos', fam: 'lluvia', sims: ['🍬', '🍭', '🍫'], n: 15, area: 250, dur: 1400 },
    { nom: 'Lluvia dorada', fam: 'lluvia', cols: ['#ffd23f', '#f5a623'], n: 28, area: 240, dur: 1350 },
    { nom: 'Meteoros caídos', fam: 'lluvia', sims: ['☄️', '🔥'], n: 14, area: 260, dur: 1150, viento: -60 },

    /* ---- Familia FUENTE (8) ---- */
    { nom: 'Champán', fam: 'fuente', cols: ['#ffffff', '#fff3b0'], n: 30, dur: 1100 },
    { nom: 'Volcán', fam: 'fuente', cols: ['#ff3b30', '#ff9f1c', '#ffd60a'], n: 34, dur: 1200 },
    { nom: 'Cohete azul', fam: 'fuente', cols: ['#4fa3ff', '#00f5ff'], n: 26, dur: 1000 },
    { nom: 'Fuente rosa', fam: 'fuente', cols: ['#ff5fa2', '#ffb3d1'], n: 28, dur: 1150 },
    { nom: 'Lanzallamas tóxico', fam: 'fuente', cols: ['#c6ff6b', '#7cff6b', '#00d06a'], n: 32, dur: 1100 },
    { nom: 'Géiser', fam: 'fuente', cols: ['#bff3ff', '#7fd4ff', '#ffffff'], n: 36, dur: 1300 },
    { nom: 'Baile de luz', fam: 'fuente', cols: ['#ffd60a', '#b388ff', '#00f5ff'], n: 30, dur: 1250 },
    { nom: 'Plumín violeta', fam: 'fuente', cols: ['#b388ff', '#e0b0ff'], n: 24, dur: 1050 },

    /* ---- Familia HUMO (6) ---- */
    { nom: 'Humo gris', fam: 'humo', cols: ['#9aa3ad', '#6b7480', '#c7ccd2'], n: 12, dur: 1500 },
    { nom: 'Vapor azul', fam: 'humo', cols: ['#a8dcff', '#6db8ff'], n: 11, dur: 1450 },
    { nom: 'Nube venenosa', fam: 'humo', cols: ['#c6ff6b', '#7cff6b', '#3a8f00'], n: 12, dur: 1550 },
    { nom: 'Humo rosa', fam: 'humo', cols: ['#ffb3d1', '#ff8ac2'], n: 11, dur: 1500 },
    { nom: 'Niebla fría', fam: 'humo', cols: ['#e8f6ff', '#cfe4f5'], n: 14, dur: 1700 },
    { nom: 'Aroma dorado', fam: 'humo', cols: ['#ffd23f', '#ffe9a1'], n: 10, dur: 1600 },

    /* ---- Familia DISCO (6) ---- */
    { nom: 'Mancha roja', fam: 'disco', cols: ['#ff0033', '#8c001d'], n: 3, size: 130, dur: 850 },
    { nom: 'Sello azul', fam: 'disco', cols: ['#4fa3ff', '#1c4bff'], n: 2, size: 150, dur: 900 },
    { nom: 'Pintada verde', fam: 'disco', cols: ['#7cff6b', '#00d06a'], n: 3, size: 140, dur: 850 },
    { nom: 'Sol naranja', fam: 'disco', cols: ['#ffd60a', '#ff9f1c', '#ff5400'], n: 3, size: 165, dur: 950 },
    { nom: 'Mancha negra', fam: 'disco', cols: ['#111111', '#4b4b4b'], n: 2, size: 175, dur: 800 },
    { nom: 'Burbuja magenta', fam: 'disco', cols: ['#ff00e5', '#b3009e'], n: 3, size: 145, dur: 900 },

    /* ---- Familia ESTALLIDO (8) ---- */
    { nom: 'Impacto cósmico', fam: 'estallido', txt: '💥', dur: 950, size: 76 },
    { nom: 'Calabaza asustada', fam: 'estallido', txt: '🎃', dur: 1000, size: 74 },
    { nom: 'Payaso loco', fam: 'estallido', txt: '🤡', dur: 1000, size: 72 },
    { nom: 'Calavera', fam: 'estallido', txt: '☠️', dur: 950, size: 70 },
    { nom: 'Unicornio', fam: 'estallido', txt: '🦄', dur: 1050, size: 74 },
    { nom: 'Súper champiñón', fam: 'estallido', txt: '🍄', dur: 1000, size: 72 },
    { nom: 'Bomba', fam: 'estallido', txt: '💣', dur: 900, size: 68 },
    { nom: 'Gran estrella', fam: 'estallido', txt: '🌟', dur: 1050, size: 78 },

    /* ---- Familia CONFETI (8) ---- */
    { nom: 'Confeti cumpleaños', fam: 'confeti', cols: ['#ff0033', '#4fa3ff', '#ffd60a', '#7cff6b', '#b388ff'], n: 34, dur: 1300 },
    { nom: 'Serpentinas rojas', fam: 'confeti', cols: ['#ff0033', '#ff5c5c'], n: 30, dur: 1350 },
    { nom: 'Papel picado verde', fam: 'confeti', cols: ['#7cff6b', '#00d06a', '#c6ff6b'], n: 32, dur: 1300 },
    { nom: 'Confeti rosa', fam: 'confeti', cols: ['#ff5fa2', '#ffb3d1', '#ff0055'], n: 32, dur: 1350 },
    { nom: 'Metalizado dorado', fam: 'confeti', cols: ['#ffd23f', '#f5a623', '#fff3b0'], n: 30, dur: 1400 },
    { nom: 'Arcoíris', fam: 'confeti', cols: ['#ff0033', '#ff9f1c', '#ffd60a', '#7cff6b', '#00f5ff', '#b388ff'], n: 38, dur: 1350 },
    { nom: 'Editorial blanco y negro', fam: 'confeti', cols: ['#ffffff', '#c7ccd2', '#111111'], n: 30, dur: 1300 },
    { nom: 'Neón ultravioleta', fam: 'confeti', cols: ['#b388ff', '#ff00e5', '#00f5ff'], n: 34, dur: 1300 },

    /* ---- Familia ECO (5) ---- */
    { nom: 'Eco de estrella', fam: 'eco', sims: ['⭐'], n: 6, dist: 160, dur: 650, retraso: 260 },
    { nom: 'Eco de fantasma', fam: 'eco', sims: ['👻'], n: 6, dist: 150, dur: 700, retraso: 280 },
    { nom: 'Eco de destello', fam: 'eco', sims: ['💫'], n: 7, dist: 165, dur: 600, retraso: 230 },
    { nom: 'Eco de flecha', fam: 'eco', sims: ['➤'], n: 6, dist: 155, dur: 650, retraso: 250 },
    { nom: 'Eco de sobre', fam: 'eco', sims: ['✉️'], n: 6, dist: 150, dur: 650, retraso: 240 }
];

/* TOTAL: 104 efectos de clic distintos (12+8+13+8+8+6+8+8+6+6+8+8+5) */

/* ================================================================
   BLOQUE 4 - LOS 12 EFECTOS DE BOTÓN
   Cada vez que se pulsa una caja de color se muestra UN efecto y
   el contador avanza: así dos pulsaciones seguidas nunca repiten
   el mismo (recorre los 12 en bucle).
   El [0] es la explosión ORIGINAL del ejercicio.
   ================================================================ */

const EFECTOS_BOTON = [
    { nom: 'Explosión original', fam: 'original' },
    { nom: 'Onda de color', fam: 'anillo', cols: ['#ffffff'], n: 3, size: 190, grosor: 7, dur: 950 },
    { nom: 'Confeti del color', fam: 'confeti', cols: ['#ffffff', '#fff9c4'], n: 32, dur: 1300 },
    { nom: 'Corona de estrellas', fam: 'rayos', cols: ['#ffd60a', '#ffffff'], n: 12, largo: 150, grosor: 8, dur: 850 },
    { nom: '¡COLOR! gigante', fam: 'texto', palabras: ['¡COLOR!'], cols: ['#ffffff'], size: 46, dur: 950 },
    { nom: 'Torbellino', fam: 'espiral', cols: ['#ffffff', '#ffe08a'], n: 22, radio: 120, dur: 1100 },
    { nom: 'Fuente chispeante', fam: 'fuente', cols: ['#ffffff'], n: 30, dur: 1150 },
    { nom: 'Lluvia de dulces', fam: 'lluvia', sims: ['🍬', '🍭', '🎉'], n: 16, area: 240, dur: 1350 },
    { nom: 'Ráfaga de fiesta', fam: 'simbolos', sims: ['🎉', '🎊', '✨'], n: 12, dist: 145, dur: 1000 },
    { nom: 'Sello de tinta', fam: 'disco', cols: ['#ffffff'], n: 3, size: 150, dur: 900 },
    { nom: 'Gran impacto', fam: 'estallido', txt: '💥', dur: 950, size: 72 },
    { nom: 'Chispas con gravedad', fam: 'chispas', cols: ['#ffffff', '#fff9c4'], n: 26, dist: 130, dur: 1000, grav: true }
];

/* Índice del próximo efecto de botón (avanza con cada pulsación) */
let indiceEfectoBoton = 0;

/* Al pulsar una caja: cambia el color del contenedor y lanza SU
   efecto de botón (en el centro de la caja) */
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

        /* --- Efecto de botón (12 distintos en bucle) --- */
        const def = EFECTOS_BOTON[indiceEfectoBoton];
        indiceEfectoBoton = (indiceEfectoBoton + 1) % EFECTOS_BOTON.length;

        const rect = box.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        if (def.fam === 'original') {
            crearExplosion(bgColor, cx, cy);
        } else {
            lanzarEfecto(def, cx, cy, bgColor);
        }
    });
});

/* ================================================================
   BLOQUE 5 - CLIC GLOBAL
   Un click en CUALQUIER punto de la página lanza un efecto al azar
   de los 104 (nunca repite el inmediatamente anterior).
   ================================================================ */

const avisoEfecto = document.getElementById('aviso-efecto');
let ultimoEfectoClic = -1;

function mostrarAviso(indice) {
    const def = EFECTOS_CLIC[indice];
    avisoEfecto.textContent = 'Efecto ' + (indice + 1) + '/' + EFECTOS_CLIC.length + ' · ' + def.nom;
    avisoEfecto.classList.remove('visible');
    void avisoEfecto.offsetWidth;   /* reinicia la animación del aviso */
    avisoEfecto.classList.add('visible');
}

document.addEventListener('click', (e) => {
    /* Elegir un efecto al azar sin repetir el anterior */
    let indice = Math.floor(Math.random() * EFECTOS_CLIC.length);
    if (indice === ultimoEfectoClic) {
        indice = (indice + 1) % EFECTOS_CLIC.length;
    }
    ultimoEfectoClic = indice;

    lanzarEfecto(EFECTOS_CLIC[indice], e.clientX, e.clientY, null);
    mostrarAviso(indice);
});

/* ================================================================
   BLOQUE 6 - JUEGO DE OVNIS
   · 13 naves distintas (forma, color, tamaño, velocidad y puntos).
   · Cada 10 segundos sale una "ola" de 1 a 3 ovnis (el primero,
     al cargar la página, aparece ya).
   · Al clicar un ovni: EXPLOTA, sube la puntuación con un número
     que CRECE hasta desaparecer, y se actualiza el marcador.
   · Si no lo alcanzas, vuela fuera de la pantalla y desaparece.
   ================================================================ */

const OVNIS = [
    { cls: 'plate', nom: 'Plata clásico', puntos: 50, vel: 14, color: '#cfd8e3' },
    { cls: 'rojo', nom: 'Cazador rojo', puntos: 75, vel: 12, color: '#ff3b30' },
    { cls: 'triangulo', nom: 'TR-3B', puntos: 150, vel: 9, color: '#7cff6b' },
    { cls: 'cubo', nom: 'Cubo azul', puntos: 100, vel: 12, color: '#4fa3ff' },
    { cls: 'anillo', nom: 'Anillo verde', puntos: 120, vel: 10, color: '#35e07a' },
    { cls: 'gota', nom: 'Gota morada', puntos: 200, vel: 8, color: '#b388ff' },
    { cls: 'fantasma', nom: 'Fantasma', puntos: 300, vel: 7, color: '#ffffff' },
    { cls: 'dorado', nom: 'Relámpago dorado', puntos: 250, vel: 6, color: '#ffd23f' },
    { cls: 'doble', nom: 'Doble casco', puntos: 90, vel: 13, color: '#9fc6ff' },
    { cls: 'nodriza', nom: 'Nave nodriza', puntos: 500, vel: 20, color: '#cdd6c2' },
    { cls: 'haz', nom: 'Extractor con haz', puntos: 180, vel: 10, color: '#2ee6c5', haz: true },
    { cls: 'picudo', nom: 'Picudo naranja', puntos: 130, vel: 11, color: '#ff7a1a' },
    { cls: 'bicho', nom: 'Bicho rosa', puntos: 160, vel: 9, color: '#ff5fa2' }
];

const capaOvnis = document.getElementById('capa-ovnis');
const puntuacionEl = document.getElementById('puntuacion');
const destruidosEl = document.getElementById('ovnis-destruidos');

let puntuacion = 0;
let ovnisDestruidos = 0;

/* Crea una nave al azar y la lanza hacia un lado u otro */
function crearOvni() {
    const def = OVNIS[Math.floor(Math.random() * OVNIS.length)];

    const nave = document.createElement('div');
    nave.className = 'ovni ovni--' + def.cls;

    /* Dirección, duración del vuelo y altitud aleatorias */
    const haciaIzquierda = Math.random() < 0.5;
    nave.style.animationName = haciaIzquierda ? 'vuelo-izq' : 'vuelo-der';
    const dur = def.vel * azar(0.9, 1.2);
    nave.style.animationDuration = dur.toFixed(1) + 's';
    const alturaMax = Math.max(80, window.innerHeight - 260);
    nave.style.top = Math.round(70 + Math.random() * alturaMax) + 'px';

    /* Datos del ovni para la destrucción */
    nave.dataset.puntos = def.puntos;
    nave.dataset.color = def.color;
    nave.dataset.nom = def.nom;

    /* Estructura interior (cúpula, casco y luces) */
    const cuerpo = document.createElement('div');
    cuerpo.className = 'ovni-cuerpo' + (def.haz ? ' con-haz' : '');
    cuerpo.innerHTML = '<span class="ovni-domo"></span><span class="ovni-casco"></span><span class="ovni-luces"></span>';
    nave.appendChild(cuerpo);

    capaOvnis.appendChild(nave);

    /* Si no lo destruyen, vuela fuera y se borra */
    nave._timer = setTimeout(() => nave.remove(), dur * 1000 + 400);
    return nave;
}

/* Ola de ovnis: de 1 a 3 naves espaciadas */
function olaDeOvnis() {
    const cantidad = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < cantidad; i++) {
        setTimeout(crearOvni, i * 800);
    }
}

/* Número que aparece al destruir un ovni: sale, CRECE y se va */
function sacarPuntos(puntos, x, y, color) {
    const p = document.createElement('div');
    p.className = 'puntos';
    p.textContent = '+' + puntos;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.color = color || '#7cff6b';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1250);
}

/* Destrucción por clic (delegación de eventos en la capa) */
capaOvnis.addEventListener('click', (e) => {
    const nave = e.target.closest('.ovni');
    if (!nave) return;

    /* Al destruirlo NO se lanza también el efecto de clic global */
    e.stopPropagation();
    clearTimeout(nave._timer);

    const rect = nave.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const puntos = Number(nave.dataset.puntos) || 50;

    /* ¡BOOM! + contador */
    crearExplosion(nave.dataset.color || '#ffffff', x, y);
    sacarPuntos(puntos, x, y, nave.dataset.color);

    puntuacion += puntos;
    ovnisDestruidos++;
    puntuacionEl.textContent = puntuacion;
    destruidosEl.textContent = ovnisDestruidos;

    nave.remove();
});

/* Primer vuelo al cargar + una ola cada 10 segundos */
olaDeOvnis();
setInterval(olaDeOvnis, 10000);

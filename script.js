const textoPregunta = "Hola Lau, ¿quieres salir conmigo este fin de semana? 🌹";
const titulo = document.getElementById("typewriter");
const contenedorBotones = document.getElementById("contenedorBotones");
let i = 0;

function efectoEscritura() {
    if (i < textoPregunta.length) {
        titulo.innerHTML += textoPregunta.charAt(i);
        i++;
        setTimeout(efectoEscritura, 100); 
    } else {
        // CUANDO TERMINA DE ESCRIBIR:
        contenedorBotones.classList.remove("hidden"); // Muestra los botones
        contenedorBotones.classList.add("fade-in");    // Hace que aparezcan suavemente
    }
}

// El resto de tu código (moverBoton, click en Si, animateCat) se mantiene igual abajo...

// Llamamos a la función cuando cargue la página
window.addEventListener('load', () => {
    efectoEscritura();
    animateCat(); // También iniciamos al gato
});

const btnNo = document.querySelector("#btnNo");
const btnSi = document.querySelector('#btnSi');
const runningCat = document.querySelector('#runningCat'); 

let animationId; // Variable para detener el movimiento del gato

// --- Funcionalidad del botón "No" ---
function moverBoton(e) {
    btnNo.style.position = "fixed";
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}

btnNo.addEventListener("mouseenter", moverBoton);
btnNo.addEventListener("touchstart", moverBoton);

// --- Funcionalidad del botón "Sí" ---
btnSi.addEventListener('click', () => {
    // 1. Detener y ocultar el gato que corre
    cancelAnimationFrame(animationId);
    runningCat.style.display = "none";

    // 2. Mostrar los nuevos GIFs (puedes tenerlos ocultos en HTML o crearlos aquí)
    // Aquí ocultamos el contenedor de la pregunta y botones para que luzcan los gifs
    document.querySelector('.container').style.display = 'none';

    // Ejemplo: Crear un nuevo contenedor para los gifs de celebración
    const celebrationContainer = document.createElement('div');
    celebrationContainer.innerHTML = `
        <div style="text-align: center; margin-top: 50px;">
            <h1 style="color: #d63384;">¡SABIA QUE DIRIAS QUE SI! ❤️ Nos vemos el fin</h1>
            <img src="cat2.gif" style="width: 200px; margin: 20px;">
            <img src="cat3.gif" style="width: 200px; margin: 20px;">
        </div>
    `;
    document.body.appendChild(celebrationContainer);

    // 3. Lanzar la lluvia de corazones (Confetti)
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 200 * (timeLeft / duration);
      
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ff1493']
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ff1493']
      }));
    }, 250);
});

// --- Animación del Gato (Corriendo) ---
function animateCat() {
    runningCat.classList.remove('hidden');
    
// En lugar de: let currentPosition = -runningCat.offsetWidth;
    let currentPosition = -200; // Un valor fijo para asegurar que empiece fuera de pantalla
    let speed = 4;

    function move() {
        currentPosition += speed;
        runningCat.style.left = `${currentPosition}px`;

        if (currentPosition > window.innerWidth) {
            currentPosition = -runningCat.offsetWidth;
        }

        // Guardamos el ID de la animación para poder cancelarla luego
        animationId = requestAnimationFrame(move);
    }

    move();
}

window.addEventListener('load', animateCat);
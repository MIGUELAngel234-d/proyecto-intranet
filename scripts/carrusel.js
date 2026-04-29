var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 1200 
let timeAutoNext = 10000 // <--- Lo subí a 10 segundos para que dé tiempo de leer bien

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 
let runNextAuto 

// FUNCIÓN PARA ACTIVAR EL AUTO-NEXT
function startAutoNext() {
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)
}

// FUNCIONES DE PAUSA (MOUSE ENCIMA)
carousel.onmouseenter = function() {
    clearTimeout(runNextAuto); // Detiene el cronómetro
    runningTime.style.animationPlayState = 'paused'; // Pausa la barrita visual
}

carousel.onmouseleave = function() {
    startAutoNext(); // Reinicia el cronómetro cuando quitas el mouse
    runningTime.style.animationPlayState = 'running'; // Sigue la barrita
}

function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = `runningTime ${timeAutoNext/1000}s linear 1 forwards`
}

function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)
    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)

    clearTimeout(runNextAuto)
    startAutoNext() // Usa la nueva función de inicio
    resetTimeAnimation() 
}

// Iniciar por primera vez
startAutoNext()
resetTimeAnimation()
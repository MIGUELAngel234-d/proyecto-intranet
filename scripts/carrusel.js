var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 1200 
let timeAutoNext = 7000 
let isMouseOver = false 

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 
let runNextAuto 

function startAutoNext() {
    clearTimeout(runNextAuto); 
    if (!isMouseOver) { 
        runNextAuto = setTimeout(() => {
            nextBtn.click()
        }, timeAutoNext)
    }
}

carousel.onmouseenter = function() {
    isMouseOver = true; 
    clearTimeout(runNextAuto); 
    runningTime.style.animationPlayState = 'paused'; 
}

carousel.onmouseleave = function() {
    isMouseOver = false; 
    startAutoNext(); 
    runningTime.style.animationPlayState = 'running'; 
}

function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight 
    runningTime.style.animation = null 
    runningTime.style.animation = `runningTime ${timeAutoNext/1000}s linear 1 forwards`
    
    if (isMouseOver) {
        runningTime.style.animationPlayState = 'paused';
    }
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
    if (!isMouseOver) {
        startAutoNext()
    }
    resetTimeAnimation() 
}

startAutoNext()
resetTimeAnimation()
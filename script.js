/*Carrusel ultimos vistos*/ 

let clicked = false;

function App() {}

window.onload = function (event) {
    var app = new App();
    window.app = app;
};

App.prototype.processingButton = function(event) {
    const btn = event.currentTarget;
    const slickList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const slick = track.querySelectorAll('.slick');

    const slickWidth = slick[0].offsetWidth;
    
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == ""  ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    btn.dataset.button == "button-prev" ? prevAction(leftPosition,slickWidth,track) : nextAction(leftPosition,trackWidth,listWidth,slickWidth,track)
}

let prevAction = (leftPosition,slickWidth,track) => {
    if(leftPosition > 0) {
        console.log("entro 2")
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

let nextAction = (leftPosition,trackWidth,listWidth,slickWidth,track) => {
    if(leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }
}


/*carrusel de lovers*/

const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // mostrar y ocultar el icono anterior/siguiente según el valor de desplazamiento izquierdo del carrusel
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // obtener el ancho máximo de desplazamiento
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const mobileBreakpoint = 550;

        if(window.innerWidth < mobileBreakpoint) {
            // Card margin is the horizontal margin of the carousel's cards
            const cardMargin = 14;
            let firstImgWidth = firstImg.clientWidth + cardMargin;

            carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
            setTimeout(() => showHideIcons(), 100); // llamar a showHideIcons después de 60ms
        } else {
 
        let firstImgWidth = firstImg.clientWidth + 1400; // obteniendo el ancho del primer img y añadiendo el valor del margen 
        // si el icono pulsado está a la izquierda, reduzca el valor de anchura del desplazamiento del carrusel a la izquierda, si no, añádalo a él

        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // llamar a showHideIcons después de 60ms
        }
    });
});

const autoSlide = () => {
    // si no queda ninguna imagen por desplazar, vuelva desde aquí
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // hacer que el valor de positionDiff sea positivo
    let firstImgWidth = firstImg.clientWidth + 14;
    // obtener el valor de diferencia que hay que añadir o reducir del carrusel de la izquierda para tomar el centro img medio
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // si el usuario se desplaza hacia la derecha
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // isi el usuario se desplaza hacia la izquierda
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // actualización del valor de las variables globales al pulsar el ratón
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // desplazamiento de imágenes/carrusel a la izquierda según el puntero del ratón
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);


/* Top Products*/

let gallerycounter = 1;
const gallery1 = document.getElementById("one");
const gallery2 = document.getElementById("two");
const gallery3 = document.getElementById("three");

const buttonright = document.getElementById("right-products");
const buttonleft = document.getElementById("left-products");

buttonright.addEventListener("click", e => {
    gallerycounter++
    if (gallerycounter === 1 || gallerycounter === 0) {
        gallery1.style.display = "grid"
        gallery2.style.display = "none"
        gallery3.style.display = "none"
    } else if (gallerycounter === 2) {
        gallery1.style.display = "none"
        gallery2.style.display = "grid"
        gallery3.style.display = "none"
    } else {
        gallery1.style.display = "none"
        gallery2.style.display = "none"
        gallery3.style.display = "grid"
    }
    if (gallerycounter > 3) {
        gallerycounter = 1
    }
})

buttonleft.addEventListener("click", e => {
    gallerycounter--
    if (gallerycounter === 1 || gallerycounter === 0) {
        gallery1.style.display = "grid"
        gallery2.style.display = "none"
        gallery3.style.display = "none"
    } else if (gallerycounter === 2) {
        gallery1.style.display = "none"
        gallery2.style.display = "grid"
        gallery3.style.display = "none"
    } else {
        gallery1.style.display = "none"
        gallery2.style.display = "none"
        gallery3.style.display = "grid"
    }
    if (gallerycounter < 1) {
        gallerycounter = 1
    }
})

const navBtn = document.querySelector('.nav-burger');
const nav = document.getElementById('main-nav');

navBtn.addEventListener('click', () => {
        navBtn.classList.toggle('hidden');
        nav.classList.remove('hidden')

    	
});
nav.addEventListener('click', () => {
    navBtn.classList.remove('hidden');
    nav.classList.toggle('hidden')
    
});

/* 
  const nav = document.querySelector('#nav'); //Tendrias que mirar cual es el id que usas en el nav

navBtn.addEventListener('click', () => {
  nav.classList.toggle('hidden');
});

nav.addEventListener('click', () => {
  nav.classList.remove('hidden');
});*/



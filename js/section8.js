// function preloadImages() {
//     const images = [
//         "../pic/pic7.jpg",
//         "../pic/pic32.jpg",
//         "../pic/pic36.jpg",
//         "../pic/pic16.jpg",
//         "../pic/pic20.jpg",
//         "../pic/pic21.jpg",
//         "../pic/pic22.jpg",
//         "../pic/pic17.jpg",
//         "../pic/pic31.jpg",
//     ];
//     images.forEach(image => {
//         const img = new Image();
//         img.src = image;
//     });
// }

// document.addEventListener("DOMContentLoaded", preloadImages);




const container = document.querySelector('.section8_slider_container');
const slides = document.querySelectorAll('.section8_slide');
const arrLeft = document.querySelector('.section8_arrow-left');
const arrRight = document.querySelector('.section8_arrow-right');

let offset = 0;//Offset value for the slides container
let slideIncrement = 0;//Index of the current slide
let slideDecrement = slides.length - 1;//Index of the last slide

arrRight.addEventListener('click', () => {
    arrRight.disabled = true;
    offset = slides[0].offsetWidth;
    container.style.transition = "transform 500ms ease-in-out";
    container.style.transform = "translateX(-" + offset + "px)";

    setTimeout(() => {
        container.style.transition = "none";
        slides[slideIncrement].style.order = slides.length - 1;
        container.style.transform = "translateX(0)";
        slideIncrement++;
        slideDecrement = slideIncrement - 1;

        if(slideIncrement == slides.length){
            slideIncrement = 0;
            slides.forEach(slide => {
                slide.style.order = "initial";
            });
        }

        arrRight.disabled = false;
    }, 500);
});

arrLeft.addEventListener('click', () => {
    arrLeft.disabled = true;
    offset = slides[0].offsetWidth;
    container.style.transition = "none";
    if(slideDecrement < 0){
        slides.forEach(slide => {
            slide.style.order = "initial";
        });
        slideDecrement = slides.length - 1;
    }
    slides[slideDecrement].style.order = "-1";
    container.style.transform = "translateX(-" + offset + "px)";
    setTimeout(() => {
        container.style.transition = "transform 500ms ease-in-out";
        container.style.transform = "translateX(0)";
    },1);
    setTimeout(() => {
        slideDecrement--;
        slideIncrement = slideDecrement + 1;
        arrLeft.disabled = false;
    }, 500);
});

// arrLeft.addEventListener('click', () => {
//     arrLeft.disabled = true;
//     offset = slides[0].offsetWidth;
//     container.style.transition = "left ease-in-out 0.5s";
//     container.style.left = offset + "px";

//     setTimeout(() => {
//         container.style.transition = "none";
//         slides[slideDecrement].style.order = 1;
//         container.style.left = 0;
//         slideDecrement--;
//         slideIncrement = slideDecrement + 1;

//         if(slideDecrement < 0){
//             slideDecrement = slides.length - 1;
//             slides.forEach(slide => {
//                 slide.style.order = "initial";
//             });
//         }

//         arrLeft.disabled = false;
//     }, 500);
// });

// const header = document.querySelector('.section17_header');
// const img = document.querySelector('.section17_header_img');
// let scrollDistance = 0;
// let requestId = null;
// function updateHeaderClipPath() {
//     const clipPathValue = `polygon(0 0, 100% 0%, 100% ${(scrollDistance <= 600) ? 100 - ((scrollDistance / 600) * 60) : 75}%, 0 100%)`;
//     header.style.clipPath = clipPathValue;
//     const scaleValue = 1 + ((scrollDistance / 600) * 1);
//     img.style.transform = `scale(${scaleValue})`;
//     const opacityValue = (scrollDistance / 600);
// }
// function scrollHandler(event) {
//     if (event.deltaY < 0) {
//         scrollDistance = Math.max(0, scrollDistance + event.deltaY);
//     } else {
//         scrollDistance = Math.min(600, scrollDistance + event.deltaY);
//     }
//     if (!requestId) {
//         requestId = window.requestAnimationFrame(() => {
//             updateHeaderClipPath();
//             requestId = null;
//         });
//     }
// }
// window.addEventListener('wheel', scrollHandler);

const header = document.querySelector('.section17_header');
const img = document.querySelector('.section17_header_img');
let scrollDistance = 0;
let requestId = null;
let startY = 0;
let isTouching = false;

function updateHeaderClipPath() {
    const clipPathValue = `polygon(0 0, 100% 0%, 100% ${(scrollDistance <= 600) ? 100 - ((scrollDistance / 600) * 60) : 75}%, 0 100%)`;
    header.style.clipPath = clipPathValue;
    const scaleValue = 1 + ((scrollDistance / 600) * 1);
    img.style.transform = `scale(${scaleValue})`;
}

function scrollHandler(deltaY) {
    if (deltaY < 0) {
        scrollDistance = Math.max(0, scrollDistance + deltaY);
    } else {
        scrollDistance = Math.min(600, scrollDistance + deltaY);
    }
    if (!requestId) {
        requestId = window.requestAnimationFrame(() => {
            updateHeaderClipPath();
            requestId = null;
        });
    }
}

function wheelHandler(event) {
    scrollHandler(event.deltaY);
}

function touchStartHandler(event) {
    if (event.touches.length === 1) {
        startY = event.touches[0].clientY;
        isTouching = true;
    }
}

function touchMoveHandler(event) {
    if (isTouching && event.touches.length === 1) {
        const currentY = event.touches[0].clientY;
        const deltaY = startY - currentY;
        startY = currentY;
        scrollHandler(deltaY);
    }
}

function touchEndHandler(event) {
    isTouching = false;
}

window.addEventListener('wheel', wheelHandler);
window.addEventListener('touchstart', touchStartHandler);
window.addEventListener('touchmove', touchMoveHandler);
window.addEventListener('touchend', touchEndHandler);


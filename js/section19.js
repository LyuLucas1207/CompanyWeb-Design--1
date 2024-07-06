document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll('.section19');

    carousels.forEach((carousel) => {
        const imageContainer = carousel.querySelector('.section19_images');
        const buttons = carousel.querySelectorAll('.section19_min');
        let currentIndex = 0;
        const totalImages = buttons.length;
        let intervalId;

        // 更新图片位置
        function updateImagePosition() {
            const offset = -currentIndex * 100 / totalImages;
            imageContainer.style.transform = `translateX(${offset}%)`;
        }

        // 启动自动切换
        function startAutoSlide() {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalImages;
                updateImagePosition();
            }, 3000); // 每3秒切换一次
        }

        // 停止自动切换
        function stopAutoSlide() {
            clearInterval(intervalId);
        }

        // 点击小图片按钮事件
        buttons.forEach((button, buttonIndex) => {
            button.addEventListener('click', () => {
                currentIndex = buttonIndex;
                updateImagePosition();
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // 初始启动自动切换
        startAutoSlide();
    });
});

import * as tool from './tool.js';

document.addEventListener('DOMContentLoaded', function () {
    tool.createDropdown_section5();
    tool.sliderHorizon_section8();
    tool.profileCard_section9();
    tool.questionAsking_section11();
    tool.productCard_section12();
    tool.locationCard_section15();
    tool.blogHeader_section17();
    tool.imageHorizontalSlider_section19();
    tool.newsCard_section26();
    tool.profileCard_section31();
    tool.clockHistory_section32();
    const scrollButton = document.querySelector('.section10_scroll-to-top');
    if (scrollButton) {
        scrollButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default behavior of anchor tag
            tool.smoothScrollToTop_section10(800); // Adjust duration as needed
        });
    }
});





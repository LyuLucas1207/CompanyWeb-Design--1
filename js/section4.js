
document.addEventListener('DOMContentLoaded', function () {
    var section4Nav = document.getElementById('section4_nav');
    var section4Block = document.getElementById('section4_block');
    var sectionItems = document.querySelectorAll('.section4_items');
    var lastHoverIndex = 0; // 用来记录最后悬停的元素索引

    sectionItems.forEach(function (item, index) {
        item.addEventListener('mouseenter', function () {
            lastHoverIndex = index; // 更新最后悬停的索引
            moveBlockTo(index);
        });
    });

    section4Nav.addEventListener('mouseleave', function () {
        moveBlockTo(lastHoverIndex); // 当鼠标离开时，移动到最后悬停的位置
    });

    function moveBlockTo(index) {
        section4Block.style.left = `calc(var(--div-width) * ${index})`;
    }
});


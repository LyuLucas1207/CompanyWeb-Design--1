


document.addEventListener('DOMContentLoaded', function() {
    fetch('./data/section12.json')  // 假设你的JSON数据存储在同级目录下的data文件夹中
        .then(response => response.json())
        .then(data => {
            const categories = Object.keys(data);
            const container = document.querySelector('.section12_card_container');

            categories.forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = `section12_category`;

                const titleDiv = document.createElement('div');
                titleDiv.className = 'section12_title';
                titleDiv.innerHTML = `<h1>${category}</h1><p>各种产品任意选择</p>`;
                categoryDiv.appendChild(titleDiv);

                const cardDiv = document.createElement('div');
                cardDiv.className = 'section12_cards';

                // const card = document.createElement('div');
                // card.className = 'section12_clearfix';

                data[category].forEach(product => {
                    const single_card = document.createElement('div');
                    single_card.className = 'section12_card';
                    single_card.innerHTML = `
                        <a href="#">
                            <img src="${product.img}" alt="${product.name}">
                            
                            <div class="section12_card_text">
                                <h3>${product.name}</h3>
                                <p>${product.description}</p>
                                <p>price:￥${product.price}</p>
                            </div>
                        </a>
                    `;
                    // card.appendChild(single_card);
                    cardDiv.appendChild(single_card);
                });

                // cardDiv.appendChild(card);
                categoryDiv.appendChild(cardDiv);
                container.appendChild(categoryDiv);
            });
        })
        .catch(error => console.error('Error loading the products data:', error));
});




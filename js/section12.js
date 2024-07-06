document.addEventListener('DOMContentLoaded', async function() {
    await loadDataAndCreateElements('./data/section12/section12_1.json');
    await loadDataAndCreateElements('./data/section12/section12_2.json');
    await loadDataAndCreateElements('./data/section12/section12_3.json');
    await loadDataAndCreateElements('./data/section12/section12_4.json');
    await loadDataAndCreateElements('./data/section12/section12_5.json');
    changeParagraph('./data/section12/section12.json');
    setupLazyLoading(); // 确保在所有图片元素插入DOM后调用
});


function setupLazyLoading() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1  // 调整阈值以确定何时开始加载图片
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        observer.observe(img);
    });
}


async function changeParagraph(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const categories = Object.keys(data);
            categories.forEach(category => {
                const para = document.getElementById(`p_${category}`);
                if (para) {
                    para.innerHTML = data[category][0].paragraph;
                } else {
                    console.error(`No paragraph with id p_${category} found.`);
                }
            });
        })
        .catch(error => console.error('Error loading the paragraph data:', error));
}

async function loadDataAndCreateElements(url) {
    const cards = document.querySelector('.section12_cards');
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const categories = Object.keys(data);
            categories.forEach(category => {
                if (document.getElementById(`section12_cards_${category}`)) {
                    data[category].forEach(product => {
                        const id = `section12_cards_${category}`;
                        const cardsID = document.getElementById(id);
                        const card = createCard(product);
                        if (cardsID) {
                            cardsID.appendChild(card);
                        } else {
                            console.error(`No element with id ${id} found.`);
                        }
                    });
                    cards.appendChild(cardsID);
                } else {
                    console.error(`No element with id section12_cards_${category} found.`);
                }
            });
        })
        .catch(error => console.error('Error loading the products data:', error));
}


function createCard(product) {
    const card = document.createElement('div');
    card.className = 'section12_card';

    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.style.display = 'none';

    const img = document.createElement('img');
    img.src = './pic/data/loading.gif';
    img.alt = product.name;
    img.dataset.src = product.img;

    const cardText = document.createElement('div');
    cardText.className = 'section12_card_text';

    const h3 = document.createElement('h3');
    h3.textContent = product.name;
    const description = document.createElement('p');
    description.textContent = product.description;
    const price = document.createElement('p');
    price.textContent = `price:￥${product.price}`;

    cardText.appendChild(h3);
    cardText.appendChild(description);
    cardText.appendChild(price);

    anchor.appendChild(img);
    anchor.appendChild(cardText);

    card.appendChild(anchor);

    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        showModal(product);
    });

    img.onload = () => {
        anchor.style.display = 'flex';
    };
    img.onerror = () => {
        anchor.innerHTML = '<p>Error loading image.</p>';
    };

    return card;
}

function showModal(product) {
    const modal = document.querySelector('.section12_modal');
    const modalContent = modal.querySelector('.section12_modal-content');

    // Clear previous content
    modalContent.innerHTML = '';

    const closeButton = document.createElement('span');
    closeButton.className = 'section12_close';
    closeButton.textContent = '×';
    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    const h2 = document.createElement('h2');
    h2.textContent = product.name;

    const img = document.createElement('img');
    img.loading = 'eager';
    img.src = product.img;
    img.alt = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `￥${product.price}`;

    const detailedInfo = document.createElement('p');
    detailedInfo.textContent = product.detailed_info;

    modalContent.appendChild(closeButton);
    modalContent.appendChild(h2);
    modalContent.appendChild(img);
    modalContent.appendChild(description);
    modalContent.appendChild(price);
    modalContent.appendChild(detailedInfo);

    modal.style.display = 'block';

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

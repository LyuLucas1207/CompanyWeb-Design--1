function createDropdown_section5() {
    if (!document.querySelector('.section5')) {
        return;
    }
    const products = document.querySelector('.section5_dropdown');
    fetch('./data/section12/section12.json')
        .then(response => response.json())
        .then(data => {
            const categories = Object.keys(data);
            categories.forEach(category => {
                const link = document.createElement('a');
                link.href = `./product.html#${category}`;
                link.textContent = category;
                products.appendChild(link);
            });
        }
        ).catch(error => console.error(error));
}

function sliderHorizon_section8() {
    if (!document.querySelector('.section8')) {
        return;
    }
    const container = document.querySelector('.section8_slider_container');

    fetch('./data/section8/section8.json') // Replace this URL with the actual URL to fetch data
        .then(response => response.json())
        .then(data => {
            let size = data.sliders.length;
            container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
            data.sliders.forEach(slider => {
                const slide = document.createElement('div');
                slide.className = 'section8_slide';

                const card = document.createElement('div');
                card.className = 'section8_card';

                const link = document.createElement('a');
                link.href = `${slider.url_a}#${slider.category}`;

                const img = document.createElement('img');
                img.src = slider.img;
                img.alt = slider.name;
                link.appendChild(img);

                const h2 = document.createElement('h2');
                h2.textContent = slider.name;

                const p = document.createElement('p');
                p.textContent = slider.description;

                card.appendChild(link);
                card.appendChild(h2);
                card.appendChild(p);
                slide.appendChild(card);
                container.appendChild(slide);
            });
            initSlider_section8(); // Initialize the slider functionality
        }).catch(error => console.error('Error loading the slider data:', error));
    function initSlider_section8() {
        const slides = document.querySelectorAll('.section8_slide');
        const arrLeft = document.querySelector('.section8_arrow-left');
        const arrRight = document.querySelector('.section8_arrow-right');

        let offset = 0;
        let slideIncrement = 0;
        let slideDecrement = slides.length - 1;

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

                if (slideIncrement == slides.length) {
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
            if (slideDecrement < 0) {
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
            }, 1);
            setTimeout(() => {
                slideDecrement--;
                slideIncrement = slideDecrement + 1;
                arrLeft.disabled = false;
            }, 500);
        });
    }
}

function profileCard_section9(){
    if (!document.querySelector('.section9')) {
        return;
    }
    fetch('./data/section9/section9.json')
        .then(response => response.json())
        .then(data => {
            const profilesContainer = document.querySelector('.section9_profiles');
            data.Profiles.forEach(profile => {
                const profileDiv = document.createElement('div');
                profileDiv.className = 'section9_profile';

                const avatarDiv = document.createElement('div');
                avatarDiv.className = 'section9_avatar';
                const img = document.createElement('img');
                img.src = profile.image;
                img.alt = profile.name;
                img.className = 'profile_img';
                avatarDiv.appendChild(img);

                const infoContainerDiv = document.createElement('div');
                infoContainerDiv.className = 'section9_info_container';
                const infoDiv = document.createElement('div');
                infoDiv.className = 'section9_info';

                const h1 = document.createElement('h1');
                h1.textContent = profile.name;
                const h2 = document.createElement('h2');
                h2.textContent = profile.position;
                const p = document.createElement('p');
                p.textContent = profile.description;

                infoDiv.appendChild(h1);
                infoDiv.appendChild(h2);
                infoDiv.appendChild(p);
                infoContainerDiv.appendChild(infoDiv);

                profileDiv.appendChild(avatarDiv);
                profileDiv.appendChild(infoContainerDiv);

                profileDiv.addEventListener('click', () => openModal_section9(profile));
                profilesContainer.appendChild(profileDiv);
            });
        })
        .catch(error => console.error('Error loading the profiles:', error));
}
//Not exported
function openModal_section9(profile) {
    const modal = document.querySelector('.section9_modal');
    const modalContent = modal.querySelector('.section9_modal-content');

    // Clear previous modal content
    modalContent.innerHTML = '';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'section9_close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const h2Name = document.createElement('h2');
    h2Name.textContent = profile.name;

    const img = document.createElement('img');
    img.src = profile.image;
    img.alt = profile.name;

    const h2Position = document.createElement('h2');
    h2Position.textContent = profile.position;

    const pDuration = document.createElement('p');
    pDuration.textContent = `在职时长: ${profile.duration}`;

    const pDescription = document.createElement('p');
    pDescription.textContent = profile.description;

    const h3Skills = document.createElement('h3');
    h3Skills.textContent = '擅长领域：';

    const ulSkills = document.createElement('ul');
    profile.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        ulSkills.appendChild(li);
    });

    const h3Contact = document.createElement('h3');
    h3Contact.textContent = '联系方式：';

    const ulContact = document.createElement('ul');
    profile.contact.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = `${contact.type}: ${contact.value}`;
        ulContact.appendChild(li);
    });

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(h2Name);
    modalContent.appendChild(img);
    modalContent.appendChild(h2Position);
    modalContent.appendChild(pDuration);
    modalContent.appendChild(pDescription);
    modalContent.appendChild(h3Skills);
    modalContent.appendChild(ulSkills);
    modalContent.appendChild(h3Contact);
    modalContent.appendChild(ulContact);

    modal.style.display = 'block';

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function smoothScrollToTop_section10(duration){
    if (!document.querySelector('.section10')) {
        return;
    }
    let start = null;
    const initialPos = window.scrollY || window.pageYOffset;
    const target = 0;
    function step(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = elapsed / duration;
        const amount = easeInOutCubic_section10(progress);
        window.scrollTo(0, initialPos + (target - initialPos) * amount);
        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, target);
        }
    }
    window.requestAnimationFrame(step);
}
//Not exported
function easeInOutCubic_section10(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

function questionAsking_section11(){
    if (!document.querySelector('.section11')) {
        return;
    }
    fetch('./data/section11/section11.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.section11_info');
            const modal = document.querySelector('.section11_modal');
            const modalContent = document.querySelector('.section11_modal-content');
            data.Questions.forEach((question, index) => {
                const trigger = document.createElement('p');
                const strong = document.createElement('strong');
                strong.textContent = question.question;
                trigger.appendChild(strong);
                trigger.append(` ${question.specific}`);
                container.appendChild(trigger);
                trigger.onclick = function () {
                    modalContent.innerHTML = '';
                    const closeButton = document.createElement('span');
                    closeButton.className = 'section11_close';
                    closeButton.textContent = '×';
                    closeButton.onclick = () => {
                        modal.style.display = 'none';
                    };
                    const h2 = document.createElement('h2');
                    h2.textContent = question.question;
                    const img = document.createElement('img');
                    img.src = question.img;
                    img.alt = `问题图片${index + 4}`;
                    const p = document.createElement('p');
                    p.textContent = question.answer;
                    modalContent.appendChild(closeButton);
                    modalContent.appendChild(h2);
                    modalContent.appendChild(img);
                    modalContent.appendChild(p);
                    modal.style.display = 'block';
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = 'none';
                        }
                    };
                };
            });
            const lastTrigger = document.createElement('p');
            const lastLink = document.createElement('a');
            lastLink.href = 'contact.html';
            const strongLast = document.createElement('strong');
            strongLast.textContent = '·还有其他问题？';
            lastLink.appendChild(strongLast);
            lastLink.append(' 请联系我们。');
            lastTrigger.appendChild(lastLink);
            container.appendChild(lastTrigger);
        })
        .catch(error => {
            console.error('Failed to load section11 data:', error);
        });
}

async function productCard_section12(){
    if (!document.querySelector('.section12')) {
        return;
    }
    await loadDataAndCreateElements_section12('./data/section12/section12_1.json');
    await loadDataAndCreateElements_section12('./data/section12/section12_2.json');
    await loadDataAndCreateElements_section12('./data/section12/section12_3.json');
    await loadDataAndCreateElements_section12('./data/section12/section12_4.json');
    await loadDataAndCreateElements_section12('./data/section12/section12_5.json');
    changeParagraph_section12('./data/section12/section12.json');
    setupLazyLoading_section12();
}
//Not exported
function setupLazyLoading_section12() {
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
        threshold: 0.1 
    });
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        observer.observe(img);
    });
}
async function changeParagraph_section12(url) {
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
async function loadDataAndCreateElements_section12(url) {
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
                        const card = createCard_section12(product);
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
function createCard_section12(product) {
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
        showModal_section12(product);
    });

    img.onload = () => {
        anchor.style.display = 'flex';
    };
    img.onerror = () => {
        anchor.innerHTML = '<p>Error loading image.</p>';
    };

    return card;
}
function showModal_section12(product) {
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

function locationCard_section15(){
    if (!document.querySelector('.section15')) {
        return;
    }
    fetch('./data/section15/section15.json')
        .then(response => response.json())

        .then(data => {
            const locations = data.Locations;
            const locationContainer = document.getElementsByClassName('section15_location_container')[0];

            locations.forEach(location => {
                const card = document.createElement('div');
                card.className = 'section15_location_card';

                const img = document.createElement('img');
                img.src = location.Image;
                img.alt = 'Location Image';

                const h2 = document.createElement('h2');
                h2.textContent = location.Name;

                const h3 = document.createElement('h3');
                h3.textContent = location.SpecificLocation;

                const p = document.createElement('p');
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'section15_more-info';
                link.dataset.id = location.CompanyName;
                link.textContent = '获取更多信息 =>';
                p.appendChild(link);

                card.appendChild(img);
                card.appendChild(h2);
                card.appendChild(h3);
                card.appendChild(p);
                locationContainer.appendChild(card);
            });

            // Add event listeners to 'more-info' links
            document.querySelectorAll('.section15_more-info').forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const companyName = event.target.getAttribute('data-id');
                    fetchLocationDetails(companyName);
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    const modal = document.getElementsByClassName('section15_modal')[0];
    const closeModal = document.getElementsByClassName('section15_close')[0];
    let currentImageIndex = 0;
    let imageDetails = [];

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function fetchLocationDetails(companyName) {
        fetch('./data/section15/section15.json')
            .then(response => response.json())
            .then(data => {
                const locations = data.Locations;
                const location = locations.find(location => location.CompanyName === companyName);
                showModal(location);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function showModal(location) {
        document.getElementById('section15_modal-company-name').textContent = location.CompanyName;
        imageDetails = location.ImageDetail;
        currentImageIndex = 0;
        updateModalImage();
        document.getElementById('section15_modal-founded').textContent = `Founded: ${location.Founded}`;
        document.getElementById('section15_modal-description').textContent = location.Description;
        document.getElementById('section15_modal-contact').textContent = `Contact: ${location.Contact}`;
        modal.style.display = 'block';
    }

    function updateModalImage() {
        const modalImage1 = document.getElementById('section15_modal-image1');
        const modalImage2 = document.getElementById('section15_modal-image2');
        modalImage1.src = imageDetails[currentImageIndex];
        modalImage1.classList.remove('section15_hidden');
        modalImage2.classList.add('section15_hidden');
    }

    function switchImages(next) {
        const modalImage1 = document.getElementById('section15_modal-image1');
        const modalImage2 = document.getElementById('section15_modal-image2');
        const outgoingImage = modalImage1.classList.contains('section15_hidden') ? modalImage2 : modalImage1;
        const incomingImage = modalImage1.classList.contains('section15_hidden') ? modalImage1 : modalImage2;

        outgoingImage.classList.remove('section15_slide-in-left', 'section15_slide-in-right', 'section15_slide-out-left', 'section15_slide-out-right');
        incomingImage.classList.remove('section15_slide-in-left', 'section15_slide-in-right', 'section15_slide-out-left', 'section15_slide-out-right');

        outgoingImage.classList.add(next ? 'section15_slide-out-left' : 'section15_slide-out-right');
        incomingImage.src = imageDetails[currentImageIndex];
        incomingImage.classList.remove('section15_hidden');
        incomingImage.classList.add(next ? 'section15_slide-in-right' : 'section15_slide-in-left');

        outgoingImage.addEventListener('animationend', function () {
            outgoingImage.classList.add('section15_hidden');
            outgoingImage.classList.remove('section15_slide-out-left', 'section15_slide-out-right');
        }, { once: true });
    }

    document.getElementById('section15_prev-image').addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = imageDetails.length - 1;
        }
        switchImages(false);
    });

    document.getElementById('section15_next-image').addEventListener('click', () => {
        if (currentImageIndex < imageDetails.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }
        switchImages(true);
    });
}

function blogHeader_section17(){
    if (!document.querySelector('.section17')) {
        return;
    }
    const header = document.querySelector('.section17_header');
    const img = document.querySelector('.section17_header_img');
    let scrollDistance = 0;
    let requestId = null;
    let startY = 0;
    let isTouching = false;

    function updateHeaderClipPath_section17() {
        const clipPathValue = `polygon(0 0, 100% 0%, 100% ${(scrollDistance <= 600) ? 100 - ((scrollDistance / 600) * 60) : 75}%, 0 100%)`;
        header.style.clipPath = clipPathValue;
        const scaleValue = 1 + ((scrollDistance / 600) * 1);
        img.style.transform = `scale(${scaleValue})`;
    }

    function scrollHandler_section17(deltaY) {
        if (deltaY < 0) {
            scrollDistance = Math.max(0, scrollDistance + deltaY);
        } else {
            scrollDistance = Math.min(600, scrollDistance + deltaY);
        }
        if (!requestId) {
            requestId = window.requestAnimationFrame(() => {
                updateHeaderClipPath_section17();
                requestId = null;
            });
        }
    }

    function wheelHandler_section17(event) {
        scrollHandler_section17(event.deltaY);
    }

    function touchStartHandler_section17(event) {
        if (event.touches.length === 1) {
            startY = event.touches[0].clientY;
            isTouching = true;
        }
    }

    function touchMoveHandler_section17(event) {
        if (isTouching && event.touches.length === 1) {
            const currentY = event.touches[0].clientY;
            const deltaY = startY - currentY;
            startY = currentY;
            scrollHandler_section17(deltaY);
        }
    }

    function touchEndHandler_section17(event) {
        isTouching = false;
    }

    window.addEventListener('wheel', wheelHandler_section17);
    window.addEventListener('touchstart', touchStartHandler_section17);
    window.addEventListener('touchmove', touchMoveHandler_section17);
    window.addEventListener('touchend', touchEndHandler_section17);
}

function imageHorizontalSlider_section19(){
    if (!document.querySelector('.section19')) {
        return;
    }
    const carousels = document.querySelectorAll('.section19');
    carousels.forEach((carousel) => {
        const imageContainer = carousel.querySelector('.section19_images');
        const buttons = carousel.querySelectorAll('.section19_min');
        let currentIndex = 0;
        const totalImages = buttons.length;
        let intervalId;
        function updateImagePosition() {
            const offset = -currentIndex * 100 / totalImages;
            imageContainer.style.transform = `translateX(${offset}%)`;
        }
        function startAutoSlide() {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalImages;
                updateImagePosition();
            }, 3000);
        }
        function stopAutoSlide() {
            clearInterval(intervalId);
        }
        buttons.forEach((button, buttonIndex) => {
            button.addEventListener('click', () => {
                currentIndex = buttonIndex;
                updateImagePosition();
                stopAutoSlide();
                startAutoSlide();
            });
        });
        startAutoSlide();
    });
}

function newsCard_section26(){
    if (!document.querySelector('.section26')) {
        return;
    }
    const newsGrid = document.querySelector('.section26_news-grid_id');

    fetch('./data/section26/section26.json')
        .then(response => response.json())
        .then(newsData => {
            newsData.forEach(news => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('section26_news-item');

                const newsItemImage = document.createElement('div');
                newsItemImage.classList.add('section26_news-item-img');
                const img = document.createElement('img');
                img.src = news.image;
                img.alt = news.title;
                newsItemImage.appendChild(img);

                const overlay = document.createElement('div');
                overlay.classList.add('section26_overlay');
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.classList.add('section26_like-icon');
                svg.setAttribute('viewBox', '0 0 24 24');
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
                svg.appendChild(path);
                overlay.appendChild(svg);
                newsItemImage.appendChild(overlay);

                newsItem.appendChild(newsItemImage);

                const newsItemContent = document.createElement('div');
                newsItemContent.classList.add('section26_news-item-content');

                const newsCategory = document.createElement('div');
                newsCategory.classList.add('section26_news-category');
                newsCategory.textContent = news.category;

                const newsTitle = document.createElement('div');
                newsTitle.classList.add('section26_news-title');
                newsTitle.textContent = news.title;

                const newsMeta = document.createElement('div');
                newsMeta.classList.add('section26_news-meta');
                // newsMeta.innerHTML = `<span>${news.date}</span> • <span>${news.views} views</span>`;
                //DO NOT USE innerHTML here, use textContent instead
                const newsDate = document.createElement('span');
                newsDate.textContent = news.date;
                const newsViews = document.createElement('span');
                newsViews.textContent = `${news.views} views`;
                newsMeta.appendChild(newsDate);
                newsMeta.appendChild(document.createTextNode(' • '));
                newsMeta.appendChild(newsViews);


                newsItemContent.appendChild(newsCategory);
                newsItemContent.appendChild(newsTitle);
                newsItemContent.appendChild(newsMeta);

                newsItem.appendChild(newsItemContent);

                const likeIcon = newsItem.querySelector('.section26_like-icon');
                likeIcon.addEventListener('click', () => {
                    likeIcon.classList.toggle('clicked');
                });

                newsGrid.appendChild(newsItem);
            });
        });
}


export { createDropdown_section5, sliderHorizon_section8, 
    profileCard_section9, smoothScrollToTop_section10,
    questionAsking_section11, productCard_section12,
    locationCard_section15, blogHeader_section17,
    imageHorizontalSlider_section19, newsCard_section26
};
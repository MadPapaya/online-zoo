'use strict';

//pets slider
const petsCarousel = document.querySelector('.thirdscreen_cards');
const petsCard = getComputedStyle(document.querySelector('.cards'));
const petsNext = document.querySelector('.thirdscreen_slider_next');
const petsPrev = document.querySelector('.thirdscreen_slider_previous');
const carouselTimeout = 300;
let carouselUnlock = true;

function carouselLock() {
    carouselUnlock = false;
    setTimeout(function () {
        carouselUnlock = true;
    }, carouselTimeout);
}

const petsWidth = parseInt(petsCard.width) + parseInt(petsCard.marginRight);
const maxIndex = 5 - Math.round(parseInt(getComputedStyle(petsCarousel).width) / petsWidth);
let petsSliderIndex = 0;

petsNext.addEventListener("click", e => {
    if (carouselUnlock) {
        if (petsSliderIndex < maxIndex) {
            petsSliderIndex++;
            petsCarousel.style.transform = `translateX(-${petsWidth*petsSliderIndex}px)`;
        } else if (petsSliderIndex >= maxIndex) {
            petsSliderIndex = 0;
            petsCarousel.style.transform = `translateX(${petsSliderIndex}px)`;
        }
        carouselLock();
    }
});
petsPrev.addEventListener("click", e => {
    if (carouselUnlock) {
        if (petsSliderIndex <= 0) {
            petsSliderIndex = maxIndex;
            petsCarousel.style.transform = `translateX(-${petsWidth*petsSliderIndex}px)`;
        } else if (petsSliderIndex <= maxIndex) {
            petsSliderIndex--;
            petsCarousel.style.transform = `translateX(-${petsWidth*petsSliderIndex}px)`;
        }
        carouselLock();
    }
});

//auto slider + slider
const revCarousel = document.querySelector('.reviews_slider');
const revCard = getComputedStyle(document.querySelector('.reviews_slider_element'));
const revNext = document.querySelector('.fifthscreen_slider_next');
const revPrev = document.querySelector('.fifthscreen_slider_previous');

const revWidth = parseInt(revCard.width) + parseInt(revCard.marginRight);
const revMaxIndex = 3 - Math.round(parseInt(getComputedStyle(revCarousel).width) / revWidth);
let revSliderIndex = 0;

let timer = setInterval(() => {
    slideshow();
}, 10000);

function slideshow() {
    if (revSliderIndex < revMaxIndex) {
        revSliderIndex++;
        revCarousel.style.transform = `translateX(-${revWidth*revSliderIndex}px)`;
    } else if (revSliderIndex >= revMaxIndex) {
        revSliderIndex = 0;
        revCarousel.style.transform = `translateX(${revSliderIndex}px)`;
    }
}

function resetInterval() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        setInterval(() => {
            slideshow();
        }, 10000);
    }, 10000);
}

revCarousel.addEventListener("click", resetInterval);


revNext.addEventListener("click", e => {
    if (carouselUnlock) {
        resetInterval();
        if (revSliderIndex < revMaxIndex) {
            revSliderIndex++;
            revCarousel.style.transform = `translateX(-${revWidth*revSliderIndex}px)`;
        } else if (revSliderIndex >= revMaxIndex) {
            revSliderIndex = 0;
            revCarousel.style.transform = `translateX(${revSliderIndex}px)`;
        }
        carouselLock();
    }
});

revPrev.addEventListener("click", e => {
    if (carouselUnlock) {
        resetInterval();
        if (revSliderIndex <= 0) {
            revSliderIndex = revMaxIndex;
            revCarousel.style.transform = `translateX(-${revWidth*revSliderIndex}px)`;
        } else if (revSliderIndex <= revMaxIndex) {
            revSliderIndex--;
            revCarousel.style.transform = `translateX(-${revWidth*revSliderIndex}px)`;
        }
        carouselLock();
    }
});

//popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lock = document.querySelectorAll('.lock');
const timeout = 500;
let currentPopup = 0;

let unlock = true;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseX = document.querySelectorAll('.popup-close');
if (popupCloseX.length > 0) {
    for (let i = 0; i < popupCloseX.length; i++) {
        const el = popupCloseX[i];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (!popupActive) {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup-content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive) {
    if (unlock) {
        form.reset();
        popupActive.classList.remove('open');
        submitButton.classList.remove('hover');
    }
}

function bodyLock() {
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

//form
const form = document.getElementById('form');
const submitButton = document.querySelector('.form-submit');
let error = 3;
form.addEventListener('input', formSend);
submitButton.addEventListener("click", function () {
    if (error === 0) {
        setTimeout(function () {
            setTimeout(function () {
                if (document.querySelector('.open') == null) {
                    alert('Thank you for your feedback');
                }
            }, timeout);
            popupClose(currentPopup);
        }, timeout);
    }
});

async function formSend(e) {
    e.preventDefault();
    error = formValidate(form);

    if (error === 0) {
        submitButton.classList.add('hover');
    } else {
        submitButton.classList.remove('hover');
    }
}

function formValidate(form) {
    let error = 0;
    let formReg = document.querySelectorAll('.required');
    for (let i = 0; i < formReg.length; i++) {
        const input = formReg[i];
        formRemoveError(input);
        if (input.value === '') {
            formAddError(input);
            error++;
        } else if (input.getAttribute("id") === "textarea" && input.value.length > 280) {
            formAddError(input);
            error++;
        } else if (input.getAttribute("id") === "email" && validateEmail(input.value) === false) {
            formAddError(input);
        }
    }
    return error;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function formAddError(input) {
    input.parentElement.classList.add('error');
    input.classList.add('error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('error');
    input.classList.remove('error');
}

//animal card
const animals = document.querySelectorAll('.marker_ellipse');
const animalCard = document.querySelector('.map_animal_card').childNodes;
const animalInfo = {
    eagle: {
        src: '../../assets/images/eagle_card.png',
        title: 'Eagle',
        subtitle: 'The broadcast is from an island near Los Angeles. Watch their real life.',
        href: '../../pages/zoos translation/eagle/eagle.html'
    },
    alligator: {
        src: '../../assets/images/alligator_card.png',
        title: 'Alligator',
        subtitle: 'The broadcast is from Florida. See their real life.',
        href: '../../pages/zoos translation/alligator/alligator.html'
    },
    panda: {
        src: '../../assets/images/panda_card.png',
        title: 'Panda',
        subtitle: 'The broadcast comes from the mountainous regions of central China: Sichuan and Tibet. See their real life together.',
        href: '../../pages/zoos translation/panda/panda.html'
    },
    gorilla: {
        src: '../../assets/images/gorilla_card.png',
        title: 'Gorilla',
        subtitle: 'The broadcast comes from the Democratic Republic of the Congo in a forest area. Watch their life and life together.',
        href: '../../pages/zoos translation/gorilla/gorilla.html'
    }
};

if (animals.length > 0) {
    let prevAnimal = animals[0];
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[i];
        animal.addEventListener("click", function (e) {
            prevAnimal.classList.remove('active');
            animal.classList.add('active');
            prevAnimal = animal;
            const animalName = animal.childNodes[1].getAttribute('alt');
            animalCard[1].childNodes[1].setAttribute('src', animalInfo[animalName].src);
            animalCard[3].innerText = animalInfo[animalName].title;
            animalCard[5].innerText = animalInfo[animalName].subtitle;
            animalCard[7].setAttribute('href', animalInfo[animalName].href);
            e.preventDefault();
        });
    }
}
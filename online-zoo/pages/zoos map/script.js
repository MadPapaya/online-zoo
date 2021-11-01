//animal card
const animals = document.querySelectorAll('.marker_ellipse');
const card = document.querySelector('.animal-card');
const animalCard = card.childNodes;
const map = document.querySelector('.map');

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
            if (card.style.display !== 'block') {
                card.style.display = 'block';
            }
            e.preventDefault();
        });
    }
    map.addEventListener("click", function (e) {
        prevAnimal.classList.remove('active');
        card.style.display = 'none';
        e.preventDefault();
    });
}

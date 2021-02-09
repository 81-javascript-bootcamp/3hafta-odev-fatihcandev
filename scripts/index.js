const petsModule = (function() {
    const petSounds = {
        bark: "bark",
        meow: "meow",
        squawk: "squawk",
        pikapika: "pikapika"
    };
    const data = [
        {
            image: "./assets/images/sam.jpg",
            name: "Sam",
            type: "Corgi",
            sound: petSounds.bark,
            key: "b",
            soundText: "Bark - type b",
        },
        {
            image: "./assets/images/mellie.jpg",
            name: "Mellie",
            type: "Sphynx",
            key: "m",
            sound: petSounds.meow,
            soundText: "Meow - type m"
        },
        {
            image: "./assets/images/selcuk.jpg",
            name: "Selçuk",
            type: "Indian Ring Neck",
            key: "s",
            sound: petSounds.squawk,
            soundText: "Squawk - type s"
        },
        {
            image: "./assets/images/pikachu.png",
            name: "Pikachu",
            type: "Electric Pokemon",
            key: "p",
            sound: petSounds.pikapika,
            soundText: "Pika pika - type p"
        }
    ];
    const $tbodyEl = document.querySelector('tbody');
    const $mainImage = document.querySelector('.main-image');

    function getTableRows() {
        return document.querySelectorAll('.pet-row');
    }

    function getButtons() {
        return document.querySelectorAll('button');
    }
    
    function createPetSoundElement(soundType) {
        const $audioElement = document.createElement('audio');
        $audioElement.src = `./assets/sounds/${soundType}.mp3`;
        $audioElement.id = soundType;
        return $audioElement;
    }

    function createPetElement(pet) {
        const { image, name, type, sound, soundText } = pet;
        return `
            <tr class="pet-row" role="button">
                <td><img class="pet-image" src=${image} alt="pet"></td>
                <td>${name}</td>
                <td>${type}</td>
                <td>
                    <button data-sound=${sound} type="button" class="btn btn-success">${soundText}</button>
                </td>
            </tr>
        `
    }

    function getRandomNumberBetween0And256() {
        return Math.floor(Math.random() * 256);
    }

    function getRandomBgColor() {
        const r = getRandomNumberBetween0And256();
        const g = getRandomNumberBetween0And256();
        const b = getRandomNumberBetween0And256();
        return `rgb(${r},${g},${b})`;
    }
    
    function appendSoundElementsInHtml() {
        Object.keys(petSounds).forEach(soundType => {
            const $audioEl = createPetSoundElement(soundType);
            document.body.appendChild($audioEl);
        });
    }

    function appendTableInHtml() {
        data.forEach(pet => {
            const $petElement = createPetElement(pet);
            $tbodyEl.innerHTML += $petElement;
        });
    }

    function changeBgColor($row) {
        const randomColor = getRandomBgColor();
        $row.setAttribute('style', `background-color: ${randomColor}`);
    }

    function changeImage(petImageSrc) {
        $mainImage.setAttribute('src', petImageSrc);
    }

    function bindTableRowClickEvent() {
        const $tableRows = getTableRows();
        $tableRows.forEach(($row, index) => {
            $row.addEventListener('click', function() {
                const pet = data[index];
                changeImage(pet.image);
                changeBgColor($row);
            });
        });
    }

    function bindPlaySoundOnKeyDownEvent() {
        data.forEach(pet => {
            const { sound: soundId, key: petKey } = pet;
            document.addEventListener('keydown', function(event) {
                if(event.key === petKey) {
                    const $soundElement = document.getElementById(soundId);
                    $soundElement.play();
                }
            });
        });
    }

    function bindButtonEvents() {
        const $buttons = getButtons();
        $buttons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.stopPropagation();
                const soundId = this.getAttribute('data-sound');
                const $soundElement = document.getElementById(soundId);
                $soundElement.play();
            });
        });
    }

    function init() {
        appendSoundElementsInHtml();
        appendTableInHtml();
        bindButtonEvents();
        bindPlaySoundOnKeyDownEvent();
        bindTableRowClickEvent();
    }

    return {
        init: init
    }
})();

petsModule.init();
class Card {
    constructor(name = '', translation = '', category = '') {
        this.name = name;
        this.url_picture = `images/${this.name}.jpg`;
        this.url_mp3 = `audio/${this.name}.mp3`;
        this.node_element = document.createElement('div');
        this.translation = translation;
        this.train_click = 0;
        this.play_true = 0;
        this.play_false = 0;
        this.category = category;
        this.node_text = document.createElement('p');
        this.node_image = document.createElement('img');
        this.node_audio = document.createElement('audio');
        this.node_coupimg = document.createElement('img');
        this.click = false;
        this.percentage_incorrect = '0%';

    }
    add__node(node = document.body) {
        this.node_text.innerHTML = this.name;
        this.node_text.classList.add('card__text');
        this.node_audio.src = this.url_mp3;
        this.node_image.src = this.url_picture;
        this.node_image.classList.add('card__image')
        this.node_element.className = 'card';
        this.node_coupimg.src = 'images/rotate.png';
        this.node_coupimg.classList.add('card__coupimg')
        this.node_element.appendChild(this.node_image);
        this.node_element.appendChild(this.node_text);
        this.node_element.appendChild(this.node_coupimg);
        this.node_element.appendChild(this.node_audio);
        this.node_audio.className = 'sound';
        node.appendChild(this.node_element);
    }
    coup() {
        if (this.click == false) {
            this.node_text.innerHTML = this.translation;
            this.node_text.style.transform = 'rotateY(180deg)';
            this.node_element.style.transform = 'rotateY(180deg)';
            setTimeout(() => this.click = true, 500);
        }
    }
    return_coup() {
        if (this.click) {
            setTimeout(() => {
                this.node_text.innerHTML = this.name;
                this.node_text.style.transform = 'none';
            }, 300);
            this.node_element.style.transform = 'none';
            this.click = false;
        }
    }
    interestcalculation() {
        let temp = Math.trunc(this.play_false / (this.play_true + this.play_false) * 100);
        if (temp)
            this.percentage_incorrect = temp + '%';


    }

}
class Cardlist {
    constructor() {
        this.cards = [];
        this.categorys = [];

    }
    addcards(cards = []) {
        cards.forEach((element) => {
            let card = element.split(',');
            this.cards.push(new Card(card[0], card[1], card[2]));
        })
    }
    getcard(name = '' || new Element()) {
        for (const iterator of this.cards) {
            if (name == iterator.name || name == iterator.translation || name == iterator.node_audio)
                return iterator;
        }
        return false;
    }
    searchcategorys() {
        this.cards.forEach((card) => {
            if (!this.categorys.includes(card.category))
                this.categorys.push(card.category);
        });
    }
    main_page() {
        let arr_categorynorep = [];
        main_page_activ = true;
        main.innerHTML = '';
        this.cards.forEach((el) => {
            if (!arr_categorynorep.includes(el.category)) {
                arr_categorynorep.push(el.category);
                let newcard_node = document.createElement('div');
                newcard_node.style.backgroundImage = 'url(' + el.url_picture + ')';
                newcard_node.innerHTML = el.category;
                newcard_node.className = 'card_main';
                main.appendChild(newcard_node);
                newcard_node.addEventListener('click', menu_click);

            }

        });

    }
    sort(parametr) {
        this.cards.sort(byField(parametr));
    }
    save() {
        let cardstats = '';
        this.cards.forEach(el => {
            cardstats += el.name + ' ' + el.play_true + ' ' + el.play_false + ' ' + el.train_click + ',';
        });
        localStorage.setItem('cards', cardstats);
    }
    load() {
        if (localStorage.getItem('cards')) {
            let cardstats = localStorage.getItem('cards').split(',');
            cardstats.forEach(el => {
                let cardstatsarray = el.split(' ');
                let card = this.getcard(cardstatsarray[0]);
                if (card) {
                    card.play_true = +cardstatsarray[1];
                    card.play_false = +cardstatsarray[2];
                    card.train_click = +cardstatsarray[3];
                }
            });
        }
    }
}
let byFieldf = false;

function byField(field) {
    if (byFieldf) {
        byFieldf = false;
        return (a, b) => a[field] > b[field] ? 1 : -1;
    } else {
        byFieldf = true;
        return (a, b) => a[field] < b[field] ? 1 : -1;
    }
}

const cards_string = ['cry,плакать,Action (set A)', 'dance,танцевать,Action (set A)', 'dive,нырять,Action (set A)', 'draw,рисовать,Action (set A)', 'fly,летать,Action (set A)', 'fish,ловить рыбу,Action (set A)', 'hug,обнимать,Action (set A)', 'jump,прыгать,Action (set A)', 'open,открывать,Action (set B)', 'play,играть,Action (set B)', 'point,указывать,Action (set B)', 'swim,плавать,Action (set B)', 'ride,ездить,Action (set B)', 'run,бегать,Action (set B)', 'sing,петь,Action (set B)', 'skip,пропускать,Action (set B)', 'argue,спорить,Action (set C)', 'build,строить,Action (set C)', 'carry,нести,Action (set C)', 'drop,падать,Action (set C)', 'catch,ловить,Action (set C)', 'drive,водить машину,Action (set C)', 'pull,тянуть,Action (set C)', 'push,толкать,Action (set C)', 'big,большой,Adjective', 'small,маленький,Adjective', 'fast,быстрый,Adjective', 'slow,медленный,Adjective', 'friendly,дружелюбный,Adjective', 'unfriendly,недружелюбный,Adjective', 'young,молодой,Adjective', 'old,старый,Adjective', 'cat,кот,Animal (set A)', 'chick,цыпплёнок,Animal (set A)', 'chicken,курица,Animal (set A)', 'dog,собака,Animal (set A)', 'horse,лошадь,Animal (set A)', 'pig,свинья,Animal (set A)', 'rabbit,кролик,Animal (set A)', 'sheep,овца,Animal (set A)', 'bird,птица,Animal (set B)', 'fish,рыба,Animal (set B)', 'frog,лягушка,Animal (set B)', 'giraffe,жираф,Animal (set B)', 'lion,лев,Animal (set B)', 'mouse,мышь,Animal (set B)', 'turtle,черепаха,Animal (set B)', 'dolphin,дельфин,Animal (set B)', 'skirt,юбка,Clothes', 'pants,брюки,Clothes', 'blouse,блузка,Clothes', 'dress,платье,Clothes', 'boot,ботинок,Clothes', 'shirt,рубашка,Clothes', 'coat,пальто,Clothes', 'shoe,туфли,Clothes', 'sad,грустный,Emotion', 'angry,злой,Emotion', 'happy,счастливый,Emotion', 'tired,уставший,Emotion', 'surprised,удивленный,Emotion', 'scared,испуганный,Emotion', 'smile,улыбка,Emotion', 'laugh,смех,Emotion'];
let cards = new Cardlist();
cards.addcards(cards_string);
cards.searchcategorys();
cards.load();
const main = document.querySelector('.main');
const menu = document.querySelector('.menu__list');
menu.addEventListener('click', (el) => {
    if (el.target.localName == 'li')
        menu_click();

});

document.body.addEventListener('click', (event) => {
    if (document.querySelector('.header__menu').style.display != 'none' && event.target != burgerMenu) {
        document.querySelector('.header__menu').style.display = 'none';
        burgerMenu.classList.remove('header__burgerMenu_active');
    }
}, true);
const burgerMenu = document.querySelector('.header__burgerMenu');
burgerMenu.addEventListener('click', (event) => {
    if (burgerMenu.classList.contains('header__burgerMenu_active')) {
        document.querySelector('.header__menu').style.display = 'none';
        burgerMenu.classList.remove('header__burgerMenu_active');
    } else {
        burgerMenu.classList.add('header__burgerMenu_active');
        document.querySelector('.header__menu').style.display = 'block';
    }

});
const header__switch = document.querySelector('.header__switch');
header__switch.addEventListener('click', (event) => {
    if (header__switch.firstElementChild.classList.contains('switch__circle_active')) {
        header__switch.firstElementChild.classList.remove('switch__circle_active');
        document.querySelector('.header__mod').innerHTML = 'TRAIN';
        cards__play_of();
    } else {
        header__switch.firstElementChild.classList.add('switch__circle_active');
        document.querySelector('.header__mod').innerHTML = 'PLAY';
        cards__play_on();
    }
});

function addevent_card() {
    const coup = document.querySelectorAll('.card__coupimg');
    coup.forEach((el) => {
        el.addEventListener('click', (el) => {
            let card_temp = cards.getcard(el.target.parentElement.querySelector('.card__text').innerHTML);
            card_temp.coup();
        });
    });
    const cards_node = document.querySelectorAll('.card');
    cards_node.forEach((element) => {
        element.addEventListener('click', add__play_song);
        element.addEventListener('mouseleave', (el) => {
            let card_temp = cards.getcard(el.target.querySelector('.card__text').innerHTML);
            if (card_temp.click) {
                card_temp.return_coup();
            }
        });
    });
}

function cards__play_on() {
    const cards_node = document.querySelectorAll('.card');
    cards_node.forEach((element) => {
        element.querySelector('.card__image').style.height = '100%';
        element.querySelector('.card__text').style.display = 'none';
        element.querySelector('.card__coupimg').style.display = 'none';
        element.removeEventListener('click', add__play_song);
    });
    play_active = true;
    play__button_activ();
}

function cards__play_of() {
    const cards_node = document.querySelectorAll('.card');
    button_play.style.borderRadius = '0';
    game_active = false;
    button_play.innerHTML = 'Start game';
    cards_node.forEach((element) => {
        element.querySelector('.card__image').style.height = '200px';
        element.querySelector('.card__text').style.display = 'block';
        element.querySelector('.card__coupimg').style.display = 'block';
        element.addEventListener('click', add__play_song);
        element.querySelector('.card__image').removeEventListener('click', click_card_game);
    });
    document.querySelector('.button__play').style.display = 'none';
    play_active = false;
    play__button_activ();
}
let main_page_activ = false;
let play_active = false;

function add__play_song() {
    if (!event.target.classList.contains('card__coupimg')) {
        if (event.target.localName == 'div') {
            event.target.lastElementChild.play();
            let card = cards.getcard(event.target.querySelector('.card__text').innerHTML);
            card.train_click += 1;
        } else
            event.target.parentElement.lastElementChild.play();
        let card = cards.getcard(event.target.parentElement.querySelector('.card__text').innerHTML);
        card.train_click += 1;

    }
}

function menu_click() {
    {
        if (document.querySelector('.menu_element_active'))
            document.querySelector('.menu_element_active').classList.remove('menu_element_active');
        event.target.classList.add('menu_element_active');
        button_play.innerHTML = 'Start game';
        game_active = false;
        main.innerHTML = '';
        button_play.style.borderRadius = '0';
        if (event.target.innerHTML == 'Main Page') {
            cards.main_page();
            play__button_activ();
        } else {
            if (event.target.innerHTML == 'statistics') {
                createstatstable();

            } else {
                cards.cards.forEach((card) => {
                    if (card.category == event.target.innerHTML) {
                        card.add__node(main);
                    }
                });
                addevent_card();
                if (play_active)
                    cards__play_on();
                else cards__play_of();
                main_page_activ = false;
            }
        }
        play__button_activ();
    }
}

function play__button_activ() {
    if (!main_page_activ && play_active) document.querySelector('.button__play').style.display = 'block';
    else document.querySelector('.button__play').style.display = 'none';
}
cards.main_page();
// play game 
const button_play = document.querySelector('.button__play');
let game_active = false;
button_play.addEventListener('click', () => {
    if (!game_active) {
        game_add_collecting_sounds();
        game_active = true;
        button_play.style.borderRadius = '100%';
        const cards_node = document.querySelectorAll('.card');
        cards_node.forEach((el) => {
            el.querySelector('.card__image').addEventListener('click', click_card_game);
            button_play.innerHTML = 'Repeat';
        });
        collecting_sounds[0].play();
        errors = 0;
    } else {
        collecting_sounds[0].play();
    }
});
let collecting_sounds = [];
let errors = 0;
let error_mp3 = new Audio('audio/error.mp3');
let correctly_mp3 = new Audio('audio/correctly.mp3');
let win_mp3 = new Audio('audio/win.mp3');
let lose_mp3 = new Audio('audio/lose.mp3');

function game_add_collecting_sounds() {
    collecting_sounds = Array.prototype.slice.call(main.querySelectorAll('.sound'));
    collecting_sounds.sort(function() {
        return Math.random() - 0.5;
    });
}

let smile = document.createElement('div');
smile.classList.add('smile');

function click_card_game() {
    if (event.target.parentElement.lastElementChild == collecting_sounds[0]) {
        event.target.parentElement.className = 'card_no_active';
        cards.getcard(collecting_sounds[0]).play_true += 1;
        collecting_sounds.shift();
        correctly_mp3.play();
        event.target.parentElement.querySelector('.card__image').removeEventListener('click', click_card_game);
        if (collecting_sounds.length == 0) {
            button_play.style.display = 'none';
            main.innerHTML = '';

            if (errors == 0) {
                smile.style.backgroundImage = 'url(images/smailik17.png)';
                win_mp3.play();
            } else {
                smile.style.backgroundImage = 'url(images/icon_lose.png)';
                lose_mp3.play();
            }
            main.appendChild(smile);
            game_active = false;
            button_play.borderRadius = '0px';
            setTimeout(() => {
                cards.main_page();
                play__button_activ();
            }, 5000);

        } else setTimeout(() => { collecting_sounds[0].play() }, 1000);

    } else {
        error_mp3.play();
        errors++;
        cards.getcard(collecting_sounds[0]).play_false += 1;
    }
}

//table
let statistics_components = [
    ['Category', 'category'],
    ['Word', 'name'],
    ['Translation', 'translation'],
    ['Train click', 'train_click'],
    ['Correct answer', 'play_true'],
    ['Incorrect answer', 'play_false'],
    ['percentage of incorrect', 'percentage_incorrect']
];
let meintableelements = [];
let tableelements = [];
const statstable = document.createElement('div');


function createstatstable() {

    statstable.innerHTML = '';
    tableelements = [];
    meintableelements = [];
    statstable.classList.add('statstable');
    const menutable = document.createElement('div');
    menutable.classList.add('menutable');
    statstable.appendChild(menutable);
    statistics_components.forEach(element => {
        const menutable_element = document.createElement('div');
        menutable_element.classList.add('menutable_element');
        menutable_element.innerHTML = element[0];
        menutable.appendChild(menutable_element);
        menutable.addEventListener('click', sorttable);
        meintableelements.push(menutable_element);

    });
    cards.cards.forEach(card => {
        card.interestcalculation();
        const stats_card = document.createElement('div');
        stats_card.classList.add('stats_card');
        statistics_components.forEach(element => {
            const stats_card_element = document.createElement('div');
            stats_card_element.classList.add('stats_card_element');
            stats_card_element.innerHTML = card[element[1]];
            stats_card.appendChild(stats_card_element);
        });
        statstable.appendChild(stats_card);
        tableelements.push(stats_card);
    });
    main.appendChild(statstable);
};

function sorttable() {
    statistics_components.forEach(el => {
        if (el[0] == event.target.innerHTML)
            cards.sort(el[1]);
    })
    let index = 0;
    cards.cards.forEach((card) => {
        tableelements.forEach((node_element) => {
            if (card.name == node_element.children[1].innerHTML)
                node_element.style.order = index;
        });
        index++;
    });
}
window.onunload = () => {
    cards.save();
}
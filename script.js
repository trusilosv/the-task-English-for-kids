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
    }
    add__node(node = document.body) {
        this.node_text.innerHTML = this.name;
        this.node_text.classList.add('card__text');
        this.node_audio.src = this.url_mp3;
        this.node_image.src = this.url_picture;
        this.node_image.classList.add('card__image')
        this.node_element.classList.add('card');
        this.node_coupimg.src = "images/rotate.png";
        this.node_coupimg.classList.add('card__coupimg')
        this.node_element.appendChild(this.node_image);
        this.node_element.appendChild(this.node_text);
        this.node_element.appendChild(this.node_coupimg);
        this.node_element.appendChild(this.node_audio);

        node.appendChild(this.node_element);
    }
    coup() {
        if (this.click == false) {
            this.node_text.innerHTML = this.translation;
            this.node_text.style.transform = "rotateY(180deg)";
            this.node_element.style.transform = "rotateY(180deg)";
            setTimeout(() => this.click = true, 500);
        }
    }
    return_coup() {
        if (this.click) {
            setTimeout(() => {
                this.node_text.innerHTML = this.name;
                this.node_text.style.transform = "none";
            }, 300);
            this.node_element.style.transform = "none";
            this.click = false;
        }

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
    getcard(name = "") {
        for (const iterator of this.cards) {
            if (name == iterator.name || name == iterator.translation)
                return iterator;
        }
    }
    searchcategorys() {
        this.cards.forEach((card) => {
            if (!this.categorys.includes(card.category))
                this.categorys.push(card.category);
        });
    }
}


const cards_string = ["cry,плакать,Action (set A)", "dance,танцевать,Action (set A)", "dive,нырять,Action (set A)", "draw,рисовать,Action (set A)", "fly,летать,Action (set A)", "fish,ловить рыбу,Action (set A)", "hug,обнимать,Action (set A)", "jump,прыгать,Action (set A)", "open,открывать,Action (set B)", "play,играть,Action (set B)", "point,указывать,Action (set B)", "swim,плавать,Action (set B)", "ride,ездить,Action (set B)", "run,бегать,Action (set B)", "sing,петь,Action (set B)", "skip,пропускать,Action (set B)", "argue,спорить,Action (set C)", "build,строить,Action (set C)", "carry,нести,Action (set C)", "drop,падать,Action (set C)", "catch,ловить,Action (set C)", "drive,водить машину,Action (set C)", "pull,тянуть,Action (set C)", "push,толкать,Action (set C)", "big,большой,Adjective", "small,маленький,Adjective", "fast,быстрый,Adjective", "slow,медленный,Adjective", "friendly,дружелюбный,Adjective", "unfriendly,недружелюбный,Adjective", "young,молодой,Adjective", "old,старый,Adjective", "cat,кот,Animal (set A)", "chick,цыпплёнок,Animal (set A)", "chicken,курица,Animal (set A)", "dog,собака,Animal (set A)", "horse,лошадь,Animal (set A)", "pig,свинья,Animal (set A)", "rabbit,кролик,Animal (set A)", "sheep,овца,Animal (set A)", "bird,птица,Animal (set B)", "fish,рыба,Animal (set B)", "frog,лягушка,Animal (set B)", "giraffe,жираф,Animal (set B)", "lion,лев,Animal (set B)", "mouse,мышь,Animal (set B)", "turtle,черепаха,Animal (set B)", "dolphin,дельфин,Animal (set B)", "skirt,юбка,Clothes", "pants,брюки,Clothes", "blouse,блузка,Clothes", "dress,платье,Clothes", "boot,ботинок,Clothes", "shirt,рубашка,Clothes", "coat,пальто,Clothes", "shoe,туфли,Clothes", "sad,грустный,Emotion", "angry,злой,Emotion", "happy,счастливый,Emotion", "tired,уставший,Emotion", "surprised,удивленный,Emotion", "scared,испуганный,Emotion", "smile,улыбка,Emotion", "laugh,смех,Emotion"];
let cards = new Cardlist();
cards.addcards(cards_string);
cards.searchcategorys();

const main = document.querySelector('.main');
const menu = document.querySelector('.menu__list');
menu.addEventListener('click', (el) => {
    if (el.target.localName == 'li') {
        main.innerHTML = "";
        cards.cards.forEach((card) => {
            if (card.category == el.target.innerHTML) {
                card.add__node(main);
            }
        });
        addevent_card();
    }
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
        document.querySelector('.header__mod').innerHTML = "TRAIN";
        cards__play_of();
    } else {
        header__switch.firstElementChild.classList.add('switch__circle_active');
        document.querySelector('.header__mod').innerHTML = "PLAY";
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
        element.addEventListener('click', (el) => {
            if (!el.target.classList.contains('card__coupimg')) {
                if (el.target.localName == 'div')
                    el.target.lastElementChild.play();
                else
                    el.target.parentElement.lastElementChild.play();
            }
        });
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
    });
    document.querySelector('.button__play').style.display = 'block';

}

function cards__play_of() {
    const cards_node = document.querySelectorAll('.card');
    cards_node.forEach((element) => {
        element.querySelector('.card__image').style.height = '200px';
        element.querySelector('.card__text').style.display = 'block';
        element.querySelector('.card__coupimg').style.display = 'block';
    });
    document.querySelector('.button__play').style.display = 'none';

}
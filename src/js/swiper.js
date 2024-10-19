import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
import { Navigation , EffectCube} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
    modules: [ Navigation, EffectCube ],
    direction: 'horizontal',
    loop: false,
    speed: 800,
    effect: 'cube',
    allowTouchMove: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    initialSlide: 0,
    on: {
        slideChange: function() {
            const activeSlideIndex = this.activeIndex;
            const listItems = document.querySelectorAll('.program__item');

            listItems.forEach((item, index) => {
                if (index === activeSlideIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    },
});

document.querySelector('.program__item').classList.add('active');

const listItems = document.querySelectorAll('.program__item');
listItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        swiper.slideTo(index); // Переход к соответствующему слайду

        // Убираем класс 'active' у всех элементов и добавляем его только к текущему
        listItems.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');
    });
});
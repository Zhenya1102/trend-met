import Swiper from 'swiper';
import { Navigation, EffectCube } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    const programSection = document.querySelector('.program');
    const listItems = document.querySelectorAll('.program__item');
    let isScrollLocked = false;
    let isProcessingScroll = false; // Новый флаг для обработки скролла
    let swiper;
    const mediaQuery = window.matchMedia('(max-width: 1130px)');

    // Функция блокировки и разблокировки скролла
    const lockScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
        document.body.style.overflow = '';
    };

    // Функция для обновления активного элемента списка и слайда
    const updateActiveSlide = (index) => {
        swiper.slideTo(index);
        listItems.forEach((el) => el.classList.remove('active'));
        listItems[index].classList.add('active');
    };

    // Проверка медиазапроса и управление скроллом
    const handleMediaChange = (e) => {
        if (e.matches) {
            // Если ширина экрана меньше или равна 1130px
            unlockScroll(); // Убираем блокировку скролла
            window.removeEventListener('wheel', handleWheelScroll); // Отключаем обработчик скролла
        } else {
            // Если ширина экрана больше 1130px
            observer.observe(programSection); // Активируем наблюдателя
            window.addEventListener('wheel', handleWheelScroll, { passive: false }); // Активируем обработчик скролла
        }
    };

    // Создаем наблюдателя, который отслеживает, когда блок программы виден полностью на экране
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !mediaQuery.matches) {
                isScrollLocked = true;
                lockScroll();
            } else {
                isScrollLocked = false;
                unlockScroll();
            }
        });
    }, {
        root: null,
        threshold: 0.9
    });

    observer.observe(programSection);

    // Обработчик для скролла, синхронизируем слайдер и список
    const handleWheelScroll = (event) => {
        if (isScrollLocked && !isProcessingScroll) {
            event.preventDefault();
            isProcessingScroll = true; // Начинаем обработку скролла

            const delta = event.deltaY;
            const activeIndex = swiper.activeIndex;

            if (delta > 0 && activeIndex < listItems.length - 1) {
                updateActiveSlide(activeIndex + 1);
            } else if (delta < 0 && activeIndex > 0) {
                updateActiveSlide(activeIndex - 1);
            } else if (activeIndex === listItems.length - 1) {
                isScrollLocked = false;
                unlockScroll();
            }

            // Устанавливаем таймер для разблокировки скролла после обработки
            setTimeout(() => {
                isProcessingScroll = false; // Завершаем обработку скролла
            }, 800); // Выберите задержку в зависимости от ваших нужд
        }
    };

    // Добавляем обработчик для колеса мыши, если медиазапрос не срабатывает
    if (!mediaQuery.matches) {
        window.addEventListener('wheel', handleWheelScroll, { passive: false });
    }

    // Добавляем события кликов на элементы списка
    listItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateActiveSlide(index);

            if (index === listItems.length - 1) {
                isScrollLocked = false;
                unlockScroll();
            }
        });
    });

    // Инициализация слайдера
    swiper = new Swiper('.swiper', {
        modules: [Navigation, EffectCube],
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
            slideChange: function () {
                const activeSlideIndex = this.activeIndex;
                listItems.forEach((item, index) => {
                    if (index === activeSlideIndex) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });

                if (activeSlideIndex === listItems.length - 1) {
                    isScrollLocked = false;
                    unlockScroll();
                }
            },
        },
    });

    // Устанавливаем первый элемент списка как активный по умолчанию
    listItems[0].classList.add('active');

    // Проверяем медиазапрос при загрузке страницы
    handleMediaChange(mediaQuery);

    // Добавляем слушатель для изменения состояния медиазапроса
    mediaQuery.addEventListener('change', handleMediaChange);
});




// import Swiper from 'swiper';
// import { Navigation, EffectCube } from 'swiper/modules';
//
// document.addEventListener('DOMContentLoaded', () => {
//     const programSection = document.querySelector('.program');
//     const listItems = document.querySelectorAll('.program__item');
//     let isScrollLocked = false;
//     let swiper;
//     const mediaQuery = window.matchMedia('(max-width: 1130px)');
//
//     // Функция блокировки и разблокировки скролла
//     const lockScroll = () => {
//         document.body.style.overflow = 'hidden';
//     };
//
//     const unlockScroll = () => {
//         document.body.style.overflow = '';
//     };
//
//     // Функция для обновления активного элемента списка и слайда
//     const updateActiveSlide = (index) => {
//         swiper.slideTo(index);
//         listItems.forEach((el) => el.classList.remove('active'));
//         listItems[index].classList.add('active');
//     };
//
//     // Проверка медиазапроса и управление скроллом
//     const handleMediaChange = (e) => {
//         if (e.matches) {
//             // Если ширина экрана меньше или равна 1130px
//             unlockScroll(); // Убираем блокировку скролла
//             window.removeEventListener('wheel', handleWheelScroll); // Отключаем обработчик скролла
//         } else {
//             // Если ширина экрана больше 1130px
//             observer.observe(programSection); // Активируем наблюдателя
//             window.addEventListener('wheel', handleWheelScroll); // Активируем обработчик скролла
//         }
//     };
//
//     // Создаем наблюдателя, который отслеживает, когда блок программы виден полностью на экране
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting && !mediaQuery.matches) {
//                 isScrollLocked = true;
//                 lockScroll();
//             } else {
//                 isScrollLocked = false;
//                 unlockScroll();
//             }
//         });
//     }, {
//         root: null,
//         threshold: 0.9
//     });
//
//     observer.observe(programSection);
//
//     // Обработчик для скролла, синхронизируем слайдер и список
//     const handleWheelScroll = (event) => {
//         if (isScrollLocked) {
//             event.preventDefault();
//
//             const delta = event.deltaY;
//             const activeIndex = swiper.activeIndex;
//
//             if (delta > 0 && activeIndex < listItems.length - 1) {
//                 updateActiveSlide(activeIndex + 1);
//             } else if (delta < 0 && activeIndex > 0) {
//                 updateActiveSlide(activeIndex - 1);
//             } else if (activeIndex === listItems.length - 1) {
//                 isScrollLocked = false;
//                 unlockScroll();
//             }
//         }
//     };
//
//     // Добавляем обработчик для колеса мыши, если медиазапрос не срабатывает
//     if (!mediaQuery.matches) {
//         window.addEventListener('wheel', handleWheelScroll);
//     }
//
//     // Добавляем события кликов на элементы списка
//     listItems.forEach((item, index) => {
//         item.addEventListener('click', () => {
//             updateActiveSlide(index);
//
//             if (index === listItems.length - 1) {
//                 isScrollLocked = false;
//                 unlockScroll();
//             }
//         });
//     });
//
//     // Инициализация слайдера
//     swiper = new Swiper('.swiper', {
//         modules: [Navigation, EffectCube],
//         direction: 'horizontal',
//         loop: false,
//         speed: 800,
//         effect: 'cube',
//         allowTouchMove: true,
//         navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//         },
//         initialSlide: 0,
//         on: {
//             slideChange: function () {
//                 const activeSlideIndex = this.activeIndex;
//                 listItems.forEach((item, index) => {
//                     if (index === activeSlideIndex) {
//                         item.classList.add('active');
//                     } else {
//                         item.classList.remove('active');
//                     }
//                 });
//
//                 if (activeSlideIndex === listItems.length - 1) {
//                     isScrollLocked = false;
//                     unlockScroll();
//                 }
//             },
//         },
//     });
//
//     // Устанавливаем первый элемент списка как активный по умолчанию
//     listItems[0].classList.add('active');
//
//     // Проверяем медиазапрос при загрузке страницы
//     handleMediaChange(mediaQuery);
//
//     // Добавляем слушатель для изменения состояния медиазапроса
//     mediaQuery.addEventListener('change', handleMediaChange);
// });


//
// const swiper = new Swiper('.swiper', {
//     modules: [ Navigation, EffectCube ],
//     direction: 'horizontal',
//     loop: false,
//     speed: 800,
//     effect: 'cube',
//     allowTouchMove: true,
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     initialSlide: 0,
//     // on: {
//     //     slideChange: function() {
//     //         const activeSlideIndex = this.activeIndex;
//     //         const listItems = document.querySelectorAll('.program__item');
//     //
//     //         listItems.forEach((item, index) => {
//     //             if (index === activeSlideIndex) {
//     //                 item.classList.add('active');
//     //             } else {
//     //                 item.classList.remove('active');
//     //             }
//     //         });
//     //     }
//     // },
//
// });


// const listItems = document.querySelectorAll('.program__item');
// listItems.forEach((item, index) => {
//     item.addEventListener('click', () => {
//         swiper.slideTo(index); // Переход к соответствующему слайду
//
//         // Убираем класс 'active' у всех элементов и добавляем его только к текущему
//         listItems.forEach((el) => el.classList.remove('active'));
//         item.classList.add('active');
//     });
// });
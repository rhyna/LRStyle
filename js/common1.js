function initMap() {
    var uluru = {lat: 55.6902, lng: 37.4227}; // 55.6901,37.4219
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru,
        scrollwheel: false
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: './assets/icon-point.svg'
    });
};

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

/*    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }*/

    // other browser
    return false;
}

function stickyHeader() {
    var $placeholder = $('.header-placeholder');
    var $header = $('.header');
    var $topmenu = $('.topmenu');
    var $searchbar = $('.searchbar');
    var fixed_header_height = 90 + 52 + 50; // высота шапки и навигации в обычном режиме + 50 пикселей для более ровной работы
    var point_when_header_resized = 200;
    var currentScrollTop = $(document).scrollTop();

    if(!$placeholder.hasClass('header-placeholder--visible')) {
        if($(document).scrollTop() > point_when_header_resized) {
            // если мы доскроллили до конца шапки, фиксируем шапку и навигацию, расперев место шапки плейсхолдером
            $header.addClass('header--fixed');
            $topmenu.addClass('topmenu--fixed');
            $searchbar.addClass('searchbar--fixed');
            $placeholder.addClass('header-placeholder--visible');
        }
    } else {
        // если плейсолдер виден, значит, меню уже зафиксировано
        // проверяем, откреплять ли его, в зависимости от того, сколько проскроллили
        if($(document).scrollTop() <= point_when_header_resized) {
            // если позиция скролла меньше высоты шапки, возвращаем шапку в обычное состояние, а плейсхолдер убрираем
            $placeholder.removeClass('header-placeholder--visible');
            $header.removeClass('header--fixed');
            $topmenu.removeClass('topmenu--fixed');
            $searchbar.removeClass('searchbar--fixed');
        }

        if(detectIE() === false) {
            if(currentScrollTop < lastScrollTop){
                $('.topmenu--fixed').addClass('topmenu--fixed-visible');
            } else {
                $('.topmenu--fixed').removeClass('topmenu--fixed-visible');
            }
        } else {
            $('.topmenu--fixed').addClass('topmenu--fixed-visible');
        }

    }

    lastScrollTop = currentScrollTop;
}

stickyHeader();
window.onload = stickyHeader;
$(window).scroll(stickyHeader);

var lastScrollTop = $(document).scrollTop();

$(document).ready(function($) {
    $('.home-special__content').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
        responsive: [
            {
                breakpoint: 570,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    variableWidth: true
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    variableWidth: true
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    variableWidth: true
                }
            },
        ]
    });

    function advantagesSlick() {
        var advantages = $('.home-advantages__content');
        var config = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 2,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        //variableWidth: true
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        //variableWidth: true
                    }
                },
            ]
        };

        if($(window).outerWidth() <= 1023 || $('body').hasClass('mobile-view')) { /// zzz
            advantages.not('.slick-initialized').slick(config);
        } else {
            if(advantages.hasClass('slick-initialized')) {
                advantages.slick('unslick');
            }
        }
    }

    advantagesSlick();
    $(window).resize(advantagesSlick);

    $(document).on('mouseover', '.topmenu-item>span, .topmenu-popup', function() {
        $('.under-layer').addClass('under-layer--visible'); // z-index = 10
    });
    $(document).on('mouseleave', '.topmenu-item>span, .topmenu-popup', function() {
        $('.under-layer').removeClass('under-layer--visible');
    });

    $(document).on('mouseover', '.header--fixed, .topmenu--fixed', function() {
        if(!$('.searchbar').hasClass('searchbar--visible')) {
            //$('.topmenu--fixed').addClass('topmenu--fixed-visible');
            $('.header--fixed').addClass('header--fixed-visible');
        }
    });
    $(document).on('mouseleave', '.header--fixed, .topmenu--fixed', function() {
        if(!$('.searchbar').hasClass('searchbar--visible')) {
            //$('.topmenu--fixed').removeClass('topmenu--fixed-visible');
            $('.header--fixed').removeClass('header--fixed-visible');
        }
    });

    $('.header-loupe').click(function () {
        $('.searchbar').addClass('searchbar--visible');
        $('.under-layer').addClass('under-layer--visible-under-searchbar'); // z-index = 12
        $('.topmenu--fixed').removeClass('topmenu--fixed-visible');
        $('.header').addClass('header--under-search-panel');
    })
    $('.searchbar-close').click(function () {
        $('.searchbar').removeClass('searchbar--visible');
        $('.under-layer').removeClass('under-layer--visible-under-searchbar');
        $('.header').removeClass('header--under-search-panel');
    });

    $(document).on('mouseover', '.topmenu', function() {
        $(this).addClass('topmenu--fixed-visible-when-cart-hovered');
    });
    $(document).on('mouseleave', '.topmenu', function() {
        $(this).removeClass('topmenu--fixed-visible-when-cart-hovered');
    });

    function cartWithGoods() {
        if($(window).width() > 1023 && $(window).width() <= 1399){
            $('.topmenu-cart--with-goods').find('.header-mobile-cart__counter').addClass('header-mobile-cart__counter--visible');
        } else {
            $('.topmenu-cart--with-goods').find('.header-mobile-cart__counter').removeClass('header-mobile-cart__counter--visible');
        }
    }
    cartWithGoods();
    $(window).resize(cartWithGoods);

    // в Битриксе еще добавляются в эту функцию старые скрипты
});

// плавно скрывает и показывает содержимое услуг по клику на картинку
$('.home-services-item-image').click(function (e) {
    if($(window).width() <= 1023 || $('body').hasClass('mobile-view')){ /// zzz
        e.preventDefault();
        if ( $(this).next(".home-services-item-list").is( ":hidden" ) ) {
            $(this).next(".home-services-item-list").show( "slow" );
            $(this).closest('.home-services-item').addClass('home-services-item--active');
        } else {
            $(this).next(".home-services-item-list").slideUp();
            $(this).closest('.home-services-item').removeClass('home-services-item--active');
        }
    }
});

$(window).resize(function () {
    if($(window).width() > 1023 && !$('body').hasClass('mobile-view')) { /// zzz
        $(".home-services-item-list").css({
            'display':"block"
        });
        $('.home-services-item').removeClass('home-services-item--active');
    } else {
        $(".home-services-item-list").css({
            'display':"none"
        })
    }
});

$('.header-mobile-sandwich').click(function () {
    $('.sandwich-menu').addClass('sandwich-menu--visible');
    $('.under-layer').addClass('under-layer--visible');
    $('body').addClass('when-sandwich-menu-visible');
    $('.searchbar').removeClass('searchbar--mobile-visible')
    $('.header-mobile-search').removeClass('header-mobile-search--active');
    $('.under-layer').removeClass('under-layer--searchbar-mobile-visible');

});

$('.sandwich-menu-close').click(function () {
    $('.sandwich-menu').removeClass('sandwich-menu--visible');
    $('.under-layer').removeClass('under-layer--visible');
    $('body').removeClass('when-sandwich-menu-visible');
});

$('.header-mobile-search').click(function (){
    $(this).addClass('header-mobile-search--active');
    $('.searchbar').addClass('searchbar--mobile-visible');
    $('.under-layer').addClass('under-layer--searchbar-mobile-visible');
    setTimeout(function () {
        $('.searchbar__input').focus();
    }, 500);
});

$('.searchbar-close').click(function () {
    $('.searchbar').removeClass('searchbar--mobile-visible');
    $('.header-mobile-search').removeClass('header-mobile-search--active');
    $('.searchbar__input').blur();
    $('.under-layer').removeClass('under-layer--searchbar-mobile-visible');
})

$('.sandwich-menu-models-item').click(function (e) {
    var id = $(this).attr('href');
    if($(id).length) {
        e.preventDefault();
        $('.sandwich-menu').addClass('sandwich-menu--submenu-opened');
        $(id).addClass('sandwich-menu__link-content--visible');
    }
});

$('.sandwich-menu-submenu__header').click(function () {
    $('.sandwich-menu').removeClass('sandwich-menu--submenu-opened');
    $('.sandwich-menu__link-content').removeClass('sandwich-menu__link-content--visible');
});


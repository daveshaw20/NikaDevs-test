$(function () {

    /* button-nav */

    // $('.button-nav').click(function () {
    //     $(this).toggleClass('active'),
    //         $('.main-nav-list').slideToggle();
    //     return false;
    // });

    /* control */

    // if ($('.styled').length) {
    //     $('.styled').styler();
    // }

});

var nav = jQuery('.b-info-search'),
    se = jQuery('.form-body__icone'),
    ul  = jQuery('.b-info-side');


function windowSize(){

    if ($(window).width() <= '767') {
        // nav.detach();
        nav.css('display', 'none');
        ul.insertAfter(".navbar-toggle");
        $('.b-main-menu').addClass('navbar-fixed-top');
        se.insertAfter(".b-info-side");
    } else {
        $('.b-main-menu').removeClass('navbar-fixed-top');
        nav.css('display', 'block');
        ul.insertAfter(".b-info-search__form");
        se.insertBefore(".search-input");
    }

}
$(window).on('load resize',windowSize);

//popup with form

$(document).ready(function() {    // говорит о готовности происходящего

    $(".popup").magnificPopup();   // вызов при нажатии на <a.popup> формы
    $("#form").submit(function() {   // та самая форма (скрытого папап)
        var th = $(this);
        $.ajax({
            type: "POST",              // метод
            url: "./mail.php",     // ссыл на то место где php обработчик
            data: th.serialize()           // преобразуем в строку
        }).done(function() {
            alert('Заявка отправлена!');
            setTimeout(function() {
                th.trigger("reset");
                $.magnificPopup.close();
            }, 1000);
        });
        return false;
    });
});

// only send form 480p

$(document).ready(function() {

    $("#form2, #form3").submit(function() {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "./mail.php",
            data: th.serialize()
        }).done(function() {
            alert('Заявка отправлена!');
            setTimeout(function() {
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

});

// only popup function

$(document).ready(function() {
    $(".popup1, .popup2").magnificPopup();
});

// anhor

$(document).ready(function() {

    $('a[href="#logo"], a[href="#about--us"], a[href="#how--it--work"], a[href="#prise"]').click(function(){
        var scroll = $(this).attr('href');
        if ($(scroll).length != 0) {
            $('html, body').animate({scrollTop: ($(scroll).offset().top - 30)}, 500);
        }
    });

});

// slider

$(document).ready(function(){
    $('.single-item').slick({
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        zIndex: 1000
    });
});
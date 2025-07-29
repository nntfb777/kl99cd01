function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$('.count').each(function () {
    $(this).prop('Counter', 10).animate({
        Counter: $(this).text()
    }, {
        duration: 3000,
        easing: 'swing',
        step: function (now) {
            $(this).text(numberWithCommas(Math.ceil(now)));
        }
    });
});


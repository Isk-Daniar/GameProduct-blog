var addthis_config={data_track_addressbar:!0};

$(window).load(function() {
    $('.before-after').twentytwenty()
})

$(document).ready(function() {

    // Animate the scroll to top
    $('.anchor').on('click', function(event) {
        event.preventDefault()
        var hash = $(this).data('href')

        $('html, body').animate({scrollTop: $(hash).offset().top}, 300, function() {
            //window.location.hash = hash
        })
    })

    $('body').tooltip({
        selector: '[data-toggle="tooltip"]',
    })

    $('#main-navigation .dropdown-menu').bind('click', function(e) {
        e.stopPropagation()
    })

    var $tabs = $('.nav-tabs li')

    $('#prevtab:not(.skip), .prevtab:not(.skip)').on('click', function() {
        $tabs.filter('.active').prevAll('li:not(.skip)').first().find('a[data-toggle="tab"]').tab('show')
    })

    $('#nexttab:not(.skip), .nexttab:not(.skip)').on('click', function() {
        $tabs.filter('.active').nextAll('li:not(.skip)').first().find('a[data-toggle="tab"]').tab('show')
    })

    $('.nav .disabled').on('click', function(e) {
        e.preventDefault()
        return false
    })

    $('.vertical-scroll').mCustomScrollbar({
        scrollButtons: {
            enable: false,
        },
        scrollInertia: 200,
        advanced: {autoExpandVerticalScroll: true, updateOnContentResize: true},
        mouseWheelPixels: 'auto',
    })
    $('.horizontal-scroll').mCustomScrollbar({
        horizontalScroll: true,
        scrollButtons: {
            enable: false,
        },
        scrollInertia: 200,
        advanced: {autoExpandHorizontalScroll: true, updateOnContentResize: true},
    })
})

$(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
        $('.go-top').addClass('show')
    }
    else {
        $('.go-top').removeClass('show')
    }

    if ($(this).scrollTop() < 500) {
        $('.go-bottom').addClass('show')
    }
    else {
        $('.go-bottom').removeClass('show')
    }

    $('body').css('background-position', 'center ' + (-window.pageYOffset / 8) + 'px')
    $('.header-paralax').css('background-position', 'center ' + (-window.pageYOffset / 2) + 'px')

    $('.paralax').each(function() {
        var position = (-window.pageYOffset) + $(this).offset().top

        position = -(position / 8)

        if (position >= ($(this).height() + $(this).height() / 2)) {
            position = 'bottom'
        }
        else if (position < -($(this).height() / 2)) {
            position = 'top'
        }
        else {
            position += 'px'
        }

        console.log(position)

        $(this).css('background-position', 'center ' + position)
    })
})
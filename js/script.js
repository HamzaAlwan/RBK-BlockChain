$(document).ready(function (e) {
    $('#fixed-nav').scrollToFixed();
    $('.res-nav_click').click(function () {
        $('.main-nav').slideToggle();
        return false
    });
});


wow = new WOW({
    animateClass: 'animated',
    offset: 100
});
wow.init();

$(window).on('load', function () { // makes sure that whole site is loaded
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
});


$(window).load(function () {

    $('.main-nav li a, .structurelink').bind('click', function (event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 102
        }, 1500, 'easeInOutExpo');
        /*
        if you don't want to use the easing effects:
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        */
        if ($(window).width() < 991) {
            $('.main-nav').hide();
        }
        event.preventDefault();
    });
});

$(window).load(function () {

    $('#home a').bind('click', function (event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 102
        }, 1500, 'easeInOutExpo');
        /*
        if you don't want to use the easing effects:
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        */
        if ($(window).width() < 991) {
            $('.main-nav').hide();
        }
        event.preventDefault();
    });
});



$(window).load(function () {
    var $container = $('.portfolioContainer'),
        $body = $('body'),
        colW = 375,
        columns = null;


    $container.isotope({
        // disable window resizing
        resizable: true,
        masonry: {
            columnWidth: colW
        }
    });

    $(window).smartresize(function () {
        // check if columns has changed
        var currentColumns = Math.floor(($body.width() - 30) / colW);
        if (currentColumns !== columns) {
            // set new column count
            columns = currentColumns;
            // apply width to container manually, then trigger relayout
            $container.width(columns * colW)
                .isotope('reLayout');
        }

    }).smartresize(); // trigger resize to set container width
    $('.portfolioFilter a').click(function () {
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');

        var selector = $(this).attr('data-filter');
        $container.isotope({

            filter: selector,
        });
        return false;
    });

});



function checkScroll() {
    var $bottom = $("#home-logo").offset().top;
    if ($(window).scrollTop() > $bottom - 10) {
        $('#smalllogo').show(300);
        $('#fixed-nav #modal-trigger').css({
            top: "20px"
        });
    } else {
        $('#smalllogo').hide(500);
        $('#fixed-nav #modal-trigger').css({
            top: "1px"
        });

    }
}

if ($('.main-nav-outer').length > 0) {
    $(window).on("scroll load resize", function () {
        checkScroll();
    });
}



/* Modal */

jQuery(document).ready(function ($) {
    //trigger the animation - open modal window
    $('[data-type="modal-trigger"]').on('click', function () {
        var actionBtn = $(this),
            scaleValue = retrieveScale(actionBtn.next('.cd-modal-bg'));

        actionBtn.addClass('to-circle');
        actionBtn.next('.cd-modal-bg').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
        });

        //if browser doesn't support transitions...
        if (actionBtn.parents('.no-csstransitions').length > 0) animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
    });

    //trigger the animation - close modal window
    $('.cd-section .cd-modal-close').on('click', function () {
        closeModal();
    });
    $(document).keyup(function (event) {
        if (event.which == '27') closeModal();
    });

    $(window).on('resize', function () {
        //on window resize - update cover layer dimention and position
        if ($('.cd-section.modal-is-visible').length > 0) window.requestAnimationFrame(updateLayer);
    });

    function retrieveScale(btn) {
        var btnRadius = btn.width() / 2,
            left = btn.offset().left + btnRadius,
            top = btn.offset().top + btnRadius - $(window).scrollTop(),
            scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());

        btn.css('position', 'fixed').velocity({
            top: top - btnRadius,
            left: left - btnRadius,
            translateX: 0,
        }, 0);

        return scale;
    }

    function scaleValue(topValue, leftValue, radiusValue, windowW, windowH) {
        var maxDistHor = (leftValue > windowW / 2) ? leftValue : (windowW - leftValue),
            maxDistVert = (topValue > windowH / 2) ? topValue : (windowH - topValue);
        return Math.ceil(Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) / radiusValue);
    }

    function animateLayer(layer, scaleVal, bool) {
        layer.velocity({
            scale: scaleVal
        }, 400, function () {
            $('body').toggleClass('overflow-hidden', bool);
            (bool) ?
            layer.parents('.cd-section').addClass('modal-is-visible').end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'): layer.removeClass('is-visible').removeAttr('style').siblings('[data-type="modal-trigger"]').removeClass('to-circle');
        });
    }

    function updateLayer() {
        var layer = $('.cd-section.modal-is-visible').find('.cd-modal-bg'),
            layerRadius = layer.width() / 2,
            layerTop = layer.siblings('.btn').offset().top + layerRadius - $(window).scrollTop(),
            layerLeft = layer.siblings('.btn').offset().left + layerRadius,
            scale = scaleValue(layerTop, layerLeft, layerRadius, $(window).height(), $(window).width());

        layer.velocity({
            top: layerTop - layerRadius,
            left: layerLeft - layerRadius,
            scale: scale,
        }, 0);
    }

    function closeModal() {
        var section = $('.cd-section.modal-is-visible');
        section.removeClass('modal-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            animateLayer(section.find('.cd-modal-bg'), 1, false);
        });
        //if browser doesn't support transitions...
        if (section.parents('.no-csstransitions').length > 0) animateLayer(section.find('.cd-modal-bg'), 1, false);
    }
});


$(function () {

    $("#services-tabs").responsiveTabs({
        animation: 'slide',
        duration: 500,
        startCollapsed: 'accordion'
    });

});


$(window).bind("resize", function () {
    if ($(this).width() < 768) {
        $('#arrow').removeClass('fa fa-arrow-right').addClass('fa fa-arrow-down');
        $('#arrow-right').removeClass('fadeInLeft').addClass('fadeInUp');
        $('#modal-title').removeClass('title');
    } else {
        $('#arrow').removeClass('fa fa-arrow-down').addClass('fa fa-arrow-right');
        $('#arrow-right').removeClass('fadeInUp').addClass('fadeInLeft');
        $('#modal-title').addClass('title');
    }
}).trigger('resize');



$(function () {
    $('.owl-schedule').owlCarousel({
        singleItem: true,
        pagination: true,
        items: 1,
        smartSpeed: 700,
        loop: false,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 1
            },
        }
    });
});






jQuery(document).ready(function () {
    var modalTriggerBts = $('a[data-type="cd-modal-trigger"]'),
        coverLayer = $('.cd-cover-layer');

    /*
    	convert a cubic bezier value to a custom mina easing
    	http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg
    */
    var duration = 600,
        epsilon = (1000 / 60 / duration) / 4,
        firstCustomMinaAnimation = bezier(.63, .35, .48, .92, epsilon);

    modalTriggerBts.each(function () {
        initModal($(this));
    });

    function initModal(modalTrigger) {
        var modalTriggerId = modalTrigger.attr('id'),
            modal = $('.cd-modal[data-modal="' + modalTriggerId + '"]'),
            svgCoverLayer = modal.children('.cd-svg-bg'),
            paths = svgCoverLayer.find('path'),
            pathsArray = [];
        //store Snap objects
        pathsArray[0] = Snap('#' + paths.eq(0).attr('id')),
            pathsArray[1] = Snap('#' + paths.eq(1).attr('id')),
            pathsArray[2] = Snap('#' + paths.eq(2).attr('id'));

        //store path 'd' attribute values	
        var pathSteps = [];
        pathSteps[0] = svgCoverLayer.data('step1');
        pathSteps[1] = svgCoverLayer.data('step2');
        pathSteps[2] = svgCoverLayer.data('step3');
        pathSteps[3] = svgCoverLayer.data('step4');
        pathSteps[4] = svgCoverLayer.data('step5');
        pathSteps[5] = svgCoverLayer.data('step6');

        //open modal window
        modalTrigger.on('click', function (event) {
            event.preventDefault();
            modal.addClass('modal-is-visible');
            coverLayer.addClass('modal-is-visible');
            animateModal(pathsArray, pathSteps, duration, 'open');
            $("#fixed-nav").fadeOut(300);
            $('.apply-btn').fadeOut(300)
        });

        //close modal window
        modal.on('click', '.modal-close', function (event) {
            event.preventDefault();
            modal.removeClass('modal-is-visible');
            coverLayer.removeClass('modal-is-visible');
            animateModal(pathsArray, pathSteps, duration, 'close')
            $("#fixed-nav").slideDown(400)
            $('.apply-btn').show()
        });
    }

    function animateModal(paths, pathSteps, duration, animationType) {
        var path1 = (animationType == 'open') ? pathSteps[1] : pathSteps[0],
            path2 = (animationType == 'open') ? pathSteps[3] : pathSteps[2],
            path3 = (animationType == 'open') ? pathSteps[5] : pathSteps[4];
        paths[0].animate({
            'd': path1
        }, duration, firstCustomMinaAnimation);
        paths[1].animate({
            'd': path2
        }, duration, firstCustomMinaAnimation);
        paths[2].animate({
            'd': path3
        }, duration, firstCustomMinaAnimation);
    }

    function bezier(x1, y1, x2, y2, epsilon) {
        //https://github.com/arian/cubic-bezier
        var curveX = function (t) {
            var v = 1 - t;
            return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
        };

        var curveY = function (t) {
            var v = 1 - t;
            return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
        };

        var derivativeCurveX = function (t) {
            var v = 1 - t;
            return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
        };

        return function (t) {

            var x = t,
                t0, t1, t2, x2, d2, i;

            // First try a few iterations of Newton's method -- normally very fast.
            for (t2 = x, i = 0; i < 8; i++) {
                x2 = curveX(t2) - x;
                if (Math.abs(x2) < epsilon) return curveY(t2);
                d2 = derivativeCurveX(t2);
                if (Math.abs(d2) < 1e-6) break;
                t2 = t2 - x2 / d2;
            }

            t0 = 0, t1 = 1, t2 = x;

            if (t2 < t0) return curveY(t0);
            if (t2 > t1) return curveY(t1);

            // Fallback to the bisection method for reliability.
            while (t0 < t1) {
                x2 = curveX(t2);
                if (Math.abs(x2 - x) < epsilon) return curveY(t2);
                if (x > x2) t0 = t2;
                else t1 = t2;
                t2 = (t1 - t0) * .5 + t0;
            }

            // Failure
            return curveY(t2);

        };
    };
});



var inputs = document.querySelectorAll('.file-input')

for (var i = 0, len = inputs.length; i < len; i++) {
    customInput(inputs[i])
}

function customInput(el) {
    var fileInput = el.querySelector('[type="file"]')
    var label = el.querySelector('[data-js-label]')

    fileInput.onchange =
        fileInput.onmouseout = function () {
            if (!fileInput.value) return

            var value = fileInput.value.replace(/^.*[\\\/]/, '')
            el.className += ' -chosen'
            label.innerText = value
        }
}


function goHome() {
    window.location.href = "/"
}
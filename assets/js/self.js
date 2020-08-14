"use strict";
var jQuery = $;

/**
 * Mobile Navigation Animate
 * Sliders
 * Animations(Wow.js)
 * Carousels
 * Filtor Works(isotope.js)
 * Scroll to Top  
 * Image pop up view(magnific-popup.js)  
 * Number Counter
 * Scroll to Top  Support
 *
 */

jQuery(function($) {
    function preloader() {
        var preloader = $('.preloaderInit');
        preloader.preloadinator({
            minTime: 2000
        });
    }

    function hamburgerAnimate() {
        var hamburgerSelector = $('.navbar-toggler');
        hamburgerSelector.click(function(e) {
            e.preventDefault();
            $(this).find('.hamburger').toggleClass('is-active');
        });
    }

    function mainSlider() {
        let mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: true,
            effect: "coverflow", // "slide", "fade", "cube", "coverflow", "flip"
            speed: 1000,
            // If we need autoplay
            autoplay: {
                delay: 5000,
            },
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '">0' + (index + 1) + '</span>';
                },
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        });
    }

    function carouselSlider() {
        $('#testimonialSlider').owlCarousel({
            loop: true,
            margin: 0,
            responsiveClass: true,
            autoplay: true,
            dots: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                520: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
        $('#clients').owlCarousel({
            loop: true,
            margin: 20,
            responsiveClass: true,
            autoplay: true,
            dots: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                520: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });
    } // carouselSlider 

    function filtorProduct() {
        // init Isotope
        var $ProductGrid = $('.our-works').isotope({
            itemSelector: '.works-items',
            layoutMode: 'fitRows'
        });
        // filter items on button click
        $('.works-filter').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $ProductGrid.isotope({
                filter: filterValue
            });
        });
    } // filtorProduct // NEW ARRIVAL

    function onScoll() {
        var goTopBtn = document.getElementById("goTop");
        document.querySelector('body').onscroll = function() {
            if (window.scrollY >= 200) {
                goTopBtn.style.display = "inline-block";
            } else {
                goTopBtn.style.display = "none";
            }
        };
    } // page scroll

    function imgPopup() {
        $('.img-popup').magnificPopup({
            gallery: {
                enabled: true
            },
            type: 'image'
        });
    }

    function animateWithWOW() {
        var wow = new WOW({
            boxClass: 'wow', // default
            animateClass: 'animated', // default
            offset: 0, // default
            mobile: true, // default
            live: true // default
        });
        wow.init();
    }

    function counter() {
        var counterItem = $('.counter');
        counterItem.counterUp({
            delay: 10,
            time: 1000
        });
    }

    function contactFormSubmit() {
        var contactForm = $('#archtera-form');
        contactForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "bat/contact-mailer.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                contactForm.prepend("<p id='msg' class='text-success font-medium col-lg-12 clearfix mb-3'>Enquiry mail submit successfully.</b>");
                contactForm.trigger("reset");
                $('#msg').delay(4000).fadeOut();
            });
            return false;
        });
    }

    function faqFormSubmit() {
        var faqForm = $('#faq-form');
        faqForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "bat/faq-mailer.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                faqForm.prepend("<p id='msg' class='text-success font-medium col-lg-12 clearfix mb-3'>Your query submited successfully.</b>");
                faqForm.trigger("reset");
                $('#msg').delay(4000).fadeOut();
            });
            return false;
        });
    }
    $("#goTop").click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
        return false;
    });
    preloader();
    hamburgerAnimate();
    mainSlider();
    carouselSlider();
    filtorProduct();
    onScoll();
    imgPopup();
    counter();
    animateWithWOW();
    contactFormSubmit();
    faqFormSubmit();
    var stickyToggle = function(sticky, stickyWrapper, scrollElement) {
        var stickyHeight = sticky.outerHeight();
        var stickyTop = stickyWrapper.offset().top;
        if (scrollElement.scrollTop() >= stickyTop) {
            stickyWrapper.height(stickyHeight);
            sticky.addClass("is-sticky");
        } else {
            sticky.removeClass("is-sticky");
            stickyWrapper.height('auto');
        }
    };


    // Find all data-toggle="sticky-onscroll" elements
    $('[data-toggle="sticky-onscroll"]').each(function() {
        var sticky = $(this);
        var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
        sticky.before(stickyWrapper);
        sticky.addClass('sticky');

        // Scroll & resize events
        $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function() {
            stickyToggle(sticky, stickyWrapper, $(this));
        });

        // On page load
        stickyToggle(sticky, stickyWrapper, $(window));
    });

});
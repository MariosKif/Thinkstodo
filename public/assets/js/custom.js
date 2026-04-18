(function ($) {
	"use strict";


	$(window).on('load', function () {

		/*----------------------------------------------------*/
		/*	Modal Window
		/*----------------------------------------------------*/

		const preloader = $('#preloader');
        const body = $('body');

        // Ensure preloader exists before attempting to fade out
        if (preloader.length) {
            preloader.delay(350).fadeOut('slow');
        }

        // Ensure body exists before modifying its CSS
        if (body.length) {
            body.delay(350).css({ 'overflow': 'visible' });
        }
    });


    $(window).on('scroll', function () {
        const scrollTop = $(document).scrollTop();
        const $viewJob = $(".viewjob");
        const $backToTop = $('#back2Top');
        const $header = $(".header");
    
        if ($viewJob.length) {
            $viewJob.toggleClass("sticky", scrollTop > 220);
        }
    
        if ($backToTop.length) {
            $backToTop.toggle(scrollTop > 100);
        }
    
        if ($header.length) {
            $header.toggleClass("header-fixed", scrollTop >= 50);
        }
    });


	// Tooltip
	const tooltipTriggerList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')];

    // Initialize tooltips only if there are tooltip elements
    if (tooltipTriggerList.length > 0) {
        const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

	const $backToTopButton = $("#back2Top");

    // Check if the back2Top button exists before adding the event listener
    if ($backToTopButton.length) {
        $backToTopButton.on('click', function (event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    }

	// Navigation
	!function ($, window, document, undefined) {
        $.navigation = function (selector, userSettings) {
            const defaultSettings = {
                responsive: true,
                mobileBreakpoint: 992,
                showDuration: 300,
                hideDuration: 300,
                showDelayDuration: 0,
                hideDelayDuration: 0,
                submenuTrigger: "hover",
                effect: "fade",
                submenuIndicator: true,
                hideSubWhenGoOut: true,
                visibleSubmenusOnMobile: false,
                fixed: false,
                overlay: true,
                overlayColor: "rgba(0, 0, 0, 0.5)",
                hidden: false,
                offCanvasSide: "left",
                onInit: () => {},
                onShowOffCanvas: () => {},
                onHideOffCanvas: () => {}
            };
    
            const nav = this;
            let previousWindowWidth = Number.MAX_VALUE;
            let currentWindowWidth = 1;
    
            const touchEvent = "click.nav touchstart.nav";
            const mouseEnterEvent = "mouseenter.nav";
            const mouseLeaveEvent = "mouseleave.nav";
    
            nav.settings = {};
            const navigationElement = $(selector);
    
            navigationElement.find(".nav-menus-wrapper").prepend(`
                <div class='mobLogos'>
                    <img src='/static/assets/img/logo.svg' class='img-fluid lightLogo' alt='Logo'>
                </div>
                <span class='nav-menus-wrapper-close-button'>✕</span>
            `);
    
            if (navigationElement.find(".nav-search").length > 0) {
                navigationElement.find(".nav-search form").prepend("<span class='nav-search-close-button'>✕</span>");
            }
    
            nav.init = function () {
                nav.settings = $.extend({}, defaultSettings, userSettings);
    
                if (nav.settings.offCanvasSide === "right") {
                    navigationElement.find(".nav-menus-wrapper").addClass("nav-menus-wrapper-right");
                }
    
                if (nav.settings.hidden) {
                    navigationElement.addClass("navigation-hidden");
                    nav.settings.mobileBreakpoint = 99999;
                }
    
                initializeSubmenus();
    
                if (nav.settings.fixed) {
                    navigationElement.addClass("navigation-fixed");
                }
    
                navigationElement.find(".nav-toggle").on("click touchstart", function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    nav.showOffcanvas();
                    if (userSettings !== undefined) nav.callback("onShowOffCanvas");
                });
    
                navigationElement.find(".nav-menus-wrapper-close-button").on("click touchstart", function () {
                    nav.hideOffcanvas();
                    if (userSettings !== undefined) nav.callback("onHideOffCanvas");
                });
    
                navigationElement.find(".nav-search-button").on("click touchstart", function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    nav.toggleSearch();
                });
    
                navigationElement.find(".nav-search-close-button").on("click touchstart", function () {
                    nav.toggleSearch();
                });
    
                if (navigationElement.find(".megamenu-tabs").length > 0) initializeMegaMenuTabs();
    
                let resizeTimeout;
                $(window).on('resize', function () {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(function () {
                        updateLayout();
                        adjustSubmenuPositions();
                    }, 200); // waits 200ms after user stops resizing
                });
    
                updateLayout();
                if (userSettings !== undefined) nav.callback("onInit");
            };
    
            function initializeSubmenus() {
                navigationElement.find("li").each(function () {
                    if ($(this).children(".nav-dropdown, .megamenu-panel").length > 0) {
                        $(this).children(".nav-dropdown, .megamenu-panel").addClass("nav-submenu");
                        if (nav.settings.submenuIndicator) {
                            $(this).children("a").append("<span class='submenu-indicator'><span class='submenu-indicator-chevron'></span></span>");
                        }
                    }
                });
            }
    
            nav.showSubmenu = function (item, effect) {
                if (getWindowWidth() > nav.settings.mobileBreakpoint) {
                    navigationElement.find(".nav-search form").slideUp();
                }
    
                const submenu = $(item).children(".nav-submenu");
    
                if (effect === "fade") {
                    submenu.stop(true, true).delay(nav.settings.showDelayDuration).fadeIn(nav.settings.showDuration);
                } else {
                    submenu.stop(true, true).delay(nav.settings.showDelayDuration).slideDown(nav.settings.showDuration);
                }
    
                $(item).addClass("nav-submenu-open");
            };
    
            nav.hideSubmenu = function (item, effect) {
                const submenu = $(item).find(".nav-submenu");
    
                if (effect === "fade") {
                    submenu.stop(true, true).delay(nav.settings.hideDelayDuration).fadeOut(nav.settings.hideDuration);
                } else {
                    submenu.stop(true, true).delay(nav.settings.hideDelayDuration).slideUp(nav.settings.hideDuration);
                }
    
                $(item).removeClass("nav-submenu-open").find(".nav-submenu-open").removeClass("nav-submenu-open");
            };
    
            function enableOverlay() {
                $("body").addClass("no-scroll");
                if (nav.settings.overlay) {
                    navigationElement.append("<div class='nav-overlay-panel'></div>");
                    navigationElement.find(".nav-overlay-panel")
                        .css("background-color", nav.settings.overlayColor)
                        .fadeIn(300)
                        .on("click touchstart", function () {
                            nav.hideOffcanvas();
                        });
                }
            }
    
            function disableOverlay() {
                $("body").removeClass("no-scroll");
                if (nav.settings.overlay) {
                    navigationElement.find(".nav-overlay-panel").fadeOut(400, function () {
                        $(this).remove();
                    });
                }
            }
    
            nav.showOffcanvas = function () {
                enableOverlay();
                const wrapper = navigationElement.find(".nav-menus-wrapper");
                const side = nav.settings.offCanvasSide;
    
                wrapper.css("transition-property", side).addClass("nav-menus-wrapper-open");
            };
    
            nav.hideOffcanvas = function () {
                const wrapper = navigationElement.find(".nav-menus-wrapper");
                wrapper.removeClass("nav-menus-wrapper-open")
                    .on("webkitTransitionEnd moztransitionend transitionend oTransitionEnd", function () {
                        $(this).css("transition-property", "none").off();
                    });
                disableOverlay();
            };
    
            nav.toggleOffcanvas = function () {
                if (getWindowWidth() <= nav.settings.mobileBreakpoint) {
                    if (navigationElement.find(".nav-menus-wrapper").hasClass("nav-menus-wrapper-open")) {
                        nav.hideOffcanvas();
                        if (userSettings !== undefined) nav.callback("onHideOffCanvas");
                    } else {
                        nav.showOffcanvas();
                        if (userSettings !== undefined) nav.callback("onShowOffCanvas");
                    }
                }
            };
    
            nav.toggleSearch = function () {
                const searchForm = navigationElement.find(".nav-search form");
                if (searchForm.css("display") === "none") {
                    searchForm.slideDown();
                    navigationElement.find(".nav-submenu").fadeOut(200);
                } else {
                    searchForm.slideUp();
                }
            };
    
            function updateLayout() {
                const windowWidth = getWindowWidth();
    
                if (nav.settings.responsive) {
                    if (windowWidth <= nav.settings.mobileBreakpoint && previousWindowWidth > nav.settings.mobileBreakpoint) {
                        navigationElement.addClass("navigation-portrait").removeClass("navigation-landscape");
                        enableMobileMenu();
                    } else if (windowWidth > nav.settings.mobileBreakpoint && currentWindowWidth <= nav.settings.mobileBreakpoint) {
                        navigationElement.addClass("navigation-landscape").removeClass("navigation-portrait");
                        enableDesktopMenu();
                        disableOverlay();
                        nav.hideOffcanvas();
                    }
    
                    previousWindowWidth = windowWidth;
                    currentWindowWidth = windowWidth;
                } else {
                    enableDesktopMenu();
                }
            }
    
            function detectOutsideClick() {
                $("body").on("click.body touchstart.body", function (event) {
                    if ($(event.target).closest(".navigation").length === 0) {
                        navigationElement.find(".nav-submenu").fadeOut();
                        navigationElement.find(".nav-submenu-open").removeClass("nav-submenu-open");
                        navigationElement.find(".nav-search form").slideUp();
                    }
                });
            }
    
            function getWindowWidth() {
                return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            }
    
            function clearEvents() {
                navigationElement.find(".nav-menu li, .nav-menu a").off(touchEvent).off(mouseEnterEvent).off(mouseLeaveEvent);
            }
    
            function adjustSubmenuPositions() {
                if (getWindowWidth() > nav.settings.mobileBreakpoint) {
                    const navWidth = navigationElement.outerWidth(true);
                    navigationElement.find(".nav-menu > li > .nav-submenu").each(function () {
                        const leftOffset = $(this).parent().position().left;
                        if (leftOffset + $(this).outerWidth() > navWidth) {
                            $(this).css("right", 0);
                        } else {
                            $(this).css("right", "auto");
                        }
                    });
                }
            }
    
            function initializeMegaMenuTabs() {
                navigationElement.find(".megamenu-tabs").each(function () {
                    const tabs = $(this).find(".megamenu-tabs-nav li");
                    const panes = $(this).find(".megamenu-tabs-pane");
    
                    tabs.on("click.tabs touchstart.tabs", function (event) {
                        event.stopPropagation();
                        event.preventDefault();
                        tabs.removeClass("active");
                        $(this).addClass("active");
                        panes.hide(0).removeClass("active");
                        panes.eq($(this).index()).show(0).addClass("active");
                    });
                });
            }
    
            function enableDesktopMenu() {
                clearEvents();
                navigationElement.find(".nav-submenu").hide(0);
    
                if (/Mobi/i.test(navigator.userAgent) || navigator.maxTouchPoints > 0 || nav.settings.submenuTrigger === "click") {
                    navigationElement.find(".nav-menu, .nav-dropdown > li > a").on(touchEvent, function (event) {
                        if ($(this).siblings(".nav-submenu").length > 0) {
                            event.stopPropagation();
                            event.preventDefault();
    
                            if ($(this).siblings(".nav-submenu").css("display") === "none") {
                                nav.showSubmenu($(this).parent("li"), nav.settings.effect);
                                adjustSubmenuPositions();
                                return false;
                            } else {
                                nav.hideSubmenu($(this).parent("li"), nav.settings.effect);
                                const href = $(this).attr("href");
                                if (href === "#" || href === "") return false;
                                window.location.href = href;
                            }
                        }
                    });
                } else {
                    navigationElement.find(".nav-menu li").on(mouseEnterEvent, function () {
                        nav.showSubmenu(this, nav.settings.effect);
                        adjustSubmenuPositions();
                    }).on(mouseLeaveEvent, function () {
                        nav.hideSubmenu(this, nav.settings.effect);
                    });
    
                    if (nav.settings.hideSubWhenGoOut) detectOutsideClick();
                }
            }
    
            function enableMobileMenu() {
                clearEvents();
                navigationElement.find(".nav-submenu").hide(0);
    
                if (nav.settings.visibleSubmenusOnMobile) {
                    navigationElement.find(".nav-submenu").show(0);
                } else {
                    navigationElement.find(".submenu-indicator").removeClass("submenu-indicator-up");
    
                    if (nav.settings.submenuIndicator) {
                        navigationElement.find(".submenu-indicator").on(touchEvent, function (event) {
                            event.stopPropagation();
                            event.preventDefault();
    
                            const parentLi = $(this).closest("li");
                            const submenu = parentLi.children(".nav-submenu");
    
                            nav.hideSubmenu(parentLi.siblings("li"), "slide");
                            nav.hideSubmenu(parentLi.closest(".nav-menu").siblings(".nav-menu").children("li"), "slide");
    
                            if (submenu.css("display") === "none") {
                                $(this).addClass("submenu-indicator-up");
                                parentLi.siblings("li").find(".submenu-indicator").removeClass("submenu-indicator-up");
                                parentLi.closest(".nav-menu").siblings(".nav-menu").find(".submenu-indicator").removeClass("submenu-indicator-up");
                                nav.showSubmenu(parentLi, "slide");
                                return false;
                            } else {
                                parentLi.find(".submenu-indicator").removeClass("submenu-indicator-up");
                                nav.hideSubmenu(parentLi, "slide");
                            }
                        });
                    } else {
                        enableDesktopMenu();
                    }
                }
            }
    
            nav.callback = function (callbackName) {
                if (userSettings[callbackName] !== undefined) {
                    userSettings[callbackName].call(selector);
                }
            };
    
            nav.init();
        };
    
        $.fn.navigation = function (settings) {
            return this.each(function () {
                if ($(this).data("navigation") === undefined) {
                    const navigationInstance = new $.navigation(this, settings);
                    $(this).data("navigation", navigationInstance);
                }
            });
        };
    }
    (jQuery, window, document), $(document).ready(function () {
        $("#navigation").navigation()
    });
	
	// Price Change Script
	$("#js-contcheckbox").on("change", function () {
        const isChecked = this.checked;
    
        $(".js-monthlypricing").css("display", isChecked ? "none" : "flex");
        $(".js-yearlypricing").css("display", isChecked ? "flex" : "none");
    
        $(".afterinput").toggleClass("text-primary", isChecked);
        $(".beforeinput").toggleClass("text-primary", !isChecked);
    });

	// All Select Form Classes
	const selectConfigs = {
        ".features": "Advanced features",
        ".categories": "All Categories",
        ".choosetime": "Pick Time Slots",
        ".location": "City, Country or zip",
        ".openingtime": "Opening Time",
        ".closingtime": "Closing Time"
    };
    $('.select').select2();
      
      $.each(selectConfigs, function (selector, placeholderText) {
        $(selector).select2({
          placeholder: placeholderText,
          allowClear: false,
        });
      });
	
	$("body").on("click", ".toggle-password", function () {
        $(this).toggleClass("fa-eye-slash");
    
        const passwordInput = $("#password-field");
        const currentType = passwordInput.attr("type");
    
        if (currentType === "password") {
            passwordInput.attr("type", "text");
        } else {
            passwordInput.attr("type", "password");
        }
    });

    $(function () {
		// Helper to init Owl Carousel with custom options
		function initOwlCarousel(selector, options) {
			if ($(selector).length) {
				$(selector).owlCarousel(options);
			}
		}
	
		// Shared nav icons
		const navIcons = ["<i class='fa-solid fa-caret-left'></i>", "<i class='fa-solid fa-caret-right'></i>"];

        // Sliders
		initOwlCarousel('.brand-slider', {
			loop: true,
			dots: false,
			autoplay: true,
			margin: 10,
			navText: navIcons,
			responsive: {
				0: { items: 3, nav: false },
				768: { items: 4, nav: false },
				1000: { items: 5, nav: false },
				1500: { items: 6, nav: false },
				1920: { items: 6, nav: false }
			}
		});

        const defaultSliderOptions = {
			loop: true,
			dots: true,
			lazyLoad: true,
			autoplay: true,
			margin: 15,
			navText: navIcons
		};

        initOwlCarousel('.itemslider', {
			...defaultSliderOptions,
			dots: true,
			responsive: {
				0: { items: 1, nav: false },
				768: { items: 2, nav: false },
				1199: { items: 3, nav: false },
				1920: { items: 4, nav: false }
			}
		});

        initOwlCarousel('.teamSlider', {
			...defaultSliderOptions,
			dots: false,
			responsive: {
				0: { items: 1, nav: false },
				768: { items: 2, nav: false },
				1199: { items: 4, nav: false },
				1920: { items: 5, nav: false }
			}
		});

        initOwlCarousel('.catalogslider', {
			...defaultSliderOptions,
			dots: true,
			responsive: {
				0: { items: 1, nav: false },
				768: { items: 2, nav: false },
				1199: { items: 2, nav: false },
				1920: { items: 3, nav: false }
			}
		});

        initOwlCarousel('.similarSliders', {
			...defaultSliderOptions,
			dots: true,
			responsive: {
				0: { items: 1, nav: false },
				768: { items: 2, nav: false },
				1199: { items: 2, nav: false },
				1920: { items: 3, nav: false }
			}
		});

        initOwlCarousel('.reviewsSlide', {
			...defaultSliderOptions,
			dots: true,
			responsive: {
				0: { items: 1, nav: false },
				768: { items: 2, nav: false },
				1199: { items: 3, nav: false },
				1920: { items: 4, nav: false }
			}
		});

        initOwlCarousel('.categorySlider', {
			...defaultSliderOptions,
			dots: false,
			responsive: {
				0: { items: 1, nav: false },
				480: { items: 2, nav: false },
				767: { items: 3, nav: false },
				1000: { items: 4, nav: false },
				1500: { items: 5, nav: false },
				1920: { items: 6, nav: false }
			}
		});

        // Owl Slider
        initOwlCarousel('.splashSliders', {
			loop: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			dots: false,
			lazyLoad: true,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: false,
			margin: 0,
            responsiveClass:true,
			items: 1
		});

        initOwlCarousel('.galleryslide', {
            dots: false,
            center: true,
            lazyLoad: true,
            autoplay: true,
            navText: navIcons,
            responsive: {
                0: { items: 1, dots: false, nav: false },
                768: { items: 2, dots: false, nav: false },
                1199: { items: 2, nav: false, dots: false, loop: true },
                1920: { items: 2, nav: false, dots: false, loop: true }
            }
        });
	
        function initRangeSlider(selector, options) {
            $(selector).ionRangeSlider(options);
        }
        
        // Initialize the range filter
        initRangeSlider(".pricefilter", {
            type: "single",
            min: 0,
            max: 500,
            from: 50,
            to: 250,
            prefix: "$ ",
            grid: true
        });
	
	    // Initialize the distance filter
        initRangeSlider(".distancefilter", {
            type: "single",
            max: 200,
            from: 120,
            postfix: " km",
            grid: true
        });
	
        // MagnificPopup
        $('body').magnificPopup({
            type: 'image',
            delegate: 'a.mfp-gallery',
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: false,
            preloader: true,
            removalDelay: 0,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            }
        });
    });
    
	// ------------------ End Document ------------------ //

})(this.jQuery);


// back-to-top
const mybutton = document.getElementById("back-to-top");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (mybutton !== null) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.style.display = "flex";
            mybutton.style.height = "35px";
            mybutton.style.width = "35px";
            mybutton.style.justifyContent = "center";
            mybutton.style.alignItems = "center";
        } else {
            mybutton.style.display = "none";
        }
    }
}

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scroll to the top
    });
}
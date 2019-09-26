/**
 * Swiper 3.0.8
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: June 14, 2015
 */
! function() {
	"use strict";

	function e(e) {
		e.fn.swiper = function(t) {
			var s;
			return e(this).each(function() {
				var e = new a(this, t);
				s || (s = e)
			}), s
		}
	}
	var a = function(e, t) {
		function s() {
			return "horizontal" === h.params.direction
		}

		function r() {
			h.autoplayTimeoutId = setTimeout(function() {
				h.params.loop ? (h.fixLoop(), h._slideNext()) : h.isEnd ? t.autoplayStopOnLast ? h.stopAutoplay() : h._slideTo(0) :
					h._slideNext()
			}, h.params.autoplay)
		}

		function i(e, a) {
			var t = v(e.target);
			if (!t.is(a))
				if ("string" == typeof a) t = t.parents(a);
				else if (a.nodeType) {
				var s;
				return t.parents().each(function(e, t) {
					t === a && (s = a)
				}), s ? a : void 0
			}
			return 0 === t.length ? void 0 : t[0]
		}

		function n(e, a) {
			a = a || {};
			var t = window.MutationObserver || window.WebkitMutationObserver,
				s = new t(function(e) {
					e.forEach(function(e) {
						h.onResize(!0), h.emit("onObserverUpdate", h, e)
					})
				});
			s.observe(e, {
				attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
				childList: "undefined" == typeof a.childList ? !0 : a.childList,
				characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
			}), h.observers.push(s)
		}

		function o(e) {
			e.originalEvent && (e = e.originalEvent);
			var a = e.keyCode || e.charCode;
			if (!h.params.allowSwipeToNext && (s() && 39 === a || !s() && 40 === a)) return !1;
			if (!h.params.allowSwipeToPrev && (s() && 37 === a || !s() && 38 === a)) return !1;
			if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName &&
					("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase())
				)) {
				if (37 === a || 39 === a || 38 === a || 40 === a) {
					var t = !1;
					if (h.container.parents(".swiper-slide").length > 0 && 0 === h.container.parents(".swiper-slide-active").length)
						return;
					var r = {
							left: window.pageXOffset,
							top: window.pageYOffset
						},
						i = window.innerWidth,
						n = window.innerHeight,
						o = h.container.offset();
					h.rtl && (o.left = o.left - h.container[0].scrollLeft);
					for (var l = [
							[o.left, o.top],
							[o.left + h.width, o.top],
							[o.left, o.top + h.height],
							[o.left + h.width, o.top + h.height]
						], d = 0; d < l.length; d++) {
						var p = l[d];
						p[0] >= r.left && p[0] <= r.left + i && p[1] >= r.top && p[1] <= r.top + n && (t = !0)
					}
					if (!t) return
				}
				s() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !h.rtl ||
					37 === a && h.rtl) && h.slideNext(), (37 === a && !h.rtl || 39 === a && h.rtl) && h.slidePrev()) : ((38 === a ||
						40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && h.slideNext(), 38 === a &&
					h.slidePrev())
			}
		}

		function l(e) {
			e.originalEvent && (e = e.originalEvent);
			var a = h.mousewheel.event,
				t = 0;
			if (e.detail) t = -e.detail;
			else if ("mousewheel" === a)
				if (h.params.mousewheelForceToAxis)
					if (s()) {
						if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
						t = e.wheelDeltaX
					} else {
						if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
						t = e.wheelDeltaY
					}
			else t = e.wheelDelta;
			else if ("DOMMouseScroll" === a) t = -e.detail;
			else if ("wheel" === a)
				if (h.params.mousewheelForceToAxis)
					if (s()) {
						if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
						t = -e.deltaX
					} else {
						if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
						t = -e.deltaY
					}
			else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
			if (h.params.mousewheelInvert && (t = -t), h.params.freeMode) {
				var r = h.getWrapperTranslate() + t;
				if (r > 0 && (r = 0), r < h.maxTranslate() && (r = h.maxTranslate()), h.setWrapperTransition(0), h.setWrapperTranslate(
						r), h.updateProgress(), h.updateActiveIndex(), h.params.freeModeSticky && (clearTimeout(h.mousewheel.timeout), h
						.mousewheel.timeout = setTimeout(function() {
							h.slideReset()
						}, 300)), 0 === r || r === h.maxTranslate()) return
			} else {
				if ((new window.Date).getTime() - h.mousewheel.lastScrollTime > 60)
					if (0 > t)
						if (h.isEnd) {
							if (h.params.mousewheelReleaseOnEdges) return !0
						} else h.slideNext();
				else if (h.isBeginning) {
					if (h.params.mousewheelReleaseOnEdges) return !0
				} else h.slidePrev();
				h.mousewheel.lastScrollTime = (new window.Date).getTime()
			}
			return h.params.autoplay && h.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
		}

		function d(e, a) {
			e = v(e);
			var t, r, i;
			t = e.attr("data-swiper-parallax") || "0", r = e.attr("data-swiper-parallax-x"), i = e.attr(
					"data-swiper-parallax-y"), r || i ? (r = r || "0", i = i || "0") : s() ? (r = t, i = "0") : (i = t, r = "0"), r =
				r.indexOf("%") >= 0 ? parseInt(r, 10) * a + "%" : r * a + "px", i = i.indexOf("%") >= 0 ? parseInt(i, 10) * a +
				"%" : i * a + "px", e.transform("translate3d(" + r + ", " + i + ",0px)")
		}

		function p(e) {
			return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) :
				"on" + e), e
		}
		if (!(this instanceof a)) return new a(e, t);
		var u = {
				direction: "horizontal",
				touchEventsTarget: "container",
				initialSlide: 0,
				speed: 300,
				autoplay: !1,
				autoplayDisableOnInteraction: !0,
				freeMode: !1,
				freeModeMomentum: !0,
				freeModeMomentumRatio: 1,
				freeModeMomentumBounce: !0,
				freeModeMomentumBounceRatio: 1,
				freeModeSticky: !1,
				setWrapperSize: !1,
				virtualTranslate: !1,
				effect: "slide",
				coverflow: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: !0
				},
				cube: {
					slideShadows: !0,
					shadow: !0,
					shadowOffset: 20,
					shadowScale: .94
				},
				fade: {
					crossFade: !1
				},
				parallax: !1,
				scrollbar: null,
				scrollbarHide: !0,
				keyboardControl: !1,
				mousewheelControl: !1,
				mousewheelReleaseOnEdges: !1,
				mousewheelInvert: !1,
				mousewheelForceToAxis: !1,
				hashnav: !1,
				spaceBetween: 0,
				slidesPerView: 1,
				slidesPerColumn: 1,
				slidesPerColumnFill: "column",
				slidesPerGroup: 1,
				centeredSlides: !1,
				touchRatio: 1,
				touchAngle: 45,
				simulateTouch: !0,
				shortSwipes: !0,
				longSwipes: !0,
				longSwipesRatio: .5,
				longSwipesMs: 300,
				followFinger: !0,
				onlyExternal: !1,
				threshold: 0,
				touchMoveStopPropagation: !0,
				pagination: null,
				paginationClickable: !1,
				paginationHide: !1,
				paginationBulletRender: null,
				resistance: !0,
				resistanceRatio: .85,
				nextButton: null,
				prevButton: null,
				watchSlidesProgress: !1,
				watchSlidesVisibility: !1,
				grabCursor: !1,
				preventClicks: !0,
				preventClicksPropagation: !0,
				slideToClickedSlide: !1,
				lazyLoading: !1,
				lazyLoadingInPrevNext: !1,
				lazyLoadingOnTransitionStart: !1,
				preloadImages: !0,
				updateOnImagesReady: !0,
				loop: !1,
				loopAdditionalSlides: 0,
				loopedSlides: null,
				control: void 0,
				controlInverse: !1,
				allowSwipeToPrev: !0,
				allowSwipeToNext: !0,
				swipeHandler: null,
				noSwiping: !0,
				noSwipingClass: "swiper-no-swiping",
				slideClass: "swiper-slide",
				slideActiveClass: "swiper-slide-active",
				slideVisibleClass: "swiper-slide-visible",
				slideDuplicateClass: "swiper-slide-duplicate",
				slideNextClass: "swiper-slide-next",
				slidePrevClass: "swiper-slide-prev",
				wrapperClass: "swiper-wrapper",
				bulletClass: "swiper-pagination-bullet",
				bulletActiveClass: "swiper-pagination-bullet-active",
				buttonDisabledClass: "swiper-button-disabled",
				paginationHiddenClass: "swiper-pagination-hidden",
				observer: !1,
				observeParents: !1,
				a11y: !1,
				prevSlideMessage: "Previous slide",
				nextSlideMessage: "Next slide",
				firstSlideMessage: "This is the first slide",
				lastSlideMessage: "This is the last slide",
				runCallbacksOnInit: !0
			},
			c = t && t.virtualTranslate;
		t = t || {};
		for (var m in u)
			if ("undefined" == typeof t[m]) t[m] = u[m];
			else if ("object" == typeof t[m])
			for (var f in u[m]) "undefined" == typeof t[m][f] && (t[m][f] = u[m][f]);
		var h = this;
		h.version = "3.0.8", h.params = t, h.classNames = [];
		var v;
		if (v = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, v && (h.$ = v, h.container =
				v(e), 0 !== h.container.length)) {
			if (h.container.length > 1) return void h.container.each(function() {
				new a(this, t)
			});
			h.container[0].swiper = h, h.container.data("swiper", h), h.classNames.push("swiper-container-" + h.params.direction),
				h.params.freeMode && h.classNames.push("swiper-container-free-mode"), h.support.flexbox || (h.classNames.push(
					"swiper-container-no-flexbox"), h.params.slidesPerColumn = 1), (h.params.parallax || h.params.watchSlidesVisibility) &&
				(h.params.watchSlidesProgress = !0), ["cube", "coverflow"].indexOf(h.params.effect) >= 0 && (h.support.transforms3d ?
					(h.params.watchSlidesProgress = !0, h.classNames.push("swiper-container-3d")) : h.params.effect = "slide"),
				"slide" !== h.params.effect && h.classNames.push("swiper-container-" + h.params.effect), "cube" === h.params.effect &&
				(h.params.resistanceRatio = 0, h.params.slidesPerView = 1, h.params.slidesPerColumn = 1, h.params.slidesPerGroup =
					1, h.params.centeredSlides = !1, h.params.spaceBetween = 0, h.params.virtualTranslate = !0, h.params.setWrapperSize = !
					1), "fade" === h.params.effect && (h.params.slidesPerView = 1, h.params.slidesPerColumn = 1, h.params.slidesPerGroup =
					1, h.params.watchSlidesProgress = !0, h.params.spaceBetween = 0, "undefined" == typeof c && (h.params.virtualTranslate = !
						0)), h.params.grabCursor && h.support.touch && (h.params.grabCursor = !1), h.wrapper = h.container.children("." +
					h.params.wrapperClass), h.params.pagination && (h.paginationContainer = v(h.params.pagination), h.params.paginationClickable &&
					h.paginationContainer.addClass("swiper-pagination-clickable")), h.rtl = s() && ("rtl" === h.container[0].dir.toLowerCase() ||
					"rtl" === h.container.css("direction")), h.rtl && h.classNames.push("swiper-container-rtl"), h.rtl && (h.wrongRTL =
					"-webkit-box" === h.wrapper.css("display")), h.params.slidesPerColumn > 1 && h.classNames.push(
					"swiper-container-multirow"), h.device.android && h.classNames.push("swiper-container-android"), h.container.addClass(
					h.classNames.join(" ")), h.translate = 0, h.progress = 0, h.velocity = 0, h.lockSwipeToNext = function() {
					h.params.allowSwipeToNext = !1
				}, h.lockSwipeToPrev = function() {
					h.params.allowSwipeToPrev = !1
				}, h.lockSwipes = function() {
					h.params.allowSwipeToNext = h.params.allowSwipeToPrev = !1
				}, h.unlockSwipeToNext = function() {
					h.params.allowSwipeToNext = !0
				}, h.unlockSwipeToPrev = function() {
					h.params.allowSwipeToPrev = !0
				}, h.unlockSwipes = function() {
					h.params.allowSwipeToNext = h.params.allowSwipeToPrev = !0
				}, h.params.grabCursor && (h.container[0].style.cursor = "move", h.container[0].style.cursor = "-webkit-grab", h.container[
					0].style.cursor = "-moz-grab", h.container[0].style.cursor = "grab"), h.imagesToLoad = [], h.imagesLoaded = 0, h.loadImage =
				function(e, a, t, s) {
					function r() {
						s && s()
					}
					var i;
					e.complete && t ? r() : a ? (i = new window.Image, i.onload = r, i.onerror = r, i.src = a) : r()
				}, h.preloadImages = function() {
					function e() {
						"undefined" != typeof h && null !== h && (void 0 !== h.imagesLoaded && h.imagesLoaded++, h.imagesLoaded === h.imagesToLoad
							.length && (h.params.updateOnImagesReady && h.update(), h.emit("onImagesReady", h)))
					}
					h.imagesToLoad = h.container.find("img");
					for (var a = 0; a < h.imagesToLoad.length; a++) h.loadImage(h.imagesToLoad[a], h.imagesToLoad[a].currentSrc || h.imagesToLoad[
						a].getAttribute("src"), !0, e)
				}, h.autoplayTimeoutId = void 0, h.autoplaying = !1, h.autoplayPaused = !1, h.startAutoplay = function() {
					return "undefined" != typeof h.autoplayTimeoutId ? !1 : h.params.autoplay ? h.autoplaying ? !1 : (h.autoplaying = !
						0, h.emit("onAutoplayStart", h), void r()) : !1
				}, h.stopAutoplay = function(e) {
					h.autoplayTimeoutId && (h.autoplayTimeoutId && clearTimeout(h.autoplayTimeoutId), h.autoplaying = !1, h.autoplayTimeoutId =
						void 0, h.emit("onAutoplayStop", h))
				}, h.pauseAutoplay = function(e) {
					h.autoplayPaused || (h.autoplayTimeoutId && clearTimeout(h.autoplayTimeoutId), h.autoplayPaused = !0, 0 === e ? (
						h.autoplayPaused = !1, r()) : h.wrapper.transitionEnd(function() {
						h && (h.autoplayPaused = !1, h.autoplaying ? r() : h.stopAutoplay())
					}))
				}, h.minTranslate = function() {
					return -h.snapGrid[0]
				}, h.maxTranslate = function() {
					return -h.snapGrid[h.snapGrid.length - 1]
				}, h.updateContainerSize = function() {
					var e, a;
					e = "undefined" != typeof h.params.width ? h.params.width : h.container[0].clientWidth, a = "undefined" != typeof h
						.params.height ? h.params.height : h.container[0].clientHeight, 0 === e && s() || 0 === a && !s() || (h.width =
							e, h.height = a, h.size = s() ? h.width : h.height)
				}, h.updateSlidesSize = function() {
					h.slides = h.wrapper.children("." + h.params.slideClass), h.snapGrid = [], h.slidesGrid = [], h.slidesSizesGrid = [];
					var e, a = h.params.spaceBetween,
						t = 0,
						r = 0,
						i = 0;
					"string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * h.size), h.virtualSize = -
						a, h.slides.css(h.rtl ? {
							marginLeft: "",
							marginTop: ""
						} : {
							marginRight: "",
							marginBottom: ""
						});
					var n;
					h.params.slidesPerColumn > 1 && (n = Math.floor(h.slides.length / h.params.slidesPerColumn) === h.slides.length /
						h.params.slidesPerColumn ? h.slides.length : Math.ceil(h.slides.length / h.params.slidesPerColumn) * h.params.slidesPerColumn
					);
					var o, l = h.params.slidesPerColumn,
						d = n / l,
						p = d - (h.params.slidesPerColumn * d - h.slides.length);
					for (e = 0; e < h.slides.length; e++) {
						o = 0;
						var u = h.slides.eq(e);
						if (h.params.slidesPerColumn > 1) {
							var c, m, f;
							"column" === h.params.slidesPerColumnFill ? (m = Math.floor(e / l), f = e - m * l, (m > p || m === p && f ===
								l - 1) && ++f >= l && (f = 0, m++), c = m + f * n / l, u.css({
								"-webkit-box-ordinal-group": c,
								"-moz-box-ordinal-group": c,
								"-ms-flex-order": c,
								"-webkit-order": c,
								order: c
							})) : (f = Math.floor(e / d), m = e - f * d), u.css({
								"margin-top": 0 !== f && h.params.spaceBetween && h.params.spaceBetween + "px"
							}).attr("data-swiper-column", m).attr("data-swiper-row", f)
						}
						"none" !== u.css("display") && ("auto" === h.params.slidesPerView ? o = s() ? u.outerWidth(!0) : u.outerHeight(!
								0) : (o = (h.size - (h.params.slidesPerView - 1) * a) / h.params.slidesPerView, s() ? h.slides[e].style.width =
								o + "px" : h.slides[e].style.height = o + "px"), h.slides[e].swiperSlideSize = o, h.slidesSizesGrid.push(o),
							h.params.centeredSlides ? (t = t + o / 2 + r / 2 + a, 0 === e && (t = t - h.size / 2 - a), Math.abs(t) < .001 &&
								(t = 0), i % h.params.slidesPerGroup === 0 && h.snapGrid.push(t), h.slidesGrid.push(t)) : (i % h.params.slidesPerGroup ===
								0 && h.snapGrid.push(t), h.slidesGrid.push(t), t = t + o + a), h.virtualSize += o + a, r = o, i++)
					}
					h.virtualSize = Math.max(h.virtualSize, h.size);
					var v;
					if (h.rtl && h.wrongRTL && ("slide" === h.params.effect || "coverflow" === h.params.effect) && h.wrapper.css({
							width: h.virtualSize + h.params.spaceBetween + "px"
						}), (!h.support.flexbox || h.params.setWrapperSize) && h.wrapper.css(s() ? {
							width: h.virtualSize + h.params.spaceBetween + "px"
						} : {
							height: h.virtualSize + h.params.spaceBetween + "px"
						}), h.params.slidesPerColumn > 1 && (h.virtualSize = (o + h.params.spaceBetween) * n, h.virtualSize = Math.ceil(
							h.virtualSize / h.params.slidesPerColumn) - h.params.spaceBetween, h.wrapper.css({
							width: h.virtualSize + h.params.spaceBetween + "px"
						}), h.params.centeredSlides)) {
						for (v = [], e = 0; e < h.snapGrid.length; e++) h.snapGrid[e] < h.virtualSize + h.snapGrid[0] && v.push(h.snapGrid[
							e]);
						h.snapGrid = v
					}
					if (!h.params.centeredSlides) {
						for (v = [], e = 0; e < h.snapGrid.length; e++) h.snapGrid[e] <= h.virtualSize - h.size && v.push(h.snapGrid[e]);
						h.snapGrid = v, Math.floor(h.virtualSize - h.size) > Math.floor(h.snapGrid[h.snapGrid.length - 1]) && h.snapGrid
							.push(h.virtualSize - h.size)
					}
					0 === h.snapGrid.length && (h.snapGrid = [0]), 0 !== h.params.spaceBetween && h.slides.css(s() ? h.rtl ? {
						marginLeft: a + "px"
					} : {
						marginRight: a + "px"
					} : {
						marginBottom: a + "px"
					}), h.params.watchSlidesProgress && h.updateSlidesOffset()
				}, h.updateSlidesOffset = function() {
					for (var e = 0; e < h.slides.length; e++) h.slides[e].swiperSlideOffset = s() ? h.slides[e].offsetLeft : h.slides[
						e].offsetTop
				}, h.updateSlidesProgress = function(e) {
					if ("undefined" == typeof e && (e = h.translate || 0), 0 !== h.slides.length) {
						"undefined" == typeof h.slides[0].swiperSlideOffset && h.updateSlidesOffset();
						var a = h.params.centeredSlides ? -e + h.size / 2 : -e;
						h.rtl && (a = h.params.centeredSlides ? e - h.size / 2 : e); {
							h.container[0].getBoundingClientRect(), s() ? "left" : "top", s() ? "right" : "bottom"
						}
						h.slides.removeClass(h.params.slideVisibleClass);
						for (var t = 0; t < h.slides.length; t++) {
							var r = h.slides[t],
								i = h.params.centeredSlides === !0 ? r.swiperSlideSize / 2 : 0,
								n = (a - r.swiperSlideOffset - i) / (r.swiperSlideSize + h.params.spaceBetween);
							if (h.params.watchSlidesVisibility) {
								var o = -(a - r.swiperSlideOffset - i),
									l = o + h.slidesSizesGrid[t],
									d = o >= 0 && o < h.size || l > 0 && l <= h.size || 0 >= o && l >= h.size;
								d && h.slides.eq(t).addClass(h.params.slideVisibleClass)
							}
							r.progress = h.rtl ? -n : n
						}
					}
				}, h.updateProgress = function(e) {
					"undefined" == typeof e && (e = h.translate || 0);
					var a = h.maxTranslate() - h.minTranslate();
					0 === a ? (h.progress = 0, h.isBeginning = h.isEnd = !0) : (h.progress = (e - h.minTranslate()) / a, h.isBeginning =
						h.progress <= 0, h.isEnd = h.progress >= 1), h.isBeginning && h.emit("onReachBeginning", h), h.isEnd && h.emit(
						"onReachEnd", h), h.params.watchSlidesProgress && h.updateSlidesProgress(e), h.emit("onProgress", h, h.progress)
				}, h.updateActiveIndex = function() {
					var e, a, t, s = h.rtl ? h.translate : -h.translate;
					for (a = 0; a < h.slidesGrid.length; a++) "undefined" != typeof h.slidesGrid[a + 1] ? s >= h.slidesGrid[a] && s <
						h.slidesGrid[a + 1] - (h.slidesGrid[a + 1] - h.slidesGrid[a]) / 2 ? e = a : s >= h.slidesGrid[a] && s < h.slidesGrid[
							a + 1] && (e = a + 1) : s >= h.slidesGrid[a] && (e = a);
					(0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / h.params.slidesPerGroup), t >= h.snapGrid.length &&
						(t = h.snapGrid.length - 1), e !== h.activeIndex && (h.snapIndex = t, h.previousIndex = h.activeIndex, h.activeIndex =
							e, h.updateClasses())
				}, h.updateClasses = function() {
					h.slides.removeClass(h.params.slideActiveClass + " " + h.params.slideNextClass + " " + h.params.slidePrevClass);
					var e = h.slides.eq(h.activeIndex);
					if (e.addClass(h.params.slideActiveClass), e.next("." + h.params.slideClass).addClass(h.params.slideNextClass), e
						.prev("." + h.params.slideClass).addClass(h.params.slidePrevClass), h.bullets && h.bullets.length > 0) {
						h.bullets.removeClass(h.params.bulletActiveClass);
						var a;
						h.params.loop ? (a = Math.ceil(h.activeIndex - h.loopedSlides) / h.params.slidesPerGroup, a > h.slides.length -
								1 - 2 * h.loopedSlides && (a -= h.slides.length - 2 * h.loopedSlides), a > h.bullets.length - 1 && (a -= h.bullets
									.length)) : a = "undefined" != typeof h.snapIndex ? h.snapIndex : h.activeIndex || 0, h.paginationContainer.length >
							1 ? h.bullets.each(function() {
								v(this).index() === a && v(this).addClass(h.params.bulletActiveClass)
							}) : h.bullets.eq(a).addClass(h.params.bulletActiveClass)
					}
					h.params.loop || (h.params.prevButton && (h.isBeginning ? (v(h.params.prevButton).addClass(h.params.buttonDisabledClass),
							h.params.a11y && h.a11y && h.a11y.disable(v(h.params.prevButton))) : (v(h.params.prevButton).removeClass(h.params
							.buttonDisabledClass), h.params.a11y && h.a11y && h.a11y.enable(v(h.params.prevButton)))), h.params.nextButton &&
						(h.isEnd ? (v(h.params.nextButton).addClass(h.params.buttonDisabledClass), h.params.a11y && h.a11y && h.a11y.disable(
							v(h.params.nextButton))) : (v(h.params.nextButton).removeClass(h.params.buttonDisabledClass), h.params.a11y &&
							h.a11y && h.a11y.enable(v(h.params.nextButton)))))
				}, h.updatePagination = function() {
					if (h.params.pagination && h.paginationContainer && h.paginationContainer.length > 0) {
						for (var e = "", a = h.params.loop ? Math.ceil((h.slides.length - 2 * h.loopedSlides) / h.params.slidesPerGroup) :
								h.snapGrid.length, t = 0; a > t; t++) e += h.params.paginationBulletRender ? h.params.paginationBulletRender(t,
							h.params.bulletClass) : '<span class="' + h.params.bulletClass + '"></span>';
						h.paginationContainer.html(e), h.bullets = h.paginationContainer.find("." + h.params.bulletClass)
					}
				}, h.update = function(e) {
					function a() {
						s = Math.min(Math.max(h.translate, h.maxTranslate()), h.minTranslate()), h.setWrapperTranslate(s), h.updateActiveIndex(),
							h.updateClasses()
					}
					if (h.updateContainerSize(), h.updateSlidesSize(), h.updateProgress(), h.updatePagination(), h.updateClasses(), h
						.params.scrollbar && h.scrollbar && h.scrollbar.set(), e) {
						var t, s;
						h.params.freeMode ? a() : (t = "auto" === h.params.slidesPerView && h.isEnd && !h.params.centeredSlides ? h.slideTo(
							h.slides.length - 1, 0, !1, !0) : h.slideTo(h.activeIndex, 0, !1, !0), t || a())
					}
				}, h.onResize = function(e) {
					if (h.updateContainerSize(), h.updateSlidesSize(), h.updateProgress(), ("auto" === h.params.slidesPerView || h.params
							.freeMode || e) && h.updatePagination(), h.params.scrollbar && h.scrollbar && h.scrollbar.set(), h.params.freeMode) {
						var a = Math.min(Math.max(h.translate, h.maxTranslate()), h.minTranslate());
						h.setWrapperTranslate(a), h.updateActiveIndex(), h.updateClasses()
					} else h.updateClasses(), "auto" === h.params.slidesPerView && h.isEnd && !h.params.centeredSlides ? h.slideTo(h.slides
						.length - 1, 0, !1, !0) : h.slideTo(h.activeIndex, 0, !1, !0)
				};
			var g = ["mousedown", "mousemove", "mouseup"];
			window.navigator.pointerEnabled ? g = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled &&
				(g = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), h.touchEvents = {
					start: h.support.touch || !h.params.simulateTouch ? "touchstart" : g[0],
					move: h.support.touch || !h.params.simulateTouch ? "touchmove" : g[1],
					end: h.support.touch || !h.params.simulateTouch ? "touchend" : g[2]
				}, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === h.params.touchEventsTarget ?
					h.container : h.wrapper).addClass("swiper-wp8-" + h.params.direction), h.initEvents = function(e) {
					var a = e ? "off" : "on",
						s = e ? "removeEventListener" : "addEventListener",
						r = "container" === h.params.touchEventsTarget ? h.container[0] : h.wrapper[0],
						i = h.support.touch ? r : document,
						n = h.params.nested ? !0 : !1;
					h.browser.ie ? (r[s](h.touchEvents.start, h.onTouchStart, !1), i[s](h.touchEvents.move, h.onTouchMove, n), i[s](h
							.touchEvents.end, h.onTouchEnd, !1)) : (h.support.touch && (r[s](h.touchEvents.start, h.onTouchStart, !1), r[s]
								(h.touchEvents.move, h.onTouchMove, n), r[s](h.touchEvents.end, h.onTouchEnd, !1)), !t.simulateTouch || h.device
							.ios || h.device.android || (r[s]("mousedown", h.onTouchStart, !1), document[s]("mousemove", h.onTouchMove, n),
								document[s]("mouseup", h.onTouchEnd, !1))), window[s]("resize", h.onResize), h.params.nextButton && (v(h.params
							.nextButton)[a]("click", h.onClickNext), h.params.a11y && h.a11y && v(h.params.nextButton)[a]("keydown", h.a11y
							.onEnterKey)), h.params.prevButton && (v(h.params.prevButton)[a]("click", h.onClickPrev), h.params.a11y && h.a11y &&
							v(h.params.prevButton)[a]("keydown", h.a11y.onEnterKey)), h.params.pagination && h.params.paginationClickable &&
						v(h.paginationContainer)[a]("click", "." + h.params.bulletClass, h.onClickIndex), (h.params.preventClicks || h.params
							.preventClicksPropagation) && r[s]("click", h.preventClicks, !0)
				}, h.attachEvents = function(e) {
					h.initEvents()
				}, h.detachEvents = function() {
					h.initEvents(!0)
				}, h.allowClick = !0, h.preventClicks = function(e) {
					h.allowClick || (h.params.preventClicks && e.preventDefault(), h.params.preventClicksPropagation && h.animating &&
						(e.stopPropagation(), e.stopImmediatePropagation()))
				}, h.onClickNext = function(e) {
					e.preventDefault(), h.slideNext()
				}, h.onClickPrev = function(e) {
					e.preventDefault(), h.slidePrev()
				}, h.onClickIndex = function(e) {
					e.preventDefault();
					var a = v(this).index() * h.params.slidesPerGroup;
					h.params.loop && (a += h.loopedSlides), h.slideTo(a)
				}, h.updateClickedSlide = function(e) {
					var a = i(e, "." + h.params.slideClass),
						t = !1;
					if (a)
						for (var s = 0; s < h.slides.length; s++) h.slides[s] === a && (t = !0);
					if (!a || !t) return h.clickedSlide = void 0, void(h.clickedIndex = void 0);
					if (h.clickedSlide = a, h.clickedIndex = v(a).index(), h.params.slideToClickedSlide && void 0 !== h.clickedIndex &&
						h.clickedIndex !== h.activeIndex) {
						var r, n = h.clickedIndex;
						if (h.params.loop)
							if (r = v(h.clickedSlide).attr("data-swiper-slide-index"), n > h.slides.length - h.params.slidesPerView) h.fixLoop(),
								n = h.wrapper.children("." + h.params.slideClass + '[data-swiper-slide-index="' + r + '"]').eq(0).index(),
								setTimeout(function() {
									h.slideTo(n)
								}, 0);
							else if (n < h.params.slidesPerView - 1) {
							h.fixLoop();
							var o = h.wrapper.children("." + h.params.slideClass + '[data-swiper-slide-index="' + r + '"]');
							n = o.eq(o.length - 1).index(), setTimeout(function() {
								h.slideTo(n)
							}, 0)
						} else h.slideTo(n);
						else h.slideTo(n)
					}
				};
			var w, y, b, x, T, S, C, M, P, z = "input, select, textarea, button",
				I = Date.now(),
				k = [];
			h.animating = !1, h.touches = {
				startX: 0,
				startY: 0,
				currentX: 0,
				currentY: 0,
				diff: 0
			};
			var E, D;
			if (h.onTouchStart = function(e) {
					if (e.originalEvent && (e = e.originalEvent), E = "touchstart" === e.type, E || !("which" in e) || 3 !== e.which) {
						if (h.params.noSwiping && i(e, "." + h.params.noSwipingClass)) return void(h.allowClick = !0);
						if (!h.params.swipeHandler || i(e, h.params.swipeHandler)) {
							if (w = !0, y = !1, x = void 0, D = void 0, h.touches.startX = h.touches.currentX = "touchstart" === e.type ? e
								.targetTouches[0].pageX : e.pageX, h.touches.startY = h.touches.currentY = "touchstart" === e.type ? e.targetTouches[
									0].pageY : e.pageY, b = Date.now(), h.allowClick = !0, h.updateContainerSize(), h.swipeDirection = void 0, h.params
								.threshold > 0 && (C = !1), "touchstart" !== e.type) {
								var a = !0;
								v(e.target).is(z) && (a = !1), document.activeElement && v(document.activeElement).is(z) && document.activeElement
									.blur(), a && e.preventDefault()
							}
							h.emit("onTouchStart", h, e)
						}
					}
				}, h.onTouchMove = function(e) {
					if (e.originalEvent && (e = e.originalEvent), !(E && "mousemove" === e.type || e.preventedByNestedSwiper)) {
						if (h.params.onlyExternal) return y = !0, void(h.allowClick = !1);
						if (E && document.activeElement && e.target === document.activeElement && v(e.target).is(z)) return y = !0, void(
							h.allowClick = !1);
						if (h.emit("onTouchMove", h, e), !(e.targetTouches && e.targetTouches.length > 1)) {
							if (h.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, h.touches.currentY =
								"touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof x) {
								var a = 180 * Math.atan2(Math.abs(h.touches.currentY - h.touches.startY), Math.abs(h.touches.currentX - h.touches
									.startX)) / Math.PI;
								x = s() ? a > h.params.touchAngle : 90 - a > h.params.touchAngle
							}
							if (x && h.emit("onTouchMoveOpposite", h, e), "undefined" == typeof D && h.browser.ieTouch && (h.touches.currentX !==
									h.touches.startX || h.touches.currentY !== h.touches.startY) && (D = !0), w) {
								if (x) return void(w = !1);
								if (D || !h.browser.ieTouch) {
									h.allowClick = !1, h.emit("onSliderMove", h, e), e.preventDefault(), h.params.touchMoveStopPropagation && !h.params
										.nested && e.stopPropagation(), y || (t.loop && h.fixLoop(), S = h.getWrapperTranslate(), h.setWrapperTransition(
												0), h.animating && h.wrapper.trigger(
												"webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), h.params.autoplay &&
											h.autoplaying && (h.params.autoplayDisableOnInteraction ? h.stopAutoplay() : h.pauseAutoplay()), P = !1, h.params
											.grabCursor && (h.container[0].style.cursor = "move", h.container[0].style.cursor = "-webkit-grabbing", h.container[
												0].style.cursor = "-moz-grabbin", h.container[0].style.cursor = "grabbing")), y = !0;
									var r = h.touches.diff = s() ? h.touches.currentX - h.touches.startX : h.touches.currentY - h.touches.startY;
									r *= h.params.touchRatio, h.rtl && (r = -r), h.swipeDirection = r > 0 ? "prev" : "next", T = r + S;
									var i = !0;
									if (r > 0 && T > h.minTranslate() ? (i = !1, h.params.resistance && (T = h.minTranslate() - 1 + Math.pow(-h.minTranslate() +
											S + r, h.params.resistanceRatio))) : 0 > r && T < h.maxTranslate() && (i = !1, h.params.resistance && (T =
											h.maxTranslate() + 1 - Math.pow(h.maxTranslate() - S - r, h.params.resistanceRatio))), i && (e.preventedByNestedSwiper = !
											0), !h.params.allowSwipeToNext && "next" === h.swipeDirection && S > T && (T = S), !h.params.allowSwipeToPrev &&
										"prev" === h.swipeDirection && T > S && (T = S), h.params.followFinger) {
										if (h.params.threshold > 0) {
											if (!(Math.abs(r) > h.params.threshold || C)) return void(T = S);
											if (!C) return C = !0, h.touches.startX = h.touches.currentX, h.touches.startY = h.touches.currentY, T = S,
												void(h.touches.diff = s() ? h.touches.currentX - h.touches.startX : h.touches.currentY - h.touches.startY)
										}(h.params.freeMode || h.params.watchSlidesProgress) && h.updateActiveIndex(), h.params.freeMode && (0 ===
											k.length && k.push({
												position: h.touches[s() ? "startX" : "startY"],
												time: b
											}), k.push({
												position: h.touches[s() ? "currentX" : "currentY"],
												time: (new window.Date).getTime()
											})), h.updateProgress(T), h.setWrapperTranslate(T)
									}
								}
							}
						}
					}
				}, h.onTouchEnd = function(e) {
					if (e.originalEvent && (e = e.originalEvent), h.emit("onTouchEnd", h, e), w) {
						h.params.grabCursor && y && w && (h.container[0].style.cursor = "move", h.container[0].style.cursor =
							"-webkit-grab", h.container[0].style.cursor = "-moz-grab", h.container[0].style.cursor = "grab");
						var a = Date.now(),
							t = a - b;
						if (h.allowClick && (h.updateClickedSlide(e), h.emit("onTap", h, e), 300 > t && a - I > 300 && (M &&
								clearTimeout(M), M = setTimeout(function() {
									h && (h.params.paginationHide && h.paginationContainer.length > 0 && !v(e.target).hasClass(h.params.bulletClass) &&
										h.paginationContainer.toggleClass(h.params.paginationHiddenClass), h.emit("onClick", h, e))
								}, 300)), 300 > t && 300 > a - I && (M && clearTimeout(M), h.emit("onDoubleTap", h, e))), I = Date.now(),
							setTimeout(function() {
								h && (h.allowClick = !0)
							}, 0), !w || !y || !h.swipeDirection || 0 === h.touches.diff || T === S) return void(w = y = !1);
						w = y = !1;
						var s;
						if (s = h.params.followFinger ? h.rtl ? h.translate : -h.translate : -T, h.params.freeMode) {
							if (s < -h.minTranslate()) return void h.slideTo(h.activeIndex);
							if (s > -h.maxTranslate()) return void h.slideTo(h.slides.length < h.snapGrid.length ? h.snapGrid.length - 1 :
								h.slides.length - 1);
							if (h.params.freeModeMomentum) {
								if (k.length > 1) {
									var r = k.pop(),
										i = k.pop(),
										n = r.position - i.position,
										o = r.time - i.time;
									h.velocity = n / o, h.velocity = h.velocity / 2, Math.abs(h.velocity) < .02 && (h.velocity = 0), (o > 150 ||
										(new window.Date).getTime() - r.time > 300) && (h.velocity = 0)
								} else h.velocity = 0;
								k.length = 0;
								var l = 1e3 * h.params.freeModeMomentumRatio,
									d = h.velocity * l,
									p = h.translate + d;
								h.rtl && (p = -p);
								var u, c = !1,
									m = 20 * Math.abs(h.velocity) * h.params.freeModeMomentumBounceRatio;
								if (p < h.maxTranslate()) h.params.freeModeMomentumBounce ? (p + h.maxTranslate() < -m && (p = h.maxTranslate() -
									m), u = h.maxTranslate(), c = !0, P = !0) : p = h.maxTranslate();
								else if (p > h.minTranslate()) h.params.freeModeMomentumBounce ? (p - h.minTranslate() > m && (p = h.minTranslate() +
									m), u = h.minTranslate(), c = !0, P = !0) : p = h.minTranslate();
								else if (h.params.freeModeSticky) {
									var f, g = 0;
									for (g = 0; g < h.snapGrid.length; g += 1)
										if (h.snapGrid[g] > -p) {
											f = g;
											break
										} p = Math.abs(h.snapGrid[f] - p) < Math.abs(h.snapGrid[f - 1] - p) || "next" === h.swipeDirection ? h.snapGrid[
										f] : h.snapGrid[f - 1], h.rtl || (p = -p)
								}
								if (0 !== h.velocity) l = Math.abs(h.rtl ? (-p - h.translate) / h.velocity : (p - h.translate) / h.velocity);
								else if (h.params.freeModeSticky) return void h.slideReset();
								h.params.freeModeMomentumBounce && c ? (h.updateProgress(u), h.setWrapperTransition(l), h.setWrapperTranslate(
									p), h.onTransitionStart(), h.animating = !0, h.wrapper.transitionEnd(function() {
									h && P && (h.emit("onMomentumBounce", h), h.setWrapperTransition(h.params.speed), h.setWrapperTranslate(u),
										h.wrapper.transitionEnd(function() {
											h && h.onTransitionEnd()
										}))
								})) : h.velocity ? (h.updateProgress(p), h.setWrapperTransition(l), h.setWrapperTranslate(p), h.onTransitionStart(),
									h.animating || (h.animating = !0, h.wrapper.transitionEnd(function() {
										h && h.onTransitionEnd()
									}))) : h.updateProgress(p), h.updateActiveIndex()
							}
							return void((!h.params.freeModeMomentum || t >= h.params.longSwipesMs) && (h.updateProgress(), h.updateActiveIndex()))
						}
						var x, C = 0,
							z = h.slidesSizesGrid[0];
						for (x = 0; x < h.slidesGrid.length; x += h.params.slidesPerGroup) "undefined" != typeof h.slidesGrid[x + h.params
							.slidesPerGroup] ? s >= h.slidesGrid[x] && s < h.slidesGrid[x + h.params.slidesPerGroup] && (C = x, z = h.slidesGrid[
							x + h.params.slidesPerGroup] - h.slidesGrid[x]) : s >= h.slidesGrid[x] && (C = x, z = h.slidesGrid[h.slidesGrid
							.length - 1] - h.slidesGrid[h.slidesGrid.length - 2]);
						var E = (s - h.slidesGrid[C]) / z;
						if (t > h.params.longSwipesMs) {
							if (!h.params.longSwipes) return void h.slideTo(h.activeIndex);
							"next" === h.swipeDirection && h.slideTo(E >= h.params.longSwipesRatio ? C + h.params.slidesPerGroup : C),
								"prev" === h.swipeDirection && h.slideTo(E > 1 - h.params.longSwipesRatio ? C + h.params.slidesPerGroup : C)
						} else {
							if (!h.params.shortSwipes) return void h.slideTo(h.activeIndex);
							"next" === h.swipeDirection && h.slideTo(C + h.params.slidesPerGroup), "prev" === h.swipeDirection && h.slideTo(
								C)
						}
					}
				}, h._slideTo = function(e, a) {
					return h.slideTo(e, a, !0, !0)
				}, h.slideTo = function(e, a, t, r) {
					"undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), h.snapIndex = Math.floor(
						e / h.params.slidesPerGroup), h.snapIndex >= h.snapGrid.length && (h.snapIndex = h.snapGrid.length - 1);
					var i = -h.snapGrid[h.snapIndex];
					if (!h.params.allowSwipeToNext && i < h.translate && i < h.minTranslate()) return !1;
					if (!h.params.allowSwipeToPrev && i > h.translate && i > h.maxTranslate()) return !1;
					h.params.autoplay && h.autoplaying && (r || !h.params.autoplayDisableOnInteraction ? h.pauseAutoplay(a) : h.stopAutoplay()),
						h.updateProgress(i);
					for (var n = 0; n < h.slidesGrid.length; n++) - i >= h.slidesGrid[n] && (e = n);
					if ("undefined" == typeof a && (a = h.params.speed), h.previousIndex = h.activeIndex || 0, h.activeIndex = e, i ===
						h.translate) return h.updateClasses(), !1;
					h.updateClasses(), h.onTransitionStart(t);
					s() ? i : 0, s() ? 0 : i;
					return 0 === a ? (h.setWrapperTransition(0), h.setWrapperTranslate(i), h.onTransitionEnd(t)) : (h.setWrapperTransition(
						a), h.setWrapperTranslate(i), h.animating || (h.animating = !0, h.wrapper.transitionEnd(function() {
						h && h.onTransitionEnd(t)
					}))), !0
				}, h.onTransitionStart = function(e) {
					"undefined" == typeof e && (e = !0), h.lazy && h.lazy.onTransitionStart(), e && (h.emit("onTransitionStart", h),
						h.activeIndex !== h.previousIndex && h.emit("onSlideChangeStart", h))
				}, h.onTransitionEnd = function(e) {
					h.animating = !1, h.setWrapperTransition(0), "undefined" == typeof e && (e = !0), h.lazy && h.lazy.onTransitionEnd(),
						e && (h.emit("onTransitionEnd", h), h.activeIndex !== h.previousIndex && h.emit("onSlideChangeEnd", h)), h.params
						.hashnav && h.hashnav && h.hashnav.setHash()
				}, h.slideNext = function(e, a, t) {
					if (h.params.loop) {
						if (h.animating) return !1;
						h.fixLoop(); {
							h.container[0].clientLeft
						}
						return h.slideTo(h.activeIndex + h.params.slidesPerGroup, a, e, t)
					}
					return h.slideTo(h.activeIndex + h.params.slidesPerGroup, a, e, t)
				}, h._slideNext = function(e) {
					return h.slideNext(!0, e, !0)
				}, h.slidePrev = function(e, a, t) {
					if (h.params.loop) {
						if (h.animating) return !1;
						h.fixLoop(); {
							h.container[0].clientLeft
						}
						return h.slideTo(h.activeIndex - 1, a, e, t)
					}
					return h.slideTo(h.activeIndex - 1, a, e, t)
				}, h._slidePrev = function(e) {
					return h.slidePrev(!0, e, !0)
				}, h.slideReset = function(e, a, t) {
					return h.slideTo(h.activeIndex, a, e)
				}, h.setWrapperTransition = function(e, a) {
					h.wrapper.transition(e), "slide" !== h.params.effect && h.effects[h.params.effect] && h.effects[h.params.effect].setTransition(
							e), h.params.parallax && h.parallax && h.parallax.setTransition(e), h.params.scrollbar && h.scrollbar && h.scrollbar
						.setTransition(e), h.params.control && h.controller && h.controller.setTransition(e, a), h.emit(
							"onSetTransition", h, e)
				}, h.setWrapperTranslate = function(e, a, t) {
					var r = 0,
						i = 0,
						n = 0;
					s() ? r = h.rtl ? -e : e : i = e, h.params.virtualTranslate || h.wrapper.transform(h.support.transforms3d ?
							"translate3d(" + r + "px, " + i + "px, " + n + "px)" : "translate(" + r + "px, " + i + "px)"),
						h.translate = s() ? r : i, a && h.updateActiveIndex(), "slide" !== h.params.effect && h.effects[h.params.effect] &&
						h.effects[h.params.effect].setTranslate(h.translate), h.params.parallax && h.parallax && h.parallax.setTranslate(
							h.translate), h.params.scrollbar && h.scrollbar && h.scrollbar.setTranslate(h.translate), h.params.control && h
						.controller && h.controller.setTranslate(h.translate, t), h.emit("onSetTranslate", h, h.translate)
				}, h.getTranslate = function(e, a) {
					var t, s, r, i;
					return "undefined" == typeof a && (a = "x"), h.params.virtualTranslate ? h.rtl ? -h.translate : h.translate : (r =
						window.getComputedStyle(e, null), window.WebKitCSSMatrix ? i = new window.WebKitCSSMatrix("none" === r.webkitTransform ?
							"" : r.webkitTransform) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform ||
							r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" ===
						a && (s = window.WebKitCSSMatrix ? i.m41 : parseFloat(16 === t.length ? t[12] : t[4])), "y" === a && (s =
							window.WebKitCSSMatrix ? i.m42 : parseFloat(16 === t.length ? t[13] : t[5])), h.rtl && s && (s = -s), s || 0)
				}, h.getWrapperTranslate = function(e) {
					return "undefined" == typeof e && (e = s() ? "x" : "y"), h.getTranslate(h.wrapper[0], e)
				}, h.observers = [], h.initObservers = function() {
					if (h.params.observeParents)
						for (var e = h.container.parents(), a = 0; a < e.length; a++) n(e[a]);
					n(h.container[0], {
						childList: !1
					}), n(h.wrapper[0], {
						attributes: !1
					})
				}, h.disconnectObservers = function() {
					for (var e = 0; e < h.observers.length; e++) h.observers[e].disconnect();
					h.observers = []
				}, h.createLoop = function() {
					h.wrapper.children("." + h.params.slideClass + "." + h.params.slideDuplicateClass).remove();
					var e = h.wrapper.children("." + h.params.slideClass);
					h.loopedSlides = parseInt(h.params.loopedSlides || h.params.slidesPerView, 10), h.loopedSlides = h.loopedSlides +
						h.params.loopAdditionalSlides, h.loopedSlides > e.length && (h.loopedSlides = e.length);
					var a, t = [],
						s = [];
					for (e.each(function(a, r) {
							var i = v(this);
							a < h.loopedSlides && s.push(r), a < e.length && a >= e.length - h.loopedSlides && t.push(r), i.attr(
								"data-swiper-slide-index", a)
						}), a = 0; a < s.length; a++) h.wrapper.append(v(s[a].cloneNode(!0)).addClass(h.params.slideDuplicateClass));
					for (a = t.length - 1; a >= 0; a--) h.wrapper.prepend(v(t[a].cloneNode(!0)).addClass(h.params.slideDuplicateClass))
				}, h.destroyLoop = function() {
					h.wrapper.children("." + h.params.slideClass + "." + h.params.slideDuplicateClass).remove(), h.slides.removeAttr(
						"data-swiper-slide-index")
				}, h.fixLoop = function() {
					var e;
					h.activeIndex < h.loopedSlides ? (e = h.slides.length - 3 * h.loopedSlides + h.activeIndex, e += h.loopedSlides,
						h.slideTo(e, 0, !1, !0)) : ("auto" === h.params.slidesPerView && h.activeIndex >= 2 * h.loopedSlides || h.activeIndex >
						h.slides.length - 2 * h.params.slidesPerView) && (e = -h.slides.length + h.activeIndex + h.loopedSlides, e += h
						.loopedSlides, h.slideTo(e, 0, !1, !0))
				}, h.appendSlide = function(e) {
					if (h.params.loop && h.destroyLoop(), "object" == typeof e && e.length)
						for (var a = 0; a < e.length; a++) e[a] && h.wrapper.append(e[a]);
					else h.wrapper.append(e);
					h.params.loop && h.createLoop(), h.params.observer && h.support.observer || h.update(!0)
				}, h.prependSlide = function(e) {
					h.params.loop && h.destroyLoop();
					var a = h.activeIndex + 1;
					if ("object" == typeof e && e.length) {
						for (var t = 0; t < e.length; t++) e[t] && h.wrapper.prepend(e[t]);
						a = h.activeIndex + e.length
					} else h.wrapper.prepend(e);
					h.params.loop && h.createLoop(), h.params.observer && h.support.observer || h.update(!0), h.slideTo(a, 0, !1)
				}, h.removeSlide = function(e) {
					h.params.loop && (h.destroyLoop(), h.slides = h.wrapper.children("." + h.params.slideClass));
					var a, t = h.activeIndex;
					if ("object" == typeof e && e.length) {
						for (var s = 0; s < e.length; s++) a = e[s], h.slides[a] && h.slides.eq(a).remove(), t > a && t--;
						t = Math.max(t, 0)
					} else a = e, h.slides[a] && h.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
					h.params.loop && h.createLoop(), h.params.observer && h.support.observer || h.update(!0), h.params.loop ? h.slideTo(
						t + h.loopedSlides, 0, !1) : h.slideTo(t, 0, !1)
				}, h.removeAllSlides = function() {
					for (var e = [], a = 0; a < h.slides.length; a++) e.push(a);
					h.removeSlide(e)
				}, h.effects = {
					fade: {
						setTranslate: function() {
							for (var e = 0; e < h.slides.length; e++) {
								var a = h.slides.eq(e),
									t = a[0].swiperSlideOffset,
									r = -t;
								h.params.virtualTranslate || (r -= h.translate);
								var i = 0;
								s() || (i = r, r = 0);
								var n = h.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress,
									-1), 0);
								a.css({
									opacity: n
								}).transform("translate3d(" + r + "px, " + i + "px, 0px)")
							}
						},
						setTransition: function(e) {
							if (h.slides.transition(e), h.params.virtualTranslate && 0 !== e) {
								var a = !1;
								h.slides.transitionEnd(function() {
									if (!a && h) {
										a = !0, h.animating = !1;
										for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd",
												"msTransitionEnd"
											], t = 0; t < e.length; t++) h.wrapper.trigger(e[t])
									}
								})
							}
						}
					},
					cube: {
						setTranslate: function() {
							var e, a = 0;
							h.params.cube.shadow && (s() ? (e = h.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = v(
								'<div class="swiper-cube-shadow"></div>'), h.wrapper.append(e)), e.css({
								height: h.width + "px"
							})) : (e = h.container.find(".swiper-cube-shadow"), 0 === e.length && (e = v(
								'<div class="swiper-cube-shadow"></div>'), h.container.append(e))));
							for (var t = 0; t < h.slides.length; t++) {
								var r = h.slides.eq(t),
									i = 90 * t,
									n = Math.floor(i / 360);
								h.rtl && (i = -i, n = Math.floor(-i / 360));
								var o = Math.max(Math.min(r[0].progress, 1), -1),
									l = 0,
									d = 0,
									p = 0;
								t % 4 === 0 ? (l = 4 * -n * h.size, p = 0) : (t - 1) % 4 === 0 ? (l = 0, p = 4 * -n * h.size) : (t - 2) % 4 ===
									0 ? (l = h.size + 4 * n * h.size, p = h.size) : (t - 3) % 4 === 0 && (l = -h.size, p = 3 * h.size + 4 * h.size *
										n), h.rtl && (l = -l), s() || (d = l, l = 0);
								var u = "rotateX(" + (s() ? 0 : -i) + "deg) rotateY(" + (s() ? i : 0) + "deg) translate3d(" + l + "px, " + d +
									"px, " + p + "px)";
								if (1 >= o && o > -1 && (a = 90 * t + 90 * o, h.rtl && (a = 90 * -t - 90 * o)), r.transform(u), h.params.cube
									.slideShadows) {
									var c = r.find(s() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
										m = r.find(s() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
									0 === c.length && (c = v('<div class="swiper-slide-shadow-' + (s() ? "left" : "top") + '"></div>'), r.append(
										c)), 0 === m.length && (m = v('<div class="swiper-slide-shadow-' + (s() ? "right" : "bottom") + '"></div>'),
										r.append(m)); {
										r[0].progress
									}
									c.length && (c[0].style.opacity = -r[0].progress), m.length && (m[0].style.opacity = r[0].progress)
								}
							}
							if (h.wrapper.css({
									"-webkit-transform-origin": "50% 50% -" + h.size / 2 + "px",
									"-moz-transform-origin": "50% 50% -" + h.size / 2 + "px",
									"-ms-transform-origin": "50% 50% -" + h.size / 2 + "px",
									"transform-origin": "50% 50% -" + h.size / 2 + "px"
								}), h.params.cube.shadow)
								if (s()) e.transform("translate3d(0px, " + (h.width / 2 + h.params.cube.shadowOffset) + "px, " + -h.width / 2 +
									"px) rotateX(90deg) rotateZ(0deg) scale(" + h.params.cube.shadowScale + ")");
								else {
									var f = Math.abs(a) - 90 * Math.floor(Math.abs(a) / 90),
										g = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2),
										w = h.params.cube.shadowScale,
										y = h.params.cube.shadowScale / g,
										b = h.params.cube.shadowOffset;
									e.transform("scale3d(" + w + ", 1, " + y + ") translate3d(0px, " + (h.height / 2 + b) + "px, " + -h.height /
										2 / y + "px) rotateX(-90deg)")
								} var x = h.isSafari || h.isUiWebView ? -h.size / 2 : 0;
							h.wrapper.transform("translate3d(0px,0," + x + "px) rotateX(" + (s() ? 0 : a) + "deg) rotateY(" + (s() ? -a :
								0) + "deg)")
						},
						setTransition: function(e) {
							h.slides.transition(e).find(
								".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
							).transition(e), h.params.cube.shadow && !s() && h.container.find(".swiper-cube-shadow").transition(e)
						}
					},
					coverflow: {
						setTranslate: function() {
							for (var e = h.translate, a = s() ? -e + h.width / 2 : -e + h.height / 2, t = s() ? h.params.coverflow.rotate :
									-h.params.coverflow.rotate, r = h.params.coverflow.depth, i = 0, n = h.slides.length; n > i; i++) {
								var o = h.slides.eq(i),
									l = h.slidesSizesGrid[i],
									d = o[0].swiperSlideOffset,
									p = (a - d - l / 2) / l * h.params.coverflow.modifier,
									u = s() ? t * p : 0,
									c = s() ? 0 : t * p,
									m = -r * Math.abs(p),
									f = s() ? 0 : h.params.coverflow.stretch * p,
									g = s() ? h.params.coverflow.stretch * p : 0;
								Math.abs(g) < .001 && (g = 0), Math.abs(f) < .001 && (f = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) <
									.001 && (u = 0), Math.abs(c) < .001 && (c = 0);
								var w = "translate3d(" + g + "px," + f + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
								if (o.transform(w), o[0].style.zIndex = -Math.abs(Math.round(p)) + 1, h.params.coverflow.slideShadows) {
									var y = o.find(s() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
										b = o.find(s() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
									0 === y.length && (y = v('<div class="swiper-slide-shadow-' + (s() ? "left" : "top") + '"></div>'), o.append(
										y)), 0 === b.length && (b = v('<div class="swiper-slide-shadow-' + (s() ? "right" : "bottom") + '"></div>'),
										o.append(b)), y.length && (y[0].style.opacity = p > 0 ? p : 0), b.length && (b[0].style.opacity = -p > 0 ?
										-p : 0)
								}
							}
							if (h.browser.ie) {
								var x = h.wrapper[0].style;
								x.perspectiveOrigin = a + "px 50%"
							}
						},
						setTransition: function(e) {
							h.slides.transition(e).find(
								".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
							).transition(e)
						}
					}
				}, h.lazy = {
					initialImageLoaded: !1,
					loadImageInSlide: function(e, a) {
						if ("undefined" != typeof e && ("undefined" == typeof a && (a = !0), 0 !== h.slides.length)) {
							var t = h.slides.eq(e),
								s = t.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
							!t.hasClass("swiper-lazy") || t.hasClass("swiper-lazy-loaded") || t.hasClass("swiper-lazy-loading") || s.add(t[
								0]), 0 !== s.length && s.each(function() {
								var e = v(this);
								e.addClass("swiper-lazy-loading");
								var s = e.attr("data-background"),
									r = e.attr("data-src");
								h.loadImage(e[0], r || s, !1, function() {
									if (s ? (e.css("background-image", "url(" + s + ")"), e.removeAttr("data-background")) : (e.attr("src",
											r), e.removeAttr("data-src")), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), t.find(
											".swiper-lazy-preloader, .preloader").remove(), h.params.loop && a) {
										var i = t.attr("data-swiper-slide-index");
										if (t.hasClass(h.params.slideDuplicateClass)) {
											var n = h.wrapper.children('[data-swiper-slide-index="' + i + '"]:not(.' + h.params.slideDuplicateClass +
												")");
											h.lazy.loadImageInSlide(n.index(), !1)
										} else {
											var o = h.wrapper.children("." + h.params.slideDuplicateClass + '[data-swiper-slide-index="' + i +
												'"]');
											h.lazy.loadImageInSlide(o.index(), !1)
										}
									}
									h.emit("onLazyImageReady", h, t[0], e[0])
								}), h.emit("onLazyImageLoad", h, t[0], e[0])
							})
						}
					},
					load: function() {
						var e;
						if (h.params.watchSlidesVisibility) h.wrapper.children("." + h.params.slideVisibleClass).each(function() {
							h.lazy.loadImageInSlide(v(this).index())
						});
						else if (h.params.slidesPerView > 1)
							for (e = h.activeIndex; e < h.activeIndex + h.params.slidesPerView; e++) h.slides[e] && h.lazy.loadImageInSlide(
								e);
						else h.lazy.loadImageInSlide(h.activeIndex);
						if (h.params.lazyLoadingInPrevNext)
							if (h.params.slidesPerView > 1) {
								for (e = h.activeIndex + h.params.slidesPerView; e < h.activeIndex + h.params.slidesPerView + h.params.slidesPerView; e++)
									h.slides[e] && h.lazy.loadImageInSlide(e);
								for (e = h.activeIndex - h.params.slidesPerView; e < h.activeIndex; e++) h.slides[e] && h.lazy.loadImageInSlide(
									e)
							} else {
								var a = h.wrapper.children("." + h.params.slideNextClass);
								a.length > 0 && h.lazy.loadImageInSlide(a.index());
								var t = h.wrapper.children("." + h.params.slidePrevClass);
								t.length > 0 && h.lazy.loadImageInSlide(t.index())
							}
					},
					onTransitionStart: function() {
						h.params.lazyLoading && (h.params.lazyLoadingOnTransitionStart || !h.params.lazyLoadingOnTransitionStart && !h.lazy
							.initialImageLoaded) && h.lazy.load()
					},
					onTransitionEnd: function() {
						h.params.lazyLoading && !h.params.lazyLoadingOnTransitionStart && h.lazy.load()
					}
				}, h.scrollbar = {
					set: function() {
						if (h.params.scrollbar) {
							var e = h.scrollbar;
							e.track = v(h.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag =
									v('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[
									0].style.height = "", e.trackSize = s() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = h.size /
								h.virtualSize, e.moveDivider = e.divider * (e.trackSize / h.size), e.dragSize = e.trackSize * e.divider, s() ?
								e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.track[0].style.display =
								e.divider >= 1 ? "none" : "", h.params.scrollbarHide && (e.track[0].style.opacity = 0)
						}
					},
					setTranslate: function() {
						if (h.params.scrollbar) {
							var e, a = h.scrollbar,
								t = (h.translate || 0, a.dragSize);
							e = (a.trackSize - a.dragSize) * h.progress, h.rtl && s() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e +
									a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize >
								a.trackSize && (t = a.trackSize - e), s() ? (a.drag.transform(h.support.transforms3d ? "translate3d(" + e +
									"px, 0, 0)" : "translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (a.drag.transform(h.support.transforms3d ?
									"translate3d(0px, " + e + "px, 0)" : "translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), h.params
								.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
									a.track[0].style.opacity = 0, a.track.transition(400)
								}, 1e3))
						}
					},
					setTransition: function(e) {
						h.params.scrollbar && h.scrollbar.drag.transition(e)
					}
				}, h.controller = {
					setTranslate: function(e, t) {
						function s(a) {
							e = a.rtl && "horizontal" === a.params.direction ? -h.translate : h.translate, r = (a.maxTranslate() - a.minTranslate()) /
								(h.maxTranslate() - h.minTranslate()), i = (e - h.minTranslate()) * r + a.minTranslate(), h.params.controlInverse &&
								(i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, h), a.updateActiveIndex()
						}
						var r, i, n = h.params.control;
						if (h.isArray(n))
							for (var o = 0; o < n.length; o++) n[o] !== t && n[o] instanceof a && s(n[o]);
						else n instanceof a && t !== n && s(n)
					},
					setTransition: function(e, t) {
						function s(a) {
							a.setWrapperTransition(e, h), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
								i && a.onTransitionEnd()
							}))
						}
						var r, i = h.params.control;
						if (h.isArray(i))
							for (r = 0; r < i.length; r++) i[r] !== t && i[r] instanceof a && s(i[r]);
						else i instanceof a && t !== i && s(i)
					}
				}, h.hashnav = {
					init: function() {
						if (h.params.hashnav) {
							h.hashnav.initialized = !0;
							var e = document.location.hash.replace("#", "");
							if (e)
								for (var a = 0, t = 0, s = h.slides.length; s > t; t++) {
									var r = h.slides.eq(t),
										i = r.attr("data-hash");
									if (i === e && !r.hasClass(h.params.slideDuplicateClass)) {
										var n = r.index();
										h.slideTo(n, a, h.params.runCallbacksOnInit, !0)
									}
								}
						}
					},
					setHash: function() {
						h.hashnav.initialized && h.params.hashnav && (document.location.hash = h.slides.eq(h.activeIndex).attr(
							"data-hash") || "")
					}
				}, h.disableKeyboardControl = function() {
					v(document).off("keydown", o)
				}, h.enableKeyboardControl = function() {
					v(document).on("keydown", o)
				}, h.mousewheel = {
					event: !1,
					lastScrollTime: (new window.Date).getTime()
				}, h.params.mousewheelControl) {
				if (void 0 !== document.onmousewheel && (h.mousewheel.event = "mousewheel"), !h.mousewheel.event) try {
					new window.WheelEvent("wheel"), h.mousewheel.event = "wheel"
				} catch (G) {}
				h.mousewheel.event || (h.mousewheel.event = "DOMMouseScroll")
			}
			h.disableMousewheelControl = function() {
				return h.mousewheel.event ? (h.container.off(h.mousewheel.event, l), !0) : !1
			}, h.enableMousewheelControl = function() {
				return h.mousewheel.event ? (h.container.on(h.mousewheel.event, l), !0) : !1
			}, h.parallax = {
				setTranslate: function() {
					h.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(
						function() {
							d(this, h.progress)
						}), h.slides.each(function() {
						var e = v(this);
						e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
							var a = Math.min(Math.max(e[0].progress, -1), 1);
							d(this, a)
						})
					})
				},
				setTransition: function(e) {
					"undefined" == typeof e && (e = h.params.speed), h.container.find(
						"[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						var a = v(this),
							t = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
						0 === e && (t = 0), a.transition(t)
					})
				}
			}, h._plugins = [];
			for (var L in h.plugins) {
				var B = h.plugins[L](h, h.params[L]);
				B && h._plugins.push(B)
			}
			return h.callPlugins = function(e) {
				for (var a = 0; a < h._plugins.length; a++) e in h._plugins[a] && h._plugins[a][e](arguments[1], arguments[2],
					arguments[3], arguments[4], arguments[5])
			}, h.emitterEventListeners = {}, h.emit = function(e) {
				h.params[e] && h.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				var a;
				if (h.emitterEventListeners[e])
					for (a = 0; a < h.emitterEventListeners[e].length; a++) h.emitterEventListeners[e][a](arguments[1], arguments[2],
						arguments[3], arguments[4], arguments[5]);
				h.callPlugins && h.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}, h.on = function(e, a) {
				return e = p(e), h.emitterEventListeners[e] || (h.emitterEventListeners[e] = []), h.emitterEventListeners[e].push(
					a), h
			}, h.off = function(e, a) {
				var t;
				if (e = p(e), "undefined" == typeof a) return h.emitterEventListeners[e] = [], h;
				if (h.emitterEventListeners[e] && 0 !== h.emitterEventListeners[e].length) {
					for (t = 0; t < h.emitterEventListeners[e].length; t++) h.emitterEventListeners[e][t] === a && h.emitterEventListeners[
						e].splice(t, 1);
					return h
				}
			}, h.once = function(e, a) {
				e = p(e);
				var t = function() {
					a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), h.off(e, t)
				};
				return h.on(e, t), h
			}, h.a11y = {
				makeFocusable: function(e) {
					return e[0].tabIndex = "0", e
				},
				addRole: function(e, a) {
					return e.attr("role", a), e
				},
				addLabel: function(e, a) {
					return e.attr("aria-label", a), e
				},
				disable: function(e) {
					return e.attr("aria-disabled", !0), e
				},
				enable: function(e) {
					return e.attr("aria-disabled", !1), e
				},
				onEnterKey: function(e) {
					13 === e.keyCode && (v(e.target).is(h.params.nextButton) ? (h.onClickNext(e), h.a11y.notify(h.isEnd ? h.params.lastSlideMsg :
						h.params.nextSlideMsg)) : v(e.target).is(h.params.prevButton) && (h.onClickPrev(e), h.a11y.notify(h.isBeginning ?
						h.params.firstSlideMsg : h.params.prevSlideMsg)))
				},
				liveRegion: v('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
				notify: function(e) {
					var a = h.a11y.liveRegion;
					0 !== a.length && (a.html(""), a.html(e))
				},
				init: function() {
					if (h.params.nextButton) {
						var e = v(h.params.nextButton);
						h.a11y.makeFocusable(e), h.a11y.addRole(e, "button"), h.a11y.addLabel(e, h.params.nextSlideMsg)
					}
					if (h.params.prevButton) {
						var a = v(h.params.prevButton);
						h.a11y.makeFocusable(a), h.a11y.addRole(a, "button"), h.a11y.addLabel(a, h.params.prevSlideMsg)
					}
					v(h.container).append(h.a11y.liveRegion)
				},
				destroy: function() {
					h.a11y.liveRegion && h.a11y.liveRegion.length > 0 && h.a11y.liveRegion.remove()
				}
			}, h.init = function() {
				h.params.loop && h.createLoop(), h.updateContainerSize(), h.updateSlidesSize(), h.updatePagination(), h.params.scrollbar &&
					h.scrollbar && h.scrollbar.set(), "slide" !== h.params.effect && h.effects[h.params.effect] && (h.params.loop ||
						h.updateProgress(), h.effects[h.params.effect].setTranslate()), h.params.loop ? h.slideTo(h.params.initialSlide +
						h.loopedSlides, 0, h.params.runCallbacksOnInit) : (h.slideTo(h.params.initialSlide, 0, h.params.runCallbacksOnInit),
						0 === h.params.initialSlide && (h.parallax && h.params.parallax && h.parallax.setTranslate(), h.lazy && h.params
							.lazyLoading && (h.lazy.load(), h.lazy.initialImageLoaded = !0))), h.attachEvents(), h.params.observer && h.support
					.observer && h.initObservers(), h.params.preloadImages && !h.params.lazyLoading && h.preloadImages(), h.params.autoplay &&
					h.startAutoplay(), h.params.keyboardControl && h.enableKeyboardControl && h.enableKeyboardControl(), h.params.mousewheelControl &&
					h.enableMousewheelControl && h.enableMousewheelControl(), h.params.hashnav && h.hashnav && h.hashnav.init(), h.params
					.a11y && h.a11y && h.a11y.init(), h.emit("onInit", h)
			}, h.cleanupStyles = function() {
				h.container.removeClass(h.classNames.join(" ")).removeAttr("style"), h.wrapper.removeAttr("style"), h.slides && h
					.slides.length && h.slides.removeClass([h.params.slideVisibleClass, h.params.slideActiveClass, h.params.slideNextClass,
						h.params.slidePrevClass
					].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), h.paginationContainer &&
					h.paginationContainer.length && h.paginationContainer.removeClass(h.params.paginationHiddenClass), h.bullets &&
					h.bullets.length && h.bullets.removeClass(h.params.bulletActiveClass), h.params.prevButton && v(h.params.prevButton)
					.removeClass(h.params.buttonDisabledClass), h.params.nextButton && v(h.params.nextButton).removeClass(h.params.buttonDisabledClass),
					h.params.scrollbar && h.scrollbar && (h.scrollbar.track && h.scrollbar.track.length && h.scrollbar.track.removeAttr(
						"style"), h.scrollbar.drag && h.scrollbar.drag.length && h.scrollbar.drag.removeAttr("style"))
			}, h.destroy = function(e, a) {
				h.detachEvents(), h.stopAutoplay(), h.params.loop && h.destroyLoop(), a && h.cleanupStyles(), h.disconnectObservers(),
					h.params.keyboardControl && h.disableKeyboardControl && h.disableKeyboardControl(), h.params.mousewheelControl &&
					h.disableMousewheelControl && h.disableMousewheelControl(), h.params.a11y && h.a11y && h.a11y.destroy(), h.emit(
						"onDestroy"), e !== !1 && (h = null)
			}, h.init(), h
		}
	};
	a.prototype = {
		isSafari: function() {
			var e = navigator.userAgent.toLowerCase();
			return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
		}(),
		isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
		isArray: function(e) {
			return "[object Array]" === Object.prototype.toString.apply(e)
		},
		browser: {
			ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
			ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled &&
				window.navigator.maxTouchPoints > 1
		},
		device: function() {
			var e = navigator.userAgent,
				a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
				t = e.match(/(iPad).*OS\s([\d_]+)/),
				s = (e.match(/(iPod)(.*OS\s([\d_]+))?/), !t && e.match(/(iPhone\sOS)\s([\d_]+)/));
			return {
				ios: t || s || t,
				android: a
			}
		}(),
		support: {
			touch: window.Modernizr && Modernizr.touch === !0 || function() {
				return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
			}(),
			transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
				var e = document.createElement("div").style;
				return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e ||
					"perspective" in e
			}(),
			flexbox: function() {
				for (var e = document.createElement("div").style, a =
						"alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient"
						.split(" "), t = 0; t < a.length; t++)
					if (a[t] in e) return !0
			}(),
			observer: function() {
				return "MutationObserver" in window || "WebkitMutationObserver" in window
			}()
		},
		plugins: {}
	};
	for (var t = ["jQuery", "Zepto", "Dom7"], s = 0; s < t.length; s++) window[t[s]] && e(window[t[s]]);
	var r;
	r = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, r && ("transitionEnd" in r.fn ||
		(r.fn.transitionEnd = function(e) {
			function a(i) {
				if (i.target === this)
					for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a)
			}
			var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
				r = this;
			if (e)
				for (t = 0; t < s.length; t++) r.on(s[t], a);
			return this
		}), "transform" in r.fn || (r.fn.transform = function(e) {
			for (var a = 0; a < this.length; a++) {
				var t = this[a].style;
				t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
			}
			return this
		}), "transition" in r.fn || (r.fn.transition = function(e) {
			"string" != typeof e && (e += "ms");
			for (var a = 0; a < this.length; a++) {
				var t = this[a].style;
				t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration =
					t.transitionDuration = e
			}
			return this
		})), window.Swiper = a
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd &&
	define([], function() {
		"use strict";
		return window.Swiper
	});
//# sourceMappingURL=maps/swiper.jquery.min.js.map

// JavaScript Document$(function() {
	$(".navbar .navbar-toggle").on("click",function() {
		$(this).parents(".navbar").toggleClass("open");
	})
	$("#download a.btn-link:last").on("click",function() {
		$(this).parent().siblings(".link").fadeIn(400).find(".btn").off("click").on("click",function() {
			$(this).parent().fadeOut(400)
		});
	});

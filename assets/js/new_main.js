// original file at
// https://github.com/pages-themes/leap-day/blob/721ef5c3a4441b3f35199e10101718cd23891d60/assets/js/main.js

var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

$(window).resize(sectionHeight);

$(function() {
  $("section h1, section h2, section h3").each(function(){
    let headerName = $(this).text();
    let headerId = headerName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'');
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "' id='nav-" + headerId +
                       "'><a href='#" + headerId + "'>" + headerName + "</a></li>");
    $(this).attr("id", headerId);
  });
  $("nav ul li:first-child a").parent().addClass("active");

  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });

  $(".jump-to-section").click(function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li.active").each(function() {
      $(this).removeClass("active");
    });
    $('#nav-' + $(this).attr("href").substring(1)).addClass("active");
    event.preventDefault();
  });

  sectionHeight();

  $('img').on('load', sectionHeight);
});

$(document).ready(function () {
  // if user came by a direct link to a page section, adjust the page location for them and set
  // active correctly
  var internal_href_index = window.location.href.indexOf('#');
  if (internal_href_index != -1) {
    var href = window.location.href.substring(internal_href_index);
    var position = $(href).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li.active").each(function() {
      $(this).removeClass("active");
    });
    $('#nav-' + href.substring(1)).addClass("active")
  }
});

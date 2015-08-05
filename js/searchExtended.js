/*
    Plugin Name: Search Extended - Category Search Selector
    Plugin URI: http://www.iocron.com
    Description: Extends Search Functionality
    Version: 0.1
    Author: iocron
    Author URI: http://www.iocron.com
    Plugin update URI: http://www.osclass.org/files/plugins/search_extended/update.php
    Copyright 2015 Sebastian Pieczona <info@iocron.com>
    License ioCron Commercial License <http://iocron.com/licenses/iocron-license.txt>
    You are not allowed to copy, use or to share this script or parts of it without a explicit permission 
    or license key of Sebastian Pieczona / ioCron. Please buy this product from us first.
*/

(function($){
    function addActive(element) {
        $(element).hover(function() {
            if(!$(this).hasClass('active_li')) {
                $(".active_li").removeClass('active_li');
                $(this).addClass('active_li').children('ul').addClass('active_ul').fadeIn(600);
            }
        }, function() {
            if($(this).hasClass('active_li')) {
                $(".active_li ul").fadeOut(100, function() {
                    $(".active_ul").removeClass('active_ul');
                    $(this).removeClass('active_li');
                });
            }
        });
    }
    function switchUl(element) {
        $(element).children('.next').on('click', function(event) {
            event.preventDefault();
            $(element).parent('ul').css('top', '-100%');
            $(element).children('ul').css('top', '100%').fadeIn(200, function() {
                
            });

        });
        $(element).children('.before').on('click', function(event) {
            event.preventDefault();
            
        });
    }
    $(document).ready(function(){
		$("body").addClass('js');
        $(".searchExtNav > ul ul").css('display', 'none');
        var max_height = 0;
        $('.searchExtNav ul').each(function(e) {
            h = $(this).height();
            if(typeof(h) != "undefined") {
                if(h > max_height) {
                    max_height = h;
                }
            }
        });
        if(max_height > 0) {
            $('.searchExtNav ul').height(max_height);
        }
        $(".searchExtNav li").each(function(index, el) {
            if($(el).hasClass('submenu') && $(el).hasClass('level_0')) {
                $(el).append('<span class="next"><i class="fa fa-arrow-right"></i></span>');
            } else if($(el).hasClass('submenu') && !$(el).hasClass('level_0')) {
                $(el).append('<span class="next"><i class="fa fa-arrow-right"></i></span>');
                $(el).prepend('<span class="before"><i class="fa fa-arrow-left"></i></span>');
                $(el).find("ul").css('z-index', 150+index);
            } else {
                $(el).find("ul").css('z-index', 150+index);
            }
        });
        addActive($(".searchExtNav .level_0 > li"));
        switchUl($(".searchExtNav .level_1 > li"));
    }); 
})(jQuery);
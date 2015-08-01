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
    function createList(arr) {
        var parent = arr[0].fk_i_parent_id;
        var parentClass = (parent===null) ? "-1" : parent;
        var wrap = $("<ul class='searchMenu' data-parent='"+parentClass+"'></ul>");
        $.each(arr, function(i, obj) {
            var content = $("<a value='"+obj.fk_i_category_id+"'>"+obj.s_name+"</a>");
            if(typeof obj.categories != 'undefined' && obj.categories.length > 0) {
                var el = $("<li data-parent='"+parentClass+"' class='hasSubCate'></li>");
                createList(obj.categories);
            } else {
                var el = $("<li data-parent='"+parentClass+"'></li>");
            }
            content.appendTo(el);
            el.appendTo(wrap);
        });
        wrap.prependTo(".main-search");
    }
    $(document).ready(function(){
        console.log(searchExtJson);
        createList(searchExtJson);
        $(".searchMenu li a").mouseover(function() {
            event.preventDefault();
            var val = $(this).attr('value');
            if($(".active").length > 0) {
                $(".active").fadeOut(100, function() {
                    $(".active").removeClass('active');
                    $(".data-parent"+val).addClass('active');
                    $(".active").fadeIn(1000);
                });
            } else {
                $(".data-parent"+val).addClass('active');
                $(".active").fadeIn(1000);
            }
        }).mouseout(function(event) {
            event.preventDefault();
            var val = $(this).attr('value');
            $(".active").fadeOut(1, function() {
                $(".data-parent"+val).removeClass('active');
            });
        });
    }); 
})(jQuery);
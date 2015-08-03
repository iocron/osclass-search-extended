<?php
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
    
    
    // Hooks
    osc_add_hook('header', 'searchExtCSS');
    osc_add_hook('footer', 'searchExtInit');
    
    
    // Init HTML Search List & Load JS Files
    function searchExtInit(){
        $searchExtArray = searchExtArray();
        
        searchExtCreateList($searchExtArray);
        echo "<script>var searchExtJson = ".(json_encode($searchExtArray))."</script>\n";
        echo "<script type='text/javascript' src='".(WEB_PATH)."oc-content/plugins/search_extended/js/searchExtended.js'></script>\n";
    }
    
    
    // Init CSS Files
    function searchExtCSS(){
        echo "<link href='".(WEB_PATH)."oc-content/plugins/search_extended/css/searchExtended.css' rel='stylesheet' type='text/css'>";
    }
    
    
    // Return Navigation / Search Array
    function searchExtArray(){
        return Category::newInstance()->toTree();
    }
    
    
    // HTML Search List Create Function
    function searchExtCreateList($arr){
        $parent = $arr[0];        
        $parentID = !isset($parent["fk_i_parent_id"]) ? "0" : $parent["fk_i_parent_id"];
        
        echo "<ul class='level_$parentID'>";
        foreach($arr as $cnt => $obj){
            $hasSub = isset($obj["categories"]) && count($obj["categories"])>0 ? true : false;
            $submenuClass = $hasSub ? " submenu" : "";
            $firstLastClass = $cnt==0 ? " first" : (count($arr)==$cnt+1 ? " last" : "");
            
            echo "<li class='level_$parentID$submenuClass$firstLastClass'>";
            echo    "<a class='level_$parentID' href='index.php?page=search&sCategory=".($obj["fk_i_category_id"])."'>".$obj["s_name"]."</a>";
                    if($hasSub) searchExtCreateList($obj["categories"]);
            echo "</li>";
        }
        echo "</ul>";
    }
?>

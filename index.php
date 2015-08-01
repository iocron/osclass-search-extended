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
    osc_add_hook('footer', 'searchExtHTML');
    
    // Functions
	function searchExtArray(){
		return Category::newInstance()->toTree();
	}
    
    function searchExtHTML(){        
        echo "<script>var searchExtJson = ".(json_encode(searchExtArray()))."</script>\n";
        echo "<script type='text/javascript' src='".(WEB_PATH)."oc-content/plugins/search_extended/js/searchExtended.js'></script>\n";
        
        //echo "<pre>\n";
        //print_r(searchExtArray());
        //echo "\n</pre>";
    }
?>

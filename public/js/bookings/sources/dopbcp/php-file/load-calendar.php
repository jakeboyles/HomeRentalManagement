<?php

/*
* Title                   : Booking Calendar PRO (jQuery Plugin)
* Version                 : 2.0
* File                    : load-form.php
* File Version            : 2.0
* Created / Last Modified : 29 September 2014
* Author                  : Dot on Paper
* Copyright               : © 2011 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Load booking form data from a file.
*/

        if(isset($_GET['calendar'])) { 
            $calendar = $_GET['calendar'];
        } else {
            $calendar = 0;
        }
        
        header("Content-type: text/json");
        $file = 'data/calendar'.$calendar.'.txt';
        
        if (file_exists($file)){
            echo file_get_contents($file);
        }
        else{
            echo '';
        }
    
?>
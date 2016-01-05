<?php

/*
* Title                   : Booking Calendar PRO (jQuery Plugin)
* Version                 : 2.0
* File                    : save.php
* File Version            : 2.0
* Created / Last Modified : 29 May 2014
* Author                  : Dot on Paper
* Copyright               : © 2011 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Save booking data in a file.
*/

    if (isset($_POST['dopbcp_calendar_id'])){ // If calendar ID is received.
// Save data in a file in folder data.        
        $file = fopen('data/content'.$_POST['dopbcp_calendar_id'].'.txt', 'w');
        fwrite($file, $_POST['dopbcp_schedule']);
        fclose($file);
    }

?>
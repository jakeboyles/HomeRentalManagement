<?php

/*
* Title                   : Booking Calendar PRO (jQuery Plugin)
* Version                 : 2.0
* File                    : load.php
* File Version            : 2.0
* Created / Last Modified : 29 September 2014
* Author                  : Dot on Paper
* Copyright               : © 2011 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Load booking data from database.
*/
    
    if (isset($_POST['dopbcp_calendar_id'])){ // If calendar ID is received.
        require_once 'opendb.php';

// Select and show the data from the database.        
        $query = mysql_query("SELECT * FROM `schedule` WHERE id=".$_POST['dopbcp_calendar_id']);
        $result = mysql_fetch_array($query);
        echo $result['data'];
    }
    
?>
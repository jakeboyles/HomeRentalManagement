<?php

/*
* Title                   : Booking Calendar PRO (jQuery Plugin)
* Version                 : 2.0
* File                    : save.php
* File Version            : 2.0
* Created / Last Modified : 29 September 2014
* Author                  : Dot on Paper
* Copyright               : © 2011 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Save booking data in database.
*/
    
    if (isset($_POST['dopbcp_calendar_id'])){ // If calendar ID is received.
        require_once 'opendb.php';
    
// Test if calendar is added to the database.        
        $query = mysql_query('SELECT * FROM schedule WHERE id="'.$_POST['dopbcp_calendar_id'].'"');

        if (mysql_fetch_array($query) !== false){
// Update if calendar already in the database.            
            mysql_query("UPDATE schedule SET data='".$_POST['dopbcp_schedule']."' WHERE id=".$_POST['dopbcp_calendar_id']);
        }
        else{
// Insert calendar in the database if it doesn't exist.   
            mysql_query("INSERT INTO  `schedule` (  `id` ,  `data` ) VALUES (".$_POST['dopbcp_calendar_id'].", '".$_POST['dopbcp_schedule']."')");
        }
    }
    
?>
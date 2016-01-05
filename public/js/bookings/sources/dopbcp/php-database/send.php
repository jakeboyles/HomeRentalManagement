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
        
// Reservation Data
        $reservation_data = $_POST['reservation_data'];
        $language = $_POST['language'];
        $currency = $_POST['currency'];
        $currency_code = $_POST['currency_code'];
        $form = $_POST['form'];
        $page_url = $_POST['page_url'];
        
        // JSON Encode Reservation Data
        $reservation_data = json_encode($reservation_data);
    
// Test if calendar is added to the database.        
        $query = mysql_query('SELECT * FROM reservations WHERE id="'.$_POST['dopbcp_calendar_id'].'"');
        
        if (mysql_fetch_array($query) !== false){
// Update if calendar already in the database.            
            mysql_query("UPDATE reservations SET data='".$reservation_data."' WHERE id=".$_POST['dopbcp_calendar_id']);
        }
        else{
// Insert calendar in the database if it doesn't exist.   
            mysql_query("INSERT INTO  `reservations` (  `id` ,  `data` ) VALUES (".$_POST['dopbcp_calendar_id'].", '".$reservation_data."')");
        }
    }
    
?>
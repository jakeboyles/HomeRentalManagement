<?php

/*
* Title                   : Booking Calendar PRO (jQuery Plugin)
* Version                 : 2.0
* File                    : send.php
* File Version            : 2.0
* Created / Last Modified : 29 September 2014
* Author                  : Dot on Paper
* Copyright               : © 2011 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Send booking data.
*/

    if (isset($_POST['dopbcp_calendar_id'])){ // If calendar ID is received.
    
        $language = $_POST['language'];
        $currency = $_POST['currency'];
        $currency_code = $_POST['currency_code'];
        $reservation_data = $_POST['reservation_data'];
        $form = $_POST['form'];
        $page_url = $_POST['page_url'];
        
        // Save data in a file in folder data. 
        $reservation_data = json_encode($reservation_data);
        $file = fopen('data/reservation'.$_POST['dopbcp_calendar_id'].'.txt', 'w');
        fwrite($file, $cart_data);
        fclose($file);
    }

?>
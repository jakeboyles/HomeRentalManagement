<?php

/*
* Title                   : Booking Calendar PRO (jQuery Plugin)
* Version                 : 2.0
* File                    : opendb.php
* File Version            : 2.0
* Created / Last Modified : 29 September 2014
* Author                  : Dot on Paper
* Copyright               : © 2011 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Connect & create a database.
*/

    define('DB_HOST', 'localhost'); // Enter database host.
    define('DB_USER', 'db user'); // Enter database user.
    define('DB_PASS', 'db password'); // Enter database password.
    define('DB_NAME', 'db name'); // Enter database name.
    
// Connect to database.    
    $conn = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die ('Error connecting to mysql!');
    mysql_select_db(DB_NAME);

// Test if table exist.
    $querySchedule = mysql_query('SELECT 1 FROM schedule');
    $queryReservations = mysql_query('SELECT 1 FROM reservations'); 
    
    if($querySchedule === false){
// If table doesn't exist a new one is created.        
        mysql_query('CREATE TABLE schedule (id INT, data TEXT)');
    }
    
    if($queryReservations === false){
// If table reservations doesn't exist a new one is created.        
        mysql_query('CREATE TABLE reservations (id INT, data TEXT)');
    }

?>
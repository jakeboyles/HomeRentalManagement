<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => 'web'], function () {

Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);

Route::get('/', 'HomeController@index');

Route::get('/thank-you', 'HomeController@thankYou');

Route::post('/calendar','HomeController@calendar');
Route::post('/calendar/save','HomeController@saveCalendar');
Route::post('/calendar/book','HomeController@bookCalendar');

Route::post('/images/add','AdminController@addImage');

Route::post('/photos/delete','AdminController@deletePhoto');

Route::group(['prefix' => 'admin','middleware' => 'auth'], function() {
	Route::get('/', 'HomeController@admin');
	Route::get('/dashboard', 'HomeController@admin');
	Route::post('/home/edit','AdminController@edit');
});
});

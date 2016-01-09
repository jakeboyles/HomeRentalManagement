
/*
* Title                   : Booking Calendar PRO (jQuery Plugin)
* Version                 : 2.0
* File                    : jquery.dop.FrontendBookingCalendarPRO.js
* File Version            : 2.0
* Created / Last Modified : 29 September 2014
* Author                  : Dot on Paper
* Copyright               : © 2011 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Booking Calendar PRO Front End jQuery plugin.
*/

(function($){
    'use strict';

    Stripe.setPublishableKey('pk_test_Ay33qMt7vSol2CaER3fDzJCs');
  
    $.fn.DOPFrontendBookingCalendarPRO = function(options){
        /*
         * Private variables.
         */
        var Data = {"loadURL": "dopbcp/php-file/load.php",
                    "sendURL": "dopbcp/php-file/send.php",
                    "reinitialize": false,
                    "calendar": {"data": {"bookingStop": 0,
                                          "dateType": 1,
                                          "language": "en",
                                          "languages": [],
                                          "view": false},
                                 "text": {"addMonth": "Add month view",
                                          "available": "available",
                                          "availableMultiple": "available",
                                          "booked": "booked",
                                          "nextMonth": "Next month",
                                          "previousMonth": "Previous month",
                                          "removeMonth": "Remove month view",
                                          "unavailable": "unavailable"}},
                    "cart": {"data": {"enabled": true},
                             "text": {"isEmpty": "Cart is empty.",
                                      "title": "Cart"}},
                    "currency": {"data": {"code": "USD",
                                          "position": "before",
                                          "sign": "$"},
                                 "text": {}}, 
                    "days": {"data": {"available": [true, true, true, true, true, true, true],
                                      "first": 1,
                                      "morningCheckOut": true,
                                      "multipleSelect": true},
                             "text": {"names": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                      "shortNames": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}},
                    "deposit": {"data": {"deposit": 0,
                                         "type": "percent"},
                                "text": {"left": "Left to pay",
                                         "title": "Deposit"}}, 
                    "discounts": {"data": {"discount": []},
                                  "text": {"byDay": "day",
                                           "title": "Discount"}},
                    "extras": {"data": {"extra": [],id:"0"},
                               "text": {"byDay": "day",
                                        "invalid": "Select an option from",
                                        "title": "Extras"}},
                    "fees": {"data": {"fees": [
                    ]},
                             "text": {"byDay": "day",
                                      "included": "Included in price",
                                      "title": "Taxes & fees"}},
                    "form":{"data": {"form":[{"id":"1",
                                              "form_id":"1",
                                              "type":"text",
                                              "position":"1",
                                              "multiple_select":"false",
                                              "allowed_characters":"",
                                              "size":"0",
                                              "is_email":"false",
                                              "required":"true",
                                              "translation":"First name"},
                                             {"id":"2",
                                              "form_id":"1",
                                              "type":"text",
                                              "position":"2",
                                              "multiple_select":"false",
                                              "allowed_characters":"",
                                              "size":"0",
                                              "is_email":"false",
                                              "required":"true",
                                              "translation":"Last name"},
                                             {"id":"3",
                                              "form_id":"1",
                                              "type":"text",
                                              "position":"3",
                                              "multiple_select":"false",
                                              "allowed_characters":"",
                                              "size":"0",
                                              "is_email":"true",
                                              "required":"true",
                                              "translation":"Email"},
                                             {"id":"4",
                                              "form_id":"1",
                                              "type":"text",
                                              "position":"4",
                                              "multiple_select":"false",
                                              "allowed_characters":"0123456789+-().",
                                              "size":"0",
                                              "is_email":"false",
                                              "required":"true",
                                              "translation":"Phone"},
                                             {"id":"5",
                                              "form_id":"1",
                                              "type":"textarea",
                                              "position":"5",
                                              "multiple_select":"false",
                                              "allowed_characters":"",
                                              "size":"0",
                                              "is_email":"false",
                                              "required":"false",
                                              "translation":"Message"}]},
                               "text": {"checked":"Checked",
                                   "invalidEmail":"is invalid. Please enter a valid email.",
                                   "required":"is required.",
                                   "title":"Payment Information",
                                   "unchecked":"Unchecked"}},
                    "ID": 0,
                    "months": {"data": {"no": 1},
                               "text": {"names": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                        "shortNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}},
                    "order": {"data": {"redirect": "",
                                       "terms": false,
                                       "termsLink": ""},
                              "text": {"book": "Book now",
                                       "success": "Reservation has been added!",
                                       "terms": "I accept to agree to the Terms & Conditions.",
                                       "termsInvalid": "You must agree with our Terms & Conditions to continue.",
                                       "title": "Order",
                                       "unavailable": "The period you selected is not available anymore. The calendar will refresh to update the schedule."}},
                    "reservation": {"data": {},
                                    "text": {"price": "Price",
                                             "priceChange": "Price change",
                                             "priceTotal": "Total",
                                             "selectDays": "Please select the days from calendar.",
                                             "title": "Reservation",
                                             "titleDetails": "Details"}},
                    "search": {"data": {},
                               "text": {"checkIn": "Check in",
                                        "checkOut": "Check out",
                                        "noItems": "No. book items",
                                        "noServices": "There are no services available for the period you selected.",
                                        "noServicesSplitGroup": "You cannot add divided groups to a reservation.",
                                        "title": "Search"}},           
                    "sidebar": {"data": {"noItems": true,
                                         "positions": {"search": {"column": 1,
                                                                  "row": 1},
                                                       "extras": {"column": 1,
                                                                  "row": 2},        
                                                       "reservation": {"column": 1,
                                                                       "row": 4},
                                                       "cart": {"column": 1,
                                                                "row": 5},
                                                       "form": {"column": 2,
                                                                "row": 6},
                                                       "order": {"column": 1,
                                                                 "row": 7}},
                                         "style": 1},
                                "text": {}}},
        ajaxLoadURL = '',
        ajaxSendURL = '',
        Container = this,
        ID = 0,

// ***************************************************************************** Main methods.

// 1. Main methods.
        
        methods = {
            init:function(){
            /*
             * Initialize jQuery plugin.
             */
                return this.each(function(){
                    if (options){
                        $.extend(Data, options);
                    }
                    
                    if (!$(Container).hasClass('dopbcp-initialized')
                            || Data['reinitialize']){
                        $(Container).addClass('dopbcp-initialized');
                        methods.parse();
                        $(window).bind('resize.DOPBCPCalendar', methods.rp);                          
                    }
                });
            },
            parse:function(){
            /*
             * Parse calendar options.
             */
                methods_calendar.data = Data['calendar']['data'];
                methods_calendar.text = Data['calendar']['text'];
                
                ajaxLoadURL = prototypes.acaoBuster(Data['loadURL']);
                ajaxSendURL = prototypes.acaoBuster(Data['sendURL']);
                
                methods_cart.data = Data['cart']['data'];
                methods_cart.text = Data['cart']['text'];
                
                methods_currency.data = Data['currency']['data'];
                methods_currency.text = Data['currency']['text'];
                
                methods_days.data = Data['days']['data'];
                methods_days.text = Data['days']['text'];
                
                methods_deposit.data = Data['deposit']['data'];
                methods_deposit.text = Data['deposit']['text'];
                
                methods_discounts.data = Data['discounts']['data'];
                methods_discounts.text = Data['discounts']['text'];
                
                methods_extras.data = Data['extras']['data'];
                methods_extras.text = Data['extras']['text'];
                
                methods_fees.data = Data['fees']['data'];
                methods_fees.text = Data['fees']['text'];
                
                methods_form.data = Data['form']['data'];
                methods_form.text = Data['form']['text'];
                
                ID = Data['ID'];
                
                methods_months.data = Data['months']["data"];
                methods_months.text = Data['months']["text"];
                
                methods_order.data = Data['order']["data"];
                methods_order.text = Data['order']["text"];
                
                methods_reservation.data = Data['reservation']["data"];
                methods_reservation.text = Data['reservation']["text"];
                
                methods_search.data = Data['search']["data"];
                methods_search.text = Data['search']["text"];
                
                methods_sidebar.data = Data['sidebar']["data"];
                methods_sidebar.text = Data['sidebar']["text"];
                
                Container.html('<div class="dopbcp-loader"></div>');
                
                /*
                 * Init months data.
                 */
                methods_months.init();
                
                /*
                 * Load schedule.
                 */
                methods_schedule.parse(new Date().getFullYear());
            },
            rp:function(){
            /*
             * Initialize calendar resize & position. Used for responsive feature.
             */
                /*
                 * Resize & position the sidebar first.
                 */
                methods_sidebar.rp();
                methods_calendar.container.rp();
                methods_calendar.navigation.rp();
                methods_day.rp();
            }
        },           
        
// 2. Schedule

        methods_schedule = {
            vars: {schedule: {}},
            
            parse:function(year){
            /*
             * Parse calendar schedule.
             * 
             * @param year (Number): the year for which the calendar should get the schedule
             */
                var scheduleBuffer = {};
                
                $.post(ajaxLoadURL, {dopbcp_calendar_id: ID,
                                 year:year}, function(data){
                    if ($.trim(data) !== ''){
                        
                        scheduleBuffer = JSON.parse($.trim(data));
                        
                        $.extend(methods_schedule.vars.schedule, scheduleBuffer);
                    }
                   
                    methods_calendar.vars.display = false;
                    methods_calendar.display();
                    methods_components.init();

                    if (!methods_calendar.vars.firstYearLoaded){
                        methods_calendar.vars.firstYearLoaded = true;
                    }
                });
            },
            reset:function(){
            /*
             * Reset calendar schedule.
             */
                Container.html('<div class="dopbcp-loader"></div>');
                methods_schedule.vars.schedule = {};
                methods_calendar.vars.display = true;
                methods_calendar.vars.firstYearLoaded = false;
                
                methods_schedule.parse(new Date().getFullYear());
            }
        },
                
// 3. Components

        methods_components = {
            init:function(){
            /*
             * Initialize calendar components.
             */ 
                /*
                 * Initialize today date.
                 */
                methods_calendar.vars.todayDate = new Date();
                methods_calendar.vars.todayDay = methods_calendar.vars.todayDate.getDate();
                methods_calendar.vars.todayMonth = methods_calendar.vars.todayDate.getMonth()+1;
                methods_calendar.vars.todayYear = methods_calendar.vars.todayDate.getFullYear(); 
                
                /*
                 * Initialize start date.
                 */
                methods_calendar.vars.startDate = new Date(new Date().getTime()+methods_calendar.data['bookingStop']*60*1000);
                methods_calendar.vars.currMonth = methods_calendar.vars.startDate.getMonth()+1;
                methods_calendar.vars.currYear = methods_calendar.vars.startDate.getFullYear();
                methods_calendar.vars.startDay = methods_calendar.vars.startDate.getDate();
                methods_calendar.vars.startMonth = methods_calendar.vars.startDate.getMonth()+1;
                methods_calendar.vars.startYear = methods_calendar.vars.startDate.getFullYear(); 
                
                /*
                 * Tooltip
                 */
                methods_tooltip.display();
                
                /*
                 * Calendar
                 */
                methods_calendar.container.init();
                methods_calendar.navigation.init();
                methods_calendar.init(methods_calendar.vars.startYear, 
                                      methods_calendar.vars.startMonth);

                /*
                 * Sidebar
                 */                      
                if (!methods_calendar.data['view']){
                    /*
                     * Search
                     */
                    methods_search.display();
                    
                    /*
                     * Extras
                     */
                    if (methods_extras.data['id'] !== '0'){
                        methods_extras.display();
                    }
                    
                    /*
                     * Reservation
                     */
                    methods_reservation.display();
                    
                    /*
                     * Form
                     */
                    methods_form.display();

                    /*
                     * Order
                     */
                    methods_order.display();
                    
                    /*
                     * Initialize sidebar.
                     */
                    methods_sidebar.init();
                }
                
                methods.rp();
            }
        },  
                
// 4. Currency
        
        methods_currency = {
            data: {},
            text: {}
        },
         
// 5. Price         
                
        methods_price = {
            set:function(price){
            /*
             * Display price with currency in set format.
             * 
             * @param price (Number): price value
             * 
             * @return price with currency
             */ 
                var priceDisplayed = '';
                
                price = prototypes.getWithDecimals(Math.abs(price), 
                                                   2);
                                                   
                switch (methods_currency.data['position']){
                    case 'after':
                        priceDisplayed =  price+methods_currency.data['sign'];
                        break;
                    case 'after_with_space':
                        priceDisplayed =  price+' '+methods_currency.data['sign'];
                        break;
                    case 'before_with_space':
                        priceDisplayed =  methods_currency.data['sign']+' '+price;
                        break;
                    default:
                        priceDisplayed = methods_currency.data['sign']+price;
                }
                
                return priceDisplayed;
            }
        },        

// 6. Tooltip

        methods_tooltip = {
            display:function(){
            /*
             * Display information tooltip.
             */
                if ($('#DOPBCPCalendar-tooltip'+ID).length !== undefined){
                    $('#DOPBCPCalendar-tooltip'+ID).remove();
                }
                $('body').append('<div class="DOPBCPCalendar-tooltip" id="DOPBCPCalendar-tooltip'+ID+'"></div>');
                methods_tooltip.init();
            },
            init:function(){
            /*
             * Initialize information tooltip.
             */
                var $tooltip = $('#DOPBCPCalendar-tooltip'+ID),
                h,
                xPos = 0, 
                yPos = 0;
                            
                if (!prototypes.isTouchDevice()){
                    /*
                     * Position the tooltip depending on mouse position.
                     */
                    $(document).mousemove(function(e){
                        xPos = e.pageX+15;
                        yPos = e.pageY-10;

                        /*
                         * Tooltip height.
                         */
                        h = $tooltip.height()
                            +parseFloat($tooltip.css('padding-top'))
                            +parseFloat($tooltip.css('padding-bottom'))
                            +parseFloat($tooltip.css('border-top-width'))
                            +parseFloat($tooltip.css('border-bottom-width'));

                        if ($(document).scrollTop()+$(window).height() < yPos+h+10){
                            yPos = $(document).scrollTop()+$(window).height()-h-10;
                        }

                        $tooltip.css({'left': xPos, 
                                      'top': yPos});
                    });
                }
                else{
                    /*
                     * Hide tooltip when you touch it.
                     */
                    $tooltip.unbind('touchstart');
                    $tooltip.bind('touchstart', function(e){
                        e.preventDefault();
                        methods_tooltip.clear();
                    });
                }
            },
            set:function(day,
                         type,
                         infoData){
            /*
             * Set tooltip.
             * 
             * @param day (String): the day for which the information will be displayed (YYYY-MM-DD)
             * @param type (String): type of information to be displayed
             *                       "info" display information
             *                       "info-body" display information
             *                       "notes" display notes
             * @param infoData (String): information to be displayed
             */    
                
                var data = methods_schedule.vars.schedule[day],
                info = infoData !== undefined ? data['info']:infoData;  // data[type]+(data['info'] !== undefined ? (data[type] !== '' && data['info'].length > 0 ? '<br /><br />':'')+methods_form.getInfo(data['info']):'');
                /*
                 * Display body info.
                 */

                if (type === 'info-body'){
                    info = methods_form.getInfo(data['info_body']);
                }
                                        
                info = decodeURIComponent(escape(info));

                if (type === 'info-body'){
                    $('#DOPBCPCalendar-tooltip'+ID).removeClass('dopbcp-text');
                }
                else{
                    $('#DOPBCPCalendar-tooltip'+ID).addClass('dopbcp-text');
                }
                $('#DOPBCPCalendar-tooltip'+ID).html(info)
                                               .css('display', 'block');                         
            },
            clear:function(){
            /*
             * Clear information display.
             */
                $('#DOPBCPCalendar-tooltip'+ID).css('display', 'none');                        
            }
        },
                
// 7. Info
        
        methods_info = {
            vars: {time: 0},
            
            toggleMessages:function(message,
                                    type){
            /*
             * Toggle info messages.
             * 
             * @param message (String): the message to be displayed
             * @param type (String): message type
             *                       "dopbcp-error" error message
             *                       "dopbcp-success" success message
             */         
                type = type === undefined ? 'dopbcp-error':type;
                
                $('#DOPBCPCalendar-info-message'+ID+' .dopbcp-text').html(message);
                $('#DOPBCPCalendar-info-message'+ID).removeClass('dopbcp-success')
                                                    .removeClass('dopbcp-error')
                                                    .addClass(type)
                                                    .css('display', 'block');

                prototypes.scrollToY($('#DOPBCPCalendar-info-message'+ID).offset().top-100);
                
                if (methods_info.vars.time !== 0){
                    methods_info.vars.time = 15;
                    
                }
                else{
                    methods_info.vars.time = 15;
                    methods_info.timer();
                }
            },
            timer:function(){
            /*
             * Count the number of seconds before the info message is hidden.
             */    
                $('#DOPBCPCalendar-info-message'+ID+' .dopbcp-timer').html('['+prototypes.getLeadingZero(methods_info.vars.time)+']');
                
                if (methods_info.vars.time === 0){
                    $('#DOPBCPCalendar-info-message'+ID).stop(true, true).fadeOut(300);
                }
                else{
                    setTimeout(function(){
                        methods_info.vars.time--;
                        methods_info.timer();
                    }, 1000);
                }
            }
        },
                
// ***************************************************************************** Calendar

// 8. Calendar
        
        methods_calendar = {
            data: {},
            text: {},
            vars: {currMonth: new Date(),
                   currYear: new Date(),
                   display: true,
                   firstYearLoaded: false,
                   startDate: new Date(),
                   startDay: new Date(),
                   startMonth: new Date(),
                   startYear: new Date(),
                   todayDate: new Date(),
                   todayDay: new Date(),
                   todayMonth: new Date(),
                   todayYear: new Date()},
            
            display:function(){
            /*
             * Display calendar.
             */
                var HTML = new Array();

                /*
                 * Message HTML
                 */
                HTML.push('<div class="DOPBCPCalendar-info-message" id="DOPBCPCalendar-info-message'+ID+'">');     
                HTML.push('    <div class="dopbcp-icon"></div>');     
                HTML.push('    <div class="dopbcp-text"></div>');     
                HTML.push('    <div class="dopbcp-timer"></div>');     
                HTML.push('    <a href="javascript:void(0)" onclick="jQuery(\'#DOPBCPCalendar-info-message'+ID+'\').stop(true, true).fadeOut(300)" class="dopbcp-close"></a>');     
                HTML.push('</div>');
                
                /*
                 *  Calendar HTML.
                 */
                HTML.push('<div class="DOPBCPCalendar-wrapper notranslate dopbcp-initialized" id="DOPBCPCalendar'+ID+'">');
                HTML.push(' <div class="DOPBCPCalendar-container">');                        
                HTML.push('    <div class="DOPBCPCalendar-navigation">');
                HTML.push('        <div class="dopbcp-month-year"></div>');
                HTML.push('        <a href="javascript:void(0)" class="dopbcp-add-btn"><span class="dopbcp-info">'+methods_calendar.text['addMonth']+'</span></a>');                        
                HTML.push('        <a href="javascript:void(0)" class="dopbcp-remove-btn"><span class="dopbcp-info">'+methods_calendar.text['removeMonth']+'</span></a>');
                HTML.push('        <a href="javascript:void(0)" class="dopbcp-next-btn"><span class="dopbcp-info">'+methods_calendar.text['nextMonth']+'</span></a>');
                HTML.push('        <a href="javascript:void(0)" class="dopbcp-previous-btn"><span class="dopbcp-info">'+methods_calendar.text['previousMonth']+'</span></a>');
                HTML.push('        <div class="dopbcp-week">');
                HTML.push('            <div class="dopbcp-day"></div>');
                HTML.push('            <div class="dopbcp-day"></div>');
                HTML.push('            <div class="dopbcp-day"></div>');
                HTML.push('            <div class="dopbcp-day"></div>');
                HTML.push('            <div class="dopbcp-day"></div>');
                HTML.push('            <div class="dopbcp-day"></div>');
                HTML.push('            <div class="dopbcp-day"></div>');
                HTML.push('        </div>');
                HTML.push('    </div>');
                HTML.push('    <div class="DOPBCPCalendar-calendar"></div>');
                HTML.push(' </div>');
                HTML.push('</div>');

                /*
                 * Sidebar/form HTML.
                 */ 
                if (!methods_calendar.data['view']){
                    if ($('#DOPBCPCalendar-outer-sidebar'+ID).length === 0){
                        HTML.push('<div class="DOPBCPCalendar-sidebar dopbcp-style'+methods_sidebar.data['style']+'">'+methods_sidebar.display()+'</div>');
                    }
                    else{
                        HTML.push('<div class="DOPBCPCalendar-sidebar dopbcp-hidden"></div>');
                        $('#DOPBCPCalendar-outer-sidebar'+ID).html(methods_sidebar.display());
                    }
                }
                
                Container.html(HTML.join(''));
            },
            init:function(year,
                          month){
            /*
             * Initialize calendar.
             * 
             * @param year (Number): year to be displayed
             * @param month (Number): month to be displayed
             */
                var i;

                methods_calendar.vars.currYear = new Date(year, month, 0).getFullYear();
                methods_calendar.vars.currMonth = month;    

                /*
                 * Initialize add/remove buttons.
                 */
                if (methods_months.vars.no > 1){
                    $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).css('display', 'block');
                } 
                else{
                    $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).css('display', 'none');
                }
                
                if (methods_months.vars.no === methods_months.vars.maxAllowed){
                    $('.DOPBCPCalendar-navigation .dopbcp-add-btn', Container).css('display', 'none');
                    $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).addClass('dopbcp-no-add');
                } 
                else{
                    $('.DOPBCPCalendar-navigation .dopbcp-add-btn', Container).css('display', 'block');
                    $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).removeClass('dopbcp-no-add');
                }

                /*
                 * Initialize previous button.
                 */
                if (year !== methods_calendar.vars.startYear 
                        || month !== methods_calendar.vars.startMonth){
                    $('.DOPBCPCalendar-navigation .dopbcp-previous-btn', Container).css('display', 'block');
                }   

                if (year === methods_calendar.vars.startYear 
                        && month === methods_calendar.vars.startMonth){
                    $('.DOPBCPCalendar-navigation .dopbcp-previous-btn', Container).css('display', 'none');
                }
                methods_day.vars.previousStatus = '';
                methods_day.vars.previousBind = 0;

                if (Container.width() <= 400){
                    $('.DOPBCPCalendar-navigation .dopbcp-month-year', Container).html(methods_months.text['names'][(methods_calendar.vars.currMonth%12 !== 0 ? methods_calendar.vars.currMonth%12:12)-1]+' '+methods_calendar.vars.currYear); 
                }
                else{
                    $('.DOPBCPCalendar-navigation .dopbcp-month-year', Container).html(methods_months.text['names'][(methods_calendar.vars.currMonth%12 !== 0 ? methods_calendar.vars.currMonth%12:12)-1]+' '+methods_calendar.vars.currYear); 
                }                        
                $('.DOPBCPCalendar-calendar', Container).html('');

                for (i=1; i<=methods_months.vars.no; i++){
                    methods_month.display(methods_calendar.vars.currYear, 
                                          month = month%12 !== 0 ? month%12:12, 
                                          i);
                    month++;

                    if (month % 12 === 1){
                        methods_calendar.vars.currYear++;
                        month = 1;
                    }                            
                }
               
                methods_days.displaySelection();
                methods_day.events.init();
                
                if (methods_calendar.vars.firstYearLoaded){
                    methods_day.rp();                        
                }
            },
            
            container: {
                init:function(){
                /*
                 * Initialize calendar container. 
                 */
                    methods_calendar.container.rp();
                },
                rp:function(){
                /*
                 *  Resize & position calendar container. Used for responsive feature.
                 */  
                    var hiddenBustedItems = prototypes.doHiddenBuster($(Container));
                    
                    if (Container.width() < 500
                            || (methods_sidebar.data['style'] === 1
                                    && Container.width() < 900)
                            || methods_sidebar.data['style'] === 2
                            || methods_sidebar.data['style'] === 3
                            || (methods_sidebar.data['style'] === 4
                                    && Container.width() < 660)
                            || (methods_sidebar.data['style'] === 5
                                    && Container.width() < 800)){
                        $('.DOPBCPCalendar-container', Container).width(Container.width());
                        
                        if (methods_sidebar.data['style'] === 5){                  
                            $('.DOPBCPCalendar-sidebar', Container).removeAttr('style');            
                        }
                    }
                    else{
                        if (methods_sidebar.data['style'] === 5){
                            $('.DOPBCPCalendar-container', Container).width((Container.width()-21)/2);                            
                            $('.DOPBCPCalendar-sidebar', Container).width((Container.width()-21)/2);                             
                        }
                        else{
                            $('.DOPBCPCalendar-container', Container).width(Container.width()-$('.DOPBCPCalendar-sidebar', Container).width()-parseFloat($('.DOPBCPCalendar-sidebar', Container).css('margin-left'))-1);
                        }
                    }

                    prototypes.undoHiddenBuster(hiddenBustedItems);
                }
            },
            navigation: {
                init:function(){
                /*
                 * Initialize calendar navigation.
                 */
                    methods_calendar.navigation.events();
                    methods_calendar.navigation.rp();
                },
                rp:function(){
                /*
                 *  Resize & position calendar navigation. Used for responsive feature.
                 */  
                    var no = 0,
                    hiddenBustedItems = prototypes.doHiddenBuster($(Container));

                    if ($('.DOPBCPCalendar-navigation', Container).width() <= 400){
                        $('.DOPBCPCalendar-navigation .dopbcp-month-year', Container).html(methods_months.text['names'][(methods_calendar.vars.currMonth%12 !== 0 ? methods_calendar.vars.currMonth%12:12)-1]+' '+(new Date(methods_calendar.vars.startYear, methods_calendar.vars.currMonth, 0).getFullYear()))
                                                                                     .addClass('dopbcp-style-small'); 
                    }
                    else{
                        $('.DOPBCPCalendar-navigation .dopbcp-month-year', Container).html(methods_months.text['names'][(methods_calendar.vars.currMonth%12 !== 0 ? methods_calendar.vars.currMonth%12:12)-1]+' '+(new Date(methods_calendar.vars.startYear, methods_calendar.vars.currMonth, 0).getFullYear()))
                                                                                     .removeClass('dopbcp-style-small'); 
                    }

                    $('.DOPBCPCalendar-navigation .dopbcp-week .dopbcp-day', Container).width(parseInt(($('.DOPBCPCalendar-navigation .dopbcp-week', Container).width()-parseInt($('.DOPBCPCalendar-navigation .dopbcp-week', Container).css('padding-left'))+parseInt($('.DOPBCPCalendar-navigation .dopbcp-week', Container).css('padding-right')))/7));
                    no = methods_days.data['first']-1;

                    $('.DOPBCPCalendar-navigation .dopbcp-week .dopbcp-day', Container).each(function(){
                        no++;

                        if (no === 7){
                            no = 0;
                        }

                        if ($(this).width() <= 70){
                            $(this).html(methods_days.text['shortNames'][no]);
                        }
                        else{
                            $(this).html(methods_days.text['names'][no]);
                        }
                    });

                    prototypes.undoHiddenBuster(hiddenBustedItems);
                },
                events:function(){
                /*
                 * Initialize calendar navigation events.
                 */
                    /*
                     * Previous button event.
                     */
                    $('.DOPBCPCalendar-navigation .dopbcp-previous-btn', Container).unbind('click touchstart');
                    $('.DOPBCPCalendar-navigation .dopbcp-previous-btn', Container).bind('click touchstart', function(){
                        methods_calendar.init(methods_calendar.vars.startYear, 
                                              methods_calendar.vars.currMonth-1);

                        if (methods_calendar.vars.currMonth === methods_calendar.vars.startMonth){
                            $('.DOPBCPCalendar-navigation .dopbcp-previous-btn', Container).css('display', 'none');
                        }
                    });

                    /*
                     * Next button event.
                     */
                    $('.DOPBCPCalendar-navigation .dopbcp-next-btn', Container).unbind('click touchstart');
                    $('.DOPBCPCalendar-navigation .dopbcp-next-btn', Container).bind('click touchstart', function(){
                        methods_calendar.init(methods_calendar.vars.startYear, 
                                              methods_calendar.vars.currMonth+1);
                        $('.DOPBCPCalendar-navigation .dopbcp-previous-btn', Container).css('display', 'block');
                    });

                    /*
                     * Add button event.
                     */
                    $('.DOPBCPCalendar-navigation .dopbcp-add-btn', Container).unbind('click touchstart');
                    $('.DOPBCPCalendar-navigation .dopbcp-add-btn', Container).bind('click touchstart', function(){
                        methods_months.vars.no++;
                        methods_calendar.init(methods_calendar.vars.startYear, 
                                              methods_calendar.vars.currMonth);
                          
                        if (methods_months.vars.no >= methods_months.vars.maxAllowed){
                            $('.DOPBCPCalendar-navigation .dopbcp-add-btn', Container).css('display', 'none');
                            $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).addClass('dopbcp-no-add');
                        }
                        $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).css('display', 'block');
                        
                        prototypes.scrollToY($('.DOPBCPCalendar-calendar', Container).offset().top+$('.DOPBCPCalendar-calendar', Container).height()-$(window).height()+10);
                    });

                    /*
                     * Remove button event.
                     */
                    $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).unbind('click touchstart');
                    $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).bind('click touchstart', function(){
                        methods_months.vars.no--;
                        methods_calendar.init(methods_calendar.vars.startYear, 
                                              methods_calendar.vars.currMonth);

                        if (methods_months.vars.no < methods_months.vars.maxAllowed){
                            $('.DOPBCPCalendar-navigation .dopbcp-add-btn', Container).css('display', 'block');
                            $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).removeClass('dopbcp-no-add');
                        }
                        
                        if(methods_months.vars.no === 1){
                            $('.DOPBCPCalendar-navigation .dopbcp-remove-btn', Container).css('display', 'none');
                        }
                        
                        prototypes.scrollToY($('.DOPBCPCalendar-calendar', Container).offset().top+$('.DOPBCPCalendar-calendar', Container).height()-$(window).height()+10);
                    });
                }
            }
        },
                  
// 9. Months
        
        methods_months = {
            data: {},
            text: {},
            vars: {maxAllowed: 6,
                   no: 1},
            
            init:function(){
            /*
             * Initialize months data.
             */
                methods_months.vars.no = methods_months.data['no'];
            }
        },
                
        methods_month = {
            display:function(year,
                             month,
                             position){
            /*
             * Display month.
             * 
             * @param year (Number): the year that has the month to be initialized
             * @param month (Number): month to be initialized
             * @param position (Number): month's position in display order
             * 
             * @return months HTML
             */    
                var cmonth, 
                cday, 
                cyear,
                d, 
                day = methods_day.default(),
                HTML = new Array(), 
                i, 
                prevDay,
                noDays = new Date(year, month, 0).getDate(),
                noDaysPrevMonth = new Date(year, month-1, 0).getDate(),
                firstDay = new Date(year, month-1, 2-methods_days.data['first']).getDay(),
                lastDay = new Date(year, month-1, noDays-methods_days.data['first']+1).getDay(),
                schedule = methods_schedule.vars.schedule,
                totalDays = 0;
       
                if (position > 1){
                    HTML.push('<div class="DOPBCPCalendar-month-year">'+methods_months.text['names'][(month%12 !== 0 ? month%12:12)-1]+' '+year+'</div>');
                }
                HTML.push('<div class="DOPBCPCalendar-month" id="DOPBCPCalendar-month-'+ID+'-'+position+'">');

                /*
                 * Display previous month days.
                 */
                for (i=(firstDay === 0 ? 7:firstDay)-1; i>=1; i--){
                    totalDays++;

                    d = new Date(year, month-2, noDaysPrevMonth-i+1);
                    cyear = d.getFullYear();
                    cmonth = prototypes.getLeadingZero(d.getMonth()+1);
                    cday = prototypes.getLeadingZero(d.getDate());
                    day = schedule[cyear+'-'+cmonth+'-'+cday] !== undefined ? schedule[cyear+'-'+cmonth+'-'+cday]:methods_day.default(prototypes.getWeekDay(cyear+'-'+cmonth+'-'+cday));

                    prevDay = prototypes.getPrevDay(cyear+'-'+cmonth+'-'+cday);
                    methods_day.vars.previousStatus = methods_day.vars.previousStatus === '' ? (schedule[prevDay] !== undefined ? schedule[prevDay]['status']:'none'):methods_day.vars.previousStatus;
                    methods_day.vars.previousBind = methods_day.vars.previousBind === 0 ? (schedule[prevDay] !== undefined ? schedule[prevDay]['group']:0):methods_day.vars.previousBind;

                    if (methods_calendar.vars.startMonth === month 
                            && methods_calendar.vars.startYear === year){
                        HTML.push(methods_day.display('dopbcp-past-day', 
                                                      ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                      d.getDate(), 
                                                      '', 
                                                      '', 
                                                      '', 
                                                      '', 
                                                      '', 
                                                      '', 
                                                      '', 
                                                      'none'));            
                    }
                    else{
                        HTML.push(methods_day.display('dopbcp-last-month'+(position > 1 ?  ' dopbcp-mask':''), 
                                                      position > 1 ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_last':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                      d.getDate(), 
                                                      day['available'], 
                                                      day['bind'], 
                                                      day['info'], 
                                                      day['info_body'],
                                                      day['info_info'],
                                                      day['price'], 
                                                      day['promo'], 
                                                      day['status']));
                    }
                }

                /*
                 * Display current month days.
                 */
                for (i=1; i<=noDays; i++){
                    totalDays++;

                    d = new Date(year, month-1, i);
                    cyear = d.getFullYear();
                    cmonth = prototypes.getLeadingZero(d.getMonth()+1);
                    cday = prototypes.getLeadingZero(d.getDate());
                    day = schedule[cyear+'-'+cmonth+'-'+cday] !== undefined ? schedule[cyear+'-'+cmonth+'-'+cday]:methods_day.default(prototypes.getWeekDay(cyear+'-'+cmonth+'-'+cday));

                    if (methods_calendar.vars.startMonth === month 
                            && methods_calendar.vars.startYear === year
                            && methods_calendar.vars.startDay > d.getDate()){
                        HTML.push(methods_day.display('dopbcp-past-day', 
                                                      ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                      d.getDate(), 
                                                      '',
                                                      '', 
                                                      '',
                                                      '',
                                                      '', 
                                                      '', 
                                                      '', 
                                                      'none'));    
                    }
                    else{
                        HTML.push(methods_day.display('dopbcp-curr-month', 
                                                      ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                      d.getDate(), 
                                                      day['available'], 
                                                      day['bind'], 
                                                      day['info'],
                                                      day['info_body'],
                                                      day['info_info'], 
                                                      day['price'], 
                                                      day['promo'], 
                                                      day['status']));
                    }
                }

                /*
                 * Display next month days.
                 */
                for (i=1; i<=(totalDays+7 < 42 ? 14:7)-lastDay; i++){
                    d = new Date(year, month, i);
                    cyear = d.getFullYear();
                    cmonth = prototypes.getLeadingZero(d.getMonth()+1);
                    cday = prototypes.getLeadingZero(d.getDate());
                    day = schedule[cyear+'-'+cmonth+'-'+cday] !== undefined ? schedule[cyear+'-'+cmonth+'-'+cday]:methods_day.default(prototypes.getWeekDay(cyear+'-'+cmonth+'-'+cday));

                    HTML.push(methods_day.display('dopbcp-next-month'+(position < methods_months.vars.no ?  ' dopbcp-hide':''), 
                                                  position < methods_months.vars.no ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_next':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                  d.getDate(), 
                                                  day['available'], 
                                                  day['bind'], 
                                                  day['info'], 
                                                  day['info_body'],
                                                  day['info_info'], 
                                                  day['price'], 
                                                  day['promo'], 
                                                  day['status']));
                }
                HTML.push('</div>');
                
                $('.DOPBCPCalendar-calendar', Container).append(HTML.join(''));
            }
        },
 
// 10. Days
        
        methods_days = {
            data: {},
            text: {},
            vars: {selectionEnd: '',
                   selectionInit: false,
                   selectionStart: '',
                   no: 0},
            
            displaySelection:function(id){
            /*
             * Display selected days "selection".
             * 
             * @param id (String): current day ID (ID_YYYY-MM-DD) 
             */
                var $day,
                day,
                $nextDay = undefined, 
                $prevDay = undefined;
                
                id = id === undefined ? methods_days.vars.selectionEnd:id;
                methods_days.clearSelection();
                
                if (methods_days.vars.selectionStart !== ''){
                    if (id < methods_days.vars.selectionStart){
                        $($('.DOPBCPCalendar-day', Container).get().reverse()).each(function(){
                            if ($(this).attr('id').split('_').length === 2){
                                $day = $(this);
                                day = this;

                                /*
                                 * Add selection if day is available.
                                 */
                                if ($day.attr('id') <= methods_days.vars.selectionStart
                                        && $day.attr('id') >= id
                                        && !$day.hasClass('dopbcp-mask') 
                                        && !$day.hasClass('dopbcp-past-day')){
                                    $day.addClass('dopbcp-selected');

                                    /*
                                     * Add selection if morning checkout option is enabled.
                                     */
                                    if (methods_days.data['morningCheckOut']){
                                        if ($day.attr('id') === methods_days.vars.selectionStart){
                                            $day.addClass('dopbcp-last');
                                        }

                                        if ($day.attr('id') !== methods_days.vars.selectionStart){
                                            $day.addClass('dopbcp-first');

                                            if ($nextDay !== undefined){
                                                $nextDay.removeClass('dopbcp-first');
                                            }
                                            $nextDay = $day;
                                        }
                                    }
                                }
                            }
                        });
                    }
                    else{
                        $('.DOPBCPCalendar-day', Container).each(function(){
                            if ($(this).attr('id').split('_').length === 2){
                                $day = $(this);  
                                day = this;

                                /*
                                 * Add selection if day is available.
                                 */
                                if ($day.attr('id') >= methods_days.vars.selectionStart
                                        && $day.attr('id') <= id
                                        && !$day.hasClass('dopbcp-mask') 
                                        && !$day.hasClass('dopbcp-past-day')){
                                    $day.addClass('dopbcp-selected');

                                    /*
                                     * Add selection if morning checkout option is enabled.
                                     */
                                    if (methods_days.data['morningCheckOut']){
                                        if ($day.attr('id') === methods_days.vars.selectionStart){
                                            $day.addClass('dopbcp-first');
                                        }
                                                
                                        if ($day.attr('id') !== methods_days.vars.selectionStart){
                                            $day.addClass('dopbcp-last');
                                            
                                            if (methods_days.vars.selectionEnd !== ''
                                                    && $day.attr('id') < methods_days.vars.selectionEnd){
                                                $day.removeClass('dopbcp-last');
                                            }

                                            if ($prevDay !== undefined){
                                                $prevDay.removeClass('dopbcp-last');
                                            }
                                            $prevDay = $day;
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            },
            
            clearSelection:function(){
            /*
             * Clear days "selection".
             * 
             */    
                $('.DOPBCPCalendar-day', Container).removeClass('dopbcp-selected')
                                                   .removeClass('dopbcp-first')
                                                   .removeClass('dopbcp-last'); 
            },
            
            getSelected:function(ciDay,
                                 coDay){
            /*
             * Get the list between 2 dates, included.
             * 
             * @param ciDay (String): check in day (YYYY-MM-DD)
             * @param coDay (String): check out day (YYYY-MM-DD)
             * 
             * @return array with selected days
             */
                var selectedDays = new Array(),
                y, 
                d, 
                m,
                ciy, 
                cim, 
                cid,
                coy, 
                com, 
                cod,
                firstMonth, 
                lastMonth, 
                firstDay, 
                lastDay,
                currYear, 
                currMonth, 
                currDay;

                /*
                 * Verify days.
                 */
                coDay = coDay === '' ? ciDay:coDay;

                ciy = parseInt(ciDay.split('-')[0], 10);
                cim = parseInt(ciDay.split('-')[1], 10);
                cid = parseInt(ciDay.split('-')[2], 10);
                coy = parseInt(coDay.split('-')[0], 10);
                com = parseInt(coDay.split('-')[1], 10);
                cod = parseInt(coDay.split('-')[2], 10);

                /*
                 * Generate all days between the dates.
                 */
                for (y=ciy; y<=coy; y++){
                    firstMonth = y === ciy ? cim:1;
                    lastMonth = y === coy ? com:12;

                    for (m=firstMonth; m<=lastMonth; m++){
                        firstDay = y === ciy && m === cim ? cid:1;
                        lastDay = y === coy && m === com ? cod:new Date(y,m,0).getDate();

                        for (d=firstDay; d<=lastDay; d++){
                            currYear = String(y);
                            currMonth = prototypes.getLeadingZero(m);
                            currDay = prototypes.getLeadingZero(d);

                            selectedDays.push(currYear+'-'+currMonth+'-'+currDay);
                        }
                    }
                }

                return selectedDays;
            },
            getAvailability:function(ciDay,
                                     coDay){
            /*
             * Get availability between 2 dates, included.
             * 
             * @param ciDay (String): check in day (YYYY-MM-DD)
             * @param coDay (String): check out day (YYYY-MM-DD)
             * 
             * @return true/false
             */
                var currDay,
                dayFound,
                i,
                maxNoDays,
                minNoDays,
                noDays,
                schedule = methods_schedule.vars.schedule,
                selectedDays = new Array();

                /*
                 * Verify days.
                 */
                coDay = coDay === '' ? ciDay:coDay;
                
                if (methods_search.days.validate(ciDay) 
                        && methods_search.days.validate(coDay) 
                        && schedule !== {}){
                    /*
                     * Check if minimum/maximum number of days has been selected.
                     */
                    noDays = prototypes.getNoDays(ciDay, coDay)-(methods_days.data['morningCheckOut'] ? 1:0);
                    
                    if (noDays < minNoDays){
                        methods_reservation.toggleMessages(methods_reservation.text['selectDays'], '');
                        return false;
                    }
                    
                    if (maxNoDays !== 0
                            && noDays > maxNoDays){
                        methods_reservation.toggleMessages(methods_reservation.text['selectDays'], '');
                        return false;
                    }
                    
                    /*
                     * Get selected days.
                     */
                    selectedDays = methods_days.getSelected(ciDay,
                                                            coDay);
                    /*
                     * Check if selected days are available.
                     */
                    if (schedule[selectedDays[0]] === undefined 
                            || schedule[selectedDays[noDays-1]] === undefined){
                        methods_info.toggleMessages(methods_search.text['noServices']);
                        methods_reservation.toggleMessages(methods_reservation.text['selectDays'], '');
                        return false;
                    }
                    
                    if (schedule[selectedDays[0]]['bind'] === 2 
                            || schedule[selectedDays[0]]['bind'] === 3
                            || schedule[selectedDays[noDays-1]]['bind'] === 1 
                            || schedule[selectedDays[noDays-1]]['bind'] === 2){
                        methods_info.toggleMessages(methods_search.text['noServicesSplitGroup']);
                        methods_reservation.toggleMessages(methods_reservation.text['selectDays'], '');
                        return false;
                    }
                    
                    /*
                     * Check if selected days are available.
                     */
                    for (i=0; i<selectedDays.length-(methods_days.data['morningCheckOut'] ? 1:0); i++){
                        dayFound = false;
                        currDay = selectedDays[i];

                        if (schedule[currDay] !== undefined 
                                && (schedule[currDay]['status'] === 'available' 
                                        || schedule[currDay]['status'] === 'special')){
                            dayFound = true;
                        }

                        if (!dayFound){
                            methods_info.toggleMessages(methods_search.text['noServices']);
                            methods_reservation.toggleMessages(methods_reservation.text['selectDays'], '');
                            return false;
                        }
                    }
                    return true;
                }
                else{
                    if (!methods_search.days.validate(ciDay) 
                            || !methods_search.days.validate(coDay)){
                        methods_reservation.toggleMessages(methods_reservation.text['selectDays'], '');
                        return false;
                    }
                    else{
                        methods_info.toggleMessages(methods_search.text['noServices']);
                        methods_reservation.toggleMessages(methods_reservation.text['selectDays'], '');
                        return false;
                    }
                }
            },
            getNoAvailable:function(){
            /*
             * Get maximum number of available items for currently selected days.
             * 
             * @return number of available items
             */
                var ciDay,
                coDay,
                currDay,
                i,
                noAvailable = 1000000,
                schedule = methods_schedule.vars.schedule,
                selectedDays = new Array();

                /*
                 * Get days.
                 */
                if (methods_days.data['multipleSelect']){
                    ciDay = $('#DOPBCPCalendar-check-in'+ID).val();
                    coDay = $('#DOPBCPCalendar-check-out'+ID).val();
                }
                else{                            
                    ciDay = $('#DOPBCPCalendar-check-in'+ID).val();
                    coDay = $('#DOPBCPCalendar-check-in'+ID).val();
                }

                if (methods_search.days.validate(ciDay) 
                        && methods_search.days.validate(coDay) 
                        && schedule !== {}){
                    /*
                     * Get selected days.
                     */
                    selectedDays = methods_days.getSelected(ciDay,
                                                            coDay);
                    
                    for (i=0; i<selectedDays.length-(methods_days.data['morningCheckOut'] ? 1:0); i++){
                        currDay = selectedDays[i];

                        if (schedule[currDay] === undefined || 
                                schedule[currDay]['available'] === ''){
                            noAvailable = 1;
                        }
                        else if (noAvailable > schedule[currDay]['available']){
                            noAvailable = schedule[currDay]['available'];
                        }
                    }
                }
                
                return noAvailable === 0 || noAvailable === 1000000 ? 1:noAvailable;
            },
            getPrice:function(ciDay,
                              coDay){
            /*
             * Get the price between 2 dates, included.
             * 
             * @param ciDay (String): check in day (YYYY-MM-DD)
             * @param coDay (String): check out day (YYYY-MM-DD)
             * 
             * @return price value
             */
                var currDay,
                i,
                price,
                promo,
                schedule = methods_schedule.vars.schedule,
                selectedDays = new Array(),
                totalPrice = 0;
        
                /*
                 * Verify days.
                 */
                coDay = coDay === '' ? ciDay:coDay;

                /*
                 * Get selected days.
                 */
                selectedDays = methods_days.getSelected(ciDay,
                                                        coDay);

                for (i=0; i<selectedDays.length-(methods_days.data['morningCheckOut'] ? 1:0); i++){
                    currDay = selectedDays[i];

                    if (schedule[currDay] !== undefined 
                            && (schedule[currDay]['status'] === 'available' 
                                    || schedule[currDay]['status'] === 'special') 
                            && (schedule[currDay]['bind'] === 0
                                    || schedule[currDay]['bind'] === 1)){
                        
                        price = parseFloat(schedule[currDay]['price']);
                        promo = parseFloat(schedule[currDay]['promo']);

                        if (price !== 0 && !isNaN(price)){
                            
                            totalPrice += promo === 0 || isNaN(promo) ? price:promo;
                        }
                    }
                }
                
                return totalPrice;
            },
            getHistory:function(ciDay,
                                coDay){
            /*
             * Get the history (current schedule) between 2 dates, included.
             * 
             * @param ciDay (String): check in day (YYYY-MM-DD)
             * @param coDay (String): check out day (YYYY-MM-DD)
             * 
             * @return curent schedule
             */
                var currDay,
                history = {},
                i, 
                selectedDays = new Array(),
                schedule = methods_schedule.vars.schedule;

                /*
                 * Verify days.
                 */
                coDay = coDay === '' ? ciDay:coDay;

                /*
                 * Get selected days.
                 */
                selectedDays = methods_days.getSelected(ciDay,
                                                        coDay);

                for (i=0; i<selectedDays.length-(methods_days.data['morningCheckOut'] ? 1:0); i++){
                    currDay = selectedDays[i];

                    history[currDay] = {"available": "",
                                        "bind": 0,
                                        "price": 0,
                                        "promo": 0,
                                        "status": ""};
                    history[currDay]['available'] = schedule[currDay]['available'];
                    history[currDay]['bind'] = schedule[currDay]['bind'];
                    history[currDay]['price'] = schedule[currDay]['price'];
                    history[currDay]['promo'] = schedule[currDay]['promo'];
                    history[currDay]['status'] = schedule[currDay]['status'];
                }
                
                return history;
            }
        },
                
        methods_day = {
            vars: {previousBind: 0,
                   previousStatus: ''},
    
            display:function(type,
                             id,
                             day,
                             available,
                             bind,
                             info,
                             infoBody,
                             infoInfo,
                             price,
                             promo,
                             status){
            /*
             * Display day.
             * 
             * @param type (String): day type (past-day, last-month, curr-month, next-month)
             * @param id (String): day ID (ID_YYYY-MM-DD)
             * @param day (String): current day
             * @param available (Number): number of available items for current day
             * @param bind (Number): day bind status
             *                       "0" none
             *                       "1" binded at the start of a group
             *                       "2" binded in a group group
             *                       "3" binded at the end of a group
             * @param info (String): day info
             * @param infoBody (String): day body info
             * @param infoInfo (String): day tooltip info
             * @param price (Number): day price
             * @param promo (Number): day promotional price
             * @param status (String): day status (available, booked, special, unavailable)
             * 
             * @retun day HTML
             */
                var dayHTML = Array(),
                contentLine1 = '&nbsp;', 
                contentLine2 = '&nbsp;';

                price = parseFloat(price);
                promo = parseFloat(promo);
                methods_days.vars.no++;
                
                if (price > 0 
                        && (bind === 0 
                                || bind === 1)){
                    contentLine1 = methods_price.set(price);
                    
                }

                if (promo > 0 
                        && (bind === 0 
                                || bind === 1)){
                    contentLine1 = methods_price.set(promo);;
                }

                if (type !== 'dopbcp-past-day'){
                    switch (status){
                        case 'available':
                            type += ' dopbcp-available';

                            if (bind === 0 
                                    || bind === 1){
                                if (available > 1){
                                    contentLine2 = available+' '+'<span class="dopbcp-no-available-text">'+methods_calendar.text['availableMultiple']+'</span>';
                                }
                                else if (available === 1){
                                    contentLine2 = available+' '+'<span class="dopbcp-no-available-text">'+methods_calendar.text['available']+'</span>';
                                }
                                else{
                                    contentLine2 = '<span class="dopbcp-text">'+methods_calendar.text['available']+'</span>';
                                }
                            }
                            break;
                        case 'booked':
                            type += ' dopbcp-booked';
                            contentLine2 = '<span class="dopbcp-no-available-text">'+methods_calendar.text['booked']+'</span>';                                    
                            break;
                        case 'special':
                            type += ' dopbcp-special';

                            if (bind === 0 
                                    || bind === 1){
                                if (available > 1){
                                    contentLine2 = available+' '+'<span class="dopbcp-no-available-text">'+methods_calendar.text['availableMultiple']+'</span>';
                                }
                                else if (available === 1){
                                    contentLine2 = available+' '+'<span class="dopbcp-no-available-text">'+methods_calendar.text['available']+'</span>';
                                }
                                else{
                                    contentLine2 = '<span class="dopbcp-text">'+methods_calendar.text['available']+'</span>';
                                }
                            }
                            break;
                        case 'unavailable':
                            type += ' dopbcp-unavailable';
                            contentLine2 = '<span class="dopbcp-no-available-text">'+methods_calendar.text['unavailable']+'</span>';
                            break;
                    }
                    
                    /*
                     * Add pointer cursor.
                     */
                    if (type.indexOf('mask') !== -1){
                    /*
                     * No pointer cursor.
                     */
                        type += ' dopbcp-no-cursor-pointer';
                    }
                    else{
                        if ((!methods_days.data['morningCheckOut']
                                        && (status === 'available'
                                                || status === 'special'))){
                            type += ' dopbcp-cursor-pointer';
                        }
                    }
                }

                if (methods_days.vars.no % 7 === 1){
                    type += ' dopbcp-first-column';
                }

                if (methods_days.vars.no % 7 === 0){
                    type += ' dopbcp-last-column';
                }

                dayHTML.push('<div class="DOPBCPCalendar-day '+type+'" id="'+id+'">');
                dayHTML.push('  <div class="dopbcp-bind-left'+((bind === 2 || bind === 3) && (status === 'available' || status === 'special') ? ' dopbcp-enabled':'')+(methods_day.vars.previousBind === 3 && methods_days.data['morningCheckOut'] && (methods_day.vars.previousStatus === 'available' || methods_day.vars.previousStatus === 'special') ? ' dopbcp-extended dopbcp-'+methods_day.vars.previousStatus:'')+'">');
                dayHTML.push('      <div class="dopbcp-head">&nbsp;</div>');
                dayHTML.push('      <div class="dopbcp-body">&nbsp;</div>');
                dayHTML.push('  </div>');                        
                dayHTML.push('  <div class="dopbcp-bind-middle dopbcp-group'+((status === 'available' || status === 'special') ? bind:'0')+(bind === 3 && methods_days.data['morningCheckOut'] && (status === 'available' || status === 'special') ? ' dopbcp-extended':'')+(methods_day.vars.previousBind === 3 && methods_days.data['morningCheckOut'] && (methods_day.vars.previousStatus === 'available' || methods_day.vars.previousStatus === 'special') ? ' dopbcp-extended':'')+'">');
                dayHTML.push('      <div class="dopbcp-head">');
                dayHTML.push('          <div class="dopbcp-co dopbcp-'+(methods_days.data['morningCheckOut'] ? methods_day.vars.previousStatus:status)+'"></div>');
                dayHTML.push('          <div class="dopbcp-ci dopbcp-'+status+'"></div>');
                dayHTML.push('          <div class="dopbcp-day">'+day+'</div>');

                if ((info !== ''
                                || (infoInfo !== undefined
                                            && infoInfo.length > 0))
                        && type.indexOf('past-day') === -1){
                    switch (status){
                        case 'available':
                            if (bind === 0 
                                    || bind === 3){
                                dayHTML.push('          <div class="dopbcp-info" id="'+id+'_info"></div>');
                            }
                            break;
                        case 'booked':
                            dayHTML.push('          <div class="dopbcp-info" id="'+id+'_info"></div>');                                   
                            break;
                        case 'special':
                            if (bind === 0 
                                    || bind === 3){
                                dayHTML.push('          <div class="dopbcp-info" id="'+id+'_info"></div>');
                            }
                            break;
                        case 'unavailable':
                            dayHTML.push('          <div class="dopbcp-info" id="'+id+'_info"></div>');
                            break;
                        default:
                            dayHTML.push('          <div class="dopbcp-info" id="'+id+'_info"></div>');
                    }
                }
                dayHTML.push('      </div>');
                dayHTML.push('      <div class="dopbcp-body">');
                dayHTML.push('          <div class="dopbcp-co dopbcp-'+(methods_days.data['morningCheckOut'] ? methods_day.vars.previousStatus:status)+'"></div>');
                dayHTML.push('          <div class="dopbcp-ci dopbcp-'+status+'"></div>');
                dayHTML.push('          <div class="dopbcp-price">'+contentLine1+'</div>');

                if (promo > 0 
                        && (bind === 0 
                                || bind === 1)){
                    dayHTML.push('          <div class="dopbcp-old-price">'+methods_price.set(price)+'</div>');
                }
                dayHTML.push('          <br class="DOPBCPCalendar-clear" />');
                dayHTML.push('          <div class="dopbcp-available">'+contentLine2+'</div>');
                
                if ((infoBody !== undefined
                                && infoBody.length > 0)
                        && type.indexOf('past-day') === -1){
                    dayHTML.push('          <div class="dopbcp-info-body" id="'+id+'_info-body">');
                    dayHTML.push('              <div class="dopbcp-info-body-mask">&#8594;</div>');
                    dayHTML.push(methods_form.getInfo(infoBody));
                    dayHTML.push('          </div>');
                }
                
                dayHTML.push('      </div>');  
                dayHTML.push('  </div>');
                dayHTML.push('  <div class="dopbcp-bind-right'+((bind === 1 || bind === 2) && (status === 'available' || status === 'special') ? ' dopbcp-enabled':'')+(bind === 3 && methods_days.data['morningCheckOut'] && (status === 'available' || status === 'special') ? ' dopbcp-extended':'')+'">');
                dayHTML.push('      <div class="dopbcp-head">&nbsp;</div>');
                dayHTML.push('      <div class="dopbcp-body">&nbsp;</div>');
                dayHTML.push('  </div>');
                dayHTML.push('</div>');

                if (type !== 'dopbcp-past-day'){
                    methods_day.vars.previousStatus = status;
                    methods_day.vars.previousBind = bind;
                }
                else{
                    methods_day.vars.previousStatus = 'none';
                    methods_day.vars.previousBind = 0;
                }
                
                return dayHTML.join('');
            },                    
            default:function(day){
            /*
             * Day default data.
             * 
             * @param day (Date): this day
             * 
             * @return JSON with default data
             */    
                return {"available": "",
                        "bind": 0,
                        "info": "",
                        "info_body": "",
                        "info_info": "",
                        "notes": "",
                        "price": 0, 
                        "promo": 0,
                        "status": methods_days.data['available'][day] ? "none":"unavailable"};
            },
            rp:function(){
            /*
             *  Resize & position calendar day. Used for responsive feature.
             */  
                var $day = $('.DOPBCPCalendar-day', Container),
                $dayBody = $('.DOPBCPCalendar-day .dopbcp-body', Container),
                $month = $('#DOPBCPCalendar-month-'+ID+'-1'),        
                dayWidth = 0,
                maxHeight = 0,
                hiddenBustedItems = prototypes.doHiddenBuster($(Container));
        
                dayWidth = parseInt(($month.width()-parseInt($month.css('padding-left'))+parseInt($month.css('padding-right')))/7);
        
                $dayBody.removeAttr('style');
                $day.width(dayWidth);
                $day.find($('.dopbcp-bind-middle')).width(dayWidth-2);

                /*
                 * If day width smaller than 70px available, booked, unavailable text is hidden.
                 */
                if (dayWidth <= 70){
                    $day.find($('.dopbcp-no-available-text')).css('display', 'none');
                }
                else{
                    $day.find($('.dopbcp-no-available-text')).css('display', 'inline');
                }

                /*
                 * If day width smaller than 40px only day header with day number is visible.
                 */
                if (dayWidth <= 40){
                    $day.addClass('dopbcp-style-small');
                }
                else{
                    $day.removeClass('dopbcp-style-small');

                    /*
                     * Set days height to the biggest height found.
                     */
                    $('.DOPBCPCalendar-day .dopbcp-bind-middle .dopbcp-body', Container).each(function(){
                        if (maxHeight < $(this).height()){
                            maxHeight = $(this).height();
                        }
                    });

                    $dayBody.height(maxHeight);
                }

                prototypes.undoHiddenBuster(hiddenBustedItems);
            },  
            
            getInfo:function(info){
                var info = new Array(),
                i;
                
                for (i=0; i<info.length; i++){
                    info.push(info[i]);
                }
                
                return info.join('<br />');
            },
            
            events: {
                init:function(){
                /*
                 * Initialize days events.
                 */
                    if (!methods_calendar.data['view']){

                        if (methods_days.data['multipleSelect']){
                            methods_day.events.selectMultiple();
                        }
                        else{
                            methods_day.events.selectSingle();
                        }
                    }
                    else{
                        $('.DOPBCPCalendar-day .dopbcp-co', Container).css('cursor', 'default');
                        $('.DOPBCPCalendar-day .dopbcp-ci', Container).css('cursor', 'default');
                    }

                    if (!prototypes.isTouchDevice()){
                        if (!methods_calendar.data['view']){
                            /*
                             * Days hover events, not available for devices with touchscreen.
                             */
                            $('.DOPBCPCalendar-day', Container).hover(function(){
                                var day = $(this);

                                if (methods_days.vars.selectionInit){
                                    methods_days.displaySelection(day.attr('id'));
                                }
                            }, function(){
                                methods_tooltip.clear();
                            });
                        }

                        /*
                         * Info icon events.
                         */
                        $('.DOPBCPCalendar-day .dopbcp-info', Container).hover(function(){
                            methods_tooltip.set($(this).attr('id').split('_')[1], 
                                                '', 
                                                'info');
                        }, function(){
                            methods_tooltip.clear();
                        });
                        
                        /*
                         * Body info events.
                         */
                        $('.DOPBCPCalendar-day .dopbcp-info-body', Container).hover(function(){
                            methods_tooltip.set($(this).attr('id').split('_')[1], 
                                                '', 
                                                'info-body');
                        }, function(){
                            methods_tooltip.clear();
                        });
                    }
                    else{
                        var xPos = 0, 
                        yPos = 0, 
                        touch;

                        /*
                         * Info icon events on devices with touchscreen.
                         */
                        $('.DOPBCPCalendar-day .dopbcp-info', Container).unbind('touchstart');
                        $('.DOPBCPCalendar-day .dopbcp-info', Container).bind('touchstart', function(e){
                            e.preventDefault();
                            touch = e.originalEvent.touches[0];
                            xPos = touch.clientX+$(document).scrollLeft();
                            yPos = touch.clientY+$(document).scrollTop();
                            $('#DOPBCPCalendar-tooltip'+ID).css({'left': xPos,
                                                                 'top': yPos});
                            methods_tooltip.set($(this).attr('id').split('_')[1], 
                                                '', 
                                                'info');
                        });

                        /*
                         * Body info events on devices with touchscreen.
                         */
                        $('.DOPBCPCalendar-day .dopbcp-info-body', Container).unbind('touchstart');
                        $('.DOPBCPCalendar-day .dopbcp-info-body', Container).bind('touchstart', function(e){
                            e.preventDefault();
                            touch = e.originalEvent.touches[0];
                            xPos = touch.clientX+$(document).scrollLeft();
                            yPos = touch.clientY+$(document).scrollTop();
                            $('#DOPBCPCalendar-tooltip'+ID).css({'left': xPos,
                                                                 'top': yPos});
                            methods_tooltip.set($(this).attr('id').split('_')[1], 
                                                '', 
                                                'info-body');
                        });
                    }
                },
                selectMultiple:function(){
                /*
                 * Select multipe days events.
                 */    
                    /*
                     * Days click event.
                     */
                    $('.DOPBCPCalendar-day', Container).unbind('click touchstart');
                    $('.DOPBCPCalendar-day', Container).bind('click touchstart', function(){
                        var auxDate,
                        $day = $(this),
                        eDate, 
                        eDay,
                        eMonth, 
                        eYear, 
                        minDateValue = 0,
                        sDate, 
                        sDay,
                        sMonth, 
                        sYear;

                        /*
                         * Add a small delay of 10 miliseconds for hover selection to display properly.
                         */
                        setTimeout(function(){
                            if (!$day.hasClass('dopbcp-mask') 
                                    && !$day.hasClass('dopbcp-past-day')){
                                if (!methods_days.vars.selectionInit){
                                /*
                                 * Select first day.
                                 */                                                       
                                    methods_days.vars.selectionInit = true;
                                    methods_days.vars.selectionStart = $day.attr('id');
                                    methods_days.vars.selectionEnd = '';

                                    /*
                                     * reinitialize datepickers.
                                     */
                                    sDate = methods_days.vars.selectionStart.split('_')[1];
                                    sYear = sDate.split('-')[0];
                                    sMonth = parseInt(sDate.split('-')[1], 10)-1;
                                    sDay = sDate.split('-')[2];
                                    minDateValue = prototypes.getNoDays(prototypes.getToday(), sDate)-(methods_days.data['morningCheckOut'] ? 0:1);

                                    $('#DOPBCPCalendar-check-in'+ID).val(sDate);
                                    $('#DOPBCPCalendar-check-in-view'+ID).val(methods_calendar.data['dateType'] === 1 ? 
                                                                              methods_months.text['names'][sMonth]+' '+sDay+', '+sYear:
                                                                              sDay+' '+methods_months.text['names'][sMonth]+' '+sYear);
                                    $('#DOPBCPCalendar-check-out'+ID).val('');
                                    $('#DOPBCPCalendar-check-out-view'+ID).val(methods_search.text['checkOut'])
                                                                          .removeAttr('disabled');;

                                    methods_search.days.initDatepicker('#DOPBCPCalendar-check-out-view'+ID,
                                                                       '#DOPBCPCalendar-check-out'+ID,
                                                                       minDateValue);

                                    methods_days.displaySelection(methods_days.vars.selectionStart);
                                }
                                else if (!methods_days.data['morningCheckOut'] 
                                            || (methods_days.data['morningCheckOut'] 
                                                        && methods_days.vars.selectionStart !== $day.attr('id'))){
                                /*
                                 * Select second day.
                                 */
                                    methods_days.vars.selectionInit = false;
                                    methods_days.vars.selectionEnd = $day.attr('id');
                                    $('#DOPBCPCalendar-check-out-view'+ID).removeAttr('disabled');

                                    if (methods_days.vars.selectionStart > methods_days.vars.selectionEnd){
                                        auxDate = methods_days.vars.selectionStart;
                                        methods_days.vars.selectionStart = methods_days.vars.selectionEnd;
                                        methods_days.vars.selectionEnd = auxDate;
                                    }

                                    /*
                                     * reinitialize datepickers.
                                     */
                                    sDate = methods_days.vars.selectionStart.split('_')[1];
                                    sYear = sDate.split('-')[0];
                                    sMonth = parseInt(sDate.split('-')[1], 10)-1;
                                    sDay = sDate.split('-')[2];
                                    eDate = methods_days.vars.selectionEnd.split('_')[1];
                                    eYear = eDate.split('-')[0];
                                    eMonth = parseInt(eDate.split('-')[1], 10)-1;
                                    eDay = eDate.split('-')[2];
                                    minDateValue = prototypes.getNoDays(prototypes.getToday(), sDate)-(methods_days.data['morningCheckOut'] ? 0:1);

                                    $('#DOPBCPCalendar-check-in'+ID).val(sDate);
                                    $('#DOPBCPCalendar-check-in-view'+ID).val(methods_calendar.data['dateType'] === 1 ? 
                                                                              methods_months.text['names'][sMonth]+' '+sDay+', '+sYear:
                                                                              sDay+' '+methods_months.text['names'][sMonth]+' '+sYear);
                                    $('#DOPBCPCalendar-check-out'+ID).val(eDate);
                                    $('#DOPBCPCalendar-check-out-view'+ID).val(methods_calendar.data['dateType'] === 1 ? 
                                                                               methods_months.text['names'][eMonth]+' '+eDay+', '+eYear:
                                                                               eDay+' '+methods_months.text['names'][eMonth]+' '+eYear);
                                    methods_search.days.initDatepicker('#DOPBCPCalendar-check-out-view'+ID,
                                                                       '#DOPBCPCalendar-check-out'+ID,
                                                                       minDateValue);
                                    methods_days.displaySelection(methods_days.vars.selectionEnd);
                                    methods_search.set();
                                }
                            }
                        }, 10);
                    });
                },
                selectSingle:function(){
                /*
                 * Select single day event.
                 */    
                    /*
                     * Days click event.
                     */
                    $('.DOPBCPCalendar-day', Container).unbind('click touchstart');
                    $('.DOPBCPCalendar-day', Container).bind('click touchstart', function(){
                        var day = $(this),
                        dayThis = this,
                        sDate, 
                        sDay,
                        sMonth, 
                        sYear;

                        /*
                         * Add a small delay of 10 miliseconds for hover selection to display properly.
                         */
                        setTimeout(function(){
                            /*
                             * Check if the day has availability set.
                             */
                            if ((day.hasClass('dopbcp-available') 
                                        || day.hasClass('dopbcp-special')) 
                                    && $('.dopbcp-bind-middle', dayThis).hasClass('dopbcp-group0')){
                            /*
                             * Select one day.
                             */    
                                methods_days.vars.selectionInit = false;
                                methods_days.vars.selectionStart = day.attr('id');
                                methods_days.vars.selectionEnd = day.attr('id');

                                sDate = methods_days.vars.selectionStart.split('_')[1];
                                sYear = sDate.split('-')[0];
                                sMonth = parseInt(sDate.split('-')[1], 10)-1;
                                sDay = sDate.split('-')[2];

                                $('#DOPBCPCalendar-check-in'+ID).val(sDate);
                                $('#DOPBCPCalendar-check-in-view'+ID).val(methods_calendar.data['dateType'] === 1 ? 
                                                                          methods_months.text['names'][sMonth]+' '+sDay+', '+sYear:
                                                                          sDay+' '+methods_months.text['names'][sMonth]+' '+sYear);

                                methods_days.displaySelection(methods_days.vars.selectionEnd);
                                methods_search.set();
                            }
                        }, 10);
                    });
                }
            }
        },
         
// ***************************************************************************** Sidebar       

// 12. Sidebar

        methods_sidebar = {
            data: {},
            text: {},
            
            display:function(){
            /*
             * Display sidebar.
             * 
             * @return sidebar HTML
             */    
                var HTML = new Array();
                
                HTML.push('<form name="DOPBCPCalendar-form'+ID+'" id="DOPBCPCalendar-form'+ID+'" action="" method="POST" onsubmit="return false;">');
                HTML.push(' <table class="dopbcp-sidebar-content">');
                HTML.push('     <colgroup>');
                HTML.push('         <col class="dopbcp-column1" />');
                HTML.push('         <col class="dopbcp-column-separator-style dopbcp-column2" />');
                HTML.push('         <col class="dopbcp-column3" />');
                HTML.push('     </colgroup>');
                HTML.push('     <tbody>');
                HTML.push('         <tr>');
                HTML.push('             <td class="dopbcp-column1">');
                
                HTML.push('                 <table class="dopbcp-sidebar-content">');
                HTML.push('                     <colgroup>');
                HTML.push('                         <col class="dopbcp-column4" />');
                HTML.push('                         <col class="dopbcp-column-separator-style dopbcp-column5" />');
                HTML.push('                         <col class="dopbcp-column6" />');
                HTML.push('                     </colgroup>');
                HTML.push('                     <tbody>');
                HTML.push('                         <tr>');
                HTML.push('                             <td id="DOPBCPCalendar-sidebar-column-wrapper-1-'+ID+'" class="dopbcp-column4">');
                HTML.push('                                 <div class="dopbcp-row1"></div>');
                HTML.push('                                 <div class="dopbcp-row2"></div>');
                HTML.push('                                 <div class="dopbcp-row3"></div>');
                HTML.push('                                 <div class="dopbcp-row4"></div>');
                HTML.push('                                 <div class="dopbcp-row5"></div>');
                HTML.push('                                 <div class="dopbcp-row6"></div>');
                HTML.push('                                 <div class="dopbcp-row7"></div>');
                HTML.push('                             </td>');
                HTML.push('                             <td class="dopbcp-column-separator dopbcp-column5"></td>');
                HTML.push('                             <td id="DOPBCPCalendar-sidebar-column-wrapper-2-'+ID+'" class="dopbcp-column6">');
                HTML.push('                                 <div class="dopbcp-row1"></div>');
                HTML.push('                                 <div class="dopbcp-row2"></div>');
                HTML.push('                                 <div class="dopbcp-row3"></div>');
                HTML.push('                                 <div class="dopbcp-row4"></div>');
                HTML.push('                                 <div class="dopbcp-row5"></div>');
                HTML.push('                                 <div class="dopbcp-row6"></div>');
                HTML.push('                                 <div class="dopbcp-row7"></div>');
                HTML.push('                             </td>');
                HTML.push('                         </tr>');
                HTML.push('                     </tbody>');
                HTML.push('                 </table>');
                
                HTML.push('             </td>');
                HTML.push('             <td class="dopbcp-column-separator dopbcp-column2"></td>');
                HTML.push('             <td class="dopbcp-column3">');
                
                HTML.push('                 <table class="dopbcp-sidebar-content level2">');
                HTML.push('                     <colgroup>');
                HTML.push('                         <col class="dopbcp-column7" />');
                HTML.push('                         <col class="dopbcp-column-separator-style dopbcp-column8" />');
                HTML.push('                         <col class="dopbcp-column9" />');
                HTML.push('                     </colgroup>');
                HTML.push('                     <tbody>');
                HTML.push('                         <tr>');
                HTML.push('                             <td id="DOPBCPCalendar-sidebar-column-wrapper-3-'+ID+'" class="dopbcp-column7">');
                HTML.push('                                 <div class="dopbcp-row1"></div>');
                HTML.push('                                 <div class="dopbcp-row2"></div>');
                HTML.push('                                 <div class="dopbcp-row3"></div>');
                HTML.push('                                 <div class="dopbcp-row4"></div>');
                HTML.push('                                 <div class="dopbcp-row5"></div>');
                HTML.push('                                 <div class="dopbcp-row6"></div>');
                HTML.push('                                 <div class="dopbcp-row7"></div>');
                HTML.push('                             </td>');
                HTML.push('                             <td class="dopbcp-column-separator dopbcp-column8"></td>');
                HTML.push('                             <td id="DOPBCPCalendar-sidebar-column-wrapper-4-'+ID+'" class="dopbcp-column9">');
                HTML.push('                                 <div class="dopbcp-row1"></div>');
                HTML.push('                                 <div class="dopbcp-row2"></div>');
                HTML.push('                                 <div class="dopbcp-row3"></div>');
                HTML.push('                                 <div class="dopbcp-row4"></div>');
                HTML.push('                                 <div class="dopbcp-row5"></div>');
                HTML.push('                                 <div class="dopbcp-row6"></div>');
                HTML.push('                                 <div class="dopbcp-row7"></div>');
                HTML.push('                             </td>');
                HTML.push('                         </tr>');
                HTML.push('                     </tbody>');
                HTML.push('                 </table>');
                
                HTML.push('             </td>');
                HTML.push('         </tr>');
                HTML.push('     <tbody>');
                HTML.push(' </table>');
                HTML.push('</form>');

                return HTML.join('');
            },
            init:function(){
            /*
             * Initialize sidebar.
             */    
                methods_search.init();
                
                if (methods_extras.data['id'] !== '0'){
                    methods_extras.init();
                }
            },
            
            getDateFormat:function(date){
            /*
             * Convert a date to calendar format.
             * 
             * @param date (String): date to be converted "YYYY-MM-DD"
             * 
             * @return date in set format
             */    
                var year = date.split('-')[0],
                month = date.split('-')[1],
                day = date.split('-')[2];
                
                return methods_calendar.data['dateType'] === 1 ? methods_months.text['names'][parseInt(month, 10)-1]+' '+day+', '+year:
                                                                 day+' '+methods_months.text['names'][parseInt(month, 10)-1]+' '+year;
            },
            
            rp:function(){
            /*
             *  Resize & position calendar sidebar. Used for responsive feature.
             */
                var hiddenBustedItems = prototypes.doHiddenBuster($(Container));

                $('.DOPBCPCalendar-sidebar', Container).removeClass('dopbcp-style1')
                                                       .removeClass('dopbcp-style2')
                                                       .removeClass('dopbcp-style3')
                                                       .removeClass('dopbcp-style4')
                                                       .removeClass('dopbcp-style5')
                                                       .removeClass('dopbcp-style1-medium')
                                                       .removeClass('dopbcp-style2-medium')
                                                       .removeClass('dopbcp-style3-medium')
                                                       .removeClass('dopbcp-style4-medium')
                                                       .removeClass('dopbcp-style5-medium')
                                                       .removeClass('dopbcp-style-small');
                
                if (Container.width() < 500){
                    $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style-small');
                }
                else{
                    switch (methods_sidebar.data['style']){
                        case 2:
                            if (Container.width() < 760){
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style2-medium');
                            }
                            else{
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style2');
                            }
                            break;
                        case 3:
                            if (Container.width() < 1020){
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style3-medium');
                            }
                            else{
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style3');
                            }
                            break;
                        case 4:
                            if (Container.width() < 660){
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style4-medium');
                            }
                            else{
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style4');
                            }
                            break;
                        case 5:
                            if (Container.width() < 800){
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style5-medium');
                            }
                            else{
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style5');
                            }
                            break;
                        default:                 
                            if (Container.width() < 900){
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style1-medium');
                            }
                            else{
                                $('.DOPBCPCalendar-sidebar', Container).addClass('dopbcp-style1');
                            }
                    }
                }

                prototypes.undoHiddenBuster(hiddenBustedItems);
            }
        },
                
// 13. Search
        
        methods_search = {
            data: {},
            text: {},
            
            display:function(){
            /*
             * Display sidebar search module.
             */    
                var HTML = new Array(),
                position = methods_sidebar.data['positions']['search'];
                
                HTML.push('     <div id="DOPBCPCalendar-search'+ID+'" class="dopbcp-module">');
                
                HTML.push(methods_search.days.display());

                HTML.push(methods_search.no_items.display());
                
                HTML.push('     </div>');
                
                $('#DOPBCPCalendar-sidebar-column-wrapper-'+position['column']+'-'+ID+' .dopbcp-row'+position['row']).html(HTML.join(''));
            },
            init:function(){
            /*
             * Initialize sidebar search module.
             */ 
                /*
                 * Initialize days.
                 */
                methods_search.days.init();
                
                /*
                 * Initialize number of booked items.
                 */
                if (methods_sidebar.data['noItems']){
                    methods_search.no_items.set();
                }
            },
            set:function(toSet){
            /*
             * Set sidebar search module.
             * 
             * @param toSet (String): what to set in search module
             *                        "noItems" number of items
             */    
                toSet = toSet === undefined ? 'hours':toSet;
                
                if (methods_sidebar.data['noItems']){
                    methods_search.no_items.set();
                }
                methods_reservation.set();
            },
            
            days: {
                display:function(){
                /*
                 * Display sidebar search days.
                 * 
                 * @return days search HTML
                 */
                    var HTML = new Array();

                    /*
                     * Check in.
                     */
                    HTML.push('         <div class="dopbcp-input-wrapper DOPBCPCalendar-left">');
                    HTML.push('             <input type="text" name="DOPBCPCalendar-check-in-view'+ID+'" id="DOPBCPCalendar-check-in-view'+ID+'" class="DOPBCPCalendar-check-in-view" value="'+methods_search.text['checkIn']+'" />');
                    HTML.push('             <input type="hidden" name="DOPBCPCalendar-check-in'+ID+'" id="DOPBCPCalendar-check-in'+ID+'" value="" />');
                    HTML.push('         </div>');

                    /*
                     * Check out.
                     */
                    if (methods_days.data['multipleSelect']){
                        HTML.push('     <div class="dopbcp-input-wrapper DOPBCPCalendar-left">');
                        HTML.push('         <input type="text" name="DOPBCPCalendar-check-out-view'+ID+'" id="DOPBCPCalendar-check-out-view'+ID+'" class="DOPBCPCalendar-check-out-view" value="'+methods_search.text['checkOut']+'" />');
                        HTML.push('         <input type="hidden" name="DOPBCPCalendar-check-out'+ID+'" id="DOPBCPCalendar-check-out'+ID+'" value="" />');
                        HTML.push('     </div>');
                    }
                    HTML.push('         <br class="DOPBCPCalendar-clear" />');

                    return HTML.join('');
                },
                init:function(){
                /*
                 * Initialize sidebar search days.
                 */ 
                    methods_search.days.events.init();
                },
                initDatepicker:function(id,
                                        altId,    
                                        minDate){
                /*
                 * Initialize sidebar search datepicker.
                 * 
                 * @param id (String): input(text) field ID
                 * @param aldId (String): alternative input(hidden) field ID
                 * @param minDate (Number): start date from today
                 */                            
                    minDate = minDate === undefined ? prototypes.getNoDays(methods_calendar.vars.startYear+'-'+prototypes.getLeadingZero(methods_calendar.vars.startMonth)+'-'+prototypes.getLeadingZero(methods_calendar.vars.startDay),
                                                                           methods_calendar.vars.todayYear+'-'+prototypes.getLeadingZero(methods_calendar.vars.todayMonth)+'-'+prototypes.getLeadingZero(methods_calendar.vars.todayDay))-1:minDate;           
                                                                           
                    $(id).datepicker('destroy');
                    $(id).datepicker({altField: altId,
                                      altFormat: 'yy-mm-dd',
                                      beforeShow: function(input, inst){
                                        $('#ui-datepicker-div').removeClass('DOPBCPCalendar-datepicker')
                                                               .addClass('DOPBCPCalendar-datepicker');
                                      },
                                      dateFormat: methods_calendar.data['dateType'] === 1 ? 'MM dd, yy':'dd MM yy',
                                      dayNames: methods_days.text['names'],
                                      dayNamesMin: methods_days.text['shortNames'],
                                      firstDay: methods_days.data['first'],
                                      minDate: minDate,
                                      monthNames: methods_months.text['names'],
                                      monthNamesMin: methods_months.text['shortNames'],
                                      nextText: methods_calendar.text['nextMonth'],
                                      prevText: methods_calendar.text['previousMonth']});
                    $('.ui-datepicker').removeClass('notranslate').addClass('notranslate');
                },
                validate:function(day){
                /*
                 * Validate day format.
                 * 
                 * @param day (String): day format to be verified
                 * 
                 * @return true if format is "YYYY-MM-DD"
                 */    
                    var dayPieces = day.split('-');
                    
                    if (day === ''
                            || dayPieces.length !== 3
                            || dayPieces[0].length !== 4
                            || dayPieces[1].length !== 2
                            || dayPieces[2].length !== 2){
                        return false;
                    }
                    else{
                        return true;
                    }
                },

                events: {
                    init:function(){
                    /*
                     * Initialize sidebar search days events.
                     */    
                        if (!methods_calendar.data['view']){
                            /*
                             * Initialize check in datepicker.
                             */
                            methods_search.days.initDatepicker('#DOPBCPCalendar-check-in-view'+ID,
                                                               '#DOPBCPCalendar-check-in'+ID);

                            if (methods_days.data['multipleSelect']){
                                /*
                                 * Initialize check out datepicker.
                                 */
                                methods_search.days.initDatepicker('#DOPBCPCalendar-check-out-view'+ID,
                                                                   '#DOPBCPCalendar-check-out'+ID);
                                $('#DOPBCPCalendar-check-out-view'+ID).attr('disabled', 'disabled');

                                /*
                                 * Initialize multiple days select events.
                                 */
                                methods_search.days.events.selectMultiple();
                            }
                            else{
                                /*
                                 * Initialize single day select events.
                                 */
                                methods_search.days.events.selectSingle();
                            }
                        }
                    },
                    selectMultiple:function(){
                    /*
                     * Initialize sidebar search days events when multiple days need to be selected.
                     */
                        /*
                         * Check in click event.
                         */
                        $('#DOPBCPCalendar-check-in-view'+ID).unbind('click touchstart');
                        $('#DOPBCPCalendar-check-in-view'+ID).bind('click touchstart', function(){
                            $('#DOPBCPCalendar-check-out-view'+ID).val(methods_search.text['checkOut'])
                                                                  .attr('disabled', 'disabled');
                            $('#DOPBCPCalendar-check-in'+ID).val('');
                            $('#DOPBCPCalendar-check-out'+ID).val('');

                            $(this).val('');
                            methods_days.vars.selectionInit = false;
                            methods_days.clearSelection();
                            methods_search.set();
                        });

                        /*
                         * Check in blur event.
                         */
                        $('#DOPBCPCalendar-check-in-view'+ID).unbind('blur');
                        $('#DOPBCPCalendar-check-in-view'+ID).bind('blur', function(){  
                            var $this = $(this);
                            
                            if ($this.val() === ''){
                                $this.val(methods_search.text['checkIn']);
                            }
                            methods_search.set();
                        });
                        
                        /*
                         * Check in change event.
                         */
                        $('#DOPBCPCalendar-check-in-view'+ID).unbind('change');
                        $('#DOPBCPCalendar-check-in-view'+ID).bind('change', function(){
                            var ciDay = $('#DOPBCPCalendar-check-in'+ID).val(),
                            year = parseInt(ciDay.split('-')[0], 10),
                            month = parseInt(ciDay.split('-')[1], 10)-1,
                            minDateValue;
                            
                            if (methods_search.days.validate(ciDay)){
                                minDateValue = prototypes.getNoDays(prototypes.getToday(), ciDay)-(methods_days.data['morningCheckOut'] ? 0:1);
                                methods_days.vars.selectionInit = true;
                                methods_days.vars.selectionStart = ID+'_'+ciDay;
                                methods_days.vars.selectionEnd = ID+'_'+ciDay;

                                $('#DOPBCPCalendar-check-out-view'+ID).removeAttr('disabled')
                                                                      .val('');
                                $('#DOPBCPCalendar-check-out'+ID).val('');
                                methods_search.days.initDatepicker('#DOPBCPCalendar-check-out-view'+ID,
                                                                   '#DOPBCPCalendar-check-out'+ID,
                                                                   minDateValue);

                                methods_calendar.init(year, 
                                                      month+1);
                                methods_days.displaySelection(methods_days.vars.selectionEnd);

                                setTimeout(function(){
                                    $('#DOPBCPCalendar-check-out-view'+ID).val('')
                                                                          .select();  
                                    $('#DOPBCPCalendar-check-out'+ID).val('');
                                }, 100);
                            }
                            else{
                                $('#DOPBCPCalendar-check-in-view'+ID).val(methods_search.text['checkIn']);
                            }
                        });
                        
                        /*
                         * Check out click event.
                         */
                        $('#DOPBCPCalendar-check-out-view'+ID).unbind('click touchstart');
                        $('#DOPBCPCalendar-check-out-view'+ID).bind('click touchstart', function(){  
                            $('#DOPBCPCalendar-check-out-view'+ID).val('');  
                            $('#DOPBCPCalendar-check-out'+ID).val('');      

                            methods_search.set();
                        });
                        
                        /*
                         * Check out blur event.
                         */
                        $('#DOPBCPCalendar-check-out-view'+ID).unbind('blur');
                        $('#DOPBCPCalendar-check-out-view'+ID).bind('blur', function(){ 
                            var $this = $(this);

                            setTimeout(function(){
                                if ($this.val() === ''){
                                    $this.val(methods_search.text['checkOut']);
                                }                       
                                methods_search.set();
                            }, 100);
                        });

                        /*
                         * Check out change event.
                         */
                        $('#DOPBCPCalendar-check-out-view'+ID).unbind('change');
                        $('#DOPBCPCalendar-check-out-view'+ID).bind('change', function(){
                            var ciDay = $('#DOPBCPCalendar-check-in'+ID).val(),
                            coDay = $('#DOPBCPCalendar-check-out'+ID).val();
                            
                            setTimeout(function(){
                                if (methods_search.days.validate(coDay)){
                                    methods_days.vars.selectionInit = false;
                                    methods_days.vars.selectionEnd = ID+'_'+coDay;

                                    methods_calendar.init(parseInt(ciDay.split('-')[0], 10), 
                                                          parseInt(ciDay.split('-')[1], 10));
                                    methods_days.displaySelection(methods_days.vars.selectionEnd);
                                    methods_search.set();
                                }
                                else{
                                    $('#DOPBCPCalendar-check-out-view'+ID).val(methods_search.text['checkOut']);
                                }
                            }, 100);
                        });
                    },
                    selectSingle:function(){
                    /*
                     * Initialize sidebar search days events when single day need to be selected.
                     */
                        /*
                         * Check in click event.
                         */
                        $('#DOPBCPCalendar-check-in-view'+ID).unbind('click touchstart');
                        $('#DOPBCPCalendar-check-in-view'+ID).bind('click touchstart', function(){
                            $(this).val('');
                            methods_days.vars.selectionInit = false;
                            methods_days.clearSelection();
                            methods_search.set();
                        });

                        /*
                         * Check in blur event.
                         */
                        $('#DOPBCPCalendar-check-in-view'+ID).unbind('blur');
                        $('#DOPBCPCalendar-check-in-view'+ID).bind('blur', function(){  
                            var $this = $(this);

                            if ($this.val() === ''){
                                $this.val(methods_search.text['checkIn']);
                            }
                            methods_search.set();
                        });

                        /*
                         * Check in change event.
                         */
                        $('#DOPBCPCalendar-check-in-view'+ID).unbind('change');
                        $('#DOPBCPCalendar-check-in-view'+ID).bind('change', function(){
                            var ciDay = $('#DOPBCPCalendar-check-in'+ID).val();

                            if (methods_search.days.validate(ciDay)){
                                methods_days.vars.selectionStart = ID+'_'+ciDay;
                                methods_days.vars.selectionEnd = ID+'_'+ciDay;

                                methods_calendar.init(parseInt(ciDay.split('-')[0], 10), 
                                                      parseInt(ciDay.split('-')[1], 10));
                                methods_days.displaySelection(methods_days.vars.selectionEnd);
                                methods_search.set();
                            }
                            else{
                                $('#DOPBCPCalendar-check-in-view'+ID).val(methods_search.text['checkIn']);
                            }
                        });
                    }
                }
            },
            no_items: {
                display:function(){
                /*
                 * Display sidebar search number of items.
                 * 
                 * @return number of items search HTML
                 */
                    var HTML = new Array();

                    if (methods_sidebar.data['noItems']){
                        HTML.push('         <div id="DOPBCPCalendar-no-items-wrapper'+ID+'" class="dopbcp-input-wrapper">');
                        HTML.push('             <label for="DOPBCPCalendar-no-items'+ID+'">'+methods_search.text['noItems']+'</label>');
                        HTML.push('             <div id="DOPSelect-DOPBCPCalendar-no-items'+ID+'" class="dopbcp-small"></div>');
                        HTML.push('         </div>');
                    }
                    else{
                        HTML.push('         <input type="hidden" name="DOPBCPCalendar-no-items'+ID+'" id="DOPBCPCalendar-no-items'+ID+'" value="1" />');
                    }

                    return HTML.join('');
                },
                set:function(){
                /*
                 * Set sidebar search number of items.
                 */
                    var HTML = new Array(),
                    i,
                    noAvailable = methods_days.getNoAvailable();

                    HTML.push('<select name="DOPBCPCalendar-no-items'+ID+'" id="DOPBCPCalendar-no-items'+ID+'" class="dopbcp-small">');

                    for (i=1; i<=noAvailable; i++){
                        HTML.push(' <option value="'+i+'">'+i+'</option>');
                    }
                    HTML.push('</select>');

                    $('#DOPSelect-DOPBCPCalendar-no-items'+ID).replaceWith(HTML.join(''));
                    $('#DOPBCPCalendar-no-items'+ID).DOPSelect();

                    methods_search.no_items.events();
                },
                events:function(){
                /*
                 * Initialize sidebar search number of items events.
                 */
                    /*
                     * Number of items change event.
                     */
                    $('#DOPBCPCalendar-no-items'+ID).unbind('change');
                    $('#DOPBCPCalendar-no-items'+ID).bind('change', function(){
                        methods_reservation.set();
                    });
                }
            }
        }, 
                
// 14. Rules        
                
        methods_rules = {
            data: {},
            text: {},
            
            getMaxTimeLapse:function(){
            /*
             * Get the maximum stay of days set in the rules.
             * 
             * @return maximum time lapse value
             */    
                return methods_rules.data['id'] !== '0'? parseFloat(methods_rules.data['rule']['time_lapse_max']):0;
            },
            getMinTimeLapse:function(){
            /*
             * Get the minimum stay of days set in the rules.
             * 
             * @return minimum time lapse value
             */    
                return methods_rules.data['id'] !== '0' 
                            && (methods_days.data['multipleSelect']) ? parseFloat(methods_rules.data['rule']['time_lapse_min']):0;
            }
        },
                
// 15. Extras
        
        methods_extras = {
            data: {},
            text: {},
            
            display:function(){
            /*
             * Display extras.
             */
                var extra = methods_extras.data['extra'],
                groupItem,
                HTML = new Array(),
                i,
                j;
                HTML.push('<div id="DOPBCPCalendar-extras'+ID+'" class="dopbcp-module">');
                
                /*
                 * Title
                 */
                HTML.push(' <h4>'+methods_extras.text['title']+'</h4>');

                /*
                 * List
                 */
                for (i=0; i<extra.length; i++){
                    HTML.push('<div class="dopbcp-input-wrapper">');
                    HTML.push(' <label for="DOPBCPCalendar-extras-group'+ID+'-'+extra[i]['id']+'">'+extra[i]['translation']+(extra[i]['required'] === 'true' ? '  <span class="dopbcp-required">*</span>':'')+'</label>');
                    HTML.push(' <select name="DOPBCPCalendar-extras-group'+ID+'-'+extra[i]['id']+'" id="DOPBCPCalendar-extras-group'+ID+'-'+extra[i]['id']+'"'+(extra[i]['multiple_select'] === 'true' ? ' value="[]" multiple class="dopbcp-big"':'')+'>');

                    if (extra[i]['required'] === 'false' 
                            && extra[i]['multiple_select'] === 'false'){
                        HTML.push('<option value=""></option>');
                    }

                    for (j=0; j<extra[i]['group_items'].length; j++){
                        groupItem = extra[i]['group_items'][j];
                                
                        if (groupItem['translation'] !== ''){
                            HTML.push('<option value="'+groupItem['id']+'">');
                            HTML.push(groupItem['translation']);
                            
                            if (parseFloat(groupItem['price']) !== 0){
                                HTML.push(' <span class="dopbcp-info">(');
                                    
                                if (groupItem['price_type'] === 'fixed'){
                                    HTML.push(groupItem['operation']+methods_price.set(groupItem['price']));
                                }
                                else{
                                    HTML.push(groupItem['operation']+groupItem['price']+'%');
                                }
                                
                                if (groupItem['price_by'] !== 'once'){
                                    HTML.push('/'+(methods_extras.text['byDay']));
                                }
                                HTML.push(')</span>');
                            }
                            HTML.push('</option>');
                        }
                    }
                    HTML.push(' </select>');
                    HTML.push('</div>');
                }
                
                /*
                 * Message
                 */
                HTML.push(' <div class="dopbcp-message DOPBCPCalendar-hidden"></div>');
                HTML.push('</div>');
            
                $('#DOPBCPCalendar-sidebar-column-wrapper-'+methods_sidebar.data['positions']['extras']['column']+'-'+ID+' .dopbcp-row'+methods_sidebar.data['positions']['extras']['row']).html(HTML.join(''));
            },
            init:function(){
            /*
             * Initialize extras lists (drop downs/selects).
             */    
                var extra = methods_extras.data['extra'],
                i;
                
                /*
                 * For each extras list initialize DOP Select jQuery plugin.
                 */
                for (i=0; i<extra.length; i++){
                    $('#DOPBCPCalendar-extras-group'+ID+'-'+extra[i]['id']).DOPSelect();
                }
                methods_extras.events();
            },
            events:function(){
            /*
             * Initialize extras lists events.
             */
                var extra = methods_extras.data['extra'],
                i;
                
                /*
                 * For each extras list initialize change event.
                 */
                for (i=0; i<extra.length; i++){
                    $('#DOPBCPCalendar-extras-group'+ID+'-'+extra[i]['id']).unbind('change');
                    $('#DOPBCPCalendar-extras-group'+ID+'-'+extra[i]['id']).bind('change', function(){
                        methods_reservation.set();
                    });
                }
            },
            
            get:function(reservationPrice,
                         ciDay,
                         coDay,
                         noItems){
            /*
             * Get list of selected extras.
             * 
             * @param reservationPrice (Number): reservation price
             * @param ciDay (String): check in day
             * @param ciDay (String): check in day
             * @param noItems (Number): number of reserved items
             * 
             * @return array of extras
             */    
                var extra = methods_extras.data['extra'],
                extras = new Array(),
                groupItem,
                i,
                j;
        
                /*
                 * All 3 "for" statements need to be separated.
                 */
                
                /*
                 * Set verified value to false.
                 */
                for (i=0; i<extra.length; i++){
                    extra[i]['verified'] = false;
                }
                
                /*
                 * Get selected extras list.
                 */
                for (i=0; i<extra.length; i++){
                    if (extra[i]['verified'] === undefined){
                        extra[i]['verified'] = false;
                    }
                    
                    for (j=0; j<extra[i]['group_items'].length; j++){
                        groupItem = extra[i]['group_items'][j];
                        
                        if ((extra[i]['multiple_select'] === 'false'
                                        && $('#DOPBCPCalendar-extras-group'+ID+'-'+extra[i]['id']).val() === groupItem['id']
                                        && extra[i]['verified'] === false)
                                || (extra[i]['multiple_select'] !== 'false'
                                        && $('#DOPSelect-DOPBCPCalendar-extras-group'+ID+'-'+extra[i]['id']+'-'+groupItem['id']).is(':checked'))){
                            extra[i]['verified'] = true;
                            
                            extras.push({'group_id': extra[i]['id'],
                                         'group_translation': extra[i]['translation'],
                                         'id': groupItem['id'],
                                         'operation': groupItem['operation'],
                                         'price': parseFloat(groupItem['price']),
                                         'price_by': groupItem['price_by'],
                                         'price_type': groupItem['price_type'],
                                         'translation': groupItem['translation']});
                        }
                    }
                }
        
                /*
                 * Calculate price for each selected extra.
                 */
                for (i=0; i<extras.length; i++){
                    delete extras[i]['verified'];
                    extras[i]['price_total'] = methods_extras.getPrice([extras[i]],
                                                                        reservationPrice,
                                                                        ciDay,
                                                                        coDay,
                                                                        noItems);
                }
                
                return extras;
            },
            getPrice:function(extras,
                              reservationPrice,
                              ciDay,
                              coDay,
                              noItems){
            /*
             * Get selected extras price. If you give an array with only one extra you get the price of that selected extra.
             * 
             * @param extras (Array): list of extras
             * @param reservationPrice (Number): reservation price
             * @param ciDay (String): check in day
             * @param ciDay (String): check in day
             * @param noItems (Number): number of reserved items
             * 
             * @retun extras total price value
             */
                var groupItem,
                i,
                price = 0,
                timeLapse;
        
                /*
                 * Verify days
                 */
                coDay = coDay === '' ? ciDay:coDay;
                
                /*
                 * Calculate price.
                 */
                timeLapse = prototypes.getNoDays(ciDay, coDay)-(methods_days.data['morningCheckOut'] ? 1:0);

                for (i=0; i<extras.length; i++){
                    groupItem = extras[i];
                    price += (groupItem['operation'] === '-' ? -1:1)
                             *(groupItem['price_by'] === 'once' ? 1:timeLapse)
                             *groupItem['price']
                             *(groupItem['price_type'] === 'fixed' ? noItems:reservationPrice)/
                             (groupItem['price_type'] === 'fixed' ? 1:100);
                }
                
                return price;
            },
            set:function(extras,
                         ciDay,
                         coDay){
            /*
             * Set selected extras details.
             * 
             * @param extras (Array): list of extras
             * @param ciDay (String): check in day
             * @param ciDay (String): check in day
             * 
             * @retun HTML
             */
                var extra,
                extraHTML = new Array(),
                extrasHTML = new Array(),
                HTML = new Array(),
                i,
                j;
        
                /*
                 * Verify days
                 */
                coDay = coDay === '' ? ciDay:coDay;
                
                /*
                 * If extras are selected display.
                 */
                if (extras.length > 0){
                    HTML.push('<tr class="dopbcp-separator">');
                    HTML.push(' <td class="dopbcp-label"><div class="dopbcp-line"></div></td>');
                    HTML.push(' <td class="dopbcp-value"><div class="dopbcp-line"></div></td>');
                    HTML.push('</tr>');
                }
                
                for (i=0; i<extras.length; i++){
                    extrasHTML.length = 0;
                    
                    if (extras[i]['displayed'] === undefined){
                        for (j=0; j<extras.length; j++){
                            extra = extras[j];
                            extraHTML.length = 0;
                                
                            if (extras[j]['displayed'] === undefined
                                    && extras[i]['group_id'] === extras[j]['group_id']){
                                extraHTML.push(extra['translation']);

                                if (parseFloat(extra['price']) !== 0){
                                    extraHTML.push(' <br />');
                                    
                                    if (extra['price_type'] !== 'fixed' 
                                            || extra['price_by'] !== 'once'){
                                        extraHTML.push(' <span class="dopbcp-info-rule">&#9632;&nbsp;');

                                        if (extra['price_type'] === 'fixed'){
                                            extraHTML.push(extra['operation']+methods_price.set(extra['price']));
                                        }
                                        else{
                                            extraHTML.push(extra['operation']+extra['price']+'%');
                                        }

                                        if (extra['price_by'] !== 'once'){
                                            extraHTML.push('/'+(methods_extras.text['byDay']));
                                        }
                                        extraHTML.push('</span><br />');
                                    }
                                    extraHTML.push('<span class="dopbcp-info-price">'+extra['operation']+'&nbsp;'+methods_price.set(extra['price_total'])+'</span>');
                                }
                            
                                if (extraHTML.length !== 0){
                                    extras[j]['displayed'] = true;
                                    extrasHTML.push(extraHTML.join(''));
                                }
                            }
                        }
                        
                        if (extrasHTML.length !== 0){
                            HTML.push('<tr>');
                            HTML.push(' <td class="dopbcp-label">'+extras[i]['group_translation']+'</td>');
                            HTML.push(' <td class="dopbcp-value dopbcp-info">'+extrasHTML.join('<br /><br />')+'</td>');
                            HTML.push('</tr>');
                        }
                    }
                }
                
                for (i=0; i<extras.length; i++){
                    delete extras[i]['displayed'];
                }
                
                return HTML.join('');
            },
            
            validate:function(extras){
            /*
             * Check if required extras are selected.
             * 
             * @param extras (Array): list of extras
             * 
             * @retun true/false
             */
                var extra = methods_extras.data['extra'],
                i,
                j,
                message = '',
                validateExtras = true,
                validateGroup;
                
                for (i=0; i<extra.length; i++){
                    if (extra[i]['required'] === 'true'
                            && extra[i]['multiple_select'] === 'true'){
                        validateGroup = false;
                        
                        for (j=0; j<extras.length; j++){
                            if (extra[i]['id'] === extras[j]['group_id']){
                                validateGroup = true;
                            }
                        }
                        
                        if (!validateGroup){
                            validateExtras = false;
                            
                            message += (message === '' ? '':'<br />')+methods_extras.text['invalid']+' '+extra[i]['translation']+'.';
                        }
                    }
                }
                
                if (!validateExtras){
                    methods_extras.toggleMessages(message);
                    return false;
                }
                else{
                    methods_extras.toggleMessages('',
                                                  'dopbcp-success',
                                                  'none');
                    return true;
                }
            },
            toggleMessages:function(message,
                                    display,
                                    type){
            /*
             * Toggle extras messages.
             * 
             * @param message (String): the message to be displayed
             * @param display (String): CSS display value
             *                          "block" display message
             *                          "none" hide message
             * @param type (String): message type
             *                       "dopbcp-error" error message
             *                       "dopbcp-success" success message
             */         
                display = display === undefined ? 'block':display;
                type = type === undefined ? 'dopbcp-error':type;
                
                $('#DOPBCPCalendar-extras'+ID+' .dopbcp-message').html(message)
                                                                 .removeClass('dopbcp-success')
                                                                 .removeClass('dopbcp-error')
                                                                 .addClass(type)
                                                                 .css('display', display);
            }
        },

// 16. Discounts
        
        methods_discounts = {
            data: {},
            text: {},
            
            get:function(ciDay,
                         coDay){
            /*
             * Get discount data.
             * 
             * @param ciDay (String): check in day
             * @param ciDay (String): check in day
             * 
             * @retun discount data
             */
                var discount = {'id': 0,
                                'rule_id': 0,
                                'operation': '-',
                                'price': 0,
                                'price_type': 'percent',
                                'price_by': 'once',
                                'start_date': '',
                                'end_date': '',
                                'translation': ''},
                discounts = methods_discounts.data['discount'], 
                i,
                j,
                rule,
                ruleFound,
                timeLapse;
        
                /*
                 * Verify days
                 */
                coDay === '' ? ciDay:coDay;
        
                /*
                 * Calculate time lapse.
                 */
                timeLapse = prototypes.getNoDays(ciDay, coDay)-(methods_days.data['morningCheckOut'] ? 1:0);
                
                for (i=0; i<discounts.length; i++){
                    if ((discounts[i]['start_time_lapse'] === ''
                                || parseInt(discounts[i]['start_time_lapse']) <= timeLapse)
                            && (discounts[i]['end_time_lapse'] === ''
                                || parseInt(discounts[i]['end_time_lapse']) >= timeLapse)){
                        discount['id'] = discounts[i]['id'];
                        discount['operation'] = discounts[i]['operation'];
                        discount['price'] = discounts[i]['price'];
                        discount['price_by'] = discounts[i]['price_by'];
                        discount['price_type'] = discounts[i]['price_type'];
                        discount['translation'] = discounts[i]['translation'];
                        
                        for (j=0; j<discounts[i]['rules'].length; j++){
                            rule = discounts[i]['rules'][j];
                            ruleFound = false;
                            
                            if ((rule['start_date'] === ''
                                        || rule['start_date'] <= ciDay)
                                    && (rule['end_date'] === ''
                                        || rule['end_date'] >= coDay)){

                                ruleFound = true;
                            }
                            
                            if (ruleFound){
                                discount['rule_id'] = rule['id'];
                                discount['operation'] = rule['operation'];
                                discount['price'] = rule['price'];
                                discount['price_by'] = rule['price_by'];
                                discount['price_type'] = rule['price_type'];
                                discount['start_date'] = rule['start_date'];
                                discount['end_date'] = rule['end_date'];
                                
                                break;
                            }
                        }
                        break;
                    }
                }
                
                return discount;
            },
            getPrice:function(discount,
                              reservationPrice,
                              ciDay,
                              coDay,
                              noItems){
            /*
             * Get discount value.
             * 
             * @param discount (Object): discount data
             * @param reservationPrice (Number): reservation price
             * @param ciDay (String): check in day
             * @param ciDay (String): check in day
             * @param noItems (Number): number of reserved items
             * 
             * @retun discount price value
             */
                var timeLapse;
        
                /*
                 * Verify days
                 */
                coDay = coDay === '' ? ciDay:coDay;
                
                /*
                 * Calculate price.
                 */
                timeLapse = prototypes.getNoDays(ciDay, coDay)-(methods_days.data['morningCheckOut'] ? 1:0);
                
                return (discount['operation'] === '-' ? -1:1)
                       *(discount['price_by'] === 'once' ? 1:timeLapse)
                       *discount['price']
                       *(discount['price_type'] === 'fixed' ? noItems:reservationPrice)/
                       (discount['price_type'] === 'fixed' ? 1:100);
            },
            set:function(discount,
                         reservationPrice,
                         ciDay,
                         coDay,
                         noItems){
            /*
             * Set discount details.
             * 
             * @param discount (Object): discount data
             * @param reservationPrice (Number): reservation price
             * @param ciDay (String): check in day
             * @param ciDay (String): check in day
             * @param noItems (Number): number of reserved items
             * 
             * @retun HTML
             */
                var HTML = new Array(),
                price;
        
                /*
                 * Verify days
                 */
                coDay = coDay === '' ? ciDay:coDay;
                
                if (discount['price'] > 0){
                    price = methods_discounts.getPrice(discount,
                                                       reservationPrice,
                                                       ciDay,
                                                       coDay,
                                                       noItems);
                                                       
                    HTML.push(' <tr class="dopbcp-separator">');
                    HTML.push('     <td class="dopbcp-label"><div class="dopbcp-line"></div></td>');
                    HTML.push('     <td class="dopbcp-value"><div class="dopbcp-line"></div></td>');
                    HTML.push(' </tr>');
                    HTML.push(' <tr>');
                    HTML.push('     <td class="dopbcp-label">'+methods_discounts.text['title']+'</td>');
                    HTML.push('     <td class="dopbcp-value dopbcp-info">');
                    HTML.push('         '+discount['translation']+'<br />');
                    
                    if (discount['price_type'] !== 'fixed' 
                            || discount['price_by'] !== 'once'){
                        HTML.push('         <span class="dopbcp-info-rule">&#9632;&nbsp;');

                        if (discount['price_type'] === 'fixed'){
                            HTML.push(discount['operation']+methods_price.set(discount['price']));
                        }
                        else{
                            HTML.push(discount['operation']+discount['price']+'%');
                        }

                        if (discount['price_by'] !== 'once'){
                            HTML.push('/'+(methods_discounts.text['byDay']));
                        }
                        HTML.push('         </span><br />');
                    }
                    HTML.push('         <span class="dopbcp-info-price">'+discount['operation']+'&nbsp;'+methods_price.set(price)+'</span>');
                    
                    HTML.push('     </td>');
                    HTML.push(' </tr>');
                }
                
                return HTML.join('');
            }
        },

// 17. Fees
        
        methods_fees = {
            data: {},
            text: {},
            
            get:function(reservationPrice,
                         discountPrice,
                         extrasPrice,
                         ciDay,
                         coDay,
                         noItems){
            /*
             * Get fees.
             * 
             * @param reservationPrice (Number): reservation price
             * @param discountPrice (Number): discount price
             * @param extrasPrice (Number): extras price
             * @param ciDay (String): check in day
             * @param ciDay (String): check in day
             * @param noItems (Number): number of reserved items
             * 
             * @retun fees
             */
                var fees = methods_fees.data['fees'],
                i,
                timeLapse;
        
                /*
                 * Verify days
                 */
                coDay = coDay === '' ? ciDay:coDay;
                
                /*
                 * Calculate price.
                 */
                timeLapse = prototypes.getNoDays(ciDay, coDay)-(methods_days.data['morningCheckOut'] ? 1:0);
                                                    
                for (i=0; i<fees.length; i++){
                    fees[i]['price_total'] = methods_fees.getPrice([fees[i]],
                                                                   reservationPrice,
                                                                   discountPrice,
                                                                   extrasPrice,
                                                                   ciDay,
                                                                   coDay,
                                                                   noItems);
                }
                
                return fees;
            },
            getPrice:function(fees,
                              reservationPrice,
                              discountPrice,
                              extrasPrice,
                              ciDay,
                              coDay,
                              noItems){
            /*
             * Get fees value.
             * 
             * @param fees (Array): list of fees
             * @param reservationPrice (Number): reservation price
             * @param discountPrice (Number): discount price
             * @param extrasPrice (Number): extras price
             * @param ciDay (String): check in day
             * @param ciDay (String): check in day
             * @param noItems (Number): number of reserved items
             * 
             * @retun fees price value
             */
                var fee,
                i,
                price = 0,
                timeLapse;
        
                /*
                 * Verify days
                 */
                coDay = coDay === '' ? ciDay:coDay;
                
                /*
                 * Calculate price.
                 */
                timeLapse = prototypes.getNoDays(ciDay, coDay)-(methods_days.data['morningCheckOut'] ? 1:0);
                                                    
                for (i=0; i<fees.length; i++){
                    fee = fees[i];
                    
                    if (fee['included'] === 'false'){
                        price += (fee['operation'] === '-' ? -1:1)
                                 *(fee['price_by'] === 'once' ? 1:timeLapse)
                                 *parseFloat(fee['price'])
                                 *(fee['price_type'] === 'fixed' ? noItems:(reservationPrice+discountPrice+(fee['extras'] === 'true' ? extrasPrice:0)))/
                                 (fee['price_type'] === 'fixed' ? 1:100);
                    }
                }
                
                return price;
            },
            set:function(type,
                         fees,
                         ciDay,
                         coDay){
            /*
             * Set fees details.
             * 
             * @param type (String): set where to display fees details
             *                       "reservation" display details in reservation
             *                       "cart" display details in cart
             * @param fees (Array): list of fees
             * @param reservationPrice (Number): reservation price
             * @param discountPrice (Number): discount price
             * @param extrasPrice (Number): extras price
             * @param ciDay (String): check in day
             * @param ciDay (String): check in day
             * @param noItems (Number): number of reserved items
             * 
             * @retun HTML
             */
                var HTML = new Array(),
                i;
        
                /*
                 * Verify days
                 */
                coDay = coDay === '' ? ciDay:coDay;
                
                if (fees.length > 0){
                    HTML.push(' <tr class="dopbcp-separator">');
                    HTML.push('     <td class="dopbcp-label"><div class="dopbcp-line"></div></td>');
                    HTML.push('     <td class="dopbcp-value"><div class="dopbcp-line"></div></td>');
                    HTML.push(' </tr>');
                }
                
                for (i=0; i<fees.length; i++){
                    if ((type === 'reservation'
                                    && (fees[i]['cart'] === 'false'
                                            || !methods_cart.data['enabled']))
                            || (type === 'cart'
                                    && fees[i]['cart'] === 'true')){
                        HTML.push(' <tr>');
                        HTML.push('     <td class="dopbcp-label">'+fees[i]['translation']+'</td>');
                        HTML.push('     <td class="dopbcp-value">');

                        /*
                         * Set fee rule.
                         */
                        
                        if (fees[i]['price_type'] !== 'fixed' 
                                || fees[i]['price_by'] !== 'once'){
                            HTML.push('         <span class="dopbcp-info-rule">&#9632;&nbsp;');

                            if (fees[i]['price_type'] === 'fixed'){
                                HTML.push(fees[i]['operation']+methods_price.set(fees[i]['price']));
                            }
                            else{
                                HTML.push(fees[i]['operation']+fees[i]['price']+'%');
                            }

                            if (fees[i]['price_by'] !== 'once'){
                                HTML.push('/'+(methods_fees.text['byDay']));
                            }
                            HTML.push('         </span><br />');
                        }
                        HTML.push('         <span class="dopbcp-info-price">');
                        
                        /*
                         * Set fee value.
                         */
                        if (fees[i]['included'] === 'true'){
                            HTML.push(methods_fees.text['included']);
                        }
                        else{
                            HTML.push(fees[i]['operation']+'&nbsp;'+methods_price.set(fees[i]['price_total']));
                        }
                        HTML.push('         </span>');
                        HTML.push('     </td>');
                        HTML.push(' </tr>');
                    }
                }
                
                return HTML.join('');
            }
        },
                
// 18. Deposit
        
        methods_deposit = {
            data: {},
            text: {},
            
            get:function(){
            /*
             * Get deposit data.
             * 
             * @retun deposit data
             */
                var deposit = {'price': 0,
                               'price_type': 'percent'};
                
                if (methods_deposit.data['deposit'] !== 0){
                    deposit['price'] = methods_deposit.data['deposit'];
                    deposit['price_type'] = methods_deposit.data['type'];
                }
                
                return deposit;
            },
            getPrice:function(deposit,
                              totalPrice){
            /*
             * Get deposit value.
             * 
             * @param deposit (Object): deposit data
             * @param totalPrice (Number): reservation total price
             * 
             * @retun deposit price value
             */
                var price = 0;
        
                price += parseFloat(deposit['price'])
                         *(deposit['price_type'] === 'fixed' ? 1:totalPrice)/
                         (deposit['price_type'] === 'fixed' ? 1:100);
                
                return price;
            },
            set:function(deposit,
                         totalPrice) {
            /*
             * Set deposit details.
             * 
             * @param deposit (Object): deposit data
             * @param totalPrice (Number): reservation total price
             * 
             * @retun HTML
             */
                var HTML = new Array(),
                price = 0;
        
                if (deposit['price'] !== 0){
                    price = methods_deposit.getPrice(deposit,
                                                     totalPrice);
                                                       
                    HTML.push(' <tr class="dopbcp-deposit">');
                    HTML.push('     <td class="dopbcp-label">'+methods_deposit.text['title']+'</td>');
                    HTML.push('     <td class="dopbcp-value">'+methods_price.set(price)+'</td>');
                    HTML.push(' </tr>');
                }
                
                return HTML.join('');
            }
        },

// 19. Reservation
        
        methods_reservation = {
            data: {},
            text: {},
            reservation: {'check_in': '',
                          'check_out': '',
                          'no_items': 1,
                          'price': 0,
                          'price_total': 0,
                          'extras': new Array(),
                          'extras_price': 0,
                          'discount': {},
                          'discount_price': 0,
                          'fees': new Array(),
                          'fees_price': 0,
                          'deposit': {},
                          'deposit_price': 0,
                          'days_history': {}},
            
            display:function(){
            /*
             * Display reservation.
             */
                var HTML = new Array();
                
                HTML.push(' <div id="DOPBCPCalendar-reservation'+ID+'" class="dopbcp-module">');
                HTML.push('     <h4>'+methods_reservation.text['title']+'</h4>');
                HTML.push('     <div id="DOPBCPCalendar-reservation-cart'+ID+'">');
                HTML.push('         <div class="dopbcp-message">'+(methods_reservation.text['selectDays'])+'</div>');
                HTML.push('     </div>');
                HTML.push(' </div>');
                
                $('#DOPBCPCalendar-sidebar-column-wrapper-'+methods_sidebar.data['positions']['reservation']['column']+'-'+ID+' .dopbcp-row'+methods_sidebar.data['positions']['reservation']['row']).html(HTML.join(''));
            },
            set:function(){
            /*
             * Set reservation details.
             */    
                var ciDay = $('#DOPBCPCalendar-check-in'+ID).val(),
                coDay = $('#DOPBCPCalendar-check-out'+ID).val() !== undefined ? $('#DOPBCPCalendar-check-out'+ID).val():'',
                HTML = new Array(),
                noItems = parseInt($('#DOPBCPCalendar-no-items'+ID).val());
                
                if (!methods_days.getAvailability(ciDay, coDay)){
                    methods_reservation.clear();
                    return false;
                }
                   
                /*
                 * Set reservation data.
                 */
                methods_reservation.reservation['check_in'] = ciDay;
                methods_reservation.reservation['check_out'] = coDay;
                methods_reservation.reservation['no_items'] = noItems;
                methods_reservation.reservation['price'] = noItems*(methods_days.getPrice(methods_reservation.reservation['check_in'],
                                                                                          methods_reservation.reservation['check_out']));
                /*
                 * Set reservation extras data.
                 */
                methods_reservation.reservation['extras'] = methods_extras.get(methods_reservation.reservation['price'],
                                                                               methods_reservation.reservation['check_in'],
                                                                               methods_reservation.reservation['check_out'],
                                                                               methods_reservation.reservation['no_items']);
                methods_reservation.reservation['extras_price'] = methods_extras.getPrice(methods_reservation.reservation['extras'],
                                                                                          methods_reservation.reservation['price'],
                                                                                          methods_reservation.reservation['check_in'],
                                                                                          methods_reservation.reservation['check_out'],
                                                                                          methods_reservation.reservation['no_items']);
                /*
                 * Set reservation discount data.
                 */
                methods_reservation.reservation['discount'] = methods_discounts.get(methods_reservation.reservation['check_in'],
                                                                                    methods_reservation.reservation['check_out'],
                                                                                    methods_reservation.reservation['start_hour'],
                                                                                    methods_reservation.reservation['end_hour']);
                methods_reservation.reservation['discount_price'] = methods_discounts.getPrice(methods_reservation.reservation['discount'],
                                                                                               methods_reservation.reservation['price'],
                                                                                               methods_reservation.reservation['check_in'],
                                                                                               methods_reservation.reservation['check_out'],
                                                                                               methods_reservation.reservation['start_hour'],
                                                                                               methods_reservation.reservation['end_hour'],
                                                                                               methods_reservation.reservation['no_items']);
                
                /*
                 * Set reservation fees data.
                 */
                methods_reservation.reservation['fees'] = methods_fees.get(methods_reservation.reservation['price'],
                                                                           methods_reservation.reservation['discount_price'],
                                                                           methods_reservation.reservation['extras_price'],
                                                                           methods_reservation.reservation['check_in'],
                                                                           methods_reservation.reservation['check_out'],
                                                                           methods_reservation.reservation['no_items']);
                methods_reservation.reservation['fees_price'] = methods_fees.getPrice(methods_reservation.reservation['fees'],
                                                                                      methods_reservation.reservation['price'],
                                                                                      methods_reservation.reservation['discount_price'],
                                                                                      methods_reservation.reservation['extras_price'],
                                                                                      methods_reservation.reservation['check_in'],
                                                                                      methods_reservation.reservation['check_out'],
                                                                                      methods_reservation.reservation['no_items']);
                
                /*
                 * Total price.
                 */
                methods_reservation.reservation['price_total'] = methods_reservation.reservation['price']
                                                                 +methods_reservation.reservation['extras_price']
                                                                 +methods_reservation.reservation['discount_price']
                                                                 +methods_reservation.reservation['fees_price'];
                                                         
                /*
                 * Deposit
                 */
                methods_reservation.reservation['deposit'] = methods_deposit.get();
                methods_reservation.reservation['deposit_price'] = methods_deposit.getPrice(methods_reservation.reservation['deposit'],
                                                                                            methods_reservation.reservation['price_total']);
                
                /*
                 * Set reservation history data.
                 */
                methods_reservation.reservation['days_history'] = methods_days.getHistory(methods_reservation.reservation['check_in'],
                                                                                                methods_reservation.reservation['check_out']);
                
                /*
                 * Set reservation display.
                 */
                HTML.push('<div class="dopbcp-cart-wrapper">');
                HTML.push(' <table class="dopbcp-cart">');
                HTML.push('     <tbody>');
                HTML.push('         <tr>');
                HTML.push('             <td class="dopbcp-label">'+methods_search.text['checkIn']+'</td>');
                HTML.push('             <td class="dopbcp-value">'+methods_sidebar.getDateFormat(methods_reservation.reservation['check_in'])+'</td>');
                HTML.push('         </tr>');
                
                if (methods_reservation.reservation['check_out'] !== ''){
                    HTML.push(' <tr>');
                    HTML.push('     <td class="dopbcp-label">'+methods_search.text['checkOut']+'</td>');
                    HTML.push('     <td class="dopbcp-value">'+methods_sidebar.getDateFormat(methods_reservation.reservation['check_out'])+'</td>');
                    HTML.push(' </tr>');
                }
                
                // if (methods_sidebar.data['noItems']){
                //     HTML.push(' <tr>');
                //     HTML.push('     <td class="dopbcp-label">'+methods_search.text['noItems']+'</td>');
                //     HTML.push('     <td class="dopbcp-value">'+methods_reservation.reservation['no_items']+'</td>');
                //     HTML.push(' </tr>');
                // }
                
                if (methods_reservation.reservation['price'] !== 0){
                    
                    HTML.push(' <tr>');
                    HTML.push('     <td class="dopbcp-label">'+methods_reservation.text['price']+'</td>');
                    HTML.push('     <td class="dopbcp-value dopbcp-price">');
                    HTML.push(methods_price.set(methods_reservation.reservation['price']));
                    HTML.push('     </td>');
                    HTML.push(' </tr>');
                }
                
                
                /*
                 * Extras
                 */
                HTML.push(methods_extras.set(methods_reservation.reservation['extras'],
                                             methods_reservation.reservation['check_in'],
                                             methods_reservation.reservation['check_out']));
                
                /*
                 * Discounts
                 */
                if (methods_reservation.reservation['price'] !== 0){
                    HTML.push(methods_discounts.set(methods_reservation.reservation['discount'],
                                                    methods_reservation.reservation['price'],
                                                    methods_reservation.reservation['check_in'],
                                                    methods_reservation.reservation['check_out'],
                                                    methods_reservation.reservation['no_items']));
                }
                
                /*
                 * Fees
                 */
                HTML.push(methods_fees.set('reservation',
                                           methods_reservation.reservation['fees'],
                                           methods_reservation.reservation['check_in'],
                                           methods_reservation.reservation['check_out']));
                
                HTML.push('         <tr class="dopbcp-separator">');
                HTML.push('             <td class="dopbcp-label"></td>');
                HTML.push('             <td class="dopbcp-value"></td>');
                HTML.push('         </tr>');
                    
                /*
                 * Total price.
                 */
                if (methods_reservation.reservation['price_total'] > 0){
                    /*
                     * Deposit
                     */
                    if (methods_reservation.reservation['deposit_price'] > 0){
                        HTML.push(methods_deposit.set(methods_reservation.reservation['deposit'],
                                                      methods_reservation.reservation['price_total']));
                    }
                    HTML.push('         <tr class="dopbcp-total">');
                    HTML.push('             <td class="dopbcp-label">'+methods_reservation.text['priceTotal']+'</td>');
                    HTML.push('             <td class="dopbcp-value">'+methods_price.set(methods_reservation.reservation['price_total'])+'</td>');
                    HTML.push('         </tr>');
                }
                HTML.push('     </tbody>');
                HTML.push(' </table>');
                HTML.push('</div>');
                
                $('#DOPBCPCalendar-reservation-cart'+ID).html(HTML.join(''));
                
                /*
                 * Scroll to reservation
                 */

                if ($('#DOPBCPCalendar-reservation'+ID).offset().top+$('#DOPBCPCalendar-reservation'+ID).height() > $(document).scrollTop()+$(window).height()){
                    prototypes.scrollToY($('#DOPBCPCalendar-reservation'+ID).offset().top+$('#DOPBCPCalendar-reservation'+ID).height()-$(window).height()+50);
                }

                if (methods_cart.data['enabled']){
                    methods_cart.cart[0] = methods_reservation.reservation;
                    $('#DOPBCPCalendar-order'+ID).css('display', 'block');
                    $('#DOPBCPCalendar-submit'+ID).css('display', 'block');
                } else {
                    $('#DOPBCPCalendar-order'+ID).css('display', 'none');
                    $('#DOPBCPCalendar-submit'+ID).css('display', 'none');
                }
            },
            
            clear:function(){
            /*
             * Clear reservation data.
             */    
                methods_days.vars.selectionEnd = '';
                methods_days.vars.selectionInit = false;
                methods_days.vars.selectionStart = '';
                methods_days.clearSelection();
        
                methods_reservation.reservation = {'check_in': '',
                                                   'check_out': '',
                                                   'no_items': 1,
                                                   'price': 0,
                                                   'price_total': 0,
                                                   'extras': new Array(),
                                                   'extras_price': 0,
                                                   'discount': {},
                                                   'discount_price': 0,
                                                   'fees': new Array(),
                                                   'fees_price': 0,
                                                   'deposit': {},
                                                   'deposit_price': 0,
                                                   'days_history': {}};
            },
            toggleMessages:function(message,
                                    type){
            /*
             * Toggle reservation messages.
             * 
             * @param message (String): the message to be displayed
             * @param type (String): message type
             *                       "none"
             *                       "dopbcp-error" error message
             *                       "dopbcp-success" success message
             */
                type = type === undefined ? 'dopbcp-error':type;
                
                $('#DOPBCPCalendar-reservation-cart'+ID).html('<div class="dopbcp-message '+type+'">'+message+'</div>');
            }
        },  
                
// 20. Cart

        methods_cart = {
            data: {},
            text: {},
            cart: new Array(),
              
            display:function(){
            /*
             * Display cart.
             */
                var HTML = new Array();
                
                /*
                 * Cart totals.
                 */
                HTML.push(' <div id="DOPBCPCalendar-cart'+ID+'" class="module'+(methods_cart.data['enabled'] ? '':' DOPBCPCalendar-hidden')+'">');
                HTML.push('     <h4>'+methods_cart.text['title']+'</h4>');
                HTML.push('     <table id="DOPBCPCalendar-list-cart'+ID+'" class="cart">');
                HTML.push('         <tbody>');
                HTML.push('             <tr>');
                HTML.push('                 <td class="label">Price</td>');
                HTML.push('                 <td class="value"></td>');
                HTML.push('             </tr>');
                HTML.push('             <tr id="DOPBCPCalendar-cart-totals-discount'+ID+'">');
                HTML.push('                 <td class="label">Discount</td>');
                HTML.push('                 <td class="value"></td>');
                HTML.push('             </tr>');
                HTML.push('             <tr id="DOPBCPCalendar-cart-totals-total-price'+ID+'" class="total">');
                HTML.push('                 <td class="label">'+methods_reservation.text['priceTotal']+'</td>');
                HTML.push('                 <td class="value"></td>');
                HTML.push('             </tr>');
                HTML.push('         </tbody>');
                HTML.push('     </table>');
                HTML.push(' </div>');
                
                $('#DOPBCPCalendar-sidebar-column-wrapper-'+methods_sidebar.data['positions']['cart']['column']+'-'+ID+' .row'+methods_sidebar.data['positions']['cart']['row']).html(HTML.join(''));
            },
            add:function(){
                methods_cart.cart.push(methods_reservation.reservation);
                methods_cart.set();
            },
            delete:function(i){
                methods_cart.cart.splice(i, 1);
                methods_cart.set();
            },
            set:function(){
                var HTML = new Array(),
                i;
                HTML.push('<tbody>');
                
                if (methods_cart.cart.length > 0){
                    for (i=0; i<methods_cart.cart.length; i++){

                    }
                    methods_order.set();
                }
                else{
                    HTML.push('  <tr>');
                    HTML.push('     <td>'+methods_cart.text['isEmpty']+'</td>');
                    HTML.push('  </tr>');
                    methods_order.clear();
                }
                HTML.push('</tbody>');
            }
        },
                
// 21. Form
                
        methods_form = {
            data: {},
            text: {},
            
            display:function(){
            /*
             * Display form.
             */
                var form = methods_form.data['form'],
                formField,
                formFieldOption,
                HTML = new Array (),
                i,
                j;
        
                HTML.push('<div id="DOPBCPCalendar-form'+ID+'" class="dopbcp-module">');

                    /*
                     * Title
                     */
                    HTML.push(' <h4>'+methods_form.text['title']+'</h4>');

                    /*
                     * Fields
                     */
                    for (i=0; i<form.length; i++){
                        formField = form[i];
                        
                        HTML.push(' <div class="dopbcp-input-wrapper">');

                        switch (formField['type']){
                            case 'checkbox':
                                /*
                                 * Checkbox field.
                                 */
                                HTML.push('     <div id="DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']+'" class="dopbcp-warning-info DOPBCPCalendar-hidden">');
                                HTML.push('         <a href="javascript:void(0)" class="dopbcp-icon"></a>');
                                HTML.push('         <div class="dopbcp-message">'+formField['translation']+' '+methods_form.text['required']+'</div>');
                                HTML.push('     </div>');
                                HTML.push('     <input type="checkbox" name="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'" id="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'" />');
                                HTML.push('     <label class="dopbcp-for-checkbox" for="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'">'+formField['translation']+(formField['required'] === 'true' ? '  <span class="dopbcp-required">*</span>':'')+'</label>');
                                break;
                            case 'select':
                                /*
                                 * Select field.
                                 */
                                HTML.push('     <div id="DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']+'" class="dopbcp-warning-info DOPBCPCalendar-hidden">');
                                HTML.push('         <a href="javascript:void(0)" class="dopbcp-icon"></a>');
                                HTML.push('         <div class="dopbcp-message">'+formField['translation']+' '+methods_form.text['required']+'</div>');
                                HTML.push('     </div>');
                                HTML.push('     <label for="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'">'+formField['translation']+(formField['required'] === 'true' ? '  <span class="dopbcp-required">*</span>':'')+'</label>');
                                HTML.push('     <select name="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+(formField['multiple_select'] === 'true' ? '[]':'')+'" id="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'" value=""'+(formField['multiple_select'] === 'true' ? ' multiple':'')+'>');

                                for (j=0; j<formField['options'].length; j++){
                                    formFieldOption = formField['options'][j];
                                    HTML.push('<option value="'+formFieldOption['id']+'">'+formFieldOption['translation']+'</option>');
                                }
                                HTML.push('     </select>');
                                break;
                            case 'text':
                                /*
                                 * Text field.
                                 */
                                HTML.push('     <div id="DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']+'" class="dopbcp-warning-info DOPBCPCalendar-hidden">');
                                HTML.push('         <a href="javascript:void(0)" class="dopbcp-icon"></a>');
                                HTML.push('         <div class="dopbcp-message">'+formField['translation']+' '+(formField['is_email'] === 'true' ? methods_form.text['invalidEmail']:methods_form.text['required'])+'</div>');
                                HTML.push('     </div>');
                                HTML.push('     <label for="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'">'+formField['translation']+(formField['required'] === 'true' ? ' <span class="dopbcp-required">*</span>':'')+'</label>');
                                HTML.push('     <input type="text" name="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'" id="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'" value="" />');
                                break;
                            case 'textarea':
                                /*
                                 * Textarea field.
                                 */
                                HTML.push('     <div id="DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']+'" class="dopbcp-warning-info DOPBCPCalendar-hidden">');
                                HTML.push('         <a href="javascript:void(0)" class="dopbcp-icon"></a>');
                                HTML.push('         <div class="dopbcp-message">'+formField['translation']+' '+methods_form.text['required']+'</div>');
                                HTML.push('     </div>');
                                HTML.push('     <label for="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'">'+formField['translation']+(formField['required'] === 'true' ? '  <span class="dopbcp-required">*</span>':'')+'</label>');
                                HTML.push('     <textarea name="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'" id="DOPBCPCalendar-form-field'+ID+'_'+formField['id']+'" col="" rows="3"></textarea>');
                                break;
                        }
                        HTML.push(' </div>');
                }


                HTML.push('<div class="stripe"><div class="form-row"> <label> <span>Card Number</span> <input type="text" size="20" data-stripe="number"/> </label> </div> <div class="form-row"> <label> <span>CVC</span> <input type="text" size="4" data-stripe="cvc"/> </label> </div> <div class="form-row"> <label> <span>Expiration (MM/YYYY)</span> <input type="text" size="2" data-stripe="exp-month"/>  /  <input type="text" size="4" data-stripe="exp-year"/></label> </div></div>');

                
                

                /*
                 * Terms & conditions.
                 */
                if (methods_order.data['terms']){
                    HTML.push(' <div class="dopbcp-input-wrapper">');
                    HTML.push('     <input type="checkbox" name="DOPBCPCalendar-terms-and-conditions'+ID+'" id="DOPBCPCalendar-terms-and-conditions'+ID+'" />');
                    HTML.push('     <label class="dopbcp-for-checkbox" for="DOPBCPCalendar-terms-and-conditions'+ID+'"><a href="'+methods_order.data['termsLink']+'" target="_blank">'+methods_order.text['terms']+'</a></label>');
                    HTML.push(' </div>');
                }

                /*
                 * Submit button.
                 */
                HTML.push(' <div class="dopbcp-input-wrapper">');
                HTML.push('     <input type="submit" name="DOPBCPCalendar-submit'+ID+'" id="DOPBCPCalendar-submit'+ID+'" class="DOPBCPCalendar-hidden" value="'+methods_order.text['book']+'" />');
                HTML.push('     <div id="DOPBCPCalendar-submit-loader'+ID+'" class="dopbcp-submit-loader DOPBCPCalendar-hidden"></div>');
                HTML.push(' </div>');
                
                HTML.push('</div>');
                
                $('#DOPBCPCalendar-sidebar-column-wrapper-'+methods_sidebar.data['positions']['form']['column']+'-'+ID+' .dopbcp-row'+methods_sidebar.data['positions']['form']['row']).html(HTML.join(''));
                
                methods_form.init();
            },
            init:function(){
            /*
             * Initialize form.
             */    
                var form = methods_form.data['form'],
                formField,
                i;
        
                for (i=0; i<form.length; i++){
                    formField = form[i];
                    
                    /*
                     * Initialize select fields.
                     */
                    if (formField['type'] === 'select'){
                        $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).DOPSelect();
                    }
                }
                
                methods_form.events();
            },
            events:function(){
            /*
             * Initialize form events.
             */    
                var form = methods_form.data['form'],
                formData = {},
                formField,
                i;
        
                for (i=0; i<form.length; i++){
                    formField = form[i];
                    formData[formField['id']] = formField;
                    formData[formField['id']]['size'] = parseInt(formData[formField['id']]['size'], 10);
                        
                    switch (formField['type']){
                        case 'checkbox':
                            $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).unbind('click touchstart');
                            $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).bind('click touchstart', function(){
                                var id = $(this).attr('id').split('DOPBCPCalendar-form-field'+ID+'_')[1];
                                
                                /*
                                 * Verify if required.
                                 */
                                if (formData[id]['required'] === 'true' 
                                        && !$(this).is(':checked')){
                                    $('#DOPBCPCalendar-form-field-warning'+ID+'_'+id).css('display', 'block');
                                }
                                else{
                                    $('#DOPBCPCalendar-form-field-warning'+ID+'_'+id).css('display', 'none');
                                }
                            });
                            break;
                        case 'text':
                            $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).unbind('input propertychange blur touchstart');
                            $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).bind('input propertychange blur touchstart', function(){
                                var id = $(this).attr('id').split('DOPBCPCalendar-form-field'+ID+'_')[1],
                                value;
                                
                                /*
                                 * Verify characters.
                                 */
                                if (formData[id]['allowed_characters'] !== ''){
                                    prototypes.cleanInput($(this), formData[id]['allowed_characters']);
                                }
                                
                                value = $(this).val();
                                
                                /*
                                 * Verify size.
                                 */
                                if (formData[id]['size'] !== 0){
                                    $(this).val(value.substring(0, formData[id]['size']));
                                }
                                
                                /*
                                 * Verify if required/email.
                                 */
                                if (formData[id]['is_email'] === 'true' 
                                        && !prototypes.validEmail(value)){
                                    $('#DOPBCPCalendar-form-field-warning'+ID+'_'+id).css('display', 'block');
                                }
                                else if (formData[id]['required'] === 'true' 
                                            && value === ''){
                                    $('#DOPBCPCalendar-form-field-warning'+ID+'_'+id).css('display', 'block');
                                }
                                else{
                                    $('#DOPBCPCalendar-form-field-warning'+ID+'_'+id).css('display', 'none');
                                }
                            });
                            break;
                        case 'select':
                            $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).unbind('change touchstart');
                            $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).bind('change touchstart', function(){
                                var id = $(this).attr('id').split('DOPBCPCalendar-form-field'+ID+'_')[1];
                                
                                /*
                                 * Verify if required.
                                 */
                                if (formData[id]['required'] === 'true' 
                                        && ($(this).val() === '' 
                                            || $(this).val() === null)){
                                    $('#DOPBCPCalendar-form-field-warning'+ID+'_'+id).css('display', 'block');
                                }
                                else{
                                    $('#DOPBCPCalendar-form-field-warning'+ID+'_'+id).css('display', 'none');
                                }
                            });
                            break;
                        case 'textarea':
                            $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).unbind('input propertychange blur touchstart');
                            $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).bind('input propertychange blur touchstart', function(){
                                var id = $(this).attr('id').split('DOPBCPCalendar-form-field'+ID+'_')[1],
                                value;
                                
                                /*
                                 * Verify characters.
                                 */
                                if (formData[id]['allowed_characters'] !== ''){
                                    prototypes.cleanInput($(this), formData[id]['allowed_characters']);
                                }
                                
                                value = $(this).val();
                                
                                /*
                                 * Verify size.
                                 */
                                if (formData[id]['size'] !== 0){
                                    $(this).val(value.substring(0, formData[id]['size']));
                                }
                                
                                /*
                                 * Verify if required.
                                 */
                                if (formData[id]['required'] === 'true' 
                                        && value === ''){
                                    $('#DOPBCPCalendar-form-field-warning'+ID+'_'+id).css('display', 'block');
                                }
                                else{
                                    $('#DOPBCPCalendar-form-field-warning'+ID+'_'+id).css('display', 'none');
                                }
                            });
                            break;
                    }
                }
            },
            
            get:function(){
            /*
             * Get form valid data.
             * 
             * @return JSON
             */    
                var form = methods_form.data['form'],
                formData = new Array(),
                formField,
                i,
                j,
                k,
                option,
                selectedOptions;
        
                for (i=0; i<form.length; i++){
                    formField = form[i];

                    formData[i] = {"id": "",
                                   "is_email": false,
                                   "translation": "",
                                   "value": ""};
                    formData[i]['id'] = formField['id'];
                    formData[i]['is_email'] = formField['is_email'] === 'true' ? true:false;
                    formData[i]['translation'] = formField['translation'];

                    switch (formField['type']){
                        case 'checkbox':
                            formData[i]['value'] = $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).is(':checked');
                            break;
                        case 'select':
                            option = $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).val();
                            
                            if (formField['multiple_select'] === 'true'){
                                selectedOptions = option.split(',');
                                formData[i]['value'] = new Array();

                                for (j=0; j<selectedOptions.length; j++){
                                    for (k=0; k<formField['options'].length; k++){
                                        if (formField['options'][k]['id'] === selectedOptions[j]){
                                            formData[i]['value'][j] = formField['options'][k];
                                        }
                                    }
                                }
                                
                                if (formData[i]['value'].length === 0){
                                    formData[i]['value'] = '';
                                }
                            }
                            else{
                                formData[i]['value'] = '';
                                
                                for (k=0; k<formField['options'].length; k++){
                                    if (formField['options'][k]['id'] === option){
                                        formData[i]['value'] = formField['options'][k]['translation'];
                                        break;
                                    }
                                }
                            }
                            break;
                        default:
                            formData[i]['value'] = $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).val();
                    }
                }
                
                return formData;
            },
            validate:function(){
            /*
             * Validate form data.
             * 
             * @return true/false
             */    
                var form = methods_form.data['form'],
                formField,        
                i,
                isValid = true;

                for (i=0; i<form.length; i++){
                    formField = form[i];
                        
                    switch (formField['type']){
                        case 'checkbox':
                            if (formField['required'] === 'true' 
                                    && !$('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).is(':checked')){
                                isValid = false;
                                $('#DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']).css('display', 'block');
                            }
                            else{
                                $('#DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']).css('display', 'none');
                            }
                            break;
                        case 'text':
                            if (formField['is_email'] === 'true' 
                                    && !prototypes.validEmail($('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).val())){
                                isValid = false;
                                $('#DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']).css('display', 'block');
                            }
                            else if (formField['required'] === 'true' 
                                    && $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).val() === ''){
                                isValid = false;
                                $('#DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']).css('display', 'block');
                            }
                            else{
                                $('#DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']).css('display', 'none');
                            }
                            break;
                        case 'select':
                            if (formField['required'] === 'true' 
                                    && ($('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).val() === '' 
                                    || $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).val() === null)){
                                isValid = false;
                                $('#DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']).css('display', 'block');
                            }
                            else{
                                $('#DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']).css('display', 'none');
                            }
                            break;
                        case 'textarea':
                            if (formField['required'] === 'true' 
                                    && $('#DOPBCPCalendar-form-field'+ID+'_'+formField['id']).val() === ''){
                                isValid = false;
                                $('#DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']).css('display', 'block');
                            }
                            else{
                                $('#DOPBCPCalendar-form-field-warning'+ID+'_'+formField['id']).css('display', 'none');
                            }
                            break;
                    }
                }

                return isValid;
            },
            
            getInfo:function(info){
            /*
             * Get form info in day tooltip or body.
             * 
             * @param info (Array): info list
             * 
             * @return info text
             */    
                var i,
                text = new Array();
                
                for (i=0; i<info.length; i++){
                    text.push(info[i]['data']);
                }
                
                return text.join('<br /><br />');
            }
        },
                
// 22. Order
 
        methods_order = {
            data: {},
            text: {},
            
            display:function(){
            /*
             * Display order.
             * 
             * @return order HTML
             */
                var HTML = new Array (),
                key;
                
                HTML.push('<div id="DOPBCPCalendar-order'+ID+'" class="dopbcp-module dopbcp-calendar-order">');

                /*
                 * Title
                 */
                //HTML.push(' <h4>'+methods_order.text['title']+'</h4>');
                
                /*
                 * Message
                 */
                HTML.push(' <div class="dopbcp-message DOPBCPCalendar-hidden"></div>');
                HTML.push('</div>');
                
                $('#DOPBCPCalendar-sidebar-column-wrapper-'+methods_sidebar.data['positions']['order']['column']+'-'+ID+' .dopbcp-row'+methods_sidebar.data['positions']['order']['row']).html(HTML.join(''));
                
                methods_order.init();
            },
            init:function(){
            /*
             * Initialize order.
             */    
                methods_order.events();
            },
            events:function(){
            /*
             * Initialize order events.
             */    
                $('#DOPBCPCalendar-submit'+ID).unbind('click touchstart');
                $('#DOPBCPCalendar-submit'+ID).bind('click touchstart', function(){
                    methods_order.book();
                });
            },
            validate:function(){
            /*
             * Validate order.
             */    
                var isValid = true;
                
                if (methods_order.data['termsAndConditions'] 
                        && !$('#DOPBCPCalendar-terms-and-conditions'+ID).is(':checked')){
                    methods_order.toggleMessages(methods_order.text['termsAndConditionsInvalid'],
                                                 'block');
                    isValid = false;
                }
                
                return isValid;
            },
            
            book:function(){
            /*
             * Book a reservation.
             */    
                
                /*
                 * Stop if form is not valid.
                 */
                if (!methods_form.validate()){
                    return false;
                }
                
                /*
                 * Stop if order is not valid.
                 */
                if (!methods_order.validate()){
                    return false;
                }
                
                methods_order.toggleMessages('', 'none');
                $('#DOPBCPCalendar-submit'+ID).css('display', 'none');
                $('#DOPBCPCalendar-submit-loader'+ID).css('display', 'block');

                var stripeSuccess = false;
                var stripeError = "";


                function stripeResponseHandler(status, response) {
                  var $form = $("#DOPBCPCalendar-form1");


                  if (response.error) {
                    // Show the errors on the form
                    console.log(response.error.message);

                    methods_info.toggleMessages(response.error.message,
                                                    'dopbcp-error');
                    $('#DOPBCPCalendar-submit'+ID).css('display', 'block');
                    $('#DOPBCPCalendar-submit-loader'+ID).css('display', 'none');

                    return false;
                  } else {
                    stripeSuccess = true;
                    // response contains id and card, which contains additional card details
                    var token = response.id;
                    // Insert the token into the form so it gets submitted to the server
                    $form.append($('<input id="stripeTokenInput" type="hidden" name="stripeToken" />').val(token));
                    

                    $.post(ajaxSendURL, {dopbcp_calendar_id: ID,
                                     language: methods_calendar.data['language'],
                                     currency: methods_currency.data['sign'],
                                     token:token,
                                     currency_code: methods_currency.data['code'],
                                     reservation_data: methods_cart.cart,
                                     form: methods_form.get(),
                                     page_url: window.location.href}, function(data){

                    data = $.trim(data);
                    
                    /*
                     * If period is unavailable reload schedule.
                     */
                    if (data === 'unavailable'){
                        methods_info.toggleMessages(methods_order.text['unavailable'],'dopbcp-error');
                        methods_reservation.clear();
                        methods_schedule.reset();
                        
                        return false;
                    }

                    data = JSON.parse(data);


                    if(data.failure == true)
                    {
                      methods_info.toggleMessages(data.message,'dopbcp-error');
                      methods_reservation.clear();
                      return false;
                    }
                    
                    // if (methods_order.data['redirect'] !== ''){
                    //     window.location.href = methods_order.data['redirect'];
                    // }

                    $('#DOPBCPCalendar-submit'+ID).css('display', 'block');
                    $('#DOPBCPCalendar-submit-loader'+ID).css('display', 'none');
                    methods_info.toggleMessages("Your booking has been made!",'dopbcp-success');
                    methods_reservation.clear();

                    window.location.href = "/thank-you";

                    /*
                     * Reload schedule if it has been changed after the reservation was made.
                     */
//                            methods_calendar.display();
//                            methods_components.init();
                });

                  }
                };

                var $form = $("#DOPBCPCalendar-form1");

                var stripe = Stripe.card.createToken($form, stripeResponseHandler);
               
            },
            toggleMessages:function(message,
                                    display,
                                    type){
            /*
             * Toggle order messages.
             * 
             * @param message (String): the message to be displayed
             * @param display (String): CSS display value
             *                          "block" display message
             *                          "none" hide message
             * @param type (String): message type
             *                       "dopbcp-error" error message
             *                       "dopbcp-success" success message
             */                            
                display = display === undefined ? 'block':display;
                type = type === undefined ? 'dopbcp-error':type;
                
                $('#DOPBCPCalendar-order'+ID+' .dopbcp-message').html(message)
                                                                .removeClass('dopbcp-success')
                                                                .removeClass('dopbcp-error')
                                                                .addClass(type)
                                                                .css('display', display);
            }
        },  

// ***************************************************************************** Prototypes
        
// 23. Prototypes

        prototypes = {
// Actions                  
            doHiddenBuster:function(item){
            /*
             * Make all parents & current item visible.
             * 
             * @param item (element): item for which all parens are going to be made visible
             * 
             * @return list of parents
             */
                var parent = item.parent(),
                items = new Array();

                if (item.prop('tagName') !== undefined 
                        && item.prop('tagName').toLowerCase() !== 'body'){
                    items = prototypes.doHiddenBuster(parent);
                }

                if (item.css('display') === 'none'){
                    item.css('display', 'block');
                    items.push(item);
                }

                return items;
            },
            undoHiddenBuster:function(items){
            /*
             * Hide all items from list. The list is returned by function doHiddenBuster().
             * 
             * @param items (Array): list of items to be hidden
             */    
                var i;

                for (i=0; i<items.length; i++){
                    items[i].css('display', 'none');
                }
            },
            openLink:function(url,
                              target){
            /*
             * Open a link.
             * 
             * @param url (String): link URL
             * @param target (String): link target (_blank, _parent, _self, _top)
             */
                switch (target.toLowerCase()){
                    case '_blank':
                        window.open(url);
                        break;
                    case '_parent':
                        parent.location.href = url;
                        break;
                    case '_top':
                        top.location.href = url;
                        break;
                    default:    
                        window.location = url;
                }
            },
            randomizeArray:function(theArray){
            /*
             * Randomize the items of an array.
             * 
             * @param theArray (Array): the array to be mixed
             * 
             * return array with mixed items
             */
                theArray.sort(function(){
                    return 0.5-Math.random();
                });
                return theArray;
            },
            scrollToY:function(position,
                               speed){
            /*
             * Scroll vertically to position.
             * 
             * @param position (Number): position to scroll to
             * @param speed (Number): scroll speed 
             */  
                speed = speed !== undefined ? speed: 300;

                $('html').stop(true, true)
                         .animate({'scrollTop': position}, 
                                  speed);
                $('body').stop(true, true)
                         .animate({'scrollTop': position}, 
                                  speed);
            },
            touchNavigation:function(parent,
                                     child){
            /*
             * One finger navigation for touchscreen devices.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             */
                var prevX, 
                prevY, 
                currX, 
                currY, 
                touch, 
                childX, 
                childY;

                parent.bind('touchstart', function(e){
                    touch = e.originalEvent.touches[0];
                    prevX = touch.clientX;
                    prevY = touch.clientY;
                });

                parent.bind('touchmove', function(e){                                
                    touch = e.originalEvent.touches[0];
                    currX = touch.clientX;
                    currY = touch.clientY;
                    childX = currX>prevX ? parseInt(child.css('margin-left'))+(currX-prevX):parseInt(child.css('margin-left'))-(prevX-currX);
                    childY = currY>prevY ? parseInt(child.css('margin-top'))+(currY-prevY):parseInt(child.css('margin-top'))-(prevY-currY);

                    if (childX < (-1)*(child.width()-parent.width())){
                        childX = (-1)*(child.width()-parent.width());
                    }
                    else if (childX > 0){
                        childX = 0;
                    }
                    else{                                    
                        e.preventDefault();
                    }

                    if (childY < (-1)*(child.height()-parent.height())){
                        childY = (-1)*(child.height()-parent.height());
                    }
                    else if (childY > 0){
                        childY = 0;
                    }
                    else{                                    
                        e.preventDefault();
                    }

                    prevX = currX;
                    prevY = currY;

                    if (parent.width() < child.width()){
                        child.css('margin-left', childX);
                    }

                    if (parent.height() < child.height()){
                        child.css('margin-top', childY);
                    }
                });

                parent.bind('touchend', function(e){
                    if (!prototypes.isChromeMobileBrowser()){
                        e.preventDefault();
                    }
                });
            },

// Browsers & devices
            isAndroid:function(){
            /*
             * Check if operating system is Android.
             * 
             * @return true/false
             */
                var isAndroid = false,
                agent = navigator.userAgent.toLowerCase();

                if (agent.indexOf('android') !== -1){
                    isAndroid = true;
                }
                return isAndroid;
            },
            isChromeMobileBrowser:function(){
            /*
             * Check if browser is Chrome on mobile..
             * 
             * @return true/false
             */
                var isChromeMobile = false,
                agent = navigator.userAgent.toLowerCase();

                if ((agent.indexOf('chrome') !== -1 
                                || agent.indexOf('crios') !== -1) 
                        && prototypes.isTouchDevice()){
                    isChromeMobile = true;
                }
                return isChromeMobile;
            },
            isIE8Browser:function(){
            /*
             * Check if browser is IE8.
             * 
             * @return true/false
             */
                var isIE8 = false,
                agent = navigator.userAgent.toLowerCase();

                if (agent.indexOf('msie 8') !== -1){
                    isIE8 = true;
                }
                return isIE8;
            },
            isIEBrowser:function(){
            /*
             * Check if browser is IE..
             * 
             * @return true/false
             */
                var isIE = false,
                agent = navigator.userAgent.toLowerCase();

                if (agent.indexOf('msie') !== -1){
                    isIE = true;
                }
                return isIE;
            },
            isTouchDevice:function(){
            /*
             * Detect touchscreen devices.
             * 
             * @return true/false
             */
                var os = navigator.platform;

                if (os.toLowerCase().indexOf('win') !== -1){
                    return window.navigator.msMaxTouchPoints;
                }
                else {
                    return 'ontouchstart' in document;
                }
            },

// Cookies
            deleteCookie:function(name,
                                  path,
                                  domain){
            /*
             * Delete cookie.
             * 
             * @param name (String): cookie name
             * @param path (String): cookie path
             * @param domain (String): cookie domain
             */
                if (prototypes.getCookie(name)){
                    document.cookie = name+'='+((path) ? ';path='+path:'')+((domain) ? ';domain='+domain:'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT';
                }
            },
            getCookie:function(name){
            /*
             * Get cookie.
             * 
             * @param name (String): cookie name
             */    
                var namePiece = name+"=",
                cookie = document.cookie.split(";"),
                i;

                for (i=0; i<cookie.length; i++){
                    var cookiePiece = cookie[i];

                    while (cookiePiece.charAt(0) === ' '){
                        cookiePiece = cookiePiece.substring(1, cookiePiece.length);            
                    } 

                    if (cookiePiece.indexOf(namePiece) === 0){
                        return unescape(cookiePiece.substring(namePiece.length, cookiePiece.length));
                    } 
                }
                return null;
            },
            setCookie:function(name,
                               value,
                               expire){
            /*
             * Set cookie.
             * 
             * @param name (String): cookie name
             * @param value (String): cookie value
             * @param expire (String): the number of days after which the cookie will expire
             */
                var expirationDate = new Date();

                expirationDate.setDate(expirationDate.getDate()+expire);
                document.cookie = name+'='+escape(value)+((expire === null) ? '': ';expires='+expirationDate.toUTCString())+';javahere=yes;path=/';
            },

// Date & time      
            getDatesDifference:function(date1,
                                        date2,
                                        type,
                                        valueType,
                                        noDecimals){
            /*
             * Returns difference between 2 dates.
             * 
             * @param date1 (Date): first date (YYYY-MM-DD)
             * @param date2 (Date): second date (YYYY-MM-DD)
             * @param type (String): diference type
             *                       "seconds"
             *                       "minutes"
             *                       "hours"
             *                       "days"
             * @param valueType (String): type of number returned
             *                            "float"
             *                            "integer"
             * @param noDecimals (Number): number of decimals returned with the float value (-1 to display all decimals)
             * 
             * @return dates diference
             */
                var y1 = date1.split('-')[0],
                m1 = date1.split('-')[1],
                d1 = date1.split('-')[2],
                y2 = date2.split('-')[0],
                m2 = date2.split('-')[1],
                d2 = date2.split('-')[2],
                time1 = (new Date(y1, m1-1, d1)).getTime(),
                time2 = (new Date(y2, m2-1, d2)).getTime(),
                diff = Math.abs(time1-time2);
        
                if (type === undefined){
                    type = 'seconds';
                }
                
                if (valueType === undefined){
                    valueType = 'float';
                }
                
                if (noDecimals === undefined){
                    noDecimals = -1;
                }
                
                switch (type){
                    case 'days':
                        diff = diff/(1000*60*60*24);
                        break;
                    case 'hours':
                        diff = diff/(1000*60*60);
                        break;
                    case 'minutes':
                        diff = diff/(1000*60);
                        break;
                    default:
                        diff = diff/(1000);
                }
                
                if (valueType === 'float'){
                    return noDecimals === -1 ? diff:prototypes.getWithDecimals(diff, noDecimals);
                }
                else{
                    return Math.ceil(diff);
                }
            },
            getNextDay:function(date){
            /*
             * Returns next day.
             * 
             * @param date (Date): current date (YYYY-MM-DD)
             * 
             * @return next day (YYYY-MM-DD)
             */
                var nextDay = new Date(),
                parts = date.split('-');

                nextDay.setFullYear(parts[0], parts[1], parts[2]);
                nextDay.setTime(nextDay.getTime()+86400000);

                return nextDay.getFullYear()+'-'+prototypes.getLeadingZero(nextDay.getMonth())+'-'+prototypes.getLeadingZero(nextDay.getDate());
            },
            getNoDays:function(date1,
                               date2){
            /*
             * Returns number of days between 2 dates.
             * 
             * @param date1 (Date): first date (YYYY-MM-DD)
             * @param date2 (Date): second date (YYYY-MM-DD)
             * 
             * @return number of days
             */
                var y1 = date1.split('-')[0],
                m1 = date1.split('-')[1],
                d1 = date1.split('-')[2],
                y2 = date2.split('-')[0],
                m2 = date2.split('-')[1],
                d2 = date2.split('-')[2],
                time1 = (new Date(y1, m1-1, d1)).getTime(),
                time2 = (new Date(y2, m2-1, d2)).getTime(),
                diff = Math.abs(time1-time2);
        
                return Math.round(diff/(1000*60*60*24))+1;
            },
            getPrevDay:function(date){
            /*
             * Returns previous day.
             * 
             * @param date (Date): current date (YYYY-MM-DD)
             * 
             * @return previous day (YYYY-MM-DD)
             */
                var previousDay = new Date(),
                parts = date.split('-');

                previousDay.setFullYear(parts[0],
                                        parseInt(parts[1])-1, 
                                        parts[2]);
                previousDay.setTime(previousDay.getTime()-86400000);

                return previousDay.getFullYear()+'-'+prototypes.getLeadingZero(previousDay.getMonth()+1)+'-'+prototypes.getLeadingZero(previousDay.getDate());                        
            },
            getToday:function(){
            /*
             * Returns today date.
             * 
             * @return today (YYYY-MM-DD)
             */    
                var today = new Date();
              
                return today.getFullYear()+'-'+prototypes.getLeadingZero(today.getMonth()+1)+'-'+prototypes.getLeadingZero(today.getDate());
            },
            getWeekDay:function(date){
            /*
             * Returns week day.
             * 
             * @param date (String): date for which the function get day of the week (YYYY-MM-DD)
             * 
             * @return week day index (0 for Sunday)
             */    
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                year = date.split('-')[0],
                month = date.split('-')[1],
                day = date.split('-')[2],
                newDate = new Date(eval('"'+day+' '+months[parseInt(month, 10)-1]+', '+year+'"'));

                return newDate.getDay();
            },

// Domains & URLs                        
            $_GET:function(name){
            /*
             * Parse a $_GET variable.
             * 
             * @param name (String): variable name
             * 
             * @return variable vaue or "undefined" if it doesn't exist
             */
                var url = window.location.href.split('?')[1],
                variables = url !== undefined ? url.split('&'):[],
                i; 

                for (i=0; i<variables.length; i++){
                    if (variables[i].indexOf(name) !== -1){
                        return variables[i].split('=')[1];
                        break;
                    }
                }

                return undefined;
            },
            acaoBuster:function(url){
            /*
             * Access-Control-Allow-Origin buster. Modifies URL to be the same as browser URL.
             * 
             * @param url (String): URL
             * 
             * @return modified URL
             */
                var browserURL = window.location.href,
                pathPiece1 = '', pathPiece2 = '';

                if (prototypes.getDomain(browserURL) === prototypes.getDomain(url)){
                    if (url.indexOf('https') !== -1 
                            || url.indexOf('http') !== -1){
                        if (browserURL.indexOf('http://www.') !== -1){
                            pathPiece1 = 'http://www.';
                        }
                        else if (browserURL.indexOf('http://') !== -1){
                            pathPiece1 = 'http://';
                        }
                        else if (browserURL.indexOf('https://www.') !== -1){
                            pathPiece1 = 'https://www.';
                        }
                        else if (browserURL.indexOf('https://') !== -1){
                            pathPiece1 = 'https://';
                        }

                        if (url.indexOf('http://www.') !== -1){
                            pathPiece2 = url.split('http://www.')[1];
                        }
                        else if (url.indexOf('http://') !== -1){
                            pathPiece2 = url.split('http://')[1];
                        }
                        else if (url.indexOf('https://www.') !== -1){
                            pathPiece2 = url.split('https://www.')[1];
                        }
                        else if (url.indexOf('https://') !== -1){
                            pathPiece2 = url.split('https://')[1];
                        }

                        return pathPiece1+pathPiece2;
                    }
                    else{
                        return url;
                    }
                }
                else{
                    return url;
                }
            },
            getDomain:function(url){
            /*
             * Get current domain.
             *
             * @param url (String): the URL from which the domain will be extracted
             *
             * @return current domain
             */ 
                var domain = url;

                /*
                 * Remove white spaces from the begining of the URL.
                 */
                domain = domain.replace(new RegExp(/^\s+/),"");

                /*
                 * Remove white spaces from the end of the URL.
                 */
                domain = domain.replace(new RegExp(/\s+$/),"");

                /*
                 * If found , convert back slashes to forward slashes.
                 */
                domain = domain.replace(new RegExp(/\\/g),"/");

                /*
                 * If there, removes "http://", "https://" or "ftp://" from the begining.
                 */
                domain = domain.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");

                /*
                 * If there, removes 'www.' from the begining.
                 */
                domain = domain.replace(new RegExp(/^www\./i),"");

                /*
                 * Remove complete string from first forward slash on.
                 */
                domain = domain.replace(new RegExp(/\/(.*)/),"");

                return domain;
            },
            hasSubdomain:function(url){
            /*
             * Check if current URL has a subdomain.
             *
             * @param url (String): URL that will be checked
             *
             * @return true/false
             */ 
                var subdomain;

                /*
                 * Remove white spaces from the begining of the URL.
                 */
                url = url.replace(new RegExp(/^\s+/),"");

                /*
                 * Remove white spaces from the end of the URL.
                 */
                url = url.replace(new RegExp(/\s+$/),"");

                /*
                 * If found , convert back slashes to forward slashes.
                 */
                url = url.replace(new RegExp(/\\/g),"/");

                /*
                 * If there, removes 'http://', 'https://' or 'ftp://' from the begining.
                 */
                url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");

                /*
                 * If there, removes 'www.' from the begining.
                 */
                url = url.replace(new RegExp(/^www\./i),"");

                /*
                 * Remove complete string from first forward slaash on.
                 */
                url = url.replace(new RegExp(/\/(.*)/),""); // 

                if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))){
                    /*
                     * Remove ".??.??" or ".???.??" from end - e.g. ".CO.UK", ".COM.AU"
                     */
                    url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i),"");
                }
                else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))){
                    /*
                     * Removes ".??" or ".???" or ".????" from end - e.g. ".US", ".COM", ".INFO"
                     */
                    url = url.replace(new RegExp(/\.[a-z]{2,4}$/i),"");
                }

                /*
                 * Check to see if there is a dot "." left in the string.
                 */
                subdomain = (url.match(new RegExp(/\./g))) ? true : false;

                return(subdomain);
            },

// Resize & position                        
            rp:function(parent,
                        child,
                        pw,
                        ph,
                        cw,
                        ch,
                        pos,
                        type){
            /*
             * Resize & position an item inside a parent.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): parent width
             * @param ph (Number): parent height
             * @param cw (Number): child width
             * @param ch (Number): child height
             * @param pos (String): set child position in parent (bottom, bottom-center, bottom-left, bottom-right, center, left, horizontal-center, middle-left, middle-right, right, top, top-center, top-left, top-right, vertical-center)
             * @param type (String): resize type
             *                       "fill" fill parent (child will be cropped)
             *                       "fit" child resize to fit in parent
             */
                var newW = 0,
                newH = 0;

                /*
                 * Resize child.
                 */
                if (cw <= pw 
                        && ch <= ph){
                    newW = cw;
                    newH = ch;
                }
                else{
                    switch (type){
                        case 'fill':
                            newH = ph;
                            newW = (cw*ph)/ch;

                            if (newW < pw){
                                newW = pw;
                                newH = (ch*pw)/cw;
                            }
                            break;
                        default:
                            newH = ph;
                            newW = (cw*ph)/ch;

                            if (newW > pw){
                                newW = pw;
                                newH = (ch*pw)/cw;
                            }
                            break;
                    }
                }

                child.width(newW);
                child.height(newH);

                /*
                 * Position child.
                 */
                switch(pos.toLowerCase()){
                    case 'bottom':
                        prototypes.rpBottom(parent,
                                            child, 
                                            ph);
                        break;
                    case 'bottom-center':
                        prototypes.rpBottomCenter(parent, 
                                                  child, 
                                                  pw, 
                                                  ph);
                        break;
                    case 'bottom-left':
                        prototypes.rpBottomLeft(parent, 
                                                child, 
                                                pw, 
                                                ph);
                        break;
                    case 'bottom-right':
                        prototypes.rpBottomRight(parent,
                                                 child, 
                                                 pw, 
                                                 ph);
                        break;
                    case 'center':
                        prototypes.rpCenter(parent, 
                                            child, 
                                            pw, 
                                            ph);
                        break;
                    case 'left':
                        prototypes.rpLeft(parent, 
                                          child, 
                                          pw);
                        break;
                    case 'horizontal-center':
                        prototypes.rpCenterHorizontally(parent, 
                                                        child, 
                                                        pw);
                        break;
                    case 'middle-left':
                        prototypes.rpMiddleLeft(parent, 
                                                child, 
                                                pw, 
                                                ph);
                        break;
                    case 'middle-right':
                        prototypes.rpMiddleRight(parent, 
                                                 child, 
                                                 pw, 
                                                 ph);
                        break;
                    case 'right':
                        prototypes.rpRight(parent, 
                                           child, 
                                           pw);
                        break;
                    case 'top':
                        prototypes.rpTop(parent, 
                                         child, 
                                         ph);
                        break;
                    case 'top-center':
                        prototypes.rpTopCenter(parent, 
                                               child, 
                                               pw, 
                                               ph);
                        break;
                    case 'top-left':
                        prototypes.rpTopLeft(parent, 
                                             child, 
                                             pw, 
                                             ph);
                        break;
                    case 'top-right':
                        prototypes.rpTopRight(parent, 
                                              child,
                                              pw, 
                                              ph);
                        break;
                    case 'vertical-center':
                        prototypes.rpCenterVertically(parent, 
                                                      child, 
                                                      ph);
                        break;
                }
            },
            rpBottom:function(parent,
                              child,
                              ph){
            /*
             * Position item on bottom.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param ph (Number): height to which the parent is going to be set
             */
                if (ph !== undefined){
                    parent.height(ph);
                }
                child.css('margin-top', parent.height()-child.height());
            },
            rpBottomCenter:function(parent,
                                    child,
                                    pw,
                                    ph){
            /*
             * Position item on bottom-left.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             * @param ph (Number): height to which the parent is going to be set
             */
                prototypes.rpBottom(parent, 
                                    child, 
                                    ph);
                prototypes.rpCenterHorizontally(parent, 
                                                child, 
                                                pw);
            },
            rpBottomLeft:function(parent,
                                  child,
                                  pw,
                                  ph){
            /*
             * Position item on bottom-left.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             * @param ph (Number): height to which the parent is going to be set
             */
                prototypes.rpBottom(parent, 
                                    child, 
                                    ph);
                prototypes.rpLeft(parent, 
                                  child, 
                                  pw);
            },
            rpBottomRight:function(parent,
                                   child,
                                   pw,
                                   ph){
            /*
             * Position item on bottom-left.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             * @param ph (Number): height to which the parent is going to be set
             */
                prototypes.rpBottom(parent, 
                                    child, 
                                    ph);
                prototypes.rpRight(parent, 
                                   child, 
                                   pw);
            },
            rpCenter:function(parent,
                              child,
                              pw,
                              ph){
            /*
             * Position item on center.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             * @param ph (Number): height to which the parent is going to be set
             */
                prototypes.rpCenterHorizontally(parent, 
                                                child, 
                                                pw);
                prototypes.rpCenterVertically(parent, 
                                              child, 
                                              ph);
            },
            rpCenterHorizontally:function(parent,
                                          child,
                                          pw){
            /*
             * Center item horizontally.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             */
                if (pw !== undefined){
                    parent.width(pw);
                }
                child.css('margin-left', (parent.width()-child.width())/2);
            },
            rpCenterVertically:function(parent,
                                        child,
                                        ph){
            /*
             * Center item vertically.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param ph (Number): height to which the parent is going to be set
             */
                if (ph !== undefined){
                    parent.height(ph);
                }
                child.css('margin-top', (parent.height()-child.height())/2);
            },
            rpLeft:function(parent,
                            child,
                            pw){
            /*
             * Position item on left.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             */
                if (pw !== undefined){
                    parent.width(pw);
                }
                child.css('margin-left', 0);
            },
            rpMiddleLeft:function(parent,
                                  child,
                                  pw,
                                  ph){
            /*
             * Position item on middle-left.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             * @param ph (Number): height to which the parent is going to be set
             */
                prototypes.rpCenterVertically(parent,
                                              child, 
                                              ph);
                prototypes.rpLeft(parent,
                                  child, 
                                  pw);
            },
            rpMiddleRight:function(parent,
                                   child,
                                   pw,
                                   ph){
            /*
             * Position item on middle-right.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             * @param ph (Number): height to which the parent is going to be set
             */
                prototypes.rpCenterVertically(parent,
                                              child, 
                                              ph);
                prototypes.rpRight(parent, 
                                   child, 
                                   pw);
            },
            rpRight:function(parent,
                             child,
                             pw){
            /*
             * Position item on right.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             */
                if (pw !== undefined){
                    parent.width(pw);
                }
                child.css('margin-left', parent.width()-child.width());
            },
            rpTop:function(parent,
                           child,
                           ph){
            /*
             * Position item on top.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param ph (Number): height to which the parent is going to be set
             */
                if (ph !== undefined){
                    parent.height(ph);
                }
                child.css('margin-top', 0);
            },
            rpTopCenter:function(parent,
                                 child,
                                 pw,
                                 ph){
            /*
             * Position item on top-center.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             * @param ph (Number): height to which the parent is going to be set
             */
                prototypes.rpTop(parent, 
                                 child, 
                                 ph);
                prototypes.rpCenterHorizontally(parent, 
                                                child, 
                                                pw);
            },
            rpTopLeft:function(parent,
                               child,
                               pw,
                               ph){
            /*
             * Position item on top-left.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             * @param ph (Number): height to which the parent is going to be set
             */
                prototypes.rpTop(parent, 
                                 child, 
                                 ph);
                prototypes.rpLeft(parent, 
                                  child, 
                                  pw);
            },
            rpTopRight:function(parent,
                                child,
                                pw,
                                ph){
            /*
             * Position item on top-right.
             * 
             * @param parent (element): parent item
             * @param child (element): child item
             * @param pw (Number): width to which the parent is going to be set
             * @param ph (Number): height to which the parent is going to be set
             */
                prototypes.rpTop(parent, 
                                 child, 
                                 ph);
                prototypes.rpRight(parent, 
                                   child, 
                                   pw);
            },

// Strings & numbers
            cleanInput:function(input,
                                allowedCharacters,
                                firstNotAllowed,
                                min){
            /*
             * Clean an input from unwanted characters.
             * 
             * @param input (element): the input to be checked
             * @param allowedCharacters (String): the string of allowed characters
             * @param firstNotAllowed (String): the character which can't be on the first position
             * @param min (Number/String): the minimum value that is allowed in the input
             * 
             * @return clean string
             */ 
                var characters = input.val().split(''),
                returnStr = '', 
                i, 
                startIndex = 0;

                /*
                 * Check first character.
                 */
                if (characters.length > 1
                        && characters[0] === firstNotAllowed){
                    startIndex = 1;
                }

                /*
                 * Check characters.
                 */
                for (i=startIndex; i<characters.length; i++){
                    if (allowedCharacters.indexOf(characters[i]) !== -1){
                        returnStr += characters[i];
                    }
                }

                /*
                 * Check the minimum value.
                 */
                if (min > returnStr){
                    returnStr = min;
                }

                input.val(returnStr);
            },
            getLeadingZero:function(no){
            /*
             * Adds a leading 0 if number smaller than 10.
             * 
             * @param no (Number): the number
             * 
             * @return number with leading 0 if needed
             */
                if (no < 10){
                    return '0'+no;
                }
                else{
                    return no;
                }
            },
            getRandomString:function(stringLength,
                                     allowedCharacters){
            /*
             * Creates a string with random characters.
             * 
             * @param stringLength (Number): the length of the returned string
             * @param allowedCharacters (String): the string of allowed characters
             * 
             * @return random string
             */
                var randomString = '',
                charactersPosition,
                i;

                allowedCharacters = allowedCharacters !== undefined ? allowedCharacters:'0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

                for (i=0; i<stringLength; i++){
                    charactersPosition = Math.floor(Math.random()*allowedCharacters.length);
                    randomString += allowedCharacters.substring(charactersPosition, charactersPosition+1);
                }
                return randomString;
            },
            getShortString:function(str,
                                    size){
            /*
             * Returns a part of a string followed by 3 dots.
             * 
             * @param str (String): the string
             * @param size (Number): the number of characters that will be displayed minus 3 dots
             * 
             * @return short string ...
             */
                var newStr = new Array(),
                pieces = str.split(''), i;

                if (pieces.length <= size){
                    newStr.push(str);
                }
                else{
                    for (i=0; i<size-3; i++){
                        newStr.push(pieces[i]);
                    }
                    newStr.push('...');
                }

                return newStr.join('');
            },
            getWithDecimals:function(number,
                                     no){
            /*
             * Returns a number with a predefined number of decimals.
             * 
             * @param number (Number): the number
             * @param no (Number): the number of decimals
             * 
             * @return string with number and decimals
             */
                no = no === undefined ? 2:no;
                return parseInt(number) === number ? String(number):parseFloat(number).toFixed(no);
            },
            validateCharacters:function(str,
                                        allowedCharacters){
            /*
             * Verify if a string contains allowed characters.
             * 
             * @param str (String): string to be checked
             * @param allowedCharacters (String): the string of allowed characters
             * 
             * @return true/false
             */
                var characters = str.split(''), i;

                for (i=0; i<characters.length; i++){
                    if (allowedCharacters.indexOf(characters[i]) === -1){
                        return false;
                    }
                }
                return true;
            },
            validEmail:function(email){
            /*
             * Email validation.
             * 
             * @param email (String): email to be checked
             * 
             * @return true/false
             */
                var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

                if (filter.test(email)){
                    return true;
                }
                return false;
            },
            stripSlashes:function(str){
            /*
             * Remove slashes from string.
             * 
             * @param str (String): the string
             * 
             * @return string without slashes
             */
                return (str + '').replace(/\\(.?)/g, function (s, n1){
                    switch (n1){
                        case '\\':
                            return '\\';
                        case '0':
                            return '\u0000';
                        case '':
                            return '';
                        default:
                            return n1;
                    }
                });
            },

// Styles
            getHEXfromRGB:function(rgb){
            /*
             * Convert RGB color to HEX.
             * 
             * @param rgb (String): RGB color
             * 
             * @return color HEX
             */
                var hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

                rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

                return (isNaN(rgb[1]) ? '00':hexDigits[(rgb[1]-rgb[1]%16)/16]+hexDigits[rgb[1]%16])+
                       (isNaN(rgb[2]) ? '00':hexDigits[(rgb[2]-rgb[2]%16)/16]+hexDigits[rgb[2]%16])+
                       (isNaN(rgb[3]) ? '00':hexDigits[(rgb[3]-rgb[3]%16)/16]+hexDigits[rgb[3]%16]);
            },
            getIdealTextColor:function(bgColor){
            /*
             * Set text color depending on the background color.
             * 
             * @param bgColor(String): background color
             * 
             * return white/black
             */
                var rgb = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(bgColor);

                if (rgb !== null){
                    return parseInt(rgb[1], 10)+parseInt(rgb[2], 10)+parseInt(rgb[3], 10) < 3*256/2 ? 'white' : 'black';
                }
                else{
                    return parseInt(bgColor.substring(0, 2), 16)+parseInt(bgColor.substring(2, 4), 16)+parseInt(bgColor.substring(4, 6), 16) < 3*256/2 ? 'white' : 'black';
                }
            }
        };

        return methods.init.apply(this);
    };
})(jQuery);
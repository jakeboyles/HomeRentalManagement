
/*
* Title                   : Booking Calendar PRO (jQuery Plugin)
* Version                 : 2.0
* File                    : jquery.dop.BackendBookingCalendarPRO.js
* File Version            : 2.0
* Created / Last Modified : 29 September 2014
* Author                  : Dot on Paper
* Copyright               : © 2011 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Booking Calendar PRO Back End jQuery plugin.
*/

(function($){
    $.fn.DOPBackendBookingCalendarPRO = function(options){
        /*
         * Private variables.
         */
        var Data = {'AddMonthViewText': 'Add month view',
                    'AvailableLabel': 'Number available',
                    'AvailableOneText': 'available',
                    'AvailableText': 'available',
                    'BookedText': 'booked',
                    'Currency': '$',
                    'CurrencyPosition': 'before',
                    'DateEndLabel': 'End date',
                    'DateStartLabel': 'Start date',
                    'DateType': 1,
                    'GroupDaysLabel': 'Group days',
                    'ID': 0,
                    'InfoLabel': 'Information (users will see this message)',
                    'MaxYear': new Date().getFullYear(),
                    'NextMonthText': 'Next month',
                    'NotesLabel': 'Notes (only you will see this message)',
                    'PreviousMonthText': 'Previous Month',
                    'PriceLabel': 'Price',
                    'PromoLabel': 'Promo price',
                    'reinitialize': false,
                    'RemoveMonthViewText': 'Remove month view',
                    'ResetConfirmation': 'Are you sure you want to reset data? If you reset days data from those days will be reset to.',
                    'SetDaysAvailabilityLabel': 'Set days availability',
                    'StatusAvailableText': 'Available',
                    'StatusBookedText': 'Booked',
                    'StatusLabel': 'Status',
                    'StatusSpecialText': 'Special',
                    'StatusUnavailableText': 'Unavailable',
                    'UnavailableText': 'unavailable',
                    'LoadedText': 'Calendar data loaded successfully',
                    'SavedText': 'Calendar data saved successfully',
                    'SavingText': 'Saving calendar...',
                    'LoadingText': 'Loading calendar...',
                    'loadURL': 'dopbcp/php-file/load.php',
                    'saveURL': 'dopbcp/php-file/save.php',
                    "form": {"data": {"style":5},
                             "text": {'submit': 'Submit',
                                      'reset': 'Reset'}},
                    "days": {"data": {"available": [true, true, true, true, true, true, true],
                                      "first": 1},
                             "text": {"names": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                      "shortNames": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}},
                    "months": {"data": {"no": 1},
                               "text": {"names": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                        "shortNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}}},
        Container = this,

        Schedule = {},

        StartDate = new Date(),
        StartYear = StartDate.getFullYear(),
        StartMonth = StartDate.getMonth()+1,
        StartDay = StartDate.getDate(),
        CurrYear = StartYear,
        CurrMonth = StartMonth,

        AddMonthViewText = 'Add month view',
        AvailableDays = [true, true, true, true, true, true, true],
        AvailableLabel = 'Number available',
        AvailableOneText = 'available',
        AvailableText = 'available',
        BookedText = 'booked',
        Currency = '$',
        CurrencyPosition = 'before',
        DateEndLabel = 'End date',
        DateStartLabel = 'Start date',
        DateType = 1,
        DayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        FirstDay = 1,
        GroupDaysLabel = 'Group days',
        ID = 0,
        InfoLabel = 'nformation (users will see this message)',
        MaxYear = new Date().getFullYear(),
        MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        NextMonthText = 'Next month',
        NotesLabel = 'Notes (only you will see this message)',
        PreviousMonthText = 'Previous month',
        PriceLabel = 'Price',
        PromoLabel = 'Promo',
        RemoveMonthViewText = 'Remove month view',
        ResetConfirmation =  'Are you sure you want to reset data? If you reset days data from those days will be reset to.',
        SetDaysAvailabilityLabel = 'Set days availability',
        StatusAvailableText = 'Available',
        StatusBookedText = 'Booked',
        StatusLabel = 'Status',
        StatusSpecialText = 'Special',
        StatusUnavailableText = 'Unavailable',
        UnavailableText = 'unavailable',
        loadURL = 'dopbcp/php-file/load.php',
        saveURL = 'dopbcp/php-file/save.php',
        LoadedText =  Data['LoadedText'],
        SavedText =  Data['SavedText'],
        LoadingText =  Data['LoadingText'],
        SavingText =  Data['SavingText'],
        
        showCalendar = true,
        firstYearLoaded = false,
        MessagesTimeout = 0;

        var noMonths = $.trim(Data['months']['data']['no']),
        dayStartSelection,
        dayEndSelection,
        dayFirstSelected = false,
        dayTimeDisplay = false,
        dayStartSelectionCurrMonth,
        dayNo = 0,
        
        yearStartSave,
        monthStartSave,
        yearEndSave,
        monthEndSave,

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
                        $(window).bind('resize', methods.rp);
                    }
                });
            },
            parse:function(){
            /*
             * Parse jQuery plugin options.
             */    
                
                methods_days.data = Data['days']['data'];
                methods_days.text = Data['days']['text'];
                
                methods_months.data = Data['months']["data"];
                methods_months.text = Data['months']["text"];
                
                AddMonthViewText = Data['AddMonthViewText'];
                methods_days.data['available'][0] = methods_days.data['available'][0] === "true" ? true:false;
                methods_days.data['available'][1] = methods_days.data['available'][1] === "true" ? true:false;
                methods_days.data['available'][2] = methods_days.data['available'][2] === "true" ? true:false;
                methods_days.data['available'][3] = methods_days.data['available'][3] === "true" ? true:false;
                methods_days.data['available'][4] = methods_days.data['available'][4] === "true" ? true:false;
                methods_days.data['available'][5] = methods_days.data['available'][5] === "true" ? true:false;
                methods_days.data['available'][6] = methods_days.data['available'][6] === "true" ? true:false;
                AvailableLabel = Data['AvailableLabel'];
                AvailableOneText = Data['AvailableOneText'];
                AvailableText = Data['AvailableText'];
                BookedText = Data['BookedText'];
                Currency = Data['Currency'];
                CurrencyPosition = Data['CurrencyPosition'];
                DateEndLabel = Data['DateEndLabel'];
                DateStartLabel = Data['DateStartLabel'];
                DateType = Data['DateType'];
                DayNames = Data['days']['text']['shortNames'];
                FirstDay = methods_days.data['first'];
                GroupDaysLabel = Data['GroupDaysLabel'];
                ID = Data['ID'];
                InfoLabel = Data['InfoLabel'];
                MaxYear = Data['MaxYear'];
                MonthNames = methods_months.text['names'];
                NextMonthText = Data['NextMonthText'];
                NotesLabel = Data['NotesLabel'];
                PreviousMonthText = Data['PreviousMonthText'];
                PriceLabel = Data['PriceLabel'];
                PromoLabel = Data['PromoLabel'];
                RemoveMonthViewText = Data['RemoveMonthViewText'];
                ResetConfirmation = Data['ResetConfirmation'];
                SetDaysAvailabilityLabel = Data['SetDaysAvailabilityLabel'];
                StatusAvailableText = Data['StatusAvailableText'];
                StatusBookedText = Data['StatusBookedText'];
                StatusLabel = Data['StatusLabel'];
                StatusSpecialText = Data['StatusSpecialText'];
                StatusUnavailableText = Data['StatusUnavailableText'];
                UnavailableText = Data['UnavailableText'];
                saveURL = prototypes.acaoBuster(Data['saveURL']);
                loadURL = prototypes.acaoBuster(Data['loadURL']);
                
                methods_form.data = Data['form']['data'];
                methods_form.text = Data['form']['text'];
                
                Container.html('<div class="dopbcp-loader"></div>');
                
                methods_schedule.parse();
            },
            doMetaboxHideBuster:function(){
            /*
             * If post meta box is closed, open it before resize.
             * 
             * @return true/false
             */
                if ($('#dopsbsp-custom-post-meta').hasClass('closed')){
                    $('#dopsbsp-custom-post-meta').removeClass('closed');
                    return true;
                }
                else{
                    return false;
                }
            },
            undoMetaboxHideBuster:function(wasHidden){
            /*
             * If post meta box is closed, close it after resize.
             * 
             * @param wasHidden (Boolean): true if meta box was closed
             */
                if (wasHidden){
                    $('#dopsbsp-custom-post-meta').addClass('closed');
                }
            },
            externalCheck:function(){
                    /*
                     * Check for changes outside the calendar's jQuery plugin that might affect the calendar.
                     */    
                        if ($('#DOPBCP-calendar-jump-to-day').val() !== '' && typeof $('#DOPBCP-calendar-jump-to-day').val() !== 'undefined'){
                            var date = $('#DOPBCP-calendar-jump-to-day').val(),
                            year = parseInt(date.split('-')[0], 10),
                            month = parseInt(date.split('-')[1], 10);

                            $('#DOPBCP-calendar-jump-to-day').val('');
                            methods_calendar.init(StartYear,
                                                  (year-StartYear)*12+month);

                            $('html').animate({scrollTop: 0}, 600, function(){
                                $('#'+ID+'_'+date).addClass('day-jump');

                                setTimeout(function(){
                                    $('#'+ID+'_'+date).removeClass('day-jump');
                                }, 1200);
                            });
                        }

                        if ($('#DOPBCP-calendar-jump-to-day').val() !== ''){
                            $('#DOPBCP-calendar-jump-to-day').val('');
                            showCalendar = true;
                            firstYearLoaded = false;
                            methods_message.init('active', 
                                                  LoadingText);
                            methods_schedule.parse(new Date().getFullYear());
                        }
                    },
            rp:function(){
            /*
             * Initialize calendar resize & position. Used for responsive feature.
             */
                /*
                 * Resize & position the sidebar first.
                 */
                methods_form.rp();
                methods_calendar.container.rp();
//                methods_calendar.navigation.rp();
                methods_calendar.initNavigationRP();
                methods_day.rp();
            }
        },
                
// Calendar                
        methods_calendar = {
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
                var HTML = new Array(),
                no;
        
                // Calendar
                HTML.push('<div class="DOPBCPCalendar-container">');                        
                HTML.push('    <div class="DOPBCPCalendar-navigation">');
                HTML.push('        <a href="javascript:void(0)" class="add-btn"><span class="info">'+AddMonthViewText+'</span></a>');                        
                HTML.push('        <a href="javascript:void(0)" class="remove-btn"><span class="info">'+RemoveMonthViewText+'</span></a>');
                HTML.push('        <a href="javascript:void(0)" class="next-btn"><span class="info">'+NextMonthText+'</span></a>');
                HTML.push('        <a href="javascript:void(0)" class="previous-btn"><span class="info">'+PreviousMonthText+'</span></a>');
                HTML.push('        <div class="dopbcp-month-year"></div>');
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
                HTML.push('</div>');
                HTML.push('<div id="DOPBCP-form'+ID+'" class="DOPBCP-form dopbcp-sidebar">');
                HTML.push(' <div class="dopbcp-sidebar-content">');
                HTML.push('     <div class="dopbcp-input-wrapper">');
                HTML.push('         <label for="DOPBCP-start-date-view'+ID+'">'+DateStartLabel+'</label>');
                HTML.push('         <input type="text" name="DOPBCP-start-date-view'+ID+'" id="DOPBCP-start-date-view'+ID+'" value="" />');
                HTML.push('         <input type="hidden" name="DOPBCP-start-date'+ID+'" id="DOPBCP-start-date'+ID+'" value="" />');
                HTML.push('     </div>');
                HTML.push('     <div class="dopbcp-input-wrapper">');
                HTML.push('         <label for="DOPBCP-end-date-view'+ID+'">'+DateEndLabel+'</label>');
                HTML.push('         <input type="text" name="DOPBCP-end-date-view'+ID+'" id="DOPBCP-end-date-view'+ID+'" value="" disabled="disabled"/>');
                HTML.push('         <input type="hidden" name="DOPBCP-end-date'+ID+'" id="DOPBCP-end-date'+ID+'" value="" />');
                HTML.push('     </div>');
                HTML.push(' </div>');
                HTML.push('</div>');
                
                Container.append(HTML.join(''));
                $('.DOPBCPCalendar-tooltip').remove();
                $('body').append('<div class="DOPBCPCalendar-tooltip" id="DOPBCPCalendar-tooltip'+ID+'"></div>');

                no = FirstDay-1;

                $('.DOPBCPCalendar-navigation .week .day', Container).each(function(){
                    no++;

                    if (no === 7){
                        no = 0;
                    }
                    $(this).html(DayNames[no]);
                });

                methods_calendar.initSettings();
            },
            initSettings:function(){
            /*
             * Initialize calendar settings.
             */    
                //methods.externalCheck();
                methods_tooltip.init();
                methods_calendar.container.init();
                methods_calendar.initNavigation();
                methods_calendar.init(StartYear,
                                      StartMonth);
                                      
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
                methods_calendar.vars.startDate = new Date(new Date().getTime());
                methods_calendar.vars.currMonth = methods_calendar.vars.startDate.getMonth()+1;
                methods_calendar.vars.currYear = methods_calendar.vars.startDate.getFullYear();
                methods_calendar.vars.startDay = methods_calendar.vars.startDate.getDate();
                methods_calendar.vars.startMonth = methods_calendar.vars.startDate.getMonth()+1;
                methods_calendar.vars.startYear = methods_calendar.vars.startDate.getFullYear(); 
                
                methods_form.initDatepicker('#DOPBCP-start-date-view'+ID,
                                            '#DOPBCP-start-date'+ID);
                                                
                methods_form.initDatepicker('#DOPBCP-end-date-view'+ID,
                                            '#DOPBCP-end-date'+ID);
                                            
                methods_day.rp();
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
                            || (methods_form.data['style'] === 1
                                    && Container.width() < 900)
                            || methods_form.data['style'] === 2
                            || methods_form.data['style'] === 3
                            || (methods_form.data['style'] === 4
                                    && Container.width() < 660)
                            || (methods_form.data['style'] === 5
                                    && Container.width() < 800)){
                        
                        
                        
                        if (methods_form.data['style'] === 5){                  
                            $('.DOPBCP-form', Container).removeAttr('style');            
                        }
                        
                        if (Container.width() < 600) {
                            $('.DOPBCPCalendar-container', Container).width(Container.width());
                            $('.DOPBCP-form', Container).width(Container.width());    
                        } else {
                            $('.DOPBCPCalendar-container', Container).width(Container.width()-263);
                            $('.DOPBCP-form', Container).width(parseInt(240));   
                        }
                        
                        if(parseInt($('.DOPBCP-form', Container).width()) !== 240 ){
                            $('.DOPBCP-form', Container).css({'marginLeft':'0px'});
                        } else {
                            $('.DOPBCP-form', Container).css({'marginLeft':'20px'});
                        }
                    }
                    else{
                        if (methods_form.data['style'] === 5){
                            $('.DOPBCPCalendar-container', Container).width((Container.width()-263));                            
                            $('.DOPBCP-form', Container).width(240);                            
                        }
                        else{
                            $('.DOPBCPCalendar-container', Container).width((Container.width()-263));
                            $('.DOPBCP-form', Container).width(240);
                        }
                    }

                    prototypes.undoHiddenBuster(hiddenBustedItems);
                }
            },
            initNavigation:function(){
            /*
             * Initialize calendar navigation.
             */
                var wasHidden = methods.doMetaboxHideBuster();

                $('.DOPBCPCalendar-navigation .dopbcp-week .dopbcp-day', Container).width(parseInt(($('.DOPBCPCalendar-navigation .dopbcp-week', Container).width()-parseInt($('.DOPBCPCalendar-navigation .dopbcp-week', Container).css('padding-left'))+parseInt($('.DOPBCPCalendar-navigation .dopbcp-week', Container).css('padding-right')))/7));
                methods.undoMetaboxHideBuster(wasHidden);
                methods_calendar.events();
                methods_calendar.initNavigationRP();
            },
            initNavigationRP:function(){
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
            init:function(year,
                          month){
            /*
             * Initialize calendar.
             * 
             * @param year (Number): year to be displayed
             * @param month (Number): month to be displayed
             */
                var i;
                
                CurrYear = new Date(year, month, 0).getFullYear();
                CurrMonth = parseInt(month, 10);    
                
                methods_calendar.vars.currYear = CurrYear;
                methods_calendar.vars.currMonth = CurrMonth;

                $('.DOPBCPCalendar-navigation .dopbcp-month-year', Container).html(MonthNames[(CurrMonth%12 !== 0 ? CurrMonth%12:12)-1]+' '+CurrYear);                        
                $('.DOPBCPCalendar-calendar', Container).html('');                        
                
                for (i=1; i<=noMonths; i++){
                    methods_month.display(CurrYear,
                                          month = month%12 !== 0 ? month%12:12,
                                          i);
                    month++;

                    if (month % 12 === 1){
                        CurrYear++;
                        month = 1;
                    }                            
                }
                
                methods_day.rp();
            },
            events:function(){
            /*
             * Initialize calendar events.
             */    
                /*
                 * Previous button event.
                 */
                $('.DOPBCPCalendar-navigation .previous-btn', Container).unbind('click touchstart');
                $('.DOPBCPCalendar-navigation .previous-btn', Container).bind('click touchstart', function(){
                    methods_calendar.init(StartYear,
                                          CurrMonth-1);

                    if (CurrMonth === StartMonth){
                        $('.DOPBCPCalendar-navigation .previous-btn', Container).css('display', 'none');
                    }
                });

                /*
                 * Next button event.
                 */
                $('.DOPBCPCalendar-navigation .next-btn', Container).unbind('click touchstart');
                $('.DOPBCPCalendar-navigation .next-btn', Container).bind('click touchstart', function(){
                    methods_calendar.init(StartYear,
                                          CurrMonth+1);
                    $('.DOPBCPCalendar-navigation .previous-btn', Container).css('display', 'block');
                });

                /*
                 * Add button event.
                 */
                $('.DOPBCPCalendar-navigation .add-btn', Container).unbind('click touchstart');
                $('.DOPBCPCalendar-navigation .add-btn', Container).bind('click touchstart', function(){
                    methods_form.clear();
                    noMonths++;
                    methods_months.vars.no++;
                    methods_calendar.init(StartYear,
                                          CurrMonth);
                                                   
                    if (noMonths >= methods_months.vars.maxAllowed){
                        $('.DOPBCPCalendar-navigation .add-btn', Container).css('display', 'none');
                        $('.DOPBCPCalendar-navigation .remove-btn', Container).addClass('no-add');
                    }
                    $('.DOPBCPCalendar-navigation .remove-btn', Container).css('display', 'block');
                    
                    prototypes.scrollToY($('.DOPBCPCalendar-calendar', Container).offset().top+$('.DOPBCPCalendar-calendar', Container).height()-$(window).height()+10);
                });

                /*
                 * Remove button event.
                 */
                $('.DOPBCPCalendar-navigation .remove-btn', Container).unbind('click touchstart');
                $('.DOPBCPCalendar-navigation .remove-btn', Container).bind('click touchstart', function(){
                    methods_form.clear();
                    noMonths--;
                    methods_months.vars.no--;
                    methods_calendar.init(StartYear, 
                                          CurrMonth);

                    if (methods_months.vars.no < methods_months.vars.maxAllowed){
                            $('.DOPBCPCalendar-navigation .add-btn', Container).css('display', 'block');
                            $('.DOPBCPCalendar-navigation .remove-btn', Container).removeClass('no-add');
                        }
                        
                        if(methods_months.vars.no === 1){
                            $('.DOPBCPCalendar-navigation .remove-btn', Container).css('display', 'none');
                        }
                        
                        prototypes.scrollToY($('.DOPBCPCalendar-calendar', Container).offset().top+$('.DOPBCPCalendar-calendar', Container).height()-$(window).height()+10);
                });
            }
        },
                
// Months
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
                var i,
                d, 
                cyear, 
                cmonth, 
                cday, 
                start, 
                totalDays = 0,
                noDays = new Date(year, month, 0).getDate(),
                noDaysPreviousMonth = new Date(year, month-1, 0).getDate(),
                firstDay = new Date(year, month-1, 2-FirstDay).getDay(),
                lastDay = new Date(year, month-1, noDays-FirstDay+1).getDay(),
                monthHTML = new Array(), 
                day = methods_day.default();

                dayNo = 0;

                if (position > 1){
                    monthHTML.push('<div class="DOPBCPCalendar-month-year">'+MonthNames[(month%12 !== 0 ? month%12:12)-1]+' '+year+'</div>');
                }
                monthHTML.push('<div class="DOPBCPCalendar-month" id="DOPBCPCalendar-backend-month-'+ID+'-'+position+'">');

                /*
                 * Display previous month days.
                 */
                if (firstDay === 0){
                    start = 7;
                }
                else{
                    start = firstDay;
                }
                
                for (i=start-1; i>=1; i--){
                    totalDays++;

                    d = new Date(year, month-2, noDaysPreviousMonth-i+1);
                    cyear = d.getFullYear();
                    cmonth = DOPPrototypes.getLeadingZero(d.getMonth()+1);
                    cday = DOPPrototypes.getLeadingZero(d.getDate());
                    day = Schedule[cyear+'-'+cmonth+'-'+cday] !== undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods_day.default(DOPPrototypes.getWeekDay(cyear+'-'+cmonth+'-'+cday));

                    if (StartYear === year 
                            && StartMonth === month){
                        monthHTML.push(methods_day.display('past-day', 
                                                           ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                           d.getDate(), 
                                                           '',
                                                           '',
                                                           '',
                                                           '', 
                                                           '', 
                                                           '', 
                                                           'none'));            
                    }
                    else{
                        monthHTML.push(methods_day.display('last-month'+(position>1 ?  ' mask':''), 
                                                           position>1 ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_last':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                           d.getDate(), 
                                                           day['available'], 
                                                           day['bind'], 
                                                           day['info'], 
                                                           day['notes'], 
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
                    cmonth = DOPPrototypes.getLeadingZero(d.getMonth()+1);
                    cday = DOPPrototypes.getLeadingZero(d.getDate());
                    day = Schedule[cyear+'-'+cmonth+'-'+cday] !== undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods_day.default(DOPPrototypes.getWeekDay(cyear+'-'+cmonth+'-'+cday));

                    if (StartYear === year 
                            && StartMonth === month 
                            && StartDay > d.getDate()){
                        
                        monthHTML.push(methods_day.display('past-day', 
                                                           ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                           d.getDate(), 
                                                           '', 
                                                           '', 
                                                           '', 
                                                           '', 
                                                           '', 
                                                           '', 
                                                           'none'));    
                    }
                    else{
                        monthHTML.push(methods_day.display('curr-month', 
                                                           ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                           d.getDate(), 
                                                           day['available'], 
                                                           day['bind'], 
                                                           day['info'], 
                                                           day['notes'], 
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
                    cmonth = DOPPrototypes.getLeadingZero(d.getMonth()+1);
                    cday = DOPPrototypes.getLeadingZero(d.getDate());
                    day = Schedule[cyear+'-'+cmonth+'-'+cday] !== undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods_day.default(DOPPrototypes.getWeekDay(cyear+'-'+cmonth+'-'+cday));

                    monthHTML.push(methods_day.display('next-month'+(position<noMonths ?  ' hide':''), 
                                                       position<noMonths ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_next':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                       d.getDate(), 
                                                       day['available'], 
                                                       day['bind'], 
                                                       day['info'], 
                                                       day['notes'], 
                                                       day['price'], 
                                                       day['promo'], 
                                                       day['status']));
                }
                monthHTML.push('</div>');

                $('.DOPBCPCalendar-calendar', Container).append(monthHTML.join(''));

                methods_day.customize();                        
                methods_day.events();
            }
        },             
                   
// Days               
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

                if(id.indexOf("_") === -1) {
                    id = ID+'_'+id;
                }
                
                if(methods_days.vars.selectionStart.indexOf("_") === -1) {
                    methods_days.vars.selectionStart = ID+'_'+methods_days.vars.selectionStart;
                }
                
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
                                    $day.addClass('selected');

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
                                    $day.addClass('selected');

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
                $('.DOPBCPCalendar-day', Container).removeClass('selected')
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
            }
        },
                
        methods_day = {
            display:function(type,
                             id,
                             day,
                             available,
                             bind,
                             info,
                             notes,
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
             * @param notes (String): day admin notes
             * @param price (Number): day price
             * @param promo (Number): day promotional price
             * @param status (String): day status (available, booked, special, unavailable)
             * 
             * @retun day HTML
             */
                var dayHTML = Array(),
                contentLine1 = '&nbsp;', 
                contentLine2 = '&nbsp;';
                
                dayNo++;

                if (price > 0 
                        && (bind === 0 
                                || bind === 1)){
                    contentLine1 = CurrencyPosition === 'before' ? Currency+DOPPrototypes.getWithDecimals(price, 2):DOPPrototypes.getWithDecimals(price, 2)+Currency;
                }

                if (promo > 0 
                        && (bind === 0 
                                || bind === 1)){
                    contentLine1 = CurrencyPosition === 'before' ? Currency+DOPPrototypes.getWithDecimals(promo, 2):DOPPrototypes.getWithDecimals(promo, 2)+Currency;
                }

                if (type !== 'past-day'){
                    switch (status){
                        case 'available':
                            type += ' available';

                            if (bind === 0 
                                    || bind === 1){
                                if (available > 1){
                                    contentLine2 = available+' '+'<span class="dopbcp-no-available-text">'+AvailableText+'</span>';
                                }
                                else if (available === 1){
                                    contentLine2 = available+' '+'<span class="dopbcp-no-available-text">'+AvailableOneText+'</span>';
                                }
                                else{
                                    contentLine2 = '<span class="dopbcp-text">'+AvailableOneText+'</span>';
                                }
                            }
                            break;
                        case 'booked':
                            type += ' booked';

                            if (bind === 0 
                                    || bind === 1){
                                contentLine2 = '<span class="dopbcp-no-available-text">'+BookedText+'</span>';
                            }
                            break;
                        case 'special':
                            type += ' special';

                            if (bind === 0 
                                    || bind === 1){
                                if (available > 1){
                                    contentLine2 = available+' '+'<span class="dopbcp-no-available-text">'+AvailableText+'</span>';
                                }
                                else if (available === 1){
                                    contentLine2 = available+' '+'<span class="dopbcp-no-available-text">'+AvailableOneText+'</span>';
                                }
                                else{
                                    contentLine2 = '<span class="dopbcp-text">'+AvailableOneText+'</span>';
                                }
                            }
                            break;
                        case 'unavailable':
                            type += ' unavailable';

                            if (bind === 0 
                                    || bind === 1){
                                contentLine2 = '<span class="dopbcp-no-available-text">'+UnavailableText;  
                            }
                            break;
                    }
                }

                if (dayNo % 7 === 1){
                    type += ' first-column';
                }

                if (dayNo % 7 === 0){
                    type += ' last-column';
                }

                dayHTML.push('<div class="DOPBCPCalendar-day '+type+'" id="'+id+'">');
                dayHTML.push('  <div class="bind-left'+(bind === 2 || bind === 3 ? '  enabled':'')+'">');
                dayHTML.push('      <div class="header">&nbsp;</div>');
                dayHTML.push('      <div class="content">&nbsp;</div>');
                dayHTML.push('  </div>');                        
                dayHTML.push('  <div class="bind-content group'+bind+'">');
                dayHTML.push('      <div class="header">');
                dayHTML.push('          <div class="day">'+day+'</div>');

                if (notes !== '' 
                        && type.indexOf('past-day') === -1 
                        && (bind === 0 
                                || bind === 3)){
                    dayHTML.push('          <div class="notes" id="'+id+'_notes"></div>');
                }   

                if (info !== '' 
                        && type.indexOf('past-day') === -1 
                        && (bind === 0 
                                || bind === 3)){
                    dayHTML.push('          <div class="info" id="'+id+'_info"></div>');
                }
                dayHTML.push('      </div>');
                dayHTML.push('      <div class="content">');
                dayHTML.push('          <div class="price">'+contentLine1+'</div>');

                if (promo > 0 
                        && (bind === 0 
                                || bind === 1)){
                    dayHTML.push('          <div class="old-price">'+(CurrencyPosition === 'before' ? Currency+DOPPrototypes.getWithDecimals(price):DOPPrototypes.getWithDecimals(price)+Currency)+'</div>');
                }
                dayHTML.push('          <br class="DOPBCPCalendar-clear" />');
                dayHTML.push('          <div class="available">'+contentLine2+'</div>');
                dayHTML.push('      </div>');  
                dayHTML.push('  </div>');
                dayHTML.push('  <div class="bind-right'+(bind === 1 || bind === 2 ? '  enabled':'')+'">');
                dayHTML.push('      <div class="header">&nbsp;</div>');
                dayHTML.push('      <div class="content">&nbsp;</div>');
                dayHTML.push('  </div>');
                dayHTML.push('</div>');

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
                return {"available": 0,
                        "bind": 0,
                        "info": "",
                        "notes": "",
                        "price": 0, 
                        "promo": 0,
                        "status": methods_days.data['available'][day] ? "none":"unavailable"};
            },
            customize:function(){
            /*
             * Set days width and height.
             */
                var maxHeight = 0,
                wasHidden = methods.doMetaboxHideBuster();

                $('.DOPBCPCalendar-day', Container).width(parseInt(($('.DOPBCPCalendar-month', Container).width()-parseInt($('.DOPBCPCalendar-month', Container).css('padding-left')))/7));
                $('.DOPBCPCalendar-day .bind-content', Container).width($('.DOPBCPCalendar-day', Container).width()-2);

                $('.DOPBCPCalendar-day .bind-content .content', Container).each(function(){
                    if (maxHeight < $(this).height()){
                        maxHeight = $(this).height();
                    }
                });

                $('.DOPBCPCalendar-day .content', Container).height(maxHeight);
                methods.undoMetaboxHideBuster(wasHidden);
            },                    
            events:function(){
            /*
             * Initialize days events.
             */
            
                methods_form.selectMultiple();

                /*
                 * Days events.
                 */
                $('.DOPBCPCalendar-day', Container).unbind('click touchstart');
                $('.DOPBCPCalendar-day', Container).bind('click touchstart', function(){
                    var day = $(this);

                    setTimeout(function(){
                        if (!dayTimeDisplay){
                            if (!day.hasClass('mask')){
                                if (!day.hasClass('past-day')){
                                    if (!dayFirstSelected){
                                        dayFirstSelected = true;
                                        dayStartSelection = day.attr('id');
                                        dayStartSelectionCurrMonth = CurrMonth;
                                        methods_days.vars.selectionStart = dayStartSelection;
                                        methods_form.clear();

                                    }
                                    else{
                                        dayFirstSelected = false;
                                        dayEndSelection = day.attr('id');
                                        methods_days.vars.selectionEnd = dayEndSelection;
                                        methods_form.display('days');
                                    }
                                    methods_day.displaySelection(day.attr('id'));
                                }
                            }
                        }
                        else{
                            dayTimeDisplay = false;
                        }
                    }, 10);
                });

                $('.DOPBCPCalendar-day', Container).hover(function(){
                    var day = $(this);

                    if (dayFirstSelected){
                        methods_day.displaySelection(day.attr('id'));
                    }

                }, function(){
                    methods_tooltip.clear();
                });

                /*
                 * Info icon events.
                 */
                $('.DOPBCPCalendar-day .info', Container).hover(function(){
                    methods_tooltip.display($(this).attr('id').split('_')[1], 
                                            'info',
                                            'info');
                }, function(){
                    methods_tooltip.clear();
                });

                /*
                 * Notes icon events.
                 */
                $('.DOPBCPCalendar-day .notes', Container).hover(function(){
                    methods_tooltip.display($(this).attr('id').split('_')[1], 
                                            'notes', 
                                            'notes');
                }, function(){
                    methods_tooltip.clear();
                });
            },
            rp:function(){
            /*
             *  Resize & position calendar day. Used for responsive feature.
             */  
                var $day = $('.DOPBCPCalendar-day', Container),
                $dayBody = $('.DOPBCPCalendar-day .dopbcp-body', Container),
                $month = $('#DOPBCPCalendar-backend-month-'+ID+'-1'),        
                dayWidth = 0,
                maxHeight = 0,
                hiddenBustedItems = prototypes.doHiddenBuster($(Container));
                
                dayWidth = parseInt(($month.width()-parseInt($month.css('padding-left'))+parseInt($month.css('padding-right')))/7);
                
                $dayBody.removeAttr('style');
                $day.width(dayWidth);
                $day.find($('.bind-content')).width(dayWidth-2);

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
                    $('.DOPBCPCalendar-day .bind-content .content', Container).each(function(){
                        if (maxHeight < $(this).height()){
                            maxHeight = $(this).height();
                        }
                    });

                    $dayBody.height(maxHeight);
                }

                prototypes.undoHiddenBuster(hiddenBustedItems);
            },
            displaySelection:function(id){
            /*
             * Display selected days "selection".
             * 
             * @param id (String): current day ID (ID_YYYY-MM-DD) 
             */    
                var day, 
                maxHeight = 0;

                $('.DOPBCPCalendar-day', Container).removeClass('selected');
                methods_day.customize();

                if (id < dayStartSelection){
                    $('.DOPBCPCalendar-day', Container).each(function(){
                       day = $(this);

                       if (day.attr('id') >= id 
                               && day.attr('id') <= dayStartSelection 
                               && !day.hasClass('past-day') 
                               && !day.hasClass('hide') 
                               && !day.hasClass('mask')){
                           day.addClass('selected');
                       }
                    });
                }
                else{
                    $('.DOPBCPCalendar-day', Container).each(function(){
                       day = $(this);   

                       if (day.attr('id') >= dayStartSelection 
                               && day.attr('id') <= id 
                               && !day.hasClass('past-day') 
                               && !day.hasClass('hide') 
                               && !day.hasClass('mask')){
                           day.addClass('selected');
                       }
                    });
                }

                $('.DOPBCPCalendar-day.selected .header', Container).removeAttr('style');
                $('.DOPBCPCalendar-day.selected .content', Container).removeAttr('style');

                $('.DOPBCPCalendar-day .content', Container).each(function(){
                    if (maxHeight < $(this).height()){
                        maxHeight = $(this).height();
                    }
                });

                $('.DOPBCPCalendar-day .content', Container).height(maxHeight);
            }
        },
      
// Form
        methods_form = {
            data: {},
            text: {},
            display:function(type){
            /*
             * Display form.
             * 
             * @param type (String): type of form to be displayed
             *                       "days" display days form
             * 
             * @retun form HTML
             */    
                var headerHTML = new Array(),
                HTML = new Array(),
                i,
                startDate, 
                sYear, 
                sMonth, 
                sMonthText, 
                sDay,
                endDate, 
                eYear, 
                eMonth, 
                eMonthText, 
                eDay;
                
                if (dayStartSelection > dayEndSelection){
                    if (typeof methods_days.vars.selectionStart === 'undefined') {
                    endDate = dayStartSelection.split('_')[1];
                    startDate = dayEndSelection.split('_')[1];
                    } else {
                       endDate = methods_days.vars.selectionEnd;
                       startDate = methods_days.vars.selectionStart;
                    }
                }
                else{
                    if (typeof methods_calendar.vars.startDay === 'undefined') {
                        startDate = dayStartSelection.split('_')[1];
                        endDate = dayEndSelection.split('_')[1];
                    } else {
                       endDate = methods_days.vars.selectionEnd;
                       startDate = methods_days.vars.selectionStart;
                    }
                }

                sYear = startDate.split('-')[0];
                sMonth = startDate.split('-')[1];
                sMonthText = MonthNames[parseInt(sMonth, 10)-1];
                sDay = startDate.split('-')[2];

                eYear = endDate.split('-')[0];
                eMonth = endDate.split('-')[1];
                eMonthText = MonthNames[parseInt(eMonth, 10)-1];
                eDay = endDate.split('-')[2];
                
                HTML.push('<div class="DOPBCPCalendar-form">');
                var sNYear = sYear.replace(new RegExp(ID+'_', 'g'), ''),
                    eNYear = eYear.replace(new RegExp(ID+'_', 'g'), '');
                
                if (type === 'days'){
                    HTML.push('     <div class="dopbcp-input-wrapper">');
                    HTML.push('         <label for="DOPBCP-start-date-view'+ID+'">'+DateStartLabel+'</label>');
                    HTML.push('         <input type="text" name="DOPBCP-start-date-view'+ID+'" id="DOPBCP-start-date-view'+ID+'" value="'+(DateType === 1 ? sMonthText+' '+sDay+', '+sNYear:sDay+' '+sMonthText+' '+sNYear)+'" />');
                    HTML.push('         <input type="hidden" name="DOPBCP-start-date'+ID+'" id="DOPBCP-start-date'+ID+'" value="'+sNYear+'-'+sMonth+'-'+sDay+'" />');
                    HTML.push('     </div>');
                    HTML.push('     <div class="dopbcp-input-wrapper">');
                    HTML.push('         <label for="DOPBCP-end-date-view'+ID+'">'+DateEndLabel+'</label>');
                    HTML.push('         <input type="text" name="DOPBCP-end-date-view'+ID+'" id="DOPBCP-end-date-view'+ID+'" value="'+(DateType === 1 ? eMonthText+' '+eDay+', '+eNYear:eDay+' '+eMonthText+' '+eNYear)+'" />');
                    HTML.push('         <input type="hidden" name="DOPBCP-end-date'+ID+'" id="DOPBCP-end-date'+ID+'" value="'+eNYear+'-'+eMonth+'-'+eDay+'" />');
                    HTML.push('     </div>');
                }
                
                
                /*
                 * Start form fields.
                 */
                HTML.push(' <div id="DOPBCP-inputs-calendar-set-days-availability" class="dopbcp-inputs-wrapper dopbcp-last displayed">');

                if (type === 'days'){
                    HTML.push('     <div class="dopbcp-input-wrapper dopbcp-input-status-wrapper">');  
                    HTML.push('         <label for="DOPBCP-status">'+StatusLabel+'</label>');
                    HTML.push('         <select name="DOPBCP-status" id="DOPBCP-status">');
                    HTML.push('             <option value="available">'+StatusAvailableText+'</option>');
                    HTML.push('             <option value="booked">'+StatusBookedText+'</option>');
                    HTML.push('             <option value="special">'+StatusSpecialText+'</option>');
                    HTML.push('             <option value="unavailable">'+StatusUnavailableText+'</option>');
                    HTML.push('         </select>');
                    HTML.push('     </div>');     
                    HTML.push('     <div class="dopbcp-input-wrapper dopbcp-input-price-wrapper">');
                    HTML.push('         <label for="DOPBCP-price">'+PriceLabel+' '+Currency+'</label>');
                    HTML.push('         <input type="text" name="DOPBCP-price" id="DOPBCP-price" value="" />');
                    HTML.push('     </div>');                        
                    HTML.push('     <div class="dopbcp-input-wrapper">');
                    HTML.push('         <label for="DOPBCP-promo">'+PromoLabel+' '+Currency+'</label>');
                    HTML.push('         <input type="text" name="DOPBCP-promo" id="DOPBCP-promo" value="" disabled="disabled" />');
                    HTML.push('     </div>');
                    HTML.push('     <div class="dopbcp-input-wrapper">');
                    HTML.push('         <label for="DOPBCP-available">'+AvailableLabel+'</label>');
                    HTML.push('         <input type="text" name="DOPBCP-available" id="DOPBCP-available" value="1" />');
                    HTML.push('     </div>');
                }
                HTML.push('     <div class="dopbcp-input-wrapper">');
                HTML.push('         <label class="dopbcp-for-textarea" for="DOPBCP-info">'+InfoLabel+'</label>');
                HTML.push('         <textarea name="DOPBCP-info" id="DOPBCP-info" rows="5" cols=""></textarea>');  
                HTML.push('     </div>');
                HTML.push('     <div class="dopbcp-input-wrapper">');
                HTML.push('         <label class="dopbcp-for-textarea" for="DOPBCP-notes">'+NotesLabel+'</label>');
                HTML.push('         <textarea name="DOPBCP-notes" id="DOPBCP-notes" rows="5" cols=""></textarea>'); 
                HTML.push('     </div>');  

                if ((startDate !== endDate 
                                && type === 'days')){
                    HTML.push('     <div class="dopbcp-input-wrapper dopbcp-last">');
                    HTML.push('         <input type="checkbox" name="DOPBCP-group" id="DOPBCP-group" />');
                    HTML.push('         <label class="dopbcp-for-checkbox" for="DOPBCP-group">'+GroupDaysLabel+'</label>');
                    HTML.push('     </div>');   
                }                 
                HTML.push(' </div>');
                /*
                 * ***************************************************** End form fields.
                 */
                
                /*
                 * Start form buttons.
                 */
                HTML.push('<div class="DOPBCPCalendar-form-buttons">');
                HTML.push('   <input type="button" name="DOPBCP-submit" id="DOPBCP-submit" class="submit-style" title="Submit" value="'+methods_form.text['submit']+'" />');
                HTML.push('   <input type="button" name="DOPBCP-reset" id="DOPBCP-reset" class="submit-style dopbcp-reset" title="Reset" value="'+methods_form.text['reset']+'" />');
                HTML.push('</div>');
                /*
                 * ***************************************************** End form buttons.
                 */

                HTML.push('</div>');

                $('#DOPBCP-form'+ID+' .dopbcp-sidebar-content').html(HTML.join(''));

                methods_form.events(startDate, 
                                    endDate, 
                                    type);
                DOPPrototypes.scrollToY($('#DOPBCP-form'+ID).offset().top-100);
            },
            events:function(startDate,
                            endDate,
                            type){
            /*
             * Initialize form events.
             * 
             * @param startDate (String): selection start day (YYYY-MM-DD)
             * @param endDate (String): selection end day (YYYY-MM-DD)
             * @param type (String): type of form that was displayed
             *                       "days" display days form
             */
                if (type === 'days'){
                    
                    /*
                     * Days event
                     */
                    methods_form.initDatepicker('#DOPBCP-start-date-view'+ID,
                                                '#DOPBCP-start-date'+ID);
                                                           
                    methods_form.initDatepicker('#DOPBCP-end-date-view'+ID,
                                                '#DOPBCP-end-date'+ID);

                    methods_form.selectMultiple();
                    
                    /*
                     * Status event.
                     */
                    $('#DOPBCP-status').DOPSelect();
                    $('#DOPBCP-status').unbind('change touchstart');
                    $('#DOPBCP-status').bind('change touchstart', function(){
                        switch ($(this).val()){
                            case 'available':
                                $('#DOPBCP-price').removeAttr('disabled');
                                $('#DOPBCP-promo').attr('disabled', 'disabled');
                                $('#DOPBCP-available').removeAttr('disabled');
                                $('#DOPBCP-available').val('1');

                                if (startDate !== endDate 
                                        && type !== 'days'){
                                    $('#DOPBCP-group').removeAttr('disabled');
                                }
                                break;
                            case 'booked':
                                $('#DOPBCP-price').attr('disabled', 'disabled');
                                $('#DOPBCP-promo').attr('disabled', 'disabled');
                                $('#DOPBCP-price').val('');
                                $('#DOPBCP-promo').val('');
                                $('#DOPBCP-available').attr('disabled', 'disabled');
                                $('#DOPBCP-available').val('');

                                if (startDate !== endDate 
                                        && type !== 'days'){
                                    $('#DOPBCP-group').removeAttr('disabled');
                                }
                                break;
                            case 'special':
                                $('#DOPBCP-price').removeAttr('disabled');
                                $('#DOPBCP-promo').attr('disabled', 'disabled');
                                $('#DOPBCP-available').removeAttr('disabled');
                                $('#DOPBCP-available').val('1');

                                if (startDate !== endDate 
                                        && type !== 'days'){
                                    $('#DOPBCP-group').removeAttr('disabled');
                                }
                                break;
                            case 'unavailable':
                                $('#DOPBCP-price').attr('disabled', 'disabled');
                                $('#DOPBCP-promo').attr('disabled', 'disabled');
                                $('#DOPBCP-price').val('');
                                $('#DOPBCP-promo').val('');
                                $('#DOPBCP-available').attr('disabled', 'disabled');
                                $('#DOPBCP-available').val('');

                                if (startDate !== endDate 
                                        && type !== 'days'){
                                    $('#DOPBCP-group').attr('disabled', 'disabled');
                                }
                                break;
                        }
                    });

                    /*
                     * Price event.
                     */
                    $('#DOPBCP-price').unbind('keyup touchstart');
                    $('#DOPBCP-price').bind('keyup touchstart', function(){
                        DOPPrototypes.cleanInput($(this), '0123456789.', '', '');

                        if ($(this).val() > '0'){
                            $('#DOPBCP-promo').removeAttr('disabled');
                        }
                        else{
                            $('#DOPBCP-promo').attr('disabled', 'disabled');
                            $('#DOPBCP-promo').val('');                                
                        }
                    });

                    /*
                     * Promo event.
                     */
                    $('#DOPBCP-promo').unbind('keyup touchstart');
                    $('#DOPBCP-promo').bind('keyup touchstart', function(){
                        DOPPrototypes.cleanInput($(this), '0123456789.', '', '');
                    });
                }


                /*
                 * Number of items available event.
                 */
                $('#DOPBCP-available').unbind('keyup touchstart');
                $('#DOPBCP-available').bind('keyup touchstart', function(){
                    DOPPrototypes.cleanInput($(this), 
                                          '0123456789', 
                                          '0', 
                                          '');
                });

                /*
                 * Submit button event.
                 */
                $('#DOPBCP-submit').unbind('click touchstart');
                $('#DOPBCP-submit').bind('click touchstart', function(){
                    methods_schedule.set(type);
                });

                /*
                 * Reset button event.
                 */
                $('#DOPBCP-reset').unbind('click touchstart');
                $('#DOPBCP-reset').bind('click touchstart', function(){
                    methods_schedule.reset(type);
                });
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
                minDate = (minDate === undefined) ? prototypes.getNoDays(methods_calendar.vars.startYear+'-'+prototypes.getLeadingZero(methods_calendar.vars.startMonth)+'-'+prototypes.getLeadingZero(methods_calendar.vars.startDay),
                                                                       methods_calendar.vars.todayYear+'-'+prototypes.getLeadingZero(methods_calendar.vars.todayMonth)+'-'+prototypes.getLeadingZero(methods_calendar.vars.todayDay))-1:minDate;           
                                                        
                altId = $.trim(altId);
                
                if(id.indexOf("DOPBCP-end-date-view") !== -1) {
                   var sDate = $('#DOPBCP-start-date'+ID).val();
                   minDate = prototypes.getNoDays(prototypes.getToday(), sDate)-(methods_days.data['morningCheckOut'] ? 0:1);
                }
                
                $(id).datepicker('destroy');
                $(id).datepicker({altField: altId,
                                  altFormat: 'yy-mm-dd',
                                  beforeShow: function(input, inst){
                                    $('#ui-datepicker-div').removeClass('DOPBCP-admin-datepicker')
                                                           .addClass('DOPBCP-admin-datepicker');
                                  },
                                  dateFormat: Data['DateType'] === 1 ? 'MM dd, yy':'dd MM yy',
                                  dayNames: methods_days.data['names'],
                                  firstDay: methods_days.data['first'],
                                  minDate: minDate,
                                  onselect: function(selectedDate){
                                    if(id.indexOf("DOPBCP-end-date-view") !== -1) {
                                        methods_days.vars.selectionInit = false;
                                        methods_days.vars.selectionStart = $('#DOPBCP-start-date'+ID).val();
                                        methods_days.vars.selectionEnd = $('#DOPBCP-end-date'+ID).val();
                                        
                                        if (methods_days.vars.selectionStart > methods_days.vars.selectionEnd){
                                            var auxDate = methods_days.vars.selectionStart;
                                            methods_days.vars.selectionStart = methods_days.vars.selectionEnd;
                                            methods_days.vars.selectionEnd = auxDate;
                                        }
                                        
                                        methods_days.displaySelection(methods_days.vars.selectionEnd);
                                    } else {
                                         methods_days.vars.selectionInit = true;
                                         methods_days.vars.selectionStart = $('#DOPBCP-start-date'+ID).val();
                                         methods_days.vars.selectionEnd = '';
                                         methods_days.displaySelection(methods_days.vars.selectionStart);
                                    }
                                  },
                                  monthNames: methods_months.text['names'],
                                  monthNamesMin: methods_months.text['shortNames'],
                                  nextText: Data['NextMonthText'],
                                  prevText: Data['PreviousMonthText']});
                $('.ui-datepicker').removeClass('notranslate').addClass('notranslate');
            },
            selectMultiple:function(){
            /*
             * Initialize sidebar search days events when multiple days need to be selected.
             */
                /*
                 * Check in click event.
                 */
                $('#DOPBCP-start-date-view'+ID).unbind('click touchstart');
                $('#DOPBCP-start-date-view'+ID).bind('click touchstart', function(){
                    $('#DOPBCP-end-date-view'+ID).val();
                    $('#DOPBCP-start-date'+ID).val('');
                    $('#DOPBCP-end-date'+ID).val('');

                    $(this).val('');
                    methods_days.vars.selectionInit = false;
                    methods_days.clearSelection();
                    
                });
                /*
                 * Check in blur event.
                 */
                $('#DOPBCP-start-date-view'+ID).unbind('blur touchstart');
                $('#DOPBCP-start-date-view'+ID).bind('blur touchstart', function(){  
                    var $this = $(this);

                    if ($this.val() === ''){
                        $this.val();
                    }
                    
                });

                /*
                 * Check in change event.
                 */
                $('#DOPBCP-start-date-view'+ID).unbind('change touchstart');
                $('#DOPBCP-start-date-view'+ID).bind('change touchstart', function(){
                    var ciDay = $('#DOPBCP-start-date'+ID).val(),
                        year = parseInt(ciDay.split('-')[0], 10),
                        month = parseInt(ciDay.split('-')[1], 10)-1,
                        minDateValue;
                    
                    if (methods_form.validate(ciDay)){
                        minDateValue = prototypes.getNoDays(prototypes.getToday(), ciDay)-(methods_days.data['morningCheckOut'] ? 0:1);
                        methods_days.vars.selectionInit = true;
                        methods_days.vars.selectionStart = ciDay;
                        methods_days.vars.selectionEnd = ciDay;

                        $('#DOPBCP-end-date-view'+ID).removeAttr('disabled')
                                                              .val('');
                        $('#DOPBCP-end-date'+ID).val('');
                        methods_form.initDatepicker('#DOPBCP-end-date-view'+ID,
                                                    '#DOPBCP-end-date'+ID,
                                                    minDateValue);

                        methods_calendar.init(year, 
                                              month+1);
                        methods_days.displaySelection(methods_days.vars.selectionEnd);
                        methods_form.display('days');

                        setTimeout(function(){
                            $('#DOPBCP-end-date-view'+ID).val('')
                                                                  .select();  
                            $('#DOPBCP-end-date'+ID).val('');
                        }, 100);
                    }
                    else{
                        $('#DOPBCP-start-date-view'+ID).val();
                    }
                });

                /*
                 * Check out click event.
                 */
                $('#DOPBCP-end-date-view'+ID).unbind('click touchstart');
                $('#DOPBCP-end-date-view'+ID).bind('click touchstart', function(){  
                    $('#DOPBCP-end-date-view'+ID).val('');  
                    $('#DOPBCP-end-date'+ID).val('');      

                    
                });

                /*
                 * Check out blur event.
                 */
                $('#DOPBCP-end-date-view'+ID).unbind('blur touchstart');
                $('#DOPBCP-end-date-view'+ID).bind('blur touchstart', function(){ 
                    var $this = $(this);

                    setTimeout(function(){
                        if ($this.val() === ''){
                            $this.val();
                        }                       
                        
                    }, 100);
                });

                /*
                 * Check out change event.
                 */
                $('#DOPBCP-end-date-view'+ID).unbind('change touchstart');
                $('#DOPBCP-end-date-view'+ID).bind('change touchstart', function(){
                    var ciDay = $('#DOPBCP-start-date'+ID).val(),
                        coDay = $('#DOPBCP-end-date'+ID).val();

                    setTimeout(function(){
                        if (methods_form.validate(coDay)){
                            methods_days.vars.selectionInit = false;
                            methods_days.vars.selectionEnd = coDay;
                        
                            methods_calendar.init(parseInt(ciDay.split('-')[0], 10), 
                                                  parseInt(ciDay.split('-')[1], 10));
                            methods_days.displaySelection(methods_days.vars.selectionEnd);
                            
                        }
                        else{
                            $('#DOPBCP-end-date-view'+ID).val(methods_form.text['checkOut']);
                        }
                    }, 100);
                });
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
            clear:function(type){
            /*
             * Clear form.
             * 
             * @param type (String): type of selection to be removed from calendar
             *                       "days" remove days selection
             */    

                if (type === 'days'){
                    $('.DOPBCPCalendar-day', Container).removeClass('selected');   
                    methods_day.customize();
                }
            },
            rp:function(){
            /*
             *  Resize & position calendar sidebar. Used for responsive feature.
             */
                var hiddenBustedItems = prototypes.doHiddenBuster($(Container));

                $('.DOPBCP-form', Container).removeClass('dopbcp-style1')
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
                    $('.DOPBCP-form', Container).addClass('dopbcp-style-small');
                }
                else{
                    switch (methods_form.data['style']){
                        case 2:
                            if (Container.width() < 760){
                                $('.DOPBCP-form', Container).addClass('dopbcp-style2-medium');
                            }
                            else{
                                $('.DOPBCP-form', Container).addClass('dopbcp-style2');
                            }
                            break;
                        case 3:
                            if (Container.width() < 1020){
                                $('.DOPBCP-form', Container).addClass('dopbcp-style3-medium');
                            }
                            else{
                                $('.DOPBCP-form', Container).addClass('dopbcp-style3');
                            }
                            break;
                        case 4:
                            if (Container.width() < 660){
                                $('.DOPBCP-form', Container).addClass('dopbcp-style4-medium');
                            }
                            else{
                                $('.DOPBCP-form', Container).addClass('dopbcp-style4');
                            }
                            break;
                        case 5:
                            if (Container.width() < 800){
                                $('.DOPBCP-form', Container).addClass('dopbcp-style5-medium');
                            }
                            else{
                                $('.DOPBCP-form', Container).addClass('dopbcp-style5');
                            }
                            break;
                        default:                 
                            if (Container.width() < 900){
                                $('.DOPBCP-form', Container).addClass('dopbcp-style1-medium');
                            }
                            else{
                                $('.DOPBCP-form', Container).addClass('dopbcp-style1');
                            }
                    }
                }

                prototypes.undoHiddenBuster(hiddenBustedItems);
            }
        },
                
// Message 
        methods_message = {
            
            display: function(){
                var HTML = new Array();
                
                // Message Box
                HTML.push('<div id="DOPBCP-messages-background" class=""></div>');   
                HTML.push('<div id="DOPBCP-messages-box" class="">');
                HTML.push('     <a href="javascript:methods_message.init()" class="dopbcp-close"></a>');
                HTML.push('     <div class="dopbcp-icon-active"></div>');
                HTML.push('     <div class="dopbcp-icon-success"></div>');
                HTML.push('     <div class="dopbcp-icon-error"></div>');
                HTML.push('     <div class="dopbcp-message"></div>');
                HTML.push('</div>');
                // Confirmation Box
                HTML.push('<div id="DOPBCP-confirmation-box">');
                HTML.push('     <div class="dopbcp-icon"></div>');
                HTML.push('     <div class="dopbcp-message"></div>');
                HTML.push('     <div class="dopbcp-buttons">');
                HTML.push('         <a href="javascript:void(0)" class="dopbcp-button-yes">Yes</a>');
                HTML.push('         <a href="javascript:void(0)" class="dopbcp-button-no">No</a>');
                HTML.push('     </div>');
                HTML.push('</div>');
                
                return HTML.join('');
            },
            init: function(action,message){
               action = action === undefined ? 'none':action;
               message = message === undefined ? '':message;

               clearTimeout(MessagesTimeout);
               $('#DOPBCP-messages-background').removeClass('dopbcp-active');
               $('#DOPBCP-messages-box').removeClass('dopbcp-active')
                                        .removeClass('dopbcp-active-info')
                                        .removeClass('dopbcp-error')
                                        .removeClass('dopbcp-success')
                                        .addClass('dopbcp-'+action);
               $('#DOPBCP-messages-box .dopbcp-message').html(message);
               switch (action){
                   case 'active':
                       $('#DOPBCP-messages-background').addClass('dopbcp-active');
                       break;
                   case 'success':
                       MessagesTimeout = setTimeout(function(){
                            $('#DOPBCP-messages-box').removeClass('dopbcp-success');
                            $('#DOPBCP-messages-box .dopbcp-message').html('');
                       }, 2000);
                       break;
               }
           }
            
        },

// Schedule
        methods_schedule = {
            parse:function(year){
            /*
             * Parse schedule.
             * 
             * @param year (Number): the year for which the calendar should get the schedule
             */    
                var scheduleBuffer = {};
                
                Container.append(methods_message.display());
                
                $.post(loadURL, {dopbcp_calendar_id: ID}, function(data){
                    
                    if ($.trim(data) !== ''){
                        scheduleBuffer = JSON.parse($.trim(data));
                        $.extend(Schedule, scheduleBuffer);
                    }
                    
                    showCalendar = false;
                    $('.dopbcp-loader', Container).remove();
                    methods_calendar.display();
                    methods.rp();
                });
            },
            set:function(type){
            /*
             * Set schedule to be sent to the database.
             * 
             * @param type (String): the type of the data being set
             *                       "days" set data for days
             */
                var i, 
                y, 
                m, 
                d, 
                noDays, 
                key,
                startDate, 
                sYear, 
                sMonth, 
                sDay,
                endDate, 
                eYear, 
                eMonth, 
                eDay,
                fromMonth, 
                toMonth, 
                fromDay, 
                toDay,
                availableValue = $('#DOPBCP-available').val() !== undefined && $('#DOPBCP-available').val() !== '' ? parseInt($('#DOPBCP-available').val()):0,
                bindValue = 0,
                infoValue = $('#DOPBCP-info').val().replace(/\n/gi, '<br />'),
                notesValue = $('#DOPBCP-notes').val().replace(/\n/gi, '<br />'),
                priceValue = $('#DOPBCP-price').val() !== undefined && $('#DOPBCP-price').val() !== '' ? parseFloat($('#DOPBCP-price').val()):0,
                promoValue = $('#DOPBCP-promo').val() !== undefined && $('#DOPBCP-promo').val() !== '' ? parseFloat($('#DOPBCP-promo').val()):0,
                statusValue = $('#DOPBCP-status').val() !== undefined ? $('#DOPBCP-status').val():'';
                
                
                if (type === 'days'){
                    dayStartSelection = methods_days.vars.selectionStart;
                    dayEndSelection = methods_days.vars.selectionEnd;
                    
                    if (dayStartSelection.indexOf('_') === -1) {
                        dayStartSelection = ID+'_'+dayStartSelection;
                    }
                    
                    if (dayEndSelection.indexOf('_') === -1) {
                        dayEndSelection = ID+'_'+dayEndSelection;
                    }
                    startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1];
                    endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];

                    sYear = parseInt(startDate.split('-')[0], 10);
                    sMonth = parseInt(startDate.split('-')[1], 10);
                    sDay = parseInt(startDate.split('-')[2], 10);
                    eYear = parseInt(endDate.split('-')[0], 10);
                    eMonth = parseInt(endDate.split('-')[1], 10);
                    eDay = parseInt(endDate.split('-')[2], 10);

                    if (Schedule[DOPPrototypes.getPrevDay(startDate)] !== undefined){
                        if (Schedule[DOPPrototypes.getPrevDay(startDate)]['bind'] === 1){
                            Schedule[DOPPrototypes.getPrevDay(startDate)]['bind'] = 0;                                                                
                        }
                        else if (Schedule[DOPPrototypes.getPrevDay(startDate)]['bind'] === 2){
                            Schedule[DOPPrototypes.getPrevDay(startDate)]['bind'] = 3;                                
                        }
                    }

                    if (Schedule[DOPPrototypes.getNextDay(endDate)] !== undefined){
                        if (Schedule[DOPPrototypes.getNextDay(endDate)]['bind'] === 2){
                            Schedule[DOPPrototypes.getNextDay(endDate)]['bind'] = 1;                                                                
                        }
                        else if (Schedule[DOPPrototypes.getNextDay(endDate)]['bind'] === 3){
                            Schedule[DOPPrototypes.getNextDay(endDate)]['bind'] = 0;                                
                        }
                    }
                    
                    for (y=sYear; y<=eYear; y++){
                        fromMonth = 1;

                        if (y === sYear){
                            fromMonth = sMonth;
                        }

                        toMonth = 12;

                        if (y === eYear){
                            toMonth = eMonth;
                        }

                        for (m=fromMonth; m<=toMonth; m++){
                            noDays = new Date(y, m, 0).getDate();
                            fromDay = 1;

                            if (y === sYear 
                                    && m === sMonth){
                                fromDay = sDay;
                            }

                            toDay = noDays;

                            if (y === eYear 
                                    && m === eMonth){
                                toDay = eDay;
                            }

                            for (d=fromDay; d<=toDay; d++){
                                key = y+'-'+DOPPrototypes.getLeadingZero(m)+'-'+DOPPrototypes.getLeadingZero(d);
                                
                                //if (methods_days.data['available'][DOPPrototypes.getWeekDay(y+'-'+m+'-'+d)] 
                                //        || startDate === endDate){
                                    
                                    if ($('#DOPBCP-group').is(':checked')){
                                        if (key === startDate){
                                            bindValue = 1;
                                        }                 
                                        else if (key === endDate){
                                            bindValue = 3;
                                        }   
                                        else{
                                            bindValue = 2;                                            
                                        }
                                    }

                                    Schedule[key] = {"available": availableValue,
                                                     "bind": bindValue,
                                                     "info": infoValue,
                                                     "notes": notesValue,
                                                     "price": priceValue,
                                                     "promo": promoValue,
                                                     "status": statusValue};
                                                 
                                    //methods_schedule.setDayFromHours(key);
                                //}
                            }
                        }
                    }
                    
                    methods_calendar.init(startDate.split('-')[0], 
                                          startDate.split('-')[1]); 
                }
                
                methods_schedule.save();
            },
            save:function(){
            /*
             * Save schedule.
             */
                var startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1],
                endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];

                yearStartSave = parseInt(startDate.split('-')[0], 10);
                monthStartSave = parseInt(startDate.split('-')[1], 10);
                yearEndSave = parseInt(endDate.split('-')[0], 10);
                monthEndSave = parseInt(endDate.split('-')[1], 10);

                methods_message.init('active', SavingText);
                methods_form.clear();

                methods_schedule.saveMonth(yearStartSave, 
                                           monthStartSave);
            },                    
            saveMonth:function(year,
                               month){
            /*
             * Save schedule in database by month.
             * 
             * @param year (Number): year of the month to be saved
             * @param month (Number): month to be saved
             * 
             * @return success message
             */
                var schedule = Schedule.constructor(),
                nextYear = month === 12 ? year+1:year, 
                nextMonth = month === 12 ? 1:month+1,
                startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1],
                endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];

                CurrMonth = (year-StartYear)*12+month;
                
                for (var day in Schedule){
                    if (day.indexOf(year+'-'+DOPPrototypes.getLeadingZero(month)) !== -1){
                        if (startDate <= day && day <= endDate){
                            schedule[day] = Schedule[day];
                        }
                    }                            
                }         

                if (yearStartSave !== year 
                        || monthStartSave !== month){
                    methods_calendar.init(StartYear,
                                          CurrMonth);

                    if (StartMonth !== month){
                        $('.DOPBCPCalendar-navigation .previous-btn', Container).css('display', 'block');
                    }
                }

                $.post(saveURL, {dopbcp_calendar_id: ID,
                                 dopbcp_schedule: JSON.stringify(Schedule)}, function(data){
                    if (year === yearEndSave 
                            && month === monthEndSave){
                        methods_message.init('success',
                                              SavedText);
                    }                            
                    else{
                        methods_schedule.saveMonth(nextYear,
                                                   nextMonth);                      
                    }  
                });
            },                    
            reset:function(type){
            /*
             * Reset schedule. 
             * 
             * @param type (String): the type of the data being removed
             *                       "days" remove data for days
             */
                var i, 
                key,
                startDate, 
                sYear, 
                sMonth, 
                sDay;

                if (confirm(ResetConfirmation)){
                    if (type === 'days'){
                        methods_schedule.delete();
                    }
                }
            },                  
            delete:function(){
            /*
             * Delete schedule.
             */
                var startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1],
                endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];

                yearStartSave = parseInt(startDate.split('-')[0], 10);
                monthStartSave = parseInt(startDate.split('-')[1], 10);
                yearEndSave = parseInt(endDate.split('-')[0], 10);
                monthEndSave = parseInt(endDate.split('-')[1], 10);

                methods_message.init('active', 
                                      SavingText);
                methods_form.clear();

                methods_schedule.deleteMonth(yearStartSave, 
                                             monthStartSave);
            },                    
            deleteMonth:function(year,
                                 month){
            /*
             * Delete schedule in database by month.
             * 
             * @param year (Number): year of the month to be deleted
             * @param month (Number): month to be deleted
             * 
             * @return success message
             */
                var schedule = Schedule.constructor(),
                nextYear = month === 12 ? year+1:year, 
                nextMonth = month === 12 ? 1:month+1,
                startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1],
                endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];
                
                for (var day in Schedule){
                    if (day.indexOf(year+'-'+DOPPrototypes.getLeadingZero(month)) !== -1){
                        if (startDate <= day 
                                && day <= endDate){
                            schedule[day] = Schedule[day];                                        
                            delete Schedule[day];
                        }
                    }                            
                }

                if (yearStartSave !== year 
                        || monthStartSave !== month){
                    methods_calendar.init(StartYear,
                                          CurrMonth+1);

                    if (StartMonth !== month){
                        $('.DOPBCPCalendar-navigation .previous-btn', Container).css('display', 'block');
                    }
                }
                else{
                    methods_calendar.init(StartYear, 
                                          dayStartSelectionCurrMonth); 
                }

                $.post(saveURL, {dopbcp_calendar_id: ID,
                                 dopbcp_schedule: JSON.stringify(Schedule)}, function(data){                         
                    if (year === yearEndSave 
                            && month === monthEndSave){
                        methods_message.init('success',
                                              SavedText);
                    }                            
                    else{
                        methods_schedule.deleteMonth(nextYear, 
                                                     nextMonth);                     
                    }   
                });
            },
            setDayFromHours:function(day){
            /*
             * Set day availability from hours availability.
             * 
             * @param day (String): day to be changed (YYYY-MM-DD)
             */    
                if (Schedule[day] !== undefined){
                    var available = 0,
                    price = 0,
                    status = 'none';
            
                    for (var hour in Schedule[day]['hours']){
                        // No Available Check
                        if (Schedule[day]['hours'][hour]['bind'] === 0 
                                || Schedule[day]['hours'][hour]['bind'] === 1){
                            if (Schedule[day]['hours'][hour]['available'] !== 0){
                                available += parseInt(Schedule[day]['hours'][hour]['available']);
                            }

                            // Price Check
                            if (Schedule[day]['hours'][hour]['price'] !== 0 
                                    && (price === 0 
                                            || parseFloat(Schedule[day]['hours'][hour]['price']) < price)){
                                price = parseFloat(Schedule[day]['hours'][hour]['price']);
                            }

                            if (Schedule[day]['hours'][hour]['promo'] !== 0 
                                    && (price === 0 
                                            || parseFloat(Schedule[day]['hours'][hour]['promo']) < price)){
                                price = parseFloat(Schedule[day]['hours'][hour]['promo']);
                            }

                            // Status Check
                            if (Schedule[day]['hours'][hour]['status'] === 'unavailable' 
                                    && status === 'none'){
                                status = 'unavailable';
                            }

                            if (Schedule[day]['hours'][hour]['status'] === 'booked' 
                                    && (status === 'none' 
                                            || status === 'unavailable')){
                                status = 'booked';
                            }

                            if (Schedule[day]['hours'][hour]['status'] === 'special' 
                                    && (status === 'none' 
                                            || status === 'unavailable' 
                                            || status === 'booked')){
                                status = 'special';
                            }

                            if (Schedule[day]['hours'][hour]['status'] === 'available'){
                                status = 'available';
                            }
                        }
                    }

                    Schedule[day]['available'] = available === 0 ? '':available;
                    Schedule[day]['price'] = price;
                    Schedule[day]['status'] = status;
                }
            }
        },
          
// Tooltip
        methods_tooltip = {
            init:function(){
            /*
             * Initialize information tooltip.
             */
                var $tooltip = $('#DOPBCPCalendar-tooltip'+ID),
                xPos = 0, 
                yPos = 0;
                
                if (!prototypes.isTouchDevice()){
                    /*
                     * Position the tooltip depending on mouse position.
                     */
                    $(document).mousemove(function(e){
                        xPos = e.pageX+15;
                        yPos = e.pageY-10;

                        if ($(document).scrollTop()+$(window).height() < yPos+$('#DOPBCPCalendar-tooltip'+ID).height()+parseInt($('#DOPBCPCalendar-tooltip'+ID).css('padding-top'))+parseInt($('#DOPBCPCalendar-tooltip'+ID).css('padding-bottom'))+10){
                           yPos = $(document).scrollTop()+$(window).height()-$('#DOPBCPCalendar-tooltip'+ID).height()-parseInt($('#DOPBCPCalendar-tooltip'+ID).css('padding-top'))-parseInt($('#DOPBCPCalendar-tooltip'+ID).css('padding-bottom'))-10;
                        }

                        $('#DOPBCPCalendar-tooltip'+ID).css({'left': xPos, 'top': yPos});
                    }); 
                } else {
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
            display:function(day,
                             type,
                             infoData){
            /*
             * Display information tooltip.
             * 
             * @param day (String): the day for which the information will be displayed (YYYY-MM-DD)
             * @param type (String): type of information to be displayed
             *                       "info" display information
             *                       "notes" display notes
             * @param infoData (String): information to be displayed
             */                         
                var info = infoData !== undefined ? Schedule[day][type]:infoData;
                info = decodeURIComponent(escape(info));
                $('#DOPBCPCalendar-tooltip'+ID).addClass('text');
                $('#DOPBCPCalendar-tooltip'+ID).html(info).css('display', 'block');                         
            },
            clear:function(){
            /*
             * Clear information display.
             */
                $('#DOPBCPCalendar-tooltip'+ID).css('display', 'none');                        
            }
        },// 25. Prototypes

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
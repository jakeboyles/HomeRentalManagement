/*
* Title                   : DOP Prototypes (JavaScript class)
* Version                 : 1.0.1
* File                    : dop-DOPPrototypes.js
* File Version            : 1.0.1
* Created / Last Modified : 08 August 2014
* Author                  : Dot on Paper
* Copyright               : © 2014 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : List of general functions that we use at Dot on Paper.
* Licence                 : MIT
*/

var DOPPrototypes = new function(){
    /*
     * Private variables
     */
//    var $ = jQuery.noConflict();

    /*
     * Public variables
     */
        
    /*
     * Constructor
     */
    this.DOPPrototypes = function(){
    };
    
// Actions           

    /*
     * Make all parents & current item visible.
     * 
     * @param item (element): item for which all parens are going to be made visible
     * 
     * @return list of parents
     */
    this.doHiddenBuster = function(item){
        var parent = item.parent(),
        items = new Array();

        if (item.prop('tagName') !== undefined 
                && item.prop('tagName').toLowerCase() !== 'body'){
            items = this.doHiddenBuster(parent);
        }

        if (item.css('display') === 'none'){
            item.css('display', 'block');
            items.push(item);
        }

        return items;
    };
    
    /*
     * Hide all items from list. The list is returned by function doHiddenBuster().
     * 
     * @param items (Array): list of items to be hidden
     */
    this.undoHiddenBuster = function(items){    
        var i;

        for (i=0; i<items.length; i++){
            items[i].css('display', 'none');
        }
    };
    
    /*
     * Open a link.
     * 
     * @param url (String): link URL
     * @param target (String): link target (_blank, _parent, _self, _top)
     */
    this.openLink = function(url,
                             target){
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
    };
    
    /*
     * Randomize the items of an array.
     * 
     * @param theArray (Array): the array to be mixed
     * 
     * return array with mixed items
     */
    this.randomizeArray = function(theArray){
        theArray.sort(function(){
            return 0.5-Math.random();
        });
        return theArray;
    };

    /*
     * Scroll vertically to position.
     * 
     * @param position (Number): position to scroll to
     * @param speed (Number): scroll speed 
     */  
    this.scrollToY = function(position,
                              speed){
        speed = speed !== undefined ? speed: 300;
        
        $('html').stop(true, true)
                 .animate({'scrollTop': position}, 
                          speed);
        $('body').stop(true, true)
                 .animate({'scrollTop': position}, 
                          speed);
    };
    
    /*
     * One finger navigation for touchscreen devices.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     */
    this.touchNavigation = function(parent,
                                    child){
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
            if (!this.isChromeMobileBrowser()){
                e.preventDefault();
            }
        });
    };

// Browsers & devices

    /*
     * Check if operating system is Android.
     * 
     * @return true/false
     */
    this.isAndroid = function(){
        var isAndroid = false,
        agent = navigator.userAgent.toLowerCase();

        if (agent.indexOf('android') !== -1){
            isAndroid = true;
        }
        return isAndroid;
    };
    
    /*
     * Check if browser is Chrome on mobile..
     * 
     * @return true/false
     */
    this.isChromeMobileBrowser = function(){
        var isChromeMobile = false,
        agent = navigator.userAgent.toLowerCase();

        if ((agent.indexOf('chrome') !== -1 
                        || agent.indexOf('crios') !== -1) 
                && this.isTouchDevice()){
            isChromeMobile = true;
        }
        return isChromeMobile;
    };
    
    /*
     * Check if browser is IE8.
     * 
     * @return true/false
     */
    this.isIE8Browser = function(){
        var isIE8 = false,
        agent = navigator.userAgent.toLowerCase();

        if (agent.indexOf('msie 8') !== -1){
            isIE8 = true;
        }
        return isIE8;
    };
    
    /*
     * Check if browser is IE..
     * 
     * @return true/false
     */
    this.isIEBrowser = function(){
        var isIE = false,
        agent = navigator.userAgent.toLowerCase();

        if (agent.indexOf('msie') !== -1){
            isIE = true;
        }
        return isIE;
    };
    
    /*
     * Detect touchscreen devices.
     * 
     * @return true/false
     */
    this.isTouchDevice = function(){
        var os = navigator.platform;

        if (os.toLowerCase().indexOf('win') !== -1){
            return window.navigator.msMaxTouchPoints;
        }
        else {
            return 'ontouchstart' in document;
        }
    },

// Cookies
    
    /*
     * Delete cookie.
     * 
     * @param name (String): cookie name
     * @param path (String): cookie path
     * @param domain (String): cookie domain
     */
    this.deleteCookie = function(name,
                                 path,
                                 domain){
        if (this.getCookie(name)){
            document.cookie = name+'='+((path) ? ';path='+path:'')+((domain) ? ';domain='+domain:'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT';
        }
    };
    
    /*
     * Get cookie.
     * 
     * @param name (String): cookie name
     */  
    this.getCookie = function(name){  
        var namePiece = name+"=",
        cookie = document.cookie.split(";"),
        i;

        for (i=0; i<cookie.length; i++){
            var cookiePiece = cookie[i];

            while (cookiePiece.charAt(0) === ' '){
                cookiePiece = cookiePiece.substring(1,cookiePiece .length);            
            } 

            if (cookiePiece.indexOf(namePiece) === 0){
                return unescape(cookiePiece.substring(namePiece.length, cookiePiece.length));
            } 
        }
        return null;
    };
    
    /*
     * Set cookie.
     * 
     * @param name (String): cookie name
     * @param value (String): cookie value
     * @param expire (String): the number of days after which the cookie will expire
     */
    this.setCookie = function(name,
                              value,
                              expire){
        var expirationDate = new Date();

        expirationDate.setDate(expirationDate.getDate()+expire);
        document.cookie = name+'='+escape(value)+((expire === null) ? '': ';expires='+expirationDate.toUTCString())+';javahere=yes;path=/';
    };

// Date & time
    
    /*
     * Converts time to AM/PM format.
     *
     * @param time (String): the time that will be converted (HH:MM)
     *
     * @return time to AM/PM format
     */
    this.getAMPM = function(time){
        var hour = parseInt(time.split(':')[0], 10),
        minutes = time.split(':')[1],
        result = '';

        if (hour === 0){
            result = '12';
        }
        else if (hour > 12){
            result = this.getLeadingZero(hour-12);
        }
        else{
            result = this.getLeadingZero(hour);
        }

        result += ':'+minutes+' '+(hour < 12 ? 'AM':'PM');

        return result;
    };
    
    /*
     * Returns difference between 2 dates.
     * 
     * @param date1 (Date): first date (JavaScript date)
     * @param date2 (Date): second date (JavaScript date)
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
    this.getDatesDifference = function(date1,
                                       date2,
                                       type,
                                       valueType,
                                       noDecimals){
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
            return noDecimals === -1 ? diff:DOPPrototypes.getWithDecimals(diff, noDecimals);
        }
        else{
            return Math.ceil(diff);
        }
    };
    
    /*
     * Returns difference between 2 hours.
     * 
     * @param hour1 (Date): first hour (HH:MM, HH:MM:SS)
     * @param hour2 (Date): second hour (HH:MM, HH:MM:SS)
     * @param type (String): diference type
     *                       "seconds"
     *                       "minutes"
     *                       "hours"
     * @param valueType (String): type of number returned
     *                            "float"
     *                            "integer"
     * @param noDecimals (Number): number of decimals returned with the float value (-1 to display all decimals)
     * 
     * @return hours difference
     */
    this.getHoursDifference = function(hour1,
                                       hour2,
                                       type,
                                       valueType,
                                       noDecimals){
        var hours1 = parseInt(hour1.split(':')[0], 10),
        minutes1 = parseInt(hour1.split(':')[1], 10),
        seconds1 = hour1.split(':')[2] !== undefined ? parseInt(hour1.split(':')[2], 10):0,
        hours2 = parseInt(hour2.split(':')[0], 10),
        minutes2 = parseInt(hour2.split(':')[1], 10),
        seconds2 = hour2.split(':')[2] !== undefined ? parseInt(hour2.split(':')[2], 10):0,
        time1,
        time2,
        diff;

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
            case 'hours':
                time1 = hours1+minutes1/60+seconds1/60/60;
                time2 = hours2+minutes2/60+seconds2/60/60;
                break;
            case 'minutes':
                time1 = hours1*60+minutes1+seconds1/60;
                time2 = hours2*60+minutes2+seconds2/60;
                break;
            default:
                time1 = hours1*60*60+minutes1*60+seconds1;
                time2 = hours2*60*60+minutes2*60+seconds2;
        }

        diff = Math.abs(time1-time2);

        if (valueType === 'float'){
            return noDecimals === -1 ? diff:DOPPrototypes.getWithDecimals(diff, noDecimals);
        }
        else{
            return Math.ceil(diff);
        }
    };
    
    /*
     * Returns next day.
     * 
     * @param date (Date): current date (YYYY-MM-DD)
     * 
     * @return next day (YYYY-MM-DD)
     */
    this.getNextDay = function(date){
        var nextDay = new Date(),
        parts = date.split('-');

        nextDay.setFullYear(parts[0], parts[1], parts[2]);
        nextDay.setTime(nextDay.getTime()+86400000);

        return nextDay.getFullYear()+'-'+DOPPrototypes.getLeadingZero(nextDay.getMonth())+'-'+DOPPrototypes.getLeadingZero(nextDay.getDate());
    };
    
    /*
     * Returns number of days between 2 dates.
     * 
     * @param date1 (Date): first date (YYYY-MM-DD)
     * @param date2 (Date): second date (YYYY-MM-DD)
     * 
     * @return number of days
     */
    this.getNoDays = function(date1,
                              date2){
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
    };
                    
    /*
     * Returns previous day.
     * 
     * @param date (Date): current date (YYYY-MM-DD)
     * 
     * @return previous day (YYYY-MM-DD)
     */
    this.getPrevDay = function(date){
        var previousDay = new Date(),
        parts = date.split('-');

        previousDay.setFullYear(parts[0], parseInt(parts[1])-1, parts[2]);
        previousDay.setTime(previousDay.getTime()-86400000);

        return previousDay.getFullYear()+'-'+DOPPrototypes.getLeadingZero(previousDay.getMonth()+1)+'-'+DOPPrototypes.getLeadingZero(previousDay.getDate());                        
    };
                        
    /*
     * Returns previous time by hours, minutes, seconds.
     * 
     * @param time (String): time (HH, HH:MM, HH:MM:SS)
     * @param diff (Number): diference for previous time
     * @param diffBy (Number): diference by 
     *                         "hours"
     *                         "minutes"
     *                         "seconds"
     * 
     * @return previus hour (HH, HH:MM, HH:MM:SS)
     */
    this.getPrevTime = function(time,
                                diff,
                                diffBy){
        var timePieces = time.split(':'),
        hours = parseInt(timePieces[0], 10),
        minutes = timePieces[1] === undefined ? 0:parseInt(timePieces[1], 10),
        seconds = timePieces[2] === undefined ? 0:parseInt(timePieces[2], 10);

        switch (diffBy){
            case 'seconds':
                seconds = seconds-diff;

                if (seconds < 0){
                    seconds = 60+seconds;
                    minutes = minutes-1;

                    if (minutes < 0){
                        minutes = 60+minutes;
                        hours = hours-1 < 0 ? 0:hours-1;
                    }
                }
                break;
            case 'minutes':
                    minutes = minutes-diff;

                    if (minutes < 0){
                        minutes = 60+minutes;
                        hours = hours-1 < 0 ? 0:hours-1;
                    }
                break;
            default:
                hours = hours-diff < 0 ? 0:hours-diff;
        }

        return this.getLeadingZero(hours)+(timePieces[1] === undefined ? '':':'+this.getLeadingZero(minutes)+(timePieces[2] === undefined ? '':':'+this.getLeadingZero(seconds)));
    };
    
    /*
     * Returns today date.
     * 
     * @return today (YYYY-MM-DD)
     */
    this.getToday = function(){    
        var today = new Date();

        return today.getFullYear()+'-'+DOPPrototypes.getLeadingZero(today.getMonth()+1)+'-'+DOPPrototypes.getLeadingZero(today.getDate());
    };

    /*
     * Returns week day.
     * 
     * @param date (String): date for which the function get day of the week (YYYY-MM-DD)
     * 
     * @return week day index (0 for Sunday)
     */
    this.getWeekDay = function(date){    
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        year = date.split('-')[0],
        month = date.split('-')[1],
        day = date.split('-')[2],
        newDate = new Date(eval('"'+day+' '+months[parseInt(month, 10)-1]+', '+year+'"'));

        return newDate.getDay();
    };
    
// Domains & URLs                        
    
    /*
     * Parse a $_GET variable.
     * 
     * @param name (String): variable name
     * 
     * @return variable vaue or "undefined" if it doesn't exist
     */
    this.$_GET = function(name){
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
    };
    
    /*
     * Access-Control-Allow-Origin buster. Modifies URL to be the same as browser URL.
     * 
     * @param url (String): URL
     * 
     * @return modified URL
     */
    this.acaoBuster = function(url){
        var browserURL = window.location.href,
        pathPiece1 = '', pathPiece2 = '';

        if (this.getDomain(browserURL) === this.getDomain(url)){
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
    };
    
    /*
     * Get current domain.
     *
     * @param url (String): the URL from which the domain will be extracted
     *
     * @return current domain
     */ 
    this.getDomain = function(url){
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
    };
    
    /*
     * Check if current URL has a subdomain.
     *
     * @param url (String): URL that will be checked
     *
     * @return true/false
     */ 
    this.hasSubdomain = function(url){
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
    };

// Resize & position                        
    
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
    this.rp = function(parent,
                       child,
                       pw,
                       ph,
                       cw,
                       ch,
                       pos,
                       type){
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
                this.rpBottom(parent, 
                              child, 
                              ph);
                break;
            case 'bottom-center':
                this.rpBottomCenter(parent, 
                                    child, 
                                    pw, 
                                    ph);
                break;
            case 'bottom-left':
                this.rpBottomLeft(parent, 
                                  child, 
                                  pw, 
                                  ph);
                break;
            case 'bottom-right':
                this.rpBottomRight(parent, 
                                   child, 
                                   pw, 
                                   ph);
                break;
            case 'center':
                this.rpCenter(parent, 
                              child, 
                              pw, 
                              ph);
                break;
            case 'left':
                this.rpLeft(parent, 
                            child, 
                            pw);
                break;
            case 'horizontal-center':
                this.rpCenterHorizontally(parent, 
                                          child, 
                                          pw);
                break;
            case 'middle-left':
                this.rpMiddleLeft(parent, 
                                  child, 
                                  pw, 
                                  ph);
                break;
            case 'middle-right':
                this.rpMiddleRight(parent, 
                                   child, 
                                   pw, 
                                   ph);
                break;
            case 'right':
                this.rpRight(parent, 
                             child, 
                             pw);
                break;
            case 'top':
                this.rpTop(parent, 
                           child, 
                           ph);
                break;
            case 'top-center':
                this.rpTopCenter(parent, 
                                 child, 
                                 pw, 
                                 ph);
                break;
            case 'top-left':
                this.rpTopLeft(parent, 
                               child, 
                               pw, 
                               ph);
                break;
            case 'top-right':
                this.rpTopRight(parent, 
                                child, 
                                pw, 
                                ph);
                break;
            case 'vertical-center':
                this.rpCenterVertically(parent, 
                                        child, 
                                        ph);
                break;
        }
    };
    
    /*
     * Position item on bottom.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpBottom = function(parent,
                             child,
                             ph){
        if (ph !== undefined){
            parent.height(ph);
        }
        child.css('margin-top', parent.height()-child.height());
    };
    
    /*
     * Position item on bottom-left.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpBottomCenter = function(parent,
                                   child,
                                   pw,
                                   ph){
        this.rpBottom(parent, 
                      child, 
                      ph);
        this.rpCenterHorizontally(parent, 
                                  child, 
                                  pw);
    };
    
    /*
     * Position item on bottom-left.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpBottomLeft = function(parent,
                                 child,
                                 pw,
                                 ph){
        this.rpBottom(parent, 
                      child, 
                      ph);
        this.rpLeft(parent, 
                    child, 
                    pw);
    };
    
    /*
     * Position item on bottom-left.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpBottomRight = function(parent,
                                  child,
                                  pw,
                                  ph){
        this.rpBottom(parent, 
                      child, 
                      ph);
        this.rpRight(parent, 
                     child, 
                     pw);
    };
    
    /*
     * Position item on center.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpCenter = function(parent,
                             child,
                             pw,
                             ph){
        this.rpCenterHorizontally(parent,
                                  child,
                                  pw);
        this.rpCenterVertically(parent, 
                                child, 
                                ph);
    };
    
    /*
     * Center item horizontally.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     */
    this.rpCenterHorizontally = function(parent,
                                         child,
                                         pw){
        if (pw !== undefined){
            parent.width(pw);
        }
        child.css('margin-left', (parent.width()-child.width())/2);
    };
    
    /*
     * Center item vertically.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpCenterVertically = function(parent,
                                       child,
                                       ph){
        if (ph !== undefined){
            parent.height(ph);
        }
        child.css('margin-top', (parent.height()-child.height())/2);
    };
    
    /*
     * Position item on left.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     */
    this.rpLeft = function(parent,
                           child,
                           pw){
        if (pw !== undefined){
            parent.width(pw);
        }
        child.css('margin-left', 0);
    };
    
    /*
     * Position item on middle-left.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpMiddleLeft = function(parent,
                                 child,
                                 pw,
                                 ph){
        this.rpCenterVertically(parent, 
                                child, 
                                ph);
        this.rpLeft(parent, 
                    child, 
                    pw);
    };
    
    /*
     * Position item on middle-right.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpMiddleRight = function(parent,
                                  child,
                                  pw,
                                  ph){
        this.rpCenterVertically(parent, 
                                child, 
                                ph);
        this.rpRight(parent, 
                     child, 
                     pw);
    };
    
    /*
     * Position item on right.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     */
    this.rpRight = function(parent,
                            child,
                            pw){
        if (pw !== undefined){
            parent.width(pw);
        }
        child.css('margin-left', parent.width()-child.width());
    };
    
    /*
     * Position item on top.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpTop = function(parent,
                          child,
                          ph){
        if (ph !== undefined){
            parent.height(ph);
        }
        child.css('margin-top', 0);
    };
    
    /*
     * Position item on top-center.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpTopCenter = function(parent,
                                child,
                                pw,
                                ph){
        this.rpTop(parent, 
                   child, 
                   ph);
        this.rpCenterHorizontally(parent, 
                                  child, 
                                  pw);
    };
    
    /*
     * Position item on top-left.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     * @param ph (Number): height to which the parent is going to be set
     */
    this.rpTopLeft = function(parent,
                              child,
                              pw,
                              ph){
        this.rpTop(parent, 
                   child, 
                   ph);
        this.rpLeft(parent, 
                    child, 
                    pw);
    };
          
    /*
     * Position item on top-right.
     * 
     * @param parent (element): parent item
     * @param child (element): child item
     * @param pw (Number): width to which the parent is going to be set
     * @param ph (Number): height to which the parent is going to be set
     */  
    this.rpTopRight = function(parent,
                               child,
                               pw,
                               ph){
        this.rpTop(parent, 
                   child, 
                   ph);
        this.rpRight(parent, 
                     child, 
                     pw);
    };

// Strings & numbers
    
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
    this.cleanInput = function(input,
                               allowedCharacters,
                               firstNotAllowed,
                               min){
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
    };
    
    /*
     * Adds a leading 0 if number smaller than 10.
     * 
     * @param no (Number): the number
     * 
     * @return number with leading 0 if needed
     */
    this.getLeadingZero = function(no){
        if (no < 10){
            return '0'+no;
        }
        else{
            return no;
        }
    };
    
    /*
     * Creates a string with random characters.
     * 
     * @param stringLength (Number): the length of the returned string
     * @param allowedCharacters (String): the string of allowed characters
     * 
     * @return random string
     */
    this.getRandomString = function(stringLength,
                                    allowedCharacters){
        var randomString = '',
        charactersPosition,
        i;

        allowedCharacters = allowedCharacters !== undefined ? allowedCharacters:'0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

        for (i=0; i<stringLength; i++){
            charactersPosition = Math.floor(Math.random()*allowedCharacters.length);
            randomString += allowedCharacters.substring(charactersPosition, charactersPosition+1);
        }
        return randomString;
    };
    
    /*
     * Returns a part of a string followed by 3 dots.
     * 
     * @param str (String): the string
     * @param size (Number): the number of characters that will be displayed minus 3 dots
     * 
     * @return short string ...
     */
    this.getShortString = function(str,
                                   size){
        var newStr = new Array(),
        pieces = str.split(''), 
        i;

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
    };
    
    /*
     * Returns a number with a predefined number of decimals.
     * 
     * @param number (Number): the number
     * @param no (Number): the number of decimals
     * 
     * @return string with number and decimals
     */
    this.getWithDecimals = function(number,
                                    no){
        no = no === undefined ? 2:no;
        return parseInt(number) === number ? String(number):parseFloat(number).toFixed(no);
    };
    
    /*
     * Verify if a string contains allowed characters.
     * 
     * @param str (String): string to be checked
     * @param allowedCharacters (String): the string of allowed characters
     * 
     * @return true/false
     */
    this.validateCharacters = function(str,
                                       allowedCharacters){
        var characters = str.split(''), 
        i;

        for (i=0; i<characters.length; i++){
            if (allowedCharacters.indexOf(characters[i]) === -1){
                return false;
            }
        }
        return true;
    };
    
    /*
     * Email validation.
     * 
     * @param email (String): email to be checked
     * 
     * @return true/false
     */
    this.validEmail = function(email){
        var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (filter.test(email)){
            return true;
        }
        return false;
    };
    
    /*
     * Remove slashes from string.
     * 
     * @param str (String): the string
     * 
     * @return string without slashes
     */
    this.stripSlashes = function(str){
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
    };

// Styles
    
    /*
     * Convert RGB color to HEX.
     * 
     * @param rgb (String): RGB color
     * 
     * @return color HEX
     */
    this.getHEXfromRGB = function(rgb){
        var hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        return (isNaN(rgb[1]) ? '00':hexDigits[(rgb[1]-rgb[1]%16)/16]+hexDigits[rgb[1]%16])+
               (isNaN(rgb[2]) ? '00':hexDigits[(rgb[2]-rgb[2]%16)/16]+hexDigits[rgb[2]%16])+
               (isNaN(rgb[3]) ? '00':hexDigits[(rgb[3]-rgb[3]%16)/16]+hexDigits[rgb[3]%16]);
    };

    /*
     * Set text color depending on the background color.
     * 
     * @param bgColor(String): background color
     * 
     * return white/black
     */
    this.getIdealTextColor = function(bgColor){
        var rgb = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(bgColor);

        if (rgb !== null){
            return parseInt(rgb[1], 10)+parseInt(rgb[2], 10)+parseInt(rgb[3], 10) < 3*256/2 ? 'white' : 'black';
        }
        else{
            return parseInt(bgColor.substring(0, 2), 16)+parseInt(bgColor.substring(2, 4), 16)+parseInt(bgColor.substring(4, 6), 16) < 3*256/2 ? 'white' : 'black';
        }
    };
    
    return this.DOPPrototypes();
};
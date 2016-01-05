
/*
* Title                   : DOP Select (jQuery Plugin)
* Version                 : 1.1
* File                    : jquery.dop.Select.js
* File Version            : 1.1
* Created / Last Modified : 03 August 2014
* Copyright               : © 2014 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : DOP Select jQuery plugin.
*/

(function($){
    $.fn.DOPSelect = function(options){
        /*
         * Private variables.
         */
        var Data = {},
        Container = this,
        
        ID = '',
        id = '',
        name = '',
        classes = '',
        onChange = '',
        isDisabled = false,
        isMultiple = false,
        thisItem = '',
        values = new Array(),
        labels = new Array(),
        selectedOption = 0,
        
        firstClick = false,
        wasChanged = false,

        methods = {            
                    init:function(){
                    /*
                     * Initialize jQuery plugin.
                     */ 
                        return this.each(function(){
                            if (options){
                                $.extend(Data, options);
                            }
                            methods.parse();
                        });
                    },
                    parse:function(){
                    /*
                     * Parse select options.
                     */ 
                        id = $(Container).attr('id') !== undefined ? $(Container).attr('id'):'';
                        name = $(Container).attr('name') !== undefined ? $(Container).attr('name'):'';
                        classes = $(Container).attr('class') !== undefined ? $(Container).attr('class'):'';
                        onChange = $(Container).attr('onchange') !== undefined ? $(Container).attr('onchange'):'';
                        isDisabled = $(Container).attr('disabled') !== undefined ? true:false;
                        thisItem = id !== '' ? '#'+id:'select[name*="'+name+'"]';
                        isMultiple = $(thisItem+'[multiple]').length ? true:false;
                        ID = id !== '' ? id:name;
                            
                        $(thisItem+' option').each(function(){
                            values.push($(this).attr('value'));
                            labels.push($(this).html());
                            
                            if ($(this).is(':selected')){
                                selectedOption = values.length-1;
                            }
                        });
                        methods.display();
                    },
                    display:function(){
                    /*
                     * Display select component.
                     */
                        var HTML = new Array(), 
                        i;
                        
                        HTML.push('<div id="DOPSelect-'+ID+'" class="DOPSelect '+(isMultiple ? 'dopselect-multiple':'dopselect-single')+' '+(isDisabled ? 'dopselect-disabled':'')+' '+classes+'">');
                        HTML.push(' <input type="hidden" id="'+ID+'" name="'+name+'" value="'+(isMultiple ? '':values[selectedOption])+'">');
                        
                        /*
                         * Display "selected" component only on single select.
                         */
                        if (!isMultiple){
                            HTML.push(' <div class="dopselect-select">');
                            HTML.push('     <div class="dopselect-selection">'+(values.length !== 0 ? labels[selectedOption]:'')+'</div>');
                            HTML.push('     <div class="dopselect-icon">&#x25BE;</div>');
                            HTML.push(' </div>');
                        }
                        HTML.push(' <ul>');
                        
                        for (i=0; i<values.length; i++){
                            if (!isMultiple){
                            /*
                             * Single select options.
                             */
                                HTML.push('     <li id="DOPSelect-'+ID+'-'+values[i]+'" title="'+labels[i]+'"'+(selectedOption === i ? ' class="dopselect-selected"':'')+'>'+labels[i]+'</li>');
                            }
                            else{
                            /*
                             * Multiple select options.
                             */
                                HTML.push('     <li title="'+labels[i]+'">');
                                HTML.push('         <input type="checkbox" name="DOPSelect-'+ID+'-'+values[i]+'" id="DOPSelect-'+ID+'-'+values[i]+'"'+(isDisabled ? ' disabled="disabled"':'')+' />');
                                HTML.push('         <label for="DOPSelect-'+ID+'-'+values[i]+'">'+labels[i]+'</label>');
                                HTML.push('     </li>');
                            }
                        }
                        HTML.push(' </ul>');
                        HTML.push(' <div class="option-extension"></div>');
                        HTML.push('</div>');
                        
                        $(Container).replaceWith(HTML.join(''));
                        
                        if (!isDisabled){
                            methods.events();
                        }
                    },
                    events:function(){
                    /*
                     * Initialize select component events.
                     */
                        if (isMultiple){
                        /*
                         * Multiple select events.
                         */
                            $('#DOPSelect-'+ID+' ul li').unbind('click');
                            $('#DOPSelect-'+ID+' ul li').bind('click', function(){
                                var selected = new Array(),
                                id;
                                
                                $('#DOPSelect-'+ID+' ul li input[type=checkbox]').each(function(){
                                    if ($(this).is(':checked')){
                                        id = $(this).attr('id').split('DOPSelect-'+ID+'-')[1];
                                        selected.push(id);
                                    }
                                });
                                
                                $('#'+ID).val(selected)
                                         .trigger('change');

                                if (onChange !== ''){
                                    eval(onChange.replace(/this.value/g, selected));
                                }
                            });
                        }
                        else{
                        /*
                         * Single select events.
                         */ 
                            $(document).mousedown(function(event){
                                if ($(event.target).parents('#DOPSelect-'+ID).length === 0){
                                    $('#DOPSelect-'+ID+' ul').css('display', 'none')
                                                             .scrollTop(0);
                                }
                            });
                            
                            $('#DOPSelect-'+ID+' .dopselect-select').unbind('click');
                            $('#DOPSelect-'+ID+' .dopselect-select').bind('click', function(){
                                
                                if ($('#DOPSelect-'+ID+' ul').css('display') === 'block'){
                                    $('#DOPSelect-'+ID+' ul').css('display', 'none')
                                                             .scrollTop(0);
                                }
                                else{
                                    var scrollTo;
                                    
                                    $('.DOPSelect.dopselect-single ul').css('display', 'none');
                                    $('#DOPSelect-'+ID+' ul').css('display', 'block');
                                    
                                    /*
                                     * Duplicate scrollTo action for the right position.
                                     */
                                    scrollTo = $('#DOPSelect-'+ID+' ul li.dopselect-selected').position().top-$('#DOPSelect-'+ID+' ul li.dopselect-selected').height();
                                    $('#DOPSelect-'+ID+' ul').scrollTop(scrollTo);
                                    
                                    if (wasChanged 
                                            || firstClick){
                                        scrollTo = $('#DOPSelect-'+ID+' ul li.dopselect-selected').position().top-$('#DOPSelect-'+ID+' ul li.dopselect-selected').height();
                                        $('#DOPSelect-'+ID+' ul').scrollTop(scrollTo);
                                    }
                                    
                                    if (!firstClick){
                                        firstClick = true;
                                    }
                                }
                            });

                            $('#DOPSelect-'+ID+' ul li').unbind('click');
                            $('#DOPSelect-'+ID+' ul li').bind('click', function(){
                                if (!$(this).hasClass('dopselect-selected')){
                                    wasChanged = true; 
                                    
                                    $('#DOPSelect-'+ID+' ul li').removeClass('dopselect-selected');
                                    $(this).addClass('dopselect-selected');
                                    $('#DOPSelect-'+ID+' .dopselect-selection').html($(this).html());
                                    $('#'+ID).val($(this).attr('id').split('DOPSelect-'+ID+'-')[1])
                                             .trigger('change');

                                    if (onChange !== ''){
                                        eval(onChange.replace(/this.value/g, "'"+$(this).attr('id').split('DOPSelect-'+ID+'-')[1]+"'"));
                                    }
                                }
                                $('#DOPSelect-'+ID+' ul').css('display', 'none')
                                                         .scrollTop(0);
                            });
                        }
                    }
                  };

        return methods.init.apply(this);
    };
})(jQuery);
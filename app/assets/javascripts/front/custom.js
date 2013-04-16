(function($) {
    
    $.getScript('/assets/front/customize/customize.js');
    
    /**
     * Escape html string, so that it is not parsed as HTML
     * 
     * @param str string
     */
    function dm3_escape_html(str) {
      return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    }
    
    
    /**
     * Popover
     * 
     * @param selector string
     * @param callback function
     */
    function dm3_popover(selector, callback) {
        var triggers = $(selector),
            trigger_event = 'click';
        
        triggers.each(function() {
            var trigger = $(this),
                popover = trigger.parent().find('.popover');
                
            popover.click(function(e) {
                e.stopPropagation();
            });
            
            trigger.bind(trigger_event, function(e) {
                var trigger = $(this),
                    popover = trigger.parent().find('.popover');
                
                e.preventDefault();
                e.stopPropagation();
                
                if (typeof callback === 'function') {
                    callback(trigger, popover);
                }
                
                if (popover.is(':visible')) {
                    popover.hide();
                    trigger.removeClass('active');
                } else {
                    popover.show();
                    trigger.addClass('active');
                    
                    $('body').one('click', function() {
                        popover.hide();
                        trigger.removeClass('active');
                    });
                }
            });
        });
    }
    
    
    /**
     * Focus on input field in popovers
     * 
     * @param trigger object
     * @param popover object
     */
    function dm3_popover_input_focus(trigger, popover) {
        setTimeout(function() { popover.find('input[type="text"]').trigger('focus'); }, 200)
    }
    
    
    /**
     * Process site navigation
     * 
     * @param selector string
     */
    function dm3_nav(selector) {
        var nav = $(selector);
        
        nav.find('ul').each(function() {
            var ul = $(this),
                pointer = $('<span class="nav-pointer">&raquo;</span>'),
                arrow = $('<span class="pointer"></span>');
            
            arrow.insertAfter(ul);
            ul.parent().find('a:first').append(pointer);
        });
    }
    
    
   
    
    
    /**
     * Items fader (fade out unhovered items in a collection)
     * 
     * @param container_selector string
     * @param item_selector string
     */
    function dm3_items_fader(container_selector, item_selector) {
        var container = (typeof container_selector == 'string') ? $(container_selector) : container_selector,
            items = container.find(item_selector),
            itemPrev = null,
            ignore = false;
        
        container.mouseenter(function() {
            if (!container.hasClass('ignore')) {
                items.not('.hovered').animate({ 'opacity': .3 }, { 'duration': 300, 'queue': false });
            }
        });
        
        container.mouseleave(function() {
            if (!container.hasClass('ignore')) {
                items.animate({ 'opacity': 1 }, { 'duration': 300, 'queue': false });
                items.removeClass('hovered');
            }
        });
        
        var item_hover = function(item) {
            if (container.hasClass('ignore')) {
                if (itemPrev) {
                    itemPrev.removeClass('hovered');
                    itemPrev = null;
                }
                return;
            }
            
            if (itemPrev) {
                itemPrev.animate({ 'opacity': .3 }, { 'duration': 300, 'queue': false });
                itemPrev.removeClass('hovered');
            }
            item.addClass('hovered');
            item.animate({ 'opacity': 1 }, { 'duration': 300, 'queue': false });
            itemPrev = item;
        };
        
        items.each(function() {
            var item = $(this);
            
            item.hover(function() {
                item_hover($(this));
            });
        });
    }
    
    
    /**
     * Services full area click
     * 
     * @param items_selector string
     * @param link_selector string
     */
    function dm3_full_area_click(items_selector, link_selector) {
        var items = $(items_selector);
            
        items.click(function() {
            var item = $(this),
                link = item.find(link_selector + ':first');
            window.location = link.attr('href');
        });
    }
    
    
    function dm3_gallery_filter(filter) {
        var filters = filter.find('a'),
            container = filter.next(),
            items = container.children('.gallery-item'),
            prevFilter = filter.find('.active:first');
        
        filters.click(function(e) {
            var filter = $(this),
                filter_val = filter.data('filter');
                
            prevFilter.removeClass('active');
            filter.addClass('active');
            
            if (filter_val !== 'all') {
                container.addClass('ignore');
            } else {
                container.removeClass('ignore');
            }
            
            e.preventDefault();
            
            items.each(function() {
                var item = $(this),
                    item_filter = item.data('filter');
                
                if (item_filter.indexOf(filter_val) != -1 || filter_val === 'all') {
                    item.animate({ 'opacity': 1 }, { 'duration': 300, 'queue': false });
                    item.removeClass('disabled');
                } else {
                    item.animate({ 'opacity': .3 }, { 'duration': 300, 'queue': false });
                    item.addClass('disabled');
                }
            });
            
            prevFilter = filter;
        });
    }
    
    
    /**
     * Toggle Boxes
     */
    function dm3_toggle_boxes() {
        
        $('.toggle-box').hide();
        
        $('.toggle-header').each(function() {
            var el = $(this);
            var content = el.next('.toggle-box');
            
            if (!content.length)
                return;
            
            this.toggle_open = false;
            
            // bind onclick event to the toggle header
            el.click(function() {
                if (this.toggle_open == true) {
                    el.removeClass('toggle-open');
                    this.toggle_open = false;
                } else {
                    el.addClass('toggle-open');
                    this.toggle_open = true;
                }
                
                content.slideToggle('slow');
            });
        });
    }
    
    
    /**
     * Activate main navigation select box for mobile devices
     */
    function dm3_nav_select() {
        var nav_select = $('#header .nav-select');
        
        nav_select.on('change', function() {
            window.location = $(this).val();
        });
    }
    
    
    /**
     * Initialization
     */
    $(document).ready(function() {
        
        // Select box main navigation for small screen widths
        dm3_nav_select();
        
        // Homepage slideshow
        $('.homepage .r-slider').dm3ResponsiveSlider({
            afterSlideCb: function() {
                var slide = this.slides.eq(this.curSlideNum-1),
                    desc = slide.find('.description:first').html(),
                    desc_container = $('.r-slider-container > .description:first');
                
                if (this.prevSlideNum === this.curSlideNum) {
                    return;
                }
                
                desc_container.fadeOut(300, function() {
                    desc_container.html(desc);
                    desc_container.fadeIn(300);
                });
            }
        });
        
        // Other sliders
        $('.r-slider').dm3ResponsiveSlider();
        
        // Popover
        dm3_popover('.trigger-popover', dm3_popover_input_focus);
        
        // Navigation
        dm3_nav('#header .nav-h:first');
        
        // Tabs
        $('.tabs').dm3Tabs();
        
        // Gallery
        $('.dm3-gallery-trigger').dm3Gallery({
            keyupCb: function(key_code) {
                if (key_code === 13) {
                    window.location = this.content.find('.btn-large:first').attr('href');
                }
            }
        });
        
       
        
        // Items fader (e.g. gallery fade effect)
        dm3_items_fader('.gallery-container', '.gallery-item');
        
       
        
        // Full area click for services
        dm3_full_area_click('.services > li', '> a');
        
        // Gallery filter
        dm3_gallery_filter($('.gallery-filter'));
        
        // Toggles
        dm3_toggle_boxes();
        
        // Gallery item click
        $('.gallery-item').click(function(e) {
            var item = $(this);
            if (!$(e.target).is('img')) {
                item.find('.dm3-gallery-trigger:first').data('Dm3Gallery').show();
            }
        }).find('.gallery-title a').click(function(e) { e.preventDefault(); });
        
        // Carousel
        $('.dm3-carousel').dm3Carousel({
            afterInitCb: null,
            itemWidth: 140
        });
    });
    
}(jQuery));

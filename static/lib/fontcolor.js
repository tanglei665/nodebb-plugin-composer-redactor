(function($)
{
    $.Redactor.prototype.fontcolor = function()
    {
        return{
            translations: {
                en: {
                    "fontcolor": "Text Color",
                    "text": "Text",
                    "highlight": "Highlight"
                }
            },
            // messages
            onfontcolor: {
                set: function(rule, value)
                {
                    this.fontcolor._set(rule, value);
                },
                remove: function(rule)
                {
                    this.fontcolor._remove(rule);
                }
            },
    
            // public
            // start: function()
            // {
            //     console.log('start')
            //     var btnObj = {
            //         title: this.lang.get('fontcolor')
            //     };
    
            //     var $dropdown = this._buildDropdown();
    
            //     // this.$button = this.toolbar.addButton('fontcolor', btnObj);
            //     var $button = this.button.addAfter('image', 'fontcolor', this.lang.get('fontcolor'));
            //     this.$button.setIcon('<i class="re-icon-fontcolor"></i>');
            //     // this.$button.setDropdown($dropdown);
            //     this.$button.addDropdown(button, $dropdown);
            // },
    
            // private
            _buildDropdown: function()
            {
                var $dropdown = $('<div class="redactor-dropdown-cells">');
    
                this.fontcolor.$selector = this.fontcolor._buildSelector();
    
                this.fontcolor.$selectorText = this.fontcolor._buildSelectorItem('text', this.lang.get('text'));
                this.fontcolor.$selectorText.addClass('active');
    
                // this.fontcolor.$selectorBack = this.fontcolor._buildSelectorItem('back', this.lang.get('highlight'));
                this.fontcolor.$selectorBack = this.fontcolor._buildSelectorItem('back', 'Highlight');
    
                this.fontcolor.$selector.append(this.fontcolor.$selectorText);
                this.fontcolor.$selector.append(this.fontcolor.$selectorBack);
    
                this.fontcolor.$pickerText = this.fontcolor._buildPicker('textcolor');
                this.fontcolor.$pickerBack = this.fontcolor._buildPicker('backcolor');
                $dropdown.append(this.fontcolor.$selector);
                $dropdown.append(this.fontcolor.$pickerText);
                $dropdown.append(this.fontcolor.$pickerBack);
    
                this.fontcolor._buildSelectorEvents();
    
                $dropdown.width(242);
    
                return $dropdown;
            },
            _buildSelector: function()
            {
                var $selector = $('<div>');
                $selector.addClass('redactor-dropdown-selector');
    
                return $selector;
            },
            _buildSelectorItem: function(name, title)
            {
                var $item = $('<span>');
                $item.attr('rel', name).html(title);
                $item.addClass('redactor-dropdown-not-close');
    
                return $item;
            },
            _buildSelectorEvents: function()
            {
                this.fontcolor.$selectorText.on('mousedown', function(e)
                {
                    e.preventDefault();
                    this.$selector.find('span').removeClass('active');
                    this.$pickerBack.hide();
                    this.$pickerText.show();
                    this.$selectorText.addClass('active');
    
                }.bind(this.fontcolor));
    
                this.fontcolor.$selectorBack.on('mousedown', function(e)
                {
                    e.preventDefault();
    
                    this.$selector.find('span').removeClass('active');
                    this.$pickerText.hide();
                    this.$pickerBack.show();
                    this.$selectorBack.addClass('active');
    
                }.bind(this.fontcolor));
            },
            _buildPicker: function(name)
            {
                var $box = $('<div class="re-dropdown-box-' + name + '">');
                var rule = (name == 'backcolor') ? 'background-color' : 'color';
                var len = this.fontcolor.colors.length;
                var self = this.fontcolor;
                var func = function(e)
                {
                    e.preventDefault();
    
                    var $el = $(e.target);
                    self._set($el.data('rule'), $el.attr('rel'));
                };
    
                for (var z = 0; z < len; z++)
                {
                    var color = this.fontcolor.colors[z];
    
                    var $swatch = $('<span>');
                    $swatch.attr({ 'rel': color, 'data-rule': rule });
                    $swatch.css({ 'background-color': color, 'font-size': 0, 'border': '2px solid #fff', 'width': '22px', 'height': '22px' });
                    $swatch.on('mousedown', func);
    
                    $box.append($swatch);
                }
    
                var $el = $('<a>');
                $el.attr({ 'href': '#' });
                $el.css({ 'display': 'block', 'clear': 'both', 'padding': '8px 5px', 'font-size': '12px', 'line-height': 1 });
                $el.html(this.lang.get('none'));
    
                $el.on('click', function(e)
                {
                    e.preventDefault();
                    self._remove(rule);
                });
    
                $box.append($el);
    
                if (name == 'backcolor') $box.hide();
    
                return $box;
            },
            _set: function(rule, value)
            {
                var style = {};
                style[rule] = value;
    
                var args = {
                    tag: 'span',
                    style: style,
                    type: 'toggle'
                };
    
                this.inline.format('span', 'style', style, 'toggle', true);
            },
            _remove: function(rule)
            {
                this.inline.format('span', 'style', { rule: 'none' } , 'toggle', true);
                // this.inline.remove({ style: rule });
            },
            init: function()
            {
                // this.app = app;
                // this.opts = app.opts;
                // this.lang = app.lang;
                // this.inline = app.inline;
                // this.toolbar = app.toolbar;
                // this.selection = app.selection;
    
                // local
                this.fontcolor.colors = (this.opts.fontcolors) ? this.opts.fontcolors : [
                    '#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646', '#ffff00',
                    '#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada', '#fff2ca',
                    '#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5', '#ffe694',
                    '#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#b7dde8', '#fac08f', '#f2c314',
                    '#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#92cddc', '#e36c09', '#c09100',
                    '#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#31859b',  '#974806', '#7f6000'
                ];
                // var btnObj = {
                //     title: this.lang.get('fontcolor')
                // };

                // dropdown.insert_table = {
				// 	title: this.lang.get('insert-table'),
				// 	func: this.table.insert,
				// 	observe: {
				// 		element: 'table',
				// 		in: {
				// 			attr: {
				// 				'class': 'redactor-dropdown-link-inactive',
				// 				'aria-disabled': true,
				// 			}
				// 		}
				// 	}
				// };
    
                var $dropdown = this.fontcolor._buildDropdown();
    
                // this.$button = this.toolbar.addButton('fontcolor', btnObj);
                
                var $button = this.button.addAfter('image', 'fontcolor', this.lang.get('fontcolor'));
                this.button.setIcon($($button).eq(0), '<i class="re-icon-fontcolor"></i>');
                // this.$button.setDropdown($dropdown);
                this.button.addDropdown($($button).eq(0), $dropdown, true);
                // this.button.addDropdown($($button).eq(0), $dropdown);
            }
        }
        
    };
})(jQuery);
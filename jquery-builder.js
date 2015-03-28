var JQueryBuilder = (function () {
    function initjQuery (initCallback) {
        return (function () {
            var Parent = Array.prototype,
                jQuery = function () {
                    // ������� �� ��������� �����, ������ �� ������.
                    var JQuery = function () {}, // Temp === JQuery
                        inst,
                        ret,
                        Constructor = jQuery.fn.init;
                    JQuery.prototype = Constructor.prototype; // Temp === JQuery
                    inst = new JQuery();

                    ret = Constructor.apply(inst, arguments);
                    inst.constructor = Constructor;

                    return Object(ret) === ret ? ret : inst;
                };

            
            // ��������� �� �������
            jQuery.fn = jQuery.prototype = [];

            /**
             * ������ ����������, ������� ����� �������� � init()
             * @type {Array}
             */
            jQuery.fn.arguments = [];

            /**
             * ����������, �����������
             * @type {Function}
             */
            jQuery.fn.constructor = jQuery;

            jQuery.fn.name = 'jQuery';
            /**
             * ����� �����. �������, ���������������� ���� �������
             * @type {Function}
             */
            jQuery.fn.init = function () {
                // this.arguments = arguments; ������, ������ ��� arguments - �� ������, � ������,
                // ������� ����� ��������� ��� � ������, [].slice.call ��� � ������ � ���� ������
                this.arguments = [].slice.call(arguments);
                return initCallback.apply(this, this.arguments);
            };
            
            /**
             * [].push();
             * @param obj ������, ������� ����� �������� � ������
             * @returns {jQuery.fn}
             */
            jQuery.fn.push = function (obj) {
                Parent.push.call(this, obj);
                return this;
            };

            
            /**
             * [].join();
             * @param delimiter �����������. �������������� ��������. �� ��������� ��� ����� �������
             * @returns {jQuery.fn|string}
             */
            jQuery.fn.join = function (delimiter) {
                var result = Parent.join.call(this, delimiter);
                return result;
            };

            
            /**
             * [].pop();
             * @returns {*}
             */
            jQuery.fn.pop = function () {
                return Parent.pop.call(this);
            };

            jQuery.fn.some = function (selector) {
                var result = false;
                this.each(function (i) {
                    if (jQuery.is(this, selector)) {
                        result = true;
                        return false;
                    }
                });
                return result;
            };
            
            jQuery.fn.every = function (selector) {
                var result = false;
                this.each(function (i) {
                    if ( ! jQuery.is(this, selector)) {
                        result = false;
                        return result;
                    }
                });
                return result;
            };
        
            /**
             * [].map(callback);
             * @param callback
             * @returns {*}
             */
            jQuery.fn.map = function (callback) {
                var self = this;
                return this.each(function (i) {
                    self[i] = callback.call(this, i);
                });
            };

            
            /**
             * ���������� ������ �������, ����� ��� arr.length
             * @returns {jQuery.fn|Number}
             */
            jQuery.fn.size = function() {
                return this.length;
            };

            
            /**
             * ���������� ���������� ���������, ���������� ��� �������
             * @returns {Number}
             */
            jQuery.fn.count = function(filter) {
                var result = 0;
                if (typeof filter === 'function') {
                    this.each(function () {
                        if (filter.call(this)) {
                            result++;
                        }
                    });
                } else {
                    result = this.size();
                }
                return result;
            };

            
            /**
             * ������� ��� ������� �� ����� ������� ����� ���������, ������ [].forEach()
             * @param callback
             * @returns {jQuery.fn}
             */
            jQuery.fn.each = function ( callback ) {
                for(var i = 0; i < this.length; i++) {
                    var result = callback.call(this[i], i);
                    if (result === false)
                        break;
                }
                return this;
            };

            
            /**
             * ���������� ������ ������� �� �������
             * @returns {*}
             */
            jQuery.fn.first = function () {
                return this.get(0);
            };

            
            /**
             * ���������� ��������� ������� �� �������
             * @returns {*}
             */
            jQuery.fn.last = function () {
                return this.get(this.length-1);
            };

            
            /**
             * ���������� ������� �� �������, ����������� �� ���������� �������
             * @param i ������
             * @returns {*}
             */
            jQuery.fn.get = function (i) {
                return this[i];
            };

            
            /**
             * ������������� �������� ��������, ������������ �� ���������� �������
             * @param index ������
             * @param value ����� ��������
             * @returns {jQuery.fn}
             */
            jQuery.fn.set = function (index, value) {
                this[index] = value;
                return this;
            };

            
            /**
             * ������-������, ������ get � set � jQuery-style
             * @param index ������
             * @param value ��������. ���� ��������, �� ��������� set, ����� get
             * @returns {*}
             */
            jQuery.fn.el = function (index, value) {
                if (typeof value === 'undefined') {
                    return this.get(index);
                }
                return this.set(index, value);
            };

            
            /**
             * ������� ������� �� ���������� �������
             * TODO ��������� ����� ��������� ������
             * @param index
             * @returns {*}
             */
            jQuery.fn.unset = function (index, count) {
                if ( ! jQuery.defined(count)) {
                    count = 1;
                }
                this.splice(index, count);
                return this;
            };

            
            jQuery.toArray = function (obj) {
                return Array.prototype.slice.call(obj);
            };
            
            /**
             * ��������� ��������� �������� ������ �� ������� �������
             * @returns {jQuery.fn|Array}
             */
            jQuery.fn.toArray = function () {
                return jQuery.toArray(this);
            };

            /**
             * @returns {*}
             */
            jQuery.fn.toString = function () {
                var name = typeof this.name !== 'undefined' ? this.name : 'jQuery';
                return name + ' (' + this.length + ' item' + (this.length === 1 ? '' : 's') + ')';
            };

            /**
             * ��������� ������� ����������
             * @param name
             * @param fn
             * @returns {jQuery.fn}
             */
            jQuery.fn.extend = function (name, fn) {
                var fns;
                if (typeof name === 'object') {
                    fns = name;
                    for(var prop in fns) {
                        if (fns.hasOwnProperty(prop)) {
                            this[prop] = fns[prop];
                            this.extend(prop, fns[prop]);
                        }
                    }
                    return this;
                }
                this[name] = fn;
                return this;
            };

            /**
             * ���� ������ �������� ���������, �� ���������� ��� ��������, ����� ���������� ��� ������
             * @param obj ������
             * @returns {XMLList|XML|Namespace|*|Array|boolean}
             */
            jQuery.value = function (obj) {
                return obj.valueOf();
            };

            
            /**
             *  ������ ������ jQuery.extend
             */
            jQuery.extend = function() {
                var src, copyIsArray, copy, name, options, clone,
                    target = arguments[0] || {},
                    i = 1,
                    length = arguments.length,
                    deep = false;

                // Handle a deep copy situation
                if ( typeof target === "boolean" ) {
                    deep = target;

                    // skip the boolean and the target
                    target = arguments[ i ] || {};
                    i++;
                }

                // Handle case when target is a string or something (possible in deep copy)
                if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
                    target = {};
                }

                // extend jQuery itself if only one argument is passed
                if ( i === length ) {
                    target = this;
                    i--;
                }

                for ( ; i < length; i++ ) {
                    // Only deal with non-null/undefined values
                    if ( (options = arguments[ i ]) != null ) {
                        // Extend the base object
                        for ( name in options ) {
                            src = target[ name ];
                            copy = options[ name ];

                            // Prevent never-ending loop
                            if ( target === copy ) {
                                continue;
                            }

                            // Recurse if we're merging plain objects or arrays
                            if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                                if ( copyIsArray ) {
                                    copyIsArray = false;
                                    clone = src && jQuery.isArray(src) ? src : [];

                                } else {
                                    clone = src && jQuery.isPlainObject(src) ? src : {};
                                }

                                // Never move original objects, clone them
                                target[ name ] = jQuery.extend( deep, clone, copy );

                            // Don't bring in undefined values
                            } else if ( copy !== undefined ) {
                                target[ name ] = copy;
                            }
                        }
                    }
                }

                // Return the modified object
                return target;
            };

            jQuery.fn.init.prototype = jQuery.fn;
            JQueryBuilder.jQuery = jQuery;
            return jQuery;
        })();
    }

    /**
     * ��� �����������
     */
    function JQueryBuilder(initCallback) {
        this.jQuery = initjQuery(initCallback);
    }

    
    /**
     * ��������� ����� ������� �� ���������� ����������
     * @returns {JQueryBuilder}
     */
    JQueryBuilder.from = function () {
        return new JQueryBuilder(function () {
            for(var i = 0; i < arguments.length; i++) {
                this.push(arguments[i]);
            }
        });
    };

    
    /**
     * ��������� ����� ������� �� ����������� ������� � �����������, ���� � �������������� �������
     * @param array ��� ������, �������������� ��������
     * @returns {JQueryBuilder}
     */
    JQueryBuilder.fromArray = function (array) {
        return new JQueryBuilder(function (anotherArray) {
            if (typeof array === 'undefined') {
                array = anotherArray;
            }
            for(var i = 0; i < array.length; i++) {
                this.push(array[i]);
            }
        });
    };

    
    /**
     * # �������� ����
     */
    JQueryBuilder.fromArray = function (array) { // ��� ��� �� ������ ����?
        var args = arguments;
        return new JQueryBuilder(function (anotherArray) {
            var array = args;
            if (array.length === 0) {
                array = arguments;
            }
            for(var i = 0; i < array.length; i++) {
                this.push(array[i]);
            }
        });
    };

    
    /**
     * # �������� ����
     */
    JQueryBuilder.simple = function (array) {
        var builder = new JQueryBuilder(function (selector, context) {
            if (selector instanceof JQueryBuilder.jQuery) {
                var self = this;
                selector.each(function () {
                    self.push(this);
                });
                return;
            }
            if (typeof context === 'undefined') {
                if (typeof array !== 'undefined') {
                    context = array;
                } else {
                    throw 'Unknown source';
                }
            }

            for(var i = 0; i < context.length; i++) {
                var el = context[i];
                if (builder.is(selector, el, i)) {
                    this.push(el);
                }
            }
        });

        /**
         * # �������� ����
         */
        builder.is = function (selector, el, i) {
            switch (typeof selector) {
                case 'undefined' :
                    return true;

                case 'string' :
                    switch (selector) {
                        case 'even-index' :
                            return i % 2 === 0;

                        case 'odd-index' :
                            return i % 2 !== 0;

                        case 'even-value' :
                            return el % 2 === 0;

                        case 'odd-value' :
                            return el % 2 !== 0;
                    }
                    return false;
                case 'object' :
                    if (selector instanceof RegExp) {
                        return selector.test(el);
                    }

                    if (selector instanceof Array) {
                        var matches = [];
                        for (var _i = 0; _i < selector.length; _i++) {
                            matches.push(arguments.callee.call(this, selector[_i]));
                        }
                        return matches.indexOf(true);
                    }

                    return true;
                case 'function' :
                    return selector.call(this, i);
            }
            return false;
        };
        return builder;
    };

    return JQueryBuilder;
}());
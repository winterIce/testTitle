/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _Main = __webpack_require__(3);

	var _Main2 = _interopRequireDefault(_Main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _reactDom.render)(_react2.default.createElement(_Main2.default, null), document.getElementById('outer'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _TimePicker = __webpack_require__(4);

	var _TimePicker2 = _interopRequireDefault(_TimePicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Main = function (_Component) {
		_inherits(Main, _Component);

		function Main(props) {
			_classCallCheck(this, Main);

			var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

			_this.state = {
				startTime: '',
				showTime: false
			};
			return _this;
		}

		_createClass(Main, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var that = this;
				that.refs.startTime.addEventListener('focus', function (evt) {
					that.setState({
						showTime: true
					});
					this.blur();
				});
			}
		}, {
			key: 'okHandler',
			value: function okHandler(val) {
				this.setState({
					startTime: val,
					showTime: false
				});
			}
		}, {
			key: 'cancelHandler',
			value: function cancelHandler() {
				this.setState({
					showTime: false
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ id: 'main', style: { marginTop: '100px' } },
						_react2.default.createElement('input', { ref: 'startTime', type: 'text', value: this.state.startTime, style: { width: '200px', height: '50px' } })
					),
					_react2.default.createElement(
						'div',
						{ ref: 'timeOuter', style: this.state.showTime ? {} : { display: 'none' } },
						_react2.default.createElement(_TimePicker2.default, { okHandler: this.okHandler.bind(this), cancelHandler: this.cancelHandler.bind(this) })
					)
				);
			}
		}]);

		return Main;
	}(_react.Component);

	exports.default = Main;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	var itemHeight = 34;

	var TimePicker = function (_Component) {
	    _inherits(TimePicker, _Component);

	    function TimePicker(props) {
	        _classCallCheck(this, TimePicker);

	        var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

	        _this.state = {
	            curItem: null,
	            touchStartY: 0,
	            touchStartTime: 0,
	            touchMoveY: 0, //记录每一帧touchMove的y坐标
	            touchEndTime: 0, //记录touchend的时间戳

	            touchMoveTime: 0, //每帧touchMove事件的时间戳

	            touching: false,
	            objTranslate: {
	                y: 0
	            },
	            objBounding: {
	                left: 0,
	                right: 0,
	                top: 0,
	                bottom: 0,
	                width: 0,
	                height: 0
	            },
	            containerBounding: {
	                left: 0,
	                right: 0,
	                top: 0,
	                bottom: 0,
	                width: 0,
	                height: 0
	            },
	            moveY: 0, //move过程中的transform-y的值
	            inertia: false, //是否处于惯性状态
	            moveYYear: 0,
	            moveYMonth: 0,
	            moveYDate: 0,
	            moveYHour: 0,
	            moveYMinute: 0,

	            year: 0,
	            month: 0,
	            date: 0,
	            hour: 0,
	            minute: 0,

	            ansTime: ''
	        };
	        return _this;
	    }

	    _createClass(TimePicker, [{
	        key: 'init',
	        value: function init() {
	            var years = [];
	            for (var i = 2010; i <= 2020; i++) {
	                years.push('<div class="time-item-content">' + i + '年</div>');
	            }
	            this.refs.yearItem.innerHTML = years.join('');

	            var months = [];
	            for (i = 1; i <= 12; i++) {
	                months.push('<div class="time-item-content">' + this.addZero(i) + '月</div>');
	            }
	            this.refs.monthItem.innerHTML = months.join('');

	            var dates = [];
	            for (i = 1; i <= 31; i++) {
	                dates.push('<div class="time-item-content">' + this.addZero(i) + '日</div>');
	            }
	            this.refs.dateItem.innerHTML = dates.join('');

	            var hours = [];
	            for (i = 0; i <= 23; i++) {
	                hours.push('<div class="time-item-content">' + this.addZero(i) + '时</div>');
	            }
	            this.refs.hourItem.innerHTML = hours.join('');

	            var minutes = [];
	            for (i = 0; i <= 59; i++) {
	                minutes.push('<div class="time-item-content">' + this.addZero(i) + '分</div>');
	            }
	            this.refs.minuteItem.innerHTML = minutes.join('');
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var d = new Date();
	            this.setState({
	                year: d.getFullYear(),
	                month: d.getMonth() + 1,
	                date: d.getDate(),
	                hour: d.getHours(),
	                minute: d.getMinutes()
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var that = this;
	            that.init();
	            var eleArr = [];
	            eleArr.push(that.refs.yearItemMask);
	            eleArr.push(that.refs.monthItemMask);
	            eleArr.push(that.refs.dateItemMask);
	            eleArr.push(that.refs.hourItemMask);
	            eleArr.push(that.refs.minuteItemMask);
	            eleArr.forEach(function (item) {
	                var itemContent = item.nextSibling.nextSibling;
	                var type = itemContent.getAttribute('data-type');
	                if (type == 'year') {
	                    that.moveElement(itemContent, 0, 34 * (2013 - that.state.year));
	                } else if (type == 'month') {
	                    that.moveElement(itemContent, 0, 34 * (4 - that.state.month));
	                } else if (type == 'date') {
	                    that.moveElement(itemContent, 0, 34 * (4 - that.state.date));
	                } else if (type == 'hour') {
	                    that.moveElement(itemContent, 0, 34 * (3 - that.state.hour));
	                } else if (type == 'minute') {
	                    that.moveElement(itemContent, 0, 34 * (3 - that.state.minute));
	                }

	                item.addEventListener('touchstart', function (event) {
	                    var item = itemContent;
	                    var evt = event.touches[0] || event;
	                    var rect = item.getBoundingClientRect();

	                    var container = item.parentNode;
	                    var containerRect = container.getBoundingClientRect();

	                    that.setState({
	                        curItem: item,
	                        touchStartY: evt.pageY,
	                        touchStartTime: +new Date(),
	                        touching: true,
	                        objBounding: {
	                            left: rect.left,
	                            right: rect.right,
	                            top: rect.top,
	                            bottom: rect.bottom,
	                            width: rect.width,
	                            height: rect.height
	                        },
	                        containerBounding: {
	                            left: containerRect.left,
	                            right: containerRect.right,
	                            top: containerRect.top,
	                            bottom: containerRect.bottom,
	                            width: containerRect.width,
	                            height: containerRect.height
	                        }
	                    });
	                });
	            });

	            document.addEventListener('touchmove', function (event) {
	                if (!that.state.touching) {
	                    return;
	                }

	                event.preventDefault();
	                var evt = event.touches[0] || event;
	                that.setState({
	                    touchMoveY: evt.pageY,
	                    touchMoveTime: +new Date()
	                });

	                var moveY = evt.pageY - that.state.touchStartY;

	                var tempY = that.state.objTranslate.y + moveY;
	                if (tempY > itemHeight * 6) {
	                    tempY = itemHeight * 6;
	                }
	                if (tempY < -(that.state.objBounding.height - itemHeight)) {
	                    tempY = -(that.state.objBounding.height - itemHeight);
	                }
	                that.moveElement(that.state.curItem, 0, tempY);
	            });

	            document.addEventListener('touchend', function (event) {
	                if (!that.state.touching) {
	                    return;
	                }
	                var evt = event.touches[0] || event;

	                that.setState({
	                    touching: false,
	                    objTranslate: {
	                        y: that.state.moveY
	                    },
	                    touchEndTime: +new Date(),
	                    inertia: true
	                });
	                that.inBox(that.state.curItem);
	                //最后一次touchMoveTime和touchEndTime之间超过30ms,意味着停留了长时间,不做滑动
	                if (that.state.touchEndTime - that.state.touchMoveTime > 30) {
	                    return;
	                }
	                var moveY = that.state.touchMoveY - that.state.touchStartY; //矢量有+-
	                var time = that.state.touchEndTime - that.state.touchStartTime;
	                var speed = moveY / time * 16.666; //矢量有+-
	                var rate = Math.min(10, Math.abs(speed)); //加速度a

	                var slide = function slide() {
	                    if (that.state.touching) {
	                        that.setState({
	                            inertia: false
	                        });
	                        return;
	                    }
	                    if (!that.state.inertia) {
	                        return;
	                    }
	                    speed = speed - speed / rate;

	                    var y = that.state.objTranslate.y + speed;

	                    that.moveElement(that.state.curItem, 0, y);
	                    that.setState({
	                        objTranslate: {
	                            y: y
	                        }
	                    });

	                    if (Math.abs(speed) < 0.5) {
	                        speed = 0;
	                        that.setState({
	                            inertia: false
	                        });
	                        that.inBox(that.state.curItem);
	                    } else {
	                        requestAnimationFrame(slide);
	                    }
	                };

	                slide();
	            });

	            //初始化时间
	            var time = this.state.year + '-' + this.addZero(this.state.month) + '-' + this.addZero(this.state.date) + ' ' + this.addZero(this.state.hour) + ':' + this.addZero(this.state.minute) + ':' + '00';
	            this.setState({
	                ansTime: time
	            });
	        }
	    }, {
	        key: 'inBox',
	        value: function inBox(ele) {
	            var that = this;
	            var maxY = 3 * itemHeight;
	            var minY = -(that.state.objBounding.height - 4 * itemHeight);
	            var moveY; //delta变化量
	            if (that.state.objTranslate.y > maxY) {
	                moveY = maxY - that.state.objTranslate.y;
	            } else if (that.state.objTranslate.y < minY) {
	                moveY = minY - that.state.objTranslate.y;
	            } else {
	                //调整位置,使时间块位于中间
	                moveY = Math.ceil(that.state.objTranslate.y / itemHeight) * itemHeight - that.state.objTranslate.y;
	            }

	            var start = 0;
	            var during = 40;
	            var init = that.state.objTranslate.y;
	            //变化量为0,不用动
	            if (moveY == 0) {
	                that.setState({
	                    inertia: false
	                });
	                that.calTime(init);
	                return;
	            }

	            var run = function run() {
	                if (that.state.touching) {
	                    that.setState({
	                        objTranslate: {
	                            y: that.state.moveY
	                        },
	                        inertia: false
	                    });
	                    return;
	                }

	                start++;
	                var y = that.easeOutQuad(start, init, moveY, during);
	                that.moveElement(ele, 0, y);

	                if (start < during) {
	                    requestAnimationFrame(run);
	                } else {
	                    that.setState({
	                        objTranslate: {
	                            y: y
	                        },
	                        inertia: false
	                    });
	                    that.calTime(y);
	                }
	            };
	            run();
	        }
	    }, {
	        key: 'calTime',
	        value: function calTime(y) {
	            var type = this.state.curItem.getAttribute('data-type');
	            if (type == 'year') {
	                this.setState({
	                    moveYYear: y,
	                    year: 2013 - y / itemHeight
	                });
	            } else if (type == 'month') {
	                this.setState({
	                    moveYMonth: y,
	                    month: 4 - y / itemHeight
	                });
	            } else if (type == 'date') {
	                this.setState({
	                    moveYDate: y,
	                    date: 4 - y / itemHeight
	                });
	            } else if (type == 'hour') {
	                this.setState({
	                    moveYMonth: y,
	                    hour: 3 - y / itemHeight
	                });
	            } else if (type == 'minute') {
	                this.setState({
	                    moveYMonth: y,
	                    minute: 3 - y / itemHeight
	                });
	            }
	            var time = this.state.year + '-' + this.addZero(this.state.month) + '-' + this.addZero(this.state.date) + ' ' + this.addZero(this.state.hour) + ':' + this.addZero(this.state.minute) + ':' + '00';
	            console.log(time);
	            this.setState({
	                ansTime: time
	            });
	        }
	    }, {
	        key: 'moveElement',
	        value: function moveElement(ele, x, y) {
	            var x = Math.round(1000 * x) / 1000;
	            var y = Math.round(1000 * y) / 1000;

	            ele.style.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
	            ele.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
	            this.setState({
	                moveY: y
	            });
	        }
	        // easeOutQuad算法,先慢后快
	        /*
	         * t: current time(当前时间)
	         * b: beginning value(初始值)
	         * c: change in value(变化量)
	         * d: duration(持续时间)
	        **/

	    }, {
	        key: 'easeOutQuad',
	        value: function easeOutQuad(t, b, c, d) {
	            return -c * (t /= d) * (t - 2) + b;
	        }
	    }, {
	        key: 'addZero',
	        value: function addZero(n) {
	            if (n < 10) {
	                return '0' + n;
	            }
	            return n;
	        }
	    }, {
	        key: 'okHandler',
	        value: function okHandler() {
	            this.props.okHandler(this.state.ansTime);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement('div', { className: 'shadow-layer' }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'time-picker-container' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'operate-container' },
	                        _react2.default.createElement(
	                            'div',
	                            { ref: 'okBtn', className: 'operate-btn', onClick: this.props.cancelHandler.bind(this) },
	                            '\u53D6\u6D88'
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { ref: 'cancelBtn', className: 'operate-btn', onClick: this.okHandler.bind(this) },
	                            '\u786E\u5B9A'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'time-item-container' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'time-item' },
	                            _react2.default.createElement('div', { className: 'time-item-mask', ref: 'yearItemMask' }),
	                            _react2.default.createElement('div', { className: 'time-item-middle-bg' }),
	                            _react2.default.createElement('div', { className: 'time-item-contents', ref: 'yearItem', 'data-type': 'year' })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'time-item-container' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'time-item' },
	                            _react2.default.createElement('div', { className: 'time-item-mask', ref: 'monthItemMask' }),
	                            _react2.default.createElement('div', { className: 'time-item-middle-bg' }),
	                            _react2.default.createElement('div', { className: 'time-item-contents', ref: 'monthItem', 'data-type': 'month' })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'time-item-container' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'time-item' },
	                            _react2.default.createElement('div', { className: 'time-item-mask', ref: 'dateItemMask' }),
	                            _react2.default.createElement('div', { className: 'time-item-middle-bg' }),
	                            _react2.default.createElement('div', { className: 'time-item-contents', ref: 'dateItem', 'data-type': 'date' })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'time-item-container' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'time-item' },
	                            _react2.default.createElement('div', { className: 'time-item-mask', ref: 'hourItemMask' }),
	                            _react2.default.createElement('div', { className: 'time-item-middle-bg' }),
	                            _react2.default.createElement('div', { className: 'time-item-contents', ref: 'hourItem', 'data-type': 'hour' })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'time-item-container' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'time-item' },
	                            _react2.default.createElement('div', { className: 'time-item-mask', ref: 'minuteItemMask' }),
	                            _react2.default.createElement('div', { className: 'time-item-middle-bg' }),
	                            _react2.default.createElement('div', { className: 'time-item-contents', ref: 'minuteItem', 'data-type': 'minute' })
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return TimePicker;
	}(_react.Component);

	exports.default = TimePicker;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "@charset \"utf-8\";\r\n\r\nhtml, body, div, p, a, span {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\nhtml, body {\r\n\theight: 100%;\r\n}\r\n.shadow-layer {\r\n\tposition: fixed;\r\n\ttop: 0;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tz-index: 1;\r\n\tbackground: #000;\r\n    opacity: 0.3;\r\n}\r\n.time-picker-container {\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: -webkit-flex;\r\n\tdisplay: flex;\r\n\twidth: 100%;\r\n\tposition: fixed;\r\n\tz-index: 2;\r\n\ttop: 50%;\r\n\tmargin-top: -119px;\r\n}\r\n.time-item-container {\r\n\t-webkit-box-flex: 1;\r\n\tflex: 1;\r\n\ttext-align: center;\r\n}\r\n.time-item {\r\n\tdisplay: block;\r\n    position: relative;\r\n    overflow: hidden;\r\n    height: 238px;\r\n}\r\n.time-item-mask {\r\n\tposition: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    z-index: 5;\r\n    background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\r\n    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\r\n    background-position: top, bottom;\r\n    background-size: 100% 102px;\r\n    background-repeat: no-repeat;\r\n}\r\n.time-item-contents {\r\n\tposition: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    right: 0;\r\n    z-index: 4;\r\n}\r\n.time-item-content {\r\n\ttext-align: center;\r\n    font-size: 16px;\r\n    line-height: 34px;\r\n    height: 34px;\r\n    color: #000;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\r\n}\r\n.time-item-middle-bg {\r\n\tposition: absolute;\r\n\tz-index: 3;\r\n\ttop: 102px;\r\n\tleft: 0;\r\n\tright: 0;\r\n\theight: 34px;\r\n\tborder-top: 1px solid #d0d0d0;\r\n\tborder-bottom: 1px solid #d0d0d0;\r\n\tbackground: #fff;\r\n}\r\n.operate-container {\r\n\tposition: absolute;\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: -webkit-flex;\r\n\tdisplay: flex;\r\n\twidth: 100%;\r\n\tbottom: -42px;\r\n\theight: 40px;\r\n\tbackground: #fff;\r\n\tborder-bottom: 1px solid #d0d0d0;\r\n\tborder-top: 1px solid #d0d0d0;\r\n}\r\n.operate-btn {\r\n\t-webkit-box-flex: 1;\r\n    flex: 1;\r\n    height: 40px;\r\n    line-height: 40px;\r\n    font-size: 16px;\r\n    color: #000;\r\n    text-align: center;\r\n}\r\n.operate-btn:first-child {\r\n\tborder-right: 1px solid #d0d0d0;\r\n}", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
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
						'\u65F6\u95F4\u7684\u670B\u53CB',
						_react2.default.createElement('br', null),
						_react2.default.createElement('input', { ref: 'startTime', type: 'text', value: this.state.startTime, style: { width: '200px', height: '50px' } })
					),
					_react2.default.createElement(
						'div',
						{ ref: 'timeOuter', style: this.state.showTime ? {} : { display: 'none' } },
						_react2.default.createElement(_TimePicker2.default, { okHandler: this.okHandler.bind(this), cancelHandler: this.cancelHandler.bind(this), hour: '8', minute: '30' })
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

	var _TimeItem = __webpack_require__(5);

	var _Util = __webpack_require__(6);

	__webpack_require__(7);

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

	        _this.objTimeArr = [];
	        _this.touchCurItem = null;
	        _this.touchMoveY = null; //记录每一帧touchMove的y坐标
	        _this.touchMoveTime = null; //每帧touchMove事件的时间戳
	        _this.touchEndTime = null; //记录touchend的时间戳
	        _this.year = 0;
	        _this.month = 0;
	        _this.date = 0;
	        _this.hour = 0;
	        _this.minute = 0;
	        _this.ansTime = ''; //当前时间字符串 2017-03-08 09:00
	        _this.state = {
	            containerBounding: { //time-item的范围
	                left: 0,
	                right: 0,
	                top: 0,
	                bottom: 0,
	                width: 0,
	                height: 0
	            }
	        };
	        return _this;
	    }

	    _createClass(TimePicker, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var d = new Date();
	            this.year = this.props.year || d.getFullYear();
	            this.month = this.props.month || d.getMonth() + 1;
	            this.date = this.props.date || d.getDate();
	            this.hour = this.props.hour || d.getHours();
	            this.minute = this.props.minute || d.getMinutes();
	            this.setAnsTime();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var that = this;
	            this.refs.shadowLayer.addEventListener('touchstart', function (event) {
	                event.preventDefault();
	                that.props.cancelHandler();
	            });
	            //初始化外层容器的bouding
	            var containerRect = this.refs.yearItemMask.parentNode.getBoundingClientRect();
	            that.setState({
	                containerBounding: {
	                    left: containerRect.left,
	                    right: containerRect.right,
	                    top: containerRect.top,
	                    bottom: containerRect.bottom,
	                    width: containerRect.width,
	                    height: containerRect.height
	                }
	            });
	            //new年模块
	            var options = {
	                startNum: 2010,
	                endNum: 2020,
	                unit: '年',
	                touchStartCallback: function touchStartCallback(item) {
	                    that.touchCurItem = item;
	                },
	                calTimeCallback: function calTimeCallback(val) {
	                    that.year = val;
	                    that.calTimeCallback();
	                }
	            };
	            var yearObj = new _TimeItem.TimeItem(that.refs.yearItemMask, options);
	            yearObj.init(this.year);
	            this.objTimeArr.push(yearObj);
	            //new月模块
	            options = {
	                startNum: 1,
	                endNum: 12,
	                unit: '月',
	                touchStartCallback: function touchStartCallback(item) {
	                    that.touchCurItem = item;
	                },
	                calTimeCallback: function calTimeCallback(val) {
	                    that.month = val;
	                    that.calTimeCallback();
	                }
	            };
	            var monthObj = new _TimeItem.TimeItem(that.refs.monthItemMask, options);
	            monthObj.init(this.month);
	            this.objTimeArr.push(monthObj);
	            //new日模块
	            options = {
	                startNum: 1,
	                endNum: (0, _Util.getDateNumByMonthYear)(this.year, this.month),
	                unit: '日',
	                touchStartCallback: function touchStartCallback(item) {
	                    that.touchCurItem = item;
	                },
	                calTimeCallback: function calTimeCallback(val) {
	                    that.date = val;
	                    that.setAnsTime();
	                }
	            };
	            var dateObj = new _TimeItem.TimeItem(that.refs.dateItemMask, options);
	            dateObj.init(this.date);
	            this.objTimeArr.push(dateObj);
	            //new小时模块
	            options = {
	                startNum: 0,
	                endNum: 23,
	                unit: '时',
	                touchStartCallback: function touchStartCallback(item) {
	                    that.touchCurItem = item;
	                },
	                calTimeCallback: function calTimeCallback(val) {
	                    that.hour = val;
	                    that.setAnsTime();
	                }
	            };
	            var hourObj = new _TimeItem.TimeItem(that.refs.hourItemMask, options);
	            hourObj.init(this.hour);
	            this.objTimeArr.push(hourObj);
	            //new分钟模块
	            options = {
	                startNum: 0,
	                endNum: 59,
	                unit: '分',
	                touchStartCallback: function touchStartCallback(item) {
	                    that.touchCurItem = item;
	                },
	                calTimeCallback: function calTimeCallback(val) {
	                    that.minute = val;
	                    that.setAnsTime();
	                }
	            };
	            var minuteObj = new _TimeItem.TimeItem(that.refs.minuteItemMask, options);
	            minuteObj.init(this.minute);
	            this.objTimeArr.push(minuteObj);

	            document.addEventListener('touchmove', function (event) {
	                if (that.touchCurItem == null) {
	                    return;
	                }
	                event.preventDefault();
	                var evt = event.touches[0] || event;

	                that.touchMoveY = evt.pageY;

	                that.touchCurItem.setTouchMoveEvtPageY(evt.pageY);
	                that.touchMoveTime = +new Date();

	                var moveY = evt.pageY - that.touchCurItem.getTouchStartY();
	                var tempY = that.touchCurItem.getMoveY() + moveY;

	                if (tempY > itemHeight * 6) {
	                    tempY = itemHeight * 6;
	                }
	                if (tempY < -(that.touchCurItem.getObjBounding().height - itemHeight)) {
	                    tempY = -(that.touchCurItem.getObjBounding().height - itemHeight);
	                }

	                that.touchCurItem.moveElement(0, tempY);
	            });

	            document.addEventListener('touchend', function (event) {
	                if (that.touchCurItem == null) {
	                    return;
	                }
	                //that.touchCurItem = null;
	                event.preventDefault();
	                var evt = event.touches[0] || event;
	                that.touchEndTime = +new Date();
	                that.touchCurItem.setTouching(false);
	                that.touchCurItem.setMoveY();
	                that.touchCurItem.setInertia(true);

	                //最后一次touchMoveTime和touchEndTime之间超过30ms,意味着停留了长时间,不做滑动
	                //pc模拟器能走到以下分支.但是真机几乎不可能的,真机的touchend之前几毫秒有一个touchmove事件，只有极少几率走到以下分支，可以忽略不计
	                if (that.touchEndTime - that.touchMoveTime > 30) {
	                    that.touchCurItem.inBox();
	                    that.touchCurItem = null;
	                    return;
	                }
	                var moveY = that.touchMoveY - that.touchCurItem.getTouchStartY(); //矢量有+-
	                var time = that.touchEndTime - that.touchCurItem.getTouchStartTime();
	                var speed = moveY / time * 16.666; //矢量有+-
	                var rate = Math.min(10, Math.abs(speed)); //加速度a

	                that.touchCurItem.slide(speed, rate);
	                that.touchCurItem = null;
	            });
	        }
	    }, {
	        key: 'calTimeCallback',
	        value: function calTimeCallback() {
	            if (this.month == 1 || this.month == 3 || this.month == 5 || this.month == 7 || this.month == 8 || this.month == 10 || this.month == 12) {
	                this.objTimeArr[2].setTimeCount(31);
	            } else if (this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11) {
	                this.objTimeArr[2].setTimeCount(30);
	                if (this.date > 30) {
	                    this.objTimeArr[2].setTimeVal(30);
	                    this.objTimeArr[2].setTranslate();
	                }
	            } else if (this.month == 2) {
	                if (this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0) {
	                    this.objTimeArr[2].setTimeCount(29);
	                    if (this.date > 29) {
	                        this.objTimeArr[2].setTimeVal(29);
	                        this.objTimeArr[2].setTranslate();
	                    }
	                } else {
	                    this.objTimeArr[2].setTimeCount(28);
	                    if (this.date > 28) {
	                        this.objTimeArr[2].setTimeVal(28);
	                        this.objTimeArr[2].setTranslate();
	                    }
	                }
	            }
	            this.setAnsTime();
	        }
	    }, {
	        key: 'setAnsTime',
	        value: function setAnsTime() {
	            var time = this.year + '-' + (0, _Util.addZero)(this.month) + '-' + (0, _Util.addZero)(this.date) + ' ' + (0, _Util.addZero)(this.hour) + ':' + (0, _Util.addZero)(this.minute) + ':' + '00';
	            console.log(time);
	            this.ansTime = time;
	        }
	    }, {
	        key: 'okHandler',
	        value: function okHandler() {
	            this.props.okHandler(this.ansTime);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement('div', { className: 'shadow-layer', ref: 'shadowLayer' }),
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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function TimeItem(element, options) {
	    this.element = element;
	    this.options = options;
	    this.transformY = 0; //存储style.transform里的y
	    this.moveY = 0;
	    this.itemHeight = 34;
	    this.offset = 3;
	    this.timeVal = 0;
	    this.timeMask = null; //遮罩
	    this.timeContainer = null; //时间内容容器
	    this.parentContainer = null; //最外层容器

	    this.objBounding = null; //内容容器的bounding
	    this.touching = false; //是否正在触摸当前滑块
	    this.touchStartY = 0; //开始触摸时的transformY
	    this.touchStartTime = 0; //开始触摸的时间
	    this.inertia = false; //是否惯性滑动
	    this.touchMoveEvtPageY = 0; //记录touchMove时evt.pageY
	    this.touchMoveUpDown = null; //touchMove是向上还是向下,1上2下
	}
	TimeItem.defaults = {
	    startNum: '',
	    endNum: '',
	    unit: '',
	    touchStartCallback: function touchStartCallback() {}, //触摸开始时的回调函数
	    calTimeCallback: function calTimeCallback() {} };
	TimeItem.prototype = {
	    init: function init(timeVal) {
	        this.timeVal = timeVal;
	        this.timeMask = this.element;
	        this.timeContainer = this.element.nextSibling.nextSibling;
	        this.parentContainer = this.element.parentNode;
	        //this.options = Object.assign({}, TimeItem.defaults, this.options);//支持es6的浏览器才能用
	        this.renderHtml();
	        this.setTranslate();
	        this.touchStartEvt();
	    },
	    renderHtml: function renderHtml() {
	        this.setTimeCount(this.options.endNum);
	    },
	    setTimeVal: function setTimeVal(val) {
	        this.timeVal = val;
	    },

	    setTranslate: function setTranslate() {
	        var y = this.itemHeight * (this.options.startNum + this.offset - this.timeVal);
	        this.moveElement(0, y);
	        this.moveY = y;
	    },
	    moveElement: function moveElement(x, y) {
	        var x = Math.round(1000 * x) / 1000;
	        var y = Math.round(1000 * y) / 1000;

	        this.timeContainer.style.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
	        this.timeContainer.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
	        this.transformY = y;
	    },
	    setTouching: function setTouching(touching) {
	        this.touching = touching;
	    },
	    calBounding: function calBounding() {
	        var rect = this.timeContainer.getBoundingClientRect();
	        this.objBounding = {
	            left: rect.left,
	            right: rect.right,
	            top: rect.top,
	            bottom: rect.bottom,
	            width: rect.width,
	            height: rect.height
	        };
	    },
	    touchStartEvt: function touchStartEvt() {
	        var that = this;
	        this.timeMask.addEventListener('touchstart', function (event) {
	            event.preventDefault();
	            event.stopPropagation();
	            that.calBounding();
	            var evt = event.touches[0] || event;
	            that.touching = true;
	            that.touchStartY = evt.pageY;
	            that.touchMoveEvtPageY = evt.pageY; //touchMove初始值
	            that.touchMoveUpDown = 0; //初始值为0
	            that.touchStartTime = +new Date();
	            that.options.touchStartCallback(that);
	        });
	    },
	    getTouchStartY: function getTouchStartY() {
	        return this.touchStartY;
	    },
	    getTouchStartTime: function getTouchStartTime() {
	        return this.touchStartTime;
	    },
	    getMoveY: function getMoveY() {
	        return this.moveY;
	    },
	    setMoveY: function setMoveY() {
	        this.moveY = this.transformY;
	    },
	    setTouchMoveEvtPageY: function setTouchMoveEvtPageY(y) {
	        if (y < this.touchMoveEvtPageY) {
	            this.touchMoveUpDown = 1; //向上滑
	        } else if (y > this.touchMoveEvtPageY) {
	            this.touchMoveUpDown = 2; //向下滑
	        }
	        this.touchMoveEvtPageY = y;
	    },
	    getObjBounding: function getObjBounding() {
	        return this.objBounding;
	    },
	    setInertia: function setInertia(inertia) {
	        this.inertia = inertia;
	    },

	    slide: function slide(speed, rate) {
	        var that = this;
	        if (this.touching) {
	            this.inertia = false;
	            return;
	        }
	        if (!this.inertia) {
	            return;
	        }

	        if (Math.abs(speed) < 0.5) {
	            speed = 0;
	            this.inertia = false;
	            this.inBox();
	            return;
	        }

	        speed = speed - speed / rate;

	        var y = this.moveY + speed;
	        this.moveElement(0, y);
	        this.moveY = y;

	        if (Math.abs(speed) < 0.5) {
	            speed = 0;
	            this.inertia = false;
	            this.inBox();
	        } else {
	            requestAnimationFrame(function () {
	                that.slide(speed, rate);
	            });
	        }
	    },

	    inBox: function inBox() {
	        var maxY = 3 * this.itemHeight;
	        var minY = -(this.objBounding.height - 4 * this.itemHeight);
	        var delta = 0; //delta变化量
	        var y = this.moveY;

	        if (y > maxY) {
	            delta = maxY - y;
	        } else if (y < minY) {
	            delta = minY - y;
	        } else {
	            //调整位置,使时间块位于中间
	            if (this.touchMoveUpDown == 1) {
	                delta = Math.floor(y / this.itemHeight) * this.itemHeight - y;
	            } else {
	                delta = Math.ceil(y / this.itemHeight) * this.itemHeight - y;
	            }
	        }

	        var start = 0;
	        var during = 40;
	        var init = y;
	        //变化量为0,不用动
	        if (delta == 0) {
	            this.inertia = false;

	            this.calTime(init);
	            return;
	        }

	        this.adjust(start, init, delta, during);
	    },

	    adjust: function adjust(start, init, delta, during) {
	        var that = this;
	        if (this.touching) {
	            this.inertia = false;
	            return;
	        }

	        start++;
	        var y = easeOutQuad(start, init, delta, during);
	        this.moveElement(0, y);
	        this.moveY = y;

	        if (start < during) {
	            requestAnimationFrame(function () {
	                that.adjust(start, init, delta, during);
	            });
	        } else {
	            this.inertia = false;
	            this.calTime(y);
	        }
	    },

	    calTime: function calTime(y) {
	        this.moveY = y;
	        this.timeVal = this.options.startNum + this.offset - y / this.itemHeight;
	        this.options.calTimeCallback(this.timeVal);
	    },

	    setTimeCount: function setTimeCount(cnt) {
	        var content = [];
	        this.options.endNum = cnt;
	        for (var i = this.options.startNum; i <= this.options.endNum; i++) {
	            content.push('<div class="time-item-content">' + addZero(i) + this.options.unit + '</div>');
	        }
	        this.timeContainer.innerHTML = content.join('');
	    }
	};

	function addZero(n) {
	    if (n < 10) {
	        return '0' + n;
	    }
	    return n;
	}

	/*
	 * easeOutQuad算法,先慢后快
	 * t: current time(当前时间)
	 * b: beginning value(初始值)
	 * c: change in value(变化量)
	 * d: duration(持续时间)
	**/
	function easeOutQuad(t, b, c, d) {
	    return -c * (t /= d) * (t - 2) + b;
	}

	exports.TimeItem = TimeItem;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function getDateNumByMonthYear(year, month) {
	  if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
	    return 31;
	  } else if (month == 4 || month == 6 || month == 9 || month == 11) {
	    return 30;
	  } else if (month == 2) {
	    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
	      return 29;
	    } else {
	      return 28;
	    }
	  }
	}
	function addZero(n) {
	  if (n < 10) {
	    return '0' + n;
	  }
	  return n;
	}
	exports.getDateNumByMonthYear = getDateNumByMonthYear;
	exports.addZero = addZero;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "@charset \"utf-8\";\r\n\r\nhtml, body, div, p, a, span {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\nhtml, body {\r\n\theight: 100%;\r\n}\r\n.shadow-layer {\r\n\tposition: fixed;\r\n\ttop: 0;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tright: 0;\r\n\tz-index: 1;\r\n\tbackground: #000;\r\n    opacity: 0.6;\r\n}\r\n.time-picker-container {\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: -webkit-flex;\r\n\tdisplay: flex;\r\n\twidth: 100%;\r\n\tposition: fixed;\r\n\tz-index: 2;\r\n\ttop: 50%;\r\n\tmargin-top: -119px;\r\n\tbackground: #fff;\r\n}\r\n.time-item-container {\r\n\t-webkit-box-flex: 1;\r\n\tflex: 1;\r\n\ttext-align: center;\r\n}\r\n.time-item {\r\n\tdisplay: block;\r\n    position: relative;\r\n    overflow: hidden;\r\n    height: 238px;\r\n}\r\n.time-item-mask {\r\n\tposition: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    z-index: 5;\r\n    background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\r\n    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\r\n    background-position: top, bottom;\r\n    background-size: 100% 102px;\r\n    background-repeat: no-repeat;\r\n}\r\n.time-item-contents {\r\n\tposition: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    right: 0;\r\n    z-index: 4;\r\n}\r\n.time-item-content {\r\n\ttext-align: center;\r\n    font-size: 16px;\r\n    line-height: 34px;\r\n    height: 34px;\r\n    color: #000;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\r\n}\r\n.time-item-middle-bg {\r\n\tposition: absolute;\r\n\tz-index: 3;\r\n\ttop: 102px;\r\n\tleft: 0;\r\n\tright: 0;\r\n\theight: 34px;\r\n\tborder-top: 1px solid #d0d0d0;\r\n\tborder-bottom: 1px solid #d0d0d0;\r\n\tbackground: #fff;\r\n}\r\n.operate-container {\r\n\tposition: absolute;\r\n\tdisplay: -webkit-box;\r\n\tdisplay: -ms-flexbox;\r\n\tdisplay: -webkit-flex;\r\n\tdisplay: flex;\r\n\twidth: 100%;\r\n\tbottom: -42px;\r\n\theight: 42px;\r\n\tbackground: #fff;\r\n\tborder-bottom: 1px solid #d0d0d0;\r\n\tborder-top: 1px solid #d0d0d0;\r\n}\r\n.operate-btn {\r\n\t-webkit-box-flex: 1;\r\n    flex: 1;\r\n    height: 40px;\r\n    line-height: 40px;\r\n    font-size: 16px;\r\n    color: #000;\r\n    text-align: center;\r\n}\r\n.operate-btn:first-child {\r\n\tborder-right: 1px solid #d0d0d0;\r\n}", ""]);

	// exports


/***/ },
/* 9 */
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
/* 10 */
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
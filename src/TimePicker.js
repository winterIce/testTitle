import React, { Component } from 'react';
import { TimeItem } from './TimeItem';
import { getDateNumByMonthYear, addZero } from './Util';
import './main.css';

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const itemHeight = 34;

export default class TimePicker extends Component {
	constructor(props) {
		super(props);
        this.objTimeArr = [];
        this.touchCurItem = null;
        this.touchMoveY = null;//记录每一帧touchMove的y坐标
        this.touchMoveTime = null;//每帧touchMove事件的时间戳
        this.touchEndTime = null;//记录touchend的时间戳
        this.year = 0;
        this.month = 0;
        this.date = 0;
        this.hour = 0;
        this.minute = 0;
        this.ansTime = '';//当前时间字符串 2017-03-08 09:00
		this.state = {
            containerBounding: {//time-item的范围
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                width: 0,
                height: 0,
            },
		};
	}

    componentWillMount() {
        var d = new Date();
        this.year = this.props.year || d.getFullYear();
        this.month = this.props.month || d.getMonth() + 1;
        this.date = this.props.date || d.getDate();
        this.hour = this.props.hour || d.getHours();
        this.minute = this.props.minute || d.getMinutes();
        this.setAnsTime();
    }
	componentDidMount() {
        var that = this;
        this.refs.shadowLayer.addEventListener('touchstart', function(event) {
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
                height: containerRect.height,
            }
        });
        //new年模块
        var options = {
            startNum: 2010,
            endNum: 2020,
            unit: '年',
            touchStartCallback: function(item) {
                that.touchCurItem = item;
            },
            calTimeCallback: function(val) {
                that.year = val;
                that.calTimeCallback();
            },
        }
        var yearObj = new TimeItem(that.refs.yearItemMask, options);
        yearObj.init(this.year);
        this.objTimeArr.push(yearObj);
        //new月模块
        options = {
            startNum: 1,
            endNum: 12,
            unit: '月',
            touchStartCallback: function(item) {
                that.touchCurItem = item;
            },
            calTimeCallback: function(val) {
                that.month = val;
                that.calTimeCallback();
            },
        }
        var monthObj = new TimeItem(that.refs.monthItemMask, options);
        monthObj.init(this.month);
        this.objTimeArr.push(monthObj);
        //new日模块
        options = {
            startNum: 1,
            endNum: getDateNumByMonthYear(this.year, this.month),
            unit: '日',
            touchStartCallback: function(item) {
                that.touchCurItem = item;
            },
            calTimeCallback: function(val) {
                that.date = val;
                that.setAnsTime();
            },
        }
        var dateObj = new TimeItem(that.refs.dateItemMask, options);
        dateObj.init(this.date);
        this.objTimeArr.push(dateObj);
        //new小时模块
        options = {
            startNum: 0,
            endNum: 23,
            unit: '时',
            touchStartCallback: function(item) {
                that.touchCurItem = item;
            },
            calTimeCallback: function(val) {
                that.hour = val;
                that.setAnsTime();
            },
        }
        var hourObj = new TimeItem(that.refs.hourItemMask, options);
        hourObj.init(this.hour);
        this.objTimeArr.push(hourObj);
        //new分钟模块
        options = {
            startNum: 0,
            endNum: 59,
            unit: '分',
            touchStartCallback: function(item) {
                that.touchCurItem = item;
            },
            calTimeCallback: function(val) {
                that.minute = val;
                that.setAnsTime();
            },
        }
        var minuteObj = new TimeItem(that.refs.minuteItemMask, options);
        minuteObj.init(this.minute);
        this.objTimeArr.push(minuteObj);

        document.addEventListener('touchmove', function(event) {
            if(that.touchCurItem == null) {
                return;
            }
            event.preventDefault();
            var evt = event.touches[0] || event;
            
            that.touchMoveY = evt.pageY;
            that.touchCurItem.setTouchMoveEvtPageY(evt.pageY);
            that.touchMoveTime = +new Date();
            
            var moveY = evt.pageY - that.touchCurItem.getTouchStartY();
            var tempY = that.touchCurItem.getMoveY() + moveY;

            if(tempY > itemHeight * 6) {
                tempY = itemHeight * 6;
            }
            if(tempY < -(that.touchCurItem.getObjBounding().height - itemHeight) ) {
                tempY = -(that.touchCurItem.getObjBounding().height - itemHeight);
            }

            that.touchCurItem.moveElement(0, tempY);
        });
        
        document.addEventListener('touchend', function(event) {
            if(that.touchCurItem == null) {
                return;
            }
            //that.touchCurItem = null;
            event.preventDefault();
            var evt = event.touches[0] || event;
            that.touchEndTime = +new Date();
            that.touchCurItem.setTouching(false);
            that.touchCurItem.setMoveY();
            that.touchCurItem.setInertia(true);

            that.touchCurItem.inBox();
            //最后一次touchMoveTime和touchEndTime之间超过30ms,意味着停留了长时间,不做滑动
            if(that.touchEndTime - that.touchMoveTime > 30) {
                console.log(12);
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
    calTimeCallback() {
        if(this.month == 1 || this.month == 3 || this.month == 5 || this.month == 7 || this.month == 8 || this.month == 10 || this.month == 12) {
            this.objTimeArr[2].setTimeCount(31);
        }
        else if(this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11) {
            this.objTimeArr[2].setTimeCount(30);
            if(this.date > 30) {
                this.objTimeArr[2].setTimeVal(30);
                this.objTimeArr[2].setTranslate();
            }
        }
        else if(this.month == 2){
            if( (this.year % 4 == 0) && (this.year % 100 != 0) || (this.year % 400 == 0) ) {
                this.objTimeArr[2].setTimeCount(29);
                if(this.date > 29) {
                    this.objTimeArr[2].setTimeVal(29);
                    this.objTimeArr[2].setTranslate();
                }
            }
            else {
                this.objTimeArr[2].setTimeCount(28);
                if(this.date > 28) {
                    this.objTimeArr[2].setTimeVal(28);
                    this.objTimeArr[2].setTranslate();
                }
            }
        }    
        this.setAnsTime();
    }
    setAnsTime() {
        var time = this.year + '-' + addZero(this.month) + '-' + addZero(this.date) + ' ' + addZero(this.hour) + ':' + addZero(this.minute) + ':' + '00';
        console.log(time);
        this.ansTime = time;
    }

    okHandler() {
        this.props.okHandler(this.ansTime);
    }

	render() {
		return(
            <div>
                <div className="shadow-layer" ref="shadowLayer"></div>
    			<div className="time-picker-container">
                    <div className="operate-container">
                        <div ref="okBtn" className="operate-btn" onClick={this.props.cancelHandler.bind(this)}>取消</div>
                        <div ref="cancelBtn" className="operate-btn" onClick={this.okHandler.bind(this)}>确定</div>
                    </div>
    			    <div className="time-item-container">
                        <div className="time-item">
                            <div className="time-item-mask" ref="yearItemMask"></div>
                            <div className="time-item-middle-bg"></div>
                            <div className="time-item-contents" ref="yearItem" data-type="year">
                            </div>
                        </div>
                    </div>
    			    <div className="time-item-container">
                        <div className="time-item">
                            <div className="time-item-mask" ref="monthItemMask"></div>
                            <div className="time-item-middle-bg"></div>
                            <div className="time-item-contents" ref="monthItem" data-type="month">
                            </div>
                        </div>
                    </div>
    			    <div className="time-item-container">
                        <div className="time-item">
                            <div className="time-item-mask" ref="dateItemMask"></div>
                            <div className="time-item-middle-bg"></div>
                            <div className="time-item-contents" ref="dateItem" data-type="date">
                            </div>
                        </div>
                    </div>
    			    <div className="time-item-container">
                        <div className="time-item">
                            <div className="time-item-mask" ref="hourItemMask"></div>
                            <div className="time-item-middle-bg"></div>
                            <div className="time-item-contents" ref="hourItem" data-type="hour">
                            </div>
                        </div>
                    </div>
    			    <div className="time-item-container">
                        <div className="time-item">
                            <div className="time-item-mask" ref="minuteItemMask"></div>
                            <div className="time-item-middle-bg"></div>
                            <div className="time-item-contents" ref="minuteItem" data-type="minute">
                            </div>
                        </div>
                    </div>
    			</div>
            </div>
		);
	}
}
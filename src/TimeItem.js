function TimeItem(element, options) {
    this.element = element;
    this.options = options;
    this.transformY = 0;//存储style.transform里的y
    this.moveY = 0;
    this.itemHeight = 34;
    this.offset = 4;
    this.timeVal = 0;
    this.startTimeVal = 0;//循环块的开始
    this.endTimeVal = 0;//循环块的结束
    this.timeMask = null;//遮罩
    this.timeContainer = null;//时间内容容器
    this.parentContainer = null;//最外层容器

    this.objBounding = null;//内容容器的bounding
    this.touching = false;//是否正在触摸当前滑块
    this.touchStartY = 0;//开始触摸时的transformY
    this.touchStartTime = 0;//开始触摸的时间
    this.inertia = false;//是否惯性滑动

    this.tempTimeVal = 0;
}
TimeItem.defaults = {
    startNum: '',
    endNum: '',
    unit: '',
    touchStartCallback: function() {

    },//触摸开始时的回调函数
    calTimeCallback: function() {

    },//计算时间的回调函数
};
TimeItem.prototype = {
    init: function(timeVal) {
        this.timeVal = timeVal;
        this.timeMask = this.element;
        this.timeContainer = this.element.nextSibling.nextSibling;
        this.parentContainer = this.element.parentNode;
        //this.options = Object.assign({}, TimeItem.defaults, this.options);//支持es6的浏览器才能用
        this.renderHtml();
        this.setTranslate();
        this.touchStartEvt();
    },
    renderHtml: function() {
        this.setTimeCount();
    },
    setTimeVal(val) {
        this.timeVal = val;
    },
    setStartNum(v) {
        this.options.startNum = v;
    },
    setEndNum(v) {
        this.options.endNum = v;
    },
    setTranslate: function() {
        var y = -this.itemHeight;
        this.timeContainer.style.webkitTransform = 'translate(' + 0 + 'px,' + y + 'px)';
        this.timeContainer.style.transform = 'translate3d(' + 0 + 'px,' + y + 'px, 0)';
        this.transformY = y;
        this.moveY = y;
    },
    moveElement: function(x, y) {
        var x = Math.round(1000 * x) / 1000;
        var y = Math.round(1000 * y) / 1000;
        ///////
        var ty = (y - (-this.itemHeight)) / this.itemHeight;
        if(ty < 0) {
            ty = Math.ceil(ty);
        }
        else if (ty > 0){
            ty = Math.floor(ty);
        }
        y = y - ty * this.itemHeight;
        var mod = ty % (this.options.endNum - this.options.startNum + 1);
        if(this.timeVal - mod < this.options.startNum) {
            this.timeVal = this.options.endNum + 1 - (Math.abs(mod) - (this.timeVal - this.options.startNum));
        }
        else if(this.timeVal - mod > this.options.endNum) {
            this.timeVal = this.options.startNum - 1 + (Math.abs(mod) - (this.options.endNum - this.timeVal));
        }
        else {
            this.timeVal = this.timeVal - mod;
        }
        this.setTimeCount();
//////
        this.timeContainer.style.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
        this.timeContainer.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
        this.transformY = y;
        this.moveY = y;
    },
    moveElement2(x, y) {
        var x = Math.round(1000 * x) / 1000;
        var y = Math.round(1000 * y) / 1000;

        var ty = (y - (-this.itemHeight)) / this.itemHeight;
        if(ty < 0) {
            ty = Math.ceil(ty);
        }
        else if (ty > 0){
            ty = Math.floor(ty);
        }
        y = y - ty * this.itemHeight;
        var mod = ty % (this.options.endNum - this.options.startNum + 1);
        if(this.tempTimeVal - mod < this.options.startNum) {
            this.timeVal = this.options.endNum + 1 - (Math.abs(mod) - (this.tempTimeVal - this.options.startNum));
        }
        else if(this.tempTimeVal - mod > this.options.endNum) {
            this.timeVal = this.options.startNum - 1 + (Math.abs(mod) - (this.options.endNum - this.tempTimeVal));
        }
        else {
            this.timeVal = this.tempTimeVal - mod;
        }
        this.setTimeCount();
        this.timeContainer.style.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
        this.timeContainer.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
        this.transformY = y;
    },
    setTouching: function(touching) {
        this.touching = touching;
    },
    calBounding: function() {
        var rect = this.timeContainer.getBoundingClientRect();
        this.objBounding = {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
        }
    },
    touchStartEvt: function() {
        var that = this;
        this.timeMask.addEventListener('touchstart', function(event) {
            event.preventDefault();
            event.stopPropagation();
            that.calBounding();
            var evt = event.touches[0] || event;
            that.touching = true;
            that.touchStartY = evt.pageY;
            that.touchStartTime = +new Date();
            that.options.touchStartCallback(that);
            that.tempTimeVal = that.timeVal;
        });
    },
    getTouchStartY: function() {
        return this.touchStartY;
    },
    getTouchStartTime: function() {
        return this.touchStartTime;
    },
    getMoveY: function() {
        return this.moveY;
    },
    setMoveY: function() {
        this.moveY = this.transformY;
    },
    getObjBounding: function() {
        return this.objBounding;
    },
    setInertia: function(inertia) {
        this.inertia = inertia;
    },
    
    slide: function(speed, rate) {
        var that = this;
        if (this.touching) {
            this.inertia = false;
            return;
        }
        if(!this.inertia) {
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

        if (Math.abs(speed) < 0.5) {
            speed = 0;
            this.inertia = false;
            this.inBox();
        } else {
            requestAnimationFrame(function() {
                that.slide(speed, rate);
            });
        }
    },

    inBox: function() {
        var delta = 0; //delta变化量
        var y = this.moveY;
        delta = Math.round(y / this.itemHeight) * this.itemHeight - y;

        var start = 0;
        var during = 40;
        var init = y;
        //变化量为0,不用动
        if(delta == 0) {
            this.inertia = false;
            this.calTime();
            return;
        }

        this.adjust(start, init, delta, during);
    },

    adjust: function(start, init, delta, during) {
        var that = this;
        if (this.touching) {
            this.inertia = false;
            return;
        }

        start++;
        var y = easeOutQuad(start, init, delta, during);
        this.moveElement(0, y);

        if (start < during) {
            requestAnimationFrame(function() {
                that.adjust(start, init, delta, during);
            });
        } else {
            this.inertia = false;
            this.calTime(y);
        }
    },

    calTime: function() {
        this.options.calTimeCallback(this.timeVal);
    },
    setTimeCount: function() {
        this.startTimeVal = (this.timeVal - this.offset >= this.options.startNum) ? this.timeVal - this.offset : this.options.endNum + 1 - (this.offset - (this.timeVal - this.options.startNum));
        this.endTimeVal = (this.timeVal + this.offset <= this.options.endNum) ? this.timeVal + this.offset : (this.options.startNum - 1) + (this.offset - (this.options.endNum - this.timeVal));

        var content = [], i, j;
        var nodes = this.timeContainer.childNodes;
        if(nodes.length == 0) {
            if(this.startTimeVal < this.endTimeVal) {
                for(i = this.startTimeVal; i <= this.endTimeVal; i++) {
                    content.push('<div class="time-item-content">' + addZero(i) + this.options.unit + '</div>');
                }
            }
            else {
                for(i = this.startTimeVal; i <= this.options.endNum; i++) {
                    content.push('<div class="time-item-content">' + addZero(i) + this.options.unit + '</div>');
                }
                for(i = this.options.startNum; i <= this.endTimeVal; i++) {
                    content.push('<div class="time-item-content">' + addZero(i) + this.options.unit + '</div>');
                }
            }
            this.timeContainer.innerHTML = content.join('');
        }
        else {
            j = 0;
            if(this.startTimeVal < this.endTimeVal) {
                for(i = this.startTimeVal; i <= this.endTimeVal; i++) {
                    nodes[j++].innerHTML = addZero(i) + this.options.unit;
                }
            }
            else {
                for(i = this.startTimeVal; i <= this.options.endNum; i++) {
                    nodes[j++].innerHTML = addZero(i) + this.options.unit;
                }
                for(i = this.options.startNum; i <= this.endTimeVal; i++) {
                    nodes[j++].innerHTML = addZero(i) + this.options.unit;
                }
            }
        }
    },
}

function addZero(n) {
    if(n < 10) {
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
    return -c *(t /= d)*(t-2) + b;
}

export {
    TimeItem,
}
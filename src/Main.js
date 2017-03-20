import React, { Component } from 'react';
import TimePicker from './TimePicker';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: '',
			showTime: false,
		}
	}
	componentDidMount() {
		var that = this;
        that.refs.startTime.addEventListener('focus', function(evt) {
            that.setState({
            	showTime: true,
            });
            this.blur();
        });
	}
	okHandler(val) {
        this.setState({
        	startTime: val,
        	showTime: false,
        });
	}
	cancelHandler() {
		this.setState({
			showTime: false,
		});
	}
	render() {
		return (
			<div>
	            <div id="main" style={{marginTop: '100px'}}>
	                时间的朋友<br />
	                <input ref="startTime" type="text" value={this.state.startTime} style={{width: '200px', height: '50px'}} />
	            </div>
	            <div ref="timeOuter" style={ this.state.showTime ? {} : {display: 'none'} }>
                    <TimePicker okHandler={this.okHandler.bind(this)} cancelHandler={this.cancelHandler.bind(this)} hour="8" minute="30" />
	            </div>
            </div>
		)
	}
}
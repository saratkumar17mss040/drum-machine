import React, { Component } from 'react';


const activeStyleButton = {
	backgroundColor: 'orange',
	boxShadow: '0 3px orange',
	height: 77,
	marginTop: 13,
};

const inactiveStyleButton = {
	backgroundColor: 'grey',
	marginTop: 10,
	boxShadow: '3px 3px 5px black',
};

class DrumPad extends Component {
	constructor() {
		super();
		this.state = {
			padStyle: inactiveStyleButton,
		};
	}
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}
	handleKeyPress = (e) => {
		if (e.keyCode === this.props.keyCode) {
			this.playSound();
		}
	};
	activatePad = () => {
		if (this.props.power) {
			this.state.padStyle.backgroundColor === 'orange'
				? this.setState({
						padStyle: inactiveStyleButton,
				  })
				: this.setState({
						padStyle: activeStyleButton,
				  });
		} else {
			this.state.padStyle.marginTop === 13
				? this.setState({
						padStyle: inactiveStyleButton,
				  })
				: this.setState({
						padStyle: {
							height: 77,
							marginTop: 13,
							backgroundColor: 'grey',
							boxShadow: '0 3px grey',
						},
				  });
		}
	};
	playSound = (e) => {
		const sound = document.getElementById(this.props.keyTrigger);
		sound.currentTime = 0;
		if (this.props.power) {
			sound.play();
		}
		this.activatePad();
		setTimeout(() => this.activatePad(), 100);
		this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
	};
	render() {
		return (
			<div
				id={this.props.clipId}
				onClick={this.playSound}
				className="drum-pad"
				style={this.state.padStyle}
			>
				<audio
					className="clip"
					id={this.props.keyTrigger}
					src={this.props.clip}
				></audio>
				{this.props.keyTrigger}
			</div>
		);
	}
}


export default DrumPad;

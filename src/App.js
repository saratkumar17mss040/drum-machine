import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PadBank from './Padbank';
import './App.scss';
// our audio info object with keys
import { audioOne, audioTwo } from './Audio';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			power: true,
			display: ' ',
			currentPadBank: audioOne,
			currentPadBankId: 'Heater Kit',
			sliderVal: 0.3,
		};
	}
	powerControl = () => {
		this.setState({
			power: !this.state.power,
			display: ' ',
		});
	};
	selectBank = () => {
		if (this.state.power) {
			this.state.currentPadBankId === 'Heater Kit'
				? this.setState({
						currentPadBank: audioTwo,
						display: 'Smooth Piano Kit',
						currentPadBankId: 'Smooth Piano Kit',
				  })
				: this.setState({
						currentPadBank: audioOne,
						display: 'Heater Kit',
						currentPadBankId: 'Heater Kit',
				  });
		}
	};
	displayClipName = (name) => {
		if (this.state.power) {
			this.setState({
				display: name,
			});
		}
	};
	adjustVolume = (e) => {
		if (this.state.power) {
			this.setState({
				sliderVal: e.target.value,
				display: 'Volume: ' + Math.round(e.target.value * 100),
			});
			setTimeout(() => this.clearDisplay(), 1000);
		}
	};
	clearDisplay = () => {
		this.setState({
			display: ' ',
		});
	};
	render() {
		const powerSlider = this.state.power
			? {
					float: 'right',
			  }
			: {
					float: 'left',
			  };
		const bankSlider =
			this.state.currentPadBank === audioOne
				? {
						float: 'left',
				  }
				: {
						float: 'right',
				  };
		{
			// changing the volume for every audio
			const clips = [].slice.call(document.getElementsByClassName('clip'));
			clips.forEach((sound) => {
				sound.volume = this.state.sliderVal;
			});
		}
		return (
			<div id="drum-machine" className="inner-container">
				<PadBank
					power={this.state.power}
					updateDisplay={this.displayClipName}
					clipVolume={this.state.sliderVal}
					currentPadBank={this.state.currentPadBank}
				/>

				<div className="controls-container">
					<div className="control">
						<p>Power</p>
						<div onClick={this.powerControl} className="select">
							<div style={powerSlider} className="inner" />
						</div>
					</div>
					<p id="display">{this.state.display}</p>
					<div className="volume-slider">
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={this.state.sliderVal}
							onChange={this.adjustVolume}
						/>
					</div>
					<div className="control">
						<p>Change AudioSet</p>
						<div onClick={this.selectBank} className="select">
							<div style={bankSlider} className="inner" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;

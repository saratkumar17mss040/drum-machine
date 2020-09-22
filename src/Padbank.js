import React, { Component } from 'react';
import DrumPad from './DrumPad';
// import ErrorBoundry from './ErrorBoundry';

class PadBank extends Component {
	render() {
		let padBank;
		this.props.power
			? (padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
					return (
						// <ErrorBoundry>
							<DrumPad
								key={padBankArr[i].id}
								clipId={padBankArr[i].id}
								clip={padBankArr[i].url}
								keyTrigger={padBankArr[i].keyTrigger}
								keyCode={padBankArr[i].keyCode}
								updateDisplay={this.props.updateDisplay}
								power={this.props.power}
							/>
						// </ErrorBoundry>
					);
			  }))
			: (padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
					return (
						// <ErrorBoundry>
							<DrumPad
								key={padBankArr[i].id}
								clip="#"
								clipId={padBankArr[i].id}
								keyTrigger={padBankArr[i].keyTrigger}
								keyCode={padBankArr[i].keyCode}
								updateDisplay={this.props.updateDisplay}
								power={this.props.power}
							/>
						// </ErrorBoundry>
					);
			  }));
		return <div className="pad-bank">{padBank}</div>;
	}
}

export default PadBank;

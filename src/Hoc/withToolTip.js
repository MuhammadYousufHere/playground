import React from 'react';

export function withTooltip(Component) {
	return class WithToolTip extends React.Component {
		state = {
			show: false,
		};
		mouseOut = () => this.setState({ show: false });

		mouseOver = () => this.setState({ show: true });

		render() {
			return (
				<div
					onMouseOut={this.mouseOut}
					onMouseOver={this.mouseOver}>
					<Component
						{...this.props}
						show={this.state.show}
					/>
				</div>
			);
		}
	};
}

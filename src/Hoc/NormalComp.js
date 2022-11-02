import React from 'react';
import { withTooltip } from './withToolTip';

const NormalComp = props => {
	return (
		<div>
			NormalComp
			{props.show && <p>Some Info</p>}
		</div>
	);
};

export default withTooltip(NormalComp);

import React, { useState, useMemo, useEffect, useCallback } from 'react';
// returns a value that only needs to be recalculated if one of the dependencies have been changed (it's memoized)
const Memo = () => {
	const [result, setResult] = useState();
	const calculate = (x, y) => {
		return x ** y;
	};
	const calculated = useCallback(() => calculate(3, 66), []);
	useEffect(() => {
		setResult(calculated(9, 6));
		//react-hooks/exhaustive-deps
	}, [calculated]);
	return <div>{result}</div>;
};

export default Memo;

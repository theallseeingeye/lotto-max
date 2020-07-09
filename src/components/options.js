import React, {useContext} from 'react';
import {OptionsContext} from "./context/optionsProvider";

export function Options() {
	const {
		startAge,
		setStartAge,
		setDelay,
		setPlaysPerMonth,
		setEndAge,
		endAge
	} = useContext(OptionsContext);

	function startAgeBeforeEnd() {
		if (startAge >= endAge) {
			return parseInt(startAge) + 1
		} else {
			return endAge;
		}
	}

	return(
		<div>
			Are you feeling lucky that you will the LottoMax in your life time? <br/>
			Please select your age and see if you do! <br/>
			Number of Plays per Month
			<input type='range' min="1" max='8' defaultValue={8} onChange={(e) => setPlaysPerMonth(e.target.value)}/>
			Delay
			<input type='range' min="1" max='2000' defaultValue={8} onChange={(e) => setDelay(e.target.value)}/>
			Current Age:
			<input
				type='number'
				min={18}
				max={120}
				defaultValue={18}
				onChange={(e) => setStartAge(e.target.value)}
			/>
			Death:
			<input
				type='number'
				min={startAgeBeforeEnd()}
				value={startAgeBeforeEnd()}
				max={125}
				onChange={(e) => setEndAge(e.target.value)}
			/>
		</div>
	)
}
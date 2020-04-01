import React, {useState, useEffect, useContext} from 'react';
import {RenderedDraws} from "./displayPlays";
import styled from 'styled-components'
import {WinningsChart} from "./winningsChart";
import {NumbersWonChart} from "./numbersWonChart";
import {Stats} from "./stats";
import {WinLoss} from "./winLoss";
import {Header} from "./header";
import {Options} from "./options";
import {OptionsContext} from "./context/optionsProvider";
import {StatsContext} from "./context/statsProvider";

export function Main() {
	const {delay, play, setPlay, playsPerMonth} = useContext(OptionsContext);
	const {accumulateMonthCount, monthCount} = useContext(StatsContext);

	useEffect(() => {

		if (play) {
			setTimeout(() => {
				accumulateMonthCount();
			}, delay);
		} else {
			//TODO: slight delay after cancelling.
			// return clearTimeout(timer);
		}
	}, [monthCount, play]);


	return(
		<div>
			<Header/>
			<Options/>
			<button onClick={() => setPlay(play => !play)}>
				{play ? 'Stop' : 'Play'}
			</button>
			<RenderedDraws/>
			<Stats/>
			<WinLoss/>
			<div style={{height: '300px', width: '50%'}}>
				<WinningsChart/>
			</div>
			<div style={{height: '1000px', width: '50%'}}>
				<NumbersWonChart/>
			</div>
		</div>
	)
}
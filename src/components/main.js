import React, {useState, useEffect, useLayoutEffect} from 'react';
import {RenderedDraws} from "./displayPlays";
import styled from 'styled-components'
import {WinningsChart} from "./winningsChart";
import {NumbersWonChart} from "./numbersWonChart";
import {Stats} from "./stats";

export function Main() {
	const [counter, setCounter] = useState(0);
	const [playsPerMonth, setPlaysPerMonth] = useState(8);
	const [play, setPlay] = useState(false);
	const [delay, setDelay] = useState(0);
	const [prevDelay, setPrevDelay] = useState(0);

	useEffect(() => {
		// if (play) setCounter(() => counter + 1);
		if (play) setTimeout(() => {setCounter(counter => counter + 1) }, delay)
	}, [counter, play]);
	//
	// function calculateDelay() {
	// 	// Calculate the delay based on speed of calculations;
	//
	// }
	// useEffect(() => {
	// 	// console.log('DELAYED', Date.now())
	// 	// Save current delay
	// 	setPrevDelay(Date.now());
	// 	// Compare to previous delay
	// 	const diff = Date.now() - prevDelay;
	// 	const convertMilSecToYears = 31536000000;
	// 	// console.log('months per sec', diff/60);
	//
	// 	// Numbers of plays per second.
	// 	console.log('plays per sec', (diff/60)*counter);
	// }, [counter]);

	return(
		<div>
			<div>
				Options <br/>

				Number of Plays per Month
				<input type='range' min="1" max='8' defaultValue={8} onChange={(e) => setPlaysPerMonth(e.target.value)}/>
				Delay
				<input type='range' min="1" max='200' defaultValue={8} onChange={(e) => setDelay(e.target.value)}/>

			</div>
			<button onClick={() => setPlay(play => !play)}>
				{play ? 'Stop' : 'Play'}
			</button>

			<Stats counter={counter} playsPerMonth={playsPerMonth}/>

			<div style={{height: '300px', width: '50%'}}>
				<WinningsChart/>
			</div>
			<div style={{height: '1000px', width: '50%'}}>
			<NumbersWonChart/>
			</div>
			<RenderedDraws
				playsPerMonth={playsPerMonth}
				play={play}
			/>
		</div>
	)
}
import React, {useContext, useState, useLayoutEffect, useEffect} from 'react';
import {v4 as uuidv4} from "uuid";
import styled from "styled-components";
import {OptionsContext} from "./context/optionsProvider";
import {FindWinners} from "./findWinners";
import {StatsContext} from "./context/statsProvider";

const NumberBox = styled.div`
	width: 20px;
	border: solid gray 0.1px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	border: solid black;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const Titles = styled.tr`
	//display: flex;
	border-color: black;
	//justify-content: space-evenly;
`;

const Table = styled.table`
	//width: 100%;
`;


const wclc = {
	prizes: 0.521,
	operatingCost: 0.068,
	retailCommission: 0.07,
	printing: 0.01,
	provinceRev: 0.331,
};
// const jackpotPrize = 10000000;
const jackpotPrize = 70000000;
const canadianPop = 37590000;
const playerPercentage = 0.25;
const ticketPrice = 5;
const numberOfPlayers = canadianPop * playerPercentage;
const ticketSales = numberOfPlayers * ticketPrice;
const prizePool = ticketSales * wclc.prizes;
// The lottomax removes the fixed prizes first, then distribute the rest under the pool.

// Simulate winners
let totalPlaysNotWon = 0;

const gameWinners = {
	three: 0,
	threeBonus: 0,
	four: 0,
	fourBonus: 0,
	five: 0,
	fiveBonus: 0,
	six: 0,
	sixBonus: 0,
	jackpot: 0,
};

function calculateGlobalWinners() {
	Object.keys(gameWinners).forEach((key) => {
		if (key === 'jackpot') {
			const numberOfWinners = Math.floor(odds[key] * totalPlaysNotWon);
			if (numberOfWinners < 1) {
				totalPlaysNotWon = numberOfPlayers + totalPlaysNotWon;
			} else {
				gameWinners[key] = numberOfWinners;
				totalPlaysNotWon = 0;
			}
		} else {
			const numberOfWinners = Math.floor(odds[key] * numberOfPlayers);
			gameWinners[key] = numberOfWinners;
		}
	});
}

const odds = {
	three: 1/8.5,
	threeBonus: 1/82.9,
	four: 1/82.9,
	fourBonus: 1/105,
	five: 1/1841,
	fiveBonus: 1/37749,
	six: 1/113248,
	sixBonus: 1/4756400,
	jackpot: 1/33294800,
};

console.log(prizePool);

const pool = ticketSales > jackpotPrize ? ticketSales - jackpotPrize : jackpotPrize;
const poolFunds = pool <= 0 ? jackpotPrize * (1-0.8725) : pool * (1-0.8725);

export const prizesWon = {
	three: 0,
	threeBonus: 0,
	four: 0,
	fourBonus: 0,
	five: 0,
	fiveBonus: 0,
	six: 0,
	sixBonus: 0,
	jackpot: 0,
};



export function RenderedDraws() {
	return (
		<Table>
			<tbody>
			<Titles>
				<th>Plays <br/>Per <br/>Month</th>
				<th>Winning Numbers</th>
				<th>Bonus</th>
				<th>Your Picks</th>
				<th>Won</th>
				<th>Bonus <br/>Won</th>
				<th>Prize</th>
			</Titles>
			<DisplayPlays/>
			</tbody>
		</Table>
	)
}

export const numbersWon = generateEmptyNumberArray(50);
export let accumulatePlayCount = 0;

function DisplayPlays(manualPick = null) {

	const {playsPerMonth, entriesPerGame, play} = useContext(OptionsContext);
	const {monthCount} = useContext(StatsContext);
	const [table, setTable] = useState([]);

	useEffect(() => {
		if (play) {
			// Clear the table.
			setTable([]);

			// Create the table.
			for (let i = 0; i < playsPerMonth; i++) {
				const results = drawResults(true);
				accumulatePlayCount = ++accumulatePlayCount;
				setTable(e => [
						...e,
						<tr key={uuidv4()}>
							<td>
								{i + 1}
							</td>
							<RenderDrawResults results={results}/>
							<RenderUserNumbers
								entriesPerGame={entriesPerGame}
								results={results}
								manualPick={null}
							/>
						</tr>
					]
				)
			}
		}

		// The 'monthCount' subscribed to give a loop of updates by it's changes.
	}, [play, monthCount]);

	return table;
}

function generateEmptyNumberArray(numberOfBalls) {
	// Generate 'balls' to be chosen from.
	const balls = [];
	for (let i = 1; i <= numberOfBalls; i++) {
		balls.push({
			id: i,
			count: 0
		});
	}
	return balls;
}

function quickPicks(numberOfPlays, manualPick) {
	let pickedNumbers = [];
	for (let i = 1; i < numberOfPlays; i++) {
		// The first number can be chosen by the user.
		if (i === 1) pickedNumbers.push(
			manualPick ? manualPick : drawResults().selectedBalls
		);
		pickedNumbers.push(drawResults().selectedBalls);
	}
	return pickedNumbers;
}

function generateBalls(numberOfBalls) {
	// Generate 'balls' to be chosen from.
	const balls = [];
	for (let i = 1; i <= numberOfBalls; i++) {
		balls.push(i);
	}
	return balls;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function drawResults(includeBonus) {
	const balls = generateBalls(50);
	const selectedBalls = [];
	let bonusBall;
	const numberOfPicks = 7;

	for (let i = 0; i <= numberOfPicks; i++) {
		// Random number generated.
		// const selectedIndex = Math.round((balls.length - 1) * rand);
		const selectedIndex = getRandomInt(0, balls.length);

		if (typeof selectedIndex !== "number") console.error('ERROR! COULD NOT FIND INDEX OF BALLS TO PICK FROM', selectedIndex);

		if (i === 7) {
			// Last ball is going to be bonus.
			bonusBall = balls[selectedIndex];
		} else {
			// Save selected ball
			selectedBalls.push(balls[selectedIndex]);
			// Remove ball from list
			balls.splice(selectedIndex, 1);
		}
	}
	return includeBonus ? {selectedBalls, bonusBall} : {selectedBalls};
}

function calculatedPrize(poolPercentage, oddsOfWinning) {
	const totalPriceShare = poolPercentage * poolFunds;
	const numberOfWinners  = numberOfPlayers * oddsOfWinning;
	const finalPrize = totalPriceShare / numberOfWinners;
	return Math.round(finalPrize);
}

function RenderUserNumbers({entriesPerGame, results, manualPick}) {
	const userPicks = quickPicks(entriesPerGame, manualPick);
	const {renderPlays, winningCounts, wonBonuses, prizeDetails} = FindWinners(results, userPicks);

	return (
		<>
			<td>
				<Column>
					{renderPlays}
				</Column>
			</td>
			<td>
				<Column>
					{winningCounts}
				</Column>
			</td>
			<td>
				<Column>
					{wonBonuses}
				</Column>
			</td>
			<td>
				<Column style={{width: '200px'}}>
					{prizeDetails}
				</Column>
			</td>
		</>
	);
}

function RenderDrawResults({results}) {
	let lotteryResultsList = [];

	results.selectedBalls.forEach((number) => {
		lotteryResultsList.push(
			<NumberBox key={uuidv4()}>
					{number}
			</NumberBox>
		)
	});

	return (
		<>
			<td>
				<Row>
					{lotteryResultsList}
				</Row>
			</td>
			<td>
				<NumberBox style={{backgroundColor: 'yellow'}}>
					{results.bonusBall}
				</NumberBox>
			</td>
		</>
	)
}

import React, {useContext, useState, useLayoutEffect, useEffect} from 'react';
import {v4 as uuidv4} from "uuid";
import styled from "styled-components";
import {OptionsContext} from "./context/optionsProvider";
import {FindWinners} from "./findWinners";
import {StatsContext} from "./context/statsProvider";
import {SimulateGlobalWinners} from "./globalWinners";

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
	const {monthCount, addLoss} = useContext(StatsContext);
	const [table, setTable] = useState([]);

	SimulateGlobalWinners();

	useEffect(() => {
		if (play) {
			// Clear the table.
			setTable([]);
			// Create the table.
			for (let i = 0; i < playsPerMonth; i++) {
				addLoss();
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

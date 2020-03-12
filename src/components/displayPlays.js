import React from 'react';
import {v4 as uuidv4} from "uuid";
import styled from "styled-components";

const Results = styled.div`
	//width: 20px;
	display: flex;
	border: solid purple;
`;

const NumberBox = styled.div`
	width: 20px;
	border: solid gray 0.1px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const UserNumbers = styled.div`
	display: flex;
	flex-direction: row;
	border: solid green;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	border: solid black;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	//width: 100%;
	border: solid pink;
	//justify-content: space-evenly;
`;

const WinningNumbers = styled.div`
	border: solid yellow;
	display: flex;
	flex-direction: row;
`;


export function displayPlays(amount, numberOfPlays, manualPick = null) {
	let list = [];
	for (let i = 0; i <= amount; i++) {
		const results = drawResults(true);
		list.push(
			<tr style={{border: 'solid yellow'}}>
				{renderDrawResults(results)}
				{renderUserNumbers(numberOfPlays, results, manualPick)}
			</tr>
		)
	}
	return list;
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

function drawResults(includeBonus) {
	const balls = generateBalls(50);
	const selectedBalls = [];
	let bonusBall;
	const numberOfPicks = 7;

	for (let i = 0; i <= numberOfPicks; i++) {
		// Random number generated.
		const rand = Math.random();
		const selectedIndex = Math.round((balls.length - 1) * rand);
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

function findWinners(lotteryResults, userNumbers) {
	const wonBonuses = [];
	const winningCounts = [];
	const renderPlays = [];

	// Go through each play

		userNumbers.forEach((play) => {
			const renderNumber = [];
			let winningCount = 0;
			let wonBonus = 'false';
			// Check numbers of each play.
			play.forEach((number) => {

				if (lotteryResults.selectedBalls.some((drawn) => drawn === number)) {
					// A number was found!
					winningCount = ++winningCount;
					renderNumber.push(
						<NumberBox
							key={uuidv4()}
							style={{
								backgroundColor: 'lightGreen'
							}}
						>
							{number}
						</NumberBox>
					)
				} else if (number === lotteryResults.bonusBall) {
					// Matched bonus!
					wonBonus = String(true);
					renderNumber.push(
						<NumberBox
							key={uuidv4()}
							style={{
								backgroundColor: 'yellow'
							}}
						>
							{number}
						</NumberBox>
					)
				} else {
					// This number is a loser.
					renderNumber.push(
						<NumberBox
							key={uuidv4()}
						>
							{number}
						</NumberBox>
					)
				}
		});

		renderPlays.push(
			<Row>
				{renderNumber}
			</Row>
		);
		winningCounts.push(
			<Row>
				{winningCount}
			</Row>
		);
		wonBonuses.push(
			<Row>
				{wonBonus}
			</Row>
		)

	});
	return [
		wonBonuses,
		winningCounts,
		renderPlays
	];
}


function renderUserPicks(userPicks, results) {
	// Loop through the userPicks and highlight winners
	const [wonBonuses, winningCounts, renderPlays] = findWinners(results, userPicks);
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
		</>
	)
}

function renderUserNumbers(numberOfPlays, results, manualPick) {
	const userPicks = quickPicks(numberOfPlays, manualPick);
	return renderUserPicks(userPicks, results)
}

function renderDrawResults(results) {
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
			<td style={{border: 'solid red'}}>
				<Row>
					{lotteryResultsList}
				</Row>
			</td>
			<td style={{border: 'solid green'}}>
				<NumberBox>
					{results.bonusBall}
				</NumberBox>
			</td>
		</>
	)
}

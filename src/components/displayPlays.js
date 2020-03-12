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
	justify-content: center;
`;

const WinningNumbers = styled.div`
	border: solid yellow;
	display: flex;
	flex-direction: row;
`;

const jackpotPrize = 10000000;
const numberOfPlayers = 30000000 * 0.1;
const poolFunds = numberOfPlayers * 5 * 0.521 - jackpotPrize;

export function displayPlays(amount, numberOfPlays, manualPick = null) {
	let list = [];
	for (let i = 0; i < amount; i++) {
		const results = drawResults(true);
		list.push(
			<tr key={uuidv4()}>
				<td>
					{i + 1}
				</td>
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

function prizeInfo(winningCount, wonBonus) {
	if (wonBonus) {
		switch(winningCount) {
			case 3:
				return {
					amount: 20,
					details: '$20'
				};
			case 4:
				const four = (0.0275 * poolFunds) / (numberOfPlayers * (1/1105));
				return {
					amount: four,
					details: four
				};
			case 5:
				const five = (0.015 * poolFunds) / (numberOfPlayers * (1 / 37749));
				return {
					amount: five,
					details: five
				};
			case 6:
				const six = (0.025 * poolFunds) / (numberOfPlayers * (1 / 4756400));
				return {
					amount: six,
					details: six
				};
			case 7:
				return {
					amount: jackpotPrize + poolFunds * 0.8725,
					details: 'JACKPOT!!!!!'
				};
			default:
				return {
					amount: -5,
					details: '-'
				};
		}

	} else {
		// DID NOT WIN BONUS
		switch(winningCount) {
			case 3:
				return {
					amount: 5,
					details: '$5 - Free Play'
				};
			case 4: {
				return {
					amount: 20,
					details: '$20'
				};
			}
			case 5:
				const five = (0.0375 * poolFunds) / (numberOfPlayers * (1/1841));
				return {
					amount: five,
					details: five
				};
			case 6:
				const six = (0.025 * poolFunds) / (numberOfPlayers * (1 / 113248));
				return {
					amount: six,
					details: six
				};
			default:
				return {
					amount: -5,
					details: '-'
				}
		}
	}
}

function findWinners(lotteryResults, userNumbers) {
	const wonBonuses = [];
	const winningCounts = [];
	const renderPlays = [];
	const prizeDetails = [];
	// Go through each play

		userNumbers.forEach((play) => {
			const renderNumber = [];
			let winningCount = 0;
			let wonBonus = false;

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
					wonBonus = true;
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
			<Row key={uuidv4()}>
				{renderNumber}
			</Row>
		);
		winningCounts.push(
			<Row key={uuidv4()}>
				{winningCount ? winningCount : '-'}
			</Row>
		);
		wonBonuses.push(
			<Row
				style={{backgroundColor: `${wonBonus ? 'lightGreen' : 'pink'}`}}
				key={uuidv4()}
			>
				{wonBonus ? 'Yes' : '-'}
			</Row>
		);
		prizeDetails.push(
			<Row
				key={uuidv4()}
			>
				{prizeInfo(winningCount, wonBonus).details}
			</Row>
		)

	});
	return {
		wonBonuses,
		winningCounts,
		renderPlays,
		prizeDetails
	};
}


function renderUserPicks(userPicks, results) {
	// Loop through the userPicks and highlight winners
	const {wonBonuses, winningCounts, renderPlays, prizeDetails} = findWinners(results, userPicks);
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
				<Column>
					{prizeDetails}
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

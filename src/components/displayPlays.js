import React from 'react';
import {v4 as uuidv4} from "uuid";
import styled from "styled-components";

const Results = styled.div`
	//width: 20px;
	display: flex;
	
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
	flex-direction: column;
	border: solid green;
`;

const Row = styled.div`
	display: flex;
`;

const WinningNumbers = styled.div`
	border: solid yellow;
	display: flex;
	flex-direction: row;
`;

const WinningNumbersContainer = styled.div`
	
`;


export function displayPlays(amount, manualPick = null) {
	let list = [];
	for (let i = 0; i <= amount; i++) {
		const results = drawResults(true);
		list.push(
			<Results key={uuidv4()}>
				{renderDrawResults(results)}
				<UserNumbers>
					{userPlays(3, results, manualPick)}
				</UserNumbers>
			</Results>
		)
	}
	return list;
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
	const winningNumbers = [];
	let winningBonusBall = null;
	for (let i = 0; i <= lotteryResults.selectedBalls.length; i++) {
		userNumbers.selectedBalls.forEach((number) => {
			if (number === lotteryResults.bonusBall) winningBonusBall = lotteryResults.bonusBall;
			if (number === lotteryResults.selectedBalls[i]) {
				winningNumbers.push(number);
			}
		})
	}
	return {
		winningBonusBall,
		winningNumbers
	}
}

function numberBox(number, winners) {
	const winningNumber = winners.winningNumbers.some(v => v === number);
	return (
		<NumberBox
			key={number}
			style={{
				backgroundColor: `${
					winners.winningBonusBall === number ? 'yellow' :
						winningNumber ? 'lightGreen' : 'white'
					}`
			}}
		>
			{number}
		</NumberBox>
	)
}

function renderUserPicks(results, userNumbers) {
	const winners = findWinners(results, userNumbers);
	let pickedNumbers = [];

	userNumbers.selectedBalls.forEach((number) => {
		pickedNumbers.push(numberBox(number, winners))
	});
	return (
		<Row>

			{pickedNumbers}

			Number of Matches:
			{winners.winningNumbers.length}
			{winners.winningBonusBall ?
				<div>
					Winning Bonus: {winners.winningBonusBall}
				</div>
				: null
			}

		</Row>
	)
}

function renderUserNumbers(results, manualPick) {
	const userNumbers = manualPick ? {selectedBalls: manualPick} : drawResults();
	return (
		<Results key={uuidv4()}>
			{renderUserPicks(results, userNumbers)}
		</Results>
	)
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
	// Add bonus number
	lotteryResultsList.push(
		<NumberBox key={uuidv4()} style={{backgroundColor: 'yellow'}}>
			{results.bonusBall}
		</NumberBox>
	);

	return (
		<WinningNumbersContainer>
			<WinningNumbers>
				{lotteryResultsList}
			</WinningNumbers>
		</WinningNumbersContainer>
	)
}

function userPlays(numberOfPlays, results, manualPick) {
	let plays = [];
	for (let i = 1; i < numberOfPlays; i++) {
		// Only the first number can be manually picked, the other two must be quick picked.
		if (i === 1) plays.push(renderUserNumbers(results, manualPick));
		plays.push(renderUserNumbers(results))
	}
	return plays
}



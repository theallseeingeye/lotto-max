import React, {useEffect} from 'react';
import {v4 as uuidv4} from "uuid";
import styled from "styled-components";

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
const jackpotPrize = 10000000;
const canadianPop = 37590000;
const playerPercentage = 0.25;
const ticketPrice = 5;
const numberOfPlayers = canadianPop * playerPercentage;
const ticketSales = numberOfPlayers * ticketPrice;
const prizePool = ticketSales * wclc.prizes;
// The lottomax removes the fixed prizes first, then distribute the rest under the pool.


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

export const collectiveWinnings = {
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


export function RenderedDraws(props) {

	return (
		<Table>
			<tbody>
			<Titles>
				<th>Count</th>
				<th>Winning Numbers</th>
				<th>Bonus</th>
				<th>Your Picks</th>
				<th>Won</th>
				<th>Bonus <br/>Won</th>
				<th>Prize</th>
				<th>Gain/Loss</th>
				<th>Total</th>
			</Titles>
			{displayPlays(props.playsPerMonth, 3, props.play)}
			</tbody>
		</Table>
	)
}

export const numbersWon = generateEmptyNumberArray(50);

function displayPlays(amount, numberOfPlays, play, manualPick = null,) {
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

function prizeInfo(winningCount, wonBonus) {
	if (wonBonus) {
		switch(winningCount) {
			case 3:
				prizesWon.threeBonus = prizesWon.threeBonus + 1;
				collectiveWinnings.threeBonus = collectiveWinnings.threeBonus + 20;
				return {
					value: 20,
					details: '$20'
				};
			case 4:
				const four = Math.round((0.0275 * poolFunds) / (numberOfPlayers * (1/1105)));
				prizesWon.fourBonus = prizesWon.fourBonus + 1;
				collectiveWinnings.fourBonus = collectiveWinnings.fourBonus + four;
				prizesWon.fourBonus = prizesWon.fourBonus + 1;
				return {
					value: four,
					details: four
				};
			case 5:
				const five = Math.round((0.015 * poolFunds) / (numberOfPlayers * (1 / 37749)));
				collectiveWinnings.fiveBonus = collectiveWinnings.fiveBonus + five;
				prizesWon.fiveBonus = prizesWon.fiveBonus + 1;
				return {
					value: five,
					details: five
				};
			case 6:
				const six = Math.round((0.025 * poolFunds) / (numberOfPlayers * (1 / 4756400)));
				prizesWon.sixBonus = prizesWon.sixBonus + 1;
				collectiveWinnings.sixBonus = collectiveWinnings.sixBonus + six;
				return {
					value: six,
					details: six
				};
			case 7:
				prizesWon.jackpot = prizesWon.jackpot + 1;
				collectiveWinnings.jackpot = collectiveWinnings.jackpot + Math.round(jackpotPrize + poolFunds * 0.8725);
				return {
					value: jackpotPrize + poolFunds * 0.8725,
					details: 'JACKPOT!!!!!'
				};
			default:
				return {
					value: -5,
					details: '-'
				};
		}

	} else {
		// DID NOT WIN BONUS
		switch(winningCount) {
			case 3:
				prizesWon.three = prizesWon.three + 1;
				collectiveWinnings.three = collectiveWinnings.three + 5;
				return {
					value: 5,
					details: '$5 - Free Play'
				};
			case 4: {
				prizesWon.four = prizesWon.four + 1;
				collectiveWinnings.four = collectiveWinnings.four + 20;
				return {
					value: 20,
					details: '$20'
				};
			}
			case 5:
				const five = Math.round((0.0375 * poolFunds) / (numberOfPlayers * (1/1841)));
				prizesWon.five = prizesWon.five + 1;
				collectiveWinnings.five = collectiveWinnings.five + five;
				return {
					value: five,
					details: five
				};
			case 6:
				const six = Math.round((0.025 * poolFunds) / (numberOfPlayers * (1 / 113248)));
				prizesWon.six = prizesWon.six + 1;
				collectiveWinnings.six = collectiveWinnings.six + six;
				return {
					value: six,
					details: six
				};
			case 7:
				prizesWon.jackpot = prizesWon.jackpot + 1;
				collectiveWinnings.jackpot = collectiveWinnings.jackpot + Math.round(jackpotPrize + poolFunds * 0.8725);
				return {
					value: jackpotPrize + poolFunds * 0.8725,
					details: 'JACKPOT!!!!!'
				};
			default:
				return {
					value: -5,
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
					numbersWon[number-1].count = numbersWon[number-1].count + 1 ;
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
					numbersWon[number-1].count = numbersWon[number-1].count + 1 ;
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

import React, {useContext, useState, useEffect} from 'react';
import {v4 as uuidv4} from "uuid";
import styled from "styled-components";
import {OptionsContext} from "./context/optionsProvider";
import {calculateGlobalWinners, calculatedPrize} from "./utils";
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


// const jackpotPrize = 10000000;
const wclc = {
	prizes: 0.521,
	operatingCost: 0.068,
	retailCommission: 0.07,
	printing: 0.01,
	provinceRev: 0.331,
};
const jackpotPrize = 70000000;
const canadianPop = 37590000;
const playerPercentage = 0.25;
const ticketPrice = 5;
// const numberOfPlayers = canadianPop * playerPercentage;
// const ticketSales = numberOfPlayers * ticketPrice;
// const prizePool = ticketSales * wclc.prizes;
// The lottomax removes the fixed prizes first, then distribute the rest under the pool.


// const pool = ticketSales > jackpotPrize ? ticketSales - jackpotPrize : jackpotPrize;
// const poolFunds = pool <= 0 ? jackpotPrize * (1-0.8725) : pool * (1-0.8725);

export const prizes = {
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
	three: "Free Play",
	threeBonus: 0,
	four: 0,
	fourBonus: 0,
	five: 0,
	fiveBonus: 0,
	six: 0,
	sixBonus: 0,
	jackpot: 0,
};

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


export const numbersWon = generateEmptyNumberArray(50);

export function RenderedDraws() {
	const {play, playsPerMonth, odds, numberOfPlayers} = useContext(OptionsContext);
	const [prizesWon, setPrizesWon] = useState(prizes);
	const {updatePrizeWon} = useContext(StatsContext);

	function setPrizeWon(prizeType) {
		console.log(prizeType);
		setPrizesWon((prizesWon) => {
			console.log('inside', prizesWon);
			return ({
				...prizesWon,
				[prizeType]: prizesWon[prizeType] + 1
			});
		});
	}

	useEffect(() => {
		updatePrizeWon(prizesWon)
	}, [prizesWon]);

	function displayPlays(amount, numberOfPlays, manualPick = null,) {
		let list = [];
		for (let i = 0; i < amount; i++) {
			const results = drawResults(true);
			// calculateGlobalWinners();
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
					if (play) {
						// prizesWon.threeBonus = prizesWon.threeBonus + 1;
						setPrizeWon('threeBonus');
						collectiveWinnings.threeBonus = collectiveWinnings.threeBonus + 20;
					}
					return {
						value: 20,
						details: '$20'
					};
				case 4:
					// const four = calculatedPrize(0.0275, odds.fourBonus);
					// if (play) {
					// 	// prizesWon.fourBonus = prizesWon.fourBonus + 1;
					// 	collectiveWinnings.fourBonus = collectiveWinnings.fourBonus + four;
					// 	prizesWon.fourBonus = prizesWon.fourBonus + 1;
					// }
					// return {
					// 	value: four,
					// 	details: four
					// };
				case 5:
					// const five = calculatedPrize(0.015, odds.fiveBonus);
					// if (play) {
					// 	collectiveWinnings.fiveBonus = collectiveWinnings.fiveBonus + five;
					// 	prizesWon.fiveBonus = prizesWon.fiveBonus + 1;
					// }
					// return {
					// 	value: five,
					// 	details: five
					// };
				case 6:
					// const six = calculatedPrize(0.025, odds.sixBonus);
					// if (play) {
					// 	prizesWon.sixBonus = prizesWon.sixBonus + 1;
					// 	collectiveWinnings.sixBonus = collectiveWinnings.sixBonus + six;
					// }
					// return {
					// 	value: six,
					// 	details: six
					// };
				case 7:
					// const seven = calculatedPrize(0.8725, odds.jackpot);
					// if (play) {
					// 	prizesWon.jackpot = prizesWon.jackpot + 1;
					// 	collectiveWinnings.jackpot = collectiveWinnings.jackpot + seven;
					// }
					// return {
					// 	value: seven,
					// 	details: 'JACKPOT!!!!!'
					// };
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
					if (play) {
						// prizesWon.three = prizesWon.three + 1;
					}
					return {
						value: 5,
						details: 'Free Play'
					};
				case 4: {
					if (play) {
						// prizesWon.four = prizesWon.four + 1;
						collectiveWinnings.four = collectiveWinnings.four + 20;
					}
					return {
						value: 20,
						details: '$20'
					};
				}
				case 5:
					// const five = calculatedPrize(0.0375, odds.five);
					// if (play) {
					// 	prizesWon.five = prizesWon.five + 1;
					// 	collectiveWinnings.five = collectiveWinnings.five + five;
					// }
					// return {
					// 	value: five,
					// 	details: five
					// };
				case 6:
					// const six = calculatedPrize(0.025, odds.six);
					// if (play) {
					// 	prizesWon.six = prizesWon.six + 1;
					// 	collectiveWinnings.six = collectiveWinnings.six + six;
					// }
					// return {
					// 	value: six,
					// 	details: six
					// };
				case 7:
					// const seven = calculatedPrize(0.8725, odds.jackpot);
					// if (play) {
					// 	prizesWon.jackpot = prizesWon.jackpot + 1;
					// 	collectiveWinnings.jackpot = collectiveWinnings.jackpot + seven;
					// }
					// return {
					// 	value: seven,
					// 	details: 'JACKPOT!!!!!'
					// };
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
					style={{backgroundColor: `${wonBonus ? 'lightGreen' : 'white'}`}}
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
					<Column style={{width: '200px'}}>
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
			{displayPlays(playsPerMonth, 3)}
			</tbody>
		</Table>
	)
}

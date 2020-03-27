import {v4 as uuidv4} from "uuid";
import React, {useContext, useState, useEffect} from "react";
import {numbersWon} from "./displayPlays";
import styled from "styled-components";
import {StatsContext} from "./context/statsProvider";


const NumberBox = styled.div`
	width: 20px;
	border: solid gray 0.1px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;


export function FindWinners(winningNumbers, userNumbers) {
	const wonBonuses = [];
	const winningCounts = [];
	const renderPlays = [];
	const prizeDetails = [];
	const rawWinCount = [];
	let wonBonus = false;


	// Go through each play
	userNumbers.forEach((play) => {
		const renderNumber = [];
		let winningCount = 0;
		// setWonBonus(false);
		// Check numbers of each play.
		play.forEach((number) => {

			if (winningNumbers.selectedBalls.some((drawn) => drawn === number)) {
				// A number was found!
				numbersWon[number - 1].count = numbersWon[number - 1].count + 1;
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
			} else if (number === winningNumbers.bonusBall) {
				// Matched bonus!
				numbersWon[number - 1].count = numbersWon[number - 1].count + 1;
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
				{PrizeInfo(winningCount, wonBonus)}
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


function PrizeInfo(winningCount, wonBonus) {
	if (wonBonus) {
		switch (winningCount) {
			case 3:
				// if (play) {
				// prizesWon.threeBonus = prizesWon.threeBonus + 1;
				// setPrizeWon('threeBonus');
				// collectiveWinnings.threeBonus = collectiveWinnings.threeBonus + 20;
				// }
				return '$20';
			case 4:
				// setPrizeWon('fourBonus');
				// const four = calculatedPrize(0.0275, odds.fourBonus);
				// if (play) {
				// 	// prizesWon.fourBonus = prizesWon.fourBonus + 1;
				// 	collectiveWinnings.fourBonus = collectiveWinnings.fourBonus + four;
				// 	prizesWon.fourBonus = prizesWon.fourBonus + 1;
				// }
				return '$20' ;
			case 5:
				// setPrizeWon('fiveBonus');
				// const five = calculatedPrize(0.015, odds.fiveBonus);
				// if (play) {
				// 	collectiveWinnings.fiveBonus = collectiveWinnings.fiveBonus + five;
				// 	prizesWon.fiveBonus = prizesWon.fiveBonus + 1;
				// }
				return '$20';
			case 6:
				// setPrizeWon('sixBonus');
				// const six = calculatedPrize(0.025, odds.sixBonus);
				// if (play) {
				// 	prizesWon.sixBonus = prizesWon.sixBonus + 1;
				// 	collectiveWinnings.sixBonus = collectiveWinnings.sixBonus + six;
				// }

				return '$20';
			case 7:
				// setPrizeWon('jackpot');
				// const seven = calculatedPrize(0.8725, odds.jackpot);
				// if (play) {
				// 	prizesWon.jackpot = prizesWon.jackpot + 1;
				// 	collectiveWinnings.jackpot = collectiveWinnings.jackpot + seven;
				// }
				return '$20';
			default:
				return '-';
		}

	} else {
		// DID NOT WIN BONUS
		switch (winningCount) {
			case 3:
				// setPrizeWon('three');
				// if (play) {
				// prizesWon.three = prizesWon.three + 1;
				// }
				return '$20';
			case 4: {
				// setPrizeWon('four');
				// if (play) {
				// 	prizesWon.four = prizesWon.four + 1;
				// collectiveWinnings.four = collectiveWinnings.four + 20;
				// }
				return '$20';
			}
			case 5:
				// setPrizeWon('five');
				// const five = calculatedPrize(0.0375, odds.five);
				// if (play) {
				// 	prizesWon.five = prizesWon.five + 1;
				// 	collectiveWinnings.five = collectiveWinnings.five + five;
				// }
				return '$20';
			case 6:
				// setPrizeWon('Six');
				// const six = calculatedPrize(0.025, odds.six);
				// if (play) {
				// 	prizesWon.six = prizesWon.six + 1;
				// 	collectiveWinnings.six = collectiveWinnings.six + six;
				// }
				return '$20';
			case 7:
				// setPrizeWon('jackpot');
				// const seven = calculatedPrize(0.8725, odds.jackpot);
				// if (play) {
				// 	prizesWon.jackpot = prizesWon.jackpot + 1;
				// 	collectiveWinnings.jackpot = collectiveWinnings.jackpot + seven;
				// }
				return '$20';
			default:
				return '-';
		}
	}
}


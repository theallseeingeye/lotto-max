import React, {useContext} from 'react';
import {OptionsContext} from "./context/optionsProvider";
import {StatsContext} from "./context/statsProvider";
import {collectiveWinnings} from "./displayPlays";

	// const {gameWinners} = useContext(StatsContext);

let totalPlaysNotWonJackpot = 0;

export function calculateGlobalWinners() {
	const {odds, numberOfPlayers} = useContext(OptionsContext);
	const {prizesWon} = useContext(StatsContext);

	Object.keys(prizesWon).forEach((key) => {
		if (key === 'jackpot') {
			const numberOfWinners = Math.floor(odds[key] * totalPlaysNotWonJackpot);
			if (numberOfWinners < 1) {
				totalPlaysNotWonJackpot = numberOfPlayers + totalPlaysNotWonJackpot;
			} else {
				// prizesWon[key] = numberOfWinners;
				totalPlaysNotWonJackpot = 0;
			}
		} else {
			const numberOfWinners = Math.floor(odds[key] * numberOfPlayers);
			// prizesWon[key] = numberOfWinners;
		}
	});
}


export function calculatedPrize(poolPercentage, prizeType) {
	const {numberOfPlayers, ticketPrice, jackpotPrize} = useContext(OptionsContext);
	const {odds} = useContext(OptionsContext);

	const ticketSales = numberOfPlayers * ticketPrice;
	const pool = ticketSales > jackpotPrize ? ticketSales - jackpotPrize : jackpotPrize;
	const poolFunds = pool <= 0 ? jackpotPrize * (1 - 0.8725) : pool * (1 - 0.8725);

	const totalPriceShare = poolPercentage * poolFunds;
	const numberOfWinners = numberOfPlayers * odds[prizeType];
	const finalPrize = totalPriceShare / numberOfWinners;
	return Math.round(finalPrize);
}


export function prizeInfo(winningCount, wonBonus) {
	const {updatePrizeWon} = useContext(StatsContext);
	// const {play, odds} = useContext(OptionsContext);

	if (wonBonus) {
		switch (winningCount) {
			case 3:
					updatePrizeWon('threeBonus');
				// if (play) {
					// collectiveWinnings.threeBonus = collectiveWinnings.threeBonus + 20;
				// }
				return {
					details: '$20'
				};
			case 4:
				// const four = calculatedPrize(0.0275, 'fourBonus');
				// if (play) {
					// updatePrizeWon('fourBonus');
					// collectiveWinnings.fourBonus = collectiveWinnings.fourBonus + four;
				// }
				return {
					// details: four
				};
			case 5:
				// const five = calculatedPrize(0.015, 'fiveBonus');
				// if (play) {
					// collectiveWinnings.fiveBonus = collectiveWinnings.fiveBonus + five;
					// updatePrizeWon('fiveBonus')
				// }
				return {
					// details: five
				};
			case 6:
				// const six = calculatedPrize(0.025, 'sixBonus');
				// if (play) {
					// updatePrizeWon('sixBonus');
					// collectiveWinnings.sixBonus = collectiveWinnings.sixBonus + six;
				// }
				return {
					// details: six
				};
			case 7:
				// const seven = calculatedPrize(0.8725, 'jackpot');
				// if (play) {
					// updatePrizeWon('jackpot');
					// collectiveWinnings.jackpot = collectiveWinnings.jackpot + seven;
				// }
				return {
					details: 'JACKPOT!!!!!'
				};
			default:
				return {
					details: '-'
				};
		}

	} else {
		// DID NOT WIN BONUS
		switch (winningCount) {
			case 3:
				// if (play) {
					// updatePrizeWon('three')
				// }
				return {
					details: 'Free Play'
				};
			case 4: {
				// if (play) {
					// updatePrizeWon('four');
					// collectiveWinnings.four = collectiveWinnings.four + 20;
				// }
				return {
					details: '$20'
				};
			}
			case 5:
				// const five = calculatedPrize(0.0375, 'five');
				// if (play) {
					// updatePrizeWon('five');
					// collectiveWinnings.five = collectiveWinnings.five + five;
				// }
				return {
					// details: five
				};
			case 6:
				// const six = calculatedPrize(0.025, 'six');
				// if (play) {
					// updatePrizeWon('six');
					// collectiveWinnings.six = collectiveWinnings.six + six;
				// }
				return {
					// details: six
				};
			case 7:
				// const seven = calculatedPrize(0.8725, 'jackpot');
				// if (play) {
					// updatePrizeWon('jackpot');
					// collectiveWinnings.jackpot = collectiveWinnings.jackpot + seven;
				// }
				return {
					details: 'JACKPOT!!!!!'
				};
			default:
				return {
					details: '-'
				}
		}
	}
}

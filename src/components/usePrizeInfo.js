import React, {useContext, useEffect, useState} from 'react';
import {StatsContext} from "./context/statsProvider";

export function usePrizeInfo(winningCount, wonBonus) {
	// const {updatePrizeWon} = useContext(StatsContext);

	if (wonBonus) {
		switch(winningCount) {
			case 3:
				// updatePrizeWon('threeBonus');
				// prizesWon.threeBonus = prizesWon.threeBonus + 1;
				// collectiveWinnings.threeBonus = collectiveWinnings.threeBonus + 20;
				return {
					details:'hello',
					prizeType: 'threeBonus'
				};
			case 4:
				// const four = calculatedPrize(0.0275, odds.fourBonus);
				// prizesWon.fourBonus = prizesWon.fourBonus + 1;
				// collectiveWinnings.fourBonus = collectiveWinnings.fourBonus + four;
				// prizesWon.fourBonus = prizesWon.fourBonus + 1;
				// return {
				// 	value: four,
				// 	details: four
				// };
				return {
					details: 'hello',
					prizeType: 'threeBonus'
				};
			case 5:
				// const five = calculatedPrize(0.015, odds.fiveBonus);
				// collectiveWinnings.fiveBonus = collectiveWinnings.fiveBonus + five;
				// prizesWon.fiveBonus = prizesWon.fiveBonus + 1;
				// return {
				// 	value: five,
				// 	details: five
				// };
				return {
					details: 'hello',
					prizeType: 'threeBonus'
				};
			case 6:
				// const six = calculatedPrize(0.025, odds.sixBonus);
				// prizesWon.sixBonus = prizesWon.sixBonus + 1;
				// collectiveWinnings.sixBonus = collectiveWinnings.sixBonus + six;
				// return {
				// 	value: six,
				// 	details: six
				// };
				return {
					details: 'hello',
					prizeType: 'threeBonus'
				};
			case 7:
				// const seven = calculatedPrize(0.8725, odds.jackpot);
				// prizesWon.jackpot = prizesWon.jackpot + 1;
				// collectiveWinnings.jackpot = collectiveWinnings.jackpot + seven;
				// return {
				// 	value: seven,
				// 	details: 'JACKPOT!!!!!'
				// };
				return {
					details: 'hello',
					prizeType: 'threeBonus'
				};
			default:
				return {
					details: '-',
					prizeType: '-'
				};
		}

	} else {
		// DID NOT WIN BONUS
		switch(winningCount) {
			case 3:
				// updatePrizeWon('three');
				// prizesWon.three = prizesWon.three + 1;
				// // collectiveWinnings.three = collectiveWinnings.three + 5;
				// // collectiveWinnings.three = ;
				// return {
				// 	value: 5,
				// 	details: 'Free Play'
				// };
				return {
					details: 'hello',
					prizeType: 'threeBonus'
				};
			case 4:
			// 	{
			// 	prizesWon.four = prizesWon.four + 1;
			// 	collectiveWinnings.four = collectiveWinnings.four + 20;
			// 	return {
			// 		value: 20,
			// 		details: '$20'
			// 	};
			// }
				return {
					details: 'hello',
					prizeType: 'threeBonus'
				};
			case 5:
				// const five = calculatedPrize(0.0375, odds.five);
				// prizesWon.five = prizesWon.five + 1;
				// collectiveWinnings.five = collectiveWinnings.five + five;
				// return {
				// 	value: five,
				// 	details: five
				// };
				return {
					details: 'hello',
					prizeType: 'threeBonus'
				};
			case 6:
				// const six = calculatedPrize(0.025, odds.six);
				// prizesWon.six = prizesWon.six + 1;
				// collectiveWinnings.six = collectiveWinnings.six + six;
				// return {
				// 	value: six,
				// 	details: six
				// };
				return {
					details: 'hello',
					prizeType: 'threeBonus'
				};
			case 7:
				// const seven = calculatedPrize(0.8725, odds.jackpot);
				// prizesWon.jackpot = prizesWon.jackpot + 1;
				// collectiveWinnings.jackpot = collectiveWinnings.jackpot + seven;
				// return {
				// 	value: seven,
				// 	details: 'JACKPOT!!!!!'
				// };
				return {
					details: 'hello',
					prizeType: 'threeBonus'
				};
			default:
				return {
					details: '2',
					prizeType: '2'
				};
		}
	}

}

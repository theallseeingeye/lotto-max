import React, {createContext, useContext, useState} from 'react'
import {OptionsContext} from "./optionsProvider";

export const StatsContext = createContext();

const prizes = {
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

export function StatsProvider({children}) {
	const {playsPerMonth, prizeValue, ticketPrice} = useContext(OptionsContext);
	const [monthCount, setMonthCount] = useState(0);
	const [playCount, setPlayCount] = useState(0);
	const [prizesWon, setPrizesWon] = useState(prizes);
	const [prizesWonTotal, setPrizesWonTotal] = useState(prizes);
	const [accumulatedWin, setAccumulatedWin] = useState(0);
	const [accumulatedLoss, setAccumulatedLoss] = useState(0);

	function accumulateMonthCount() {
		setMonthCount(count => count + 1);
		setPlayCount(count => count * playsPerMonth);
	}

	function updatePrizeWon(prizeType) {
		setPrizesWon((prizesWon) => {
			return ({
				...prizesWon,
				[prizeType]: prizesWon[prizeType] + 1
			});
		});
	}

	function updatePrizeTotalWon(prizeType) {
		setPrizesWonTotal(e => {
			return {
				...e,
				[prizeType]: e[prizeType] + prizeValue[prizeType]
			}
		})
	}

	function addWin(prizeType) {
		setAccumulatedWin(e => e + prizeValue[prizeType]);
		updatePrizeTotalWon(prizeType)
	}

	function addLoss() {
		setAccumulatedLoss(e => e - ticketPrice);
	}

	return (
		<StatsContext.Provider value={{
			accumulateMonthCount,
			updatePrizeWon,
			updatePrizeTotalWon,
			addLoss,
			addWin,
			monthCount,
			playCount,
			prizesWon,
			prizesWonTotal,
			setPrizesWonTotal,
			accumulatedWin,
			setAccumulatedWin,
			accumulatedLoss,
			setAccumulatedLoss,
		}}>
			{children}
		</StatsContext.Provider>
	)

}
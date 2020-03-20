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
	const {playsPerMonth} = useContext(OptionsContext);
	const [monthCount, setMonthCount] = useState(0);
	const [playCount, setPlayCount] = useState(0);
	const [prizesWon, setPrizesWon] = useState(prizes);
	// const [prizesWonTotal, setPrizesWonTotal] = useState(prizes);

	function accumulateMonthCount() {
		setMonthCount(count => count + 1);
		setPlayCount(count => count * playsPerMonth);
	}

	function updatePrizeWon(prizeType) {
			console.log(prizeType);
		setPrizesWon((prizesWon) => {
			console.log('inside', prizesWon);
			return ({
				...prizesWon,
				[prizeType]: prizesWon[prizeType] + 1
			});
		});
	}

	return (
		<StatsContext.Provider value={{
			accumulateMonthCount,
			monthCount,
			playCount,
			prizesWon,
			updatePrizeWon,
		}}>
			{children}
		</StatsContext.Provider>
	)

}
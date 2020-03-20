import React, {createContext, useState} from 'react'

export const OptionsContext = createContext();

const canadianPop = 37590000;
const playerPercentage = 0.25;
const canadianPlayers = canadianPop * playerPercentage;

export function OptionsProvider({children}) {
	const [startAge, setStartAge] = useState(18);
	const [delay, setDelay] = useState(0);
	const [playsPerMonth, setPlaysPerMonth] = useState(8);
	const [play, setPlay] = useState(false);
	const [endAge, setEndAge] = useState(85);
	const [odds, setOdds] = useState({
		three: 1 / 8.5,
		threeBonus: 1 / 82.9,
		four: 1 / 82.9,
		fourBonus: 1 / 105,
		five: 1 / 1841,
		fiveBonus: 1 / 37749,
		six: 1 / 113248,
		sixBonus: 1 / 4756400,
		jackpot: 1 / 33294800,
	});
	const [numberOfPlayers, setNumberOfPlayers] = useState(canadianPlayers);
	const [ticketPrice, setTicketPrice] = useState(5);
	const [jackpotPrize, setJackpotPrize] = useState(12000000);

	return (
		<OptionsContext.Provider value={{
			startAge,
			setStartAge,
			delay,
			setDelay,
			playsPerMonth,
			setPlaysPerMonth,
			play,
			setPlay,
			endAge,
			setEndAge,
			odds,
			numberOfPlayers,
			ticketPrice,
			jackpotPrize,
		}}>
			{children}
		</OptionsContext.Provider>
	)
}
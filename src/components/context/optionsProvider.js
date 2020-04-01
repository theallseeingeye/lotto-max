import React, {createContext, useState} from 'react'

export const OptionsContext = createContext();

const canadianPop = 37590000;
const playerPercentage = 0.25;
const canadianPlayers = canadianPop * playerPercentage;

const wclc = {
	prizes: 0.521,
	operatingCost: 0.068,
	retailCommission: 0.07,
	printing: 0.01,
	provinceRev: 0.331,
};

const awardValue = {
	three: 5,
	threeBonus: 20,
	four: 20,
	fourBonus: 0,
	five: 0,
	fiveBonus: 0,
	six: 0,
	sixBonus: 0,
	jackpot: 100000000,
};

export function OptionsProvider({children}) {
	const [delay, setDelay] = useState(0);
	const [endAge, setEndAge] = useState(85);
	const [entriesPerGame, setEntriesPerGame] = useState(3);
	const [jackpotPrize, setJackpotPrize] = useState(12000000);
	const [numberOfPlayers, setNumberOfPlayers] = useState(canadianPlayers);
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
	const [playsPerMonth, setPlaysPerMonth] = useState(8);
	const [play, setPlay] = useState(false);
	const [startAge, setStartAge] = useState(18);
	const [ticketPrice, setTicketPrice] = useState(5);
	const [prizeValue, setPrizeValue] = useState(awardValue);

	return (
		<OptionsContext.Provider value={{
			startAge,
			setStartAge,
			delay,
			setDelay,
			play,
			setPlay,
			playsPerMonth,
			setPlaysPerMonth,
			endAge,
			setEndAge,
			odds,
			numberOfPlayers,
			ticketPrice,
			jackpotPrize,
			entriesPerGame,
			prizeValue
		}}>
			{children}
		</OptionsContext.Provider>
	)
}
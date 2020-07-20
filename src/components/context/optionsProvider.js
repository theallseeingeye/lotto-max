import React, {createContext, useState} from 'react'

export const OptionsContext = createContext();


const awardValue = {
	three: 2.4, // The lottery has their own interpretation of the value, not the retail value.
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
	// const [numberOfPlayers, setNumberOfPlayers] = useState(numberOfPlayersPerGame);
	const [odds, setOdds] = useState({
		three: 1 / 8.5,
		threeBonus: 1 / 82.9,
		four: 1 / 82.9,
		fourBonus: 1 / 1105,
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
	const [gender, setGender] = useState('male')

	function didWin(prizeType) {
		// console.log(odds.four * numberOfPlayers);
		// const winningOdds = odds[prizeType] * numberOfPlayers;
		// console.log(winningOdds, numberOfPlayers);
		// return Math.random() < winningOdds;
	}

	function updateGender(gender) {
		if (gender !== 'male' && gender !== 'female') return console.log('Not an appropriate gender. Received ', gender);
		setGender(gender);
	}

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
			ticketPrice,
			jackpotPrize,
			entriesPerGame,
			prizeValue,
			setPrizeValue,
			didWin,
			updateGender,
			gender
		}}>
			{children}
		</OptionsContext.Provider>
	)
}
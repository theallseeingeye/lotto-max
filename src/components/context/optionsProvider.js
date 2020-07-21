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
	const [startAge, setStartAge] = useState(40);
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

	function updateEndAge(age) {
		// const ageNum = parseInt(age);
		// // This is to set the bounds of the end age. 
		// // Max age - 125 (World record was 122.5 years);
		// // 1 year more than starting age. (adjust the starting age).
		// const fixedAge = startAge + 1;
		// console.log('type of ', typeof(startAge))
		// if (ageNum >= 125) {
		// 	return setEndAge(125);
		// } else if (fixedAge >= ageNum) {
		// 	return setEndAge(fixedAge)
		// } else {
		// 	return setEndAge(ageNum);
		// }
	}

	function increaseEndAge() {
		return setEndAge(current => {
			if (current >= 125) return 125; // Cant be older than this age
			return current + 1; // Increase age by 1
		})
	}

	function decreaseEndAge() {
		return setEndAge(current => {
			const minAge = startAge + 1;
			if (current <= minAge) {
				return minAge; // Can't die before current age.
			} 
			return current - 1; // Reduce age by 1
		})
	}

	function increaseStartAge() {
		return setStartAge(current => {
			const maxAge = endAge - 1;
			if (current >= maxAge) return maxAge;
			return current + 1;
		})
	}

	function decreaseStartAge() {
		return setStartAge(current => {
			if (current <= 0) return 0; // Min age allowed;
			return current - 1;
		})
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
			gender,
			updateEndAge,
			increaseEndAge,
			decreaseEndAge,
			increaseStartAge,
			decreaseStartAge
		}}>
			{children}
		</OptionsContext.Provider>
	)
}
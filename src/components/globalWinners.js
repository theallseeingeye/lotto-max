import React, {useContext, useState, useEffect} from 'react'
import {OptionsContext} from "./context/optionsProvider";
import {StatsContext} from "./context/statsProvider";
import {getRandomInt} from "./utils";
import {numberOfPlayers} from "./globalWinners/population";
import {useGlobalWinners} from "./globalWinners/globalWinners";

export function SimulateGlobalWinners() {
	const {didWin, odds, setPrizeValue, ticketPrice, prizeValue} = useContext(OptionsContext);
	const {currentPrize, totalPlayers, setCurrentPrize, monthCount} = useContext(StatsContext);
	const globalWinners = useGlobalWinners();

	const poolShare = {
		fourBonus: 0.0275,
		five: 0.035,
		fiveBonus: 0.015,
		six: 0.025,
		sixBonus: 0.025,
		jackpot: 0.8725
	};


	const [poolFunds, setPoolFunds] = useState(10000000);

	function jackpotWin() {
		const playersWhoHasChance = odds.jackpot * (totalPlayers);
		const isWon = Math.random() < playersWhoHasChance;

		if (isWon) {
			// Update the payout values

			// Clear the jackpot back to $10m

			//
			return poolShare.jackpot * poolFunds

		} else {
			// Add to jackpot


		}
	}

	function sixBonusWon() {
		const playersWhoHasChance = Math.ceil(odds.sixBonus * totalPlayers);
		const winners = Math.round(getRandomInt(0, playersWhoHasChance));
		// console.log(winners);
		return winners;
	}

	function shareCalculation(prizeType) {
		const players = currentPrize === prizeType ? totalPlayers + 1 : totalPlayers;
		const share = poolShare[prizeType] * poolFunds;
		const numberOfPlayers = odds[prizeType] * players;

		// console.log(prizeType, numberOfPlayers)
		return share / numberOfPlayers;
	}

	function fixedPayout(prizeType) {
		const players = currentPrize === prizeType ? totalPlayers + 1 : totalPlayers;
		const totalPayout = players * odds[prizeType] * prizeValue[prizeType];

		return totalPayout
	}

	function calculateTotalPoolPayout() {
		let totalPoolPayout = 0;
		Object.keys(poolPayoutList).forEach(function (key) {
			totalPoolPayout = totalPoolPayout + poolPayoutList[key];
		});
		return totalPoolPayout;
	}





	const fixedPayoutTotal = {
		three: fixedPayout('three'),
		threeBonus: fixedPayout('threeBonus'),
		four: fixedPayout('four'),
	};

	const poolPayoutList = {
		fourBonus: shareCalculation('fourBonus'),
		five: shareCalculation('five'),
		fiveBonus: shareCalculation('fiveBonus'),
		six: shareCalculation('six'),
		sixBonus: shareCalculation('sixBonus'),
		jackpot: (poolShare.jackpot * poolFunds)
	};

	useEffect(() => {
		console.log('globalWinners', globalWinners.sixBonus);

		setPoolFunds(current => {
			const totalFixedPayout = fixedPayoutTotal.three + fixedPayoutTotal.threeBonus + fixedPayoutTotal.four;
			const ticketSales = totalPlayers * ticketPrice;
			const ticketSalesPooled = ticketSales * 0.48;
			const ticketSalesLessFixedPayout = ticketSalesPooled - totalFixedPayout;
			const finalPoolAmount = ticketSalesLessFixedPayout - calculateTotalPoolPayout();
			const updatedPool = current + finalPoolAmount;

			// console.log(poolPayoutList);
			// Need to round the jackpot value and set for prize value.

			if (updatedPool > 50000000 && updatedPool < 70000000) {
				// console.log('More than 50m, start adding max millions')
			} else if (updatedPool > 70000000) {
				// console.log('MAX jackpot')
			}




			// console.log('new pool', updatedPool);

			return current + (totalPlayers * ticketPrice * 0.48)
		});
		setPrizeValue(e => {



			return {
				...e,
				...poolPayoutList
			}
		})

		//TODO: refresh totalplayers
		// setTotalPlayers(numberOfPlayers());

	}, [monthCount]);



}
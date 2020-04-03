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


export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


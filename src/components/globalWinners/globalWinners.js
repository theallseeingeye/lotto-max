import {useContext} from 'react';
import {StatsContext} from "../context/statsProvider";
import {OptionsContext} from "../context/optionsProvider";
import {getRandomInt} from "../utils";


export function useGlobalWinners() {
	const {currentPrize, totalPlayers} = useContext(StatsContext);
	const {odds} = useContext(OptionsContext);

	const globalWinners = {
		three: calculateWinners('three'),
		threeBonus: calculateWinners('threeBonus'),
		four: calculateWinners('four'),
		fourBonus: calculateWinners('fourBonus'),
		five: calculateWinners('five'),
		fiveBonus: calculateWinners('fiveBonus'),
		six: calculateWinners('six'),
		sixBonus: calculateWinners('sixBonus'),
		jackpot: calculateWinners('jackpot')
	};

	function calculateWinners(prizeType) {
		const players = currentPrize === prizeType ? totalPlayers + 1 : totalPlayers;

		if ('jackpot' === prizeType) {
			// Handle jackpot chances
			const playersWhoHasChance = odds[prizeType] * totalPlayers;
			// console.log('total players', playersWhoHasChance)
			// return getRandomInt(0, playersWhoHasChance)
			const isWon = Math.random() < playersWhoHasChance;
			if (isWon) {
				return 1
			} else {
				return 0
			}
		}

		if ('sixBonus' === prizeType) {
			// Handle multiple people winning this.
			const playersWhoHasChance = Math.ceil(odds.sixBonus * totalPlayers);
			return Math.round(getRandomInt(0, playersWhoHasChance));
		}

		return Math.round(odds[prizeType] * players);
	}


	return globalWinners
}

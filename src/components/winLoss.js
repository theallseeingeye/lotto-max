import React, {useContext} from 'react'
import {collectiveWinnings} from "./displayPlays";
import {StatsContext} from "./context/statsProvider";

export function WinLoss() {
	const {playCount, prizesWon} = useContext(StatsContext);

	let total = 0;

	const totalWinnings = () => Object.keys(collectiveWinnings).forEach((key) => {
		if (key !== 'three') total = total + collectiveWinnings[key];
	});

	totalWinnings();
	return(
		<>
			Wins: {total} <br/>
			Loss: {(playCount-prizesWon.three) * 5} <br/>
			Total: {total - (playCount-prizesWon.three) * 5} <br/>
		</>
	)
}
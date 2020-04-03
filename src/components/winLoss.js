import React, {useContext} from 'react'
import {StatsContext} from "./context/statsProvider";

export function WinLoss() {
	const {
		accumulatedWin,
		accumulatedLoss,
	} = useContext(StatsContext);

	return(
		<>
			Wins: {accumulatedWin} <br/>
			Ticket Purchases: {accumulatedLoss} <br/>
			Total: {accumulatedWin + accumulatedLoss} <br/>
		</>
	)
}
import React, {useContext} from 'react'
import {collectiveWinnings} from "./displayPlays";
import {StatsContext} from "./context/statsProvider";


export function Stats() {
	const {monthCount, playCount, prizesWon} = useContext(StatsContext);

	return (
		<div>
			Stats
			<table>
				<tbody>
					<tr>
						<th>Matches Won</th>
						<th>Number Of Wins</th>
						<th>Winning Amount ($)</th>
					</tr>
					<tr>
						<td>
							3
						</td>
						<td>
							{prizesWon.three}
						</td>
						<td>
							{collectiveWinnings.three}
						</td>
					</tr>
					<tr>
						<td>
							3 + Bonus
						</td>
						<td>
							{prizesWon.threeBonus}
						</td>
						<td>
							{collectiveWinnings.threeBonus}
						</td>
					</tr>
					<tr>
						<td>
							4
						</td>
						<td>
							{prizesWon.four}
						</td>
						<td>
							{collectiveWinnings.four}
						</td>
					</tr>
					<tr>
						<td>
							4 + Bonus
						</td>
						<td>
							{prizesWon.fourBonus}
						</td>
						<td>
							{collectiveWinnings.fourBonus}
						</td>
					</tr>
					<tr>
						<td>
							5
						</td>
						<td>
							{prizesWon.five}
						</td>
						<td>
							{collectiveWinnings.five}
						</td>
					</tr>
					<tr>
						<td>
							5 + Bonus
						</td>
						<td>
							{prizesWon.fiveBonus}
						</td>
						<td>
							{collectiveWinnings.fiveBonus}
						</td>
					</tr>
					<tr>
						<td>
							6
						</td>
						<td>
							{prizesWon.six}
						</td>
						<td>
							{collectiveWinnings.six}
						</td>
					</tr>
					<tr>
						<td>
							6 + Bonus
						</td>
						<td>
							{prizesWon.sixBonus}
						</td>
						<td>
							{collectiveWinnings.sixBonus}
						</td>
					</tr>
					<tr>
						<td>
							Jackpot
						</td>
						<td>
							{prizesWon.jackpot}
						</td>
						<td>
							{collectiveWinnings.jackpot}
						</td>
					</tr>
				</tbody>
			</table>

			Months {monthCount} <br/>
			Years {Math.round(monthCount / 12)} <br/>
			Plays {playCount} <br/>

		</div>
	)
}
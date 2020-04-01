import React, {useContext} from 'react'
import {StatsContext} from "./context/statsProvider";

export function Stats() {
	const {monthCount, playCount, prizesWon, prizesWonTotal} = useContext(StatsContext);
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
							Free Play
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
							{prizesWonTotal.threeBonus}
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
							{prizesWonTotal.four}
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
							{prizesWonTotal.fourBonus}
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
							{prizesWonTotal.five}
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
							{prizesWonTotal.fiveBonus}
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
							{prizesWonTotal.six}
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
							{prizesWonTotal.sixBonus}
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
							{prizesWonTotal.jackpot}
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
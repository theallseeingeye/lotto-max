import React from 'react';
import {displayPlays} from "./displayPlays";
import styled from 'styled-components'

const Titles = styled.tr`
	//display: flex;
	border-color: black;
	//justify-content: space-evenly;
`;

const Table = styled.table`
	//width: 100%;
`;


export function Main() {

	return(
		<div>
			Main
			<Table>
				<tbody>
					<Titles>
						<th>Count</th>
						<th>Winning Numbers</th>
						<th>Bonus</th>
						<th>Your Picks</th>
						<th>Won</th>
						<th>Bonus <br/>Won</th>
						<th>Prize</th>
						<th>Gain/Loss</th>
						<th>Total</th>
					</Titles>
					{displayPlays(500, 3)}
				</tbody>
			</Table>
		</div>
	)
}
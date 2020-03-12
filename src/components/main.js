import React from 'react';
import {displayPlays} from "./displayPlays";
import styled from 'styled-components'

const Titles = styled.tr`
	//display: flex;
	//border: solid black;
	//justify-content: space-evenly;
`;

const Table = styled.table`
	width: 100%;
`;


export function Main() {

	return(
		<div>
			Main
			<Table>
				<tbody>
					<Titles>
						<th>Winning Numbers</th>
						<th>Bonus Number</th>
						<th>Your Picks</th>
						<th>Winners</th>
						<th>Bonus</th>
					</Titles>
					{displayPlays(20, 3)}
				</tbody>
			</Table>
		</div>
	)
}
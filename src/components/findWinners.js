import {v4 as uuidv4} from "uuid";
import React, {useContext, useState, useEffect, useLayoutEffect} from "react";
import {numbersWon} from "./displayPlays";
import styled from "styled-components";
import {StatsContext} from "./context/statsProvider";
import {OptionsContext} from "./context/optionsProvider";

const NumberBox = styled.div`
	width: 20px;
	border: solid gray 0.1px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;


export function FindWinners(winningNumbers, userNumbers) {
	const [winningCounts, setWinningCounts] = useState([]);
	const [renderPlays, setRenderPlays] = useState([]);
	const [prizeDetails, setPrizeDetails] = useState([]);
	const [wonBonuses, setWonBonuses] = useState([]);

	useLayoutEffect(() => {
		// Go through each play
		userNumbers.forEach((play) => {
			let renderPlay = [];
			let winners = 0;
			let wonBonus = false;
			// Check numbers of each play.
			play.forEach((number) => {
					// A number was found!
				if (winningNumbers.selectedBalls.some((drawn) => drawn === number)) {
					numbersWon[number - 1].count = numbersWon[number - 1].count + 1;
					winners = ++winners;
					renderPlay.push(
						<NumberBox
							key={uuidv4()}
							style={{
								backgroundColor: 'lightGreen'
							}}
						>
							{number}
						</NumberBox>
					)

				// Matched bonus!
				} else if (number === winningNumbers.bonusBall) {
					numbersWon[number - 1].count = numbersWon[number - 1].count + 1;
					wonBonus = true;
					renderPlay.push(
						<NumberBox
							key={uuidv4()}
							style={{
								backgroundColor: 'yellow'
							}}
						>
							{number}
						</NumberBox>
					)

				// This number is a loser.
				} else {
					renderPlay.push(
						<NumberBox
							key={uuidv4()}
						>
							{number}
						</NumberBox>
					)
				}
			});

			setRenderPlays(e => [
					...e,
					<Row key={uuidv4()}>
						{renderPlay}
					</Row>
				]
			);

			setWinningCounts(count => [
					...count,
					<Row key={uuidv4()}>
						{winners ? winners : '-'}
					</Row>
				]
			);

			setWonBonuses(e => [
					...e,
					<Row
						style={{backgroundColor: `${wonBonus ? 'lightGreen' : 'white'}`}}
						key={uuidv4()}
					>
						{wonBonus ? 'Yes' : '-'}
					</Row>
				]
			);

			setPrizeDetails(e => [
				...e,
				<Row
					key={uuidv4()}
				>
					<PrizeDetails
						winningCount={winners}
						wonBonus={wonBonus}
					/>
				</Row>
				]
			)
		});
	},[]);

	return {
		wonBonuses,
		winningCounts,
		renderPlays,
		prizeDetails,
	};
}

function PrizeDetails({winningCount, wonBonus}) {
	const {details, prize} = prizeInfo(winningCount, wonBonus);
	const {
		updatePrizeWon,
		addWin,
		addLoss,
	} = useContext(StatsContext);

	useEffect(() => {
		if (prize !== 'none') {
			updatePrizeWon(prize);
			if (prize !== 'three') {
				addWin(prize);
			}
		} else {
			addLoss();
		}
	}, []);

	return (
		<Row
			key={uuidv4()}
		>
			{details}
		</Row>
	)
}


function prizeInfo(winningCount, wonBonus) {
	const {prizeValue} = useContext(OptionsContext);
	if (wonBonus) {
		switch (winningCount) {
			case 3:
				return {
					prize: 'threeBonus',
					details: `$${prizeValue['threeBonus']}`
				};
			case 4:
				return {
					prize: 'fourBonus',
					details: `$${prizeValue['fourBonus']}`
				};
			case 5:
				return {
					prize: 'fiveBonus',
					details: `$${prizeValue['fiveBonus']}`
				};
			case 6:
				return {
					prize: 'sixBonus',
					details: `$${prizeValue['sixBonus']}`
				};
			case 7:
				return {
					prize: 'jackpot',
					details: `$${prizeValue['jackpot']}`
				};
			default:
				return {
					prize: 'none',
					details: '-'
				}
		}

	} else {
		// DID NOT WIN BONUS
		switch (winningCount) {
			case 3:
				return {
					prize: 'three',
					details: 'Free Play'
				};
			case 4:
				return {
					prize: 'four',
					details: `$${prizeValue['four']}`
				};
			case 5:
				return {
					prize: 'five',
					details: `$${prizeValue['five']}`
				};
			case 6:
				return {
					prize: 'six',
					details: `$${prizeValue['six']}`
				};
			case 7:
				return {
					prize: 'jackpot',
					details: `$${prizeValue['jackpot']}`
				};
			default:
				return {
					prize: 'none',
					details: '-'
				}
		}
	}
}


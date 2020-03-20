import React, {useContext} from 'react'
import {ResponsiveBarCanvas} from "@nivo/bar";
import {StatsContext} from "./context/statsProvider";

export function WinningsChart() {
	const {prizesWon} = useContext(StatsContext);

	const data = [
		{
			"prize": "3",
			"value": prizesWon.three,
			// "amountColor": "hsl(48, 70%, 50%)"
		},
		{
			"prize": "3 + Bonus",
			"value": prizesWon.threeBonus,
			// "amountColor": "hsl(48, 70%, 50%)"
		},
		{
			"prize": "4",
			"value": prizesWon.four,
			// "amountColor": "hsl(48, 70%, 50%)"
		},
		{
			"prize": "4 + Bonus",
			"value": prizesWon.fourBonus,
			// "amountColor": "hsl(48, 70%, 50%)"
		},
		{
			"prize": '5',
			"value": prizesWon.five,
			// "amountColor": "hsl(48, 70%, 50%)"
		},
		{
			"prize": "5 + Bonus",
			"value": prizesWon.fiveBonus,
			// "amountColor": "hsl(48, 70%, 50%)"
		},
		{
			"prize": "6",
			"value": prizesWon.six,
			// "amountColor": "hsl(48, 70%, 50%)"
		},
		{
			"prize": "6 + Bonus",
			"value": prizesWon.sixBonus,
			// "amountColor": "hsl(48, 70%, 50%)"
		},
		{
			"prize": "7",
			"value": prizesWon.jackpot,
			// "amountColor": "hsl(48, 70%, 50%)"
		},

	];

	return (
		<ResponsiveBarCanvas
			data={data}
			indexBy="prize"
			margin={{top: 50, right: 130, bottom: 50, left: 120}}
			padding={0.3}
			// layout="horizontal"
			colors={{scheme: 'nivo'}}

			borderColor={{from: 'color', modifiers: [['darker', '0.6']]}}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'Occurrences',
				legendPosition: 'middle',
				legendOffset: 32
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'Matches',
				legendPosition: 'middle',
				legendOffset: -80
			}}
			enableGridX={false}
			enableGridY={true}
			// enableLabel={true}
			// labelSkipWidth={0}
			// labelSkipHeight={0}
			labelTextColor="black"
			// labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
			// legends={[]}
			isInteractive={false}
			animate={true}
			motionStiffness={90}
			motionDamping={15}
		/>
	)
}

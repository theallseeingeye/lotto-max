import React, {useEffect} from 'react'
import {ResponsiveBarCanvas} from "@nivo/bar";
import {numbersWon} from "./displayPlays";

export function NumbersWonChart() {

	return (
		<ResponsiveBarCanvas
			data={numbersWon}
			// indexBy="prize"
			keys={['count']}
			margin={{top: 50, right: 130, bottom: 50, left: 120}}
			padding={0.3}
			layout="horizontal"
			colors={{scheme: 'nivo'}}

			borderColor={{from: 'color', modifiers: [['darker', '0.6']]}}
			axisTop={null}
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
			enableGridX={true}
			enableGridY={false}
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

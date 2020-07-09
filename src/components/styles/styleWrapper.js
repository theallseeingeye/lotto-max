import React from 'react'
import {ThemeProvider} from 'styled-components'
import {GlobalStyles} from './globalStyles'


const theme = {
	colors: {
		main: `rgb(255, 98, 74)`,
		frame: `white`,
		lightBlack: `rgb(38, 35, 35)`
	},
	frame: {
		width: `3vh` // This vh helps keeps the border nicely with tall phones
	}
};


export const StyleWrapper = ({children}) => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyles/>
				{children}
			</ThemeProvider>
		</>
	)
};

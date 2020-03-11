import React, {createContext, useContext, useState} from 'react'

// Defaults
const defaults = {
	mode: 'light',
};

const themes = {
	light: {
		backgroundMain: 'white',
		buttonBorder: 'black',
		buttonMain: 'lightBlue',
		buttonHover: 'blue',
		buttonClick: 'green',
		keyPadText: 'black',
		buttonClear: '#d65a31',
		inputCorrect: '#4ecca3',
		inputWrong: '#d65a31',
		questionValues: 'black',
	},
	dark: {
		backgroundMain: '#222831',
		buttonBorder: '#3d2e4f',
		buttonMain: '#393e46',
		buttonHover: '#4c5f7a',
		buttonClick: '#4ecca3',
		keyPadText: '#eeeeee',
		buttonClear: '#d65a31',
		inputCorrect: '#4ecca3',
		inputWrong: '#d65a31',
		questionValues: '#eeeeee',
		operatorColor: '#ffc045'
	}
};

export const ThemeContext = createContext(defaults);

export function ThemeProvider({children}) {
	const [mode, setMode] = useState('dark');

	function currentTheme() {
		return themes[mode]
	}

	function changeTheme(mode) {
		setMode(mode)
	}

	return (
		<ThemeContext.Provider value={{currentTheme, changeTheme}}>
			{children}
		</ThemeContext.Provider>
	)

};
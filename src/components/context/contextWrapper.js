import React from 'react';
import {ThemeProvider} from './themeProvider'

export function ContextWrapper({children}) {

	// TODO: Turn this into an loop for generating.
	// const providers = [
	// 	ThemeProvider,
	// 	DisplayProvider,
	// 	KeyPadProvider,
	// 	QuestionProvider,
	// 	OptionsProvider
	// ];
	//

	return (
		<ThemeProvider>
			{/*<DisplayProvider>*/}
			{/*	<KeyPadProvider>*/}
			{/*		<QuestionProvider>*/}
			{/*			<OptionsProvider>*/}
							{children}
			{/*			</OptionsProvider>*/}
			{/*		</QuestionProvider>*/}
			{/*	</KeyPadProvider>*/}
			{/*</DisplayProvider>*/}
		</ThemeProvider>
	)

}
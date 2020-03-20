import React from 'react';
import {ThemeProvider} from './themeProvider'
import {OptionsProvider} from "./optionsProvider";
import {StatsProvider} from "./statsProvider";

export function ContextWrapper({children}) {

	return (
		<ThemeProvider>
			<OptionsProvider>
				<StatsProvider>
					{children}
				</StatsProvider>
			</OptionsProvider>
		</ThemeProvider>
	)

}
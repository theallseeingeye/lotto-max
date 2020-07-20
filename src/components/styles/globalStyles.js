import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: "Faster One";
		font-weight: 400;
		src: url("./src/components/styles/fonts/FasterOne-Regular.ttf");
	}
	
	@font-face {
		font-family: "PT Sans";
		font-style: italic;
		font-weight: 400;
		src: url("./src/components/styles/fonts/PTSans-Italic.ttf");
	}

	@font-face {
		font-family: "PT Sans";
		font-weight: 400;
		src: url("./src/components/styles/fonts/PTSans-Regular.ttf");
	}

	* {
		box-sizing: border-box; 
	}
	
	body {
		height: 100%;
		width: 100%;
		margin: 0 auto;
		padding: 0;

		/* To stop text highlight from cursor */
		user-select: none;


		/* font-family: Montserrat, sans-serif; */
		/* font-weight: 700; */
	}

	h1 {
		font-family: "PT Sans";
		font-style: italic;
		font-size: 2em;
	}

	h2 {
		font-family: "PT Sans";
		font-size: 1em;
	}

`;


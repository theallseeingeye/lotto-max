import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: "Merriweather";
		font-weight: 300;
		//font-style: light;
		src: url.("../fonts/merriweather-300.woff2") format("woff"),
	}

	@font-face {
		font-family: "Montserrat";
		font-weight: 700;
		//font-style: light;
		src: url.("../fonts/montserrat-700.woff2") format("woff"),
	}
	
	@font-face {
		font-family: "Montserrat";
		font-weight: 900;
		//font-style: light;
		src: url.("../fonts/montserrat-900.woff2") format("woff"),
	}
	
	* {
		box-sizing: border-box; 
	}
	
	body {
		height: 100%;
		width: 100%;
		margin: 0 auto;
		padding: 0;
		font-family: Montserrat, sans-serif;
		font-weight: 700;
		
	}
	h1 {
		font-family: Montserrat, sans-serif;
		font-weight: 900;
	}
	h2 {
		font-family: Monserrat, sans-serif;
		font-weight: 700;
	}
	h3 {
		font-family: Merriweather, serif;
		font-weight: 300;
	}
	p {
		font-family: Merriweather, serif;
		font-weight: 300;
	}
`;


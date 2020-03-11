import React from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import {ContextWrapper} from "./components/context/contextWrapper";
import {Main} from "./components/main";

const Container = styled.div`
	display: flex;
	margin: 0 auto;
	height: 100vh;
	flex-direction: column;
`;

export function App() {
	return (
		<Container>
			<Helmet>
				<title>What Are Your Chances?</title>
				<meta name="robots" content="none"/>
				<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0"/>
			</Helmet>
			<ContextWrapper>
				<Main/>
			</ContextWrapper>
		</Container>
	)
}
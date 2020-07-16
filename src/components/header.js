import React from 'react'
import styled from 'styled-components'
import lottoMax from '../../public/Lotto_Max_Logo.png'

const Container = styled.div`
	display: flex;
	justify-content:center;
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;	
`;

const SubTitle = styled.div`
	font-family: 'Faster One';
	font-size: 3em;
`;

export function Header() {
	return (
		<Container>			
			<div>
				<Title>
					<div>
						<img alt={'Lotto Max Logo'} src={lottoMax}/>
					</div>
					<SubTitle>
						SIMULATOR
					</SubTitle>
				</Title>

			</div>
		</Container>
	)
}
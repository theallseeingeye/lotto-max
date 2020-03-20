import React from 'react'
import lottoMax from '../../public/Lotto_Max_Logo.png'


export function Header() {


	return(
		<div>
			<h1>
				What Are Your Chances?
			</h1>
			Are You Feeling Lucky? <br/>

			Will you Win the LottoMax in Your Life Time? <br/>
			<img alt={'Lotto Max Logo'} src={lottoMax}/>
		</div>
	)
}
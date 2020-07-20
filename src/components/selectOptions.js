import React, {useContext} from 'react';
import {OptionsContext} from "./context/optionsProvider";
import styled from 'styled-components';
import tombstone from '../svg/tombstone.svg';
import baby from '../svg/baby.svg';
import {GenderToggle} from './GenderToggle';
import {AgeImg} from './ageImg';
import arrow from '../svg/arrow.svg';
import add from '../svg/add.svg';
import subtract from '../svg/subtract.svg';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Instructions = styled.h2`
	text-align: center;	
`;

const Motto = styled.h1`
	padding-top: 3em;
	text-align: center;
`;

const AgeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const AgeType = styled.div`
	font-family: "PT Sans";
	padding-top: 10px;
`;

const AgeInput = styled.input`
	text-align: center;
	border: solid black;
	border-radius: 5px;
	width: 20%;
	font-weight: bold;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const PlaysTitle = styled.div`
	padding-top: 20px;
`;

const Tombstone = styled.img`
	height: 60%;
	z-index: -2;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Stacked = styled.div`
	position: relative;
	width: 200px;
	height: 150px;
	display: flex;
`;

const AgeFlex = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 2em;
	justify-content: center;
`;

const StartAgeImg = styled.img`
	max-width: 100px;
	height: 100%;
	z-index: -2;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);	
`;

const Years = styled.div`
	padding: 5px;
	width: 15%;
	/* text-align: center; */
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
`;

const Arrow = styled.img`
	width: 100%;
`;

const StackedArrow = styled.div`
	position: relative;
	width: 100%;
`;

const AgeDiff = styled.div`
	position: absolute;
	font-family: "PT Sans";
	font-size: 0.8em;
	border: solid black;
	background-color: white;
	padding: 1px;
	padding-left: 2px;
	padding-right: 2px;
	width: fit-content;
	border-radius: 5px;
	top: 47%;
	left: 40%;
	transform: translate(-50%, -50%);	
`;

const UpDown = styled.img`
	width: 50px;
	padding: 5px;
`;

export function SelectOptions() {
	const {
		startAge,
		setStartAge,
		setDelay,
		setPlaysPerMonth,
		playsPerMonth,
		setEndAge,
		endAge,
		gender,
	} = useContext(OptionsContext);

	function startAgeBeforeEnd() {
		if (startAge >= endAge) {
			return parseInt(startAge) + 1
		} else {
			return endAge;
		}
	}

	/* // To set the life expectancy of the person's age. */
	
	return(
		<Container>
			<Motto>
				What Are Your Chances?
			</Motto>
			<Instructions>
				Are you feeling lucky that you will win the <i>Lotto Max</i> in your life time? <br/>
				Please select your options and press <i>GO</i> to see if you do! <br/>
			</Instructions>
			<AgeFlex>
				<AgeContainer>
					<div onClick={() => setStartAge(current => current + 1)}>
						<UpDown src={add}/>
					</div>
					<Stacked>
						<AgeImg age={startAge} sex={gender}/>
						<AgeInput
							value={startAge}
							onChange={(e) => setStartAge(e.target.value)}
						/>
					</Stacked>
					<div onClick={() => setStartAge(current => current - 1)}>
						<UpDown src={subtract}/>
					</div>
					<AgeType>
						Current Age
					</AgeType>
				</AgeContainer>
				<Years>
					<StackedArrow>
						<Arrow src={arrow}/>
						<AgeDiff>
							{endAge - startAge} Years
						</AgeDiff>
					</StackedArrow>
					<GenderToggle/>
				</Years>
				<AgeContainer>
					<div onClick={() => setEndAge(current => current + 1)}>
						<UpDown src={add}/>
					</div>
					<Stacked>
						<Tombstone src={tombstone}/>
						<AgeInput
							value={endAge}
							onChange={(e) => setEndAge(e.target.value)}
						/>
					</Stacked>
					<div onClick={() => setEndAge(current => current - 1)}>
						<UpDown src={subtract}/>
					</div>
					<AgeType>
						Life Expectancy
					</AgeType>
				</AgeContainer>
			</AgeFlex>
			<div>
				<PlaysTitle>
					{playsPerMonth} Plays per Month
				</PlaysTitle>
				<input type='range' min="1" max='8' defaultValue={8} onChange={(e) => setPlaysPerMonth(e.target.value)}/>
				<div>
					Delay
				</div>
				<input type='range' min="1" max='2000' defaultValue={8} onChange={(e) => setDelay(e.target.value)}/>
			</div>
		</Container>
	)
}
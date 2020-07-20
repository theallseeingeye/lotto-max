import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {OptionsContext} from "./context/optionsProvider";

const Container = styled.div`
    position: relative;
    height: 25px;
    width: 65px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const ButtonBackground = styled.div`
    border: solid black;
    border-radius: 20px;
    border-width: 1.8px;
    position: absolute;
    z-index: -2;
    width: 100%;
    height: 100%;
`;

const InnerLeft = styled.div`
    border-width: 2px;
    border-radius: 20px 0px 0px 20px;
    position: absolute;
    width: 50%;
    height: 100%;

    /* Center text */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Circle = styled.div`
    border: solid black;
    border-width: 2px;
    border-radius: 25px 25px 25px 25px;
    width: 50%;
    height: 95%;
    position: absolute;
    /* Use this value to toggle either side. Use transition over. */
    right: ${props => props.buttonSide ? 1 : 0}; 
`;

const InnerRight = styled(InnerLeft)`
    border-radius: 0px 20px 20px 0px;
    right: 0;
`;

const FemaleSymbol = styled.svg`
    height: 15px;
    fill: ${props => props.buttonSide ? 'black' : '#FE00AE'}; 
`;

const MaleSymbol = styled.svg`
    height: 14px;
    fill: ${props => props.buttonSide ? '#01A1FF' : 'black'}; 
`;

export function GenderToggle() {
	const {updateGender} = useContext(OptionsContext);
    const [buttonLeft, setButtonLeft] = useState(true);

    useEffect(() => {
        // Male button is on the left.
        if (buttonLeft) {
            updateGender('male')
        } else {
            updateGender('female')
        }
    }, [buttonLeft])

    function handleClick(e) {
        e.preventDefault();
        return setButtonLeft(prev => !prev);
    }

    return (
        <Container onClick={handleClick}>
            <ButtonBackground/>
            <Circle buttonSide={buttonLeft}/>                
            <InnerLeft>
                <MaleSymbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.51 117.56" buttonSide={buttonLeft}>
                    <path fill="fffff" d="M117.37,15.25s1-8.23-2.63-12.44S103.88.36,103.88.36H70.77c-2.8,0-6.3,5.78-6.3,11s6.83,8.23,6.83,8.23H84.61L68,36.75A44,44,0,1,0,81.38,50.49l16.9-16.67s-.53,10.86-.53,12.09,2.8,6.48,10.86,6.74,8.9-8.14,8.9-8.14ZM44.93,98A24.44,24.44,0,1,1,69.37,73.59,24.44,24.44,0,0,1,44.93,98Z"/>
                </MaleSymbol>
            </InnerLeft>
            <InnerRight>
                <FemaleSymbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.17 141.02" buttonSide={buttonLeft}>
                    <path d="M89.17,44.58A44.59,44.59,0,1,0,34.34,88v18.37H27.68c-6.66,0-11.56,3-11.39,10.86S26.1,126,26.1,126h8.24v8.93S35.91,141,44.67,141,54,134.89,54,134.89V126H64.12S72,123.15,72,116s-8.41-9.63-8.41-9.63H54V88.17A44.59,44.59,0,0,0,89.17,44.58Zm-68.5,0a24,24,0,1,1,24,24A24,24,0,0,1,20.67,44.58Z"/>
                </FemaleSymbol>
            </InnerRight>
        </Container>
    )
}
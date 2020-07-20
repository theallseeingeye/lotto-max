import React from 'react';
import styled from 'styled-components';
import baby from '../svg/baby.svg';
import female1 from '../svg/female-1.svg';
import female2 from '../svg/female-2.svg';
import female3 from '../svg/female-3.svg';
import female4 from '../svg/female-4.svg';
import female5 from '../svg/female-5.svg';
import female6 from '../svg/female-6.svg';
import female7 from '../svg/female-7.svg';
import male1 from '../svg/male-1.svg';
import male2 from '../svg/male-2.svg';
import male3 from '../svg/male-3.svg';
import male4 from '../svg/male-4.svg';
import male5 from '../svg/male-5.svg';
import male6 from '../svg/male-6.svg';
import male7 from '../svg/male-7.svg';

const Image = styled.img`
	max-width: 100px;
	max-height: 100%;
	z-index: -2;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);	
`;



export function AgeImg({age, sex}) {

    function ImageChoose() {
        if (age < 1) {
            return baby;
        } else if (age >= 1 && age < 5) {
            return sex === 'male' ? male1 : female1;
        } else if (age >= 5 && age < 18) {
            return sex === 'male' ? male2 : female2;
        } else if (age >= 18 && age < 26) {
            return sex === 'male' ? male3 : female3;
        } else if (age >= 26 && age < 40) {
            return sex === 'male' ? male4 : female4;
        } else if (age >= 40 && age < 50) {
            return sex === 'male' ? male5 : female5;
        } else if (age >= 50 && age < 70) {
            return sex === 'male' ? male6 : female6;
        } else if (age >= 70) {
            return sex === 'male' ? male7 : female7;
        }
    }

    return (
        <div>
            <Image src={ImageChoose()}/>
        </div>
    )
}
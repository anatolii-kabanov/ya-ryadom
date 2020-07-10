import * as React from 'react';
import './rating.input.scss';
import { Div } from '@vkontakte/vkui';
import StarInput from './star.input';

interface RatingProps {
    totalStars?: number,
}

const RatingInput: React.FC<RatingProps> = ({ totalStars }) => {


    return (
        <Div className="rating">
            {Array.from({ length: totalStars || 0 }, (v, k) => {
                return <StarInput key={k}></StarInput>
            })}
        </Div >
    );
}

RatingInput.defaultProps = {
    totalStars: 5
}

export default RatingInput;
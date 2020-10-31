import * as React from 'react';
import './rating.input.scss';
import { Div } from '@vkontakte/vkui';
import StarInput from './star.input';

interface RatingProps {
	totalStars: number | 5;
	onRatingSelected?: (rating: number) => void;
}

interface State {
	selectedStar: number;
}

class RatingInput extends React.PureComponent<RatingProps, State> {
	constructor(props: RatingProps) {
		super(props);
		this.state = {} as State;
		this.onStarClicked = this.onStarClicked.bind(this);
	}

	onStarClicked(rating: number) {
		const { onRatingSelected, totalStars } = this.props;
		onRatingSelected && totalStars && onRatingSelected(rating);
		this.setState({ selectedStar: rating });
	}

	render() {
		const { totalStars } = this.props;
		const { selectedStar } = this.state;
		return (
			<Div className='rating'>
				{Array.from({ length: totalStars || 0 }, (v, k) => {
					const index = totalStars - k;
					return (
						<StarInput
							selected={selectedStar === index}
							key={index}
							rating={index}
							onClick={this.onStarClicked}
						></StarInput>
					);
				})}
			</Div>
		);
	}
}

export default RatingInput;

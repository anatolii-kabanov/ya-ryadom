import './review.form.scss';
import React from 'react';
import {
    FormLayout,
    Button,
    Textarea,
    FormStatus,
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import RatingInput from '../inputs/rating.input';
import { ReviewModel } from '../../store/reviews/models';

interface PropsFromState {
    onSave: (userReview: ReviewModel) => void;
}

interface PropsFromDispatch {

}


type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    text: string;
    rating: number;
    errors: any;
}

class ReviewForm extends React.Component<AllProps, State> {

    /**
     *
     */
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRatingSelected = this.handleRatingSelected.bind(this);
        this.onSubmitClicked = this.onSubmitClicked.bind(this);
        this.state = {
            text: '',
            rating: 0,
            errors: null
        }
    }

    componentDidMount() {

    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            text: event.target.value
        })
    }

    handleRatingSelected = (rating: number) => {
        this.setState({
            rating: rating
        });
    }

    onSubmitClicked() {
        const { onSave } = this.props;
        if (!this.isValid()) return;
        const { text, rating } = this.state;
        onSave({ text, rating });
    }

    isValid() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.text || this.state.text.length === 0) {
            formIsValid = false;
            errors['text'] = "Напишите как все прошло";
        } else if (this.state.text.length > 64) {
            formIsValid = false;
            errors['text'] = "Максимум 64 символа";
        }

        if (!this.state.rating || this.state.rating === 0) {
            formIsValid = false;
            errors['rating'] = "Поставьте свою оценку";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        const { errors } = this.state;
        return (
            <FormLayout>
                <RatingInput totalStars={5} onRatingSelected={this.handleRatingSelected}></RatingInput>
                {errors?.rating && <FormStatus mode="error">
                    {errors.rating}
                </FormStatus>}
                <Textarea
                    top="Комментарий"
                    placeholder="Введите текст"
                    onChange={this.handleInputChange}
                    status={errors?.text ? 'error' : 'default'}
                    bottom={errors?.text}
                ></Textarea>
                <Button className="btn-primary" size="xl" onClick={this.onSubmitClicked}>Готово</Button>
            </FormLayout>
        )
    }
}


const mapStateToProps = ({ }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewForm);

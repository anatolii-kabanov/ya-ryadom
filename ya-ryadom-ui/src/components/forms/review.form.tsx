import './review.form.scss';
import React from 'react';
import {
    FormLayout,
    Button,
    Textarea,
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import RatingInput from '../inputs/rating.input';
import { Validators } from '../../utils/validation/validators';

interface PropsFromState {
    onSave: (userReview: any) => void;
}

interface PropsFromDispatch {

}


type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    text: string;
}

class ReviewForm extends React.Component<AllProps, State> {

    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    componentDidMount() {
    }

    handleInputChange = event => {
        event.preventDefault()
        this.setState({
            text: event.target.value
        })
    }

    onSubmitClicked() {

    }

    render() {
        const { text } = this.state;

        return (
            <FormLayout>
                <RatingInput totalStars={5}></RatingInput>
                <Textarea
                    top="Комментарий"
                    placeholder="Введите текст"
                    onChange={this.handleInputChange}
                // status={text ? 'valid' : 'error'}
                // bottom={Validators.required(text)}
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

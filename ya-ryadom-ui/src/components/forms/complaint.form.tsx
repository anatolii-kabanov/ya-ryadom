import './complaint.form.scss';
import React from 'react';
import {
    FormLayout,
    Button,
    Textarea
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { Validators } from '../../utils/validation/validators';

interface OwnProps {
    onSave: () => void;
}

interface PropsFromState {

}

interface PropsFromDispatch {

}


type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {
    text: string;
    errors: any | null;
}

const maxValues = {
    maxText: 255,
}

class ComplaintsForm extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            text: '',
            errors: null
        };
    }

    onSave = (data) => {
        if (!this.isValid()) return;
        const { onSave } = this.props;
        onSave();
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        this.setState({
            text: value
        });
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: Validators.required(value) || Validators.maxLength(value, maxValues.maxText)
            }
        });
    }

    isValid() {
        let errors = {};
        let formIsValid = true;
        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        const { errors, text } = this.state;
        return (
            <FormLayout>
                <Textarea
                    minLength={0}
                    maxLength={maxValues.maxText}
                    top={<span className="flex-between">Описание <span>{maxValues.maxText - text.length}</span></span>}
                    placeholder="Введите текст"
                    onChange={this.handleInputChange}
                    status={errors?.text ? 'error' : 'default'}
                    bottom={errors?.text}
                ></Textarea>
                <Button className="btn-primary" size="xl" onClick={this.onSave}>Отправить</Button>
            </FormLayout>
        )
    }
}

const mapStateToProps = ({ }: AppState, ownProps: OwnProps) => ({
    onSave: ownProps.onSave,
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplaintsForm);

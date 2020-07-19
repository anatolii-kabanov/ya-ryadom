import './about-myself.form.scss';
import React from 'react';
import {
    FormLayout,
    Button,
    Title,
    Div,
    Group,
    Input,
    Textarea
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';

interface PropsFromState {
    onSave: (text: string) => void;
    btnText?: string;
    aboutMySelf: string;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    aboutMyself: string;
    errors: any | null;
}


const maxValues = {
    maxAboutMyself: 84,
}

class AboutMyselfForm extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            aboutMyself: props.aboutMySelf,
            errors: null
        }
        this.onClickNext = this.onClickNext.bind(this);
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            aboutMyself: event.target.value
        })
    }

    onClickNext = () => {
        if (!this.isValid()) return;
        const { onSave } = this.props;
        onSave(this.state.aboutMyself);
    }

    isValid() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.aboutMyself || this.state.aboutMyself.length === 0) {
            formIsValid = false;
            errors['aboutMyself'] = "Напишите о себе";
        } else if (this.state.aboutMyself.length > 64) {
            formIsValid = false;
            errors['aboutMyself'] = "Максимум 64 символа";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        const { btnText } = this.props;
        const { errors, aboutMyself } = this.state;
        return (
            <Group>
                <Group className="about-myself-group">
                    <Div className="themes-form">
                        <Div><Title level="3" weight="bold" className="title text-center">Напишите о себе</Title ></Div>
                        <FormLayout>
                            <Textarea
                                minLength={1}
                                maxLength={64}
                                placeholder="Введите текст"
                                name="aboutMyself"
                                top={<span className="flex-between">О себе<span>{maxValues.maxAboutMyself - aboutMyself.length}</span></span>} 
                                value={aboutMyself}
                                onChange={this.handleInputChange}
                                status={errors?.aboutMyself ? 'error' : 'default'}
                                bottom={errors?.aboutMyself}
                            ></Textarea>
                        </FormLayout>
                    </Div>
                </Group>
                <Group>
                    <Div className="btn-container-bottom">
                        <Button className="btn-primary" size="xl" onClick={this.onClickNext}>{btnText ?? 'Далее'}</Button>
                    </Div>
                </Group>
            </Group>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({
    aboutMySelf: authentication.currentUser?.aboutMySelf
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutMyselfForm);

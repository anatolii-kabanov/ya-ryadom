import './profile.form.scss';
import React from 'react';
import {
    FormLayout,
    Input,
    Button,
    Title,
    Div
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';

interface PropsFromState {

}

interface PropsFromDispatch {

}


type AllProps = PropsFromState & PropsFromDispatch;

class ProfileForm extends React.Component<AllProps>  {

    constructor(props) {
        super(props);
        this.onFillInProfile = this.onFillInProfile.bind(this)
    }

    onFillInProfile = (data) => {

    }

    handleInputChange = event => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        return (
            <FormLayout className="profile-form">
                <Title level="3" weight="bold">Выберите темы</Title >
                <Input top="Тема" type="text" placeholder="Введите текст" name="eventName" onChange={this.handleInputChange} />
                <Div className="btn-container">
                    <Button className="btn-primary" size="xl" onClick={this.onFillInProfile}>Продолжить</Button>
                </Div>
            </FormLayout>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileForm);

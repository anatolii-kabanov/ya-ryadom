import './profile.form.scss';
import React from 'react';
import {
    FormLayout,
    Input,
    Textarea,
    Button,
    Div,
    Text
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
            <FormLayout>
                <Text weight="medium">Text medium</Text>
                <Input top="Тема" type="text" placeholder="Введите текст" name="eventName" onChange={this.handleInputChange} />
                <Button className="btn-primary" size="xl" onClick={this.onFillInProfile}>Продолжить</Button>
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

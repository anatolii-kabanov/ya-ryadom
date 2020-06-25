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
import { ALL_THEMES } from '../../utils/constants/theme.constants';

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

    renderThemePills() {
        const themes = ALL_THEMES;
        if (themes) {
            return themes
                .map((item, key) => {
                    return <div key={key}>{item.name}</div>
                });
        }
    }

    render() {

        return (
            <FormLayout className="profile-form">
                <Title level="3" weight="bold">Выберите темы</Title >
                {this.renderThemePills()}
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

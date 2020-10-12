import React from 'react';
import {
    Panel,
    Group,
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import ThemesForm from '../../forms/themes.form';
import { saveUserProfileThemes } from '../../../store/authentication/actions';
import MainHeaderPanel from "../headers/main.header";

interface OwnProps {
    id: string
}

interface PropsFromState {
}

interface PropsFromDispatch {
    save: typeof saveUserProfileThemes
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class MyProfileEditThemesPanel extends React.Component<AllProps>  {

    constructor(props) {
        super(props);
        this.onIntroCompleted = this.onIntroCompleted.bind(this)
    }

    componentDidMount() {

    }

    onIntroCompleted() {

    }

    render() {
        const { id, save } = this.props;
        return (
            <Panel id={id} className="profile-themes-panel">
                <MainHeaderPanel />
                <Group className="profile-group">
                    <ThemesForm onSave={save} btnText={'Сохранить'}></ThemesForm>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState, ownProps: OwnProps) => ({
    id: ownProps.id
})

const mapDispatchToProps: PropsFromDispatch = {
    save: saveUserProfileThemes
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfileEditThemesPanel);

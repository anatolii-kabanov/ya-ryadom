import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { UserInfo } from '@vkontakte/vk-bridge';
import ThemesForm from '../../forms/themes.form';
import { saveUserProfileThemes } from '../../../store/authentication/actions';

interface PropsFromState {
    id: string,
    vkUserInfo: UserInfo,
}

interface PropsFromDispatch {
    save: typeof saveUserProfileThemes
}

type AllProps = PropsFromState & PropsFromDispatch;

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
                <PanelHeader>
                </PanelHeader>
                <Group className="profile-group">
                    <ThemesForm onSave={save}></ThemesForm>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    save: saveUserProfileThemes
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfileEditThemesPanel);

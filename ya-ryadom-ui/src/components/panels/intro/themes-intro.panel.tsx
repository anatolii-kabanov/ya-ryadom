import './themes-intro.panel.scss';
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
import { saveUserIntroThemes } from '../../../store/authentication/actions';

interface PropsFromState {
    id: string,
    vkUserInfo: UserInfo,
}

interface PropsFromDispatch {
    save: typeof saveUserIntroThemes
}

type AllProps = PropsFromState & PropsFromDispatch;

class ThemesIntroPanel extends React.Component<AllProps>  {

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
            <Panel id={id} className="profile-intro-panel">
                <PanelHeader>
                    Я рядом
                </PanelHeader>
                <Group className="profile-group">
                    <ThemesForm onSave={save}></ThemesForm>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    save: saveUserIntroThemes
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemesIntroPanel);

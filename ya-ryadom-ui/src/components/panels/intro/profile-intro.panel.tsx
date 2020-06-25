import './profile-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Div,
    Button
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { goForward } from '../../../store/history/actions';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/constants/view.constants';
import { PANELS } from '../../../utils/constants/panel.constants';
import { UserInfo } from '@vkontakte/vk-bridge';

interface PropsFromState {
    id: string,
    vkUserInfo: UserInfo,
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
}

type AllProps = PropsFromState & PropsFromDispatch;

class ProfileIntroPanel extends React.Component<AllProps>  {

    constructor(props) {
        super(props);
        this.onIntroCompleted = this.onIntroCompleted.bind(this)
    }

    componentDidMount() {
        
    }

    onIntroCompleted() {
        const { goForwardView } = this.props;
        goForwardView(new VkHistoryModel(VIEWS.MY_PROFILE_VIEW, PANELS.CREATE_EVENT_PANEL));
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="profile-intro-panel">
                <PanelHeader>
                    Я рядом
                </PanelHeader>
                <Group className="profile-group">

                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({
    
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileIntroPanel);

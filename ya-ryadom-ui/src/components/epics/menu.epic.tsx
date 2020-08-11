import React from 'react';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28User from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon28Users from '@vkontakte/icons/dist/28/users_outline';
import { Epic, TabbarItem, Tabbar } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { VkHistoryModel } from '../../store/history/models';
import { VIEWS } from '../../utils/constants/view.constants';
import { goForward } from '../../store/history/actions';
import Icon28Add from '@vkontakte/icons/dist/28/add_square_outline';
import { TABS } from '../../utils/constants/tab.constants';

interface OwnProps {
    activeStory: string;
    children: React.ReactNode;
}

interface PropsFromState {
    activeView: string;
    activePanel: string;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class MenuEpic extends React.Component<AllProps>  {
    render() {
        const { activeView, activePanel, activeStory, goForwardView } = this.props;
        return (
            <Epic activeStory={activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_PANEL, TABS.EVENTS_MAP))}
                        selected={activeView === VIEWS.EVENTS_NEAR_ME_VIEW && activePanel !== PANELS.CREATE_EVENT_PANEL}
                        data-story={VIEWS.EVENTS_NEAR_ME_VIEW}
                    ><Icon28Place className={activeView === VIEWS.EVENTS_NEAR_ME_VIEW && activePanel !== PANELS.CREATE_EVENT_PANEL ? 'nav-icon-selected' : 'nav-icon'} /></TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.MY_EVENT_CREATE_VIEW, PANELS.CREATE_EVENT_PANEL))}
                        selected={activeView === VIEWS.MY_EVENT_CREATE_VIEW && activePanel === PANELS.CREATE_EVENT_PANEL}
                        data-story={VIEWS.MY_EVENT_CREATE_VIEW}
                    ><Icon28Add className={activeView === VIEWS.MY_EVENT_CREATE_VIEW && activePanel === PANELS.CREATE_EVENT_PANEL ? 'nav-icon-selected' : 'nav-icon'} /></TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.APPLICATIONS_VIEW, PANELS.APPLICATIONS_PANEL))}
                        selected={activeView === VIEWS.APPLICATIONS_VIEW}
                        data-story={VIEWS.APPLICATIONS_VIEW}
                    ><Icon28Users className={activeView === VIEWS.APPLICATIONS_VIEW ? 'nav-icon-selected' : 'nav-icon'} /></TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.MY_PROFILE_VIEW, PANELS.MY_PROFILE_PANEL))}
                        selected={activeView === VIEWS.MY_PROFILE_VIEW}
                        data-story={VIEWS.MY_PROFILE_VIEW}
                    ><Icon28User className={activeView === VIEWS.MY_PROFILE_VIEW ? 'nav-icon-selected' : 'nav-icon'} /></TabbarItem>
                </Tabbar>
            }>
                {this.props.children}
            </Epic>
        )
    }
}

const mapStateToProps = ({ history }: AppState, ownProps: OwnProps) => ({
    activeView: history.currentViewPanel.view,
    activePanel: history.currentViewPanel.panel,
    activeStory: ownProps.activeStory,
    children: ownProps.children
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuEpic);

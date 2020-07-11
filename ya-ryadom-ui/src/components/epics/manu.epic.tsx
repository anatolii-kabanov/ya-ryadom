import React from 'react';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28User from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon28Catalog from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28Review from '@vkontakte/icons/dist/28/article_outline';
import { Epic, TabbarItem, Tabbar } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { VkHistoryModel } from '../../store/history/models';
import { VIEWS } from '../../utils/constants/view.constants';
import { goForward } from '../../store/history/actions';
import Icon28Add from '@vkontakte/icons/dist/28/add_square_outline';

interface PropsFromState {
    activeView: string;
    activePanel: string;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
}


type AllProps = PropsFromState & PropsFromDispatch;

class MenuEpic extends React.Component<AllProps>  {
    render() {
        const { activeView, activePanel, goForwardView } = this.props;
        return (
            <Epic activeStory={activeView} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_MAP_PANEL))}
                        selected={activeView === VIEWS.EVENTS_NEAR_ME_VIEW && activePanel !== PANELS.CREATE_EVENT_PANEL}
                        data-story={VIEWS.EVENTS_NEAR_ME_VIEW}
                    ><Icon28Place className={activeView === VIEWS.EVENTS_NEAR_ME_VIEW && activePanel !== PANELS.CREATE_EVENT_PANEL ? 'nav-icon-selected' : 'nav-icon'} /></TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.REVIEWS_VIEW, PANELS.REVIEWS_PANEL))}
                        selected={activeView === VIEWS.REVIEWS_VIEW}
                        data-story={VIEWS.REVIEWS_VIEW}
                    ><Icon28Review className={activeView === VIEWS.REVIEWS_VIEW ? 'nav-icon-selected' : 'nav-icon'} /></TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.CREATE_EVENT_PANEL))}
                        selected={activeView === VIEWS.EVENTS_NEAR_ME_VIEW && activePanel === PANELS.CREATE_EVENT_PANEL}
                    ><Icon28Add className={activeView === VIEWS.EVENTS_NEAR_ME_VIEW && activePanel === PANELS.CREATE_EVENT_PANEL ? 'nav-icon-selected' : 'nav-icon'}></Icon28Add>
                    </TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.APPLICATIONS_VIEW, PANELS.APPLICATIONS_TO_ME_PANEL))}
                        selected={activeView === VIEWS.APPLICATIONS_VIEW}
                        data-story={VIEWS.APPLICATIONS_VIEW}
                    ><Icon28Catalog className={activeView === VIEWS.APPLICATIONS_VIEW ? 'nav-icon-selected' : 'nav-icon'} /></TabbarItem>
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

const mapStateToProps = ({ history }: AppState) => ({
    activeView: history.currentViewPanel.view,
    activePanel: history.currentViewPanel.panel
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuEpic);

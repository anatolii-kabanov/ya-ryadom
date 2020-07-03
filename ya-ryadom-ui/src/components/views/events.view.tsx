import React from 'react';
import { View, Div, Tabbar, Epic, TabbarItem } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { PANELS } from '../../utils/constants/panel.constants';
import { fetchListRequest } from "../../store/events/events-near-me/actions";
import EventsNearMeMapPanel from "../panels/events/events-near-me-map.panel";
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28Menu from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon28Catalog from '@vkontakte/icons/dist/28/newsfeed_outline';
import { goForward } from '../../store/history/actions';
import { VkHistoryModel } from '../../store/history/models';
import { VIEWS } from '../../utils/constants/view.constants';
import EventsNearMeListPanel from '../panels/events/events-near-me-list.panel';

interface PropsFromState {
    id: string;
    activePanel: string;
}

interface PropsFromDispatch {
    fetchList: typeof fetchListRequest,
    goForwardView: typeof goForward,
}

type AllProps = PropsFromState & PropsFromDispatch;

class EventsView extends React.Component<AllProps>  {

    public componentDidMount() {
        
    }

    render() {
        const { id, activePanel, goForwardView } = this.props;
        return (
            <Div><Epic activeStory={activePanel} tabbar={
                <Tabbar>
                     <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_LIST_PANEL))}
                        selected={activePanel === PANELS.EVENTS_NEAR_ME_LIST_PANEL}
                        data-story={PANELS.EVENTS_NEAR_ME_LIST_PANEL}
                    ><Icon28Catalog className={activePanel === PANELS.EVENTS_NEAR_ME_LIST_PANEL ? 'nav-icon-selected' : 'nav-icon'}/></TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_MAP_PANEL))}
                        selected={activePanel === PANELS.EVENTS_NEAR_ME_MAP_PANEL}
                        data-story={PANELS.EVENTS_NEAR_ME_MAP_PANEL}
                    ><Icon28Place className={activePanel === PANELS.EVENTS_NEAR_ME_MAP_PANEL ? 'nav-icon-selected' : 'nav-icon'}/></TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.MAIN_VIEW, PANELS.MENU_PANEL))}
                        selected={activePanel === PANELS.MENU_PANEL}
                        data-story={PANELS.MENU_PANEL}
                    ><Icon28Menu className={activePanel === PANELS.MENU_PANEL ? 'nav-icon-selected' : 'nav-icon'}/></TabbarItem>
                </Tabbar>
            }></Epic>
            <View id={id} activePanel={activePanel}>
                <EventsNearMeMapPanel id={PANELS.EVENTS_NEAR_ME_MAP_PANEL}>
                </EventsNearMeMapPanel>
                <EventsNearMeListPanel id={PANELS.EVENTS_NEAR_ME_LIST_PANEL}>
                </EventsNearMeListPanel>
            </View>
            </Div >
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activePanel: history.currentViewPanel.panel
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchList: fetchListRequest,
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsView);

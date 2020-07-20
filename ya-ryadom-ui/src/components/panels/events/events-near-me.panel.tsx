import './events-near-me.panel.scss';
import React from 'react';
import {
    Panel, IS_PLATFORM_ANDROID, FixedLayout, Group
} from '@vkontakte/vkui';
import { AppState } from '../../../store/app-state';
import { connect } from 'react-redux';
import MainHeaderPanel from '../headers/main.header';
import EventsTabs from '../../tabs/events.tabs';
import EventsNearMeListTabPage from '../../tab-pages/events-near-me-list.tab-page';
import EventsNearMeMapTabPage from '../../tab-pages/events-near-me-map.tab-page';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import Icon28Filter from '@vkontakte/icons/dist/28/sliders_outline';
import { TABS } from '../../../utils/constants/tab.constants';

interface PropsFromState {
    id: string;
    activeTab: string;
    openFilter: () => void;
}

interface PropsFromDispatch {
}
type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    
}

class EventsNearMePanel extends React.Component<AllProps, State>  {
    render() {
        const { id, activeTab, openFilter } = this.props;

        return (
            <Panel id={id} className="events-near-me-panel">
                <MainHeaderPanel leftButton={
                    IS_PLATFORM_ANDROID
                        ? <Icon24Filter className="nav-icon-selected filter" onClick={openFilter}></Icon24Filter>
                        : <Icon28Filter className="nav-icon-selected filter" onClick={openFilter}></Icon28Filter>
                } text={"События"}>
                </MainHeaderPanel>
                <Group separator="show">
                    <EventsTabs></EventsTabs>
                </Group>
                {activeTab === TABS.EVENTS_LIST && <EventsNearMeListTabPage></EventsNearMeListTabPage>}
                {activeTab === TABS.EVENTS_MAP && <EventsNearMeMapTabPage></EventsNearMeMapTabPage>}

            </Panel >
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activeTab: history.currentViewPanel.tab
})

const mapDispatchToProps: PropsFromDispatch = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsNearMePanel);

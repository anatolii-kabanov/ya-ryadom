import React from 'react';
import { View, Div, Tabs, TabsItem, FixedLayout, Separator } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { PANELS } from '../../utils/constants/panel.constants';
import EventsNearMeMapPanel from "../panels/events/events-near-me-map.panel";
import EventsNearMeListPanel from '../panels/events/events-near-me-list.panel';
import MyEventCreatePanel from '../panels/my-event-create.panel';
import MenuEpic from '../epics/manu.epic';

interface PropsFromState {
    id: string;
    activePanel: string;
    popout: any;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

class EventsView extends React.Component<AllProps>  {

    public componentDidMount() {

    }

    render() {
        const { id, activePanel, popout } = this.props;
        return (
            <View id={id} activePanel={activePanel} popout={popout}>
                <EventsNearMeMapPanel id={PANELS.EVENTS_NEAR_ME_MAP_PANEL}>
                </EventsNearMeMapPanel>
                <EventsNearMeListPanel id={PANELS.EVENTS_NEAR_ME_LIST_PANEL}>
                </EventsNearMeListPanel>
            </View>
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activePanel: history.currentViewPanel.panel
})

const mapDispatchToProps: PropsFromDispatch = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsView);

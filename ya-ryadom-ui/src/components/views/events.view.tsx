import React from 'react';
import { View } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { PANELS } from '../../utils/constants/panel.constants';
import EventsNearMeMapPanel from "../panels/events/events-near-me.panel";
import EventsFilterModal from '../modals/events-filter.modal';
import { MODALS } from '../../utils/constants/modal.constants';
import debounce from 'lodash/debounce';
import { EventsFilter } from '../../store/ui/settings/state';
import { UserInfo } from '@vkontakte/vk-bridge';
import { fetchListRequest } from '../../store/events/events-near-me/actions';
import { Geo } from '../../store/authentication/models';
import { Position } from '../../store/authentication/models';

interface PropsFromState {
    id: string;
    activePanel: string;
    popout: any;
    filter: EventsFilter;
    userPosition: Geo;
    vkUserInfo: UserInfo;
    lastLocation: Position;
}

interface PropsFromDispatch {
    fetchList: typeof fetchListRequest,
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    activeModal: string | null; // VK modal use null to hide it
}

class EventsView extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            activeModal: null
        };
        this.openFilter = this.openFilter.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    public componentDidMount() {

    }

    updateEvents = debounce((e: any) => {
        const { fetchList, vkUserInfo, filter } = this.props;
        fetchList({
            "userId": 0,
            vkUserId: vkUserInfo?.id,
            latitude: this.getLatitude(),
            longitude: this.getLongitude(),
            maxDistance: filter.radius,
            searchText: filter.text,
        })
    }, 100);

    getLatitude = () => {
        const { userPosition, lastLocation, filter } = this.props;
        if (filter.selectedPosition) {
            return filter.selectedPosition.latitude
        }
        return userPosition?.lat ?? lastLocation?.latitude;
    }

    getLongitude = () => {
        const { userPosition, lastLocation, filter } = this.props;
        if (filter.selectedPosition) {
            return filter.selectedPosition.longitude
        }
        return userPosition?.long ?? lastLocation?.longitude;
    }

    openFilter() {
        this.setState({ activeModal: MODALS.EVENTS_FILTER })
    }

    onClose(updateEvents?: boolean) {
        updateEvents && this.updateEvents();
        this.setState({ activeModal: null });
    }

    render() {
        const { id, activePanel, popout } = this.props;
        return (
            <View id={id} activePanel={activePanel} popout={popout} modal={
                <EventsFilterModal activeModal={this.state.activeModal} onClose={this.onClose} dynamicContentHeight></EventsFilterModal>
            }>
                <EventsNearMeMapPanel openFilter={this.openFilter} id={PANELS.EVENTS_NEAR_ME_PANEL}>
                </EventsNearMeMapPanel>
            </View>
        )
    }
}

const mapStateToProps = ({ history, authentication, ui }: AppState) => ({
    activePanel: history.currentViewPanel.panel,
    userPosition: authentication.geoData,
    lastLocation: authentication.currentUser?.lastLocation,
    vkUserInfo: authentication.vkUserInfo,
    filter: ui.settings.eventsFilter
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchList: fetchListRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsView);

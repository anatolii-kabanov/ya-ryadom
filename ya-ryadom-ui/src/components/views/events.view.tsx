import React from 'react';
import { View, ModalRoot } from '@vkontakte/vkui';
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
import ComplaintModal from '../modals/complaint.modal';

interface OwnProps {
    id: string;
    popout?: any;
}

interface PropsFromState {
    activePanel: string;
    filter: EventsFilter;
    userPosition: Geo;
    vkUserInfo: UserInfo | null;
    lastLocation: Position;
}

interface PropsFromDispatch {
    fetchList: typeof fetchListRequest,
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

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
        this.updateEvents({});
    }

    updateEvents = debounce((e: any) => {
        const { fetchList, vkUserInfo, filter } = this.props;
        fetchList({
            vkUserId: vkUserInfo?.id,
            latitude: this.getLatitude(),
            longitude: this.getLongitude(),
            maxDistance: filter.radius,
            searchText: filter.text,
            theme: filter.selectedTheme
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
        updateEvents && this.updateEvents({});
        this.setState({ activeModal: null });
    }

    render() {
        const { id, activePanel, popout } = this.props;
        return (
            <View id={id} activePanel={activePanel} popout={popout} modal={
                <ModalRoot activeModal={this.state.activeModal} onClose={() => this.onClose()}>
                    <EventsFilterModal onClose={this.onClose} />
                    <ComplaintModal />
                </ModalRoot>
            }>
                <EventsNearMeMapPanel openFilter={this.openFilter} id={PANELS.EVENTS_NEAR_ME_PANEL} />
            </View>
        )
    }
}

const mapStateToProps = ({ history, authentication, ui }: AppState, ownProps: OwnProps) => ({
    activePanel: history.currentViewPanel.panel,
    userPosition: authentication.geoData,
    lastLocation: authentication.currentUser?.lastLocation,
    vkUserInfo: authentication.vkUserInfo,
    filter: ui.settings.eventsFilter,
    id: ownProps.id,
    popout: ownProps.popout
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchList: fetchListRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsView);

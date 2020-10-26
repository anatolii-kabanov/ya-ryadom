import React from 'react';
import { View, ActionSheet, ActionSheetItem, IOS, IS_PLATFORM_ANDROID } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { PANELS } from '../../utils/constants/panel.constants';
import EventsNearMeMapPanel from "../panels/events/events-near-me.panel";
import SelectedEventPanel from "../panels/events/selected-event.panel";
import { MODALS } from '../../utils/constants/modal.constants';
import debounce from 'lodash/debounce';
import { EventsFilter } from '../../store/ui/settings/state';
import { UserInfo } from '@vkontakte/vk-bridge';
import { fetchListRequest } from '../../store/events/events-near-me/actions';
import { Geo } from '../../store/authentication/models';
import { Position } from '../../store/authentication/models';
import { EventsModalRoot } from '../modals/events.modal.root';
import { setActiveModal } from '../../store/history/actions';
import { openEventComplaintForm } from '../../store/complaints/actions';

interface OwnProps {
    id: string;
    popout?: React.ReactNode;
}

interface PropsFromState {
    activePanel: string;
    activeModal: string | null;
    filter: EventsFilter;
    userPosition: Geo | null;
    vkUserInfo: UserInfo | null;
    lastLocation?: Position | null;
}

interface PropsFromDispatch {
    fetchList: typeof fetchListRequest,
    setActiveModal: typeof setActiveModal,
    openEventComplaintForm: typeof openEventComplaintForm
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {
    popout: any;
}

class EventsView extends React.Component<AllProps, State>  {

    constructor(props: AllProps) {
        super(props);
        this.state = {
            popout: null
        };
        this.openFilter = this.openFilter.bind(this);
        this.onCloseFilter = this.onCloseFilter.bind(this);
        this.openComplaintForm = this.openComplaintForm.bind(this);
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
        const { setActiveModal } = this.props;
        setActiveModal(MODALS.EVENTS_FILTER);
    }

    openComplaintForm(eventId: number) {
        const { openEventComplaintForm } = this.props;
        openEventComplaintForm(eventId);
    }

    onCloseFilter(updateEvents?: boolean) {
        updateEvents && this.updateEvents({});
        const { setActiveModal } = this.props;
        setActiveModal(null);
    }

    openPopout = (eventId: number) => {
        this.setState({
            popout: <ActionSheet onClose={() => this.setState({ popout: null })}>
                <ActionSheetItem autoclose onClick={() => this.openComplaintForm(eventId)}>
                    Пожаловаться
                </ActionSheetItem>
                {!IS_PLATFORM_ANDROID && <ActionSheetItem autoclose mode="cancel">Назад</ActionSheetItem>}
            </ActionSheet>
        });
    }

    render() {
        const { id, activePanel, activeModal, setActiveModal, popout } = this.props;
        return (
            <View id={id} activePanel={activePanel} popout={popout || this.state.popout} modal={
                <EventsModalRoot activeModal={activeModal}
                    onClose={() => setActiveModal(null)}
                    onCloseFilter={this.onCloseFilter} />
            }>
                <EventsNearMeMapPanel
                    openPopout={this.openPopout} openFilter={this.openFilter} id={PANELS.EVENTS_NEAR_ME_PANEL} />
                <SelectedEventPanel openPopout={this.openPopout} id={PANELS.SELECTED_EVENT_PANEL}/>
            </View>
        )
    }
}

const mapStateToProps = ({ history, authentication, ui }: AppState, ownProps: OwnProps) => ({
    activePanel: history.currentViewPanel.panel,
    activeModal: history.currentModal,
    userPosition: authentication.geoData,
    lastLocation: authentication.currentUser?.lastLocation,
    vkUserInfo: authentication.vkUserInfo,
    filter: ui.settings.eventsFilter,
    id: ownProps.id,
    popout: ownProps.popout
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchList: fetchListRequest,
    setActiveModal: setActiveModal,
    openEventComplaintForm: openEventComplaintForm
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsView);

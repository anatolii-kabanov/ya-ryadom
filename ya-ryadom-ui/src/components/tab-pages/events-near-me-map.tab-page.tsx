import './events-near-me-map.tab-page.scss';
import React from 'react';
import {
    Group,
    Div,
    CardGrid,
    Card,
    RichCell,
    Avatar,
    Button,
    Header
} from '@vkontakte/vkui';
import { AppState } from './../../store/app-state';
import { connect } from 'react-redux';
import GoogleMapReact, { Maps } from 'google-map-react';
import Marker from './../map/marker';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import { MAP } from './../../utils/constants/map.constants';
import { Geo } from './../../store/authentication/models';
import { goForward, openUserProfile } from "./../../store/history/actions";
import {
    fetchListRequest, setCurrentVkId
} from "../../store/events/events-near-me/actions";
import { EventNearMe } from "../../store/events/events-near-me/models";
import { UserInfo } from '@vkontakte/vk-bridge';
import { Position } from '../../store/authentication/models';

import { ApplicationStatus } from '../../utils/enums/application-status.enum';
import { applyToEventFromEvents } from '../../store/applications/actions';
import debounce from 'lodash/debounce';
import UserMarker from '../map/user-marker';
import { EventsFilter } from '../../store/ui/settings/state';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import { VkHistoryModel } from "../../store/history/models";
import { VIEWS } from "../../utils/constants/view.constants";
import { PANELS } from "../../utils/constants/panel.constants";
import { dateOptions } from '../../utils/constants/event-date-options.constant';
import { ApplicationStatusString } from '../../utils/constants/application-status-string.constant';

interface PropsFromState {
    id: string;
    events: EventNearMe[];
    userPosition: Geo;
    vkUserInfo: UserInfo;
    lastLocation: Position;
    filter: EventsFilter
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
    fetchList: typeof fetchListRequest,
    applyToEvent: typeof applyToEventFromEvents,
    setCurrentVkId: typeof setCurrentVkId,
    openUserProfile: typeof openUserProfile
}
type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    eventOnMap: any;
}

const createMapOptions = (maps: Maps) => {
    return {
        ...maps,
        mapTypeControl: true
    };
}

class EventsNearMeMapTabPage extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            eventOnMap: null,
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    private renderEvents() {
        const { events } = this.props;
        if (events && Object.keys(events).length !== 0) {
            return events
                .map((item, key) => {
                    return <Marker
                        status={item.applicationStatus}
                        selected={this.state.eventOnMap?.id === item.id}
                        key={key}
                        lat={item.latitude}
                        lng={item.longitude}
                        text={item.title}
                        onClick={() => this.onMarkerClick(item)} />
                });
        }
    }

    componentDidMount() {

    }

    componentWillMount() {
        // if opened by sharable event link
        if (window.location.hash) {
            this.setState({
                eventOnMap: {
                    id: Number(window.location.hash.slice(1))
                }
                // don't be angry :D I'll rewrite later
            }, () => window.location.hash = '');

        }
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

    onMarkerClick(event: any) {
        this.setState({
            eventOnMap: event
        })
    }

    getLatitude = () => {
        const { userPosition, lastLocation, filter } = this.props;
        if (filter.selectedPosition) {
            return filter.selectedPosition.latitude;
        }
        return userPosition?.lat ?? lastLocation?.latitude;
    }

    getLongitude = () => {
        const { userPosition, lastLocation, filter } = this.props;
        if (filter.selectedPosition) {
            return filter.selectedPosition.longitude;
        }
        return userPosition?.long ?? lastLocation?.longitude;
    }

    apply(eventId: number) {
        const { applyToEvent } = this.props;
        applyToEvent(eventId);
    }

    render() {
        const { events, openUserProfile } = this.props;
        let eventOnMap;
        let selectedEvent = events.find((e) => e.id === this.state.eventOnMap?.id)
        if (selectedEvent) {
            eventOnMap = <Div className="card-container">
                <CardGrid>
                    <Card size="l">
                        <div className="cell-container">
                            <Group header={<Header mode="secondary">{ALL_THEMES.find(m => m.id === selectedEvent?.themeType)?.name}</Header>}>
                                <RichCell
                                    disabled
                                    multiline
                                    before={<Avatar
                                        onClick={() => openUserProfile(selectedEvent?.vkUserOwnerId || 0)}
                                        size={48} src={selectedEvent?.vkUserAvatarUrl} />}
                                    text={selectedEvent?.description}
                                    caption={`${new Date(selectedEvent?.date).toLocaleDateString('ru-RU', dateOptions)} в ${selectedEvent?.time}`}
                                >
                                    <span>{selectedEvent?.userFullName} <span className="distance">{selectedEvent?.distance && (selectedEvent?.distance / 1000).toFixed(2)} км</span></span>
                                </RichCell>

                                <Icon24Dismiss
                                    className="close-cross"
                                    onClick={() => this.setState({ eventOnMap: null })} />

                                <Div className="map-card-buttons-div">
                                    {selectedEvent?.applicationStatus === ApplicationStatus.none
                                        ? <Button className="button-primary" onClick={() => this.apply(selectedEvent?.id || 0)}>Иду</Button>
                                        : <Button className="button-primary btn-status disabled" disabled={true}>{ApplicationStatusString[selectedEvent?.applicationStatus]}</Button>}
                                    <Button className="btn-secondary"
                                        onClick={() => openUserProfile(selectedEvent?.vkUserOwnerId || 0)}
                                    >Профиль</Button>
                                </Div>
                            </Group>
                        </div>
                    </Card>
                </CardGrid>
            </Div>
        }
        return (
            <Group separator="hide" className="events-near-me-map">
                <Group separator="hide">
                    {/* <Div> from VKUI mess it up for some reason*/}
                    <div className="map">
                        <GoogleMapReact

                            bootstrapURLKeys={{ key: MAP.KEY }}
                            center={{
                                lat: this.getLatitude(),
                                lng: this.getLongitude(),
                            }}
                            defaultCenter={{
                                lat: this.getLatitude(),
                                lng: this.getLongitude(),
                            }}
                            defaultZoom={14}
                            distanceToMouse={(pt, m) => 0}
                        >
                            <UserMarker lat={this.getLatitude()} lng={this.getLongitude()}></UserMarker>
                            {this.renderEvents()}
                        </GoogleMapReact>
                    </div>
                </Group>
                {selectedEvent && eventOnMap}
            </Group>
        )
    }
}

const mapStateToProps = ({ events, authentication, ui }: AppState) => ({
    events: events.eventsNearMe.eventsList,
    userPosition: authentication.geoData,
    lastLocation: authentication.currentUser?.lastLocation,
    vkUserInfo: authentication.vkUserInfo,
    filter: ui.settings.eventsFilter
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
    fetchList: fetchListRequest,
    applyToEvent: applyToEventFromEvents,
    setCurrentVkId: setCurrentVkId,
    openUserProfile: openUserProfile
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsNearMeMapTabPage);

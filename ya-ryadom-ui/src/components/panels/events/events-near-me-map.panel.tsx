import React from 'react';
import {
    Panel,
    Group,
    FormLayout,
    Input,
    Div,
    CardGrid,
    Card, RichCell, Avatar, Button, InfoRow, Slider
} from '@vkontakte/vkui';
import { AppState } from '../../../store/app-state';
import { connect } from 'react-redux';
import GoogleMapReact, { Maps } from 'google-map-react';
import Marker from '../../map/marker';
import MainHeaderPanel from '../headers/main.header';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import { MAP } from '../../../utils/constants/map.constants';
import { Geo } from '../../../store/authentication/models';
import { goForward } from "../../../store/history/actions";
import {
    fetchListRequest
} from "../../../store/events/events-near-me/actions";
import { EventNearMe } from "../../../store/events/events-near-me/models";
import { UserInfo } from '@vkontakte/vk-bridge';
import { Position } from '../../../store/authentication/models';

import './events-near-me.scss';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { applyToEventRequest } from '../../../store/applications/actions';
import debounce from 'lodash/debounce';
import UserMarker from '../../map/user-marker';
import EventsTab from './../../tabs/events.tab';

interface PropsFromState {
    id: string;
    events: EventNearMe[];
    userPosition: Geo;
    vkUserInfo: UserInfo;
    lastLocation: Position;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
    fetchList: typeof fetchListRequest,
    applyToEvent: typeof applyToEventRequest
}
type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    personOnMap: any;
    searchText: string;
    radius: number;
}

const createMapOptions = (maps: Maps) => {
    return {
        ...maps,
        mapTypeControl: true
    };
}

class EventsNearMeMapPanel extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            personOnMap: null,
            searchText: "",
            radius: 10,
        }
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    private renderEvents() {
        const { events } = this.props;
        if (events && Object.keys(events).length !== 0) {
            return events
                .map((item, key) => {
                    return <Marker key={key} lat={item.latitude} lng={item.longitude} text={item.title} onClick={() => this.onMarkerClick(item)} />
                });
        }
    }

    componentDidMount() {
        this.updateEvents();
    }

    updateEvents = debounce((e: any) => {
        const { fetchList, vkUserInfo } = this.props;
        fetchList({
            "userId": 0,
            vkUserId: vkUserInfo.id,
            latitude: this.getLatitude(),
            longitude: this.getLongitude(),
            maxDistance: this.state.radius,
            searchText: this.state.searchText,
        })
    }, 100);

    onMarkerClick(person: object) {
        this.setState({
            personOnMap: person
        })
    }

    onSearch(event) {
        this.setState({ searchText: event.target.value });
        this.updateEvents();
    }

    getLatitude = () => {
        const { userPosition, lastLocation } = this.props;
        return userPosition?.lat ?? lastLocation?.latitude;
    }

    getLongitude = () => {
        const { userPosition, lastLocation } = this.props;
        return userPosition?.long ?? lastLocation?.longitude;
    }

    apply(eventId: number) {
        const { applyToEvent } = this.props;
        applyToEvent(eventId);
    }

    onRadiusChanged(radius: number) {
        this.setState({ radius });
        this.updateEvents();
    }

    private renderApplicationStatus(status: ApplicationStatus) {
        switch (status) {
            case ApplicationStatus.sent:
                return 'Отправлено';
            case ApplicationStatus.confirmed:
                return 'Подтверждено';
            case ApplicationStatus.rejected:
                return 'Отклонено';
            default:
                return '';
        }
    }

    render() {
        const { id } = this.props;

        let personOnMap;
        if (this.state.personOnMap) {
            personOnMap = <Div className="card-container">
                <CardGrid>
                    <Card size="l">
                        <div className="cell-container">
                            <RichCell
                                before={<Avatar size={48} src={this.state.personOnMap?.vkUserAvatarUrl} />}
                                text={this.state.personOnMap?.title}
                                caption={this.state.personOnMap?.description}
                            >
                                {this.state.personOnMap?.userFullName}
                                <InfoRow header="Расстояние">
                                    {this.state.personOnMap?.distance && (this.state.personOnMap?.distance / 1000).toFixed(2)} км
                                </InfoRow>
                            </RichCell>

                            <Icon24Dismiss
                                className="close-cross"
                                onClick={() => this.setState({ personOnMap: null })} />

                            <Div className="map-card-buttons-div">
                                {this.state.personOnMap.applicationStatus === ApplicationStatus.none
                                    ? <Button className="button-primary" onClick={() => this.apply(this.state.personOnMap.id)}>Иду</Button>
                                    : <Button className="button-primary" disabled={true}>{this.renderApplicationStatus(this.state.personOnMap.applicationStatus)}</Button>}
                                <Button className="button-secondary"
                                    href={`https://vk.com/id${this.state.personOnMap.vkUserOwnerId}`}
                                    onClick={() => window.open("https://vk.com/id" + this.state.personOnMap.vkUserOwnerId, '_blank')}
                                >Посмотреть профиль</Button>
                            </Div>
                        </div>
                    </Card>
                </CardGrid>
            </Div>
        }
        return (
            <Panel id={id}>
                <MainHeaderPanel text={"Карта"}>
                    <EventsTab></EventsTab>
                </MainHeaderPanel>
                <FormLayout>
                    <Input type="text" placeholder="Поиск по интересам" name="Search" onKeyDown={(event) => this.onSearch(event)}></Input>
                    <Slider
                        min={1}
                        max={100}
                        step={0.5}
                        value={this.state.radius}
                        onChange={radius => this.onRadiusChanged(radius)}
                        top="Радиус"
                    />
                    <Div>
                        {this.state.radius}  км
                    </Div>
                </FormLayout>
                <Group>
                    {/* <Div> from VKUI mess it up for some reason*/}
                    <div className="map">
                        <GoogleMapReact

                            bootstrapURLKeys={{ key: MAP.KEY }}
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

                {this.state.personOnMap && personOnMap}

            </Panel >
        )
    }
}

const mapStateToProps = ({ events, authentication }: AppState) => ({
    events: events.eventsNearMe.eventsList,
    userPosition: authentication.geoData,
    lastLocation: authentication.currentUser?.lastLocation,
    vkUserInfo: authentication.vkUserInfo,
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
    fetchList: fetchListRequest,
    applyToEvent: applyToEventRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsNearMeMapPanel);

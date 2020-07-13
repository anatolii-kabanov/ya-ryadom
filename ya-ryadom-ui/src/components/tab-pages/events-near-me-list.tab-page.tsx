import React from 'react';
import { Group, RichCell, Button, Avatar, Div, CardGrid, Card, FormLayout, Input, InfoRow, Slider, List } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { fetchListRequest } from '../../store/events/events-near-me/actions';
import { EventNearMe } from '../../store/events/events-near-me/models';
import { Geo } from '../../store/authentication/models';
import { applyToEventRequest } from '../../store/applications/actions';
import { Position } from '../../store/authentication/models';
import { UserInfo } from '@vkontakte/vk-bridge';
import { ApplicationStatus } from '../../utils/enums/application-status.enum';
import debounce from 'lodash/debounce';

interface PropsFromState {
    id: string;
    eventsList: EventNearMe[];
    userPosition: Geo;
    lastLocation: Position;
    vkUserInfo: UserInfo;
}

interface PropsFromDispatch {
    fetchList: typeof fetchListRequest,
    applyToEvent: typeof applyToEventRequest
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    radius: number;
    searchText: string;
}

class EventsNearMeListTabPage extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            radius: 10,
            searchText: "",
        }
    }

    componentDidMount() {
        this.updateEvents();
    }

    onSearch(event) {
        this.setState({ searchText: event.target.value });
        this.updateEvents();
    }

    updateEvents = debounce((e: any) => {
        const { fetchList, vkUserInfo } = this.props;
        fetchList({
            "userId": 0,
            vkUserId: vkUserInfo?.id,
            latitude: this.getLatitude(),
            longitude: this.getLongitude(),
            maxDistance: this.state.radius,
            searchText: this.state.searchText,
        })
    }, 100);

    onRadiusChanged(radius: number) {
        this.setState({ radius });
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

    private renderEvents() {
        const { eventsList } = this.props;
        if (eventsList) {
            return eventsList
                .map((item, key) => {
                    return <div key={key}>
                        <Div>
                            <CardGrid>
                                <Card size="l">
                                    <div style={{ height: 180 }}>
                                        <RichCell
                                            before={<Avatar size={48} src={item.vkUserAvatarUrl} />}
                                            text={item?.title}
                                            caption={item?.description}
                                        >
                                            {item?.userFullName}
                                            <InfoRow header="Расстояние">
                                                {item?.distance && (item?.distance / 1000).toFixed(2)} км.
                                            </InfoRow>
                                        </RichCell>
                                        <Div className="map-card-buttons-div">
                                            {item.applicationStatus === ApplicationStatus.none
                                                ? <Button className="button-primary" onClick={() => this.apply(item.id)}>Иду</Button>
                                                : <Button className="button-primary" disabled={true}>{this.renderApplicationStatus(item.applicationStatus)}</Button>}
                                            <Button className="button-secondary width-50 text-center"
                                                href={`https://vk.com/id${item?.vkUserOwnerId}`}
                                                onClick={() => window.open("https://vk.com/id" + item?.vkUserOwnerId, '_blank')}
                                            >Посмотреть профиль</Button>
                                        </Div>
                                    </div>
                                </Card>
                            </CardGrid>
                        </Div>
                    </div>
                });
        }
    }

    render() {
        return (
            <Group separator="hide">
                {this.renderEvents()}
            </Group>
        )
    }
}

const mapStateToProps = ({ events, authentication }: AppState) => ({
    eventsList: events.eventsNearMe.eventsList,
    userPosition: authentication.geoData,
    lastLocation: authentication.currentUser?.lastLocation,
    vkUserInfo: authentication.vkUserInfo,
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchList: fetchListRequest,
    applyToEvent: applyToEventRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsNearMeListTabPage);
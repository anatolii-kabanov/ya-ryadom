import React from 'react';
import { Panel, Group, RichCell, Button, Avatar, Div, CardGrid, Card, FormLayout, Input, InfoRow, Slider, } from '@vkontakte/vkui';
import { AppState } from '../../../store/app-state';
import { connect } from 'react-redux';
import MainHeaderPanel from '../headers/main.header';
import { fetchListRequest } from '../../../store/events/events-near-me/actions';
import { EventNearMe } from '../../../store/events/events-near-me/models';
import { Geo } from '../../../store/authentication/models';
import { applyToEventRequest } from '../../../store/applications/actions';
import { Position } from '../../../store/authentication/models';

interface PropsFromState {
    id: string;
    eventsList: EventNearMe[];
    userPosition: Geo;
    lastLocation: Position;
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

class EventsNearMeListPanel extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            radius: 10,
            searchText: "",
        }
    }

    componentDidMount() {
        const { fetchList } = this.props
        fetchList({
            "userId": 0,
            "vkUserId": 6476088,
            latitude: this.getLatitude(),
            longitude: this.getLongitude(),
            "maxDistance": this.state.radius,
            "searchText": '',
        })
    }

    onSearch(event) {
        if (event.key === 'Enter') {
            const { fetchList } = this.props;
            this.setState({ searchText: event.target.value });
            fetchList({
                "userId": 0,
                vkUserId: 6476088,
                latitude: this.getLatitude(),
                longitude: this.getLongitude(),
                maxDistance: this.state.radius,
                searchText: event.target.value
            });
        }
    }

    onRadiusChanged(radius: number) {
        const { fetchList } = this.props;
        this.setState({ radius });
        fetchList({
            "userId": 0,
            vkUserId: 6476088,
            latitude: this.getLatitude(),
            longitude: this.getLongitude(),
            maxDistance: this.state.radius,
            searchText: this.state.searchText,
        })
    }

    getLatitude = () => {
        const { userPosition, lastLocation } = this.props;
        return userPosition?.lat ?? lastLocation.latitude;
    }

    getLongitude = () => {
        const { userPosition, lastLocation } = this.props;
        return userPosition?.long ?? lastLocation.longitude;
    }

    apply(eventId: number) {
        const { applyToEvent } = this.props;
        applyToEvent(eventId);
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
                                            <Button className="button-primary" onClick={() => this.apply(item.id)}>Иду</Button>
                                            <Button className="button-secondary"
                                                href={`https://vk.com/id${item?.vkUserOwnerId}`}
                                                onClick={() => window.open("https://vk.com/id" + item?.vkUserOwnerId, '_blank')}
                                            >Посмотреть профить</Button>
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
        const { id } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text={"Каталог"}></MainHeaderPanel>
                <FormLayout>
                    <Input type="text" placeholder="Поиск по интересам" name="Search" onKeyDown={(event) => this.onSearch(event)}></Input>
                    <Slider
                        min={1}
                        max={250}
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
                    {this.renderEvents()}
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ events, authentication }: AppState) => ({
    eventsList: events.eventsNearMe.eventsList,
    userPosition: authentication.geoData,
    lastLocation: authentication.currentUser?.lastLocation,
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchList: fetchListRequest,
    applyToEvent: applyToEventRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsNearMeListPanel);
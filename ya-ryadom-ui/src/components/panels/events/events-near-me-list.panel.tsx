import React from 'react';
import { Panel, Group, RichCell, Button, Avatar, Div, CardGrid, Card, FormLayout, Input, InfoRow, } from '@vkontakte/vkui';
import { AppState } from '../../../store/app-state';
import { connect } from 'react-redux';
import MainHeaderPanel from '../headers/main.header';
import { fetchListRequest } from '../../../store/events/events-near-me/actions';
import { EventNearMe } from '../../../store/events/events-near-me/models';
import { Geo } from '../../../store/authentication/models';

interface PropsFromState {
    id: string;
    eventsList: EventNearMe[];
    userPosition: Geo;
}

interface PropsFromDispatch {
    fetchList: typeof fetchListRequest
}
type AllProps = PropsFromState & PropsFromDispatch;

class EventsNearMeListPanel extends React.Component<AllProps>  {

    componentDidMount() {
        const { fetchList, userPosition } = this.props
        fetchList({
            "userId": 0,
            "vkUserId": 6476088,
            "latitude": userPosition?.lat,
            "longitude": userPosition?.long,
            "maxDistance": 2500000000,
            "searchText": '',
        })
    }

    onSearch(event) {
        if (event.key === 'Enter') {
            const { fetchList, userPosition } = this.props
            fetchList({
                "userId": 0,
                "vkUserId": 6476088,
                "latitude": userPosition?.lat,
                "longitude": userPosition?.long,
                "maxDistance": 2500000000,
                "searchText": event.target.value
            })
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
                                        <Button href={`https://vk.com/id${item?.vkUserOwnerId}`}  onClick={() => window.open("https://vk.com/id" + item?.vkUserOwnerId, '_blank')}  className="btn-primary" style={{ marginTop: "20px" }}>Страница ВКонтакте</Button>
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
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchList: fetchListRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsNearMeListPanel);
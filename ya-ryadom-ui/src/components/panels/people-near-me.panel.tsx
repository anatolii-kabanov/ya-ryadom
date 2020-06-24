import React from 'react';
import {
    Panel,
    Group,
    FormLayout,
    Input,
    Div,
    CardGrid,
    Card, RichCell, Avatar, Button, InfoRow
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Marker from '../map/marker';
import MainHeaderPanel from './headers/main.header';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import { MAP } from '../../utils/constants/map.constants';
import { Geo } from '../../store/authentication/models';
import { goForward } from "../../store/history/actions";
import {
    fetchListRequest,
    setCurrentPerson
} from "../../store/people-near-me/actions";
import { EventNearMe } from "../../store/people-near-me/models";
import { UserInfo } from '@vkontakte/vk-bridge';


interface PropsFromState {
    id: string;
    people: EventNearMe[];
    userPosition: Geo;
    vkUserInfo: UserInfo;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward
    setCurrentPerson: typeof setCurrentPerson
    fetchListRequest: typeof fetchListRequest
}
type AllProps = PropsFromState & PropsFromDispatch;

class PeopleNearMePanel extends React.Component<AllProps>  {

    state = {
        personOnMap: null as any
    }

    constructor(props) {
        super(props);
        this.state = {
            personOnMap: null as any
        }
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    private renderEvents() {
        const { people } = this.props;
        if (people && Object.keys(people).length !== 0) {
            return people
                .map((item, key) => {
                    return <Marker key={key} lat={item.latitude} lng={item.longitude} text={item.title} onClick={() => this.onMarkerClick(item)} />
                });
        }
    }

    componentDidMount() {
        const { fetchListRequest, userPosition } = this.props
        fetchListRequest({
            "userId": 0,
            "vkUserId": 6476088,
            "latitude": userPosition?.lat,
            "longitude": userPosition?.long,
            "maxDistance": 2500000000,
            "searchText": '',
        })
    }

    onMarkerClick(person: object) {
        this.setState({
            personOnMap: person
        })
    }

    onSearch(event) {
        if (event.key === 'Enter') {
            const { fetchListRequest, userPosition } = this.props
            fetchListRequest({
                "userId": 0,
                "vkUserId": 6476088,
                "latitude": userPosition?.lat,
                "longitude": userPosition?.long,
                "maxDistance": 2500000000,
                "searchText": event.target.value
            })
        }
    }

    render() {
        const { id, userPosition } = this.props;
        let mapHeight = this.state.personOnMap ? { height: "40vh" } : { height: "70vh" }

        let personOnMap;
        if (this.state.personOnMap) {
            personOnMap = <Div>
                <CardGrid>
                    <Card size="l">
                        <div style={{ height: 200 }}>
                            <RichCell
                                before={<Avatar size={48} src={this.state.personOnMap?.vkUserAvatarUrl} />}
                                text={this.state.personOnMap?.title}
                                caption={this.state.personOnMap?.description}
                            >
                                {this.state.personOnMap?.userFullName}
                                <InfoRow header="Расстояние">
                                    {this.state.personOnMap?.distance && (this.state.personOnMap?.distance / 1000).toFixed(2)} км.
                                </InfoRow>
                            </RichCell>
                            <Icon24Dismiss style={{ position: 'absolute', top: "10px", right: "10px" }} onClick={() => this.setState({ personOnMap: null })}></Icon24Dismiss>
                            <Button href={`https://vk.com/id${this.state.personOnMap.vkUserOwnerId}`} onClick={() => window.open("https://vk.com/id" + this.state.personOnMap.vkUserOwnerId, '_blank')} className="btn-primary" style={{ marginTop: "20px" }}>Страница ВКонтакте</Button>
                        </div>
                    </Card>
                </CardGrid>
            </Div>
        }
        return (
            <Panel id={id}>
                <MainHeaderPanel text={"Карта"}></MainHeaderPanel>
                <FormLayout>
                    <Input type="text" placeholder="Поиск по интересам" name="Search" onKeyDown={(event) => this.onSearch(event)}></Input>
                </FormLayout>
                <Group>
                    <div style={{ ...mapHeight, width: "100%" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: MAP.KEY }}
                            defaultCenter={{
                                lat: userPosition?.lat ?? 33,
                                lng: userPosition?.long ?? 33,
                            }}
                            defaultZoom={14}
                            distanceToMouse={(pt, m) => 0}
                        >
                            {this.renderEvents()}
                        </GoogleMapReact>
                    </div>
                </Group>

                {this.state.personOnMap && personOnMap}

            </Panel >
        )
    }
}

const mapStateToProps = ({ peopleNearMe, authentication }: AppState) => ({
    people: peopleNearMe.peopleList,
    userPosition: authentication.geoData,
    vkUserInfo: authentication.vkUserInfo
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
    setCurrentPerson: setCurrentPerson,
    fetchListRequest: fetchListRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleNearMePanel);

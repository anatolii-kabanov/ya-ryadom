import './event.form.scss';
import React from 'react';
import {
    FormLayout,
    Input,
    Textarea,
    Button,
    Div
} from '@vkontakte/vkui';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import Marker from '../map/marker';
import { MAP } from '../../utils/constants/map.constants';
import { Geo } from '../../store/authentication/models';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { UserInfo } from "@vkontakte/vk-bridge";
import { saveMyEventRequest } from '../../store/events/my-events/actions';

interface PropsFromState {
    userPosition: Geo,
    vkUserInfo: UserInfo
}

interface PropsFromDispatch {
    save: typeof saveMyEventRequest,
}


type AllProps = PropsFromState & PropsFromDispatch;

interface EventState {
    zoom: number,
    selectedPosition: {
        lat: number,
        lng: number
    },
    eventName: string,
    eventDescription: string,
    eventDate: string,
    eventTime: string,
}

class EventForm extends React.Component<AllProps, EventState> {


    constructor(props) {
        super(props);
        this.state = {
            zoom: 16,
            selectedPosition: {} as any,
            eventName: '',
            eventDescription: '',
            eventDate: '',
            eventTime: '',
        };
        this.onLocationClick = this.onLocationClick.bind(this);
        this.onFillInProfile = this.onFillInProfile.bind(this)
    }

    componentDidMount() {
    }

    onLocationClick = (clickEventValue: ClickEventValue) => {
        this.setState({ ...this.state, selectedPosition: { lat: clickEventValue.lat, lng: clickEventValue.lng } });
    }

    onFillInProfile = (data) => {
        this.props.save({
            title: this.state.eventName,
            longitude: this.state.selectedPosition.lng,
            latitude: this.state.selectedPosition.lat,
            date: new Date(),
            description: this.state.eventDescription,
            maxQuantiyty: 50,
            vkUserId: this.props.vkUserInfo.id,
        });
    }

    handleInputChange = event => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { selectedPosition } = this.state;
        const { userPosition } = this.props;
        return (
            <FormLayout>
                <Input top="Тема" type="text" placeholder="Введите текст" name="eventName" onChange={this.handleInputChange} />
                <Textarea top="Описание" placeholder="Введите текст" name="eventDescription" onChange={this.handleInputChange}></Textarea>
                <Input top="Дата встречи (не обязательно)" type="date" name="eventDate" onChange={this.handleInputChange} />
                <Input top="Время встречи (не обязательно)" type="time" name="eventTime" onChange={this.handleInputChange} />
                <Div style={{ height: '100vh', width: '92%', margin: '0 auto' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: MAP.KEY }}
                        center={{ lat: userPosition?.lat ?? 33, lng: userPosition?.long ?? 54 }}
                        defaultZoom={this.state.zoom}
                        onClick={this.onLocationClick}
                    >
                        {selectedPosition && <Marker lat={selectedPosition?.lat} lng={selectedPosition?.lng} text={"asd"} />}
                    </GoogleMapReact>
                </Div>
                <Button className="btn-primary" size="xl" onClick={this.onFillInProfile}>Создать</Button>
            </FormLayout>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({
    userPosition: authentication.geoData,
    vkUserInfo: authentication.vkUserInfo
})

const mapDispatchToProps: PropsFromDispatch = {
    save: saveMyEventRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventForm);

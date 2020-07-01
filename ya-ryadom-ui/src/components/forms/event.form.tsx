import './event.form.scss';
import React from 'react';
import {
    FormLayout,
    Input,
    Textarea,
    Button,
    Div,
    Select
} from '@vkontakte/vkui';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import Marker from '../map/marker';
import { MAP } from '../../utils/constants/map.constants';
import { Geo } from '../../store/authentication/models';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { UserInfo } from "@vkontakte/vk-bridge";
import { Position } from '../../store/authentication/models';
import { MyEventCreate } from '../../store/events/events-near-me/models';
import { ALL_THEMES } from '../../utils/constants/theme.constants';

interface PropsFromState {
    userPosition: Geo,
    vkUserInfo: UserInfo,
    lastLocation: Position,
    onSave: (myEvent: MyEventCreate) => void;
}

interface PropsFromDispatch {

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
    selectedTheme: number,
    [key: string]: any
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
            selectedTheme: 0
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
        const { onSave } = this.props;
        onSave({
            title: this.state.eventName,
            longitude: this.state.selectedPosition.lng,
            latitude: this.state.selectedPosition.lat,
            date: new Date(this.state.eventDate).toLocaleDateString('ru-RU', "dd.MM.yyyy" as any),
            time: this.state.eventTime,
            description: this.state.eventDescription,
            maxQuantiyty: 50,
            vkUserId: this.props.vkUserInfo.id,
            selectedThemes: [this.state.selectedTheme],
        });
    }

    handleInputChange = event => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
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

    renderThemesSelect() {
        const themes = ALL_THEMES;
        if (themes) {
            return themes
                .map((item, key) => {
                    return <option
                        key={key}
                        value={item.id}>
                        {item.name}
                    </option>
                });
        }
    }

    render() {
        const { selectedPosition } = this.state;

        return (
            <FormLayout>
                <Input top="Тема" type="text" placeholder="Введите текст" name="eventName" onChange={this.handleInputChange} />
                <Textarea top="Описание" placeholder="Введите текст" name="eventDescription" onChange={this.handleInputChange}></Textarea>
                <Select placeholder="Выберите тему" name="selectedTheme" onChange={this.handleInputChange}>
                    {this.renderThemesSelect()}
                </Select>
                <Input top="Дата встречи (не обязательно)" type="date" name="eventDate" onChange={this.handleInputChange} />
                <Input top="Время встречи (не обязательно)" type="time" name="eventTime" onChange={this.handleInputChange} />
                <Div style={{ height: '100vh', width: '92%', margin: '0 auto' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: MAP.KEY }}
                        center={{ lat: this.getLatitude(), lng: this.getLongitude() }}
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
    vkUserInfo: authentication.vkUserInfo,
    lastLocation: authentication.currentUser?.lastLocation,
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventForm);

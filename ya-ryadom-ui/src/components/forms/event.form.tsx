import './event.form.scss';
import React from 'react';
import {
    FormLayout,
    Input,
    Textarea,
    Button,
    Select,
    FormStatus,
} from '@vkontakte/vkui';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import Marker from '../map/marker';
import { MAP } from '../../utils/constants/map.constants';
import { Geo } from '../../store/authentication/models';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { UserInfo } from "@vkontakte/vk-bridge";
import { Position } from '../../store/authentication/models';
import { goForward } from "../../store/history/actions";
import isEmpty from "lodash/isEmpty";
import { MyEventCreate } from '../../store/events/events-near-me/models';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import AutocompleteMap from '../inputs/autocomplete-map.input';

interface PropsFromState {
    userPosition: Geo,
    vkUserInfo: UserInfo,
    lastLocation: Position,
    onSave: (myEvent: MyEventCreate) => void;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward
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

const maxValues = {
    maxDescription: 84,
    maxTitle: 20
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
            selectedTheme: 0,
            errors: {}
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
        if (!this.isValid()) return;

        if (isEmpty(this.state.selectedPosition)) {
            // TODO handle show error
            console.log('handle error')
        }
        else {
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
    }

    handleInputChange = event => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getLatitude = () => {
        const { userPosition, lastLocation } = this.props;
        return userPosition?.lat ?? lastLocation?.latitude;
    }

    getLongitude = () => {
        const { userPosition, lastLocation } = this.props;
        return userPosition?.long ?? lastLocation?.longitude;
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

    isValid() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.eventName || this.state.eventName.length === 0) {
            formIsValid = false;
            errors['eventName'] = "Обязательное поле";
        } else if (this.state.eventName.length > maxValues.maxTitle) {
            formIsValid = false;
            errors['eventName'] = `Максимум ${maxValues.maxTitle} символа`;
        }

        if (!this.state.eventDescription) {
            formIsValid = false;
            errors['eventDescription'] = "Обязательное поле";
        } else if (this.state.eventName.length > maxValues.maxDescription) {
            formIsValid = false;
            errors['eventDescription'] = `Максимум ${maxValues.maxDescription} символа`;
        }

        if (!this.state.selectedTheme) {
            formIsValid = false;
            errors['selectedTheme'] = "Обязательное поле";
        }

        if (!this.state.eventDate) {
            formIsValid = false;
            errors['eventDate'] = "Обязательное поле";
        } else {
            const currentDate = new Date();
            const selectedDate = new Date(this.state.eventDate);
            if (selectedDate < currentDate) {
                errors['eventDate'] = "Нельзя выбрать прошедшие даты";
            }
        }

        if (!this.state.eventTime) {
            formIsValid = false;
            errors['eventTime'] = "Обязательное поле";
        }

        if (!this.state.selectedPosition?.lat) {
            formIsValid = false;
            errors['selectedPosition'] = "Обязательное поле";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    onLocationChanged = (location: Position) => {
        console.log(location)
        if (location) {
            this.setState({
                selectedPosition: { lng: location.longitude, lat: location.latitude }
            });
        }
    }

    render() {
        const { selectedPosition, errors, eventDescription, eventName } = this.state;

        return (
            <FormLayout>
                <Input
                    maxLength={maxValues.maxTitle}
                    top={<span className="flex-between">Название <span>{maxValues.maxTitle - eventName.length}</span></span>}
                    type="text"
                    placeholder="Введите текст"
                    name="eventName"
                    onChange={this.handleInputChange}
                    status={errors.eventName ? 'error' : 'default'}
                    bottom={errors.eventName}
                />
                <Textarea
                    minLength={1}
                    maxLength={maxValues.maxDescription}
                    top={<span className="flex-between">Описание <span>{maxValues.maxDescription - eventDescription.length}</span></span>}
                    placeholder="Введите текст"
                    name="eventDescription"
                    onChange={this.handleInputChange}
                    status={errors.eventDescription ? 'error' : 'default'}
                    bottom={errors.eventDescription}
                ></Textarea>
                <Select status={errors.selectedTheme ? 'error' : 'default'} placeholder="Выберите тему" name="selectedTheme" onChange={this.handleInputChange} required>
                    {this.renderThemesSelect()}
                </Select>
                <Input
                    min={new Date().toISOString().split('T')[0]}
                    status={errors.eventDate ? 'error' : 'default'}
                    top="Дата встречи"
                    type="date"
                    name="eventDate"
                    bottom={errors.eventDate}
                    onChange={this.handleInputChange} required />
                <Input status={errors.eventTime ? 'error' : 'default'} top="Время встречи" type="time" name="eventTime" onChange={this.handleInputChange} required />
                <AutocompleteMap top="Место встречи" placeholder="Адрес" type="address" loadMaps={true} onLocationChanged={this.onLocationChanged}></AutocompleteMap>
                <div className="map">
                    <GoogleMapReact
                        yesIWantToUseGoogleMapApiInternals={true}
                        bootstrapURLKeys={{ key: MAP.KEY }}
                        center={{
                            lat: this.state.selectedPosition.lat ?? this.getLatitude(),
                            lng: this.state.selectedPosition.lng ?? this.getLongitude()
                        }}
                        defaultZoom={this.state.zoom}
                        defaultCenter={{
                            lat: this.getLatitude(), lng: this.getLongitude()
                        }}
                        onClick={this.onLocationClick}
                    >
                        {selectedPosition?.lat && <Marker lat={selectedPosition?.lat} lng={selectedPosition?.lng} />}
                    </GoogleMapReact>
                </div>
                {errors.selectedPosition && <FormStatus header="Выберите место встречи" mode="error">
                    Выберите место на карте или найдите место по адресу
                </FormStatus>}
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
    goForwardView: goForward
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventForm);

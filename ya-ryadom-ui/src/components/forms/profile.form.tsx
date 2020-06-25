import './profile.form.scss';
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

class EventForm extends React.Component<AllProps>  {

    state = {
        zoom: 0,
        selectedPostion: {
            lat: 0,
            lng: 0
        },
        eventName: '',
        eventDescription: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            zoom: 10,
            selectedPostion: {} as any,
            eventName: '',
            eventDescription: '',
        };
        this.onLocationClick = this.onLocationClick.bind(this);
        this.onFillInProfile = this.onFillInProfile.bind(this)
    }

    componentDidMount() {
    }

    onLocationClick = (clickEventValue: ClickEventValue) => {
        this.setState({ ...this.state, selectedPostion: { lat: clickEventValue.lat, lng: clickEventValue.lng } });
    }

    onFillInProfile = (data) => {
        this.props.save({
            title: this.state.eventName,
            longitude: this.state.selectedPostion.lng,
            latitude: this.state.selectedPostion.lat,
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
        const { selectedPostion } = this.state;
        const { userPosition } = this.props;
        return (
            <FormLayout>
                <Input top="Тема" type="text" placeholder="Введите текст" name="eventName" onChange={this.handleInputChange} />
                <Textarea top="Описание" placeholder="Введите текст" name="eventDescription" onChange={this.handleInputChange}></Textarea>
                <Div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: MAP.KEY }}
                        center={{ lat: userPosition?.lat ?? 33, lng: userPosition?.long ?? 54 }}
                        defaultZoom={this.state.zoom}
                        onClick={this.onLocationClick}
                    >
                        {selectedPostion && <Marker lat={selectedPostion?.lat} lng={selectedPostion?.lng} text={"asd"} />}
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

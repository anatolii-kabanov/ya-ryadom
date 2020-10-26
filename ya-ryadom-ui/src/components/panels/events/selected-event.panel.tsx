import './selected-event.panel.scss';
import React from 'react';
import {
    Avatar,
    Button,
    Div,
    Group,
    Panel,
    RichCell
} from '@vkontakte/vkui';
import { AppState } from '../../../store/app-state';
import { connect } from 'react-redux';
import MainHeaderPanel from '../headers/main.header';
import GoogleMapReact, { Maps } from 'google-map-react';
import { MAP } from '../../../utils/constants/map.constants';
import { EventNearMe } from '../../../store/events/events-near-me/models';
import { dateOptions } from '../../../utils/constants/event-date-options.constant';
import { applyToEventFromEvents } from '../../../store/applications/actions';
import { openUserProfile } from '../../../store/history/actions';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ApplicationStatusString } from '../../../utils/constants/application-status-string.constant';
import Marker from '../../map/marker';

interface OwnProps {
    id: string;
}

interface PropsFromState {
    event: EventNearMe | undefined | null;
    currentVkUserId?: number;
}

interface PropsFromDispatch {
    applyToEvent: typeof applyToEventFromEvents,
    openUserProfile: typeof openUserProfile
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {

}

class SelectedEventPanel extends React.Component<AllProps, State>  {
    render() {
        const { id, event, currentVkUserId, openUserProfile, applyToEvent } = this.props;
        const notCurrentUsersEvent = event?.vkUserOwnerId !== currentVkUserId;
        return (
            <Panel id={id} className="selected-event-panel">
                <MainHeaderPanel />
                {event &&
                    <Group separator="hide">
                        <RichCell
                            disabled
                            multiline
                            before={<Avatar onClick={() => notCurrentUsersEvent && openUserProfile(event.vkUserOwnerId)} size={48} src={event.vkUserAvatarUrl} />}
                            text={event.description}
                            caption={`${new Date(event.date).toLocaleDateString('ru-RU', dateOptions)} в ${event.time}`}
                        >
                            <span>{event.userFullName} <span className="distance">{event.distance && (event.distance / 1000).toFixed(2)} км.</span></span>
                        </RichCell>
                        {
                            notCurrentUsersEvent &&
                            <Div className="map-card-buttons-div">
                                {event.applicationStatus === ApplicationStatus.none
                                    ? <Button className="button-primary" onClick={() => applyToEvent(event.id)}>Иду</Button>
                                    : <Button className="button-primary btn-status disabled" disabled={true}>{ApplicationStatusString[event.applicationStatus]}</Button>}
                                <Button className="btn-secondary width-50 text-center"
                                    onClick={() => openUserProfile(event.vkUserOwnerId)}
                                >Профиль</Button>
                            </Div>
                        }
                        <div className="map">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: MAP.KEY }}
                                center={{
                                    lat: event.latitude,
                                    lng: event.longitude,
                                }}
                                defaultCenter={{
                                    lat: event.latitude,
                                    lng: event.longitude,
                                }}
                                defaultZoom={14}
                            >
                                <Marker
                                    status={event.applicationStatus}
                                    lat={event.latitude}
                                    lng={event.longitude}
                                    text={event.title}/>
                            </GoogleMapReact>
                        </div>
                    </Group>
                }
            </Panel >
        )
    }
}

const mapStateToProps = ({ events, authentication }: AppState, ownProps: OwnProps) => ({
    event: events.eventsNearMe.selectedEventId
        ? events.eventsNearMe.sharedEvents[events.eventsNearMe.selectedEventId]
        : null,
    currentVkUserId: authentication.vkUserInfo?.id,
    id: ownProps.id,
})

const mapDispatchToProps: PropsFromDispatch = {
    applyToEvent: applyToEventFromEvents,
    openUserProfile: openUserProfile
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectedEventPanel);

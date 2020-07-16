import React from 'react';
import { Group, RichCell, Button, Avatar, Div, CardGrid, Card, Header } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { fetchListRequest } from '../../store/events/events-near-me/actions';
import { EventNearMe } from '../../store/events/events-near-me/models';
import { Geo } from '../../store/authentication/models';
import { applyToEventRequest } from '../../store/applications/actions';
import { Position } from '../../store/authentication/models';
import { UserInfo } from '@vkontakte/vk-bridge';
import { ApplicationStatus } from '../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import { dateOptions } from '../../utils/constants/event-date-options.constant';
import { goForward } from "./../../store/history/actions";
import { VkHistoryModel } from '../../store/history/models';
import { VIEWS } from '../../utils/constants/view.constants';
import { PANELS } from '../../utils/constants/panel.constants';

interface PropsFromState {
    id: string;
    eventsList: EventNearMe[];
    userPosition: Geo;
    lastLocation: Position;
    vkUserInfo: UserInfo;
}

interface PropsFromDispatch {
    fetchList: typeof fetchListRequest,
    applyToEvent: typeof applyToEventRequest,
    goForward: typeof goForward
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
}

class EventsNearMeListTabPage extends React.Component<AllProps, State>  {

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
        const { eventsList, goForward } = this.props;
        if (eventsList) {
            return eventsList
                .map((item, key) => {
                    return <div key={key} style={{ height: 180 }}>
                        <Group separator="show" header={<Header mode="secondary">{ALL_THEMES.find(m => m.id === item.themeType)?.name}</Header>}>
                            <RichCell
                                multiline
                                before={<Avatar size={48} src={item.vkUserAvatarUrl} />}
                                text={item?.description}
                                caption={`${new Date(item.date).toLocaleDateString('ru-RU', dateOptions)} в ${item.time}`}
                            >
                                <span>{item?.userFullName} <span className="distance">{item?.distance && (item?.distance / 1000).toFixed(2)} км.</span></span>
                            </RichCell>
                            <Div className="map-card-buttons-div">
                                {item.applicationStatus === ApplicationStatus.none
                                    ? <Button className="button-primary" onClick={() => this.apply(item.id)}>Иду</Button>
                                    : <Button className="button-primary disabled" disabled={true}>{this.renderApplicationStatus(item.applicationStatus)}</Button>}
                                <Button className="btn-secondary width-50 text-center"
                                    onClick={() => goForward(new VkHistoryModel(VIEWS.GENERAL_VIEW, PANELS.PROFILE_PANEL))}
                                >Профиль</Button>
                            </Div>
                        </Group>
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
    applyToEvent: applyToEventRequest,
    goForward: goForward
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsNearMeListTabPage);
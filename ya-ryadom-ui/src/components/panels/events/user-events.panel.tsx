import './user-events.panel.scss';
import React from "react";
import { UserInfo } from "@vkontakte/vk-bridge";
import { User } from "../../../store/authentication/models";
import { goForward } from "../../../store/history/actions";
import { connect } from 'react-redux';
import MainHeaderPanel from "../headers/main.header";
import {
    Button,
    Group,
    Header,
    Panel,
    RichCell,
    Tabs,
    TabsItem,
    UsersStack
} from "@vkontakte/vkui";
import { AppState } from "../../../store/app-state";
import { ALL_THEMES } from "../../../utils/constants/theme.constants";
import { dateOptions } from "../../../utils/constants/event-date-options.constant";
import EmptyText from "../../general/empty-text";
import { UserEvents, UserEvent } from "../../../store/events/user-events/models";
import { fetchUserCreatedEventsListRequest, fetchUserVisitedEventsListRequest } from "../../../store/events/user-events/actions";
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ApplicationStatusString } from '../../../utils/constants/application-status-string.constant';
import { applyToEventFromUserEvents } from '../../../store/applications/actions';

interface PropsFromState {
    id: string;
    vkUserInfo: UserInfo;
    currentUser: User;
    vkUserId: number;
    userCreatedEvents: UserEvents;
    userVisitedEvents: UserEvents;
}

interface PropsFromDispatch {
    fetchCreatedEvents: typeof fetchUserCreatedEventsListRequest;
    fetchVisitedEvents: typeof fetchUserVisitedEventsListRequest;
    goForwardView: typeof goForward;
    applyToEvent: typeof applyToEventFromUserEvents;
}

type AllProps = PropsFromState & PropsFromDispatch;

const TABS = {
    "СОЗДАЛ": "Создал",
    "СХОДИЛ": "Сходил"
}

class UserEventsPanel extends React.Component<AllProps> {
    state = {
        activeTab: TABS.СОЗДАЛ,
    }

    componentWillMount() {
        const { vkUserId, fetchCreatedEvents, fetchVisitedEvents } = this.props;

        // can user some check here or in the action, not to send too much queries

        fetchCreatedEvents(vkUserId);

        fetchVisitedEvents(vkUserId);

    }

    renderEvents(activeTab) {
        const { userCreatedEvents, userVisitedEvents, vkUserId, vkUserInfo, applyToEvent } = this.props;

        let eventsToRender: UserEvent[];
        if (activeTab === TABS.СОЗДАЛ) {
            eventsToRender = userCreatedEvents[vkUserId];
        } else {
            eventsToRender = userVisitedEvents[vkUserId];
        }

        if (!eventsToRender || eventsToRender.length === 0) {
            return <EmptyText text="Событий пока нет" />;
        } else {
            return eventsToRender.map((event, key) => {
                const userApplication = event.participants.find((m) => m.vkUserId === vkUserInfo.id);
                return <Group key={key}>
                    <Header
                        mode="secondary">{ALL_THEMES.filter(theme => theme.id === event.themeType)[0].name}</Header>
                    <RichCell
                        disabled
                        caption={<span
                            className="rc-caption">{event.description}</span>}

                        bottom={
                            <>
                                <p className="rc-bottom">
                                    Адрес
                                    <span className="rc-bottom-span">
                                        {new Date(event.date).toLocaleDateString('ru-RU', dateOptions)} в {event.time}
                                    </span>
                                </p>
                                <UsersStack
                                    photos={event.participants.map(({ vkUserAvatarUrl }) => vkUserAvatarUrl)}
                                >{event.participants.length} желающих</UsersStack>
                            </>
                        }
                        actions={
                            <React.Fragment>
                                {
                                    event.ended ?
                                        <Button mode="secondary"
                                            className="button-disabled">Завершено</Button> :
                                        !userApplication || userApplication?.applicationStatus === ApplicationStatus.none
                                            ? <Button className="button-primary" onClick={() => applyToEvent({ vkUserId: vkUserId, eventId: event.id })}>Иду</Button>
                                            : <Button className="button-primary btn-status disabled" disabled={true}>{ApplicationStatusString[userApplication.applicationStatus]}</Button>
                                }
                            </React.Fragment>
                        }
                    >
                        {event.title}
                    </RichCell>
                </Group >
            });
        }
    }

    render() {
        const { id } = this.props;
        const { activeTab } = this.state;
        // need to get event by user id
        // need to get all events in which user participated
        // need to get all user participating in the event
        return (
            <Panel className="" id={id}>
                <MainHeaderPanel text='События'></MainHeaderPanel>
                <Tabs>
                    <TabsItem
                        selected={activeTab === TABS.СОЗДАЛ}
                        onClick={() => this.setState({ activeTab: TABS.СОЗДАЛ })}
                    >
                        Создал
                    </TabsItem>
                    <TabsItem
                        selected={activeTab === TABS.СХОДИЛ}
                        onClick={() => this.setState({ activeTab: TABS.СХОДИЛ })}
                    >
                        Сходил
                    </TabsItem>
                </Tabs>

                {this.renderEvents(activeTab)}

            </Panel>
        );
    }
}

const mapStateToProps = ({ events, authentication }: AppState) => ({
    userCreatedEvents: events.userEvents.userCreatedEvents,
    userVisitedEvents: events.userEvents.userVisitedEvents,
    vkUserInfo: authentication.vkUserInfo,
    vkUserId: events.eventsNearMe.currentVkId,
    currentUser: authentication.currentUser,
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchCreatedEvents: fetchUserCreatedEventsListRequest,
    fetchVisitedEvents: fetchUserVisitedEventsListRequest,
    goForwardView: goForward,
    applyToEvent: applyToEventFromUserEvents
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserEventsPanel);

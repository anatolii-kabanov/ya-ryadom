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
        const { activeTab } = this.state;
        // can user some check here or in the action, not to send too much queries
        if (activeTab === TABS.СОЗДАЛ) {
            fetchCreatedEvents(vkUserId);
        } else {
            fetchVisitedEvents(vkUserId);
        }
    }

    renderEvents(activeTab) {
        const { userCreatedEvents, userVisitedEvents, vkUserId } = this.props;

        let eventsToRender: UserEvent[];
        if (activeTab === TABS.СОЗДАЛ) {
            eventsToRender = userCreatedEvents[vkUserId];
        } else {
            eventsToRender = userVisitedEvents[vkUserId];
        }

        if (eventsToRender.length === 0) {
            return <EmptyText text="Событий пока нет" />;
        } else {
            return eventsToRender.map((event) =>
                <Group>
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
                                >{event.participants.length} участников</UsersStack>
                            </>
                        }
                        actions={
                            <React.Fragment>
                                {
                                    event.ended ?
                                        <Button mode="secondary"
                                            className="button-disabled">Завершено</Button> :
                                        <Button
                                            className="button-primary">Иду</Button>
                                }
                            </React.Fragment>
                        }
                    >
                        {event.title}
                    </RichCell>
                </Group>
            );
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserEventsPanel);

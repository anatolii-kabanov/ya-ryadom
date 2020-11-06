import './user-events.panel.scss';
import React from 'react';
import { UserInfo } from '@vkontakte/vk-bridge';
import { goForward } from '../../../store/history/actions';
import { connect } from 'react-redux';
import MainHeaderPanel from '../headers/main.header';
import {
    Button,
    Group,
    Header,
    Panel,
    RichCell,
    Tabs,
    TabsItem,
    UsersStack,
} from '@vkontakte/vkui';
import { AppState } from '../../../store/app-state';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import { dateOptions } from '../../../utils/constants/event-date-options.constant';
import EmptyText from '../../general/empty-text';
import { UserEvent } from '../../../store/events/user-events/models';
import {
    fetchUserCreatedEventsListRequest,
    fetchUserVisitedEventsListRequest,
} from '../../../store/events/user-events/actions';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ApplicationStatusString } from '../../../utils/constants/application-status-string.constant';
import { applyToEventFromUserEvents } from '../../../store/applications/actions';
import { TABS } from '../../../utils/enums/tabs.enum';
import { VkHistoryModel } from '../../../store/history/models';
import { PANELS } from '../../../utils/enums/panels.enum';
import { VIEWS } from '../../../utils/enums/views.enum';

interface OwnProps {
    id: PANELS;
}

interface PropsFromState {
    vkUserInfo: UserInfo | null;
    activeTab?: TABS;
    userCreatedEvents: UserEvent[];
    userVisitedEvents: UserEvent[];
}

interface PropsFromDispatch {
    fetchCreatedEvents: typeof fetchUserCreatedEventsListRequest;
    fetchVisitedEvents: typeof fetchUserVisitedEventsListRequest;
    goForward: typeof goForward;
    applyToEvent: typeof applyToEventFromUserEvents;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class UserEventsPanel extends React.Component<AllProps> {
    componentWillMount() {
        const { fetchCreatedEvents, fetchVisitedEvents } = this.props;

        // can user some check here or in the action, not to send too much queries

        fetchCreatedEvents();

        fetchVisitedEvents();
    }

    renderEvents() {
        const {
            userCreatedEvents,
            userVisitedEvents,
            vkUserInfo,
            applyToEvent,
            activeTab
        } = this.props;

        let eventsToRender: UserEvent[];
        if (activeTab === TABS.CREATED_USER_EVENTS) {
            eventsToRender = userCreatedEvents;
        } else {
            eventsToRender = userVisitedEvents;
        }

        if (!eventsToRender || eventsToRender.length === 0) {
            return <EmptyText text='Событий пока нет' />;
        } else {
            return eventsToRender.map((event, key) => {
                const userApplication = event.participants.find(
                    (m) => m.vkUserId === vkUserInfo?.id,
                );
                return (
                    <Group key={key}>
                        <Header mode='secondary'>
                            {
                                ALL_THEMES.filter(
                                    (theme) => theme.id === event.themeType,
                                )[0].name
                            }
                        </Header>
                        <RichCell
                            disabled
                            multiline={true}
                            text={event.description}
                            bottom={
                                <>
                                    <p className='rc-bottom'>
                                        Адрес
                                        <span className='rc-bottom-span'>
                                            {new Date(
                                                event.date,
                                            ).toLocaleDateString(
                                                'ru-RU',
                                                dateOptions,
                                            )}{' '}
                                            в {event.time}
                                        </span>
                                    </p>
                                    <UsersStack
                                        photos={event.participants.map(
                                            ({ vkUserAvatarUrl }) =>
                                                vkUserAvatarUrl,
                                        )}
                                    >
                                        {event.participants.length} желающих
                                    </UsersStack>
                                </>
                            }
                            actions={
                                <React.Fragment>
                                    {event.ended ? (
                                        <Button
                                            mode='secondary'
                                            className='button-disabled'
                                            disabled={true}
                                        >
                                            Завершено
                                        </Button>
                                    ) : !userApplication ||
                                      userApplication?.applicationStatus ===
                                          ApplicationStatus.none ? (
                                        <Button
                                            className='button-primary'
                                            onClick={() =>
                                                applyToEvent(event.id)
                                            }
                                        >
                                            Иду
                                        </Button>
                                    ) : (
                                        <Button
                                            className='button-primary btn-status disabled'
                                            disabled={true}
                                        >
                                            {
                                                ApplicationStatusString[
                                                    userApplication
                                                        .applicationStatus
                                                ]
                                            }
                                        </Button>
                                    )}
                                </React.Fragment>
                            }
                        >
                            {event.title}
                        </RichCell>
                    </Group>
                );
            });
        }
    }

    render() {
        const { id, activeTab, goForward } = this.props;
        return (
            <Panel className='' id={id}>
                <MainHeaderPanel text='События'></MainHeaderPanel>
                <Tabs>
                    <TabsItem
                        selected={activeTab === TABS.CREATED_USER_EVENTS}
                        onClick={() =>
                            goForward(
                                new VkHistoryModel(
                                    VIEWS.GENERAL_VIEW,
                                    id,
                                    TABS.CREATED_USER_EVENTS,
                                ),
                            )
                        }
                    >
                        Создал
                    </TabsItem>
                    <TabsItem
                        selected={activeTab === TABS.VISITED_USER_EVENTS}
                        onClick={() =>
                            goForward(
                                new VkHistoryModel(
                                    VIEWS.GENERAL_VIEW,
                                    id,
                                    TABS.VISITED_USER_EVENTS,
                                ),
                            )
                        }
                    >
                        Сходил
                    </TabsItem>
                </Tabs>

                {this.renderEvents()}
            </Panel>
        );
    }
}

const mapStateToProps = (
    { events, authentication, users, history }: AppState,
    ownProps: OwnProps,
) => {
    const currentViewHistory = history.viewPanelsHistory[history.currentView];
    const lastEntry = currentViewHistory[currentViewHistory.length - 1];
    return {
        activeTab: lastEntry?.tab,
        userCreatedEvents:
            events.userEvents.userCreatedEvents[users.selectedProfileVkId],
        userVisitedEvents:
            events.userEvents.userVisitedEvents[users.selectedProfileVkId],
        vkUserInfo: authentication.vkUserInfo,
        id: ownProps.id,
    };
};

const mapDispatchToProps: PropsFromDispatch = {
    fetchCreatedEvents: fetchUserCreatedEventsListRequest,
    fetchVisitedEvents: fetchUserVisitedEventsListRequest,
    goForward: goForward,
    applyToEvent: applyToEventFromUserEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEventsPanel);

import './user-events.panel.scss';
import React from 'react';
import { UserInfo } from '@vkontakte/vk-bridge';
import { setTabForCurrentViewPanel } from '../../../store/history/actions';
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
import UserEventsTabPage from '../../tab-pages/user-events.tab-page';
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
import { PANELS } from '../../../utils/enums/panels.enum';
import { scrollToIdPosition } from '../../../store/ui/scroll/actions';

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
    setTabForCurrentViewPanel: typeof setTabForCurrentViewPanel;
    applyToEvent: typeof applyToEventFromUserEvents;
    scrollToIdPosition: typeof scrollToIdPosition;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class UserEventsPanel extends React.Component<AllProps> {
    componentWillMount() {
        const { fetchCreatedEvents, fetchVisitedEvents } = this.props;

        // can user some check here or in the action, not to send too much queries

        fetchCreatedEvents();

        fetchVisitedEvents();
    }

    render() {
        const {
            id,
            activeTab,
            setTabForCurrentViewPanel,
            userCreatedEvents,
            userVisitedEvents,
        } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text='События'></MainHeaderPanel>
                <Tabs>
                    <TabsItem
                        selected={activeTab === TABS.CREATED_USER_EVENTS}
                        onClick={() =>
                            setTabForCurrentViewPanel(TABS.CREATED_USER_EVENTS)
                        }
                    >
                        Создал
                    </TabsItem>
                    <TabsItem
                        selected={activeTab === TABS.VISITED_USER_EVENTS}
                        onClick={() =>
                            setTabForCurrentViewPanel(TABS.VISITED_USER_EVENTS)
                        }
                    >
                        Сходил
                    </TabsItem>
                </Tabs>
                {activeTab === TABS.CREATED_USER_EVENTS && (
                    <UserEventsTabPage
                        id={TABS.CREATED_USER_EVENTS}
                        userEvents={userCreatedEvents}
                    />
                )}
                {activeTab === TABS.VISITED_USER_EVENTS && (
                    <UserEventsTabPage
                        id={TABS.VISITED_USER_EVENTS}
                        userEvents={userVisitedEvents}
                    />
                )}
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
    setTabForCurrentViewPanel: setTabForCurrentViewPanel,
    applyToEvent: applyToEventFromUserEvents,
    scrollToIdPosition: scrollToIdPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEventsPanel);

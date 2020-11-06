import React from 'react';
import { Group, RichCell, Button, Header, UsersStack } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { applyToEventFromUserEvents } from '../../store/applications/actions';
import { ApplicationStatus } from '../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import { dateOptions } from '../../utils/constants/event-date-options.constant';
import EmptyText from '../general/empty-text';
import { ApplicationStatusString } from '../../utils/constants/application-status-string.constant';
import { TABS } from '../../utils/enums/tabs.enum';
import { scrollToIdPosition, setScroll } from '../../store/ui/scroll/actions';
import { UserEvent } from '../../store/events/user-events/models';
import { UserInfo } from '@vkontakte/vk-bridge';

interface OwnProps {
    id: TABS;
    userEvents?: UserEvent[];
}

interface PropsFromState {
    vkUserInfo: UserInfo | null;
}

interface PropsFromDispatch {
    setScroll: typeof setScroll;
    scrollToIdPosition: typeof scrollToIdPosition;
    applyToEvent: typeof applyToEventFromUserEvents;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {}

class UserEventsTabPage extends React.Component<AllProps, State> {
    componentDidMount() {
        const { scrollToIdPosition, id } = this.props;
        scrollToIdPosition(id);
    }

    componentWillUnmount() {
        const { setScroll, id } = this.props;
        setScroll({ id, position: window.scrollY });
    }

    render() {
        const { userEvents, applyToEvent, vkUserInfo } = this.props;
        if (!userEvents || userEvents.length === 0) {
            return <EmptyText text='Событий пока нет' />;
        } else {
            return userEvents.map((event, key) => {
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
}

const mapStateToProps = ({ authentication }: AppState, ownProps: OwnProps) => ({
    vkUserInfo: authentication.vkUserInfo,
    id: ownProps.id,
    userEvents: ownProps.userEvents,
});

const mapDispatchToProps: PropsFromDispatch = {
    applyToEvent: applyToEventFromUserEvents,
    setScroll: setScroll,
    scrollToIdPosition: scrollToIdPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEventsTabPage);

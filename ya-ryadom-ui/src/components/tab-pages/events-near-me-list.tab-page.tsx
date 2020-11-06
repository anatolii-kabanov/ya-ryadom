import React from 'react';
import { Group, RichCell, Button, Avatar, Div, Header } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { fetchListRequest } from '../../store/events/events-near-me/actions';
import { EventNearMe } from '../../store/events/events-near-me/models';
import { applyToEventFromEvents } from '../../store/applications/actions';
import { ApplicationStatus } from '../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import { dateOptions } from '../../utils/constants/event-date-options.constant';
import { openUserProfile } from './../../store/history/actions';
import EmptyText from '../general/empty-text';
import { ApplicationStatusString } from '../../utils/constants/application-status-string.constant';
import Icon16MoreHorizontal from '@vkontakte/icons/dist/16/more_horizontal';
import { TABS } from '../../utils/enums/tabs.enum';
import { setScroll } from '../../store/ui/scroll/actions';

interface OwnProps {
    id: TABS;
    openPopout: (eventId: number) => void;
}

interface PropsFromState {
    eventsList: EventNearMe[];
}

interface PropsFromDispatch {
    fetchList: typeof fetchListRequest;
    applyToEvent: typeof applyToEventFromEvents;
    openUserProfile: typeof openUserProfile;
    setScroll: typeof setScroll;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {}

class EventsNearMeListTabPage extends React.Component<AllProps, State> {
    componentWillUnmount() {
        const { setScroll, id } = this.props;
        setScroll({ id, position: window.scrollY });
    }

    apply(eventId: number) {
        const { applyToEvent } = this.props;
        applyToEvent(eventId);
    }

    private renderEvents() {
        const { eventsList, openUserProfile, openPopout } = this.props;
        if (eventsList) {
            return eventsList.map((item, index) => {
                return (
                    <Group
                        key={index}
                        separator={
                            index !== eventsList.length - 1 ? 'show' : 'hide'
                        }
                        header={
                            <Header
                                mode='secondary'
                                aside={
                                    <Icon16MoreHorizontal
                                        onClick={() => openPopout(item.id)}
                                    />
                                }
                            >
                                {
                                    ALL_THEMES.find(
                                        (m) => m.id === item.themeType,
                                    )?.name
                                }
                            </Header>
                        }
                    >
                        <RichCell
                            disabled
                            multiline
                            before={
                                <Avatar
                                    onClick={() =>
                                        openUserProfile(item.vkUserOwnerId)
                                    }
                                    size={48}
                                    src={item.vkUserAvatarUrl}
                                />
                            }
                            text={item?.description}
                            caption={`${new Date(item.date).toLocaleDateString(
                                'ru-RU',
                                dateOptions,
                            )} в ${item.time}`}
                        >
                            <span>
                                {item?.userFullName}{' '}
                                <span className='distance'>
                                    {item?.distance &&
                                        (item?.distance / 1000).toFixed(2)}{' '}
                                    км.
                                </span>
                            </span>
                        </RichCell>
                        <Div className='map-card-buttons-div'>
                            {item.applicationStatus ===
                            ApplicationStatus.none ? (
                                <Button
                                    className='button-primary'
                                    onClick={() => this.apply(item.id)}
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
                                            item.applicationStatus
                                        ]
                                    }
                                </Button>
                            )}
                            <Button
                                className='btn-secondary width-50 text-center'
                                onClick={() =>
                                    openUserProfile(item.vkUserOwnerId)
                                }
                            >
                                Профиль
                            </Button>
                        </Div>
                    </Group>
                );
            });
        }
    }

    render() {
        const { eventsList } = this.props;
        return (
            <div>
                {eventsList?.length > 0 ? (
                    this.renderEvents()
                ) : (
                    <EmptyText text='События не найдены' />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ events }: AppState, ownProps: OwnProps) => ({
    eventsList: events.eventsNearMe.eventsList,
    id: ownProps.id,
    openPopout: ownProps.openPopout,
});

const mapDispatchToProps: PropsFromDispatch = {
    fetchList: fetchListRequest,
    applyToEvent: applyToEventFromEvents,
    openUserProfile: openUserProfile,
    setScroll: setScroll,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventsNearMeListTabPage);

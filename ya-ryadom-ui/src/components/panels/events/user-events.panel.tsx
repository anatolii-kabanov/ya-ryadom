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
import { fetchMyEventsListRequest } from "../../../store/events/my-events/actions";
import { fetchUserInfoRequest } from "../../../store/authentication/actions";

import './user-events.panel.scss';
import xhr from "xhr";
import { ALL_THEMES } from "../../../utils/constants/theme.constants";

interface PropsFromState {
    id: string;
    vkUserInfo: UserInfo;
    currentUser: User;
    vkUserId: number;
}

interface PropsFromDispatch {
    fetchMyEventsListRequest: typeof fetchMyEventsListRequest;
    goForwardView: typeof goForward;
    fetchUserInfoRequest: typeof fetchUserInfoRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

const TABS = {
    "СОЗДАЛ": "Создал",
    "СХОДИЛ": "Сходил"
}

const TO_LOCAL_DATE_OPTIONS = { weekday: 'short', month: 'long', day: 'numeric' };

// user vk id
const CREATED_EVENT = {
    participated: [
        {
            theme: 'Кино', name: 'Классный фильм', description: 'Пппц какой классный и сасный', address: 'Ленина 79Б', date: 'пн 14 июля в 23:45', ended: 0,
            userAvatars: new Array(10).fill('https://sun1-95.userapi.com/gCsrYFmDPCSMzvMLr88jS8yj3qa7FB404XofVg/8_5cABjkL_0.jpg?ava=1')
        },
        {
            theme: 'Кино', name: 'Классный фильм', description: 'Пппц какой классный и сасный', address: 'Ленина 79Б', date: 'пн 14 июля в 23:45', ended: 0,
            userAvatars: new Array(10).fill('https://sun1-95.userapi.com/gCsrYFmDPCSMzvMLr88jS8yj3qa7FB404XofVg/8_5cABjkL_0.jpg?ava=1')
        },
        {
            theme: 'Кино', name: 'Классный фильм', description: 'Пппц какой классный и сасный', address: 'Ленина 79Б', date: 'пн 14 июля в 23:45', ended: 1,
            userAvatars: new Array(10).fill('https://sun1-95.userapi.com/gCsrYFmDPCSMzvMLr88jS8yj3qa7FB404XofVg/8_5cABjkL_0.jpg?ava=1')
        },
    ],
    created: [
        {
            theme: 'Горки', name: 'Я хз', description: 'Пппц какой классный и сасный', address: 'В горах', date: 'пн 14 июля в 23:45', ended: 0,
            userAvatars: new Array(10).fill('https://sun1-95.userapi.com/gCsrYFmDPCSMzvMLr88jS8yj3qa7FB404XofVg/8_5cABjkL_0.jpg?ava=1')
        },
    ],
}

class UserEventsPanel extends React.Component<AllProps> {
    state = {
        activeTab: TABS.СОЗДАЛ,
        createdEvents: [],
        participatedEvents: {}
    }

    componentWillMount() {
        const { vkUserId } = this.props
        let createdEvents, participatedEvents;

        xhr({
                uri: `${process.env.REACT_APP_API_ENDPOINT}/my-events/${vkUserId}`,
                sync: true
            }, (err, resp, body) => {
                createdEvents = JSON.parse(body);
            }
        )

        xhr({
                uri: `${process.env.REACT_APP_API_ENDPOINT}/my-events/participation/${vkUserId}`,
                sync: true
            }, (err, resp, body) => {
                participatedEvents = JSON.parse(body);
            }
        )

        this.setState({
            createdEvents,
            participatedEvents
        })
    }

    renderEvents(activeTab) {
        const { createdEvents, participatedEvents } = this.state;

        let eventsToRender;
        if (activeTab === TABS.СОЗДАЛ) {
            eventsToRender = createdEvents;
        } else {
            eventsToRender = participatedEvents;
        }

        return eventsToRender.map((event) =>
            <Group>
                <Header mode="secondary">{ALL_THEMES.filter(theme => theme.id === event.themeType)[0].name}</Header>
                <RichCell
                    disabled
                    caption={<span className="rc-caption">{event.description}</span>}

                    bottom={
                        <>
                            <p className="rc-bottom">
                                Адрес
                                <span className="rc-bottom-span">
                                    {new Date(event.date).toLocaleDateString('ru-RU', TO_LOCAL_DATE_OPTIONS)} в {event.time}
                                </span>
                            </p>
                            <UsersStack
                                photos={event.participants.map(({vkUserAvatarUrl}) => vkUserAvatarUrl)}
                            >{event.participants.length} участников</UsersStack>
                        </>
                    }
                    actions={
                        <React.Fragment>
                            {event.ended ?
                                <Button mode="secondary" className="button-disabled">Завершено</Button> :
                                <Button className="button-primary">Иду</Button>
                            }
                        </React.Fragment>
                    }
                >
                    {event.title}
                </RichCell>
            </Group>
        )
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
                        selected={ activeTab === TABS.СОЗДАЛ }
                        onClick={() => this.setState({ activeTab: TABS.СОЗДАЛ })}
                    >
                        Создал
                    </TabsItem>
                    <TabsItem
                        selected={ activeTab === TABS.СХОДИЛ }
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
    myEvents: events.myEvents.eventsList,
    vkUserInfo: authentication.vkUserInfo,
    vkUserId: events.eventsNearMe.currentVkId,
    currentUser: authentication.currentUser,
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchMyEventsListRequest: fetchMyEventsListRequest,
    goForwardView: goForward,
    fetchUserInfoRequest: fetchUserInfoRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserEventsPanel);

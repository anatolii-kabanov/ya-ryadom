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

interface PropsFromState {
    id: string;
    vkUserInfo: UserInfo;
    currentUser: User;
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
        activeTab: TABS.СОЗДАЛ
    }

    renderEvents(activeTab) {
        let eventsToRender;
        if (activeTab === TABS.СОЗДАЛ) {
            eventsToRender = CREATED_EVENT.created;
        } else {
            eventsToRender = CREATED_EVENT.participated
        }

        return eventsToRender.map((event) =>
            <Group>
                <Header mode="secondary">{event.theme}</Header>
                <RichCell
                    disabled
                    caption={<span className="rc-caption">{event.description}</span>}

                    bottom={
                        <>
                            <p className="rc-bottom">
                                {event.address} <span className="rc-bottom-span">{event.date}</span></p>

                            <UsersStack
                                photos={event.userAvatars}
                            >{event.userAvatars.length} участников</UsersStack>
                        </>
                    }
                    actions={
                        <React.Fragment>
                            {event.ended ?
                                <Button mode="secondary">Скрыть</Button> :
                                <Button className="button-primary">Завершено</Button>
                            }
                        </React.Fragment>
                    }
                >
                    {event.name}
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

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
    TabsItem
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

class UserEventsPanel extends React.Component<AllProps> {
    state = {
        activeTab: TABS.СОЗДАЛ
    }

    render() {
        const { id } = this.props;
        const { activeTab } = this.state;

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
                <Group>
                    <Header mode="secondary">Кино</Header>
                    <RichCell
                        disabled
                        caption={<span className="rc-caption">Описание</span>}

                        bottom={
                            <p className="rc-bottom">
                                Место встречи <span className="rc-bottom-span">emgggggg</span></p>
                            // for avatars of participants
                            // <UsersStack
                            //     photos={[
                            //         getAvatarUrl('user_ox'),
                            //         getAvatarUrl('user_vitalyavolyn'),
                            //         getAvatarUrl('user_eee'),
                            //     ]}
                            // >73 общих друга</UsersStack>
                        }
                        actions={
                            <React.Fragment>
                                <Button className="button-primary">Иду</Button>
                                {/*<Button mode="secondary">Скрыть</Button>*/}
                            </React.Fragment>
                        }
                    >
                        Илья Гришин
                    </RichCell>
                </Group>
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

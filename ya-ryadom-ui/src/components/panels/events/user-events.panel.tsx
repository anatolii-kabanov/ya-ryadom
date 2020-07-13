import React from "react";
import { UserInfo } from "@vkontakte/vk-bridge";
import { User } from "../../../store/authentication/models";
import { goForward } from "../../../store/history/actions";
import { connect } from 'react-redux';
import MainHeaderPanel from "../headers/main.header";
import { Panel, Tabs, TabsItem } from "@vkontakte/vkui";
import { AppState } from "../../../store/app-state";
import { fetchMyEventsListRequest } from "../../../store/events/my-events/actions";
import { fetchUserInfoRequest } from "../../../store/authentication/actions";

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

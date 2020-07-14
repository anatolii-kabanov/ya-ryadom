import './my-profile-edit.panel.scss';
import React from "react";
import {
    Group,
    Panel,
    Avatar,
    RichCell,
    Cell,
    Switch,
    Caption,
} from "@vkontakte/vkui";
import { connect } from 'react-redux';
import { AppState } from "../../../store/app-state";

import MainHeaderPanel from "../headers/main.header";
import { UserInfo } from "@vkontakte/vk-bridge";
import { goForward } from "../../../store/history/actions";
import { User } from "../../../store/authentication/models";

interface PropsFromState {
    id: string;
    vkUserInfo: UserInfo;
    currentUser: User;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward;
}

type AllProps = PropsFromState & PropsFromDispatch;

class MyProfileEditPanel extends React.Component<AllProps>{

    componentDidMount() {
    }

    render() {
        const { id, vkUserInfo, goForwardView, currentUser } = this.props;
        return (
            <Panel className="my-profile" id={id}>
                <MainHeaderPanel text='Мой профиль'></MainHeaderPanel>
                <Group separator="show">
                    <RichCell
                        disabled
                        multiline
                        before={<Avatar size={72} src={vkUserInfo?.photo_100} />}
                    >
                        <span className="profile-main-row">
                            {vkUserInfo?.first_name} {vkUserInfo?.last_name}
                        </span>
                    </RichCell>
                </Group>
                <Group separator="show">
                    <Cell asideContent={<Switch className="switcher" onClick={console.log}/>}>
                        Уведомления
                    </Cell>
                    <Cell description="Уведомления о событиях">
                    </Cell>
                </Group>
                <Group separator="show">
                    <Cell expandable >О себе</Cell>
                </Group>
                <Group separator="hide">
                    <Cell expandable >Темы</Cell>
                </Group>
            </Panel >
        );
    }
}

const mapStateToProps = ({ events, authentication }: AppState) => ({
    myEvents: events.myEvents.eventsList,
    vkUserInfo: authentication.vkUserInfo,
    currentUser: authentication.currentUser,
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfileEditPanel);


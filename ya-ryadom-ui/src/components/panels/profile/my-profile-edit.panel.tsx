import './my-profile-edit.panel.scss';
import React from "react";
import {
    Group,
    Panel,
    Avatar,
    RichCell,
    Cell,
    Switch,
} from "@vkontakte/vkui";
import { connect } from 'react-redux';
import { AppState } from "../../../store/app-state";

import MainHeaderPanel from "../headers/main.header";
import { UserInfo } from "@vkontakte/vk-bridge";
import { goForward } from "../../../store/history/actions";
import { User } from "../../../store/authentication/models";
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/constants/view.constants';
import { PANELS } from '../../../utils/constants/panel.constants';
import { allowNotificationsRequest, disableNotificationsRequest } from '../../../store/authentication/actions';

interface PropsFromState {
    id: string;
    vkUserInfo: UserInfo;
    currentUser: User;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward;
    allowNotifications: typeof allowNotificationsRequest,
    disableNotifications: typeof disableNotificationsRequest,
}

type AllProps = PropsFromState & PropsFromDispatch;

class MyProfileEditPanel extends React.Component<AllProps>{

    /**
     *
     */
    constructor(props) {
        super(props);
        this.onNotificationClick = this.onNotificationClick.bind(this)
    }

    componentDidMount() {
    }

    onNotificationClick(event: any) {
        const { allowNotifications, disableNotifications } = this.props;
        //event.preventDefault();
        if (event.target.checked) {
            allowNotifications();
        } else {
            disableNotifications();
        }
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
                    <Cell asideContent={<Switch name="enableNotifications" className="switcher" onClick={this.onNotificationClick} />}>
                        Уведомления
                    </Cell>
                    <Cell description="Уведомления о событиях">
                    </Cell>
                </Group>
                <Group separator="show">
                    <Cell expandable onClick={() => goForwardView(new VkHistoryModel(VIEWS.MY_PROFILE_VIEW, PANELS.MY_PROFILE_ABOUT_MYSELF_PANEL))}>О себе</Cell>
                </Group>
                <Group separator="hide">
                    <Cell expandable onClick={() => goForwardView(new VkHistoryModel(VIEWS.MY_PROFILE_VIEW, PANELS.MY_PROFILE_THEMES_PANEL))}>Темы</Cell>
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
    allowNotifications: allowNotificationsRequest,
    disableNotifications: disableNotificationsRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfileEditPanel);


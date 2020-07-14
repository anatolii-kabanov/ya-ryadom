import './my-profile.panel.scss';
import React from "react";
import {
    Group,
    Panel,
    Avatar,
    RichCell,
    Div,
    Header,
    Caption,
    Button,
} from "@vkontakte/vkui";
import { connect } from 'react-redux';
import { AppState } from "../../../store/app-state";

import MainHeaderPanel from "../headers/main.header";
import { UserInfo } from "@vkontakte/vk-bridge";
import { goForward } from "../../../store/history/actions";
import { fetchMyEventsListRequest } from "../../../store/events/my-events/actions";
import { User } from "../../../store/authentication/models";
import PillInput from "../../inputs/pill.input";
import { ALL_THEMES } from "../../../utils/constants/theme.constants";
import Icon24Star from '@vkontakte/icons/dist/24/favorite';

interface PropsFromState {
    id: string;
    vkUserInfo: UserInfo;
    currentUser: User;
}

interface PropsFromDispatch {
    fetchMyEventsListRequest: typeof fetchMyEventsListRequest;
    goForwardView: typeof goForward;
}

type AllProps = PropsFromState & PropsFromDispatch;

class MyProfilePanel extends React.Component<AllProps>{

    componentDidMount() {
        const { fetchMyEventsListRequest } = this.props;
        fetchMyEventsListRequest();
    }

    private renderThemes() {
        const { currentUser } = this.props;
        if (currentUser?.selectedThemes) {
            const themes = ALL_THEMES;
            return themes
                .map((item, key) => {
                    return <PillInput key={key} id={item.id} selected={currentUser.selectedThemes.indexOf(item.id) !== -1} onClick={() => ''} text={item.name}></PillInput>
                });
        }
    }

    render() {
        const { id, vkUserInfo, goForwardView, currentUser } = this.props;
        return (
            <Panel className="my-profile" id={id}>
                <MainHeaderPanel text='Мой профиль'></MainHeaderPanel>
                <Group separator="hide">
                    <RichCell
                        disabled
                        multiline
                        text={currentUser?.aboutMySelf}
                        before={<Avatar size={72} src={vkUserInfo?.photo_100} />}
                    >
                        <span className="profile-main-row">
                            {vkUserInfo?.first_name} {vkUserInfo?.last_name}
                            <Icon24Star className="star">
                            </Icon24Star>
                            <Caption weight="regular" level="1">{currentUser?.avgRating.toFixed(1)}</Caption>
                        </span>
                    </RichCell>
                    <Button className="button-secondary text-center"
                        onClick={console.log}
                    >Редактировать</Button>
                </Group>
                <Group header={<Header mode="secondary">Темы</Header>} separator="hide">
                    <Div className="pills">
                        {this.renderThemes()}
                    </Div>
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfilePanel);


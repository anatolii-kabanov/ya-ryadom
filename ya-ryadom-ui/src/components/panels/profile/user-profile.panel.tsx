import './user-profile.panel.scss';
import React from "react";
import {
    Group,
    Panel,
    Avatar,
    RichCell,
    Div,
    Header,
    Caption,
} from "@vkontakte/vkui";
import { connect } from 'react-redux';
import { AppState } from "../../../store/app-state";

import MainHeaderPanel from "../headers/main.header";
import { UserInfo } from "@vkontakte/vk-bridge";
import { goForward } from "../../../store/history/actions";
import { fetchMyEventsListRequest } from "../../../store/events/my-events/actions";
import xhr from "xhr";
import PillInput from "../../inputs/pill.input";
import { ALL_THEMES } from "../../../utils/constants/theme.constants";
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import Icon28PlaceOutline from '@vkontakte/icons/dist/28/place_outline';
import Icon28WriteSquareOutline from '@vkontakte/icons/dist/28/write_square_outline';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import { fetchUserInfoRequest } from "../../../store/authentication/actions";
import { User } from "../../../store/authentication/models";

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

class ProfilePanel extends React.Component<AllProps>{
    state = {
        currentProfile: {
            lastLocation: {longitude: 0, latitude: 0},
            selectedThemes: [],
        },
        currentUserThemes: [],
        currentProfileThemes: [],
        themesInCommon: []
    }

    componentDidMount() {
        const { fetchMyEventsListRequest } = this.props;
        fetchMyEventsListRequest();
    }

    componentWillMount() {
        xhr({
            uri: `${process.env.REACT_APP_API_ENDPOINT}/auth/user-info/1`,
            sync: true
        }, (err, resp, body) => {
                const response = JSON.parse(body);
                const { currentUser } = this.props;

                const currentProfileThemes = ALL_THEMES.filter(t => response.selectedThemes.indexOf(t.id) !== -1);
                const currentUserThemes = ALL_THEMES.filter(t => currentUser.selectedThemes.indexOf(t.id) !== -1);

                this.setState({
                    currentProfile: response,
                    currentProfileThemes: currentProfileThemes,
                    currentUserThemes: currentUserThemes,
                    themesInCommon: currentProfileThemes.filter(t => currentUserThemes.includes(t))
                })
            }
        )
    }

    private renderThemes() {
        const { currentProfileThemes, currentUserThemes } = this.state;

        if (currentProfileThemes) {
            return currentProfileThemes
                .map((item, key) => {
                    if (currentUserThemes.includes(item)) {
                        return <PillInput key={key} id={item.id} selected={true} onClick={() => ''} text={item.name}></PillInput>
                    }
                    else {
                        return <PillInput key={key} id={item.id} selected={false} onClick={() => ''} text={item.name}></PillInput>
                    }
                });
        }
    }

    render() {
        const { id, vkUserInfo, goForwardView } = this.props;
        const { currentProfile, themesInCommon } = this.state;
        return (
            <Panel className="my-profile" id={id}>
                <MainHeaderPanel text='Профиль'></MainHeaderPanel>
                <Group separator="hide">
                    <RichCell
                        disabled
                        multiline
                        text={currentProfile?.aboutMySelf}
                        before={<Avatar size={72} src={currentProfile?.vkUserAvatarUrl} />}
                    >
                        <span className="profile-main-row">
                            {currentProfile?.firstName} {currentProfile?.lastName}
                        </span>
                    </RichCell>
                </Group>
                <Group>
                    <div className="div-icons-menu">
                        <div><Icon28HomeOutline className="menu-icon"/>Профиль</div>
                        <div><Icon28PlaceOutline className="menu-icon"/>На карте</div>
                        <div><Icon28WriteSquareOutline className="menu-icon"/>Отзывы</div>
                        <div><Icon28UsersOutline className="menu-icon"/>События</div>
                    </div>
                </Group>
                <Group header={
                    <Header mode="secondary">
                        <span className="themes-text">
                            Темы <span className="themes-orange-text">у вас {themesInCommon.length} общих</span>
                        </span>
                    </Header>} separator="hide">
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
    fetchUserInfoRequest: fetchUserInfoRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePanel);


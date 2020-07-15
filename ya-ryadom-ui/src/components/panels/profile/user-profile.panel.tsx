import './user-profile.panel.scss';
import React from "react";
import {
    Group,
    Panel,
    Avatar,
    RichCell,
    Div,
    Header,
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
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import { fetchUserInfoRequest } from "../../../store/authentication/actions";
import { User } from "../../../store/authentication/models";
import { VIEWS } from "../../../utils/constants/view.constants";
import { PANELS } from "../../../utils/constants/panel.constants";
import { VkHistoryModel } from "../../../store/history/models";

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
        // somehow need to get user vk id
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
                        <a className="a-icon"
                           href={`https://vk.com/id1`}
                           onClick={() => window.open("https://vk.com/id1")}
                        ><Icon28HomeOutline className="menu-icon"
                        />Профиль VK</a>
                        <a className="a-icon"><Icon28FavoriteOutline
                            className="menu-icon"
                            onClick={() => goForwardView(new VkHistoryModel(VIEWS.GENERAL_VIEW, PANELS.USER_REVIEWS_PANEL))}/>
                            Отзывы
                        </a>
                        <a className="a-icon"><Icon28UsersOutline
                            className="menu-icon"
                            onClick={() => goForwardView(new VkHistoryModel(VIEWS.GENERAL_VIEW, PANELS.USER_EVENTS_PANEL))}/>
                            События
                        </a>
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


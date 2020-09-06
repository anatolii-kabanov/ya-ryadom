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
import xhr from "xhr";
import PillInput from "../../inputs/pill.input";
import { ALL_THEMES } from "../../../utils/constants/theme.constants";
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import { fetchUserInfoRequest } from "../../../store/authentication/actions";
import { CurrentUser } from "../../../store/authentication/models";
import { VIEWS } from "../../../utils/constants/view.constants";
import { PANELS } from "../../../utils/constants/panel.constants";
import { VkHistoryModel } from "../../../store/history/models";
import Icon24Star from '@vkontakte/icons/dist/24/favorite';

interface OwnProps {
    id: string;
}

interface PropsFromState {
    vkUserInfo: UserInfo | null;
    currentUser: CurrentUser | null;
    vkUserId: number;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward;
    fetchUserInfoRequest: typeof fetchUserInfoRequest;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {
    currentProfile: {
        [key: string]: any,
        lastLocation: { longitude: 0, latitude: 0 },
        selectedThemes: [],
    },
    currentUserThemes: any[],
    currentProfileThemes: any[],
    themesInCommon: any[]
}

class UserProfilePanel extends React.Component<AllProps, State>{

    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            currentProfile: {
                lastLocation: { longitude: 0, latitude: 0 },
                selectedThemes: [],
            },
            currentUserThemes: [],
            currentProfileThemes: [],
            themesInCommon: []
        }
    }

    componentWillMount() {
        const { vkUserId } = this.props
        xhr({
            uri: `${process.env.REACT_APP_API_ENDPOINT}/auth/user-info/${vkUserId}`,
            sync: true
        }, (err, resp, body) => {
            const response = JSON.parse(body);
            const { currentUser } = this.props;

            const currentProfileThemes = ALL_THEMES.filter(t => response.selectedThemes.indexOf(t.id) !== -1);
            const currentUserThemes = ALL_THEMES.filter(t => currentUser?.selectedThemes.indexOf(t.id) !== -1);

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
                .map((item: any, key) => {
                    if (currentUserThemes.includes(item)) {
                        return <PillInput key={key} id={item.id} disabled={true} selected={true} onClick={() => ''} text={item.name}></PillInput>
                    }
                    else {
                        return <PillInput key={key} id={item.id} disabled={true} selected={false} onClick={() => ''} text={item.name}></PillInput>
                    }
                });
        }
    }

    render() {
        const { id, vkUserId, goForwardView } = this.props;
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
                            <Icon24Star className="star" width={18} height={18}>
                            </Icon24Star>
                            <Caption className="rating" weight="regular" level="1">{currentProfile?.avgRating.toFixed(1)}</Caption>
                        </span>
                    </RichCell>
                </Group>
                <Group>
                    <div className="div-icons-menu">

                        <a className="a-icon"
                            href={`https://vk.com/id${vkUserId}`}
                            target="_blank"
                        >
                            <Icon28HomeOutline className="menu-icon" />
                            Профиль VK
                        </a>

                        <a className="a-icon"
                            onClick={() => goForwardView(new VkHistoryModel(VIEWS.GENERAL_VIEW, PANELS.USER_REVIEWS_PANEL))}
                        >
                            <Icon28FavoriteOutline className="menu-icon" />
                            Отзывы
                        </a>

                        <a className="a-icon"
                            onClick={() => goForwardView(new VkHistoryModel(VIEWS.GENERAL_VIEW, PANELS.USER_EVENTS_PANEL))}
                        >
                            <Icon28UsersOutline className="menu-icon" />
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

const mapStateToProps = ({ events, authentication }: AppState, ownProps: OwnProps) => ({
    myEvents: events.myEvents.eventsList,
    vkUserId: events.eventsNearMe.currentVkId,
    vkUserInfo: authentication.vkUserInfo,
    currentUser: authentication.currentUser,
    id: ownProps.id
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
    fetchUserInfoRequest: fetchUserInfoRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfilePanel);


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
import PillInput from "../../inputs/pill.input";
import { ThemesNames } from "../../../utils/constants/theme.constants";
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import { CurrentUser } from "../../../store/authentication/models";
import { VIEWS } from "../../../utils/constants/view.constants";
import { PANELS } from "../../../utils/constants/panel.constants";
import { VkHistoryModel } from "../../../store/history/models";
import Icon24Star from '@vkontakte/icons/dist/24/favorite';
import { User } from '../../../store/users/models';
import { fetchUserInfoRequest } from '../../../store/users/actions';

interface OwnProps {
    id: string;
}

interface PropsFromState {
    vkUserInfo: UserInfo | null;
    currentUser: CurrentUser | null;
    selectedUserInfo: User;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward;
    fetchUserInfoRequest: typeof fetchUserInfoRequest;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {
}

class UserProfilePanel extends React.Component<AllProps, State>{

    /**
     *
     */
    constructor(props: AllProps) {
        super(props);
    }

    componentWillMount() {
        const { fetchUserInfoRequest } = this.props;
        fetchUserInfoRequest();
    }

    private renderThemes() {
        const { selectedUserInfo, currentUser } = this.props;

        if (selectedUserInfo?.selectedThemes) {
            return selectedUserInfo?.selectedThemes
                .map((themeId, key) => {
                    if (currentUser?.selectedThemes.includes(themeId)) {
                        return <PillInput key={key} id={themeId} disabled={true} selected={true} text={ThemesNames[themeId]}></PillInput>
                    }
                    else {
                        return <PillInput key={key} id={themeId} disabled={true} selected={false} text={ThemesNames[themeId]}></PillInput>
                    }
                });
        }
    }

    render() {
        const { id, goForwardView, selectedUserInfo, currentUser } = this.props;
        return (
            <Panel className="my-profile" id={id}>
                <MainHeaderPanel text='Профиль'></MainHeaderPanel>
                <Group separator="hide">
                    <RichCell
                        disabled
                        multiline
                        text={selectedUserInfo?.aboutMySelf}
                        before={<Avatar size={72} src={selectedUserInfo?.vkUserAvatarUrl} />}
                    >
                        <span className="profile-main-row">
                            {selectedUserInfo?.firstName} {selectedUserInfo?.lastName}
                            <Icon24Star className="star" width={18} height={18}>
                            </Icon24Star>
                            <Caption className="rating" weight="regular" level="1">{selectedUserInfo?.avgRating.toFixed(1)}</Caption>
                        </span>
                    </RichCell>
                </Group>
                <Group>
                    <div className="div-icons-menu">

                        <a className="a-icon"
                            href={`https://vk.com/id${selectedUserInfo?.vkUserId}`}
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
                            Темы <span className="themes-orange-text">у вас {
                                selectedUserInfo?.selectedThemes.filter(t => currentUser?.selectedThemes.includes(t)).length
                            } общих</span>
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

const mapStateToProps = ({ events, authentication, users }: AppState, ownProps: OwnProps) => ({
    myEvents: events.myEvents.eventsList,
    selectedUserInfo: users.usersProfiles[users.selectedProfileVkId],
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


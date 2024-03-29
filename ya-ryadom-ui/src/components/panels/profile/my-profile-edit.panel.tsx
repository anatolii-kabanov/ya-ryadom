import './my-profile-edit.panel.scss';
import React from 'react';
import { connect } from 'react-redux';
import { UserInfo } from '@vkontakte/vk-bridge';
import {
    Group,
    Panel,
    Avatar,
    RichCell,
    Cell,
    Switch,
    Placeholder,
} from '@vkontakte/vkui';
import { AppState } from '../../../store/app-state';
import MainHeaderPanel from '../headers/main.header';
import { goForward } from '../../../store/history/actions';
import { CurrentUser, Geo } from '../../../store/authentication/models';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/enums/views.enum';
import { PANELS } from '../../../utils/enums/panels.enum';
import {
    allowNotifications,
    disableNotifications,
    enableUserGeolocation,
    disableUserGeolocation,
} from '../../../store/authentication/actions';
import { scrollToIdPosition, setScroll } from '../../../store/ui/scroll/actions';

interface OwnProps {
    id: string;
}

interface PropsFromState {
    vkUserInfo: UserInfo | null;
    currentUser: CurrentUser | null;
    userGeo: Geo | null;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward;
    allowNotifications: typeof allowNotifications;
    disableNotifications: typeof disableNotifications;
    enableUserGeolocation: typeof enableUserGeolocation;
    disableUserGeolocation: typeof disableUserGeolocation;
    setScroll: typeof setScroll;
    scrollToIdPosition: typeof scrollToIdPosition;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class MyProfileEditPanel extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
        this.onNotificationClick = this.onNotificationClick.bind(this);
        this.onGeolocationClick = this.onGeolocationClick.bind(this);
    }

    componentDidMount() {
        const { scrollToIdPosition, id } = this.props;
        scrollToIdPosition(id);
    }

    componentWillUnmount() {
        const { setScroll, id } = this.props;
        setScroll({ id, position: window.scrollY });
    }

    onNotificationClick(event: any) {
        const { allowNotifications, disableNotifications } = this.props;
        if (event.target.checked) {
            allowNotifications();
        } else {
            disableNotifications();
        }
    }

    onGeolocationClick(event: any) {
        const { enableUserGeolocation, disableUserGeolocation } = this.props;
        if (event.target.checked) {
            enableUserGeolocation();
        } else {
            disableUserGeolocation();
        }
    }

    render() {
        const {
            id,
            vkUserInfo,
            goForwardView,
            currentUser,
            userGeo,
        } = this.props;
        return (
            <Panel className='my-profile' id={id}>
                <MainHeaderPanel text='Мой профиль'></MainHeaderPanel>
                <Group separator='show'>
                    <RichCell
                        disabled
                        multiline
                        before={
                            <Avatar size={72} src={vkUserInfo?.photo_200} />
                        }
                    >
                        <span className='profile-main-row'>
                            {vkUserInfo?.first_name} {vkUserInfo?.last_name}
                        </span>
                    </RichCell>
                </Group>
                <Group separator='hide'>
                    <Cell
                        asideContent={
                            <Switch
                                checked={currentUser?.notificationsEnabled}
                                name='enableNotifications'
                                className='switcher'
                                onClick={this.onNotificationClick}
                            />
                        }
                    >
                        Уведомления
                    </Cell>
                    <Cell description='Уведомления о событиях'></Cell>
                </Group>
                <Group separator='show'>
                    <Cell
                        asideContent={
                            <Switch
                                checked={currentUser?.geolocationEnabled}
                                name='enableGeolocation'
                                className='switcher'
                                onClick={this.onGeolocationClick}
                            />
                        }
                    >
                        Геолокация
                    </Cell>
                    {userGeo && !userGeo.available && (
                        <Placeholder>
                            Похоже на то, что Вам нужно разрешить доступ к
                            геолокации для приложения "VK"
                        </Placeholder>
                    )}
                </Group>
                <Group separator='show'>
                    <Cell
                        expandable
                        onClick={() =>
                            goForwardView(
                                new VkHistoryModel(
                                    VIEWS.MY_PROFILE_VIEW,
                                    PANELS.MY_PROFILE_EDIT_ABOUT_MYSELF_PANEL,
                                ),
                            )
                        }
                    >
                        О себе
                    </Cell>
                </Group>
                <Group separator='hide'>
                    <Cell
                        expandable
                        onClick={() =>
                            goForwardView(
                                new VkHistoryModel(
                                    VIEWS.MY_PROFILE_VIEW,
                                    PANELS.MY_PROFILE_EDIT_THEMES_PANEL,
                                ),
                            )
                        }
                    >
                        Темы
                    </Cell>
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = (
    { events, authentication }: AppState,
    ownProps: OwnProps,
) => ({
    myEvents: events.myEvents.eventsList,
    vkUserInfo: authentication.vkUserInfo,
    currentUser: authentication.currentUser,
    userGeo: authentication.geoData,
    id: ownProps.id,
});

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
    allowNotifications: allowNotifications,
    disableNotifications: disableNotifications,
    enableUserGeolocation: enableUserGeolocation,
    disableUserGeolocation: disableUserGeolocation,
    setScroll: setScroll,
    scrollToIdPosition: scrollToIdPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileEditPanel);

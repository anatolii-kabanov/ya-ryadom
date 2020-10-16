import * as React from 'react';
import { Root, ScreenSpinner, ConfigProvider } from '@vkontakte/vkui';
import { AppState } from '../store/app-state';
import { connect } from 'react-redux';
import { VIEWS } from '../utils/constants/view.constants';
import { fetchVkUserInfoRequest } from '../store/authentication/actions';
import IntroView from "./views/intro.view";
import MyProfileView from './views/my-profile.view';
import EventsView from './views/events.view';
import MainEpic from './epics/menu.epic';
import ReviewsView from './views/reviews.view';
import ApplicationsView from './views/applications.view';
import GeneralView from './views/general.view';
import { CurrentUser } from '../store/authentication/models';
import MyEventCreateView from "./views/my-events-create.view";
import MainSnackbar from '../components/snackbars/main.snackbar';
import { setOnlineStatus } from '../store/ui/settings/actions';
import { addNotificaiton } from '../store/ui/notifications/actions';
import { SnackbarErrorNotification } from '../store/ui/notifications/models';
import { NOTIFICATION_MESSAGES } from '../utils/constants/notification-messages.constants';
import { goBack } from '../store/history/actions';
import { VkStyles } from '../store/ui/settings/state';

interface PropsFromState {
    activeView: string;
    spinnerVisible: boolean;
    currentUser: CurrentUser | null;
    vkStyles: VkStyles;
}

interface PropsFromDispatch {
    getVkUserInfo: typeof fetchVkUserInfoRequest,
    setOnlineStatus: typeof setOnlineStatus,
    addNotification: typeof addNotificaiton,
    goBack: typeof goBack,
}


type AllProps = PropsFromState & PropsFromDispatch;

class RootLayout extends React.Component<AllProps>  {

    constructor(props: AllProps) {
        super(props);
        this.handleNetworkChange = this.handleNetworkChange.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    componentDidMount() {
        const { getVkUserInfo } = this.props;
        getVkUserInfo();
        window.addEventListener('popstate', this.handleGoBack);
        window.addEventListener('offline', this.handleNetworkChange);
        window.addEventListener('online', this.handleNetworkChange);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.handleGoBack);
        window.removeEventListener('offline', this.handleNetworkChange);
        window.removeEventListener('online', this.handleNetworkChange);
    }

    handleNetworkChange = () => {
        const { setOnlineStatus, addNotification } = this.props;
        setOnlineStatus(window.navigator.onLine);
        if (!window.navigator.onLine) {
            addNotification(new SnackbarErrorNotification(NOTIFICATION_MESSAGES.CHECK_INTERNET_CONNECTION));
        }
    }

    handleGoBack = () => {
        const { goBack } = this.props;
        goBack();
    }

    renderLayout() {
        const { activeView, spinnerVisible } = this.props;
        switch (activeView) {
            case VIEWS.INTRO_VIEW:
                return <Root activeView={activeView} popout={spinnerVisible && <ScreenSpinner />}>
                    <IntroView id={VIEWS.INTRO_VIEW}></IntroView>
                </Root>;
            case VIEWS.GENERAL_VIEW:
                return <Root activeView={activeView} popout={spinnerVisible && <ScreenSpinner />}>
                    <GeneralView id={VIEWS.GENERAL_VIEW}></GeneralView>
                </Root>;
            default:
                return <MainEpic activeStory={activeView}>
                    <ApplicationsView id={VIEWS.APPLICATIONS_VIEW} popout={spinnerVisible && <ScreenSpinner />}></ApplicationsView>
                    <ReviewsView id={VIEWS.REVIEWS_VIEW} popout={spinnerVisible && <ScreenSpinner />}></ReviewsView>
                    <MyProfileView id={VIEWS.MY_PROFILE_VIEW} popout={spinnerVisible && <ScreenSpinner />}></MyProfileView>
                    <EventsView id={VIEWS.EVENTS_NEAR_ME_VIEW} popout={spinnerVisible && <ScreenSpinner />}></EventsView>
                    <MyEventCreateView id={VIEWS.MY_EVENT_CREATE_VIEW} popout={spinnerVisible && <ScreenSpinner />}></MyEventCreateView>
                </MainEpic>;
        }
    }

    render() {
        const { currentUser, vkStyles } = this.props;
        return (
            !currentUser
                ? <ScreenSpinner />
                : <ConfigProvider isWebView={true} scheme={vkStyles.schemeType} appearance={vkStyles.appearance}>
                    {this.renderLayout()}
                    <MainSnackbar />
                </ConfigProvider>
        )
    }
}

const mapStateToProps = ({ history, ui, authentication }: AppState) => ({
    activeView: history.currentViewPanel.view,
    spinnerVisible: ui.spinner.spinnerVisible,
    currentUser: authentication.currentUser,
    vkStyles: ui.settings.vkStyles,
})

const mapDispatchToProps: PropsFromDispatch = {
    getVkUserInfo: fetchVkUserInfoRequest,
    setOnlineStatus: setOnlineStatus,
    addNotification: addNotificaiton,
    goBack: goBack,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootLayout);

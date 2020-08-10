import * as React from 'react';
import { Root, ScreenSpinner } from '@vkontakte/vkui';
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
import { ROOTS } from '../utils/constants/root.constants';
import { CurrentUser } from '../store/authentication/models';
import MyEventCreateView from "./views/my-events-create.view";

interface PropsFromState {
    activeView: string;
    spinnerVisible: boolean;
    currentUser: CurrentUser;
}

interface PropsFromDispatch {
    getVkUserInfo: typeof fetchVkUserInfoRequest,
}


type AllProps = PropsFromState & PropsFromDispatch;

class RootLayout extends React.Component<AllProps>  {

    componentDidMount() {
        const { getVkUserInfo } = this.props;
        getVkUserInfo();
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
                return <MainEpic activeStory={ROOTS.MAIN_ROOT}>
                    <Root id={ROOTS.MAIN_ROOT} activeView={activeView} popout={spinnerVisible && <ScreenSpinner />}>
                        <ApplicationsView id={VIEWS.APPLICATIONS_VIEW}></ApplicationsView>
                        <ReviewsView id={VIEWS.REVIEWS_VIEW}></ReviewsView>
                        <MyProfileView id={VIEWS.MY_PROFILE_VIEW}></MyProfileView>
                        <EventsView id={VIEWS.EVENTS_NEAR_ME_VIEW}></EventsView>
                        <MyEventCreateView id={VIEWS.MY_EVENT_CREATE_VIEW}></MyEventCreateView>
                    </Root>
                </MainEpic>;
        }
    }

    render() {
        const { currentUser } = this.props;
        return (
            !currentUser
                ? <ScreenSpinner />
                : <div>
                    {this.renderLayout()}
                </div>
        )
    }
}

const mapStateToProps = ({ history, ui, authentication }: AppState) => ({
    activeView: history.currentViewPanel.view,
    spinnerVisible: ui.spinner.spinnerVisible,
    currentUser: authentication.currentUser
})

const mapDispatchToProps: PropsFromDispatch = {
    getVkUserInfo: fetchVkUserInfoRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootLayout);

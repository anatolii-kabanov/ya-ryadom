import * as React from 'react';
import { Root, ScreenSpinner } from '@vkontakte/vkui';
import { AppState } from '../store/app-state';
import { connect } from 'react-redux';
import { VIEWS } from '../utils/constants/view.constants';
import { fetchVkUserInfoRequest } from '../store/authentication/actions';
import IntroView from "./views/intro.view";
import MyProfileView from './views/my-profile.view';
import EventsView from './views/events.view';
import MainEpic from './epics/manu.epic';
import ReviewsView from './views/reviews.view';
import ApplicationsView from './views/applications.view';
import GeneralView from './views/general.view';

interface PropsFromState {
    activeView: string;
    spinnerVisible: boolean;
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
                return <MainEpic>
                    <ApplicationsView id={VIEWS.APPLICATIONS_VIEW} popout={spinnerVisible && <ScreenSpinner />}></ApplicationsView>
                    <ReviewsView id={VIEWS.REVIEWS_VIEW} popout={spinnerVisible && <ScreenSpinner />}></ReviewsView>
                    <MyProfileView id={VIEWS.MY_PROFILE_VIEW} popout={spinnerVisible && <ScreenSpinner />}></MyProfileView>
                    <EventsView id={VIEWS.EVENTS_NEAR_ME_VIEW} popout={spinnerVisible && <ScreenSpinner />}></EventsView>
                </MainEpic>;
        }
    }

    render() {
        return (
            <div>
                {this.renderLayout()}
            </div>
        )
    }
}

const mapStateToProps = ({ history, ui }: AppState) => ({
    activeView: history.currentViewPanel.view,
    spinnerVisible: ui.spinner.spinnerVisible,
})

const mapDispatchToProps: PropsFromDispatch = {
    getVkUserInfo: fetchVkUserInfoRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootLayout);

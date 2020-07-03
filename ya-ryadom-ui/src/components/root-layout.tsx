import * as React from 'react';
import { Root, ScreenSpinner } from '@vkontakte/vkui';
import MainView from './views/main.view';
import { AppState } from '../store/app-state';
import { connect } from 'react-redux';
import { VIEWS } from '../utils/constants/view.constants';
import { fetchVkUserInfoRequest } from '../store/authentication/actions';
import MyProfileView from "./views/my-profile.view";
import EventsView from "./views/events.view";
import IntroView from "./views/intro.view";

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
        // here we can init data
        const { getVkUserInfo } = this.props;
        getVkUserInfo();
    }

    render() {
        const { activeView, spinnerVisible } = this.props;

        return (
            <Root activeView={activeView} popout={spinnerVisible && <ScreenSpinner />}>
                <IntroView id={VIEWS.INTRO_VIEW}></IntroView>
                <MainView id={VIEWS.MAIN_VIEW}></MainView>
                <MyProfileView id={VIEWS.MY_PROFILE_VIEW}></MyProfileView>
                <EventsView id={VIEWS.EVENTS_NEAR_ME_VIEW}></EventsView>
            </Root>
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

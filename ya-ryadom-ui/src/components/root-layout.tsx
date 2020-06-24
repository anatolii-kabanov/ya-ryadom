import * as React from 'react';
import { Root } from '@vkontakte/vkui';
import MainView from './views/main.view';
import { AppState } from '../store/app-state';
import { connect } from 'react-redux';
import { VIEWS } from '../utils/constants/view.constants';
import { fetchVkUserInfoRequest, fetchUserGeoRequest } from '../store/authentication/actions';
import MyProfileView from "./views/my-profile.view";
import PeopleNearMeView from "./views/people-near-me.view";
import IntroView from "./views/intro.view";

interface PropsFromState {
    activeView: string;
    currentUserId: number;
    guideCompleted: boolean;
    isLoading: boolean;
}

interface PropsFromDispatch {
    getVkUserInfo: typeof fetchVkUserInfoRequest,
    getGeoData: typeof fetchUserGeoRequest,
}


type AllProps = PropsFromState & PropsFromDispatch;

class RootLayout extends React.Component<AllProps>  {

    componentDidMount() {
        // here we can init data
        const { getVkUserInfo, getGeoData } = this.props;
        getVkUserInfo();
        getGeoData();
    }

    render() {
        let { activeView, guideCompleted, isLoading } = this.props;

        return (
            <Root activeView={activeView}>
                <IntroView id={VIEWS.INTRO_VIEW}></IntroView>
                <MainView id={VIEWS.MAIN_VIEW}></MainView>
                <MyProfileView id={VIEWS.MY_PROFILE_VIEW}></MyProfileView>
                <PeopleNearMeView id={VIEWS.PEOPLE_NEAR_ME_VIEW}></PeopleNearMeView>
            </Root>
        )
    }
}

const mapStateToProps = ({ history, authentication }: AppState) => ({
    activeView: history.currentViewPanel.view,
    currentUserId: authentication.vkUserInfo?.id,
    guideCompleted: authentication.currentUser?.guideCompleted,
    isLoading: !authentication.currentUser
})

const mapDispatchToProps: PropsFromDispatch = {
    getVkUserInfo: fetchVkUserInfoRequest,
    getGeoData: fetchUserGeoRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootLayout);

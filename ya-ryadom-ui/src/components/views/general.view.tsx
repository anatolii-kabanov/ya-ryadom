import React from 'react';
import { ScreenSpinner, View } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { PANELS } from '../../utils/constants/panel.constants';
import MyEventCreatePanel from '../panels/my-event-create.panel';
import ProfilePanel from "../panels/profile/user-profile.panel";
import UserEventsPanel from "../panels/events/user-events.panel";

interface PropsFromState {
    id: string;
    activePanel: string;
    popout: any;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

class GeneralView extends React.Component<AllProps>  {

    public componentDidMount() {

    }

    render() {
        const { id, activePanel, popout } = this.props;
        return (
            <View id={id} activePanel={activePanel} popout={popout}>
                <ProfilePanel id={PANELS.PROFILE_PANEL}></ProfilePanel>
                <MyEventCreatePanel id={PANELS.CREATE_EVENT_PANEL}></MyEventCreatePanel>
                <UserEventsPanel id={PANELS.USER_EVENTS_PANEL}></UserEventsPanel>
            </View>
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activePanel: history.currentViewPanel.panel
})

const mapDispatchToProps: PropsFromDispatch = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GeneralView);

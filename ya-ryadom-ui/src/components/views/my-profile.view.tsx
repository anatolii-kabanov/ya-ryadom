import React from 'react';
import { connect } from 'react-redux';
import { View } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import MyProfilePanel from "../panels/profile/my-profile.panel";
import {AppState} from "../../store/app-state";
import MyEventCreatePanel from '../panels/my-event-create.panel';


interface PropsFromState {
    id: string;
    activePanel: string;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

export class MyProfileView extends React.Component<AllProps>  {
    render() {
        const { id, activePanel } = this.props;
        return (
            <View id={id} activePanel={activePanel}>
                <MyProfilePanel id={PANELS.MY_PROFILE_PANEL}></MyProfilePanel>
                <MyEventCreatePanel id={PANELS.CREATE_EVENT_PANEL}></MyEventCreatePanel>
            </View>
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activePanel: history.currentViewPanel.panel,
})

const mapDispatchToProps: PropsFromDispatch = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfileView);

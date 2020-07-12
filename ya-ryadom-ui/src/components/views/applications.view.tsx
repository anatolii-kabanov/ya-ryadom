import React from 'react';
import { connect } from 'react-redux';
import { View } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from "../../store/app-state";
import MyApplicationsPanel from '../panels/applications/my-applications.panel';
import ApplicationsToMePanel from '../panels/applications/applications-to-me.panel';

interface PropsFromState {
    id: string;
    activePanel: string;
    popout: any;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

export class ApplicationsView extends React.Component<AllProps>  {
    render() {
        const { id, activePanel, popout } = this.props;
        return (
            <View id={id} activePanel={activePanel} popout={popout}>
                <MyApplicationsPanel id={PANELS.MY_APPLICATIONS_PANEL}></MyApplicationsPanel>
                <ApplicationsToMePanel id={PANELS.APPLICATIONS_TO_ME_PANEL}></ApplicationsToMePanel>
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
)(ApplicationsView);

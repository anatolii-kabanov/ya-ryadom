import React from 'react';
import { connect } from 'react-redux';
import { View } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from "../../store/app-state";
import ApplicationsPanel from '../panels/applications/applications.panel';
import ApplicationsReviewModal from '../modals/applications-review.modal';

interface PropsFromState {
    id: string;
    activePanel: string;
    popout: any;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    
}

export class ApplicationsView extends React.Component<AllProps, State>  {

    render() {
        const { id, activePanel, popout } = this.props;
        return (
            <View id={id} activePanel={activePanel} popout={popout} modal={
                <ApplicationsReviewModal/>
            }>
                <ApplicationsPanel id={PANELS.APPLICATIONS_PANEL}></ApplicationsPanel>
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

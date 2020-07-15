import React from 'react';
import { connect } from 'react-redux';
import { View } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from "../../store/app-state";
import ApplicationsPanel from '../panels/applications/applications.panel';
import ApplicationsReviewModal from '../modals/applications-review.modal';
import {MODALS} from "../../utils/constants/modal.constants";

interface PropsFromState {
    id: string;
    activePanel: string;
    popout: any;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    activeModal: string | null; // VK modal use null to hide it
}

export class ApplicationsView extends React.Component<AllProps, State>  {
    constructor(props) {
        super(props);
        this.state = {
            activeModal: null
        };

        this.openCreationReview = this.openCreationReview.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    openCreationReview() {
        this.setState({ activeModal: MODALS.APPLICATION_REVIEW })
    }

    onClose(updateEvents?: boolean) {
        this.setState({ activeModal: null });
    }

    render() {
        const { id, activePanel, popout } = this.props;
        return (
            <View id={id} activePanel={activePanel} popout={popout} modal={
                <ApplicationsReviewModal activeModal={this.state.activeModal} onClose={this.onClose}/>
            }>
                <ApplicationsPanel id={PANELS.APPLICATIONS_PANEL} openCreationReview={this.openCreationReview}></ApplicationsPanel>
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

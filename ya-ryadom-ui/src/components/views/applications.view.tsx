import React from 'react';
import { connect } from 'react-redux';
import vkBridge from '@vkontakte/vk-bridge';
import { View, ActionSheet, ActionSheetItem, platform, IOS } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from "../../store/app-state";
import ApplicationsPanel from '../panels/applications/applications.panel';
import ApplicationsReviewModal from '../modals/applications-review.modal';
import { revokeEventRequest } from '../../store/events/my-events/actions';

const osname = platform();

interface PropsFromState {
    id: string;
    activePanel: string;
    popout: any;
}

interface PropsFromDispatch {
    revokeMyEvent: typeof revokeEventRequest
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {

}

export class ApplicationsView extends React.Component<AllProps, State>  {

    state = {
        popout: null,
    }

    shareEvent = (eventId: number) => {
        //TODO need to make const
        vkBridge.send('VKWebAppShare', { 'link': `https://vk.com/app7508849#${eventId}` })
    }

    revokeMyEvent = (eventId: number) => {
        const { revokeMyEvent } = this.props;
        revokeMyEvent(eventId);
    }

    openBase = (eventId) => {
        this.setState({
            popout:
                <ActionSheet onClose={() => this.setState({ popout: null })}>
                    <ActionSheetItem autoclose onClick={() => this.shareEvent(eventId)}>
                        Поделиться
                    </ActionSheetItem>
                    <ActionSheetItem autoclose onClick={() => this.revokeMyEvent(eventId)}>
                        Отменить событие
                    </ActionSheetItem>
                    {osname === IOS && <ActionSheetItem autoclose mode="cancel">Назад</ActionSheetItem>}
                </ActionSheet>
        });
    }


    render() {
        const { id, activePanel, popout } = this.props;

        return (
            <View id={id} activePanel={activePanel} popout={popout ?? this.state.popout} modal={
                <ApplicationsReviewModal />
            }>
                <ApplicationsPanel id={PANELS.APPLICATIONS_PANEL} openBase={this.openBase}></ApplicationsPanel>
            </View>
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activePanel: history.currentViewPanel.panel,
})

const mapDispatchToProps: PropsFromDispatch = {
    revokeMyEvent: revokeEventRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsView);

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

interface OwnProps {
    id: string;
    popout?: any;
}

interface PropsFromState {
    activePanel: string;
}

interface PropsFromDispatch {
    revokeMyEvent: typeof revokeEventRequest
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {
    popout: any;
}

export class ApplicationsView extends React.Component<AllProps, State>  {

    constructor(props: AllProps) {
        super(props);
        this.state = {
            popout: null,
        };
    }

    shareEvent = (eventId: number) => {
        const app = process.env.NODE_ENV === 'development' ? 'app7528592' : 'app7508849';
        vkBridge.send('VKWebAppShare', { 'link': `https://vk.com/${app}#eventId=${eventId}` })
    }

    revokeMyEvent = (eventId: number) => {
        const { revokeMyEvent } = this.props;
        revokeMyEvent(eventId);
    }

    openBase = (eventId: number) => {
        this.setState({
            popout:
                <ActionSheet onClose={() => this.setState({ popout: null })}>
                    <ActionSheetItem autoclose onClick={() => this.shareEvent(eventId)}>
                        Поделиться
                    </ActionSheetItem>
                    <ActionSheetItem autoclose onClick={() => this.revokeMyEvent(eventId)} mode="destructive">
                        Отменить событие
                    </ActionSheetItem>
                    {osname === IOS && <ActionSheetItem autoclose mode="cancel">Назад</ActionSheetItem>}
                </ActionSheet>
        });
    }


    render() {
        const { id, activePanel, popout } = this.props;

        return (
            <View id={id} activePanel={activePanel} popout={popout || this.state.popout} modal={
                <ApplicationsReviewModal />
            }>
                <ApplicationsPanel id={PANELS.APPLICATIONS_PANEL} openBase={this.openBase}></ApplicationsPanel>
            </View>
        )
    }
}

const mapStateToProps = ({ history }: AppState, ownProps: OwnProps) => ({
    activePanel: history.currentViewPanel.panel,
    id: ownProps.id,
    popout: ownProps.popout
})

const mapDispatchToProps: PropsFromDispatch = {
    revokeMyEvent: revokeEventRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsView);

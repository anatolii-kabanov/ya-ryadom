import React from 'react';
import { connect } from 'react-redux';
import vkBridge from '@vkontakte/vk-bridge';
import { View, ActionSheet, ActionSheetItem, platform, IOS } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from "../../store/app-state";
import ApplicationsPanel from '../panels/applications/applications.panel';
import ApplicationsReviewModal from '../modals/applications-review.modal';
import Icon28WriteOutline from '@vkontakte/icons/dist/28/write_outline';
import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import Icon28DeleteOutline from '@vkontakte/icons/dist/28/delete_outline';

const osname = platform();

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

    state = {
        popout: null,
    }

    shareEvent = (eventId) => {
        //TODO need to make const
        vkBridge.send('VKWebAppShare', {'link': `https://vk.com/app7508849#${eventId}`})
    }

    openBase = (eventId) => {
        console.log(eventId)
        this.setState({ popout:
                <ActionSheet onClose={() => this.setState({ popout: null })}>
                    {/*<ActionSheetItem autoclose>*/}
                    {/*    Редактировать событие*/}
                    {/*</ActionSheetItem>*/}
                    <ActionSheetItem autoclose onClick={() => this.shareEvent(eventId)}>
                        Поделиться
                    </ActionSheetItem>
                    {/*<ActionSheetItem autoclose>*/}
                    {/*    Удалить событие*/}
                    {/*</ActionSheetItem>*/}
                    {osname === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
                </ActionSheet>
        });
    }


    render() {
        const { id, activePanel, popout } = this.props;
        //TODO Fix spinner popout
        return (
            <View id={id} activePanel={activePanel} popout={this.state.popout} modal={
                <ApplicationsReviewModal/>
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsView);

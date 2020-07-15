import React from 'react';
import { View } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { PANELS } from '../../utils/constants/panel.constants';
import MyProfileEditThemesPanel from "../panels/profile/my-profile-edit-themes.panel";
import MyEventCreatePanel from '../panels/my-event-create.panel';

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
                <MyEventCreatePanel id={PANELS.CREATE_EVENT_PANEL}></MyEventCreatePanel>
                <MyProfileEditThemesPanel id={PANELS.MY_PROFILE_EDIT_THEMES_PANEL}></MyProfileEditThemesPanel>
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

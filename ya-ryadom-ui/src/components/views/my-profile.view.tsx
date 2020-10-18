import React from 'react';
import { connect } from 'react-redux';
import { View } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import MyProfilePanel from "../panels/profile/my-profile.panel";
import MyProfileEditPanel from "../panels/profile/my-profile-edit.panel";
import { AppState } from "../../store/app-state";
import { goBack } from '../../store/history/actions';

interface OwnProps {
    id: string;
    popout?: any;
}

interface PropsFromState {
    activePanel: string;
}

interface PropsFromDispatch {
    goBack: typeof goBack;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

export class MyProfileView extends React.Component<AllProps>  {
    render() {
        const { id, activePanel, popout, goBack } = this.props;
        return (
            <View id={id} activePanel={activePanel} popout={popout} onSwipeBack={goBack}>
                <MyProfilePanel id={PANELS.MY_PROFILE_PANEL}></MyProfilePanel>
                <MyProfileEditPanel id={PANELS.MY_PROFILE_EDIT_PANEL}></MyProfileEditPanel>
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
    goBack: goBack,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfileView);

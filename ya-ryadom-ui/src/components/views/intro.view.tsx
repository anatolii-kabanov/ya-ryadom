import React from 'react';
import { View } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import HelloIntroPanel from "../panels/intro/hello-intro.panel";

interface PropsFromState {
    id: string;
    activePanel: string;
}

interface PropsFromDispatch {
}


type AllProps = PropsFromState & PropsFromDispatch;

class IntroView extends React.Component<AllProps>  {
    render() {
        let { id, activePanel } = this.props;

        return (
            <View id={id} activePanel={activePanel}>
                <HelloIntroPanel id={PANELS.INTRO_PANEL}></HelloIntroPanel>
            </View>
        )
    }
}

const mapStateToProps = ({ history, authentication }: AppState) => ({
    activePanel: history.currentViewPanel.panel,
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntroView);

import React from 'react';
import { View } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import HelloIntroPanel from '../panels/intro/hello-intro.panel';
import ThemesIntroPanel from '../panels/intro/themes-intro.panel';
import SelectCityIntroPanel from '../panels/intro/select-city-intro.panel';

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
                <HelloIntroPanel id={PANELS.HELLO_INTRO_PANEL}></HelloIntroPanel>
                <ThemesIntroPanel id={PANELS.THEMES_INTRO_PANEL}></ThemesIntroPanel>
                <SelectCityIntroPanel id={PANELS.SELECT_CITY_INTRO_PANEL}></SelectCityIntroPanel>
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

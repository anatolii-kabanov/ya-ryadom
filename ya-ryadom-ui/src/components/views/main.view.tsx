import React from 'react';
import { View } from '@vkontakte/vkui';
import MenuPanel from '../panels/menu.panel';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';

interface PropsFromState {
    id: string;
    activePanel: string;
}

interface PropsFromDispatch {
}


type AllProps = PropsFromState & PropsFromDispatch;

class MainView extends React.Component<AllProps>  {
    render() {
        const { id, activePanel } = this.props;
        return (
            <View id={id} activePanel={activePanel}>
                <MenuPanel id={PANELS.MENU_PANEL}>

                </MenuPanel>
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
)(MainView);

import './select-city-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';

interface PropsFromState {
    id: string,
}

interface PropsFromDispatch {
   
}

type AllProps = PropsFromState & PropsFromDispatch;

class SelectCityIntroPanel extends React.Component<AllProps>  {

    componentDidMount() {
        
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="select-city-intro-panel">
                <PanelHeader>
                    Выберите город
                </PanelHeader>
                <Group className="select-city-group">
                    
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({
    
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectCityIntroPanel);

import './select-city-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Button,
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

    
    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
    }

    componentDidMount() {

    }

    onClickNext = () => {
        
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="select-city-intro-panel">
                <PanelHeader>
                    Выберите город
                </PanelHeader>
                <Group className="select-city-group">
                    <Button className="btn-primary" size="xl" onClick={this.onClickNext}>Продолжить</Button>
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

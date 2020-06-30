import './select-city-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Button,
    Div,
    Title,
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import AutocompleteMap from '../../inputs/autocomplete-map.input';
import { Position } from '../../../store/authentication/models';
import { saveUserLocationRequest } from '../../../store/authentication/actions';

interface PropsFromState {
    id: string,
}

interface PropsFromDispatch {
    saveLocation: typeof saveUserLocationRequest
}

interface State {
    userLocation: Position | null;
}

type AllProps = PropsFromState & PropsFromDispatch;

class SelectCityIntroPanel extends React.Component<AllProps, State>  {



    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onLocationChanged = this.onLocationChanged.bind(this);
    }

    onClickNext = () => {
        const { saveLocation } = this.props;
        const { userLocation } = this.state;
        if (userLocation)
            saveLocation(userLocation);
    }

    onLocationChanged = (location: Position) => {
        this.setState({
            userLocation: location
        })
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="select-city-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <Div><Title level="3" weight="bold" className="title text-center">Выберите город</Title ></Div>
                <Group>
                    <AutocompleteMap onLocationChanged={this.onLocationChanged}></AutocompleteMap>
                </Group>
                <Group>
                    <Div className="btn-container-bottom">
                        <Button className="btn-primary" size="xl" onClick={this.onClickNext}>Далее</Button>
                    </Div>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    saveLocation: saveUserLocationRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectCityIntroPanel);

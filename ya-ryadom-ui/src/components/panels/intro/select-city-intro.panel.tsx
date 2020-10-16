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
import { setUserDefaultLocation } from '../../../store/authentication/actions';
import { goForward } from '../../../store/history/actions';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/constants/view.constants';
import { PANELS } from '../../../utils/constants/panel.constants';

interface OwnProps {
    id: string;
}

interface PropsFromState {
    isOnline: boolean;
}

interface PropsFromDispatch {
    setUserDefaultLocation: typeof setUserDefaultLocation,
    goForward: typeof goForward,
}

interface State {
    userLocation: Position | null;
    address: string;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class SelectCityIntroPanel extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
            address: ''
        };
        this.onClickNext = this.onClickNext.bind(this);
        this.onLocationChanged = this.onLocationChanged.bind(this);
    }

    onClickNext = () => {
        const { setUserDefaultLocation, goForward } = this.props;
        const { userLocation } = this.state;
        if (userLocation) {
            setUserDefaultLocation(userLocation);
            goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.THEMES_INTRO_PANEL));
        }
    }

    onLocationChanged = (location: Position, address: string) => {
        this.setState({
            userLocation: location,
            address: address
        })
    }

    render() {
        const { id, isOnline } = this.props;
        const { userLocation, address } = this.state;
        return (
            <Panel id={id} className="select-city-intro-panel">
                <PanelHeader separator={false}>
                </PanelHeader>
                <Div><Title level="3" weight="bold" className="title text-center">Выберите город</Title ></Div>
                <Group separator="hide">
                    <Div>
                        <AutocompleteMap isOnline={isOnline} type="(cities)" address={address} loadMaps={true} onLocationChanged={this.onLocationChanged}></AutocompleteMap>
                    </Div>
                </Group>
                <Group separator="hide" className="btn-next-container">
                        <Button className="btn-primary" size="xl" onClick={this.onClickNext} disabled={!userLocation}>Далее</Button>                  
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ ui }: AppState, ownProps: OwnProps) => ({
    isOnline: ui.settings.isOnline,
    id: ownProps.id
})

const mapDispatchToProps: PropsFromDispatch = {
    setUserDefaultLocation: setUserDefaultLocation,
    goForward: goForward
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectCityIntroPanel);

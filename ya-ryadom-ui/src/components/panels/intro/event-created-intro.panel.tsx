import './event-created-intro.panel.scss';
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
import { goForward } from '../../../store/history/actions';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/constants/view.constants';
import { PANELS } from '../../../utils/constants/panel.constants';
import { ReactComponent as IntroImage } from '../../../assets/images/svg/hello-intro.svg';

interface PropsFromState {
    id: string,
}

interface PropsFromDispatch {
    goForward: typeof goForward
}

interface State {

}

type AllProps = PropsFromState & PropsFromDispatch;

class EventCreatedIntroPanel extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
    }

    onClickNext = () => {
        const { goForward } = this.props;
        goForward(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_MAP_PANEL));
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="event-created-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <Div><Title level="3" weight="bold" className="title text-center">Ваше событие создано!</Title ></Div>
                <Group>
                    <Div className="intro-image text-center">
                        <IntroImage></IntroImage>
                    </Div>
                </Group>
                <Group>
                    <Div className="btn-container-bottom">
                        <Button className="btn-primary" size="xl" onClick={this.onClickNext}>Каталог событий</Button>
                    </Div>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    goForward: goForward
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventCreatedIntroPanel);

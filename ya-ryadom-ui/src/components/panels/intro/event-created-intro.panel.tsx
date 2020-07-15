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
import { ReactComponent as IntroFinishedImage } from '../../../assets/images/svg/intro-finished.svg';
import { TABS } from '../../../utils/constants/tab.constants';

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
        goForward(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_PANEL, TABS.EVENTS_MAP));
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="event-created-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <Group className="intro-image text-center" separator="hide">
                    <IntroFinishedImage></IntroFinishedImage>
                </Group>
                <Group className="intro-text" separator="hide">
                    <p className="first-row-text">Поздравляем!<br/>Ваше первое событие создано.</p>
                </Group>
                <Group className="btn-container-bottom">
                    <Button className="btn-primary" size="xl" onClick={this.onClickNext}>Каталог событий</Button>
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

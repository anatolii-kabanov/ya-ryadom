import './completed-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Button,
    Placeholder,
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { goForward } from '../../../store/history/actions';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/constants/view.constants';
import { PANELS } from '../../../utils/constants/panel.constants';
import { ReactComponent as IntroFinishedImage } from '../../../assets/images/svg/intro-finished.svg';
import { TABS } from '../../../utils/constants/tab.constants';

interface OwnProps {
    id: string;
}

interface PropsFromState {
}

interface PropsFromDispatch {
    goForward: typeof goForward
}

interface State {

}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class CompletedIntroPanel extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onCreateEventClick = this.onCreateEventClick.bind(this);
    }

    onClickNext = () => {
        const { goForward } = this.props;
        goForward(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_PANEL, TABS.EVENTS_MAP));
    }

    onCreateEventClick = () => {
        const { goForward } = this.props;
        // Just because after create event user returning back on previous page.
        goForward(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_PANEL, TABS.EVENTS_MAP));
        goForward(new VkHistoryModel(VIEWS.MY_EVENT_CREATE_VIEW, PANELS.CREATE_EVENT_PANEL));
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="completed-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <Group className="intro-image text-center" separator="hide">
                    <IntroFinishedImage></IntroFinishedImage>
                </Group>
                <Placeholder
                    header="Поздравляем!">
                    Профиль успешно заполнен.
                </Placeholder>
                <Group className="btn-container-bottom">
                    <Button className="btn-primary" size="xl" onClick={this.onCreateEventClick}>Создать событие</Button>
                    <Button className="btn-primary" size="xl" onClick={this.onClickNext}>Пропустить</Button>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState, ownProps: OwnProps) => ({
    id: ownProps.id
})

const mapDispatchToProps: PropsFromDispatch = {
    goForward: goForward
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompletedIntroPanel);

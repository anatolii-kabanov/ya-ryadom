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
import {
    reset,
    setCurrentView,
} from '../../../store/history/actions';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/enums/views.enum';
import { PANELS } from '../../../utils/enums/panels.enum';
import { ReactComponent as IntroFinishedImage } from '../../../assets/images/svg/intro-finished.svg';
import { TABS } from '../../../utils/enums/tabs.enum';

interface OwnProps {
    id: string;
}

interface PropsFromState {}

interface PropsFromDispatch {
    reset: typeof reset;
    setCurrentView: typeof setCurrentView;
}

interface State {}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class CompletedIntroPanel extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onCreateEventClick = this.onCreateEventClick.bind(this);
    }

    onClickNext = () => {
        const { reset } = this.props;
        reset(
            new VkHistoryModel(
                VIEWS.EVENTS_NEAR_ME_VIEW,
                PANELS.EVENTS_NEAR_ME_PANEL,
                TABS.EVENTS_MAP,
            ),
        );
    };

    onCreateEventClick = () => {
        const { reset, setCurrentView } = this.props;
        // Just because after create event user returning back on previous page.
        reset(
            new VkHistoryModel(
                VIEWS.EVENTS_NEAR_ME_VIEW,
                PANELS.EVENTS_NEAR_ME_PANEL,
                TABS.EVENTS_MAP,
            ),
        );
        setCurrentView(VIEWS.MY_EVENT_CREATE_VIEW);
    };

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className='completed-intro-panel'>
                <PanelHeader separator={false}></PanelHeader>
                <Group className='intro-image text-center' separator='hide'>
                    <IntroFinishedImage></IntroFinishedImage>
                </Group>
                <Placeholder header='Поздравляем!'>
                    Профиль успешно заполнен.
                </Placeholder>
                <Group separator='hide'>
                    <Button
                        className='btn-primary'
                        size='xl'
                        onClick={this.onCreateEventClick}
                    >
                        Создать событие
                    </Button>
                    <Button
                        className='btn-primary'
                        size='xl'
                        onClick={this.onClickNext}
                    >
                        Пропустить
                    </Button>
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = ({}: AppState, ownProps: OwnProps) => ({
    id: ownProps.id,
});

const mapDispatchToProps: PropsFromDispatch = {
    setCurrentView: setCurrentView,
    reset: reset,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompletedIntroPanel);

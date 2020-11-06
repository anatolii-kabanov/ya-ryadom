import React from 'react';
import { Panel, Group, PanelHeader } from '@vkontakte/vkui';
import EventForm from '../forms/event.form';
import { connect } from 'react-redux';
import { AppState } from '../../store/app-state';
import { saveMyEventGeneralRequest } from '../../store/events/my-events/actions';
import { scrollToIdPosition, setScroll } from '../../store/ui/scroll/actions';
import { PANELS } from '../../utils/enums/panels.enum';

interface OwnProps {
    id: PANELS;
}

interface PropsFromState {}

interface PropsFromDispatch {
    saveEvent: typeof saveMyEventGeneralRequest;
    setScroll: typeof setScroll;
    scrollToIdPosition: typeof scrollToIdPosition;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class MyEventCreatePanel extends React.Component<AllProps> {
    componentDidMount() {
        const { scrollToIdPosition, id } = this.props;
        scrollToIdPosition(id);
    }

    componentWillUnmount() {
        const { setScroll, id } = this.props;
        setScroll({ id, position: window.scrollY });
    }

    render() {
        const { id, saveEvent } = this.props;
        return (
            <Panel id={id}>
                <PanelHeader separator={false}>Создание события</PanelHeader>
                <Group separator='hide'>
                    <EventForm onSave={saveEvent}></EventForm>
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = ({}: AppState, ownProps: OwnProps) => ({
    id: ownProps.id,
});

const mapDispatchToProps: PropsFromDispatch = {
    saveEvent: saveMyEventGeneralRequest,
    setScroll: setScroll,
    scrollToIdPosition: scrollToIdPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEventCreatePanel);

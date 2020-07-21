import React from 'react';
import { Panel, Group, PanelHeader } from '@vkontakte/vkui';
import EventForm from '../forms/event.form';
import { connect } from 'react-redux';
import { AppState } from '../../store/app-state';
import MainHeaderPanel from "./headers/main.header";
import { saveMyEventGeneralRequest } from '../../store/events/my-events/actions';

interface PropsFromState {
    id: string;
}

interface PropsFromDispatch {
    saveEvent: typeof saveMyEventGeneralRequest
}


type AllProps = PropsFromState & PropsFromDispatch;

class MyEventCreatePanel extends React.Component<AllProps>  {
    render() {
        const { id, saveEvent } = this.props;
        return (
            <Panel id={id}>
                <PanelHeader>Создание события</PanelHeader>
                <Group>
                    <EventForm onSave={saveEvent}></EventForm>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    saveEvent: saveMyEventGeneralRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyEventCreatePanel);

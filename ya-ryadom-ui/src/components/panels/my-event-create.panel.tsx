import React from 'react';
import { Panel, Group, PanelHeader } from '@vkontakte/vkui';
import EventForm from '../forms/event.form';
import { connect } from 'react-redux';
import { AppState } from '../../store/app-state';
import { saveMyEventGeneralRequest } from '../../store/events/my-events/actions';

interface OwnProps {
    id: string;
}

interface PropsFromState {
}

interface PropsFromDispatch {
    saveEvent: typeof saveMyEventGeneralRequest
}


type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class MyEventCreatePanel extends React.Component<AllProps>  {
    render() {
        const { id, saveEvent } = this.props;
        return (
            <Panel id={id}>
                <PanelHeader separator={false}>Создание события</PanelHeader>
                <Group separator="hide">
                    <EventForm onSave={saveEvent}></EventForm>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState, ownProps: OwnProps) => ({
    id: ownProps.id
})

const mapDispatchToProps: PropsFromDispatch = {
    saveEvent: saveMyEventGeneralRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyEventCreatePanel);

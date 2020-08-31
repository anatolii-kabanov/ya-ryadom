import React from 'react';
import { Panel, Group } from '@vkontakte/vkui';
import EventForm from '../../forms/event.form';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import MainHeaderPanel from "../headers/main.header";
import { saveMyEventIntroRequest } from '../../../store/events/my-events/actions';

interface PropsFromState {
    id: string;
}

interface PropsFromDispatch {
    saveEvent: typeof saveMyEventIntroRequest
}


type AllProps = PropsFromState & PropsFromDispatch;

class CreateFirstEventIntroPanel extends React.Component<AllProps>  {
    
    render() {
        const { id, saveEvent } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text='Создание события'></MainHeaderPanel>
                <Group separator="hide">
                    <EventForm onSave={saveEvent}></EventForm>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    saveEvent: saveMyEventIntroRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateFirstEventIntroPanel);
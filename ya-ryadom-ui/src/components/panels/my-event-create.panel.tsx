import React from 'react';
import { Panel, Group } from '@vkontakte/vkui';
import EventForm from '../forms/event.form';
import { goBack } from '../../store/history/actions';
import { connect } from 'react-redux';
import { AppState } from '../../store/app-state';
import MainHeaderPanel from "./headers/main.header";

interface PropsFromState {
    id: string;
}

interface PropsFromDispatch {
    goBack: typeof goBack;
}


type AllProps = PropsFromState & PropsFromDispatch;

class MyEventCreatePanel extends React.Component<AllProps>  {
    render() {
        const { id } = this.props;
        return (
            <Panel id={id}>
                 <MainHeaderPanel text='Создание события'></MainHeaderPanel>
                <Group>
                    <EventForm></EventForm>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({
    
})

const mapDispatchToProps: PropsFromDispatch = {
    goBack: goBack,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyEventCreatePanel);
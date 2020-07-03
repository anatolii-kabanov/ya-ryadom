import React from 'react';
import { Panel, Group } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import MainHeaderPanel from "./../headers/main.header";

interface PropsFromState {
    id: string;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

class MyApplicationsPanel extends React.Component<AllProps>  {
    render() {
        const { id } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text='Мои заявки'></MainHeaderPanel>
                <Group>
                    
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyApplicationsPanel);
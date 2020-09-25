import React from 'react';
import { Panel, Group } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import MainHeaderPanel from "./../headers/main.header";

interface OwnProps {
    id: string;
}

interface PropsFromState {

}

interface PropsFromDispatch {
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {

}

class MyReviewsPanel extends React.Component<AllProps, State>  {

    /**
     *
     */
    constructor(props: AllProps) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text='Отзывы' />
                <Group>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState, ownProps: OwnProps) => ({
    id: ownProps.id,
})

const mapDispatchToProps: PropsFromDispatch = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyReviewsPanel);
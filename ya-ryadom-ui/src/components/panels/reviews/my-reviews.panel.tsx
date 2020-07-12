import React from 'react';
import { Panel, Group } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import MainHeaderPanel from "./../headers/main.header";
import ReviewForm from '../../forms/review.form';

interface PropsFromState {
    id: string;
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {

}

class MyReviewsPanel extends React.Component<AllProps, State>  {

    /**
     *
     */
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text='Отзывы'></MainHeaderPanel>
                <Group>
                    <ReviewForm></ReviewForm>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyReviewsPanel);
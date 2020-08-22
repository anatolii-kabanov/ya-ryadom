import './application-review.modal.scss';
import React from 'react';
import {
    ModalPage,
} from '@vkontakte/vkui';
import { AppState } from './../../store/app-state';
import { connect } from 'react-redux';
import { MODALS } from '../../utils/constants/modal.constants';
import ComplaintForm from '../forms/complaint.form';
import { setActiveModal } from '../../store/history/actions';

interface PropsFromState {
}

interface PropsFromDispatch {
    setActiveModal: typeof setActiveModal
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
}

class ComplaintReviewModal extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
    }

    onSave = () => {

    }

    render() {
        const { setActiveModal } = this.props;
        return (
            <ModalPage id={MODALS.APPLICATION_REVIEW}
                className="complaint-modal"
                onClose={() => setActiveModal(null)}
                header="Отправить жалобу">
                <ComplaintForm onSave={this.onSave} />
            </ModalPage>
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    
})

const mapDispatchToProps: PropsFromDispatch = {
    setActiveModal: setActiveModal
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplaintReviewModal);

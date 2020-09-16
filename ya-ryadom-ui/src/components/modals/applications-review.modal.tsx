import './application-review.modal.scss';
import React from 'react';
import {
    ModalCard,
    ModalRoot,
} from '@vkontakte/vkui';
import { AppState } from './../../store/app-state';
import { connect } from 'react-redux';
import { MODALS } from '../../utils/constants/modal.constants';
import ReviewForm from '../forms/review.form';
import { ReviewModel } from '../../store/reviews/models';
import { addReviewRequest } from '../../store/reviews/actions';
import { setActiveModal } from '../../store/history/actions';

interface PropsFromState {
    activeModal: string;
}

interface PropsFromDispatch {
    addReview: typeof addReviewRequest,
    setActiveModal: typeof setActiveModal
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
}

class ApplicationsReviewModal extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.onSaveReview = this.onSaveReview.bind(this);
    }

    onSaveReview = (userReview: ReviewModel) => {
        const { addReview } = this.props;
        addReview(userReview);
    }

    render() {
        const { activeModal, setActiveModal } = this.props;
        return (
            <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
                <ModalCard id={MODALS.APPLICATION_REVIEW}
                    className="application-review-modal"
                    onClose={() => setActiveModal(null)}
                    header="Оцени, как прошла встреча"
                    caption="Пользователь не увидит, какую оценку вы ему поставили">
                    <ReviewForm onSave={this.onSaveReview} />
                </ModalCard>
            </ModalRoot>
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activeModal: history.currentModal
})

const mapDispatchToProps: PropsFromDispatch = {
    addReview: addReviewRequest,
    setActiveModal: setActiveModal
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsReviewModal);

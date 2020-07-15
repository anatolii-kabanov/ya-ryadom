import './application-review.modal.scss';
import React from 'react';
import {
    FormLayout,
    Input,
    ModalCard,
    ModalRoot,
} from '@vkontakte/vkui';
import { AppState } from './../../store/app-state';
import { connect } from 'react-redux';
import { MODALS } from '../../utils/constants/modal.constants';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import ReviewForm from '../forms/review.form';

interface PropsFromState {
    activeModal: string;
    onClose: (updateEvents?: boolean) => void;
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    text: string;
}

class ApplicationsReviewModal extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    render() {
        const { activeModal, onClose } = this.props;
        const { text } = this.state;
        return (
            <ModalRoot activeModal={activeModal} onClose={() => onClose()}>
                <ModalCard id={MODALS.APPLICATION_REVIEW}
                           className="application-review-modal"
                           onClose={() => onClose()}
                           header="Оцени как прошла встреча"
                           caption="Пользователь не увидет какую оценку вы ему поставили">
                    <ReviewForm/>
                </ModalCard>
            </ModalRoot>
        )
    }
}

const mapStateToProps = ({ ui }: AppState) => ({
})

const mapDispatchToProps: PropsFromDispatch = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsReviewModal);
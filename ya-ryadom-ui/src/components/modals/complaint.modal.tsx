import './complaint.modal.scss';
import React from 'react';
import { ModalPage, ModalPageHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { AppState } from './../../store/app-state';
import { connect } from 'react-redux';
import ComplaintsForm from '../forms/complaint.form';
import { setActiveModal } from '../../store/history/actions';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import { sendComplaintToEventRequest } from '../../store/complaints/actions';
import { ComplaintForm } from '../../store/complaints/models';

interface OwnProps {
	id: string;
}

interface PropsFromState {}

interface PropsFromDispatch {
	setActiveModal: typeof setActiveModal;
	sendComplaintToEvent: typeof sendComplaintToEventRequest;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {}

class ComplaintReviewModal extends React.Component<AllProps, State> {
	constructor(props) {
		super(props);
		this.onSave = this.onSave.bind(this);
	}

	onSave = (data: ComplaintForm) => {
		const { sendComplaintToEvent } = this.props;
		sendComplaintToEvent(data);
	};

	render() {
		const { setActiveModal, id } = this.props;
		return (
			<ModalPage
				id={id}
				dynamicContentHeight={true}
				className='complaint-modal'
				onClose={() => setActiveModal(null)}
				header={
					<ModalPageHeader
						right={
							<PanelHeaderButton onClick={() => setActiveModal(null)}>
								<Icon24Dismiss />
							</PanelHeaderButton>
						}
					>
						Отправить жалобу
					</ModalPageHeader>
				}
			>
				<ComplaintsForm onSave={this.onSave} />
			</ModalPage>
		);
	}
}

const mapStateToProps = ({}: AppState, ownProps: OwnProps) => ({
	id: ownProps.id,
});

const mapDispatchToProps: PropsFromDispatch = {
	setActiveModal: setActiveModal,
	sendComplaintToEvent: sendComplaintToEventRequest,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ComplaintReviewModal);

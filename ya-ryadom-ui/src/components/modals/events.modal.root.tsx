import React from 'react';
import {
    ModalRoot
} from '@vkontakte/vkui';
import EventsFilterModal from './events-filter.modal';
import ComplaintModal from './complaint.modal';
import { MODALS } from '../../utils/constants/modal.constants';

interface OwnProps {
    activeModal: string | null;
    onClose: (modalId?: string) => void;
    onCloseFilter: (updateEvents?: boolean) => void;
}

type AllProps = OwnProps;

interface State {
}

export class EventsModalRoot extends React.Component<AllProps, State>  {

    render() {
        const { activeModal, onClose, onCloseFilter } = this.props;
        return (
            <ModalRoot activeModal={activeModal} onClose={onClose}>
                <EventsFilterModal id={MODALS.EVENTS_FILTER} onClose={onCloseFilter} />
                <ComplaintModal id={MODALS.COMPLAINT} />
            </ModalRoot>
        )
    }
}


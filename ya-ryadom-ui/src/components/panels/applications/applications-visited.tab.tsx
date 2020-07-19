import React from 'react';
import {
    Group,
    Button,
    Header,
    RichCell, Avatar
} from '@vkontakte/vkui';

import { AppState } from "../../../store/app-state";
import { connect } from 'react-redux';
import { Application } from '../../../store/applications/models';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import { dateOptions } from '../../../utils/constants/event-date-options.constant';
import { MODALS } from '../../../utils/constants/modal.constants';
import { setActiveModal } from '../../../store/history/actions';
import { setUserToReview } from '../../../store/reviews/actions';
import { SelectedUserToReview } from '../../../store/reviews/models';

interface PropsFromState {
    applications: Application[];
}

interface PropsFromDispatch {
    setActiveModal: typeof setActiveModal,
    setUserToReview: typeof setUserToReview
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
}

export class ApplicationsVisitedTab extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.openReviewModal = this.openReviewModal.bind(this);
    }

    private openReviewModal(userToReview: SelectedUserToReview) {
        const { setActiveModal, setUserToReview } = this.props;
        setUserToReview(userToReview);
        setActiveModal(MODALS.APPLICATION_REVIEW);
    }

    private renderVisitedEvents() {
        const { applications } = this.props;
        if (applications) {
            return applications
                .filter((a) => a.status === ApplicationStatus.visited)
                .map((item, key) => {
                    return <Group key={key} separator="show" className="application-card" header={<Header mode="secondary">{ALL_THEMES.find(m => m.id === item.themeType)?.name}</Header>}>
                        <RichCell
                            disabled
                            multiline
                            before={<Avatar size={48} src={item.vkUserAvatarUrl} />}
                            caption={`${new Date(item.eventDate).toLocaleDateString('ru-RU', dateOptions)} в ${item.eventTime}`}
                            actions={<span className="application-btns"><Button className="btn-primary" onClick={() => this.openReviewModal({ eventId: item.eventId, vkUserId: item.vkUserId, applicationId: item.id })}>Оставить отзыв</Button></span>}
                        >
                            <div className="head">{item.userFullName} <span className="distance">{(item?.distance / 1000).toFixed(2)}км</span></div>
                            <div className="description">{item.text}</div>
                        </RichCell>
                    </Group>
                });
        }
    }


    render() {
        return (
            this.renderVisitedEvents()
        )
    }
}

const mapStateToProps = ({ applications }: AppState) => ({
    applications: applications.mineApplications
})

const mapDispatchToProps: PropsFromDispatch = {
    setActiveModal: setActiveModal,
    setUserToReview: setUserToReview
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsVisitedTab);
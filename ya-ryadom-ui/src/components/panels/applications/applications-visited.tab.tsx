import React from 'react';
import { Group, Button, Header, RichCell, Avatar } from '@vkontakte/vkui';

import { AppState } from '../../../store/app-state';
import { connect } from 'react-redux';
import { Application } from '../../../store/applications/models';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import { dateOptions } from '../../../utils/constants/event-date-options.constant';
import { MODALS } from '../../../utils/constants/modal.constants';
import {
    setActiveModal,
    openUserProfile,
} from '../../../store/history/actions';
import { setUserToReview } from '../../../store/reviews/actions';
import { SelectedUserToReview } from '../../../store/reviews/models';
import EmptyText from '../../general/empty-text';
import {
    scrollToIdPosition,
    setScroll,
} from '../../../store/ui/scroll/actions';
import { TABS } from '../../../utils/enums/tabs.enum';

interface OwnProps {
    id: TABS;
}

interface PropsFromState {
    applications: Application[];
}

interface PropsFromDispatch {
    setActiveModal: typeof setActiveModal;
    setUserToReview: typeof setUserToReview;
    openUserProfile: typeof openUserProfile;
    setScroll: typeof setScroll;
    scrollToIdPosition: typeof scrollToIdPosition;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {}

export class ApplicationsVisitedTab extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);
        this.state = {};
        this.openReviewModal = this.openReviewModal.bind(this);
    }

    componentDidMount() {
        const { scrollToIdPosition, id } = this.props;
        scrollToIdPosition(id);
    }

    componentWillUnmount() {
        const { setScroll, id } = this.props;
        setScroll({ id, position: window.scrollY });
    }

    private openReviewModal(userToReview: SelectedUserToReview) {
        const { setActiveModal, setUserToReview } = this.props;
        setUserToReview(userToReview);
        setActiveModal(MODALS.APPLICATION_REVIEW);
    }

    private renderVisitedEvents() {
        const { applications, openUserProfile } = this.props;
        if (applications) {
            const onlyVisited = applications.filter(
                (a) => a.status === ApplicationStatus.visited,
            );
            return onlyVisited.map((item, index) => {
                return (
                    <Group
                        key={index}
                        separator={
                            index !== onlyVisited.length - 1 ? 'show' : 'hide'
                        }
                        className='application-card'
                        header={
                            <Header mode='secondary'>
                                {
                                    ALL_THEMES.find(
                                        (m) => m.id === item.themeType,
                                    )?.name
                                }
                            </Header>
                        }
                    >
                        <RichCell
                            disabled
                            multiline
                            before={
                                <Avatar
                                    size={48}
                                    src={item.vkUserAvatarUrl}
                                    onClick={() =>
                                        openUserProfile(item.vkUserId)
                                    }
                                />
                            }
                            caption={`${new Date(
                                item.eventDate,
                            ).toLocaleDateString('ru-RU', dateOptions)} в ${
                                item.eventTime
                            }`}
                            actions={
                                <span className='application-btns'>
                                    <Button
                                        className='btn-primary'
                                        onClick={() =>
                                            this.openReviewModal({
                                                eventId: item.eventId,
                                                vkUserId: item.vkUserId,
                                                applicationId: item.id,
                                            })
                                        }
                                    >
                                        Оставить отзыв
                                    </Button>
                                </span>
                            }
                        >
                            <div className='head'>
                                {item.userFullName}{' '}
                                <span className='distance'>
                                    {(item?.distance / 1000).toFixed(2)}км
                                </span>
                            </div>
                            <div className='description'>{item.text}</div>
                        </RichCell>
                    </Group>
                );
            });
        }
    }

    render() {
        const { applications } = this.props;
        return applications?.filter(
            (a) => a.status === ApplicationStatus.visited,
        ).length > 0 ? (
            this.renderVisitedEvents()
        ) : (
            <EmptyText />
        );
    }
}

const mapStateToProps = ({ applications }: AppState, ownProps: OwnProps) => ({
    applications: applications.mineApplications,
    id: ownProps.id,
});

const mapDispatchToProps: PropsFromDispatch = {
    setActiveModal: setActiveModal,
    setUserToReview: setUserToReview,
    openUserProfile: openUserProfile,
    setScroll: setScroll,
    scrollToIdPosition: scrollToIdPosition,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApplicationsVisitedTab);

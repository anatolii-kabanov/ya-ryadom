import React from 'react';
import {
    Group,
    Button,
    Header,
    UsersStack,
    RichCell,
    Avatar,
    Div,
    Spinner
} from '@vkontakte/vkui';

import Icon16MoreHorizontal from '@vkontakte/icons/dist/16/more_horizontal';
import { AppState } from "../../../store/app-state";
import { connect } from 'react-redux';
import { MyEvent } from '../../../store/events/my-events/models';
import { fetchMyEventsListRequest } from '../../../store/events/my-events/actions';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import { dateOptions } from '../../../utils/constants/event-date-options.constant';
import { EventsApplications } from '../../../store/applications/models';
import { fetchEventApplicantsRequest, confirmApplicantRequest, rejectApplicantRequest } from '../../../store/applications/actions';
import EmptyText from '../../general/empty-text';

interface PropsFromState {
    myEvents: MyEvent[],
    eventsApplications: EventsApplications
}

interface PropsFromDispatch {
    fetchMyEvents: typeof fetchMyEventsListRequest,
    fetchEventApplicants: typeof fetchEventApplicantsRequest,
    confirm: typeof confirmApplicantRequest,
    reject: typeof rejectApplicantRequest,
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    [key: number]: boolean;
}

export class ApplicationsToMyEventsTab extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.showUsers = this.showUsers.bind(this);
    }

    componentDidMount() {
        const { fetchMyEvents } = this.props;
        fetchMyEvents();
    }

    showUsers(eventId: number) { // compare ids to request if needed
        const { eventsApplications, fetchEventApplicants } = this.props;
        const applications = eventsApplications[eventId];
        if (!applications || applications.length === 0) {
            fetchEventApplicants(eventId);
        }
        this.setState({ [eventId]: true });
    }

    private renderApplications(id: number) {
        const { eventsApplications, confirm, reject } = this.props;
        const applications = eventsApplications[id];
        if (applications) {
            return applications
                .map((item, key) => {
                    return <RichCell
                        key={key}
                        disabled
                        before={<Avatar size={48} src={item.vkUserAvatarUrl} />}
                        caption={`${new Date(item.sentDate).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric', hour12: false })}`}
                        actions={
                            <span className="application-btns">
                                <Button className="btn-primary" onClick={() => confirm({ applicationId: item.id, eventId: id })}>Принять</Button>
                                <Button className="btn-secondary" onClick={() => reject({ applicationId: item.id, eventId: id })}>Отклонить</Button>
                            </span>
                        }
                    >
                        {item.userFullName}
                    </RichCell>
                });
        }
    }

    private renderMyEvents() {
        const { myEvents, eventsApplications } = this.props;
        const showUsers = this.showUsers;
        if (myEvents) {
            return myEvents
                .map((item, key) => {
                    const photos = item.participants.filter((p) => p.applicationStatus === ApplicationStatus.sent).map((p) => p.vkUserAvatarUrl);
                    const newApplicants = photos.length;
                    return <Group key={key} separator="show" className="application-card" header={
                        <Header mode="secondary" aside={<Icon16MoreHorizontal />}>{ALL_THEMES.find(m => m.id === item.themeType)?.name}</Header>}>
                        <Div className="body">
                            <div className="title">{item.title}</div>
                            <div className="description">{item.description}</div>

                            <div className="sub-info">
                                {/* <div className="address"></div> */}
                                <div className="date">{`${new Date(item.date).toLocaleDateString('ru-RU', dateOptions)} в ${item.time}`}</div>
                            </div>

                            <UsersStack
                                className="applicants"
                                photos={photos}
                            >Хотят пойти с вами {newApplicants > 0 ? '+' : ''}{newApplicants} человек</UsersStack>

                            {!this.state[item.id] && newApplicants > 0 && <Button className="btn-primary show-applicants-btn" onClick={() => showUsers(item.id)}>Просмотреть</Button>}

                            {this.state[item.id] && <div className="users-list">
                                {
                                    !eventsApplications[item.id]
                                        ? <Spinner size="small"></Spinner>
                                        : this.renderApplications(item.id)
                                }
                            </div>}

                        </Div>
                    </Group>
                });
        }
    }


    render() {
        const { myEvents } = this.props;
        return (
            myEvents?.length > 0 ? this.renderMyEvents() : <EmptyText/>
        )
    }
}

const mapStateToProps = ({ events, applications }: AppState) => ({
    myEvents: events.myEvents.eventsList,
    eventsApplications: applications.eventsApplicants
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchMyEvents: fetchMyEventsListRequest,
    fetchEventApplicants: fetchEventApplicantsRequest,
    confirm: confirmApplicantRequest,
    reject: rejectApplicantRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsToMyEventsTab);
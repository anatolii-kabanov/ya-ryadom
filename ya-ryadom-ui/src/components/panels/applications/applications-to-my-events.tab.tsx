import React from 'react';
import {
    Group,
    Button,
    Header,
    UsersStack,
    RichCell,
    Avatar,
    Div
} from '@vkontakte/vkui';

import Icon16MoreHorizontal from '@vkontakte/icons/dist/16/more_horizontal';
import { AppState } from "../../../store/app-state";
import { connect } from 'react-redux';
import { MyEvent } from '../../../store/events/my-events/models';
import { fetchMyEventsListRequest } from '../../../store/events/my-events/actions';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import { dateOptions } from '../../../utils/constants/event-date-options.constant';

interface PropsFromState {
    myEvents: MyEvent[]
}

interface PropsFromDispatch {
    fetchMyEvents: typeof fetchMyEventsListRequest
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    seeUsers: boolean;
}

export class ApplicationsToMyEventsTab extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            seeUsers: false,
        }
    }

    componentDidMount() {
        const { fetchMyEvents } = this.props;
        fetchMyEvents();
    }

    showUsers() {
        this.setState({
            seeUsers: true
        });
    }

    private renderApplications() {
        const { seeUsers } = this.state;
        const { myEvents } = this.props;
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

                            {!seeUsers && newApplicants > 0 && <Button className="btn-primary show-applicants-btn" onClick={showUsers.bind(this)}>Просмотреть</Button>}

                            {seeUsers && <div className="users-list">
                                <RichCell
                                    disabled
                                    before={<Avatar size={48} src="https://sun9-26.userapi.com/c846321/v846321375/12a023/ke88l8pO-UY.jpg?ava=1" />}
                                    caption="Сегодня 18:00"
                                    actions={
                                        <span className="application-btns">
                                            <Button className="btn-primary">Принять</Button>
                                            <Button className="btn-secondary">Отклонить</Button>
                                        </span>
                                    }
                                >
                                    Кирилл Ижока
                                </RichCell>
                            </div>}

                        </Div>
                    </Group>
                });
        }
    }


    render() {
        return (
            this.renderApplications()
        )
    }
}

const mapStateToProps = ({ events }: AppState) => ({
    myEvents: events.myEvents.eventsList
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchMyEvents: fetchMyEventsListRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsToMyEventsTab);
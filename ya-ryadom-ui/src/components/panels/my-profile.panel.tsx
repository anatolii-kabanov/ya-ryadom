import React from "react";
import {
    Button,
    Group,
    Panel,
    Avatar,
    RichCell,
    Card,
    CardGrid,
} from "@vkontakte/vkui";
import { connect } from 'react-redux';
import { AppState } from "../../store/app-state";

import MainHeaderPanel from "./headers/main.header";
import { MyEvent } from "../../store/events/events-near-me/models";
import { UserInfo } from "@vkontakte/vk-bridge";
import { goForward } from "../../store/history/actions";
import { VkHistoryModel } from "../../store/history/models";
import { VIEWS } from "../../utils/constants/view.constants";
import { PANELS } from "../../utils/constants/panel.constants";
import Marker from "../map/marker";
import { fetchMyEventsListRequest } from "../../store/events/my-events/actions";

interface PropsFromState {
    id: string;
    myEvents: MyEvent[];
    currentUser: UserInfo;
}

interface PropsFromDispatch {
    fetchMyEventsListRequest: typeof fetchMyEventsListRequest;
    goForwardView: typeof goForward;
}

type AllProps = PropsFromState & PropsFromDispatch;

class MyProfilePanel extends React.Component<AllProps>{

    componentDidMount() {
        const { fetchMyEventsListRequest } = this.props;
        fetchMyEventsListRequest();
    }

    private renderEventsMap() {
        const { myEvents } = this.props;
        if (myEvents) {
            return myEvents
                .map((item, key) => {
                    return <Marker key={key} lat={item.latitude} lng={item.longitude} text={item.title} />
                });
        }
    }

    private renderEventsList() {
        const { myEvents, } = this.props;
        if (myEvents) {
            return myEvents
                .map((item, key) => {
                    return <CardGrid key={key}><Card size="l" mode="outline">
                        <RichCell
                            disabled
                            multiline
                            text={item.description}
                            caption={new Date(item.date).toLocaleDateString()}
                        >
                            {item.title}
                        </RichCell>
                    </Card>
                    </CardGrid>
                });
        }
    }

    render() {
        const { id, currentUser, goForwardView } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text='Мой профиль'></MainHeaderPanel>
                <Group>
                    <RichCell
                        disabled
                        multiline
                        before={<Avatar size={72} src={currentUser?.photo_100} />}
                    >
                        Привет {currentUser?.first_name}
                    </RichCell>

                    {this.renderEventsList()}
                </Group>
                <Group>
                    <Button size="xl" className="btn-primary" onClick={() => goForwardView(new VkHistoryModel(VIEWS.MY_PROFILE_VIEW, PANELS.CREATE_EVENT_PANEL))}>Добавить</Button>
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = ({ events, authentication }: AppState) => ({
    myEvents: events.myEvents.eventsList,
    currentUser: authentication.vkUserInfo
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchMyEventsListRequest: fetchMyEventsListRequest,
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfilePanel);


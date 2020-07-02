import React from "react";
import {
    Button,
    Group,
    Panel,
    Avatar,
    RichCell,
    Div,
} from "@vkontakte/vkui";
import { connect } from 'react-redux';
import { AppState } from "../../../store/app-state";

import MainHeaderPanel from "../headers/main.header";
import { UserInfo } from "@vkontakte/vk-bridge";
import { goForward } from "../../../store/history/actions";
import { VkHistoryModel } from "../../../store/history/models";
import { VIEWS } from "../../../utils/constants/view.constants";
import { PANELS } from "../../../utils/constants/panel.constants";
import { fetchMyEventsListRequest } from "../../../store/events/my-events/actions";
import { User } from "../../../store/authentication/models";
import PillInput from "../../inputs/pill.input";
import { ALL_THEMES } from "../../../utils/constants/theme.constants";

interface PropsFromState {
    id: string;
    vkUserInfo: UserInfo;
    currentUser: User;
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

    private renderThemes() {
        const { currentUser } = this.props;
        if (currentUser?.selectedThemes) {
            const themes = ALL_THEMES.filter(t => currentUser.selectedThemes.indexOf(t.id) !== -1);
            return themes
                .map((item, key) => {
                    return <PillInput id={item.id} selected={true} onClick={() => ''} text={item.name}></PillInput>
                });
        }
    }

    render() {
        const { id, vkUserInfo, goForwardView, currentUser } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text='Мой профиль'></MainHeaderPanel>
                <Group>
                    <RichCell
                        disabled
                        multiline
                        text={currentUser.aboutMySelf}
                        before={<Avatar size={72} src={vkUserInfo?.photo_100} />}
                    >
                        {vkUserInfo?.first_name} {vkUserInfo?.last_name}
                    </RichCell>
                    <Div className="pills">
                        {this.renderThemes()}
                    </Div>
                </Group>
                <Group>
                    <Div>
                        <Button size="xl" className="btn-primary"
                            onClick={() => goForwardView(new VkHistoryModel(VIEWS.MY_PROFILE_VIEW, PANELS.CREATE_EVENT_PANEL))}>Создать событие</Button>
                    </Div>
                    <Div>
                        <Button size="xl" className="btn-info"
                            onClick={() => goForwardView(new VkHistoryModel(VIEWS.MY_PROFILE_VIEW, PANELS.CREATE_EVENT_PANEL))}>Посмотреть историю</Button>
                    </Div>
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = ({ events, authentication }: AppState) => ({
    myEvents: events.myEvents.eventsList,
    vkUserInfo: authentication.vkUserInfo,
    currentUser: authentication.currentUser,
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchMyEventsListRequest: fetchMyEventsListRequest,
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfilePanel);


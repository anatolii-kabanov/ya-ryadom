import React from 'react';
import {
    Group,
    Text,
    Button,
    Header,
    RichCell, Avatar
} from '@vkontakte/vkui';
import { AppState } from "../../../store/app-state";
import { connect } from 'react-redux';
import { Application } from '../../../store/applications/models';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import { dateOptions } from '../../../utils/constants/event-date-options.constant';
import { revokeApplicationRequest } from '../../../store/applications/actions';
import { openUserProfile } from '../../../store/history/actions';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import EmptyText from '../../general/empty-text';

interface PropsFromState {
    applications: Application[];
}

interface PropsFromDispatch {
    revoke: typeof revokeApplicationRequest,
    openUserProfile: typeof openUserProfile
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
}

export class MineApplicationsTab extends React.Component<AllProps, State>  {

    private renderApplications() {
        const { applications, revoke, openUserProfile } = this.props;
        if (applications) {
            return applications
                .filter((a) => a.status === ApplicationStatus.sent || a.status === ApplicationStatus.confirmed)
                .map((item, key) => {
                    return <Group className="application-card" separator="show" key={key} header={<Header mode="secondary">{ALL_THEMES.find(m => m.id === item.themeType)?.name}</Header>}>
                        <RichCell
                            disabled
                            multiline
                            before={<Avatar size={48} src={item.vkUserAvatarUrl} onClick={() => openUserProfile(item.vkUserId)} />}
                            caption={`${new Date(item.eventDate).toLocaleDateString('ru-RU', dateOptions)} в ${item.eventTime}`}
                            actions={
                                <span className="application-btns">
                                    <Button className="btn-primary" onClick={() => openUserProfile(item.vkUserId)}>Профиль</Button>
                                    <Button className="btn-secondary" onClick={() => revoke(item.id)}>Отменить</Button>
                                </span>
                            }
                        >
                            <div className="head">{item.userFullName} <span className="distance">{(item?.distance / 1000).toFixed(2)}км</span></div>
                            <Text weight="medium" className="description">{item.text}</Text>
                        </RichCell>
                    </Group>
                });
        }
    }

    render() {
        const { applications } = this.props;
        return (
            applications?.filter((a) => a.status === ApplicationStatus.sent || a.status === ApplicationStatus.confirmed).length > 0
                ? this.renderApplications()
                : <EmptyText />
        )
    }
}

const mapStateToProps = ({ applications }: AppState) => ({
    applications: applications.mineApplications
})

const mapDispatchToProps: PropsFromDispatch = {
    revoke: revokeApplicationRequest,
    openUserProfile: openUserProfile
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MineApplicationsTab);
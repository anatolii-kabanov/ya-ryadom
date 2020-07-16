import React from 'react';
import {
    Group,
    Div,
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

interface PropsFromState {
    applications: Application[];
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
}

export class MineApplicationsTab extends React.Component<AllProps, State>  {

    private renderApplications() {
        const { applications } = this.props;
        if (applications) {
            return applications
                .map((item, key) => {
                    return <Group className="application-card" separator="show" key={key} header={<Header mode="secondary">{ALL_THEMES.find(m => m.id === item.themeType)?.name}</Header>}>
                        <RichCell
                            disabled
                            multiline
                            before={<Avatar size={48} src={item.vkUserAvatarUrl} />}
                            caption={`${new Date(item.eventDate).toLocaleDateString('ru-RU', dateOptions)} в ${item.eventTime}`}
                            actions={
                                <span className="application-btns">
                                    <Button className="btn-primary">Написать</Button>
                                    <Button className="btn-secondary">Отменить</Button>
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
        return (
            <div>
                {this.renderApplications()}
            </div>
        )
    }
}

const mapStateToProps = ({ applications }: AppState) => ({
    applications: applications.mineApplications
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MineApplicationsTab);
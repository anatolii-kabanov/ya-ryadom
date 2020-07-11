import React from 'react';
import { Panel, Group, CardGrid, Div, RichCell, Header, Avatar, Button } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import MainHeaderPanel from "./../headers/main.header";
import { Application } from '../../../store/applications/models';
import { fetchApplicationsToMeRequest } from '../../../store/applications/actions';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import ApplicationsTabs from '../../tabs/applications.tabs';

interface PropsFromState {
    id: string;
    applications: Application[];
}

interface PropsFromDispatch {
    fetchApplications: typeof fetchApplicationsToMeRequest
}

type AllProps = PropsFromState & PropsFromDispatch;

class ApplicationsToMePanel extends React.Component<AllProps>  {

    componentDidMount() {
        const { fetchApplications } = this.props;
        fetchApplications();
    }

    leftReview(vkUserId: number) {

    }

    private renderVisitedApplications() {
        const { applications } = this.props;

        if (applications) {
            return applications
                .filter(m => m.status === ApplicationStatus.visited)
                .map((item, key) => {
                    return <Div key={key}>
                        <CardGrid>
                            <Div className="application-card">
                                <Group header={<Header mode="secondary">{ALL_THEMES.find(m => m.id === item.themeType)?.name}</Header>}>
                                    <RichCell
                                        before={<Avatar size={48} src={item.vkUserAvatarUrl} />}
                                        text={`Отправлено: ${new Date(item.sentDate).toLocaleDateString('ru-RU')}`}
                                        caption={item.eventDate}
                                    >
                                        {item?.userFullName} <span className="distance">{item?.distance && (item?.distance / 1000).toFixed(2)} км.</span>
                                    </RichCell>
                                    <Div className="">
                                        <Button className="btn-info" onClick={() => this.leftReview(item.vkUserId)}>Оценить</Button>
                                    </Div>
                                </Group>
                            </Div>
                        </CardGrid>
                    </Div>
                });
        }
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text='Заявки'></MainHeaderPanel>
                <ApplicationsTabs></ApplicationsTabs>
                <Group header={<Header mode="secondary">Новые</Header>}>

                </Group>
                <Group header={<Header mode="secondary">Подтвержденные</Header>}>
                    {this.renderVisitedApplications()}
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    fetchApplications: fetchApplicationsToMeRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsToMePanel);
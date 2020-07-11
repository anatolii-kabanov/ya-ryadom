import React from 'react';
import { Panel, Group, Tabs, TabsItem, Div, CardGrid, Card, RichCell, Avatar, Button, InfoRow, HorizontalScroll, Header } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import MainHeaderPanel from "./../headers/main.header";
import { Application } from '../../../store/applications/models';
import { fetchMineApplicationsRequest, revokeApplicationRequest } from '../../../store/applications/actions';
import { TABS } from '../../../utils/constants/tab.constants';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import ApplicationsTabs from '../../tabs/applications.tabs';

interface PropsFromState {
    id: string;
    applications: Application[]
}

interface PropsFromDispatch {
    fetchMyApplications: typeof fetchMineApplicationsRequest,
    revokeApplication: typeof revokeApplicationRequest,
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    activeTab: string;
}

const TabStatus = {
    [TABS.APPLICATIONS_I_WILL_GO]: ApplicationStatus.confirmed,
    [TABS.APPLICATIONS_REJECTED]: ApplicationStatus.rejected,
    [TABS.SENT_APPLICATIONS]: ApplicationStatus.sent,
    [TABS.VISITED_APPLICATIONS]: ApplicationStatus.visited,
}

const RevokeOnly = [
    ApplicationStatus.sent,
    ApplicationStatus.confirmed,
]

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class MyApplicationsPanel extends React.Component<AllProps, State>  {

    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            activeTab: TABS.APPLICATIONS_I_WILL_GO
        }
    }

    componentDidMount() {
        const { fetchMyApplications } = this.props;
        fetchMyApplications();
    }

    revoke(id: number) {
        const { revokeApplication } = this.props;
        revokeApplication(id);
    }

    onTabChanged(selectedTab: string) {
        this.setState({ activeTab: selectedTab });
    }

    private renderApplications() {
        const { activeTab } = this.state;
        const { applications } = this.props;
        const status: ApplicationStatus = TabStatus[activeTab];

        if (applications) {
            return applications
                .filter(m => m.status === status)
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
                                        <InfoRow header>
                                            {item.text}
                                        </InfoRow>
                                    </RichCell>
                                    <Div className="">
                                        {
                                            RevokeOnly.indexOf(item.status) !== -1 &&
                                            <Button className="btn-info" onClick={() => this.revoke(item.id)}>Отменить</Button>
                                        }
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
                <MainHeaderPanel text='Мои заявки'></MainHeaderPanel>
                <ApplicationsTabs></ApplicationsTabs>
                <Group>
                    <HorizontalScroll>
                        <Tabs mode="buttons">
                            <TabsItem
                                onClick={() => this.onTabChanged(TABS.APPLICATIONS_I_WILL_GO)}
                                selected={this.state.activeTab === TABS.APPLICATIONS_I_WILL_GO}
                            >
                                Иду
                        </TabsItem>
                            <TabsItem
                                onClick={() => this.onTabChanged(TABS.VISITED_APPLICATIONS)}
                                selected={this.state.activeTab === TABS.VISITED_APPLICATIONS}
                            >
                                Сходил
                        </TabsItem>
                            <TabsItem
                                onClick={() => this.onTabChanged(TABS.SENT_APPLICATIONS)}
                                selected={this.state.activeTab === TABS.SENT_APPLICATIONS}
                            >
                                На рассмотрении
                        </TabsItem>
                            <TabsItem
                                onClick={() => this.onTabChanged(TABS.APPLICATIONS_REJECTED)}
                                selected={this.state.activeTab === TABS.APPLICATIONS_REJECTED}
                            >
                                Отклоненные
                        </TabsItem>
                        </Tabs>
                    </HorizontalScroll>
                </Group>
                <Group>
                    {this.renderApplications()}
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ applications }: AppState) => ({
    applications: applications.mineApplications
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchMyApplications: fetchMineApplicationsRequest,
    revokeApplication: revokeApplicationRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyApplicationsPanel);
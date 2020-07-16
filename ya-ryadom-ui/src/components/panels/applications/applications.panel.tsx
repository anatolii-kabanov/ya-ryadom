import './applications.panel.scss';
import React from 'react';
import {
    Panel,
    Group,
    Tabs,
    TabsItem,
    HorizontalScroll
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import MainHeaderPanel from "./../headers/main.header";
import { Application } from '../../../store/applications/models';
import { fetchMineApplicationsRequest, revokeApplicationRequest } from '../../../store/applications/actions';
import { TABS } from '../../../utils/constants/tab.constants';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import MineApplicationsTab from './mine-applications.tab';
import { ApplicationVisited } from './application.visited';
import ApplicationsToMyEventsTab from './applications-to-my-events.tab';

interface PropsFromState {
    id: string;
    applications: Application[];
    openCreationReview: () => void;
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

class ApplicationsPanel extends React.Component<AllProps, State>  {

    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            activeTab: TABS.CREATED_APPLICATIONS,
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
        const { applications, openCreationReview } = this.props;
        const status: ApplicationStatus = TabStatus[activeTab];

        return <Group>
            {activeTab == TABS.CREATED_APPLICATIONS && <ApplicationsToMyEventsTab />}
            {activeTab == TABS.WANT_VISIT_APPLICATIONS && <MineApplicationsTab />}
            {activeTab == TABS.VISITED_APPLICATIONS && <ApplicationVisited openCreationReview={openCreationReview} />}
        </Group>
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="applications-panel">
                <MainHeaderPanel text='Заявки' />
                <Group>
                    <Tabs>
                        <HorizontalScroll>
                            <TabsItem
                                onClick={() => this.onTabChanged(TABS.CREATED_APPLICATIONS)}
                                selected={this.state.activeTab === TABS.CREATED_APPLICATIONS}
                            >
                                Создал
                            </TabsItem>
                            <TabsItem
                                onClick={() => this.onTabChanged(TABS.WANT_VISIT_APPLICATIONS)}
                                selected={this.state.activeTab === TABS.WANT_VISIT_APPLICATIONS}
                            >
                                Хочу
                            </TabsItem>
                            <TabsItem
                                onClick={() => this.onTabChanged(TABS.VISITED_APPLICATIONS)}
                                selected={this.state.activeTab === TABS.VISITED_APPLICATIONS}
                            >
                                Сходил
                            </TabsItem>
                        </HorizontalScroll>
                    </Tabs>
                </Group>
                {this.renderApplications()}
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
)(ApplicationsPanel);
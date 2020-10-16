import './applications.panel.scss';
import React from 'react';
import {
    Panel,
    Group,
    Tabs,
    TabsItem,
    HorizontalScroll,
    PanelHeader
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { Application } from '../../../store/applications/models';
import { fetchMineApplicationsRequest, revokeApplicationRequest } from '../../../store/applications/actions';
import { TABS } from '../../../utils/constants/tab.constants';
import MineApplicationsTab from './mine-applications.tab';
import ApplicationsVisitedTab from './applications-visited.tab';
import ApplicationsToMyEventsTab from './applications-to-my-events.tab';

interface PropsFromState {
    id: string;
    applications: Application[];
    openBase: (eventId: number) => void;
}

interface PropsFromDispatch {
    fetchMyApplications: typeof fetchMineApplicationsRequest,
    revokeApplication: typeof revokeApplicationRequest,
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    activeTab: string;
}

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
        const { openBase } = this.props;

        return <Group>
            {activeTab == TABS.CREATED_APPLICATIONS && <ApplicationsToMyEventsTab openBase={openBase} />}
            {activeTab == TABS.WANT_VISIT_APPLICATIONS && <MineApplicationsTab />}
            {activeTab == TABS.VISITED_APPLICATIONS && <ApplicationsVisitedTab />}
        </Group>
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="applications-panel">
                <PanelHeader separator={false}>Заявки</PanelHeader>
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

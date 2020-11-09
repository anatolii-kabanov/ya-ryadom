import './applications.panel.scss';
import React from 'react';
import {
    Panel,
    Group,
    Tabs,
    TabsItem,
    HorizontalScroll,
    PanelHeader,
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { Application } from '../../../store/applications/models';
import {
    fetchMineApplicationsRequest,
    revokeApplicationRequest,
} from '../../../store/applications/actions';
import { TABS } from '../../../utils/enums/tabs.enum';
import MineApplicationsTab from './mine-applications.tab';
import ApplicationsVisitedTab from './applications-visited.tab';
import ApplicationsToMyEventsTab from './applications-to-my-events.tab';
import { PANELS } from '../../../utils/enums/panels.enum';
import { VIEWS } from '../../../utils/enums/views.enum';
import { setTabForCurrentViewPanel } from '../../../store/history/actions';

interface OwnProps {
    id: PANELS;
    openBase: (eventId: number) => void;
}

interface PropsFromState {
    applications: Application[];
    activeTab?: TABS;
}

interface PropsFromDispatch {
    fetchMyApplications: typeof fetchMineApplicationsRequest;
    revokeApplication: typeof revokeApplicationRequest;
    setTabForCurrentViewPanel: typeof setTabForCurrentViewPanel;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {}

class ApplicationsPanel extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { fetchMyApplications } = this.props;
        fetchMyApplications();
    }

    revoke(id: number) {
        const { revokeApplication } = this.props;
        revokeApplication(id);
    }

    onTabChanged(selectedTab: TABS) {
        const { setTabForCurrentViewPanel } = this.props;
        setTabForCurrentViewPanel(selectedTab);
    }

    private renderApplications() {
        const { openBase, activeTab } = this.props;

        return (
            <Group>
                {activeTab === TABS.CREATED_APPLICATIONS && (
                    <ApplicationsToMyEventsTab
                        id={TABS.CREATED_APPLICATIONS}
                        openBase={openBase}
                    />
                )}
                {activeTab === TABS.WANT_VISIT_APPLICATIONS && (
                    <MineApplicationsTab id={TABS.WANT_VISIT_APPLICATIONS} />
                )}
                {activeTab === TABS.VISITED_APPLICATIONS && (
                    <ApplicationsVisitedTab id={TABS.VISITED_APPLICATIONS} />
                )}
            </Group>
        );
    }

    render() {
        const { id, activeTab } = this.props;
        return (
            <Panel id={id} className='applications-panel'>
                <PanelHeader separator={false}>Заявки</PanelHeader>
                <Group>
                    <Tabs>
                        <HorizontalScroll>
                            <TabsItem
                                className={
                                    activeTab === TABS.CREATED_APPLICATIONS
                                        ? 'tab-selected'
                                        : 'tab'
                                }
                                onClick={() =>
                                    this.onTabChanged(TABS.CREATED_APPLICATIONS)
                                }
                                selected={
                                    activeTab === TABS.CREATED_APPLICATIONS
                                }
                            >
                                Создал
                            </TabsItem>
                            <TabsItem
                                className={
                                    activeTab === TABS.WANT_VISIT_APPLICATIONS
                                        ? 'tab-selected'
                                        : 'tab'
                                }
                                onClick={() =>
                                    this.onTabChanged(
                                        TABS.WANT_VISIT_APPLICATIONS,
                                    )
                                }
                                selected={
                                    activeTab === TABS.WANT_VISIT_APPLICATIONS
                                }
                            >
                                Хочу
                            </TabsItem>
                            <TabsItem
                                className={
                                    activeTab === TABS.VISITED_APPLICATIONS
                                        ? 'tab-selected'
                                        : 'tab'
                                }
                                onClick={() =>
                                    this.onTabChanged(TABS.VISITED_APPLICATIONS)
                                }
                                selected={
                                    activeTab === TABS.VISITED_APPLICATIONS
                                }
                            >
                                Сходил
                            </TabsItem>
                        </HorizontalScroll>
                    </Tabs>
                </Group>
                {this.renderApplications()}
            </Panel>
        );
    }
}

const mapStateToProps = (
    { applications, history }: AppState,
    ownProps: OwnProps,
) => {
    const panelsHistory = history.viewPanelsHistory[VIEWS.APPLICATIONS_VIEW];
    const lastTab = panelsHistory[panelsHistory.length - 1]?.tab;
    return {
        applications: applications.mineApplications,
        activeTab: lastTab,
        id: ownProps.id,
        openBase: ownProps.openBase,
    };
};

const mapDispatchToProps: PropsFromDispatch = {
    fetchMyApplications: fetchMineApplicationsRequest,
    revokeApplication: revokeApplicationRequest,
    setTabForCurrentViewPanel: setTabForCurrentViewPanel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsPanel);

import './applications.panel.scss';
import React from 'react';
import {
    Panel,
    Group,
    Tabs,
    TabsItem,
    Div,
    CardGrid,
    Card,
    Button,
    HorizontalScroll,
    Header,
    UsersStack,
    Separator,
    RichCell, Avatar
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import MainHeaderPanel from "./../headers/main.header";
import { Application } from '../../../store/applications/models';
import { fetchMineApplicationsRequest, revokeApplicationRequest } from '../../../store/applications/actions';
import { TABS } from '../../../utils/constants/tab.constants';
import { ApplicationStatus } from '../../../utils/enums/application-status.enum';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import Icon16MoreHorizontal from '@vkontakte/icons/dist/16/more_horizontal';

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

class ApplicationsPanel extends React.Component<AllProps, State>  {

    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            activeTab: TABS.CREATED_APPLICATIONS
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

        return [1,2,3,4]
            .map((item, key) => {
                return <Div key={key}>
                        <CardGrid>
                            <Div className="application-card">
                                <Group header={<Header mode="secondary" aside={<Icon16MoreHorizontal/>}>Кино</Header>}>
                                    <div className="body">
                                        <div className="title">Го кинчик</div>
                                        <div className="description">Пойду в кино с небольшой
                                            компанией  на фильм Бладшот</div>

                                        <div className="sub-info">
                                            <div className="address">Курск, МегаГринн</div>
                                            <div className="date">пн 14 июля в 23:34</div>
                                        </div>

                                        <UsersStack
                                            photos={[
                                                "https://sun9-26.userapi.com/c846321/v846321375/12a023/ke88l8pO-UY.jpg?ava=1",
                                                "https://sun9-51.userapi.com/impg/c857220/v857220720/115511/Jr1Swq3Cm3I.jpg?size=100x0&quality=90&crop=0,0,1879,1879&sign=53d80dd10a66c5a904806290f04f4538&ava=1",
                                                "https://sun9-30.userapi.com/impg/bs6SJz5JgAK-9rh6SCgRACwQQhSUMFpVW3kLcQ/eBQUPSEG1XQ.jpg?size=100x0&quality=90&crop=0,0,1334,1334&sign=f2ca0c0cfe07517276e8e3288b41f1da&ava=1",
                                            ]}
                                        >Хотят пойти с вами +3 человек</UsersStack>

                                        <Button>Просмотреть</Button>
                                    </div>
                                </Group>
                            </Div>
                        </CardGrid>
                        <Separator style={{ margin: '12px 0' }} />
                </Div>
            });
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text='Заявки'/>
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
)(ApplicationsPanel);
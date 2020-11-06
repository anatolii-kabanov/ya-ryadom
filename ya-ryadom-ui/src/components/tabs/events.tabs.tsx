import './events.tabs.scss';
import React from 'react';
import { Tabs, TabsItem, HorizontalScroll } from '@vkontakte/vkui';
import { PANELS } from '../../utils/enums/panels.enum';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { VkHistoryModel } from '../../store/history/models';
import { goForward } from '../../store/history/actions';
import { VIEWS } from '../../utils/enums/views.enum';
import { TABS } from '../../utils/enums/tabs.enum';

interface PropsFromState {
    activeTab?: string;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward;
}

type AllProps = PropsFromState & PropsFromDispatch;

class EventsTabs extends React.Component<AllProps> {
    render() {
        const { activeTab, goForwardView } = this.props;
        return (
            <Tabs>
                <HorizontalScroll>
                    <TabsItem
                        className={
                            activeTab === TABS.EVENTS_MAP ? 'tab-selected' : ''
                        }
                        onClick={() =>
                            goForwardView(
                                new VkHistoryModel(
                                    VIEWS.EVENTS_NEAR_ME_VIEW,
                                    PANELS.EVENTS_NEAR_ME_PANEL,
                                    TABS.EVENTS_MAP,
                                ),
                            )
                        }
                        selected={activeTab === TABS.EVENTS_MAP}
                    >
                        Карта
                    </TabsItem>
                    <TabsItem
                        className={
                            activeTab === TABS.EVENTS_LIST ? 'tab-selected' : ''
                        }
                        onClick={() =>
                            goForwardView(
                                new VkHistoryModel(
                                    VIEWS.EVENTS_NEAR_ME_VIEW,
                                    PANELS.EVENTS_NEAR_ME_PANEL,
                                    TABS.EVENTS_LIST,
                                ),
                            )
                        }
                        selected={activeTab === TABS.EVENTS_LIST}
                    >
                        Список
                    </TabsItem>
                </HorizontalScroll>
            </Tabs>
        );
    }
}

const mapStateToProps = ({ history }: AppState) => {
    const currentViewHistory = history.viewPanelsHistory[history.currentView];
    const lastEntry = currentViewHistory[currentViewHistory.length - 1];
    return {
        activeTab: lastEntry.tab,
    };
};

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsTabs);

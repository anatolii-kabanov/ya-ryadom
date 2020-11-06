import './events.tabs.scss';
import React from 'react';
import { Tabs, TabsItem, HorizontalScroll } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { setTabForCurrentViewPanel } from '../../store/history/actions';
import { TABS } from '../../utils/enums/tabs.enum';

interface PropsFromState {
    activeTab?: string;
}

interface PropsFromDispatch {
    setTabForCurrentViewPanel: typeof setTabForCurrentViewPanel;
}

type AllProps = PropsFromState & PropsFromDispatch;

class EventsTabs extends React.Component<AllProps> {
    render() {
        const { activeTab, setTabForCurrentViewPanel } = this.props;
        return (
            <Tabs>
                <HorizontalScroll>
                    <TabsItem
                        className={
                            activeTab === TABS.EVENTS_MAP ? 'tab-selected' : ''
                        }
                        onClick={() =>
                            setTabForCurrentViewPanel(TABS.EVENTS_MAP)
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
                            setTabForCurrentViewPanel(TABS.EVENTS_LIST)
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
    setTabForCurrentViewPanel: setTabForCurrentViewPanel,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsTabs);

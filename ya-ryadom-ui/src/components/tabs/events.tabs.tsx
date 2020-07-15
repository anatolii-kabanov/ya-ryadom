
import './events.tabs.scss';
import React from 'react';
import { Tabs, TabsItem, HorizontalScroll } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { VkHistoryModel } from '../../store/history/models';
import { goForward } from '../../store/history/actions';
import { VIEWS } from '../../utils/constants/view.constants';
import { TABS } from '../../utils/constants/tab.constants';

interface PropsFromState {
    activeTab: string;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
}


type AllProps = PropsFromState & PropsFromDispatch;

class EventsTabs extends React.Component<AllProps>  {
    render() {
        const { activeTab, goForwardView } = this.props;
        return (
            <Tabs>
                <HorizontalScroll>
                    <TabsItem
                        className={activeTab === TABS.EVENTS_MAP ? "tab-selected" : ''}
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_PANEL, TABS.EVENTS_MAP))}
                        selected={activeTab === TABS.EVENTS_MAP}
                    >
                        Карта
                    </TabsItem>
                    <TabsItem
                        className={activeTab === TABS.EVENTS_LIST ? "tab-selected" : ''}
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_PANEL, TABS.EVENTS_LIST))}
                        selected={activeTab === TABS.EVENTS_LIST}
                    >
                        Список
                    </TabsItem>
                </HorizontalScroll >
            </Tabs >
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activeTab: history.currentViewPanel.tab,
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsTabs);


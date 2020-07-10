
import './events.tab.scss';
import React from 'react';
import { Tabs, TabsItem, HorizontalScroll } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { VkHistoryModel } from '../../store/history/models';
import { goForward } from '../../store/history/actions';
import { VIEWS } from '../../utils/constants/view.constants';
import Icon28Add from '@vkontakte/icons/dist/28/add_square_outline';

interface PropsFromState {
    activePanel: string;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
}


type AllProps = PropsFromState & PropsFromDispatch;

class EventsTab extends React.Component<AllProps>  {
    render() {
        const { activePanel, goForwardView } = this.props;
        return (
            <Tabs>
                <HorizontalScroll>
                    <TabsItem
                        className="add-icon-tab"
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.CREATE_EVENT_PANEL))}
                        selected={activePanel === PANELS.CREATE_EVENT_PANEL}
                        after={<Icon28Add className="nav-icon-selected"></Icon28Add>}
                    >
                    </TabsItem>
                    <TabsItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_MAP_PANEL))}
                        selected={activePanel === PANELS.EVENTS_NEAR_ME_MAP_PANEL}
                    >
                        Карта
                    </TabsItem>
                    <TabsItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.EVENTS_NEAR_ME_VIEW, PANELS.EVENTS_NEAR_ME_LIST_PANEL))}
                        selected={activePanel === PANELS.EVENTS_NEAR_ME_LIST_PANEL}
                    >
                        Список
                    </TabsItem>
                </HorizontalScroll >
            </Tabs >
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activePanel: history.currentViewPanel.panel,
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsTab);


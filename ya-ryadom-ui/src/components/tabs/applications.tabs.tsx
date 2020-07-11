
import './applications.tabs.scss';
import React from 'react';
import { Tabs, TabsItem, HorizontalScroll } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { VkHistoryModel } from '../../store/history/models';
import { goForward } from '../../store/history/actions';
import { VIEWS } from '../../utils/constants/view.constants';
import Icon28Incoming from '@vkontakte/icons/dist/28/user_incoming_outline';
import Icon28Outgoing from '@vkontakte/icons/dist/28/user_outgoing_outline';

interface PropsFromState {
    activePanel: string;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
}


type AllProps = PropsFromState & PropsFromDispatch;

class ApplicationsTabs extends React.Component<AllProps>  {
    render() {
        const { activePanel, goForwardView } = this.props;
        return (
            <Tabs>
                <HorizontalScroll>
                    <TabsItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.APPLICATIONS_VIEW, PANELS.APPLICATIONS_TO_ME_PANEL))}
                        selected={activePanel === PANELS.APPLICATIONS_TO_ME_PANEL}
                    >
                        <Icon28Incoming className={activePanel === PANELS.APPLICATIONS_TO_ME_PANEL ? 'nav-icon-selected' : 'nav-icon'} />
                    </TabsItem>
                    <TabsItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.APPLICATIONS_VIEW, PANELS.MY_APPLICATIONS_PANEL))}
                        selected={activePanel === PANELS.MY_APPLICATIONS_PANEL}
                    >
                        <Icon28Outgoing className={activePanel === PANELS.MY_APPLICATIONS_PANEL ? 'nav-icon-selected' : 'nav-icon'} />
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
)(ApplicationsTabs);


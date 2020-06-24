import React from 'react';
import { View, Div, Tabbar, Epic, TabbarItem } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { PANELS } from '../../utils/constants/panel.constants';
import { fetchListRequest } from "../../store/people-near-me/actions";
import PeopleNearMePanel from "../panels/people-near-me.panel";
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';
import Icon28Catalog from '@vkontakte/icons/dist/28/newsfeed_outline';
import { goForward } from '../../store/history/actions';
import { VkHistoryModel } from '../../store/history/models';
import { VIEWS } from '../../utils/constants/view.constants';
import PeopleNearMeListPanel from '../panels/people-near-me-list.panel';

interface PropsFromState {
    id: string;
    activePanel: string;
}

interface PropsFromDispatch {
    fetchList: typeof fetchListRequest,
    goForwardView: typeof goForward,
}

type AllProps = PropsFromState & PropsFromDispatch;

class PeopleNearMeView extends React.Component<AllProps>  {

    public componentDidMount() {
        const { fetchList } = this.props;
        fetchList({});
    }

    render() {
        const { id, activePanel, goForwardView } = this.props;
        return (
            <Div><Epic activeStory={activePanel} tabbar={
                <Tabbar>
                     <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.PEOPLE_NEAR_ME_VIEW, PANELS.PEOPLE_NEAR_ME_PANEL_CATALOG))}
                        selected={activePanel === PANELS.PEOPLE_NEAR_ME_PANEL_CATALOG}
                        data-story={PANELS.PEOPLE_NEAR_ME_PANEL_CATALOG}
                    ><Icon28Catalog className={activePanel === PANELS.PEOPLE_NEAR_ME_PANEL_CATALOG ? 'nav-icon-selected' : 'nav-icon'}/></TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.PEOPLE_NEAR_ME_VIEW, PANELS.PEOPLE_NEAR_ME_PANEL))}
                        selected={activePanel === PANELS.PEOPLE_NEAR_ME_PANEL}
                        data-story={PANELS.PEOPLE_NEAR_ME_PANEL}
                    ><Icon28Place className={activePanel === PANELS.PEOPLE_NEAR_ME_PANEL ? 'nav-icon-selected' : 'nav-icon'}/></TabbarItem>
                    <TabbarItem
                        onClick={() => goForwardView(new VkHistoryModel(VIEWS.MAIN_VIEW, PANELS.MENU_PANEL))}
                        selected={activePanel === PANELS.MENU_PANEL}
                        data-story={PANELS.MENU_PANEL}
                    ><Icon28Menu className={activePanel === PANELS.MENU_PANEL ? 'nav-icon-selected' : 'nav-icon'}/></TabbarItem>
                </Tabbar>
            }></Epic>
            <View id={id} activePanel={activePanel}>
                <PeopleNearMePanel id={PANELS.PEOPLE_NEAR_ME_PANEL}>
                </PeopleNearMePanel>
                <PeopleNearMeListPanel id={PANELS.PEOPLE_NEAR_ME_PANEL_CATALOG}>
                </PeopleNearMeListPanel>
            </View>
            </Div >
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    activePanel: history.currentViewPanel.panel
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchList: fetchListRequest,
    goForwardView: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleNearMeView);

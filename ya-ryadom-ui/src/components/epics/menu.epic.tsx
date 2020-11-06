import React from 'react';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28User from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon28Users from '@vkontakte/icons/dist/28/users_outline';
import { Epic, TabbarItem, Tabbar } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { VIEWS } from '../../utils/enums/views.enum';
import { setCurrentView } from '../../store/history/actions';
import Icon28Add from '@vkontakte/icons/dist/28/add_square_outline';

interface OwnProps {
    activeStory: string;
    children: React.ReactNode;
}

interface PropsFromState {
    activeView: VIEWS;
}

interface PropsFromDispatch {
    setCurrentView: typeof setCurrentView;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class MenuEpic extends React.Component<AllProps> {
    render() {
        const {
            activeView,
            activeStory,
            setCurrentView,
        } = this.props;
        return (
            <Epic
                activeStory={activeStory}
                tabbar={
                    <Tabbar>
                        <TabbarItem
                            onClick={() =>
                                setCurrentView(VIEWS.EVENTS_NEAR_ME_VIEW)
                            }
                            selected={activeView === VIEWS.EVENTS_NEAR_ME_VIEW}
                            data-story={VIEWS.EVENTS_NEAR_ME_VIEW}
                        >
                            <Icon28Place
                                className={
                                    activeView === VIEWS.EVENTS_NEAR_ME_VIEW
                                        ? 'nav-icon-selected'
                                        : 'nav-icon'
                                }
                            />
                        </TabbarItem>
                        <TabbarItem
                            onClick={() =>
                                setCurrentView(VIEWS.MY_EVENT_CREATE_VIEW)
                            }
                            selected={activeView === VIEWS.MY_EVENT_CREATE_VIEW}
                            data-story={VIEWS.MY_EVENT_CREATE_VIEW}
                        >
                            <Icon28Add
                                className={
                                    activeView === VIEWS.MY_EVENT_CREATE_VIEW
                                        ? 'nav-icon-selected'
                                        : 'nav-icon'
                                }
                            />
                        </TabbarItem>
                        <TabbarItem
                            onClick={() =>
                                setCurrentView(VIEWS.APPLICATIONS_VIEW)
                            }
                            selected={activeView === VIEWS.APPLICATIONS_VIEW}
                            data-story={VIEWS.APPLICATIONS_VIEW}
                        >
                            <Icon28Users
                                className={
                                    activeView === VIEWS.APPLICATIONS_VIEW
                                        ? 'nav-icon-selected'
                                        : 'nav-icon'
                                }
                            />
                        </TabbarItem>
                        <TabbarItem
                            onClick={() =>
                                setCurrentView(VIEWS.MY_PROFILE_VIEW)
                            }
                            selected={activeView === VIEWS.MY_PROFILE_VIEW}
                            data-story={VIEWS.MY_PROFILE_VIEW}
                        >
                            <Icon28User
                                className={
                                    activeView === VIEWS.MY_PROFILE_VIEW
                                        ? 'nav-icon-selected'
                                        : 'nav-icon'
                                }
                            />
                        </TabbarItem>
                    </Tabbar>
                }
            >
                {this.props.children}
            </Epic>
        );
    }
}

const mapStateToProps = ({ history }: AppState, ownProps: OwnProps) => ({
    activeView: history.currentView,
    activeStory: ownProps.activeStory,
    children: ownProps.children,
});

const mapDispatchToProps: PropsFromDispatch = {
    setCurrentView: setCurrentView,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuEpic);

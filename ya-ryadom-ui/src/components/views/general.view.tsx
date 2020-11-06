import React from 'react';
import { View } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { PANELS } from '../../utils/enums/panels.enum';
import ProfilePanel from '../panels/profile/user-profile.panel';
import UserEventsPanel from '../panels/events/user-events.panel';
import ReviewsPanel from '../panels/reviews/reviews.panel';
import { VIEWS } from '../../utils/enums/views.enum';
import { goBack } from '../../store/history/actions';

interface OwnProps {
    id: VIEWS;
    popout?: any;
}

interface PropsFromState {
    activePanel: PANELS;
    panelsHistory: string[];
}

interface PropsFromDispatch {
    goBack: typeof goBack;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class GeneralView extends React.Component<AllProps> {
    public componentDidMount() {}

    render() {
        const { id, activePanel, popout, goBack, panelsHistory } = this.props;
        return (
            <View
                id={id}
                activePanel={activePanel}
                popout={popout}
                onSwipeBack={goBack}
                history={panelsHistory}
            >
                <ProfilePanel id={PANELS.PROFILE_PANEL}></ProfilePanel>
                <ReviewsPanel id={PANELS.USER_REVIEWS_PANEL}></ReviewsPanel>
                <UserEventsPanel
                    id={PANELS.USER_EVENTS_PANEL}
                ></UserEventsPanel>
            </View>
        );
    }
}

const mapStateToProps = ({ history }: AppState, ownProps: OwnProps) => {
    const panelsHistory = history.viewPanelsHistory[ownProps.id];
    const lastPanel = panelsHistory[panelsHistory.length - 1]?.panel;
    return {
        activePanel: lastPanel,
        panelsHistory: panelsHistory?.map(
            (h) => h.panel,
        ),
        id: ownProps.id,
        popout: ownProps.popout,
    };
};

const mapDispatchToProps: PropsFromDispatch = {
    goBack: goBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralView);

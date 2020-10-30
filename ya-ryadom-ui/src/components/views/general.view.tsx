import React from 'react';
import { View } from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { PANELS } from '../../utils/constants/panel.constants';
import ProfilePanel from '../panels/profile/user-profile.panel';
import UserEventsPanel from '../panels/events/user-events.panel';
import ReviewsPanel from '../panels/reviews/reviews.panel';

interface OwnProps {
	id: string;
	popout?: any;
}

interface PropsFromState {
	activePanel: string;
}

interface PropsFromDispatch {}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class GeneralView extends React.Component<AllProps> {
	public componentDidMount() {}

	render() {
		const { id, activePanel, popout } = this.props;
		return (
			<View id={id} activePanel={activePanel} popout={popout}>
				<ProfilePanel id={PANELS.PROFILE_PANEL}></ProfilePanel>
				<ReviewsPanel id={PANELS.USER_REVIEWS_PANEL}></ReviewsPanel>
				<UserEventsPanel id={PANELS.USER_EVENTS_PANEL}></UserEventsPanel>
			</View>
		);
	}
}

const mapStateToProps = ({ history }: AppState, ownProps: OwnProps) => ({
	activePanel: history.currentViewPanel.panel,
	id: ownProps.id,
	popout: ownProps.popout,
});

const mapDispatchToProps: PropsFromDispatch = {};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralView);

import React from 'react';
import { connect } from 'react-redux';
import { View } from '@vkontakte/vkui';
import { PANELS } from '../../utils/constants/panel.constants';
import { AppState } from '../../store/app-state';
import MyEventCreatePanel from '../panels/my-event-create.panel';

interface OwnProps {
	id: string;
	popout?: any;
}

interface PropsFromState {
	activePanel: string;
}

interface PropsFromDispatch {}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

export class MyEventCreateView extends React.Component<AllProps> {
	render() {
		const { id, activePanel, popout } = this.props;
		return (
			<View id={id} activePanel={activePanel} popout={popout}>
				<MyEventCreatePanel id={PANELS.CREATE_EVENT_PANEL}></MyEventCreatePanel>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyEventCreateView);

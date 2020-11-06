import React from 'react';
import { Panel, PanelHeader, Group, CellButton } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../store/app-state';
import { goForward } from '../../store/history/actions';
import { VkHistoryModel } from '../../store/history/models';
import { VIEWS } from '../../utils/enums/views.enum';
import { PANELS } from '../../utils/enums/panels.enum';

interface PropsFromState {
	id: string;
}

interface PropsFromDispatch {
	goForwardView: typeof goForward;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class MenuPanel extends React.Component<AllProps> {
	render() {
		const { id, goForwardView } = this.props;
		return (
			<Panel id={id}>
				<PanelHeader>Главное меню</PanelHeader>
				<Group>
					<CellButton
						onClick={() =>
							goForwardView(
								new VkHistoryModel(
									VIEWS.EVENTS_NEAR_ME_VIEW,
									PANELS.EVENTS_NEAR_ME_PANEL,
								),
							)
						}
					>
						Карта
					</CellButton>
				</Group>
				<Group>
					<CellButton
						onClick={() =>
							goForwardView(
								new VkHistoryModel(
									VIEWS.MY_PROFILE_VIEW,
									PANELS.MY_PROFILE_PANEL,
								),
							)
						}
					>
						Мой профиль
					</CellButton>
				</Group>
				<Group>
					<CellButton
						onClick={() =>
							goForwardView(
								new VkHistoryModel(
									VIEWS.APPLICATIONS_VIEW,
									PANELS.APPLICATIONS_PANEL,
								),
							)
						}
					>
						Мои заявки
					</CellButton>
				</Group>
			</Panel>
		);
	}
}

const mapStateToProps = ({}: AppState) => ({});

const mapDispatchToProps: PropsFromDispatch = {
	goForwardView: goForward,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPanel);

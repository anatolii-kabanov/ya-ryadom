import './my-profile.panel.scss';
import React from 'react';
import { connect } from 'react-redux';
import { UserInfo } from '@vkontakte/vk-bridge';
import Icon24Star from '@vkontakte/icons/dist/24/favorite';
import {
	Group,
	Panel,
	Avatar,
	RichCell,
	Div,
	Header,
	Caption,
	Button,
	PanelHeader,
} from '@vkontakte/vkui';
import { AppState } from '../../../store/app-state';
import { goForward } from '../../../store/history/actions';
import { CurrentUser } from '../../../store/authentication/models';
import PillInput from '../../inputs/pill.input';
import { ALL_THEMES } from '../../../utils/constants/theme.constants';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/enums/views.enum';
import { PANELS } from '../../../utils/enums/panels.enum';

interface OwnProps {
	id: string;
}

interface PropsFromState {
	vkUserInfo: UserInfo | null;
	currentUser: CurrentUser | null;
}

interface PropsFromDispatch {
	goForwardView: typeof goForward;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class MyProfilePanel extends React.Component<AllProps> {
	constructor(props: AllProps) {
		super(props);
	}

	private renderThemes() {
		const { currentUser } = this.props;
		if (currentUser?.selectedThemes) {
			const themes = ALL_THEMES;
			return themes.map((item, key) => {
				return (
					<PillInput
						key={key}
						id={item.id}
						disabled={true}
						selected={currentUser.selectedThemes.indexOf(item.id) !== -1}
						text={item.name}
					></PillInput>
				);
			});
		}
	}

	render() {
		const { id, vkUserInfo, goForwardView, currentUser } = this.props;
		return (
			<Panel className='my-profile' id={id}>
				<PanelHeader separator={false}>Мой профиль</PanelHeader>
				<Group separator='hide'>
					<RichCell
						disabled
						multiline
						text={currentUser?.aboutMySelf}
						before={<Avatar size={72} src={vkUserInfo?.photo_200} />}
					>
						<span className='profile-main-row'>
							{vkUserInfo?.first_name} {vkUserInfo?.last_name}
							<Icon24Star className='star' width={18} height={18}></Icon24Star>
							<Caption className='rating' weight='regular' level='1'>
								{currentUser?.avgRating.toFixed(1)}
							</Caption>
						</span>
					</RichCell>
					<Button
						className='btn-secondary text-center'
						onClick={() =>
							goForwardView(
								new VkHistoryModel(
									VIEWS.MY_PROFILE_VIEW,
									PANELS.MY_PROFILE_EDIT_PANEL,
								),
							)
						}
					>
						Редактировать
					</Button>
				</Group>
				<Group header={<Header mode='secondary'>Темы</Header>} separator='hide'>
					<Div className='pills'>{this.renderThemes()}</Div>
				</Group>
			</Panel>
		);
	}
}

const mapStateToProps = ({ authentication }: AppState, ownProps: OwnProps) => ({
	vkUserInfo: authentication.vkUserInfo,
	currentUser: authentication.currentUser,
	id: ownProps.id,
});

const mapDispatchToProps: PropsFromDispatch = {
	goForwardView: goForward,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePanel);

import './themes-intro.panel.scss';
import React from 'react';
import { Panel, PanelHeader, Group } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import ThemesForm from '../../forms/themes.form';
import { setUserThemes } from '../../../store/authentication/actions';
import { ThemeType } from '../../../utils/enums/theme-type.enum';
import { goForward } from '../../../store/history/actions';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/constants/view.constants';
import { PANELS } from '../../../utils/constants/panel.constants';

interface ownProps {
	id: string;
}

interface PropsFromState {}

interface PropsFromDispatch {
	setUserThemes: typeof setUserThemes;
	goForward: typeof goForward;
}

type AllProps = ownProps & PropsFromState & PropsFromDispatch;

class ThemesIntroPanel extends React.Component<AllProps> {
	constructor(props: AllProps) {
		super(props);
		this.onSave = this.onSave.bind(this);
	}

	componentDidMount() {}

	onSave(themes: ThemeType[]) {
		const { setUserThemes, goForward } = this.props;
		setUserThemes(themes);
		goForward(
			new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.ABOUT_MYSELF_INTRO_PANEL),
		);
	}

	render() {
		const { id } = this.props;
		return (
			<Panel id={id} className='profile-intro-panel'>
				<PanelHeader separator={false}>Я рядом</PanelHeader>
				<Group className='profile-group' separator='hide'>
					<ThemesForm onSave={this.onSave}></ThemesForm>
				</Group>
			</Panel>
		);
	}
}

const mapStateToProps = ({}: AppState, ownProps: ownProps) => ({
	id: ownProps.id,
});

const mapDispatchToProps: PropsFromDispatch = {
	setUserThemes: setUserThemes,
	goForward: goForward,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemesIntroPanel);

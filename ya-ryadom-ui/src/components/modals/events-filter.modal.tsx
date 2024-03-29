import './events-filter.modal.scss';
import React from 'react';
import { connect } from 'react-redux';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import {
	FormLayout,
	Input,
	Slider,
	ModalPage,
	ModalPageHeader,
	PanelHeaderButton,
	Select,
	Button,
	platform,
	ANDROID,
	IOS,
} from '@vkontakte/vkui';
import { AppState } from './../../store/app-state';
import { EventsFilter } from '../../store/ui/settings/state';
import {
	clearEventsFilter,
	setEventsFilter,
	updateEventsRadiusFilter,
	updateEventsTextFilter,
	updateEventsThemeFilter,
	updateEventsAddressFilter,
} from '../../store/ui/settings/actions';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import AutocompleteMap from '../inputs/autocomplete-map.input';
import { Position } from '../../store/authentication/models';

interface OwnProps {
	id: string;
	onClose: (updateEvents?: boolean) => void;
}

interface PropsFromState {
	filter: EventsFilter;
	isClearFilterEnabled: boolean;
}

interface PropsFromDispatch {
	clearFilter: typeof clearEventsFilter;
	setFilter: typeof setEventsFilter;
	updateRadius: typeof updateEventsRadiusFilter;
	updateText: typeof updateEventsTextFilter;
	updateTheme: typeof updateEventsThemeFilter;
	updateAddress: typeof updateEventsAddressFilter;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {
	radius: number;
}

const maxValues = {
	maxSearchText: 84,
};

const osname = platform();

class EventsFilterModal extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.showResultsClick = this.showResultsClick.bind(this);
	}

	renderThemesSelect() {
		const themes = ALL_THEMES;
		if (themes) {
			return themes.map((item, key) => {
				return (
					<option key={key} value={item.id}>
						{item.name}
					</option>
				);
			});
		}
	}

	showResultsClick() {
		const { setFilter, onClose } = this.props;
		setFilter();
		onClose(true);
	}

	handleInputChange = (event) => {
		const { updateText, updateTheme } = this.props;
		event.preventDefault();
		switch (event.target.name) {
			case 'textSearch':
				updateText(event.target.value);
				break;
			case 'selectedTheme':
				updateTheme(event.target.value);
				break;
		}
	};

	handleRadiusChange = (radius: number) => {
		const { updateRadius } = this.props;
		updateRadius(radius);
	};

	handleLocationChange = (position: Position, address: string) => {
		const { updateAddress } = this.props;
		updateAddress({ position: position, address: address });
	};

	render() {
		const {
			filter,
			onClose,
			clearFilter,
			id,
			isClearFilterEnabled,
		} = this.props;
		return (
			<ModalPage
				id={id}
				dynamicContentHeight={true}
				className='filter-modal'
				onClose={() => onClose()}
				header={
					<ModalPageHeader
						left={
							<React.Fragment>
								{osname === ANDROID && (
									<PanelHeaderButton onClick={() => onClose()}>
										{' '}
										<Icon24Cancel />
									</PanelHeaderButton>
								)}
								{osname === IOS && (
									<PanelHeaderButton
										className={`text-primary clear-btn${
											!isClearFilterEnabled ? '-disabled' : ''
										}`}
										onClick={() => clearFilter()}
									>
										Очистить
									</PanelHeaderButton>
								)}
							</React.Fragment>
						}
						right={
							<React.Fragment>
								{osname === ANDROID && (
									<PanelHeaderButton
										className={`text-primary clear-btn${
											!isClearFilterEnabled ? '-disabled' : ''
										}`}
										onClick={() => clearFilter()}
									>
										Очистить
									</PanelHeaderButton>
								)}
								{osname === IOS && (
									<PanelHeaderButton onClick={() => onClose()}>
										<Icon24Dismiss />
									</PanelHeaderButton>
								)}
							</React.Fragment>
						}
					>
						Фильтры
					</ModalPageHeader>
				}
			>
				<FormLayout>
					<Input
						maxLength={maxValues.maxSearchText}
						value={filter.text}
						type='text'
						placeholder='Поиск по интересам'
						name='textSearch'
						onChange={this.handleInputChange}
					></Input>
					<Select
						value={filter.selectedTheme ?? ''}
						top='Тема'
						placeholder='Выберите тему'
						name='selectedTheme'
						onChange={this.handleInputChange}
					>
						{this.renderThemesSelect()}
					</Select>
					<AutocompleteMap
						address={filter.address}
						top='Адрес'
						placeholder='Выбрать адрес'
						type='address'
						loadMaps={true}
						onLocationChanged={this.handleLocationChange}
					></AutocompleteMap>
					<Slider
						min={1}
						max={100}
						step={0.5}
						value={filter.radius}
						onChange={(radius) => this.handleRadiusChange(radius)}
						top={
							<span className='radius'>
								Радиус <span>{filter.radius} км</span>
							</span>
						}
					/>
					<Button
						className='btn-primary'
						size='xl'
						onClick={this.showResultsClick}
					>
						Показать результаты
					</Button>
				</FormLayout>
			</ModalPage>
		);
	}
}

const mapStateToProps = ({ ui }: AppState, ownProps: OwnProps) => ({
	filter: ui.settings.eventsFilterForm,
	isClearFilterEnabled: ui.settings.isClearFilterEnabled,
	onClose: ownProps.onClose,
	id: ownProps.id,
});

const mapDispatchToProps: PropsFromDispatch = {
	clearFilter: clearEventsFilter,
	setFilter: setEventsFilter,
	updateRadius: updateEventsRadiusFilter,
	updateText: updateEventsTextFilter,
	updateTheme: updateEventsThemeFilter,
	updateAddress: updateEventsAddressFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsFilterModal);

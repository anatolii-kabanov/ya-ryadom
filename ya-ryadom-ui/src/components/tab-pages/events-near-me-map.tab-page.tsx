import './events-near-me-map.tab-page.scss';
import React from 'react';
import {
	Group,
	Div,
	CardGrid,
	Card,
	RichCell,
	Avatar,
	Button,
	Header,
} from '@vkontakte/vkui';
import { AppState } from './../../store/app-state';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Marker from './../map/marker';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import { MAP } from './../../utils/constants/map.constants';
import { Geo } from './../../store/authentication/models';
import { goForward, openUserProfile } from './../../store/history/actions';
import { fetchListRequest } from '../../store/events/events-near-me/actions';
import { EventNearMe } from '../../store/events/events-near-me/models';
import { UserInfo } from '@vkontakte/vk-bridge';
import { Position } from '../../store/authentication/models';

import { ApplicationStatus } from '../../utils/enums/application-status.enum';
import { applyToEventFromEvents } from '../../store/applications/actions';
import debounce from 'lodash/debounce';
import UserMarker from '../map/user-marker';
import { EventsFilter } from '../../store/ui/settings/state';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import { dateOptions } from '../../utils/constants/event-date-options.constant';
import { ApplicationStatusString } from '../../utils/constants/application-status-string.constant';
import Icon16MoreHorizontal from '@vkontakte/icons/dist/16/more_horizontal';
import { mapOptions } from '../../utils/map/map-options';

interface OwnProps {
	openPopout: (eventId: number) => void;
	id: string;
}

interface PropsFromState {
	events: EventNearMe[];
	userPosition: Geo | null;
	vkUserInfo: UserInfo | null;
	lastLocation: Position | null | undefined;
	filter: EventsFilter;
}

interface PropsFromDispatch {
	goForwardView: typeof goForward;
	fetchList: typeof fetchListRequest;
	applyToEvent: typeof applyToEventFromEvents;
	openUserProfile: typeof openUserProfile;
}
type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {
	eventOnMap: any;
}

class EventsNearMeMapTabPage extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {
			eventOnMap: null,
		};
		this.onMarkerClick = this.onMarkerClick.bind(this);
	}

	private renderEvents() {
		const { events } = this.props;
		if (events && Object.keys(events).length !== 0) {
			return events.map((item, key) => {
				return (
					<Marker
						status={item.applicationStatus}
						selected={this.state.eventOnMap?.id === item.id}
						key={key}
						lat={item.latitude}
						lng={item.longitude}
						text={item.title}
						onClick={() => this.onMarkerClick(item)}
					/>
				);
			});
		}
	}

	updateEvents = debounce((e: any) => {
		const { fetchList, vkUserInfo, filter } = this.props;
		fetchList({
			userId: 0,
			vkUserId: vkUserInfo?.id,
			latitude: this.getLatitude(),
			longitude: this.getLongitude(),
			maxDistance: filter.radius,
			searchText: filter.text,
		});
	}, 100);

	onMarkerClick(event: any) {
		this.setState({
			eventOnMap: event,
		});
	}

	getLatitude = (): number => {
		const { userPosition, lastLocation, filter } = this.props;
		if (filter.selectedPosition) {
			return filter.selectedPosition.latitude;
		}
		return (userPosition?.lat ?? lastLocation?.latitude) || 0;
	};

	getLongitude = () => {
		const { userPosition, lastLocation, filter } = this.props;
		if (filter.selectedPosition) {
			return filter.selectedPosition.longitude;
		}
		return (userPosition?.long ?? lastLocation?.longitude) || 0;
	};

	apply(eventId: number) {
		const { applyToEvent } = this.props;
		applyToEvent(eventId);
	}

	render() {
		const { events, openUserProfile, openPopout } = this.props;
		let eventOnMap;
		let selectedEvent = events.find((e) => e.id === this.state.eventOnMap?.id);
		if (selectedEvent) {
			eventOnMap = (
				<Div className='card-container'>
					<CardGrid>
						<Card size='l'>
							<div className='cell-container'>
								<Group
									header={
										<Header
											mode='secondary'
											aside={
												<div className='selected-event-aside'>
													<Icon16MoreHorizontal
														onClick={() => openPopout(selectedEvent?.id || 0)}
													/>
													<Icon24Dismiss
														onClick={() => this.setState({ eventOnMap: null })}
													/>
												</div>
											}
										>
											{
												ALL_THEMES.find(
													(m) => m.id === selectedEvent?.themeType,
												)?.name
											}
										</Header>
									}
								>
									<RichCell
										disabled
										multiline
										before={
											<Avatar
												onClick={() =>
													openUserProfile(selectedEvent?.vkUserOwnerId || 0)
												}
												size={48}
												src={selectedEvent?.vkUserAvatarUrl}
											/>
										}
										text={selectedEvent?.description}
										caption={`${new Date(
											selectedEvent?.date,
										).toLocaleDateString('ru-RU', dateOptions)} в ${
											selectedEvent?.time
										}`}
									>
										<span>
											{selectedEvent?.userFullName}{' '}
											<span className='distance'>
												{selectedEvent?.distance &&
													(selectedEvent?.distance / 1000).toFixed(2)}{' '}
												км
											</span>
										</span>
									</RichCell>

									<Div className='map-card-buttons-div'>
										{selectedEvent?.applicationStatus ===
										ApplicationStatus.none ? (
											<Button
												className='button-primary'
												onClick={() => this.apply(selectedEvent?.id || 0)}
											>
												Иду
											</Button>
										) : (
											<Button
												className='button-primary btn-status disabled'
												disabled={true}
											>
												{
													ApplicationStatusString[
														selectedEvent?.applicationStatus
													]
												}
											</Button>
										)}
										<Button
											className='btn-secondary'
											onClick={() =>
												openUserProfile(selectedEvent?.vkUserOwnerId || 0)
											}
										>
											Профиль
										</Button>
									</Div>
								</Group>
							</div>
						</Card>
					</CardGrid>
				</Div>
			);
		}
		return (
			<Group separator='hide' className='events-near-me-map'>
				<Group separator='hide'>
					<div className='map'>
						<GoogleMapReact
							options={mapOptions}
							bootstrapURLKeys={{
								key: MAP.KEY,
								libraries: ['places'],
							}}
							center={{
								lat: this.getLatitude(),
								lng: this.getLongitude(),
							}}
							defaultCenter={{
								lat: this.getLatitude(),
								lng: this.getLongitude(),
							}}
							defaultZoom={14}
						>
							<UserMarker
								lat={this.getLatitude()}
								lng={this.getLongitude()}
							></UserMarker>
							{this.renderEvents()}
						</GoogleMapReact>
					</div>
				</Group>
				{selectedEvent && eventOnMap}
			</Group>
		);
	}
}

const mapStateToProps = (
	{ events, authentication, ui }: AppState,
	ownProps: OwnProps,
) => ({
	events: events.eventsNearMe.eventsList,
	userPosition: authentication.geoData,
	lastLocation: authentication.currentUser?.lastLocation,
	vkUserInfo: authentication.vkUserInfo,
	filter: ui.settings.eventsFilter,
	id: ownProps.id,
	openPopout: ownProps.openPopout,
});

const mapDispatchToProps: PropsFromDispatch = {
	goForwardView: goForward,
	fetchList: fetchListRequest,
	applyToEvent: applyToEventFromEvents,
	openUserProfile: openUserProfile,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EventsNearMeMapTabPage);

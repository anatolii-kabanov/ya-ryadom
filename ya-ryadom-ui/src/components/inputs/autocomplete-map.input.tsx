import React from 'react';
import { MAP } from '../../utils/constants/map.constants';
import { Spinner, Input, FormStatus } from '@vkontakte/vkui';
import { Position } from '../../store/authentication/models';

interface AutocompleteProps {
	loadMaps: boolean;
	type: '(cities)' | 'address';
	onLocationChanged: (location: Position, address: string) => void;
	placeholder?: string;
	top?: string;
	address?: string;
	isOnline?: boolean;
}

interface State {
	query: string;
	googleMapsReady: boolean;
	googleMapsError: boolean;
}

const scriptId = 'googlePlacesScript';

class AutocompleteMap extends React.PureComponent<AutocompleteProps, State> {
	autoComplete: any;
	autoCompleteRef: any;

	constructor(props: AutocompleteProps) {
		super(props);
		this.autoCompleteRef = React.createRef();
		this.state = {
			query: props.address || '',
			googleMapsReady: false,
			googleMapsError: false,
		};
	}

	componentDidMount() {
		this.initGoogleMaps();
	}

	componentWillUnmount() {
		this.unloadGoogleMaps();
	}

	componentDidUpdate(prevProps: AutocompleteProps) {
		const { googleMapsReady, googleMapsError } = this.state;
		const { isOnline, type } = this.props;
		if (
			prevProps.isOnline !== isOnline &&
			isOnline &&
			googleMapsError &&
			!googleMapsReady
		) {
			this.initGoogleMaps();
		}
	}

	componentWillReceiveProps(nextProps: AutocompleteProps) {
		if (nextProps.address !== this.state.query) {
			this.setState({ query: nextProps.address || '' });
		}
	}

	initAutoComplete = () => {
		const { type } = this.props;
		this.setState({ googleMapsReady: true, googleMapsError: false });
		this.autoComplete = new window.google.maps.places.Autocomplete(
			this.autoCompleteRef.current,
			{ types: [type], componentRestrictions: { country: 'ru' } },
		);
		this.autoComplete.setFields([
			'address_components',
			'formatted_address',
			'geometry',
		]);
		this.autoComplete.addListener('place_changed', () => handlePlaceSelect());

		const handlePlaceSelect = async () => {
			const addressObject = this.autoComplete.getPlace();
			const query = addressObject.formatted_address;
			this.setState({ query: query });
			const { onLocationChanged } = this.props;
			onLocationChanged(
				{
					latitude: addressObject.geometry.location.lat(),
					longitude: addressObject.geometry.location.lng(),
				},
				query,
			);
		};
	};

	initGoogleMaps = () => {
		this.loadGoogleMaps(() => {
			this.initAutoComplete();
		});
	};

	loadGoogleMaps = (callback) => {
		const { loadMaps } = this.props;
		let existingScript = document.getElementById(scriptId);

		if (!existingScript && loadMaps) {
			const script = document.createElement('script');
			script.async = true;
			script.defer = true;
			script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP.KEY}&libraries=places`;
			script.id = scriptId;
			document.body.appendChild(script);
			//action to do after a script is loaded in our case setState
			script.onload = () => {
				if (callback) callback();
			};

			script.onerror = (error) => {
				this.setState({ googleMapsError: true });
				document.body.removeChild(script);
			};
		}
		if ((existingScript || !loadMaps) && callback) {
			callback();
		}
	};

	unloadGoogleMaps = () => {
		let googlePlacesScript = document.getElementById(scriptId);
		if (googlePlacesScript) {
			googlePlacesScript.remove();
		}
	};

	render() {
		const { query, googleMapsReady, googleMapsError } = this.state;
		const { placeholder, top } = this.props;
		return !googleMapsReady ? (
			!googleMapsError ? (
				<Spinner size='large'></Spinner>
			) : (
				<FormStatus mode='error'>
					При загрузке произошла ошибка. Проверьте интернет соединение и
					попробуйте еще раз.
				</FormStatus>
			)
		) : (
			<div className='search-places-input'>
				<Input
					top={top}
					getRef={this.autoCompleteRef}
					autoComplete='on'
					onChange={(event) => this.setState({ query: event.target.value })}
					placeholder={placeholder || 'Выберите город'}
					value={query}
				></Input>
			</div>
		);
	}
}

export default AutocompleteMap;

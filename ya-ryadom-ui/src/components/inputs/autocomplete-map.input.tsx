import React from "react";
import { MAP } from "../../utils/constants/map.constants";
import { Spinner, Input, FormStatus } from "@vkontakte/vkui";
import { Position } from "../../store/authentication/models";

interface AutocompleteProps {
    loadMaps: boolean;
    type: "(cities)" | "address"
    onLocationChanged: (location: Position, address: string) => void;
    placeholder?: string;
    top?: string;
    address?: string;
}

interface State {
    query: string;
    googleMapsReady: boolean;
    googleMapsError: boolean;
}

class AutocompleteMap extends React.PureComponent<AutocompleteProps, State>{

    autoComplete: any;

    constructor(props) {
        super(props)
        this.autoComplete = React.createRef();
        this.state = {
            query: props.address,
            googleMapsReady: false,
            googleMapsError: false,
        };
    }

    componentDidMount() {
        const { type } = this.props;
        this.loadGoogleMaps(() => {
            this.setState({ googleMapsReady: true, googleMapsError: false });
            this.autoComplete = new window.google.maps.places.Autocomplete(
                this.autoComplete.current,
                { types: [type], componentRestrictions: { country: "ru" } }
            );
            this.autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
            this.autoComplete.addListener("place_changed", () =>
                handlePlaceSelect()
            );

            const handlePlaceSelect = async () => {
                const addressObject = this.autoComplete.getPlace();
                const query = addressObject.formatted_address;
                this.setState({ query: query });
                const { onLocationChanged } = this.props;
                onLocationChanged({
                    latitude: addressObject.geometry.location.lat(),
                    longitude: addressObject.geometry.location.lng()
                }, query);
            }
        });
    }

    componentWillUnmount() {
        this.unloadGoogleMaps();
    }

    loadGoogleMaps = (callback) => {
        const { loadMaps } = this.props;
        const existingScript = document.getElementById("googlePlacesScript");
        if (!existingScript && loadMaps) {
            const script = document.createElement("script");
            script.src =
                `https://maps.googleapis.com/maps/api/js?key=${MAP.KEY}&libraries=places`;
            script.id = "googlePlacesScripty";
            document.body.appendChild(script);
            //action to do after a script is loaded in our case setState
            script.onload = () => {
                if (callback) callback();
            };

            script.onerror = (error) => {
                console.log(error);
                this.setState({ googleMapsError: true });
            }
        }
        if ((existingScript || !loadMaps) && callback) callback();
    };

    unloadGoogleMaps = () => {
        let googlePlacesScript = document.getElementById("googlePlacesScript");
        if (googlePlacesScript) {
            googlePlacesScript.remove();
        }
    };

    render() {
        const { query, googleMapsReady, googleMapsError } = this.state;
        const { placeholder, top } = this.props;
        return (
            !googleMapsReady
                ? (!googleMapsError
                    ? <Spinner size="large"></Spinner>
                    : <FormStatus mode="error">
                        Произошла ошибка при загрузке. Проверьте интернет соединение и попробуйте еще раз.
                    </FormStatus>)
                : <div className="search-places-input">
                    <Input
                        top={top}
                        getRef={this.autoComplete}
                        autoComplete="on"
                        onChange={event => this.setState({ query: event.target.value })}
                        placeholder={placeholder || "Выберите город"}
                        value={query}>
                    </Input>
                </div>
        )
    }

}


export default AutocompleteMap;

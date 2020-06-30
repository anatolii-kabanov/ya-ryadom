import React from "react";
import { MAP } from "../../utils/constants/map.constants";
import { Div, Spinner, Input } from "@vkontakte/vkui";
import { Position } from "../../store/authentication/models";

interface AutocompleteProps {
    onLocationChanged: (location: Position) => void;
}

interface State {
    query: string;
    googleMapsReady: boolean;    
}

class AutocompleteMap extends React.PureComponent<AutocompleteProps, State>{

    autoComplete: any;

    constructor(props) {
        super(props)
        this.autoComplete = React.createRef();
        this.state = {
            query: "",
            googleMapsReady: false            
        };
    }

    componentDidMount() {

        this.loadGoogleMaps(() => {
            this.setState({ googleMapsReady: true });
            this.autoComplete = new window.google.maps.places.Autocomplete(
                this.autoComplete.current,
                { types: ["(cities)"], componentRestrictions: { country: "ru" } }
            );
            this.autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
            console.log(this.autoComplete);
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
                });
            }
        });
    }

    componentWillUnmount() {
        this.unloadGoogleMaps();
    }

    loadGoogleMaps = (callback) => {
        const existingScript = document.getElementById("googlePlacesScript");
        if (!existingScript) {
            const script = document.createElement("script");
            script.src =
                `https://maps.googleapis.com/maps/api/js?key=${MAP.KEY}&libraries=places`;
            script.id = "googlePlacesScripty";
            document.body.appendChild(script);
            //action to do after a script is loaded in our case setState
            script.onload = () => {
                if (callback) callback();
            };
        }
        if (existingScript && callback) callback();
    };

    unloadGoogleMaps = () => {
        let googlePlacesScript = document.getElementById("googlePlacesScript");
        if (googlePlacesScript) {
            googlePlacesScript.remove();
        }
    };

    render() {
        const { query, googleMapsReady } = this.state;
        return (
            !googleMapsReady
                ? <Spinner size="large"></Spinner>
                : <Div className="search-places-input">
                    <Input
                        getRef={this.autoComplete}
                        autoComplete="on"
                        onChange={event => this.setState({ query: event.target.value })}
                        placeholder="Выберите город"
                        value={query}>
                    </Input>
                </Div>
        )
    }

}


export default AutocompleteMap;

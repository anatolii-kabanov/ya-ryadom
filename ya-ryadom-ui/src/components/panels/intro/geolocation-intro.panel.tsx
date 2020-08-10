import './geolocation-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Switch,
    Placeholder,
    Div,
    Button
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { CurrentUser, Geo } from '../../../store/authentication/models';
import Icon32Place from '@vkontakte/icons/dist/32/place';
import { fetchUserGeoRequest } from '../../../store/authentication/actions';
import { goForward } from '../../../store/history/actions';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/constants/view.constants';
import { PANELS } from '../../../utils/constants/panel.constants';

interface OwnProps {
    id: string,
}

interface PropsFromState {
    currentUser: CurrentUser,
    userGeo: Geo,
}

interface PropsFromDispatch {
    getGeoData: typeof fetchUserGeoRequest,
    goForward: typeof goForward,
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class GeolocationIntroPanel extends React.Component<AllProps>  {

    /**
     *
     */
    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onGeolocationClick = this.onGeolocationClick.bind(this);
    }

    onGeolocationClick = (event: any) => {
        const { getGeoData } = this.props;
        if (event.target.checked) {
            getGeoData();
        } else {

        }
    }

    onClickNext = () => {
        const { userGeo, goForward } = this.props;
        if (userGeo?.available) {
            goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.THEMES_INTRO_PANEL));
        } else {
            goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.SELECT_CITY_INTRO_PANEL));
        }
    }

    render() {
        const { id, currentUser } = this.props;
        return (
            <Panel id={id} className="geolocation-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <Group separator="hide">
                    <Placeholder
                        icon={<Icon32Place className="nav-icon-selected" />}
                        header="Ваша геопозиция будет нужна нам, чтобы подбирать события находящиеся поблизости с Вами."
                        action={<Div className="flex-center"><Switch checked={currentUser.geolocationEnabled} name="enableGeolocation" className="switcher" onClick={this.onGeolocationClick} /></Div>}
                    >
                        Разрешите использовать Ваши геоданные в нашем приложении
                    </Placeholder>
                </Group>
                <Group className="btn-container-bottom">
                    <Button className="btn-primary" size="xl" onClick={this.onClickNext}>Далее</Button>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState, ownProps: OwnProps) => ({
    currentUser: authentication.currentUser,
    userGeo: authentication.geoData,
    id: ownProps.id,
})

const mapDispatchToProps: PropsFromDispatch = {
    getGeoData: fetchUserGeoRequest,
    goForward: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GeolocationIntroPanel);

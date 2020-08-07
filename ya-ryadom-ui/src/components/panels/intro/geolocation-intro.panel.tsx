import './geolocation-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Text,
    Switch,
    Cell
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { CurrentUser } from '../../../store/authentication/models';

interface PropsFromState {
    id: string,
    currentUser: CurrentUser,
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch;

class GeolocationIntroPanel extends React.Component<AllProps>  {

    onGeolocationClick(event: any) {
        const { } = this.props;
        if (event.target.checked) {

        } else {

        }
    }

    render() {
        const { id, currentUser } = this.props;
        return (
            <Panel id={id} className="geolocation-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <Group>
                    <Text weight="regular">
                        Ваша геопозиция будет нужна нам, чтобы подбирать события находящиеся поблизости с Вами.
                    </Text>
                    <Cell
                        asideContent={
                            <Switch checked={currentUser.geolocationEnabled} name="enableGeolocation" className="switcher" onClick={this.onGeolocationClick} />}
                        description="Разрешить использовать Ваши геоданные в нашем приложении">
                        Геолокация
                    </Cell>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({
    currentUser: authentication.currentUser,
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GeolocationIntroPanel);

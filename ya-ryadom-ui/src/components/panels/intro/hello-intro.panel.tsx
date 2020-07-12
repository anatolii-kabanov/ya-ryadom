import './hello-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Div,
    Button,
    Title
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { ReactComponent as IntroImage } from '../../../assets/images/svg/hello-intro.svg';
import { AppState } from '../../../store/app-state';
import { goForward } from '../../../store/history/actions';
import { fetchUserGeoRequest } from "../../../store/authentication/actions";
import { UserInfo } from '@vkontakte/vk-bridge';
import { User } from '../../../store/authentication/models';

interface PropsFromState {
    id: string,
    vkUserInfo: UserInfo,
    currentUser: User
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
    getGeoData: typeof fetchUserGeoRequest,
}

type AllProps = PropsFromState & PropsFromDispatch;

class HelloIntroPanel extends React.Component<AllProps>  {

    constructor(props) {
        super(props);
        this.onHelloIntroCompleted = this.onHelloIntroCompleted.bind(this)
    }

    componentDidMount() {

    }

    onHelloIntroCompleted() {
        const { getGeoData } = this.props;
        getGeoData();
    }

    render() {
        const { id, vkUserInfo, currentUser } = this.props;
        return (
            <Panel id={id} className="hello-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <Title level="2" weight="semibold" className="title">{vkUserInfo?.first_name && `Здравствуй, ${vkUserInfo.first_name}!`}</Title>
                <Group className="intro-group">
                    <Div className="intro-image">
                        <IntroImage></IntroImage>
                    </Div>
                    <Div className="intro-text">
                        <p className="first-row-text">Твой будущий друг уже рядом. <br /> Несколько действий и ты в большой тусовке своего города.</p>
                        {
                            currentUser && <div><p className="second-row-text">Весь спектр интересов в одном приложении. <br /> Каждый найдёт себе дело по душе.</p>
                                <Div>
                                    <Button size="xl" className="btn-primary" onClick={() => this.onHelloIntroCompleted()}>Начать</Button>
                                </Div>
                            </div>
                        }
                    </Div>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({
    vkUserInfo: authentication.vkUserInfo,
    currentUser: authentication.currentUser,
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
    getGeoData: fetchUserGeoRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HelloIntroPanel);

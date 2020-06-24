import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Div,
    Button
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { ReactComponent as IntroImage } from '../../assets/images/svg/Intro.svg'
import { AppState } from '../../store/app-state';
import { goForward } from '../../store/history/actions';
import { saveUserInfoGuideRequest } from "../../store/authentication/actions";
import { VkHistoryModel } from '../../store/history/models';
import { VIEWS } from '../../utils/constants/view.constants';
import { PANELS } from '../../utils/constants/panel.constants';

interface PropsFromState {
    id: string;
}

interface PropsFromDispatch {
    goForwardView: typeof goForward,
    saveUserInfo: typeof saveUserInfoGuideRequest
}

type AllProps = PropsFromState & PropsFromDispatch;

class IntroPanel extends React.Component<AllProps>  {
    constructor(props) {
        super(props);
        this.onIntroCompleted = this.onIntroCompleted.bind(this)
    }

    onIntroCompleted() {
        const { goForwardView } = this.props;
        goForwardView(new VkHistoryModel(VIEWS.PEOPLE_NEAR_ME_VIEW, PANELS.PEOPLE_NEAR_ME_PANEL));
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id}>
                <PanelHeader>
                    Приветствуем!
                </PanelHeader>
                <Group>
                    <Div style={{ textAlign: 'center' }}>
                        <IntroImage></IntroImage>
                    </Div>
                    <Div>
                        <p style={{ textAlign: 'center', fontWeight: 700, fontSize: 22 }}>Твой будущий друг уже рядом. <br /> Несколько действий и ты в большой тусовке своего города.</p>
                    </Div>
                    <Div>
                        <p style={{ textAlign: 'center', fontWeight: 300 }}>Весь спектр интересов в одном приложении. <br /> Каждый найдёт себе дело по душе.</p>
                    </Div>
                    <Div>
                        <Button size="l" className="btn-primary" onClick={() => this.onIntroCompleted()}>Начать</Button>
                    </Div>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({
    // vkUserInfo: authentication.vkUserInfo
})

const mapDispatchToProps: PropsFromDispatch = {
    goForwardView: goForward,
    saveUserInfo: saveUserInfoGuideRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntroPanel);

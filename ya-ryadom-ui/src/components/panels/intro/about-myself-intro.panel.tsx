import './about-myself-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { setUserAboutMyself } from '../../../store/authentication/actions';
import AboutMyselfForm from '../../forms/about-myself.form';
import { goForward } from '../../../store/history/actions';
import { VkHistoryModel } from '../../../store/history/models';
import { VIEWS } from '../../../utils/constants/view.constants';
import { PANELS } from '../../../utils/constants/panel.constants';

interface OwnProps {
    id: string,
}

interface PropsFromState {

}

interface PropsFromDispatch {
    setUserAboutMyself: typeof setUserAboutMyself,
    goForward: typeof goForward,
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class AboutMyselfIntroPanel extends React.Component<AllProps>  {

    /**
     *
     */
    constructor(props: AllProps) {
        super(props);
        this.onSave = this.onSave.bind(this);
    }

    onSave = (text: string) => {
        const { setUserAboutMyself, goForward } = this.props;
        setUserAboutMyself(text);
        goForward(new VkHistoryModel(VIEWS.INTRO_VIEW, PANELS.EVENT_CREATED_INTRO_PANEL));
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="about-myself-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <AboutMyselfForm onSave={this.onSave}></AboutMyselfForm>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState, ownProps: OwnProps) => ({
    id: ownProps.id
})

const mapDispatchToProps: PropsFromDispatch = {
    setUserAboutMyself: setUserAboutMyself,
    goForward: goForward,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutMyselfIntroPanel);

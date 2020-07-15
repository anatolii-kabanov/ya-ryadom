import './about-myself-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { saveUserIntroAboutMysel } from '../../../store/authentication/actions';
import AboutMyselfForm from '../../forms/about-myself.form';

interface PropsFromState {
    id: string,
}

interface PropsFromDispatch {
    saveAboutMyself: typeof saveUserIntroAboutMysel
}

type AllProps = PropsFromState & PropsFromDispatch;

class AboutMyselfIntroPanel extends React.Component<AllProps>  {

    render() {
        const { id, saveAboutMyself } = this.props;
        return (
            <Panel id={id} className="about-myself-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <AboutMyselfForm onSave={saveAboutMyself}></AboutMyselfForm>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    saveAboutMyself: saveUserIntroAboutMysel
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutMyselfIntroPanel);

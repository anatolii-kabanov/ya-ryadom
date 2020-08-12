import './about-myself-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { completeUserGuide } from '../../../store/authentication/actions';
import AboutMyselfForm from '../../forms/about-myself.form';

interface OwnProps {
    id: string,
}

interface PropsFromState {

}

interface PropsFromDispatch {
    completeUserGuide: typeof completeUserGuide,
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
        const { completeUserGuide } = this.props;
        completeUserGuide(text);
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="about-myself-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <AboutMyselfForm onSave={this.onSave} btnText="Завершить"></AboutMyselfForm>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState, ownProps: OwnProps) => ({
    id: ownProps.id
})

const mapDispatchToProps: PropsFromDispatch = {
    completeUserGuide: completeUserGuide,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutMyselfIntroPanel);

import React from 'react';
import { PanelHeader, PanelHeaderButton, IOS, platform } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { AppState } from '../../../store/app-state';
import { goBack } from '../../../store/history/actions';

interface PropsFromState {
    text: string;
    firstPage: boolean;
}

interface PropsFromDispatch {
    goBack: typeof goBack,

}

type AllProps = PropsFromState & PropsFromDispatch;

const osname = platform();

class MainHeaderPanel extends React.Component<AllProps>  {

    render() {
        const { text, goBack, firstPage } = this.props;
        return (
            <PanelHeader
                left={!firstPage && <PanelHeaderButton onClick={() => goBack()}>
                    {osname === IOS ? <Icon28ChevronBack className="nav-icon-selected" /> : <Icon24Back className="nav-icon-selected" />}
                </PanelHeaderButton>}
            >
                {text}
            </PanelHeader>
        )
    }
}

const mapStateToProps = ({ history }: AppState) => ({
    firstPage: history.history && history.history.length === 1,
})

const mapDispatchToProps: PropsFromDispatch = {
    goBack: goBack
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainHeaderPanel);

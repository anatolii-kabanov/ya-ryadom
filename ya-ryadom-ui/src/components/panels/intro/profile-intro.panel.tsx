import './profile-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { UserInfo } from '@vkontakte/vk-bridge';
import ProfileForm from '../../forms/profile.form';

interface PropsFromState {
    id: string,
    vkUserInfo: UserInfo,
}

interface PropsFromDispatch {
   
}

type AllProps = PropsFromState & PropsFromDispatch;

class ProfileIntroPanel extends React.Component<AllProps>  {

    constructor(props) {
        super(props);
        this.onIntroCompleted = this.onIntroCompleted.bind(this)
    }

    componentDidMount() {
        
    }

    onIntroCompleted() {
       
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="profile-intro-panel">
                <PanelHeader>
                    Я рядом
                </PanelHeader>
                <Group className="profile-group">
                    <ProfileForm></ProfileForm>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({
    
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileIntroPanel);

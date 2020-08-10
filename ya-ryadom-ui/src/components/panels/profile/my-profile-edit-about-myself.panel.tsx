import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { UserInfo } from '@vkontakte/vk-bridge';
import { saveUserProfileAboutMyself } from '../../../store/authentication/actions';
import AboutMyselfForm from '../../forms/about-myself.form';
import MainHeaderPanel from "../headers/main.header";

interface PropsFromState {
    id: string,
    vkUserInfo: UserInfo,
}

interface PropsFromDispatch {
    save: typeof saveUserProfileAboutMyself
}

type AllProps = PropsFromState & PropsFromDispatch;

class MyProfileEditAboutMyselfPanel extends React.Component<AllProps>  {

    constructor(props) {
        super(props);
        this.onIntroCompleted = this.onIntroCompleted.bind(this)
    }

    componentDidMount() {

    }

    onIntroCompleted() {

    }

    render() {
        const { id, save } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel />
                <AboutMyselfForm onSave={save} btnText={'Сохранить'}></AboutMyselfForm>
            </Panel>
        )
    }
}

const mapStateToProps = ({ }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    save: saveUserProfileAboutMyself
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfileEditAboutMyselfPanel);

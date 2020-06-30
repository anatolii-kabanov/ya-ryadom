import './about-myself-intro.panel.scss';
import React from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    Div,
    Button,
    Title,
    FormLayout,
    Input,
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import { saveUserAboutMyselfRequest } from '../../../store/authentication/actions';

interface PropsFromState {
    id: string,
}

interface PropsFromDispatch {
    saveAboutMyself: typeof saveUserAboutMyselfRequest
}

interface State {
    aboutMyself: string;
}

type AllProps = PropsFromState & PropsFromDispatch;

class AboutMyselfIntroPanel extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this)
    }

    onClickNext() {
        const { saveAboutMyself } = this.props;
        saveAboutMyself(this.state.aboutMyself);
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            aboutMyself: event.target.value
        })
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id} className="about-myself-intro-panel">
                <PanelHeader>
                </PanelHeader>
                <Group className="about-myself-group">
                    <Div className="themes-form">
                        <Div><Title level="3" weight="bold" className="title text-center">Напишите о себе</Title ></Div>
                        <FormLayout>
                            <Input name="aboutMySelf" onChange={this.handleInputChange}></Input>
                        </FormLayout>
                    </Div>
                </Group>
                <Group>
                    <Div className="btn-container-bottom">
                        <Button className="btn-primary" size="xl" onClick={this.onClickNext}>Далее</Button>
                    </Div>
                </Group>
            </Panel>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {
    saveAboutMyself: saveUserAboutMyselfRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutMyselfIntroPanel);

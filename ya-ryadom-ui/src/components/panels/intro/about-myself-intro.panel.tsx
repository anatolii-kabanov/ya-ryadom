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

interface PropsFromState {
    id: string,
}

interface PropsFromDispatch {

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
                            <Input top="text" name="aboutMySelf" onChange={this.handleInputChange}></Input>
                        </FormLayout>
                    </Div>
                </Group>
                <Group>
                    <Div className={"btn-container"}>
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

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutMyselfIntroPanel);

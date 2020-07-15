import './about-myself.form.scss';
import React from 'react';
import {
    FormLayout,
    Button,
    Title,
    Div,
    Group,
    Input
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';

interface PropsFromState {
    onSave: (text: string) => void;
    btnText?: string;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
    aboutMyself: string;
}

class AboutMyselfForm extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.state = {
            aboutMyself: ''
        }
        this.onClickNext = this.onClickNext.bind(this);
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            aboutMyself: event.target.value
        })
    }

    onClickNext = () => {
        const { onSave } = this.props;
        onSave(this.state.aboutMyself);
    }

    render() {
        const { btnText } = this.props;
        return (
            <Group>
                <Group className="about-myself-group">
                    <Div className="themes-form">
                        <Div><Title level="3" weight="bold" className="title text-center">Напишите о себе</Title ></Div>
                        <FormLayout>
                            <Input name="aboutMyself" onChange={this.handleInputChange}></Input>
                        </FormLayout>
                    </Div>
                </Group>
                <Group>
                    <Div className="btn-container-bottom">
                        <Button className="btn-primary" size="xl" onClick={this.onClickNext}>{btnText ?? 'Далее'}</Button>
                    </Div>
                </Group>
            </Group>
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
)(AboutMyselfForm);

import './themes.form.scss';
import React from 'react';
import {
    FormLayout,
    Button,
    Title,
    Div,
    FormStatus
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import PillInput from '../inputs/pill.input';
import { ThemeType } from '../../utils/enums/theme-type.enum';

interface OwnProps {
    onSave: (themes: ThemeType[]) => void;
}

interface PropsFromState {
    btnText?: string;
    selectedThemes: ThemeType[],
}

interface PropsFromDispatch {

}


type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

interface State {
    selectedThemes: ThemeType[],
    errors: any | null;
}

class ThemesForm extends React.Component<AllProps, State>  {

    constructor(props) {
        super(props);
        this.onFillInProfile = this.onFillInProfile.bind(this);
        this.handlePillClick = this.handlePillClick.bind(this);
        this.state = {
            selectedThemes: [...props.selectedThemes],
            errors: null
        };
    }

    onFillInProfile = (data) => {
        if (!this.isValid()) return;
        const selectedThemes = [...this.state.selectedThemes];
        const { onSave } = this.props;
        onSave(selectedThemes);
    }

    isValid() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.selectedThemes || this.state.selectedThemes.length === 0) {
            formIsValid = false;
            errors['selectedThemes'] = "Выберите хотя бы одну тему";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handlePillClick = (themeType: ThemeType) => {
        const selectedThemes = [...this.state.selectedThemes];
        const index = selectedThemes.indexOf(themeType);
        if (index !== -1) {
            selectedThemes.splice(index, 1);
        } else {
            selectedThemes.push(themeType);
        }
        this.setState({
            selectedThemes: selectedThemes
        })
    }

    renderThemePills() {
        const themes = ALL_THEMES;
        if (themes) {
            return themes
                .map((item, key) => {
                    return <PillInput
                        key={key}
                        id={item.id}
                        selected={this.state.selectedThemes?.indexOf(item.id) !== -1}
                        onClick={this.handlePillClick} text={item.name}>

                    </PillInput>
                });
        }
    }

    render() {
        const { btnText } = this.props;
        const { errors } = this.state;
        return (
            <Div className="themes-form">
                <Div><Title level="3" weight="bold" className="title">Выберите темы</Title ></Div>
                <Div className="pills">
                    {this.renderThemePills()}
                </Div>
                {errors?.selectedThemes && <FormStatus mode="error">
                    {errors?.selectedThemes}
                </FormStatus>}
                <FormLayout>
                    <Div className="btn-container-bottom">
                        <Button className="btn-primary" size="xl" onClick={this.onFillInProfile}>{btnText ?? 'Продолжить'}</Button>
                    </Div>
                </FormLayout>
            </Div>
        )
    }
}

const mapStateToProps = ({ authentication }: AppState, ownProps: OwnProps) => ({
    selectedThemes: authentication.currentUser?.selectedThemes,
    onSave: ownProps.onSave,
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemesForm);

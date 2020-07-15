import './themes.form.scss';
import React from 'react';
import {
    FormLayout,
    Button,
    Title,
    Div
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { ALL_THEMES } from '../../utils/constants/theme.constants';
import PillInput from '../inputs/pill.input';
import { ThemeType } from '../../utils/enums/theme-type.enum';

interface PropsFromState {
    onSave: (themes: ThemeType[]) => void;
    btnText?: string;
}

interface PropsFromDispatch {

}


type AllProps = PropsFromState & PropsFromDispatch;

class ThemesForm extends React.Component<AllProps, { selectedThemes: ThemeType[] }>  {

    constructor(props) {
        super(props);
        this.onFillInProfile = this.onFillInProfile.bind(this);
        this.handlePillClick = this.handlePillClick.bind(this);
        this.state = {
            selectedThemes: []
        };
    }

    onFillInProfile = (data) => {
        const selectedThemes = [...this.state.selectedThemes];
        const { onSave } = this.props;
        onSave(selectedThemes);
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
        return (
            <Div className="themes-form">
                <Div><Title level="3" weight="bold" className="title">Выберите темы</Title ></Div>
                <Div className="pills">
                    {this.renderThemePills()}
                </Div>
                <FormLayout>
                    <Div className="btn-container-bottom">
                        <Button className="btn-primary" size="xl" onClick={this.onFillInProfile}>{btnText ?? 'Продолжить'}</Button>
                    </Div>
                </FormLayout>
            </Div>
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
)(ThemesForm);

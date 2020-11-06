import React from 'react';
import { Panel, Group } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app-state';
import ThemesForm from '../../forms/themes.form';
import { saveUserProfileThemes } from '../../../store/authentication/actions';
import MainHeaderPanel from '../headers/main.header';
import { PANELS } from '../../../utils/enums/panels.enum';
import {
    scrollToIdPosition,
    setScroll,
} from '../../../store/ui/scroll/actions';

interface OwnProps {
    id: PANELS;
}

interface PropsFromState {}

interface PropsFromDispatch {
    save: typeof saveUserProfileThemes;
    setScroll: typeof setScroll;
    scrollToIdPosition: typeof scrollToIdPosition;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class MyProfileEditThemesPanel extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
    }

    componentDidMount() {
        const { scrollToIdPosition, id } = this.props;
        scrollToIdPosition(id);
    }

    componentWillUnmount() {
        const { setScroll, id } = this.props;
        setScroll({ id, position: window.scrollY });
    }

    render() {
        const { id, save } = this.props;
        return (
            <Panel id={id} className='profile-themes-panel'>
                <MainHeaderPanel />
                <Group className='profile-group'>
                    <ThemesForm
                        onSave={save}
                        btnText={'Сохранить'}
                    ></ThemesForm>
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = ({}: AppState, ownProps: OwnProps) => ({
    id: ownProps.id,
});

const mapDispatchToProps: PropsFromDispatch = {
    save: saveUserProfileThemes,
    setScroll: setScroll,
    scrollToIdPosition: scrollToIdPosition,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyProfileEditThemesPanel);

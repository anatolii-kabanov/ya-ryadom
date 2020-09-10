import * as React from 'react';
import { Snackbar } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { AppState } from '../../store/app-state';
import { SnackbarNotification } from '../../store/ui/notifications/state';
import Icon24Error from '@vkontakte/icons/dist/24/error_circle';
import { removeNotificaiton } from '../../store/ui/notifications/actions';

interface PropsFromState {
    currentNotification: SnackbarNotification | null;
}

interface PropsFromDispatch {
    removeNotification: typeof removeNotificaiton;
}


type AllProps = PropsFromState & PropsFromDispatch;

class MainSnackbar extends React.Component<AllProps>  {

    constructor(props: AllProps) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { currentNotification, removeNotification } = this.props;
        return (
            <React.Fragment>
                {
                    currentNotification &&
                    <Snackbar key={new Date().getTime()} onClose={() => removeNotification()}
                        before={<Icon24Error className="error" />}>
                        {currentNotification.message}
                    </Snackbar>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ ui }: AppState) => ({
    currentNotification: ui.notifications.notificationsList[0]
})

const mapDispatchToProps: PropsFromDispatch = {
    removeNotification: removeNotificaiton,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainSnackbar);

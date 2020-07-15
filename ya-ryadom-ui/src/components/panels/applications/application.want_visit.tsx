import React from 'react';
import {
    Panel,
    Group,
    Tabs,
    TabsItem,
    Div,
    CardGrid,
    Card,
    Button,
    HorizontalScroll,
    Header,
    UsersStack,
    Separator,
    RichCell, Avatar
} from '@vkontakte/vkui';

import Icon16MoreHorizontal from '@vkontakte/icons/dist/16/more_horizontal';
import {AppState} from "../../../store/app-state";
import { connect } from 'react-redux';

interface PropsFromState {
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
}

export class ApplicationWantVisit extends React.Component<AllProps, State>  {
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <Div className="application-card want-visit">
                <Group header={<Header mode="secondary">Кино</Header>}>
                    <div className="body">
                        <RichCell
                            disabled
                            multiline
                            before={<Avatar size={48} src="https://sun9-26.userapi.com/c846321/v846321375/12a023/ke88l8pO-UY.jpg?ava=1" />}
                            caption="пн 14 июля в 23:34"
                            actions={
                                <React.Fragment>
                                    <Button className="btn-primary">Написать</Button>
                                    <Button className="btn-secondary">Отменить</Button>
                                </React.Fragment>
                            }
                        >
                            <div className="head">Кирилл Ижока <span className="distance">3км</span></div>
                            <div className="description">Пойду в кино с небольшой компанией  на фильм Бладшот</div>
                        </RichCell>
                    </div>
                </Group>
            </Div>)
    }
}

const mapStateToProps = ({ }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationWantVisit);
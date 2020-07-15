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
    seeUsers: boolean;
}

export class ApplicationCreated extends React.Component<AllProps, State>  {
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            seeUsers: false,
        }
    }

    showUsers() {
        this.setState({
            seeUsers: true
        });
    }


    render() {
        const { seeUsers } = this.state;
        const showUsers = this.showUsers;

        return (
            <Div className="application-card">
                <Group header={<Header mode="secondary" aside={<Icon16MoreHorizontal/>}>Кино</Header>}>
                    <div className="body">
                        <div className="title">Го кинчик</div>
                        <div className="description">Пойду в кино с небольшой
                            компанией  на фильм Бладшот</div>

                        <div className="sub-info">
                            <div className="address">Курск, МегаГринн</div>
                            <div className="date">пн 14 июля в 23:34</div>
                        </div>

                        <UsersStack
                            photos={[
                                "https://sun9-26.userapi.com/c846321/v846321375/12a023/ke88l8pO-UY.jpg?ava=1",
                                "https://sun9-51.userapi.com/impg/c857220/v857220720/115511/Jr1Swq3Cm3I.jpg?size=100x0&quality=90&crop=0,0,1879,1879&sign=53d80dd10a66c5a904806290f04f4538&ava=1",
                                "https://sun9-30.userapi.com/impg/bs6SJz5JgAK-9rh6SCgRACwQQhSUMFpVW3kLcQ/eBQUPSEG1XQ.jpg?size=100x0&quality=90&crop=0,0,1334,1334&sign=f2ca0c0cfe07517276e8e3288b41f1da&ava=1",
                            ]}
                        >Хотят пойти с вами +3 человек</UsersStack>

                        {!seeUsers && <Button onClick={showUsers.bind(this)}>Просмотреть</Button>}

                        {seeUsers && <div className="users-list">
                            <RichCell
                                disabled
                                before={<Avatar size={48} src="https://sun9-26.userapi.com/c846321/v846321375/12a023/ke88l8pO-UY.jpg?ava=1" />}
                                caption="Сегодня 18:00"
                                actions={
                                    <React.Fragment>
                                        <Button>Принять</Button>
                                        <Button mode="secondary">Отклонить</Button>
                                    </React.Fragment>
                                }
                            >
                                Кирилл Ижока
                            </RichCell>
                        </div>}

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
)(ApplicationCreated);
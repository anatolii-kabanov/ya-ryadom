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
import { AppState } from "../../../store/app-state";
import { connect } from 'react-redux';

interface PropsFromState {
    openCreationReview: () => void;
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
}

export class ApplicationVisited extends React.Component<AllProps, State>  {
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const { openCreationReview } = this.props
        return (
            <Group separator="show" className="application-card" header={<Header mode="secondary">Кино</Header>}>
                <RichCell
                    disabled
                    multiline
                    before={<Avatar size={48} src="https://sun9-26.userapi.com/c846321/v846321375/12a023/ke88l8pO-UY.jpg?ava=1" />}
                    caption="пн 14 июля в 23:34"
                    actions={<span className="application-btns"><Button className="btn-primary" onClick={openCreationReview}>Оставить отзыв</Button></span>}
                >
                    <div className="head">Кирилл Ижока <span className="distance">3км</span></div>
                    <div className="description">Пойду в кино с небольшой компанией  на фильм Бладшот</div>
                </RichCell>
            </Group>
        )
    }
}

const mapStateToProps = ({ }: AppState) => ({

})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationVisited);
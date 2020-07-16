import React from "react";
import { Group, Panel, RichCell, Avatar } from "@vkontakte/vkui";
import { connect } from "react-redux";
import MainHeaderPanel from "../headers/main.header";
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import xhr from "xhr";

import './reviews.panel.scss';
import { AppState } from "../../../store/app-state";

interface PropsFromState {
    id: string;
    vkUserId: number;
}

interface PropsFromDispatch {

}

// user vk id
const REVIEWS = [
    {avatar: 'https://sun9-17.userapi.com/c855024/v855024925/4aace/v29PybHCuc0.jpg?ava=1', name: 'Aleks',
        surname: 'Zakharov', theme: 'Кино', review: 'очень круто мне понравилось но неочень но всё же круто какой длинный отзыв ого', rate: 5},
    {avatar: 'https://sun1-29.userapi.com/c836333/v836333001/31193/dNxZpRF-z_M.jpg?ava=1', name: 'Pavel',
        surname: 'Durov', theme: 'Пиво', review: 'очень круто мне понравилось но неочень но всё же круто какой длинный отзыв ого', rate: 4},
    {avatar: 'https://sun9-17.userapi.com/c855024/v855024925/4aace/v29PybHCuc0.jpg?ava=1', name: 'Aleks',
        surname: 'Zakharov', theme: 'Встреча', review: 'очень круто мне понравилось но неочень но всё же круто какой длинный отзыв ого', rate: 3},
    {avatar: 'https://sun1-29.userapi.com/c836333/v836333001/31193/dNxZpRF-z_M.jpg?ava=1', name: 'Pavel',
        surname: 'Durov', theme: 'Лавочка', review: 'очень круто мне понравилось но неочень но всё же круто какой длинный отзыв ого', rate: 2},
]

type AllProps = PropsFromState & PropsFromDispatch;

class ReviewsPanel extends React.Component<AllProps> {

    state = {
        profileReviews: {}
    }

    reviewStars(rateNum) {
        let stars: any[] = [];
        for(let i = 0; i < 5; i++) {
            if (i < rateNum) {
                stars.push(<Icon24Favorite/>);
            } else {
                stars.push(<Icon24FavoriteOutline/>)
            }
        }
        return (
            <div className="rc-reviews-stars">{stars}</div>
        );
    };

    componentWillMount() {
        const { vkUserId } = this.props
        xhr({
                uri: `${process.env.REACT_APP_API_ENDPOINT}/reviews/about-me/${vkUserId}`,
                sync: true
            }, (err, resp, body) => {
                const profileReviews = JSON.parse(body);
                this.setState({
                    profileReviews
                })
            }
        )
    }

    render() {
        const { id } = this.props;

        return (
            <Panel id={id}>
                <MainHeaderPanel text="Отзывы"></MainHeaderPanel>
                {REVIEWS.map((review) =>
                    <Group>
                        <RichCell
                            disabled
                            before={<Avatar size={56} src={review.avatar} className="rc-avatar"/>}
                            caption={
                                <>
                                    <p className="rc-reviews-caption">{review.name} {review.surname}</p>
                                    <p className="rc-reviews-bottom">{review.review}</p>
                                    {this.reviewStars(review.rate)}
                                </>
                            }
                        >
                            <span className="rc-reviews-content">{review.theme}</span>
                        </RichCell>
                    </Group>
                )}
            </Panel>
        );
    }
}

const mapStateToProps = ({ events }: AppState) => ({
    vkUserId: events.eventsNearMe.currentVkId,
})

const mapDispatchToProps: PropsFromDispatch = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewsPanel);

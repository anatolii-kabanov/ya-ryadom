import React from "react";
import { Group, Panel, RichCell, Avatar, Div } from "@vkontakte/vkui";
import { connect } from "react-redux";
import MainHeaderPanel from "../headers/main.header";
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import xhr from "xhr";

import './reviews.panel.scss';
import { AppState } from "../../../store/app-state";
import { ALL_THEMES } from "../../../utils/constants/theme.constants";
import EmptyText from "../../general/empty-text";

interface PropsFromState {
    id: string;
    vkUserId: number;
}

interface PropsFromDispatch {

}

type AllProps = PropsFromState & PropsFromDispatch;

class ReviewsPanel extends React.Component<AllProps> {

    state = {
        profileReviews: []
    }

    reviewStars(rateNum) {
        let stars: any[] = [];
        for (let i = 0; i < 5; i++) {
            if (i < rateNum) {
                stars.push(<Icon24Favorite />);
            } else {
                stars.push(<Icon24FavoriteOutline />)
            }
        }
        return (
            <div className="rc-reviews-stars">{stars} <span className="rate-label">{rateNum} из 5</span></div>
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
        const { profileReviews } = this.state;

        return (
            <Panel id={id}>
                <MainHeaderPanel text="Отзывы"></MainHeaderPanel>
                {
                    profileReviews.length === 0 ?
                        <EmptyText text="Отзывов пока нет" /> :
                        profileReviews.map((review: any) =>
                            <Group key={review.id} id={review.id}>
                                <RichCell
                                    disabled
                                    before={<Avatar size={56} src={review.vkUserAvatarUrl} className="rc-avatar" />}
                                    caption={
                                        <>
                                            <p className="rc-reviews-caption">{review.userFullName}</p>
                                            <div className="rc-reviews-bottom">{review.text}</div>
                                            {this.reviewStars(review.rating)}
                                        </>
                                    }
                                >
                                    <span className="rc-reviews-content">{ALL_THEMES.filter(theme => theme.id === review.themeType)[0].name}</span>
                                </RichCell>
                            </Group>
                        )
                }
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

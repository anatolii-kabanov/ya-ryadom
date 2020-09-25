import './reviews.panel.scss';
import React from "react";
import { Group, Panel, RichCell, Avatar } from "@vkontakte/vkui";
import { connect } from "react-redux";
import MainHeaderPanel from "../headers/main.header";
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import { AppState } from "../../../store/app-state";
import { ALL_THEMES } from "../../../utils/constants/theme.constants";
import EmptyText from "../../general/empty-text";
import { fetchReviewsAboutUserRequest } from "../../../store/reviews/actions";
import { UserReview } from '../../../store/reviews/models';

interface OwnProps {
    id: string;
}

interface PropsFromState {
    profileReviews: UserReview[];
}

interface PropsFromDispatch {
    fetchReviewsAboutUser: typeof fetchReviewsAboutUserRequest;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class ReviewsPanel extends React.Component<AllProps> {

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
        const { fetchReviewsAboutUser } = this.props;
        fetchReviewsAboutUser();
    }

    render() {
        const { id, profileReviews } = this.props;
        return (
            <Panel id={id}>
                <MainHeaderPanel text="Отзывы"></MainHeaderPanel>
                {
                    !profileReviews || profileReviews.length === 0 ?
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

const mapStateToProps = ({ reviews, users }: AppState, ownProps: OwnProps) => ({
    id: ownProps.id,
    profileReviews: reviews.reviewsAboutUsers[users.selectedProfileVkId],
})

const mapDispatchToProps: PropsFromDispatch = {
    fetchReviewsAboutUser: fetchReviewsAboutUserRequest,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewsPanel);

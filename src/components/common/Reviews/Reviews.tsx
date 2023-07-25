
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";

import { Review as IReview } from "types";
import { Review } from "components/common/Reviews/components/Review";
import { SectionTitle } from "components/common/SectionTitle/SectionTitle";
import { FAIcon } from "../FAIcon/FAIcon";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { MoreReviewsButton } from "./styled";


const renderItems = (reviews: IReview[]) => {
  return reviews.map(({ author_details, content, id }) => (
    <Collapse key={id}>
      <Review
        key={id}
        username={author_details.username}
        avatar={author_details.avatar_path || undefined}
        content={content}
        rating={author_details.rating}
      />
    </Collapse>
  ))
};

interface Props {
  reviews: IReview[];
}

export const Reviews: React.FC<Props> = ({ reviews }) => {

  const isMoreButtonVisible = reviews.length > 3;

  const [visible, setVisible] = React.useState(false);
  const [items, setItems] = React.useState(reviews.slice(0, 3));

  const showAllItems = () => {
    setItems(reviews);
    setVisible(true);
  };
  const hideAllItems = () => {
    setItems(reviews.slice(0, 3));
    setVisible(false);
  };

  const onClick = () => {
    visible ? hideAllItems() : showAllItems()
  }

  if (!reviews.length) {
    return null;
  }

  return (
    <Box component="section" py={3}>
      <Container maxWidth="xl">
        <SectionTitle>Reviews</SectionTitle>
        <TransitionGroup>
          {renderItems(items)}
        </TransitionGroup>
        {isMoreButtonVisible && (
          <Box display="flex" justifyContent="center" mt={2}>
            <MoreReviewsButton className={`${visible ? "up" : "down"}`} onClick={onClick}>
              <FAIcon icon={faAngleDown} size="2x" color="inherit" />
            </MoreReviewsButton>
          </Box>
        )}
      </Container>
    </Box>
  )
};

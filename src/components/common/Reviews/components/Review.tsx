import React from "react";
import Stack from "@mui/material/Stack/Stack";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

import { Typography } from "../../Typography/Typography";
import { formatRating } from "utils";
import { Content, MoreTextButton, ReviewWrapper } from "../styled";


interface Props {
  username: string;
  avatar?: string;
  rating?: number;
  content?: string;
}

export const Review: React.FC<Props> = ({ username, avatar, content, rating }) => {
  const [visibleText, setVisibleText] = React.useState(false);
  const [visibleButton, setVisibleButton] = React.useState(false);
  const textRef = React.useRef<HTMLParagraphElement>(null)
  const toggleVisibility = () => setVisibleText(prev => !prev);

  React.useEffect(() => {
    if (textRef.current) {
      if (textRef.current?.offsetHeight > 72) {
        setVisibleButton(true)
      }
    }
  }, [])

  return (
    <ReviewWrapper>
      <Stack direction="row" gap={2} alignItems="flex-start">
        <Avatar src={avatar} alt={username} />
        <Stack direction="column" gap={1}>
          <Typography element="h3" type="heading_5">{username}</Typography>
          {rating && <Rating value={+formatRating(rating)} readOnly />}
          <Content className={`${visibleText ? "" : "hidden"}`}>
            <div ref={textRef}>
              <Typography element="p" type="body_1" className="review" >{content}</Typography>
            </div>
            {visibleButton && (
              <MoreTextButton onClick={toggleVisibility}>
                <span className="bg">
                  <Typography element="span" type="body_1">{visibleText ? "Less" : "More"}</Typography>
                </span>
              </MoreTextButton>
            )}
          </Content>
        </Stack>
      </Stack>
    </ReviewWrapper>
  )
};

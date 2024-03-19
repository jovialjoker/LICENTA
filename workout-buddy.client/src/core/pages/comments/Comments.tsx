import { Flex, Stack } from "@chakra-ui/react";
import Comment from "./CommentCard";

interface ICommentsProps {
  comments: [];
  addHandler: (text: string) => void;
}

export default function Comments(props: ICommentsProps) {
  return (
    <Flex
      textAlign={"center"}
      pt={10}
      justifyContent={"center"}
      direction={"column"}
      width={"full"}
    >
      <Stack spacing="3rem">
        {props.comments.map((comment: any, index: number) => (
          <Comment
            {...comment}
            key={comment.commentId}
            index={index}
            addHandler={props.addHandler}
            isReply="true"
          />
        ))}
      </Stack>
    </Flex>
  );
}

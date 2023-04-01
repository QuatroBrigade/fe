import { Button } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";

type PropsType = {};

const PostItemComments = ({}: PropsType) => {
  return (
    <>
      <Button
        leftIcon={<IconMessage />}
        variant="subtle"
        color="gray"
        className="text-gray"
      >
        Komentáre
      </Button>
    </>
  );
};

export default PostItemComments;

import { Button, Modal, TextInput, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { PostUpdateType } from "types/post";
import { create } from "zustand";

type PropsType = {};

type PostEditStateType = {
  opened: boolean;
  open: (post?: PostEditStateType["post"]) => void;
  close: () => void;
  save: () => Promise<void>;
  saveStatus: "none" | "saving" | "error";
  post: null | PostUpdateType;
};

export const usePostEditState = create<PostEditStateType>((set, get) => ({
  opened: false,
  open: (post) => {
    set({ post: post ?? null, opened: true });
  },
  close: () => {
    set({ opened: false, post: null });
  },
  post: null,
  save: async () => {
    // todo
  },
  saveStatus: "none",
}));

const PostEdit = ({}: PropsType) => {
  const [post, setPost] = useState<PostEditStateType["post"]>(null);

  const { close, opened, editPost } = usePostEditState(
    ({ opened, close, post }) => ({ opened, close, editPost: post }),
    shallow
  );

  useEffect(() => {
    setPost(editPost);
  }, []);

  return (
    <Modal
      centered
      opened={opened}
      onClose={close}
      title="Pridať nový príspevok"
    >
      <form noValidate className="grid grid-cols-1 gap-4">
        <TextInput label="Nadpis" required withAsterisk size="lg" />
        <Textarea
          autosize
          minRows={4}
          label="Popis"
          required
          withAsterisk
          size="md"
        />
        <Button size="md">Pridať</Button>
      </form>
    </Modal>
  );
};

export default PostEdit;
function shallow(a: {}, b: {}): boolean {
  throw new Error("Function not implemented.");
}

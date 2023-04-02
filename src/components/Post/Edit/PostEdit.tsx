import {
  Button,
  Modal,
  TextInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, getApiRoute } from "lib/msic/fetcher";
import { ParseFromUrl } from "lib/msic/url";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PostType } from "types/post";
import { create } from "zustand";
import { shallow } from "zustand/shallow";

type PropsType = {};

type PostEditStateType = {
  opened: boolean;
  open: (post?: PostEditStateType["post"]) => void;
  openNew: () => void;
  close: () => void;
  save: () => Promise<void>;
  saveStatus: "none" | "saving" | "error";
  post: Pick<PostType, "title" | "desc" | "radius"> &
    (
      | { id: null; location: null | PostType["location"] }
      | Pick<PostType, "id" | "location">
    );
};

const defaultPost: PostEditStateType["post"] = {
  id: null,
  location: null,
  title: "",
  desc: "",
  radius: [],
};

export const usePostEditState = create<PostEditStateType>((set, get) => ({
  opened: false,
  open: (post) => {
    set({ post, opened: true });
  },
  openNew: () => {
    set({ opened: true, post: { ...defaultPost } });
  },
  close: () => {
    set({ opened: false });
  },
  post: { ...defaultPost },
  save: async () => {
    // todo
  },
  saveStatus: "none",
}));

const PostEdit = ({}: PropsType) => {
  const [post, setPost] = useState<PostEditStateType["post"]>({
    ...defaultPost,
  });

  const { query } = useRouter();
  const communityId = ParseFromUrl.number(query.communityId);
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return fetcher<
        {},
        {
          post: {
            title: string;
            description: string;
            location: [number, number];
            userId: number;
            communityId: number | null;
          };
        }
      >(getApiRoute("/api/post/new"), {
        settings: { method: "POST" },
        body: {
          post: {
            location: [0, 0],
            userId: 1,
            description: post.desc,
            title: post.title,
            communityId,
          },
        },
      });
    },
    onSuccess: () => {
      client.invalidateQueries(["community", communityId]);
    },
  });

  const setPostValue = <
    TKey extends keyof T,
    T = Pick<
      NonNullable<PostEditStateType["post"]>,
      "desc" | "location" | "radius" | "title"
    >
  >(
    key: TKey,
    value: T[TKey]
  ) => setPost((post) => ({ ...post, [key]: value }));

  const { close, opened, editPost } = usePostEditState(
    ({ opened, close, post }) => ({ opened, close, editPost: post }),
    shallow
  );

  useEffect(() => {
    if (opened) {
      setPost(editPost);
    }
  }, [editPost, opened]);

  const theme = useMantineTheme();

  return (
    <Modal
      size="lg"
      overlayProps={{
        color: theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      centered
      opened={opened}
      onClose={close}
      title={post.id ? "Upraviť príspevok" : "Pridať nový príspevok"}
    >
      <form
        noValidate
        className="grid grid-cols-1 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
      >
        <TextInput
          value={post.title}
          onChange={(e) => setPostValue("title", e.target.value)}
          label="Nadpis"
          required
          withAsterisk
          size="lg"
        />
        <Textarea
          autosize
          minRows={4}
          label="Popis"
          required
          withAsterisk
          size="md"
          value={post.desc}
          onChange={(e) => setPostValue("desc", e.target.value)}
        />
        <Button type="submit" size="md">
          {post.id ? "Uložiť" : "Pridať"}
        </Button>
      </form>
    </Modal>
  );
};

export default PostEdit;

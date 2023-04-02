import {
  Button,
  Modal,
  TextInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, getApiRoute } from "lib/msic/fetcher";
import { FromUrl } from "lib/msic/url";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PostType } from "types/post";
import { create } from "zustand";
import { shallow } from "zustand/shallow";

type PropsType = {};

type PostEditStateType = {
  opened: boolean;
  open: (post?: PostEditStateType["post"]) => void;
  openNew: () => void;
  close: () => void;
  saveStatus: "none" | "saving" | "error";
  post: Pick<PostType, "title" | "desc" | "radius"> &
    (
      | { id: null; location: null | PostType["location"] }
      | Pick<PostType, "id" | "location">
    );
  setPost: <
    TKey extends keyof T,
    T = Pick<
      PostEditStateType["post"],
      "desc" | "location" | "radius" | "title"
    >
  >(
    key: TKey,
    value: T[TKey]
  ) => void;
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
  setPost: (key, value) => set({ post: { ...get().post, [key]: value } }),
  saveStatus: "none",
}));

const PostEditLocation = dynamic(() => import("./PostEditLocation"), {
  ssr: false,
});

const PostEdit = ({}: PropsType) => {
  const { close, opened, post, setPost } = usePostEditState(
    ({ opened, close, post, setPost }) => ({ opened, close, post, setPost }),
    shallow
  );

  const { query } = useRouter();
  const communityId = FromUrl.number(query.communityId);
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
            location: post.location
              ? [post.location.lat, post.location.lng]
              : [0, 0],
            userId: 1,
            description: post.desc,
            title: post.title,
            communityId,
          },
        },
      });
    },
    onSuccess: () => {
      client.refetchQueries(["community", communityId]);
      close();
    },
  });

  const theme = useMantineTheme();

  return (
    <Modal
      zIndex={9999}
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
          onChange={(e) => setPost("title", e.target.value)}
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
          onChange={(e) => setPost("desc", e.target.value)}
        />

        <PostEditLocation />

        <Button type="submit" size="md" className="w-full">
          {post.id ? "Uložiť" : "Pridať"}
        </Button>
      </form>
    </Modal>
  );
};

export default PostEdit;

import { Badge, Button, Card, UnstyledButton } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconChevronsUp, IconMessage } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { fetcher, getApiRoute } from "lib/msic/fetcher";
import { FromUrl } from "lib/msic/url";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PostType } from "types/post";
import PostItemVote from "./PostItemVote";

type PropsType = {
  post: PostType;
};

const MapPoint = dynamic(() => import("./../../Map/MapPoint"), {
  ssr: false,
});

const PostItem = ({
  post: { title, desc, location, radius, userId, createdAt, id, isPromoted },
}: PropsType) => {
  const { query } = useRouter();

  const client = useQueryClient();

  const confirmPromotion = () =>
    modals.openConfirmModal({
      title: "Potvrdťe akciu",
      children: (
        <p>
          Naozaj chcete poslať prípevok <strong>{title}</strong> do územnej
          nástenky
        </p>
      ),
      labels: { confirm: "Áno", cancel: "Nie, zrušiť" },
      onCancel: () => {},
      onConfirm: async () => {
        const communityId = query.communityId;
        await fetcher<{}, {}>(
          getApiRoute(
            `/api/post/promote/${id}?communityId=${FromUrl.number(
              communityId
            )}&promote=1`
          ),
          { settings: { method: "POST" }, body: {} }
        );

        console.log(communityId);
        client.refetchQueries(["community", communityId]);
      },
      centered: true,
      zIndex: 9999,
    });

  // const editPost = usePostEditState((state) => state.open);

  return (
    <Card component="article" className="rounded-lg p-0 bg-white">
      {!isPromoted && (
        <UnstyledButton
          onClick={confirmPromotion}
          className="p-4 flex items-center bg-primary hover:bg-primary-800 justify-center gap-4 text-white font-semibold w-full "
        >
          <IconChevronsUp />
          <p>Poslať Územiu</p>
        </UnstyledButton>
      )}
      {isPromoted && (
        <div className="p-2 bg-primary text-white font-semibold text-center">
          <p>Poslané Územiu</p>
        </div>
      )}
      <div className="grid grid-cols-[4.5rem_minmax(0,1fr)]">
        <div className="flex flex-col gap-4 p-2 items-start justify-start">
          <PostItemVote postId={id} />
        </div>

        <div className="border-l border-gray-200">
          <div className="p-4 border-b border-b-gray-200">
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray">John Doe</p>
              <Badge variant="dot" color="yellow">
                Občan
              </Badge>
            </div>

            <p className="text-xs text-gray-600">
              {dayjs(createdAt).format("DD.MM.YYYY")}
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 gap-4">
            <p className="text-xl font-semibold">{title}</p>

            {location && <MapPoint location={location} />}

            <p>{desc}</p>
          </div>

          <div className="px-4 py-2  border-t border-t-gray-200">
            <Button
              leftIcon={<IconMessage />}
              variant="subtle"
              color="gray"
              className="text-gray-600"
            >
              Komentáre (25)
            </Button>
            {/* <Button
              leftIcon={<IconEdit />}
              variant="subtle"
              color="gray"
              className="text-gray-600"
              onClick={() => editPost({ desc, id, location, radius, title })}
            >
              Updaviť
            </Button> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;

import {
  Anchor,
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import imgMap1 from "@public/map1.png";
import { IconChevronsUp, IconEdit, IconMessage } from "@tabler/icons-react";
import dayjs from "dayjs";
import { printDateInPastRelative } from "lib/date";
import Image from "next/image";
import Link from "next/link";
import { PostType } from "types/post";
import { usePostEditState } from "../Edit/PostEdit";
import PostItemVote from "./PostItemVote";

type PropsType = {
  post: PostType;
};

const PostItem = ({
  post: { title, desc, location, radius, userId, createdAt, id },
}: PropsType) => {
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
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
      centered: true,
    });

  const editPost = usePostEditState((state) => state.open);

  return (
    <Card component="article" className="rounded-lg p-0 bg-white">
      <UnstyledButton
        onClick={confirmPromotion}
        className="p-4 flex items-center bg-primary hover:bg-primary-800 justify-center gap-4 text-white font-semibold w-full "
      >
        <IconChevronsUp />
        <p>Poslať Územiu</p>
      </UnstyledButton>
      <div className="grid grid-cols-[4.5rem_minmax(0,1fr)]">
        <div className="flex flex-col gap-4 p-2 items-start justify-start">
          <PostItemVote />
        </div>

        <div className="border-l border-gray-200">
          <div className="p-4 border-b border-b-gray-200">
            <div className="flex items-center gap-2">
              <Link href={`/user/${userId}`} passHref>
                <Anchor className="font-medium text-gray">Vavro Murcko</Anchor>
              </Link>
              <Badge>Občan</Badge>
            </div>

            <Tooltip
              label={dayjs(createdAt).format("DD.MM.YYYY")}
              position="bottom"
            >
              <Box
                component="p"
                className="text-xs text-gray-600  w-fit cursor-pointer"
              >
                {printDateInPastRelative(createdAt)}
              </Box>
            </Tooltip>
          </div>

          <div className="p-4 grid grid-cols-1 gap-4">
            <p className="text-xl font-semibold">{title}</p>

            <AspectRatio
              ratio={3 / 1}
              className="relative w-full overflow-hidden rounded-lg"
            >
              <Image
                src={imgMap1}
                alt={title}
                objectFit="cover"
                layout="fill"
              />
            </AspectRatio>

            <p>{desc}</p>
          </div>

          <div className="px-4 py-2  border-t border-t-gray-200">
            <Button
              leftIcon={<IconMessage />}
              variant="subtle"
              color="gray"
              className="text-gray-600"
            >
              Komentáre
            </Button>
            <Button
              leftIcon={<IconEdit />}
              variant="subtle"
              color="gray"
              className="text-gray-600"
              onClick={() => editPost({ desc, id, location, radius, title })}
            >
              Updaviť
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;

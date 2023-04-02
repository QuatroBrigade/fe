import { Skeleton, Tooltip, UnstyledButton } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { fetcher, getApiRoute } from "lib/msic/fetcher";
import { useState } from "react";
import { PostType } from "types/post";

type PropsType = { postId: PostType["id"] };

const PostItemVote = ({ postId }: PropsType) => {
  const [active, setActive] = useState<keyof typeof settings | null>(null);

  const { data, isLoading } = useQuery(
    ["post", postId, "votes"],
    async ({ signal }) => {
      const { aff, neg } = await fetcher<{ aff: number; neg: number }>(
        getApiRoute(`/api/post/${postId}/votes`),
        {
          settings: { signal, method: "GET" },
        }
      );

      return { agreed: aff, disagreed: neg };
    },
    { staleTime: Infinity, cacheTime: Infinity }
  );

  return (
    <>
      <Button
        onClick={() =>
          setActive((active) => (active === "agree" ? null : "agree"))
        }
        isActive={active === "agree"}
        type="agree"
        count={data?.agreed ?? null}
      />
      <Button
        onClick={() =>
          setActive((active) => (active === "disagree" ? null : "disagree"))
        }
        isActive={active === "disagree"}
        type="disagree"
        count={data?.disagreed ?? null}
      />
    </>
  );
};

const settings = {
  agree: {
    label: "Súhlasim",
    Icon: IconCheck,
  },
  disagree: {
    label: "Nesúhlasim",
    Icon: IconX,
  },
};

function Button({
  type,
  count,
  isActive = false,
  onClick,
}: {
  type: keyof typeof settings;
  count: number | null;
  isActive?: boolean;
  onClick: () => void;
}) {
  const { Icon, label } = settings[type];

  return (
    <Tooltip label={label} position="right">
      <UnstyledButton
        onClick={onClick}
        className={`${
          type === "disagree"
            ? isActive
              ? "bg-orange text-orange-50 hover:bg-orange-700"
              : "hover:bg-orange-50 text-orange"
            : isActive
            ? "bg-primary text-primary-50 hover:bg-primary-700"
            : "hover:bg-primary-50 text-primary"
        } w-full active:translate-y-px grid place-items-center p-2 rounded-lg`}
      >
        <Icon />
        {count === null ? (
          <Skeleton className="h-3 my-1 w-8" />
        ) : (
          <p className="text-xs font-bold">{count}</p>
        )}
      </UnstyledButton>
    </Tooltip>
  );
}

export default PostItemVote;

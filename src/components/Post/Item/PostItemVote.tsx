import { Skeleton, Tooltip, UnstyledButton } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { PostType } from "types/post";

type PropsType = { postId: PostType["id"] };

const PostItemVote = ({ postId }: PropsType) => {
  const [vote, setVote] = useState<{
    voted: null | keyof typeof settings;
    count: { agree: number; disagree: number };
  }>({ count: { agree: 0, disagree: 0 }, voted: null });

  // const { data, isLoading } = useQuery(
  //   ["post", postId, "votes"],
  //   async ({ signal }) => {
  //     const { aff, neg } = await fetcher<{ aff: number; neg: number }>(
  //       getApiRoute(`/api/post/${postId}/votes`),
  //       {
  //         settings: { signal, method: "GET" },
  //       }
  //     );

  //     return { agreed: aff, disagreed: neg };
  //   },
  //   { staleTime: Infinity, cacheTime: Infinity }
  // );

  const handleVote = (choice: keyof typeof settings) => {
    setVote((vote) => {
      let agreeInc = 0;
      let disagreeInc = 0;
      let newVote = null;

      if (vote.voted === null) {
        agreeInc = choice === "agree" ? 1 : 0;
        disagreeInc = choice === "disagree" ? 1 : 0;
        newVote = choice;
      } else if (vote.voted === choice) {
        agreeInc = choice === "agree" ? -1 : 0;
        disagreeInc = choice === "disagree" ? -1 : 0;
      } else {
        agreeInc = choice === "agree" ? 1 : -1;
        disagreeInc = choice === "disagree" ? 1 : -1;
        newVote = choice;
      }

      return {
        count: {
          agree: vote.count.agree + agreeInc,
          disagree: vote.count.disagree + disagreeInc,
        },
        voted: newVote,
      };
    });
  };

  return (
    <>
      <Button
        onClick={() => handleVote("agree")}
        isActive={vote.voted === "agree"}
        type="agree"
        count={vote.count.agree}
      />
      <Button
        onClick={() => handleVote("disagree")}
        isActive={vote.voted === "disagree"}
        type="disagree"
        count={vote.count.disagree}
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
          <Skeleton className="h-3 mt-1 w-8" />
        ) : (
          <p className="text-xs font-bold">{count}</p>
        )}
      </UnstyledButton>
    </Tooltip>
  );
}

export default PostItemVote;

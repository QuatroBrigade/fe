import { Tooltip, UnstyledButton } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";

type PropsType = {};

const PostItemVote = ({}: PropsType) => {
  const [active, setActive] = useState<keyof typeof settings | null>(null);

  return (
    <>
      <Button
        onClick={() =>
          setActive((active) => (active === "agree" ? null : "agree"))
        }
        isActive={active === "agree"}
        type="agree"
        count={150}
      />
      <Button
        onClick={() =>
          setActive((active) => (active === "disagree" ? null : "disagree"))
        }
        isActive={active === "disagree"}
        type="disagree"
        count={2}
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
  count: number;
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
        <p className="text-xs font-bold">{count}</p>
      </UnstyledButton>
    </Tooltip>
  );
}

export default PostItemVote;

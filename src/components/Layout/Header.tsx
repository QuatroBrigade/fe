import { Badge, Menu, ThemeIcon, UnstyledButton } from "@mantine/core";
import {
  IconListDetails,
  IconLogout,
  IconMenu2,
  IconUsers,
} from "@tabler/icons-react";
import { config } from "config/config";
import Link from "next/link";

type PropsType = {};

const Header = ({}: PropsType) => {
  return (
    <header className="w-full bg-white border-b border-b-gray-400 flex items-center h-14 px-4 gap-8 flex-shrink-0 justify-between">
      <div className="flex items-end gap-2">
        <Link href="/" passHref>
          <UnstyledButton<"a">
            component="a"
            className="text-base font-bold block rounded"
          >
            {config.name}
          </UnstyledButton>
        </Link>
      </div>

      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <UnstyledButton className="flex active:translate-y-px border-solid items-center gap-2 p-1 border border-gray-200 rounded-full pr-3">
            <ThemeIcon
              variant="light"
              color="gray"
              size="lg"
              className="rounded-full"
            >
              <IconMenu2 size={20} />
            </ThemeIcon>
            <p className="font-semibold text-gray-700">John D.</p>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Badge variant="dot" className="w-full mb-2">
            Admin
          </Badge>

          <Link href={"/user/communities"} passHref>
            <Menu.Item component="a" icon={<IconUsers size={14} />}>
              Moje komunity
            </Menu.Item>
          </Link>
          <Menu.Item icon={<IconListDetails size={14} />}>
            Moje príspevky
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item color="red" icon={<IconLogout size={14} />}>
            Odhlásiť sa
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </header>
  );
};

export default Header;

import { UnstyledButton } from "@mantine/core";
import Link from "next/link";

type PropsType = {};

const Header = ({}: PropsType) => {
  return (
    <header className="w-full bg-white border-b border-b-gray-400 flex items-center h-14 px-4 gap-8 flex-shrink-0 justify-between">
      <div className="flex items-end gap-2">
        <Link href="/" passHref>
          <UnstyledButton<"a">
            component="a"
            className="text-base font-medium block rounded"
          >
            TODO
          </UnstyledButton>
        </Link>
      </div>

      <nav>
        <ul className="flex items-center gap-2"></ul>
      </nav>
    </header>
  );
};

export default Header;

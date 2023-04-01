import { ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconBuildingCommunity, IconUsers } from "@tabler/icons-react";
import Layout from "components/Layout/Layout";
import PostItemExample from "components/Post/Item/PostItemExample";
import Container from "components/misc/Container";
import dayjs from "dayjs";
import type { NextPage } from "next";
import { useState } from "react";
import { PostType } from "types/post";

const TABS = {
  COMMUNITY: "COMMUNITY",
  REGION: "REGION",
} as const;

const DATA: PostType[] = [
  {
    id: 1,
    userId: 1,
    title: "Nová zastávka autobusu - Ulica 45",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore praesentium alias ad odio illo officiis, ab culpa sit! Dicta nobis ipsum corrupti voluptate fuga quam commodi quidem debitis laboriosam provident.",
    location: {
      lat: [1, 2],
      lng: [2, 3],
    },
    radius: [],
    createdAt: dayjs("2023-02-12").toDate(),
  },
];

const Home: NextPage = () => {
  const [tab, setTab] = useState<keyof typeof TABS>("COMMUNITY");

  return (
    <Layout title="Domov" className="bg-gray-100">
      <section className="bg-white">
        <Container className="pt-8">
          <h1 className="font-bold mb-8">Mestská čásť Ťahanovce</h1>

          <div className="grid grid-cols-2">
            <UnstyledButton
              onClick={() => setTab("REGION")}
              className={`${
                tab === "REGION" ? "border-primary" : "border-transparent"
              } border-b-4 border-solid flex text-lg items-center py-2 px-4 relative gap-4 hover:bg-gray-50 justify-center`}
            >
              <ThemeIcon size="xl" variant="light">
                <IconBuildingCommunity />
              </ThemeIcon>
              <p>Územná nástenka</p>
            </UnstyledButton>
            <UnstyledButton
              onClick={() => setTab("COMMUNITY")}
              className={`${
                tab === "COMMUNITY" ? "border-primary" : "border-transparent"
              } border-b-4 border-solid flex text-lg items-center py-2 px-4 relative gap-4 hover:bg-gray-50 justify-center`}
            >
              <ThemeIcon size="xl" variant="light">
                <IconUsers />
              </ThemeIcon>
              <p>Komunitná nástenka</p>
            </UnstyledButton>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-8">
          <div className="grid grid-cols-1 gap-8">
            {DATA.map((post) => (
              <PostItemExample key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Home;
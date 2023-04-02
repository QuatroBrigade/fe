import Layout from "components/Layout/Layout";
import dayjs from "dayjs";
import type { NextPage } from "next";
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
      lat: 1,
      lng: 2,
    },
    radius: [],
    createdAt: dayjs("2023-02-12").toDate(),
  },
];

const Home: NextPage = () => {
  return (
    <Layout title="Domov">
      <></>
    </Layout>
  );
};

export default Home;

import { Loader, ThemeIcon, UnstyledButton } from "@mantine/core";
import {
  IconBuildingCommunity,
  IconPlus,
  IconUsers,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Layout from "components/Layout/Layout";
import PostEdit, { usePostEditState } from "components/Post/Edit/PostEdit";
import PostItem from "components/Post/Item/PostItem";
import Container from "components/misc/Container";
import dayjs from "dayjs";
import { fetcher, getApiRoute } from "lib/msic/fetcher";
import { FromUrl } from "lib/msic/url";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { PostType } from "types/post";

const TABS = {
  COMMUNITY: "COMMUNITY",
  REGION: "REGION",
} as const;

const LIMIT = 24;

/* const DATA: PostType[] = [
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
]; */

const Home: NextPage = () => {
  const [tab, setTab] = useState<keyof typeof TABS>("REGION");
  const [page, setPage] = useState(1);

  const { query } = useRouter();
  const communityId = FromUrl.number(query.communityId);

  const {
    data: posts,
    isFetching,
    isSuccess,
  } = useQuery(
    ["community", communityId, "tab", tab, "page", page],
    async ({ signal }) => {
      if (!communityId) {
        return [];
      }

      const results = await fetcher<
        (Pick<PostType, "id" | "userId" | "title" | "isPromoted"> & {
          walkableRadius: null | string;
          createdAt: string;
          description: string;
          location: { lat: number; lon: number };
        })[]
      >(
        getApiRoute(
          `/api/community/post?communityId=${communityId}${
            tab === "REGION" ? "&onlyIsPromoted=1" : ""
          }`
        ),
        { settings: { signal, method: "GET" } }
      );

      return results.map(({ location, ...posts }) => ({
        ...posts,
        location: { lat: location.lat, lng: location.lon },
      }));
    },
    { keepPreviousData: true, staleTime: 5 * 1000, refetchOnWindowFocus: false }
  );

  const openNew = usePostEditState((state) => state.openNew);

  return (
    <Layout title="Domov" className="bg-gray-100">
      <section className="bg-white">
        <Container className="pt-8">
          <h1 className="font-bold mb-8">Mestská čásť Ťahanovce</h1>

          <div className="grid md:grid-cols-2 grid-cols-1">
            <UnstyledButton
              onClick={() => setTab("REGION")}
              className={`${
                tab === "REGION" ? "border-primary" : "border-transparent"
              } border-l-4 md:border-l-0 md:border-b-4 border-solid flex items-center py-2 px-4 relative gap-4 hover:bg-gray-50 justify-start md:justify-center`}
            >
              <ThemeIcon size="xl" variant="light">
                <IconBuildingCommunity />
              </ThemeIcon>
              <p className="text-base md:text-lg">Územná nástenka</p>
            </UnstyledButton>
            <UnstyledButton
              onClick={() => setTab("COMMUNITY")}
              className={`${
                tab === "COMMUNITY" ? "border-primary" : "border-transparent"
              } border-l-4 md:border-l-0 md:border-b-4 border-solid flex items-center py-2 px-4 relative gap-4 hover:bg-gray-50 justify-start md:justify-center`}
            >
              <ThemeIcon size="xl" variant="light">
                <IconUsers />
              </ThemeIcon>
              <p className="text-base md:text-lg">Komunitná nástenka</p>
            </UnstyledButton>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-8">
          <div className="grid grid-cols-1 gap-8">
            <UnstyledButton
              onClick={openNew}
              className="w-full flex items-center gap-4 font-medium bg-white rounded-lg p-4 justify-center hover:shadow-xl active:translate-x-px transition-shadow"
            >
              <ThemeIcon size="lg" variant="light">
                <IconPlus />
              </ThemeIcon>
              <p>Pridať nový príspevok</p>
            </UnstyledButton>

            {isFetching && <Loader size="xl" className="my-8 mx-auto" />}

            {!isFetching &&
              isSuccess &&
              posts.map(({ createdAt, walkableRadius, ...post }) => (
                <PostItem
                  key={post.id}
                  post={{
                    ...post,
                    desc: post.description,
                    createdAt: dayjs(createdAt).toDate(),
                    radius: [],
                  }}
                />
              ))}

            <PostEdit />
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Home;

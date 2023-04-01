import { Anchor, Badge, Card, ThemeIcon, UnstyledButton } from "@mantine/core";
import {
  IconBuildingCommunity,
  IconCheck,
  IconUsers,
} from "@tabler/icons-react";
import Layout from "components/Layout/Layout";
import Container from "components/misc/Container";
import dayjs from "dayjs";
import { printDateInPastRelative } from "lib/date";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const TABS = {
  COMMUNITY: "COMMUNITY",
  REGION: "REGION",
} as const;

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
          <div>
            <Card
              component="article"
              className="rounded-lg p-0 bg-white grid grid-cols-[5rem_minmax(0,1fr)]"
            >
              <div className="grid-rows-2 grid-cols-1 gap-4 p-4 p">
                <UnstyledButton className="w-full grid place-items-center hover:bg-primary-50 text-primary p-2 rounded-lg">
                  <IconCheck />
                  <p className="text-xs font-bold">150</p>
                </UnstyledButton>
              </div>
              <div className="border-l border-gray-200">
                <div className="p-4 border-b border-b-gray-200">
                  <div className="flex items-center gap-2">
                    <Link href="/user/" passHref>
                      <Anchor className="font-medium text-gray">
                        Vavro Murcko
                      </Anchor>
                    </Link>
                    <Badge>Občan</Badge>
                  </div>
                  <p className="text-xs text-gray-600">
                    {printDateInPastRelative(dayjs("2023-02-12"))}
                  </p>
                </div>

                <p className="text-xl font-semibold p-4">
                  Nová zastávka autobusu - Ulica 45
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* <section className="">
        <Container>
          <Tabs
            value={tab}
            onTabChange={(value) =>
              value && value in TABS && setTab(value as keyof typeof TABS)
            }
          >
            <Tabs.List grow>
              <Tabs.Tab value={TABS.REGION} icon={<IconBuildingCommunity />}>
                Územná nástenka
              </Tabs.Tab>
              <Tabs.Tab value={TABS.COMMUNITY} icon={<IconUsers />}>
                Komunitná nástenka
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={TABS.REGION}>
              <Container as="section" className="py-8">
                <div className="grid grid-cols-1 gap-4">
                  <Card component="article" className="rounded-lg bg-white">
                    <></>
                  </Card>
                </div>
              </Container>
            </Tabs.Panel>
          </Tabs>
        </Container>
      </section> */}
    </Layout>
  );
};

export default Home;

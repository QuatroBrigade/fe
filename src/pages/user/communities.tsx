import { AspectRatio, Button, Card } from "@mantine/core";
import communityImg from "@public/community.jpg";
import Layout from "components/Layout/Layout";
import Container from "components/misc/Container";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { CommunityType } from "types/community";

const DATA: CommunityType[] = [
  {
    id: 1,
    level: 1,
    name: "Mesktská čásť Ťahanovce",
    parentId: 2,
  },
];

const Home: NextPage = () => {
  return (
    <Layout title="Moje komunity" className="bg-gray-100">
      <Container className="py-8">
        <h1>Moje komunity</h1>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {DATA.map(({ id, level, name, parentId }) => (
            <Card key={id}>
              <Card.Section className="mb-4">
                <AspectRatio
                  ratio={3 / 1}
                  className="relative w-full overflow-hidden"
                >
                  <Image
                    src={communityImg}
                    alt={name}
                    objectFit="cover"
                    layout="fill"
                    objectPosition="center"
                  />
                </AspectRatio>
              </Card.Section>

              <p className="mb-2 font-medium text-lg">{name}</p>
              <Link href={`/community/${id}`} passHref>
                <Button component="a">Otvoriť</Button>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default Home;

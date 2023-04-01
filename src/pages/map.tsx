import Layout from "components/Layout/Layout";
import Container from "components/misc/Container";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("./../components/Map"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <Layout title="Mapa" className="">
      <Container>
        <MapWithNoSSR />
      </Container>
    </Layout>
  );
};

export default Home;

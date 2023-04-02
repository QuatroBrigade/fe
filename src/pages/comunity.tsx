import Layout from "components/Layout/Layout";
import Container from "components/misc/Container";
import type { NextPage } from "next";

const CommunityPage: NextPage = () => {
  return (
    <Layout title="Domov" className="bg-gray-100">
      <section className="bg-white">
        <Container className="pt-8">
          <h1 className="font-bold mb-8">Moje komunity</h1>
        </Container>
      </section>
    </Layout>
  );
};

export default CommunityPage;

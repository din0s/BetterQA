import Layout from "../app/components/layout/Layout";
import { NextPage } from "next";
import Programme from "../app/containers/programme/Programme";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Programme />
    </Layout>
  );
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ["common", "courses"]
});

export default IndexPage;

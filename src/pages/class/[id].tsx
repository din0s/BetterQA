import Class from "../../app/containers/class/Class";
import Layout from "../../app/components/layout/Layout";
import { NextPage } from "next";

const ClassPage: NextPage = () => {
  return (
    <Layout>
      <Class />
    </Layout>
  );
};

ClassPage.getInitialProps = async () => ({
  namespacesRequired: ["common", "class"]
});

export default ClassPage;

import { NextPage, NextPageContext } from "next";

import Error from "next/error";

const ErrorPage: NextPage<{ code: number }> = props => {
  return <Error statusCode={props.code} />;
};

ErrorPage.getInitialProps = async ({ res }) => ({
  code: res?.statusCode || 200,
  namespacesRequired: []
});

export default ErrorPage;

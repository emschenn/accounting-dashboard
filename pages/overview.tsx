import React from "react";

import Layout from "../components/Layout";

type Props = {};

function Overview({}: Props) {
  return (
    <Layout>
      <div className="flex h-full flex-col items-center justify-center gap-y-2">
        <div>{`<WIP>`}</div>
      </div>
    </Layout>
  );
}

export default Overview;

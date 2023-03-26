import Link from "next/link";

import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex h-full flex-col items-center justify-center gap-y-2">
        <div>{`<WIP>`}</div>
        <Link
          href="/details"
          className="rounded-lg bg-custom-red py-2 px-4 font-black text-white"
        >
          Go Here
        </Link>
      </div>
    </Layout>
  );
}

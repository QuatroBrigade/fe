import { config } from "config/config";
import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";

type PropsType = { children: ReactNode; title?: string; className?: string };

const Layout = ({ children, title, className = "" }: PropsType) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <title>{`${title ? `${title} | ` : ""}${config.name}`}</title>
      </Head>
      <Header />
      <main className={`${className} min-h-full w-full flex-shrink-0`}>
        {children}
      </main>
    </>
  );
};

export default Layout;

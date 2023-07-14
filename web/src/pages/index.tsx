import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";
import { UpdateForm } from "@/components/UpdateForm";
import { useUpdatesForGlobal } from "@/hooks/useUpdatesForGlobal";
import Head from "next/head";
import { getLink } from "@/requests/feed.requests";

export default function Home() {
  const { data: updates, isLoading: isUpdatesLoading } = useUpdatesForGlobal();

  return (
    <>
      <Head>
        <title>inpublic</title>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`inpublic's global RSS feed`}
          href={`${getLink("rss", null)}`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`inpublic's global Atom feed`}
          href={`${getLink("atom", null)}`}
        />
      </Head>
      <Navbar />
      <Container>
        <div className="m-10">
          <UpdateForm />
        </div>
        <Feed updates={updates} isLoading={isUpdatesLoading} />
      </Container>
    </>
  );
}

import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { UpdateForm } from "@/components/UpdateForm";
import Head from "next/head";

export default function NewUpdate() {
  // TODO: Add authentication
  // TODO: Update to alternate style more fit for single page

  return (
    <>
      <Head>
        <title>Post a new update</title>
      </Head>
      <Navbar />
      <Container>
        <UpdateForm />
      </Container>
    </>
  );
}

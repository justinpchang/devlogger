import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { UpdateForm } from "@/components/UpdateForm";

export default function NewUpdate() {
  // TODO: Add authentication
  // TODO: Update to alternate style more fit for single page

  return (
    <>
      <Navbar />
      <Container>
        <UpdateForm />
      </Container>
    </>
  );
}

import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { UpdateForm } from "@/components/UpdateForm";

export default function NewUpdate() {
  // TODO: Add authentication

  return (
    <>
      <Navbar />
      <Container>
        <UpdateForm />
      </Container>
    </>
  );
}

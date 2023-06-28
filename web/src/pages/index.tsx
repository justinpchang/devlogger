import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";
import { UpdateForm } from "@/components/UpdateForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container>
        <div className="m-10">
          <UpdateForm />
        </div>
        <Feed />
      </Container>
    </>
  );
}

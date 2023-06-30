import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { Feed } from "@/components/Feed";
import { UpdateForm } from "@/components/UpdateForm";
import { useUpdatesForGlobal } from "@/hooks/useUpdatesForGlobal";

export default function Home() {
  const { data: updates, isLoading: isUpdatesLoading } = useUpdatesForGlobal();

  return (
    <>
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

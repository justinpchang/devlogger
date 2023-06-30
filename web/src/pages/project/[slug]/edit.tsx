import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { ProjectForm } from "@/components/ProjectForm";
import { useGetProject } from "@/hooks/useGetProject";
import { useRouter } from "next/router";

export default function EditProjectPage() {
  const router = useRouter();
  const slug = router.query.slug as string | undefined;

  const { data: project, isLoading } = useGetProject(slug);

  return (
    <>
      <Navbar />
      <Container>{!isLoading && project && <ProjectForm editingProject={project} />}</Container>
    </>
  );
}

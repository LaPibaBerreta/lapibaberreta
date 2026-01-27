import { useProjects } from "../hooks/useProjects";
import useFilterByProject from "../hooks/useFilterByProject";

export default function BackgroundGlow() {
  const { data, isLoading, error } = useProjects();
  const { selectedProject } = useFilterByProject();

  if (isLoading) return null;
  if (error) {
    console.log(error.message);
    return null;
  }

  const selected = selectedProject
    ? data?.find((p: { _id: string }) => p._id === selectedProject)
    : undefined;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-full mask-t-from-50% mask-b-from-50% mask-radial-[20%_40%] mask-radial-from-30%"
      style={{
        background: selected
          ? `radial-gradient(
            circle at 50% 50%,
            #${selected?.color}cc 0%,
            transparent 60%
          )`
          : `radial-gradient(
            circle at 50% 50%,
            #ff1e12 0%,
            transparent 60%
          )`,
      }}
    />
  );
}

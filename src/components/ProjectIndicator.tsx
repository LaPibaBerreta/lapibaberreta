export default function ProjectIndicator({ color }: { color: string }) {
  return (
    <div
      style={{ background: "#" + color }}
      className="mt-1.25 size-3 shrink-0 rounded-full border"
    />
  );
}

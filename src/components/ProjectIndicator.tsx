export default function ProjectIndicator({ color }: { color: string }) {
  return (
    <div
      style={{ background: "#" + color }}
      className="size-3 rounded-full border"
    />
  );
}

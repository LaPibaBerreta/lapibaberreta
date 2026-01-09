import usePlayer from "../hooks/usePlayer";

export default function LoadToPlayerButton({ data }: { data: string }) {
  const { setCurrentEmbed, setIsExpanded } = usePlayer();

  const handleClick = () => {
    setCurrentEmbed(data);
    setIsExpanded(true);
  };
  return (
    <button
      className="rounded-2xl border bg-green-400 px-2 py-1 text-3xl lowercase"
      onClick={handleClick}
    >
      {"|>"} Escuchar
    </button>
  );
}

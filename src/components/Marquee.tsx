export default function Marquee({ text }: { text: string }) {
  return (
    <>
      <div className="animate-scroll flex min-w-full shrink-0 justify-around gap-1">
        <div className="m-1 flex shrink-0 grow-0 basis-auto items-center justify-center px-1 text-center">
          {text}
        </div>

        <div
          aria-hidden="true"
          className="m-1 flex shrink-0 grow-0 basis-auto items-center justify-center px-1 text-center"
        >
          {text}
        </div>
      </div>

      <div
        className="animate-scroll flex min-w-full shrink-0 justify-around gap-1"
        aria-hidden="true"
      >
        <div className="m-1 flex shrink-0 grow-0 basis-auto items-center justify-center px-1 text-center">
          {text}
        </div>

        <div className="m-1 flex shrink-0 grow-0 basis-auto items-center justify-center px-1 text-center">
          {text}
        </div>
      </div>
    </>
  );
}

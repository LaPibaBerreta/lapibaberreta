export default function SectionTitle({ children }: { children: string }) {
  return (
    <h1 className="font-secondary mb-3 text-2xl italic sm:text-4xl">
      {children}
    </h1>
  );
}

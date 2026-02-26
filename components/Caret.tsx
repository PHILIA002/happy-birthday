export default function Caret({ small }: { small?: boolean }) {
  return (
    <span
      className={`inline-block ml-1 align-bottom bg-[#8B6FE8] animate-caret ${
        small ? "w-[2px] h-[1em]" : "w-[2px] h-[1.3em]"
      }`}
    />
  );
}
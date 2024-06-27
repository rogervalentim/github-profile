interface CardInfoProps {
  text: string;
  value: string | number | undefined;
}

export function CardInfo({ text, value }: CardInfoProps) {
  return (
    <div className="flex h-12 items-center justify-between gap-3 rounded-lg bg-[#111729] px-4">
      <p className="text-gray-400">{text}</p>

      <div>
        <div className="h-8 w-[1px] bg-[#364153]" />
      </div>

      <p className="text-white">{value}</p>
    </div>
  );
}

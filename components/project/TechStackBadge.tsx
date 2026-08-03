interface TechStackBadgeProps {
  name: string;
  color: string | null;
}

export default function TechStackBadge({ name, color }: TechStackBadgeProps) {
  return (
    <span
      className='whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium text-white'
      style={{
        backgroundColor: color ?? "#64748B",
      }}
    >
      {name}
    </span>
  );
}

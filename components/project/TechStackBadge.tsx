interface TechStackBadgeProps {
  name: string;
  color: string | null;
}

export default function TechStackBadge({ name, color }: TechStackBadgeProps) {
  return (
    <span
      className='rounded-full px-3 py-1 text-sm font-medium text-white'
      style={{
        backgroundColor: color ?? "#64748B",
      }}
    >
      {name}
    </span>
  );
}

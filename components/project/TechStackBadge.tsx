interface TechStackBadgeProps {
  name: string;
  color?: string;
}

export default function TechStackBadge({ name, color }: TechStackBadgeProps) {
  return (
    <span
      className='rounded-full px-3 py-1 text-sm font-medium'
      style={{
        backgroundColor: color ?? "#E2E8F0",
      }}
    >
      {name}
    </span>
  );
}

interface BadgeProps {
  color: string; 
  text: string;
  icon: string; 
}

export default function Badges({
  color,
  text,
  icon
}: BadgeProps) {
return (
    <div>
    <span className={`inline-flex items-center rounded-md bg-${color}-100 px-50 px-2 py-1 text-xs font-medium text-${color}-700 ring-1 ring-${color}-700/10 ring-inset`}>{text}</span>
    </div>
  )
}


import { FunctionalComponent } from "preact";

const iconComponents = import.meta.glob<{ default: FunctionalComponent }>(
  "./svgs/*.tsx",
  { eager: true },
);

const iconMap = Object.entries(iconComponents).reduce(
  (map, [path, module]) => {
    const name = path.match(/\/([^\/]+)\.tsx$/)?.[1];
    if (name) map[name] = module.default;
    return map;
  },
  {} as Record<string, FunctionalComponent>,
);

interface SvgIconProps {
  name: string;
  className?: string;
}

export default ({ name, className = "" }: SvgIconProps) => {
  const Icon = iconMap[name];
  return Icon ? <Icon className={className} /> : <span></span>;
};

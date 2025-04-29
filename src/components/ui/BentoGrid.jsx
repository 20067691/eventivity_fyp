// /ui/BentoGrid.jsx
// This component is a grid layout for displaying items in a bento-style format.
// It uses Tailwind CSS for styling and is designed to be responsive across different screen sizes.
// The grid items can contain a title, description, and an icon, and they have hover effects for interactivity.

import { cn } from "../../lib/utils";
import useTheme from "../../hooks/useTheme";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 w-full px-2",
        className
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}) => {
  const { background, text, accent } = useTheme();
  return (
    <div
      onClick={onClick}
      className={cn(
        "group/bento shadow-input flex flex-col justify-between space-y-4 rounded-xl border  p-4 transition duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer",
        className
      )}
      style={{ backgroundColor: background , borderColor: accent }}
      >
      {header}

      <div className="transition duration-200 group-hover/bento:translate-x-2 space-y-0.5">
        {icon}
        <div
          className="mt-2 mb-2 font-sans font-bold leading-tight"
          style={{ color: text }}
          >
          {title}
        </div>
        <div
          className="font-sans text-xs font-normal leading-tight"
          style={{ color: text }}
          >
          {description}
        </div>
      </div>
    </div>
  );
};

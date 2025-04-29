// /src/components/BentoGridDisplay.jsx
// Two Column Grid with Header and Description
// This component is a two-column grid layout that displays items with a header and description.
// Wil chang to use workshopData.js
// The grid is responsive and adjusts the number of columns based on the screen size.

import React from "react";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Skeleton from "./ui/CardSkeleton";


export default function BentoGridDisplay({ workshops, onWorkshopClick }) {
  // You now build a single array of layout items: real workshops + manually placed skeletons
  const items = [
    ...workshops.map((w) => ({
      type: "workshop",
      key: w.slug,
      className: w.className || "md:col-span-1",
      title: w.title,
      description: w.description,
      icon: w.icon || null,
      data: w,
    })),
    {
      type: "skeleton",
      key: "skeleton-1",
      className: "md:col-span-2",
      title: "Coming Soon",
      description: "Exciting workshops are on the way!",
    },
    {
      type: "skeleton",
      key: "skeleton-2",
      className: "md:col-span-3",
      title: "Coming Soon",
      description: "Exciting workshops are on the way!",
    },
    // add more skeletons here manually if needed
  ];

  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item) => {
        if (item.type === "workshop") {
          return (

            <BentoGridItem
              key={item.key}
              title={item.title}
              description={item.description}
              header={<Skeleton />}
              className={item.className}
              icon={item.icon}
              onClick={() => onWorkshopClick(item.data)}
            />
          );
        } else if (item.type === "skeleton") {
          return (
            <BentoGridItem
              key={item.key}
              title={item.title}
              description={item.description}
              header={<Skeleton />}
              className={item.className}
              icon={null}
            />
          );
        }
        return null;
      })}
    </BentoGrid>
  );
}

// const Skeleton = () => (
//   <div
//     className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
// );
// const items = [
//   {
//     title: "The Dawn of Innovation",
//     description: "Explore the birth of groundbreaking ideas and inventions.",
//     header: <Skeleton />,
//     className: "md:col-span-2",
//     icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Digital Revolution",
//     description: "Dive into the transformative power of technology.",
//     header: <Skeleton />,
//     className: "md:col-span-1",
//     icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Art of Design",
//     description: "Discover the beauty of thoughtful and functional design.",
//     header: <Skeleton />,
//     className: "md:col-span-1",
//     icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Power of Communication",
//     description:
//       "Understand the impact of effective communication in our lives.",
//     header: <Skeleton />,
//     className: "md:col-span-2",
//     icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
//   },
// ];

// /src/components/BentoGridDisplay.jsx
// Two Column Grid with Header and Description
// This component is a two-column grid layout that displays items with a header and description.
// Wil chang to use workshopData.js
// The grid is responsive and adjusts the number of columns based on the screen size.

import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Skeleton from "./ui/CardSkeleton";


export default function BentoGridDisplay({ workshops, onWorkshopClick }) {
  const items = [
    ...workshops.map((w) => {
      const header = w.image ? (
        <img
          src={w.image}
          alt={w.title}
          className="rounded-lg h-24 w-full object-cover"
        />
      ) : (
        <Skeleton />
      );
      return {
      type: "workshop",
      key: w.slug,
      className: w.className || "md:col-span-1",
      title: w.title,
      description: w.description,
      data: w,
      header
    };
    }),
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
    <BentoGrid >
      {items.map((item) => {
        if (item.type === "workshop") {
          return (

            <BentoGridItem
              key={item.key}
              title={item.title}
              description={item.description}
              header={item.header}
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



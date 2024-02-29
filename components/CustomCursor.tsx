import React, { useEffect, useState } from "react";

import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "../utils/cn";

export const CustomCursor = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false);
  const [isOverLink, setIsOverLink] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);

  const findClosestLink = (element: HTMLElement | null): HTMLElement | null => {
    if (!element) return null;
    if (element.tagName.toLowerCase() === "a") return element;
    return findClosestLink(element.parentElement);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const closestLink = findClosestLink(target);
    const isLink = !!closestLink;
    setIsOverLink(isLink);

    if (rect) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      x.set(e.clientX - rect.left + scrollX);
      y.set(e.clientY - rect.top + scrollY);
    }
  };
  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };
  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      style={{
        cursor: "none",
      }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence mode="wait">
        {isInside && <FollowPointer x={x} y={y} isOverLink={isOverLink} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  isOverLink,
}: {
  x: any;
  y: any;
  isOverLink: boolean;
}) => {
  console.log(isOverLink);
  const svgPath = isOverLink
    ? "M7.72414 4.05625C7.75843 4.04713 7.79404 4.04192 7.82964 4.04192H8.38882C8.42047 4.04192 8.4508 4.04583 8.47981 4.05234C9.22494 4.16693 9.55728 4.59666 9.69311 5.15007C9.74455 5.12663 9.80258 5.1123 9.86456 5.1123H10.4237C10.4554 5.1123 10.4857 5.11621 10.5147 5.12272C11.3166 5.24512 11.6397 5.73345 11.7557 6.34806C11.7755 6.34546 11.7966 6.34285 11.8177 6.34285H12.3769C12.4085 6.34285 12.4389 6.34676 12.4679 6.35327C14.003 6.58765 13.9845 8.09429 13.9687 9.31049C13.9687 9.35346 13.9674 9.39904 13.9674 9.6165V9.62561L13.999 11.028C14.0003 11.0424 14.0003 11.058 13.999 11.0723C13.9397 12.2651 13.4623 13.0412 12.9123 13.9345C12.82 14.0829 12.7264 14.2366 12.6037 14.4462C12.6011 14.4514 12.5984 14.4566 12.5945 14.4632C12.307 14.958 11.9746 15.3369 11.5961 15.5947C11.2111 15.8578 10.7838 15.9932 10.3156 15.9984C10.3037 15.9997 10.2905 15.9997 10.2787 15.9997H5.48349C5.00081 16.0088 4.62627 15.7992 4.35064 15.3916C4.12908 15.0648 3.98269 14.6064 3.90224 14.0282L0.887458 9.77536C0.883501 9.77015 0.878226 9.76494 0.87427 9.75973C0.694913 9.52274 0.450934 9.15422 0.268939 8.74535C0.131783 8.43804 0.0275974 8.10468 0.00649656 7.77914C-0.0198795 7.3924 0.0355099 7.08117 0.146289 6.83767C0.284764 6.53558 0.505005 6.33894 0.771404 6.23086C1.02066 6.1306 1.30024 6.11628 1.58379 6.17227C1.92272 6.23868 2.2722 6.40796 2.57157 6.65146C2.81687 6.85199 3.22438 7.18145 3.62002 7.50048L3.95236 7.76872V2.23712C3.95236 1.17718 4.43108 0.493515 5.04433 0.184908C5.29094 0.061204 5.5613 0 5.83297 0C6.10333 0 6.37368 0.0625062 6.62162 0.18621C7.24014 0.494818 7.72414 1.17848 7.72414 2.22019V4.05625Z"
    : "M0.6464 2.18248C0.717935 2.111 0.809465 2.06288 0.908908 2.0445C1.00835 2.02611 1.11103 2.0383 1.2034 2.07948L13.9314 7.73648C14.0204 7.776 14.096 7.84067 14.1487 7.92253C14.2015 8.00439 14.2292 8.09988 14.2285 8.19727C14.2277 8.29467 14.1986 8.38972 14.1445 8.47077C14.0905 8.55181 14.014 8.61532 13.9244 8.65348L9.1584 10.6945L7.1164 15.4615C7.078 15.5508 7.01442 15.6269 6.93342 15.6806C6.85243 15.7343 6.75754 15.7633 6.66036 15.7639C6.56318 15.7645 6.46792 15.7368 6.38623 15.6842C6.30454 15.6316 6.23997 15.5562 6.2004 15.4675L0.5434 2.73948C0.502448 2.64724 0.49037 2.54476 0.508754 2.44552C0.527138 2.34628 0.575123 2.25393 0.6464 2.18248Z";

  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 text-[#1E1E1E] transform -translate-x-[12px] -translate-y-[10px] stroke-white"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={svgPath}></path>
      </svg>
    </motion.div>
  );
};

export default CustomCursor;

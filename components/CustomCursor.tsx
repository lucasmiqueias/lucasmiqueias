import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const follower = followerRef.current!;
    const links = document.querySelectorAll("a");

    const moveCursor = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, { x: clientX, y: clientY, ease: "power2.out" });
      gsap.to(follower, { x: clientX, y: clientY, ease: "power2.out" });
    };

    const mouseEnterLink = (event: Event) => {
      const link = event.target as HTMLElement;
      if (link.classList.contains("view")) {
        gsap.to(cursor, { scale: 4 });
        follower.style.display = "block";
      } else {
        gsap.to(cursor, { scale: 4 });
      }
    };

    const mouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1 });
      follower.style.display = "none";
    };

    window.addEventListener("mousemove", moveCursor);

    links.forEach((link) => {
      link.addEventListener("mouseenter", mouseEnterLink);
      link.addEventListener("mouseleave", mouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      links.forEach((link) => {
        link.removeEventListener("mouseenter", mouseEnterLink);
        link.removeEventListener("mouseleave", mouseLeaveLink);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} id="custom-cursor" className="custom-cursor">
      <span ref={followerRef} className="cursor-text">
        View
      </span>
    </div>
  );
};

export default CustomCursor;

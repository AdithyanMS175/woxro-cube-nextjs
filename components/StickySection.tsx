"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { cubesData } from "@/lib/cubesData";
import Logo from "./Logo";
import Cube from "./Cube";

const StickySection = () => {
  const stickySectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cubesContainerRef = useRef<HTMLDivElement>(null);
  const header1Ref = useRef<HTMLDivElement>(null);
  const header2Ref = useRef<HTMLDivElement>(null);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const stickySection = stickySectionRef.current;
    const logo = logoRef.current;
    const cubesContainer = cubesContainerRef.current;
    const header1 = header1Ref.current;
    const header2 = header2Ref.current;

    if (!stickySection || !logo || !cubesContainer || !header1 || !header2)
      return;

    const stickyHeight = window.innerHeight * 4;

    const interpolate = (start: number, end: number, progress: number) => {
      return start + (end - start) * progress;
    };

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Logo effects
        const initialProgress = Math.min(progress * 20, 1);
        logo.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;

        const logoOpacityProgress =
          progress >= 0.02 ? Math.min((progress - 0.02) * 100, 1) : 0;
        logo.style.opacity = `${1 - logoOpacityProgress}`;

        // Cubes container opacity
        const cubesOpacityProgress =
          progress >= 0.01 ? Math.min((progress - 0.01) * 100, 1) : 0;
        cubesContainer.style.opacity = `${cubesOpacityProgress}`;

        // Header 1 effects
        const header1Progress = Math.min(progress * 2.5, 1);
        header1.style.transform = `translate(-50%, -50%) scale(${interpolate(
          1,
          1.5,
          header1Progress
        )})`;
        header1.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
        header1.style.opacity = `${1 - header1Progress}`;

        // Header 2 effects
        const header2StartProgress = (progress - 0.4) * 10;
        const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
        const header2Scale = interpolate(0.75, 1, header2Progress);
        const header2Blur = interpolate(10, 0, header2Progress);

        header2.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
        header2.style.filter = `blur(${header2Blur}px)`;
        header2.style.opacity = `${header2Progress}`;

        // Cube animations
        const firstPhaseProgress = Math.min(progress * 2, 1);
        const secondPhaseProgress = progress >= 0.5 ? (progress - 0.5) * 2 : 0;

        Object.entries(cubesData).forEach(([cubeClass, data], index) => {
          const cube = cubeRefs.current[index];
          if (!cube) return;

          const { initial, final } = data;

          const currentTop = interpolate(
            initial.top,
            final.top,
            firstPhaseProgress
          );
          const currentLeft = interpolate(
            initial.left,
            final.left,
            firstPhaseProgress
          );
          const currentRotateX = interpolate(
            initial.rotateX,
            final.rotateX,
            firstPhaseProgress
          );
          const currentRotateY = interpolate(
            initial.rotateY,
            final.rotateY,
            firstPhaseProgress
          );
          const currentRotateZ = interpolate(
            initial.rotateZ,
            final.rotateZ,
            firstPhaseProgress
          );
          const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);

          let additionalRotation = 0;
          if (cubeClass === "cube-2") {
            additionalRotation = interpolate(0, 180, secondPhaseProgress);
          } else if (cubeClass === "cube-4") {
            additionalRotation = interpolate(0, -180, secondPhaseProgress);
          }

          cube.style.top = `${currentTop}%`;
          cube.style.left = `${currentLeft}%`;
          cube.style.transform = `
            translate3d(-50%, -50%, ${currentZ}px)
            rotateX(${currentRotateX}deg)
            rotateY(${currentRotateY + additionalRotation}deg)
            rotateZ(${currentRotateZ}deg)
          `;
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={stickySectionRef} className="sticky">
      <div ref={logoRef} className="logo-container min-h-screen">
        <Logo />
      </div>

      <div ref={cubesContainerRef} className="cubes">
        {Object.keys(cubesData).map((cubeClass, index) => (
          <div
            key={cubeClass}
            ref={(el) => {
              cubeRefs.current[index] = el;
            }}
            className={`cube ${cubeClass}`}
          >
            {["front", "back", "right", "left", "top", "bottom"].map((face) => (
              <div key={face} className={face}>
                <img
                  src={`/assets/img${(index % 6) + 1}.jpg`}
                  alt={`Cube ${cubeClass} ${face}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div ref={header1Ref} className="header-1">
        <h1>
          The First Media Company crafted For the Digital First generation
        </h1>
      </div>

      <div ref={header2Ref} className="header-2">
        <h2>Where innovation meets precision.</h2>
        <p>
          Symphonia unites visionary thinkers, creative architects, and
          analytical experts, collaborating seamlessly to transform challenges
          into opportunities. Together, we deliver tailored solutions that drive
          impact and inspire growth.
        </p>
      </div>
    </section>
  );
};

export default StickySection;

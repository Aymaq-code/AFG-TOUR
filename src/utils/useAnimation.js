"use client";
import { useContext } from "react";
import { AnimationContext } from "./ScrollAnimationContext";

export function useAnimation() {
  const ctx = useContext(AnimationContext);

  if (!ctx) {
    throw new Error("useAnimation must be used within ScrollAnimationProvider");
  }

  return ctx;
}

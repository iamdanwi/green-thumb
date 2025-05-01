"use client";

import React from "react";
import { cn } from "@/lib/utils"; // If you're using a cn utility function

const Spinner = ({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div
        className={`animate-spin rounded-full border-t-green-600 border-l-green-300 border-r-transparent border-b-transparent ${sizes[size]} border-solid`}
      ></div>
    </div>
  );
};

export default Spinner;

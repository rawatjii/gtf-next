"use client";
import React from "react";

export default function SlideTxtAn1({
  text,
  className = "",
  textClassName = "",
  as = "span",
  children
}) {
  const Tag = as;

  return (
    <Tag className={`relative inline-block overflow-hidden align-middle ${className}`}>
      {/* default state */}
      <span
        className={`block translate-y-0 transition-transform duration-300 ease-out group-hover:-translate-y-full ${textClassName}`}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* hover state */}
      <span
        className={`absolute left-0 top-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${textClassName}`}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* accessibility */}
      <span className="sr-only">{children}</span>
    </Tag>
  );
}

"use client";

import { createElement } from "react";

interface MDXContentProps {
  content: React.ComponentType<Record<string, unknown>> | React.ReactNode;
}

export default function MDXContent({ content }: MDXContentProps) {
  if (typeof content === "function") {
    return createElement(content as React.ComponentType<Record<string, unknown>>);
  }
  return <>{content}</>;
}

"use client";

import dynamic from "next/dynamic";

const AIWidget = dynamic(
  () => import("@/features/ai-assistant/AIWidget").then(m => ({ default: m.AIWidget })),
  { ssr: false }
);

export function DynamicAIWidget() {
  return <AIWidget />;
}

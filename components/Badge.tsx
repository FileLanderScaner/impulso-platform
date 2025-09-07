import React from "react";

type Props = {
  label: string;
  color?: string;
};

export default function Badge({ label, color = "indigo" }: Props) {
  const colorClass = `bg-${color}-100 text-${color}-700`;
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${colorClass}`}>{label}</span>
  );
}

import React from "react";

type Props = {
  message: string;
  type?: "success" | "error" | "info";
};

export default function Alert({ message, type = "info" }: Props) {
  const color = type === "success" ? "green" : type === "error" ? "red" : "blue";
  return (
    <div className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 mb-4 rounded`}>
      {message}
    </div>
  );
}

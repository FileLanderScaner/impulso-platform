import React from "react";

type Props = {
  title: string;
  createdBy: string;
  createdAt: string;
};

export default function ForumThread({ title, createdBy, createdAt }: Props) {
  return (
    <div className="bg-white rounded shadow p-4 mb-2">
      <h4 className="font-semibold text-indigo-700">{title}</h4>
      <div className="text-xs text-gray-500 mt-1">Por {createdBy} • {createdAt}</div>
    </div>
  );
}

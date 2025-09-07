import React from "react";

type Props = {
  content: string;
  createdBy: string;
  createdAt: string;
};

export default function ForumPost({ content, createdBy, createdAt }: Props) {
  return (
    <div className="bg-gray-50 rounded p-3 mb-2 border border-gray-100">
      <div className="text-sm text-gray-700 mb-1">{content}</div>
      <div className="text-xs text-gray-400">Por {createdBy} • {createdAt}</div>
    </div>
  );
}

import React from "react";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="w-full mb-4 px-4 py-3 rounded-lg bg-red-100 text-red-700 text-center font-semibold border border-red-200">
      {message}
    </div>
  );
}

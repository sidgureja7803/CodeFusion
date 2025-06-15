import React from "react";
import { User } from "lucide-react";

export const UserAvatar = ({ name, avatar, color }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="user-avatar tooltip tooltip-bottom" data-tip={name}>
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-8 h-8 rounded-full border-2"
          style={{ borderColor: color }}
        />
      ) : (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: color }}
        >
          {initials || <User className="w-4 h-4" />}
        </div>
      )}
    </div>
  );
};

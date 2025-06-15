import React from "react";
import { Undo, Redo } from "lucide-react";

const Toolbar = ({ editor }) => {
  const handleUndo = () => {
    if (editor) {
      editor.trigger("", "undo", null);
    }
  };

  const handleRedo = () => {
    if (editor) {
      editor.trigger("", "redo", null);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-base-200 border-b border-base-300">
      <button
        className="btn btn-xs btn-ghost hover:bg-base-300"
        onClick={handleUndo}
        aria-label="Undo"
        title="Undo (Ctrl+Z)"
      >
        <Undo size={14} />
      </button>
      <button
        className="btn btn-xs btn-ghost hover:bg-base-300"
        onClick={handleRedo}
        aria-label="Redo"
        title="Redo (Ctrl+Y)"
      >
        <Redo size={14} />
      </button>
    </div>
  );
};

export default Toolbar;

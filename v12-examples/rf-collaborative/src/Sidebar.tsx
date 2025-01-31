import { DragEvent } from "react";

let data: { clientX: number; clientY: number } = { clientX: 0, clientY: 0 };
const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
  const clientX = event.nativeEvent.offsetX;
  const clientY = event.nativeEvent.offsetY;
  data = {
    clientX,
    clientY,
  };
};

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  console.log("onDragStart data:", data);
  event.dataTransfer.setData("application/data", JSON.stringify(data));
  event.dataTransfer.effectAllowed = "move";
};

const Sidebar = () => {
  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="react-flow__node-input"
        onMouseDown={onMouseDown}
        onDragStart={(event: DragEvent) => onDragStart(event, "input")}
        draggable
      >
        input
      </div>
      <div
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, "default")}
        draggable
      >
        default
      </div>
      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, "output")}
        draggable
      >
        output
      </div>
    </aside>
  );
};

export default Sidebar;

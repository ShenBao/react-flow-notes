import {
  Handle,
  Position,
  useNodesData,
  useHandleConnections,
  useNodeConnections,
} from '@xyflow/react';

import { useState, useEffect } from "react";

function CustomHandle({ id, label, onChange }) {
  const connections = useHandleConnections({
    type: 'target',
    id,
  });
 
  const nodeData = useNodesData(connections?.[0].source);
 
  useEffect(() => {
    onChange(nodeData?.data ? nodeData.data.value : 0);
  }, [nodeData]);
 
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        className="handle"
      />
      <label htmlFor="red" className="label">
        {label}
      </label>
    </div>
  );
}

function ColorPreview() {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
 
  return (
    <div
      className="node"
      style={{
        background: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      <CustomHandle
        id="red"
        label="R"
        onChange={(value) => setColor((c) => ({ ...c, r: value }))}
      />
      <CustomHandle
        id="green"
        label="G"
        onChange={(value) => setColor((c) => ({ ...c, g: value }))}
      />
      <CustomHandle
        id="blue"
        label="B"
        onChange={(value) => setColor((c) => ({ ...c, b: value }))}
      />
    </div>
  );
}
 
export default ColorPreview;

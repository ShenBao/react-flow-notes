// HelperLines.tsx
import { memo } from 'react';

type HelperLineProps = {
  lines: { x?: number; y?: number }[];
};

export const HelperLines = memo(({ lines }: HelperLineProps) => {
  return (
    <>
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            backgroundColor: '#1890ff',
            opacity: 0.6,
            pointerEvents: 'none',
            ...(line.x !== undefined
              ? {
                  left: `${line.x}px`,
                  top: 0,
                  width: '1px',
                  height: '100%',
                }
              : {
                  top: `${line.y}px`,
                  left: 0,
                  height: '1px',
                  width: '100%',
                }),
          }}
        />
      ))}
    </>
  );
});
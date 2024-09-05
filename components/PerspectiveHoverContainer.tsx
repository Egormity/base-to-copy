import { ReactNode, useRef } from 'react';

type PerspectiveHoverContainerProps = {
  children: ReactNode;
  rotationRatio?: number;
};

export default function PerspectiveHoverContainer({
  children,
  rotationRatio = 1,
}: PerspectiveHoverContainerProps) {
  const boundingRef = useRef<DOMRect | null>(null);

  const pespectiveContainerStyle = `[perspective:750px]`;
  const perspectiveStyle = `hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.05)]`;

  return (
    <div className={pespectiveContainerStyle}>
      <div
        className={`group transition-transform ease-out ${perspectiveStyle} `}
        onMouseLeave={() => (boundingRef.current = null)}
        onMouseEnter={ev => {
          boundingRef.current = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={ev => {
          if (!boundingRef.current) return;
          const x = ev.clientX - boundingRef.current.left;
          const y = ev.clientY - boundingRef.current.top;
          const xPercentage = x / boundingRef.current.width;
          const yPercentage = y / boundingRef.current.height;
          const xRotation = (xPercentage - 0.5) * 20 * rotationRatio;
          const yRotation = (0.5 - yPercentage) * 20;

          ev.currentTarget.style.setProperty('--x-rotation', `${yRotation.toFixed(3)}deg`);
          ev.currentTarget.style.setProperty('--y-rotation', `${xRotation.toFixed(3)}deg`);
          ev.currentTarget.style.setProperty('--x', `${(xPercentage * 100).toFixed(3)}%`);
          ev.currentTarget.style.setProperty('--y', `${(yPercentage * 100).toFixed(3)}%`);
        }}
      >
        {children}
        <div className='pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.05)_20%,transparent_80%)]' />
      </div>
    </div>
  );
}

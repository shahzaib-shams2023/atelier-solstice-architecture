import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop/mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive or specific elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth trailing animation loop
    let animId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(updateTrailing);
    };
    animId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        className="cursor-dot w-2 h-2 bg-solstice-terracotta rounded-full pointer-events-none transition-transform duration-75 ease-out z-[9999]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) ${
            isHovered ? 'scale(0.5)' : 'scale(1)'
          }`,
        }}
      />

      {/* Trailing Architectural Ring & Badge */}
      <div
        className={`cursor-dot pointer-events-none z-[9998] flex items-center justify-center transition-all duration-300 ease-out ${
          isHovered
            ? 'w-16 h-16 border border-solstice-terracotta bg-solstice-terracotta/10 backdrop-blur-[2px]'
            : 'w-8 h-8 border border-solstice-sumi/30'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorText && (
          <span className="font-sans text-[8px] font-semibold tracking-architectural text-solstice-terracotta uppercase whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};

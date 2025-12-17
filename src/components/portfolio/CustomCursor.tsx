interface CustomCursorProps {
  mousePosition: { x: number; y: number };
  isHovering: boolean;
}

const CustomCursor = ({ mousePosition, isHovering }: CustomCursorProps) => {
  return (
    <div
      className="fixed w-8 h-8 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-300 ease-out hidden md:block"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
      }}
    />
  );
};

export default CustomCursor;

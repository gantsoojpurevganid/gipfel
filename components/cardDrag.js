import { useState, useEffect } from "react";

const CardDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - offsetX);
    e.target.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - startX;
      const rotation = (x / 5) % 360; // Adjust the division factor as needed
      e.target.style.transform = `translateX(${x}px) rotate3d(0, 1, 0, ${rotation}deg)`;
    }
  };

  const handleMouseUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      e.target.style.cursor = "grab";
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="card"
      onMouseDown={(e) => {
        setOffsetX(e.clientX - e.target.getBoundingClientRect().left);
        handleMouseDown(e);
      }}
      style={{ cursor: "grab" }}
    >
      {/* Your card content goes here */}
      <p>Drag me</p>
    </div>
  );
};

export default CardDrag;

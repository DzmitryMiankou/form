import React from "react";

interface UseMousePosition {
  x: number;
  y: number;
}

interface PercentagePosition {
  percentageX: number;
  mirrPercentageX: number;
}

interface ReturnUseMousePosition {
  mousePosition: PercentagePosition;
}

const useMousePosition = (mouse: boolean): ReturnUseMousePosition => {
  const [mousePosition, setMousePosition] = React.useState<UseMousePosition>({
    x: (45 / 100) * window.innerWidth,
    y: 0,
  });
  const [sizeWind, setSizeWind] = React.useState<number>(window.innerWidth);

  const [percentagePosition, setPercentagePosition] =
    React.useState<PercentagePosition>({
      percentageX: 45,
      mirrPercentageX: 100 - 45,
    });

  React.useEffect(() => {
    const updateSize = (): void => setSizeWind(window.innerWidth);

    window.addEventListener("resize", updateSize);
    const updateMousePosition = (ev: MouseEvent) => {
      if (mouse === true) {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
        setPercentagePosition({
          percentageX: +((mousePosition.x / sizeWind) * 100).toFixed(2),
          mirrPercentageX: +(100 - (mousePosition.x / sizeWind) * 100).toFixed(
            2
          ),
        });
      }

      if (mouse === false)
        return setPercentagePosition({ ...percentagePosition });
    };

    if (percentagePosition.percentageX < 20)
      return setPercentagePosition({
        percentageX: 20,
        mirrPercentageX: 100 - 20,
      });

    if (percentagePosition.percentageX > 100 - 20)
      return setPercentagePosition({
        percentageX: 100 - 20,
        mirrPercentageX: 20,
      });

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [
    mouse,
    mousePosition,
    percentagePosition,
    percentagePosition.percentageX,
    sizeWind,
  ]);
  return { mousePosition: { ...percentagePosition } };
};
export default useMousePosition;

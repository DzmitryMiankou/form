import React from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { delDataMoreInfAction } from "../../redux/moreInfReducer";
import { InitialStateType } from "../../redux/moreInfReducer";

const opacity = keyframes`
  0% {
    filter: opacity(0);  
  }
  100% {
    filter: opacity(1)
  }
`;

const opacityEnd = keyframes`
  0% {
    filter: opacity(1);  
  }
  100% {
    filter: opacity(0)
  }
`;

type StyleProp = { $left: string; $top: number; $anim?: boolean };

const Box = styled.div<StyleProp>`
  width: 20%;
  min-width: 250px;
  height: 90vh;
  position: absolute;
  background: #ddad7e;
  top: ${(prop) => prop.$top + "px"};
  left: ${(prop) => prop.$left};
  z-index: 99;
  animation: ${(prop) => (prop.$anim ? opacity : opacityEnd)} 0.1s linear;
`;

const BG = styled.div<{ $anim?: boolean }>`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: #3d2c21b5;
  top: 0;
  z-index: 98;
  backdrop-filter: blur(2px);
  left: 0;
  animation: ${(prop) => (prop.$anim ? opacity : opacityEnd)} 0.1s linear;
`;

type PropType = {
  moreInf: InitialStateType;
  component: JSX.Element;
  type?: "right" | "left";
};

const Modal: React.FC<PropType> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const [get, set] = React.useState<boolean>(true);

  const switchProp = (): StyleProp => {
    switch (props.type) {
      case "right":
        return { $left: "79vw", $top: 20 };
      case "left":
        return { $left: "20px", $top: 20 };
      default:
        return { $left: `calc(50vw - 10%)`, $top: 20 };
    }
  };

  const closeHandle = (): void => {
    set(false);
    setTimeout((): void => {
      dispatch(delDataMoreInfAction());
      set(true);
    }, 70);
  };

  return (
    <>
      {props.moreInf.open ? (
        <>
          <BG $anim={get} onClick={closeHandle} />
          <Box $anim={get} {...switchProp()}>
            {props.component}
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;

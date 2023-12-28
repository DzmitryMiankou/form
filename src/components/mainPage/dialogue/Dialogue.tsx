import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import avatar from "../../../img/images.png";
import Modal from "../../modal/Modal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Avatar from "../../avatar/Avatar";

const PosterBox = styled.div`
  display: grid;
  grid-template-rows: 44px auto;
`;

const ScrollBox = styled.div`
  min-width: 150px;
`;

const LinkFrend = styled(NavLink)<{ $mousUp: boolean }>`
  padding: 17px 20px;
  display: flex;
  align-items: center;
  font-size: 15px;
  white-space: nowrap;
  gap: 20px;
  justify-content: space-between;
  &:hover {
    background: ${(prop) =>
      prop.$mousUp === false
        ? "linear-gradient(90deg, rgba(63, 94, 251, 0) 1%,  rgba(255, 255, 255, 0.3) 30%)"
        : ""};
  }
  &.active {
    background-color: #ffffff88;
    cursor: default;
  }
`;

const H3 = styled.h3`
  padding: 10px 20px;
  font-size: 18px;
  border-bottom: var(--block-border);
  background-color: #c69f76;
`;

const AvatarImg = styled.img`
  max-width: 20px;
`;

const Li = styled.li`
  position: relative;
`;

const ModCom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 100%;
`;

const Butt = styled.button`
  background-color: transparent;
  border: none;
`;

const Ul = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(var(--hight-blok-noHeader) - 46px);
`;

const Dialogue: React.FC<{ mousUp: boolean }> = ({ mousUp }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>();

  const arr = new Array(20).fill("");

  const contextHandler = (
    e: React.MouseEvent<HTMLElement>,
    id: number
  ): void => {
    e.preventDefault();
    setOpen(true);
    setId(id);
  };

  const clouseHandler = (): void => setOpen(false);

  return (
    <PosterBox>
      <H3>Dialogue</H3>
      <ScrollBox>
        <Ul>
          {arr.map((data, i) => (
            <Li key={i} onContextMenu={(e) => contextHandler(e, i)}>
              <LinkFrend
                $mousUp={mousUp}
                to={`/:${i}_${`firstName`}_${`lastName`}`}
              >
                <>
                  {<Avatar size={30} letter={"M"} fontSize={20} /> ?? (
                    <AvatarImg src={avatar} alt="avatar" />
                  )}
                </>
                <div style={{ marginRight: "auto", fontSize: "14px" }}>
                  Nikiforov Mikle
                </div>
                <div style={{ color: "grey", fontSize: "14px" }}>
                  Fr <span>11:43</span>
                </div>
              </LinkFrend>
              <Modal
                open={open}
                num={id}
                n={i}
                clouseHandler={clouseHandler}
                component={
                  <ModCom>
                    <Butt>
                      <HighlightOffIcon sx={{ fontSize: "20px" }} />
                    </Butt>
                    <Butt>
                      <DeleteOutlineIcon sx={{ fontSize: "20px" }} />
                    </Butt>
                  </ModCom>
                }
              />
            </Li>
          ))}
        </Ul>
      </ScrollBox>
    </PosterBox>
  );
};

export default Dialogue;

import { SxProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { useLazySearchUsersQuery } from "../../../redux/reducers/http/httpReducer";
import MoadalWindow from "../modalWindow/ModalWindow";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const InputBox = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  background: rgb(140, 75, 13);
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  color: white;
  padding: 5px 8px;
`;

const InputButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: rgb(105, 56, 11);
`;

const SX: { icon: SxProps } = {
  icon: {
    color: "rgb(255, 169, 89)",
    transition: "0.2s",
    "&:hover": {
      color: "var(--red-color)",
    },
  },
};

const SearchInput: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const [trigger, { data }] = useLazySearchUsersQuery();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setValue(value);
    trigger(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setValue("");
    trigger("");
  };

  return (
    <>
      <InputBox>
        <>
          {value === "" ? (
            <></>
          ) : (
            <InputButton onClick={handleClick} type="button">
              <ClearRoundedIcon sx={SX.icon} />
            </InputButton>
          )}
        </>
        <Input onChange={handleChange} value={value} type="text" />
        <InputButton type="button">
          <SearchTwoToneIcon sx={SX.icon} />
        </InputButton>
      </InputBox>
      <>
        {data?.length !== 0 && data !== null && data !== undefined ? (
          <MoadalWindow data={data} />
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default SearchInput;
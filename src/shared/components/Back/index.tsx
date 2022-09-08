import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./back.scss";


const Back = (props:any) => {
  const navigate = useNavigate();

  const { name } = props;

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className="back" onClick={handleGoBack}>
      <i className="icon-back"/>
      <span>{name}</span>
    </div>
  );
};

export default Back;

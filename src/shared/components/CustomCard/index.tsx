import React from "react";
import "./card.scss";



const CustomCard = (props:any) => {
  const { children } = props;

  return (<div className="card">{children}</div>);
};

export default CustomCard;

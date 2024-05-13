import React from "react";

const ExtractCard = ({
  icon,
  name,
  desc,
}: {
  icon: JSX.Element;
  name: string;
  desc: string;
}) => {
  return (
    <div>
      {icon}
      <p>{name}</p>
      <p>{desc}</p>
    </div>
  );
};

export default ExtractCard;

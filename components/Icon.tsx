import Image from "next/image";
import React from "react";

type Props = {
  img: string;
  name: string;
  isRounded?: boolean;
};

function Icon({ name, img, isRounded = false }: Props) {
  return (
    <Image
      alt={name}
      className={isRounded ? "rounded-full" : ""}
      width={20}
      height={20}
      src={img}
    />
  );
}

export default Icon;

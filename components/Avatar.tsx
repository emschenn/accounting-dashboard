import React from "react";

import Image from "next/image";

type Props = {
  img: string;
  name: string;
};

function Avatar({ name, img }: Props) {
  return (
    <div>
      <Image
        alt={name}
        className="rounded-full"
        width={20}
        height={20}
        src={img}
      />
    </div>
  );
}

export default Avatar;

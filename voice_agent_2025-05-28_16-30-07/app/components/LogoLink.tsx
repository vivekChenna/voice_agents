import type { FC } from "react";
import Image from "next/image";
import { withBasePath } from "../utils/deepgramUtils";

interface Props {
  href: string;
}

const LogoLink: FC<Props> = ({ href }) => (
  <a className="flex items-center" href={href}>
    <Image
      className="sm:max-w-none rounded"
      src={withBasePath("/andai_white_logo.svg")}
      alt="Andaihub"
      width={45}
      height={45}
      priority
    />
  </a>
);

export default LogoLink;

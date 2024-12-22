import Image from "next/image";
import logo from "../../assets/logos/logo.png";
export const LogoSvg = ({ ...props }) => {
  return (
    <>
      <Image
        height={10}
        width={10}
        src={logo}
        alt="logo"
        className="cover h-20 w-20"
      />
    </>
  );
};

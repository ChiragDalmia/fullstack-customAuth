import Image from "next/image";
import logo from "../public/images/logo.png";

const LogoImage = () => {

  return (
    <Image 
      alt="Netflix Auth logo"
      src={logo}
      quality={100}
      className={`object-contain h-9 w-fit z-0 fade-in-logo`}
      priority
    />
  );
}

export default LogoImage;

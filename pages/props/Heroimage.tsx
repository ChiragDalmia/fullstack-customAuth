
import Image from "next/image";
import hero from "../../public/images/hero.png"

const HeroImage: React.FC = () => {

  return (
    <Image 
      alt="Netflix Auth Hero"
      src={hero}
      quality={100}
      fill
      style={{objectFit: "cover"}}
      className={`transition-all 
        duration-500 ease-in-out fade-in-bg`}
      priority
    />
  );
}

export default HeroImage;

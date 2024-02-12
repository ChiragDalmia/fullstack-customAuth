import HeroImage from "./props/Heroimage";
import LogoImage from "./props/LogoImage"
import LoginMainMeat from "./props/LoginMainMeat";



const Auth = ()=>{
  return (
    <div className='relative h-full w-full'>
    <HeroImage />
    <div className="absolute inset-0 z-10 bg-black bg-opacity-50">
      <nav className='px-12 py-5 lg:px-32 '>
        <LogoImage />
      </nav>
      <div className="flex justify-center">
        <LoginMainMeat>
          <></>
        </LoginMainMeat>
      </div>
    </div>
  </div>
  )
}


export default Auth;
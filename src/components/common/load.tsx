import Lottie from "lottie-react";
import cloudLoad from '@/assets/cloud-load.json';

export function Load() {
  return(
    <div className="z-[2000] inset-0 fixed w-full h-screen flex items-center justify-center bg-black opacity-65">
      <div className="w-40 h-40">
        <Lottie animationData={cloudLoad}  loop={true} />
      </div>
    </div>
  );
}
import Lottie from "lottie-react";
import cloudsAnimations from '@/assets/clouds-animation.json';

export function AnimationCloud() {
  return(
    <div className="hidden h-12 w-24 md:flex items-center justify-center">
      <Lottie animationData={cloudsAnimations} loop={true} />
    </div>
  );
}
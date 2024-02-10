import Lottie from "lottie-react";
import cloudsAnimations from '@/assets/clouds-animation.json';

export function AnimationCloud() {
  return <Lottie animationData={cloudsAnimations} loop={true} height={'80px'} width={'80px'}  />;
}
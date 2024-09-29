import gsap from "gsap";

export const ScaleAnimation = (id) => {
  return gsap.fromTo(id, { scale: 0, y: 50 }, { scale: 1, y: 0, duration: 1 });
};

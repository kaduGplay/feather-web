'use client'

import serverAnim from "./serverAnim.json";

import Lottie from "lottie-react"

export default function ServerAnimation() {
  return (
    <Lottie animationData={serverAnim} className="animate__animated animate__backInRight"/>
  );
}
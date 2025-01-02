"use client"; // 클라이언트 컴포넌트로 설정

import { useRouter } from "next/navigation";
import "./ruler.css";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/ruler"); // /ruler로 이동
  };

  return (
    <div className="container">
      <video className="bg-video__content" autoPlay muted loop>
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <h1>자 잡기!</h1>
      <h3>당신의 순발력은 어느정도인가요??</h3>
      <button
        onClick={handleStart}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        시작
      </button>
    </div>
  );
}

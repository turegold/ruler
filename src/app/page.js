"use client"; // 클라이언트 컴포넌트로 설정

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/ruler"); // /ruler로 이동
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>자 잡기 게임</h1>
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

"use client"; // Client Component 설정

import { useRouter, useSearchParams } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const scale = searchParams.get("scale"); // 눈금 값 가져오기

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h1>게임 결과</h1>
      {status === "fail" && (
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}>
          실패..
        </p>
      )}
      {status === "success" && (
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "green" }}>
          자의 눈금: {scale}cm
        </p>
      )}
      {status === "early" && (
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "orange" }}>
          아직..
        </p>
      )}
      <button
        onClick={() => router.push("/ruler")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        다시 하기
      </button>
    </div>
  );
}

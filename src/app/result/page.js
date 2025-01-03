"use client"; // Client Component 설정

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import "../ruler.css";

// 페이지를 강제로 동적 렌더링
export const dynamic = "force-dynamic";

function GetResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const scale = parseFloat(searchParams.get("scale")); // 눈금 값 가져오기 (숫자로 변환)

  // scale에 따른 멘트 결정 함수
  const getScaleMessage = (scale) => {
    if (scale >= 0 && scale <= 4) return "혹시 프로게이머세요..?";
    if (scale > 4 && scale <= 6) return "상당히 빠르시군요?";
    if (scale > 6 && scale <= 8) return "평범합니다! 실망하지 마세요~";
    if (scale > 8 && scale <= 11) return "한눈 파신 거 아니죠??";
    if (scale > 11) return "거북이 이신가요?";
    return ""; // scale이 없거나 잘못된 경우
  };

  const getScaleEmoji = (scale) => {
    if (scale >= 0 && scale <= 4) return "👑";
    if (scale > 4 && scale <= 6) return "👍";
    if (scale > 6 && scale <= 8) return "😆";
    if (scale > 8 && scale <= 11) return "👀";
    if (scale > 11) return "🐢";
    return ""; // scale이 없거나 잘못된 경우
  };
  return (
    <div className="container">
      <video
        className="bg-video__content"
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <h1>게임 결과</h1>
      {(status === "fail" || scale >= 15) && (
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}>
          실패..😓
        </p>
      )}
      {status === "success" && scale < 15 && (
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "green" }}>
          <p style={{ marginLeft: "60px" }}>눈금: {scale}cm</p>
          <h3>
            {getScaleMessage(scale)}
            {getScaleEmoji(scale)}
          </h3>
        </div>
      )}
      {status === "early" && (
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "orange" }}>
          아직..😅
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

export default function ResultPage() {
  return (
    <Suspense>
      <GetResult />
    </Suspense>
  );
}

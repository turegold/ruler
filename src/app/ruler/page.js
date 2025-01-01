"use client"; // Client Component 설정

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function RulerGame() {
  const [countdown, setCountdown] = useState(3); // 카운트다운 상태
  const [position, setPosition] = useState(-800); // 자의 초기 Y 좌표
  const [isFalling, setIsFalling] = useState(false); // 자가 떨어지는 상태
  const [isWaiting, setIsWaiting] = useState(false); // 랜덤 대기 상태
  const router = useRouter(); // 라우터 객체
  const animationFrameId = useRef(null); // 애니메이션 프레임 ID
  const positionRef = useRef(-800); // 자의 현재 Y 좌표 (로컬 변수)
  const startTimeRef = useRef(null); // 애니메이션 시작 시간

  const convertPositionToScale = (position) => {
    const scalePerPixel = 0.01503; // 픽셀당 눈금 증가율
    const adjustedPosition = position + 800; // 초기 위치 보정
    return (adjustedPosition * scalePerPixel).toFixed(1);
  };

  const startGame = () => {
    setPosition(-800);
    positionRef.current = -800; // 초기 위치 설정
    setIsFalling(true);
    startTimeRef.current = performance.now(); // 시작 시간 기록

    const animate = () => {
      const elapsedTime = performance.now() - startTimeRef.current; // 경과 시간
      positionRef.current = -800 + (elapsedTime / 20) * 30; // 떨어지는 거리 계산

      if (positionRef.current >= window.innerHeight - 71) {
        setIsFalling(false);
        setPosition(window.innerHeight - 71); // 바닥 위치로 설정
        handleFailure();
        return;
      }

      setPosition(positionRef.current); // 상태 업데이트
      animationFrameId.current = requestAnimationFrame(animate); // 다음 프레임 요청
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  const handleSuccess = () => {
    const scale = convertPositionToScale(positionRef.current);
    setIsFalling(false);
    cancelAnimationFrame(animationFrameId.current);
    setTimeout(() => {
      router.push(`/result?status=success&scale=${scale}`);
    }, 1000);
  };

  const handleFailure = () => {
    setIsFalling(false);
    cancelAnimationFrame(animationFrameId.current);
    setTimeout(() => {
      router.push(`/result?status=fail`);
    }, 1000);
  };

  const handleEarlyClick = () => {
    router.push(`/result?status=early`);
  };

  const handleClick = () => {
    if (countdown > 0) {
      return; // 카운트다운 중 클릭 무시
    }

    if (isWaiting) {
      handleEarlyClick(); // 랜덤 대기 중 클릭
    } else if (isFalling) {
      handleSuccess(); // 자가 떨어질 때 클릭
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0) {
      setIsWaiting(true);
      const randomDelay = Math.random() * 5000 + 3000; // 3~8초 랜덤 대기
      const delayTimer = setTimeout(() => {
        setIsWaiting(false);
        startGame();
      }, randomDelay);

      return () => clearTimeout(delayTimer);
    }
  }, [countdown]);

  return (
    <div
      onClick={handleClick}
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      {countdown === 0 && (
        <div
          style={{
            position: "absolute",
            top: "200px",
            left: "0",
            width: "100%",
            height: "2px",
            backgroundColor: "red",
          }}
        ></div>
      )}

      {countdown === 0 && (
        <img
          src="/ruler.png"
          alt="Ruler"
          style={{
            position: "absolute",
            top: `${position}px`,
            left: "50%",
            transform: "translateX(-50%)",
            width: "300px",
            height: "1000px",
            objectFit: "contain",
          }}
        />
      )}

      {countdown > 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "48px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {countdown}
        </div>
      )}

      {isWaiting && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          자가 떨어지면 잡으세요!
        </div>
      )}
    </div>
  );
}

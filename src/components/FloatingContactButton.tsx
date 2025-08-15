"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function FloatingContactButton() {
  // Đổi số ở đây cho tiện cấu hình
  const phoneNumber = "0337008360";
  const zaloNumber = "0337008360";

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Đóng khi bấm ra ngoài
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleZalo = () => {
    window.open(`https://zalo.me/${zaloNumber}`, "_blank");
  };

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      aria-live="polite"
    >
      {/* Popup lựa chọn */}
      {open && (
        <div
          className="w-56 rounded-2xl shadow-2xl border border-slate-200 bg-white/90 backdrop-blur p-3 animate-in fade-in zoom-in-95"
          role="dialog"
          aria-label="Liên hệ nhanh"
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCall}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-100 transition"
            >
              {/* Icon phone (SVG inline) */}
              <span className="inline-flex w-8 h-8 rounded-full bg-green-500 text-white items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.09a2 2 0 0 1 2.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              <div className="text-left">
                <div className="text-sm font-semibold">Gọi cửa hàng</div>
                <div className="text-xs text-slate-500">{phoneNumber}</div>
              </div>
            </button>

            <button
              onClick={handleZalo}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-100 transition"
            >
              {/* Dùng ảnh Zalo trong /public */}
              <span className="inline-flex w-8 h-8 rounded-full bg-blue-500 items-center justify-center overflow-hidden">
                <Image
                  src="/zalo-1.png"
                  alt="Zalo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </span>
              <div className="text-left">
                <div className="text-sm font-semibold">Chat Zalo</div>
                <div className="text-xs text-slate-500">zalo.me/{zaloNumber}</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Nút tròn nổi */}
    <button
    onClick={() => setOpen((s) => !s)}
    aria-expanded={open}
    aria-controls="contact-menu"
    className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition select-none"
    style={{ backgroundColor: "rgb(236, 114, 14)", color: "white" }}
    title="Liên hệ nhanh"
    >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform ${open ? "rotate-12" : ""}`}
    >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.09a2 2 0 0 1 2.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z"></path>
    </svg>
    </button>


    </div>
  );
}

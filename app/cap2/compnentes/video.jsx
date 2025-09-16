"use client";

export default function CloudinaryPlayer() {
  return (
    <div className="relative w-full max-w-6xl mx-auto aspect-video">
      <video
        src="https://res.cloudinary.com/dpdyco5po/video/upload/f_auto,q_auto/cap_2_Dale_personalidad_REAL_a_tu_IA_LangChain_kwfpnl.mp4"
        poster="https://res.cloudinary.com/dpdyco5po/video/upload/cap_2_Dale_personalidad_REAL_a_tu_IA_LangChain_kwfpnl.jpg"
        controls
        playsInline
        className="absolute inset-0 w-full h-full rounded-2xl shadow-lg object-cover"
      >
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
}

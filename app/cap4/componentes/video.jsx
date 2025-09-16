"use client";

export default function CloudinaryPlayer() {
  return (
    <div className="relative w-full max-w-6xl mx-auto aspect-video">
      <video
        src="https://res.cloudinary.com/dpdyco5po/video/upload/f_auto,q_auto/cap_4_IA_con_Memoria_y_Personalidad_REAL_LangChain_kc29pk.mp4"
        poster="https://res.cloudinary.com/dpdyco5po/video/upload/cap_4_IA_con_Memoria_y_Personalidad_REAL_LangChain_kc29pk.jpg"
        controls
        playsInline
        className="absolute inset-0 w-full h-full rounded-2xl shadow-lg object-cover"
      >
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
}

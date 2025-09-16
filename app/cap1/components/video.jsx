"use client";

export default function CloudinaryPlayer() {
  return (
    <div className="relative w-full max-w-6xl mx-auto aspect-video">
      <video
        src="https://res.cloudinary.com/dpdyco5po/video/upload/f_auto,q_auto/Tu_IA_solo_responde__cap_1_con_LangChain_Hazla_PENSAR_rqppoo.mp4"
        poster="https://res.cloudinary.com/dpdyco5po/video/upload/Tu_IA_solo_responde__cap_1_con_LangChain_Hazla_PENSAR_rqppoo.jpg"
        controls
        playsInline
        className="absolute inset-0 w-full h-full rounded-2xl shadow-lg object-cover"
      >
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
}

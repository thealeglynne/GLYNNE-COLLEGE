'use client';

export default function CloudinaryPlayer() {
  return (
    <div className="relative w-full max-w-6xl mx-auto aspect-video">
      <video
        src="https://res.cloudinary.com/dpdyco5po/video/upload/f_auto,q_auto/cap5-1_uyeer7.mp4"
        poster="https://res.cloudinary.com/dpdyco5po/video/upload/cap5-1_uyeer7.jpg"
        controls
        playsInline
        className="absolute inset-0 w-full h-full rounded-2xl shadow-lg object-cover"
      >
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
}

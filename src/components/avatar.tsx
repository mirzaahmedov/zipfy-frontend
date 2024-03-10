export type AvatarProps = {
  src: string;
  alt: string;
};
function Avatar({ src, alt }: AvatarProps) {
  return (
    <div className="w-12 h-12 text-white text-center leading-[48px] bg-gradient-to-br from-secondary to-primary rounded-full overflow-hidden text-xl font-bold ">
      {src ? <img src={src} alt={alt} /> : String(alt)[0].toUpperCase()}
    </div>
  );
}

export default Avatar;

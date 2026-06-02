import Image, { type ImageProps, type StaticImageData } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  src: StaticImageData | string;
  blurDataURL?: string;
};

export default function Img({
  src,
  alt,
  sizes = "100vw",
  quality = 70,
  className,
  priority = false,
  blurDataURL,
  ...rest
}: Props) {
  const isLocal = typeof src !== "string";

  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder={isLocal || blurDataURL ? "blur" : "empty"}
      blurDataURL={!isLocal ? blurDataURL : undefined}
      decoding="async"
      className={className}
      {...rest}
    />
  );
}

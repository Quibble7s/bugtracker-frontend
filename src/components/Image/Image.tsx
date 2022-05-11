interface Props {
  /**
   * The source of the image.
   */
  src: string;
  /**
   * The width of the image.
   */
  width: number;
  /**
   * The height of the image.
   */
  height: number;
  /**
   * The text that the image will show if not loading correctly.
   */
  alt?: string;
  /**
   * The style of the image.
   * @default ''
   */
  className?: string;
  /**
   * How the image will fill inside the container.
   * @default 'fill'
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down' | 'none';
}

export const Image = ({
  src,
  width,
  height,
  alt,
  className = '',
  objectFit = 'fill',
}: Props) => {
  return (
    <img
      loading='lazy'
      className={className}
      style={{ objectFit: objectFit }}
      src={src}
      alt={alt}
      width={`${width}px`}
      height={`${height}px`}
    />
  );
};

import { SyntheticEvent } from 'react';

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
  /**
   * Fires when the image is done loading.
   */
  onLoad?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  /**
   * How the image will load.
   * @default 'lazy'
   */
  loading?: 'lazy' | 'eager';
}

export const Image = ({
  src,
  width,
  height,
  alt,
  className = '',
  objectFit = 'fill',
  loading = 'lazy',
  onLoad,
}: Props) => {
  return (
    <img
      loading={loading}
      onLoad={onLoad}
      className={className}
      style={{ objectFit: objectFit }}
      src={src}
      alt={alt}
      width={`${width}px`}
      height={`${height}px`}
    />
  );
};

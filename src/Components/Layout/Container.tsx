import { ReactNode } from 'react';

interface Props {
  /**
   * The custom styles for the container.
   */
  className?: string;
  /**
   * The node to render inside the container.
   */
  children?: ReactNode;
  /**
   * The id of the container.
   * @default ''
   */
  id?: string;
}

/**
 *
 * @param className The custom styles for the container.
 * @param children The node to render inside the container.
 * @returns An instance of the Container Component
 */
export const Container = ({ className = '', id = '', children }: Props) => {
  return (
    <div
      id={id}
      data-testid='container'
      className={`w-full px-1 md:px-4 md:max-w-[760px] lg:max-w-[1280px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

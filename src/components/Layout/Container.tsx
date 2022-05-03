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
}

/**
 *
 * @param className The custom styles for the container.
 * @param children The node to render inside the container.
 * @returns An instance of the Container Component
 */
export const Container = ({ className, children }: Props) => {
  return (
    <div
      data-testid='container'
      className={`max-w-full md:p-0 md:max-w-[800px] lg:max-w-[960px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

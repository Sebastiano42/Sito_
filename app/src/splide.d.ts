declare module '@splidejs/react-splide' {
  import { ComponentType } from 'react';

  export interface SplideOptions {
    type?: string;
    perPage?: number;
    perMove?: number;
    gap?: string;
    padding?: { left: number; right: number } | string;
    focus?: string;
    pagination?: boolean;
    arrows?: boolean;
    drag?: boolean;
    snap?: boolean;
    speed?: number;
    interval?: number;
    autoplay?: boolean;
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
    resetProgress?: boolean;
    updateOnMove?: boolean;
    trimSpace?: boolean;
    flickPower?: number;
    flickMaxPages?: number;
    easing?: string;
    breakpoints?: Record<number, Partial<SplideOptions>>;
  }

  export interface SplideProps {
    options?: SplideOptions;
    className?: string;
    hasTrack?: boolean;
    onMove?: (splide: any) => void;
    children?: React.ReactNode;
    ref?: React.Ref<any>;
  }

  export interface SplideSlideProps {
    className?: string;
    children?: React.ReactNode;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}

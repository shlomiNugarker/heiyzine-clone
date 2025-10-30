import { memo } from 'react';
import Image from 'next/image';

interface FlipPageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

function FlipPageComponent({ src, alt, width, height }: FlipPageProps) {
  return (
    <div className="flip-page" data-density="hard">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}

export const FlipPage = memo(FlipPageComponent);

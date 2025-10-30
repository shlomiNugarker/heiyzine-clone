import React from 'react';
import Image from 'next/image';

interface PageProps {
  number: number;
  children?: React.ReactNode;
  image?: string;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  // Determine if this is likely the first page (cover) for priority loading
  const isPriority = props.number <= 2;

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
      data-page-number={props.number}
      role="region"
      aria-label={`Page ${props.number}`}
    >
      {props.image ? (
        <Image
          src={props.image}
          alt={`Page ${props.number} of the flipbook`}
          fill
          style={{
            objectFit: 'contain',
          }}
          quality={85}
          priority={isPriority}
          loading={isPriority ? 'eager' : 'lazy'}
          unoptimized // Keep unoptimized for data URLs from PDF processing
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            lineHeight: '1.6',
          }}
        >
          <p style={{ textAlign: 'center', maxWidth: '80%' }}>
            {props.children}
          </p>
        </div>
      )}
    </div>
  );
});

Page.displayName = 'Page';

// Memoize the component to prevent unnecessary re-renders
export default React.memo(Page);

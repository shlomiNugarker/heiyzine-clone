import React from 'react';

interface PageProps {
  number: number;
  children?: React.ReactNode;
  image?: string;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // overflow: 'hidden',
      }}
    >
      {props.image ? (
        <img
          src={props.image}
          alt={`Page ${props.number}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <p style={{ textAlign: 'center' }}>{props.children}</p>
        </div>
      )}
    </div>
  );
});

Page.displayName = 'Page';

export default Page;

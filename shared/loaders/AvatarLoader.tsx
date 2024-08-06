import React from 'react';
import ContentLoader from 'react-content-loader';

interface AvatarLoaderProps {
  radius: number;
}

const AvatarLoader: React.FC<AvatarLoaderProps> = ({ radius, ...props }) => (
  <ContentLoader
    speed={3}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#8f8f8f"
    {...props}
  >
    <circle cx={radius} cy={radius} r={radius} />
  </ContentLoader>
);

export default AvatarLoader;

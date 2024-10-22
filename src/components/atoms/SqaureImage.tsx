import React from 'react';
import photo from '../../image/icon/photo.png';

interface SquareImageProps {
  image?: string; // 선택적 이미지 URL
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void; // 클릭 이벤트 핸들러
  alt?: string; // 대체 텍스트
}

const SquareImage: React.FC<SquareImageProps> = ({ image, onClick, alt }) => {
  return (
    <div className="image-square">
      <img
        className="image-preview"
        src={image ? image : photo}
        onClick={onClick ? (e) => onClick(e) : undefined}
        alt={alt}
      />
    </div>
  );
};

export default SquareImage;

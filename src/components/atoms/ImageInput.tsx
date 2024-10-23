import { useState, ChangeEvent } from 'react';
import Button from './Button';

interface ImageInputProps {
  image?: string;
  width: string;
  height: string;
  square?: boolean;
  readOnly?: boolean;
  onImageChange?: (file: File) => void;
  alt?: string;
}

export default function ImageInput({
  image,
  width,
  height,
  square = false,
  readOnly = false,
  onImageChange,
  alt = 'image preview',
}: ImageInputProps) {
  const [imgFile, setImgFile] = useState<string | undefined>(image);

  const reader = new FileReader();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const result = reader.result as string;
        setImgFile(result);
        if (onImageChange) {
          onImageChange(file);
        }
      };
    }
  };

  const handleDeleteClick = () => {
    const label = document.querySelector('label.image-input');
    if (label) {
      const input = label.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
    setImgFile(undefined);
  };

  return (
    <label className={imgFile ? 'image-input value' : 'image-input'}>
      <input
        className="image-input-input"
        type="file"
        name="file"
        accept="image/*"
        onClick={(e) => {
          if (readOnly) e.preventDefault();
        }}
        onChange={handleFileChange}
      />
      <div
        className="image-crop"
        style={{
          width: width,
          height: height,
          borderRadius: square ? 'initial' : '50%',
        }}
      >
        <Button type="button" text="삭제" onClick={handleDeleteClick} />
        <img
          style={{ width: square ? (imgFile ? '100%' : '50%') : width }}
          className="image-preview"
          src={imgFile}
          alt={alt}
        />
      </div>
    </label>
  );
}

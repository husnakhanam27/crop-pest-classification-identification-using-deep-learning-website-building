
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
}

const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processImage(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      onImageSelect(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <h3 className="text-lg font-medium text-green-700">
          {t("upload.identify")}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          {t("upload.uploadPest")}
        </p>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {t("upload.dragDrop")}
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="bg-white hover:bg-green-50"
          >
            {t("upload.select")}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

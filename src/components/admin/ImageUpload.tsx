import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  currentImageUrl?: string;
  onRemove?: () => void;
  label?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  currentImageUrl,
  onRemove,
  label = 'Upload Image',
  disabled = false,
}) => {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [uploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && !disabled) {
        const file = acceptedFiles[0];
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Pass file to parent
        onImageSelect(file);
      }
    },
    [onImageSelect, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxFiles: 1,
    disabled,
  });

  const handleRemove = () => {
    setPreview(null);
    if (onRemove) {
      onRemove();
    }
  };

  // Update preview when currentImageUrl changes
  React.useEffect(() => {
    if (currentImageUrl && !preview) {
      setPreview(currentImageUrl);
    }
  }, [currentImageUrl, preview]);

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{ marginBottom: 1, fontWeight: 600, color: 'black' }}
      >
        {label}
      </Typography>

      {preview ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 300,
            border: '2px solid black',
            borderRadius: 0,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={preview}
            alt="Preview"
            sx={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {!disabled && (
            <IconButton
              onClick={handleRemove}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.9)',
                },
              }}
              size="small"
            >
              <Close />
            </IconButton>
          )}
        </Box>
      ) : (
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed black',
            borderRadius: 0,
            padding: 4,
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundColor: isDragActive
              ? 'rgba(0,0,0,0.1)'
              : 'rgba(255,255,255,0.3)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: disabled ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.05)',
            },
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <CircularProgress sx={{ color: 'black' }} size={40} />
          ) : (
            <>
              <CloudUpload sx={{ fontSize: 48, color: 'black', marginBottom: 1 }} />
              <Typography variant="body1" sx={{ color: 'black', fontWeight: 600 }}>
                {isDragActive
                  ? 'Drop the image here'
                  : 'Drag & drop an image here, or click to select'}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'black', opacity: 0.7, marginTop: 1 }}
              >
                Supported formats: JPEG, PNG, GIF, WebP
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;


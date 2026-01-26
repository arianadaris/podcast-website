import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  MenuItem,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import {
  createInterview,
  updateInterview,
  getInterviewById,
  uploadInterviewImage,
  getSeasons,
} from '../../services/interviewService';

interface InterviewFormData {
  season: number;
  order_number: number;
  name: string;
  link: string;
}

const InterviewFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [seasons, setSeasons] = useState<number[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<InterviewFormData>({
    defaultValues: {
      season: 1,
      order_number: 1,
      name: '',
      link: '',
    },
  });

  const loadSeasons = useCallback(async () => {
    try {
      const data = await getSeasons();
      setSeasons(data.length > 0 ? data : [1, 2]);
    } catch (error) {
      setSeasons([1, 2]);
    }
  }, []);

  const loadInterview = useCallback(async (interviewId: string) => {
    try {
      setLoading(true);
      const interview = await getInterviewById(interviewId);

      if (interview) {
        setCurrentImageUrl(interview.image_url);
        reset({
          season: interview.season,
          order_number: interview.order_number,
          name: interview.name,
          link: interview.link,
        });
      }
    } catch (error) {
      setError('Failed to load interview');
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    loadSeasons();
    if (isEditMode && id) {
      loadInterview(id);
    }
  }, [id, isEditMode, loadSeasons, loadInterview]);

  // Track form changes
  useEffect(() => {
    setHasChanges(isDirty || imageFile !== null);
  }, [isDirty, imageFile]);

  const onSubmit = async (data: InterviewFormData) => {

    try {
      setSaving(true);
      setError(null);

      let imageUrl = currentImageUrl;

      // Upload new image if selected
      if (imageFile) {
        const tempId = id || `temp-${Date.now()}`;
        imageUrl = await uploadInterviewImage(imageFile, tempId);
      }

      if (!imageUrl) {
        setError('Please upload an image');
        setSaving(false);
        return;
      }

      const interviewData = {
        season: data.season,
        order_number: data.order_number,
        name: data.name,
        link: data.link,
        image_url: imageUrl,
      };

      if (isEditMode && id) {
        await updateInterview(id, interviewData);
      } else {
        await createInterview(interviewData);
      }

      navigate('/admin/interviews');
    } catch (error: any) {
      setError(error.message || 'Failed to save interview');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title={isEditMode ? 'Edit Interview' : 'Add Interview'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditMode ? 'Edit Interview' : 'Add Interview'}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert
            severity="error"
            sx={{
              marginBottom: 3,
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              border: '2px solid #d32f2f',
              borderRadius: 0,
            }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Interview Information */}
          <Card
            sx={{
              backgroundColor: 'primary.light',
              border: '2px solid black',
              borderRadius: 0,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
                Interview Information
              </Typography>

              <Stack spacing={2}>
                <Controller
                  name="season"
                  control={control}
                  rules={{ required: 'Season is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Season"
                      error={Boolean(errors.season)}
                      helperText={errors.season?.message}
                      disabled={false}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          borderRadius: 0,
                          '& fieldset': { borderColor: 'black', borderWidth: 2 },
                        },
                      }}
                    >
                      {seasons.map((season) => (
                        <MenuItem key={season} value={season}>
                          Season {season}
                        </MenuItem>
                      ))}
                      {/* Option to add new season */}
                      <MenuItem value={Math.max(...seasons, 0) + 1}>
                        Season {Math.max(...seasons, 0) + 1} (New)
                      </MenuItem>
                    </TextField>
                  )}
                />

                <Controller
                  name="order_number"
                  control={control}
                  rules={{
                    required: 'Order number is required',
                    min: { value: 1, message: 'Order number must be at least 1' },
                    max: { value: 10, message: 'Order number must be at most 10' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Order Number"
                      error={Boolean(errors.order_number)}
                      helperText={errors.order_number?.message || 'Order within season (1-10)'}
                      disabled={false}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          borderRadius: 0,
                          '& fieldset': { borderColor: 'black', borderWidth: 2 },
                        },
                      }}
                    />
                  )}
                />

                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Guest name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Guest Name"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                      disabled={false}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          borderRadius: 0,
                          '& fieldset': { borderColor: 'black', borderWidth: 2 },
                        },
                      }}
                    />
                  )}
                />

                <Controller
                  name="link"
                  control={control}
                  rules={{
                    required: 'Interview link is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Please enter a valid URL',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Interview Link"
                      placeholder="https://youtu.be/..."
                      error={Boolean(errors.link)}
                      helperText={errors.link?.message || 'YouTube or other video platform URL'}
                      disabled={false}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          borderRadius: 0,
                          '& fieldset': { borderColor: 'black', borderWidth: 2 },
                        },
                      }}
                    />
                  )}
                />

                <ImageUpload
                  onImageSelect={setImageFile}
                  currentImageUrl={currentImageUrl}
                  onRemove={() => {
                    setImageFile(null);
                    setCurrentImageUrl('');
                  }}
                  label="Guest Image"
                  disabled={false}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/interviews')}
              sx={{
                color: 'black',
                borderColor: 'black',
                borderRadius: 0,
                border: '2px solid black',
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  border: '2px solid black',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={saving ? <CircularProgress size={20} /> : <Save />}
              disabled={saving || (isEditMode && !hasChanges)}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: 0,
                border: '2px solid black',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: 'rgba(255,255,255,0.5)',
                  borderColor: 'rgba(0,0,0,0.3)',
                },
              }}
            >
              {saving ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </AdminLayout>
  );
};

export default InterviewFormPage;


import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Add, Delete, Save } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import {
  createTeamMember,
  updateTeamMember,
  getTeamMemberById,
  uploadTeamImage,
} from '../../services/teamService';

interface TeamMemberFormData {
  name: string;
  role: string;
  social_handle: string;
  audio_url: string;
  fun_facts: { value: string }[];
  favorite_artists: { name: string; image: string }[];
  favorite_albums: { name: string; artist: string; image: string }[];
}

const TeamFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [hasChanges, setHasChanges] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TeamMemberFormData>({
    defaultValues: {
      name: '',
      role: '',
      social_handle: '',
      audio_url: '',
      fun_facts: [{ value: '' }],
      favorite_artists: [{ name: '', image: '' }],
      favorite_albums: [{ name: '', artist: '', image: '' }],
    },
  });

  const {
    fields: funFactsFields,
    append: appendFunFact,
    remove: removeFunFact,
  } = useFieldArray({
    control,
    name: 'fun_facts',
  });

  const {
    fields: artistsFields,
    append: appendArtist,
    remove: removeArtist,
  } = useFieldArray({
    control,
    name: 'favorite_artists',
  });

  const {
    fields: albumsFields,
    append: appendAlbum,
    remove: removeAlbum,
  } = useFieldArray({
    control,
    name: 'favorite_albums',
  });

  const loadTeamMember = useCallback(async (memberId: string) => {
    try {
      setLoading(true);
      const member = await getTeamMemberById(memberId);
      
      if (member) {
        setCurrentImageUrl(member.image_url);
        reset({
          name: member.name,
          role: member.role,
          social_handle: member.social_handle,
          audio_url: member.audio_url || '',
          fun_facts: member.fun_facts?.map((fact) => ({ value: fact })) || [{ value: '' }],
          favorite_artists: member.favorite_artists || [{ name: '', image: '' }],
          favorite_albums: member.favorite_albums || [{ name: '', artist: '', image: '' }],
        });
      }
    } catch (error) {
      setError('Failed to load team member');
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    if (isEditMode && id) {
      loadTeamMember(id);
    }
  }, [id, isEditMode, loadTeamMember]);

  // Track form changes
  useEffect(() => {
    setHasChanges(isDirty || imageFile !== null);
  }, [isDirty, imageFile]);

  const onSubmit = async (data: TeamMemberFormData) => {

    try {
      setSaving(true);
      setError(null);

      let imageUrl = currentImageUrl;

      // Upload new image if selected
      if (imageFile) {
        const tempId = id || `temp-${Date.now()}`;
        imageUrl = await uploadTeamImage(imageFile, tempId);
      }

      if (!imageUrl) {
        setError('Please upload an image');
        setSaving(false);
        return;
      }

      const teamMemberData = {
        name: data.name,
        role: data.role,
        social_handle: data.social_handle,
        audio_url: data.audio_url || undefined,
        image_url: imageUrl,
        fun_facts: data.fun_facts.map((f) => f.value).filter((f) => f.trim() !== ''),
        favorite_artists: data.favorite_artists.filter(
          (a) => a.name.trim() !== '' && a.image.trim() !== ''
        ),
        favorite_albums: data.favorite_albums.filter(
          (a) =>
            a.name.trim() !== '' && a.artist.trim() !== '' && a.image.trim() !== ''
        ),
      };

      if (isEditMode && id) {
        await updateTeamMember(id, teamMemberData);
      } else {
        await createTeamMember(teamMemberData);
      }

      navigate('/admin/team');
    } catch (error: any) {
      setError(error.message || 'Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title={isEditMode ? 'Edit Team Member' : 'Add Team Member'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditMode ? 'Edit Team Member' : 'Add Team Member'}>
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
          {/* Basic Information */}
          <Card
            sx={{
              backgroundColor: 'primary.light',
              border: '2px solid black',
              borderRadius: 0,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
                Basic Information
              </Typography>

              <Stack spacing={2}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
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
                  name="role"
                  control={control}
                  rules={{ required: 'Role is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Role"
                      error={Boolean(errors.role)}
                      helperText={errors.role?.message}
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
                  name="social_handle"
                  control={control}
                  rules={{ required: 'Social handle is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Social Handle"
                      placeholder="@username"
                      error={Boolean(errors.social_handle)}
                      helperText={errors.social_handle?.message}
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
                  name="audio_url"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Audio URL (Optional)"
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
                  label="Profile Image"
                  disabled={false}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <Card
            sx={{
              backgroundColor: 'primary.light',
              border: '2px solid black',
              borderRadius: 0,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Fun Facts
                </Typography>
                <Button
                  startIcon={<Add />}
                  onClick={() => appendFunFact({ value: '' })}
                  disabled={false}
                  sx={{
                    color: 'black',
                    borderColor: 'black',
                    borderRadius: 0,
                    border: '2px solid black',
                  }}
                  variant="outlined"
                  size="small"
                >
                  Add Fact
                </Button>
              </Box>

              <Stack spacing={2}>
                {funFactsFields.map((field, index) => (
                  <Box key={field.id} sx={{ display: 'flex', gap: 1 }}>
                    <Controller
                      name={`fun_facts.${index}.value`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          placeholder="Enter a fun fact"
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
                    {funFactsFields.length > 1 && (
                      <IconButton
                        onClick={() => removeFunFact(index)}
                        disabled={false}
                        sx={{
                          border: '2px solid black',
                          borderRadius: 0,
                          color: 'black',
                        }}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Favorite Artists */}
          <Card
            sx={{
              backgroundColor: 'primary.light',
              border: '2px solid black',
              borderRadius: 0,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Favorite Artists
                </Typography>
                <Button
                  startIcon={<Add />}
                  onClick={() => appendArtist({ name: '', image: '' })}
                  disabled={false}
                  sx={{
                    color: 'black',
                    borderColor: 'black',
                    borderRadius: 0,
                    border: '2px solid black',
                  }}
                  variant="outlined"
                  size="small"
                >
                  Add Artist
                </Button>
              </Box>

              <Stack spacing={2}>
                {artistsFields.map((field, index) => (
                  <Box key={field.id}>
                    <Box sx={{ display: 'flex', gap: 1, marginBottom: 1 }}>
                      <Controller
                        name={`favorite_artists.${index}.name`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            placeholder="Artist name"
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
                      {artistsFields.length > 1 && (
                        <IconButton
                          onClick={() => removeArtist(index)}
                          disabled={false}
                          sx={{
                            border: '2px solid black',
                            borderRadius: 0,
                            color: 'black',
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                    <Controller
                      name={`favorite_artists.${index}.image`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          placeholder="Artist image URL"
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
                    {index < artistsFields.length - 1 && <Divider sx={{ marginTop: 2 }} />}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Favorite Albums */}
          <Card
            sx={{
              backgroundColor: 'primary.light',
              border: '2px solid black',
              borderRadius: 0,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Favorite Albums
                </Typography>
                <Button
                  startIcon={<Add />}
                  onClick={() => appendAlbum({ name: '', artist: '', image: '' })}
                  disabled={false}
                  sx={{
                    color: 'black',
                    borderColor: 'black',
                    borderRadius: 0,
                    border: '2px solid black',
                  }}
                  variant="outlined"
                  size="small"
                >
                  Add Album
                </Button>
              </Box>

              <Stack spacing={2}>
                {albumsFields.map((field, index) => (
                  <Box key={field.id}>
                    <Box sx={{ display: 'flex', gap: 1, marginBottom: 1 }}>
                      <Controller
                        name={`favorite_albums.${index}.name`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            placeholder="Album name"
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
                      {albumsFields.length > 1 && (
                        <IconButton
                          onClick={() => removeAlbum(index)}
                          disabled={false}
                          sx={{
                            border: '2px solid black',
                            borderRadius: 0,
                            color: 'black',
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                    <Controller
                      name={`favorite_albums.${index}.artist`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          placeholder="Artist name"
                          disabled={false}
                          sx={{
                            marginBottom: 1,
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
                      name={`favorite_albums.${index}.image`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          placeholder="Album cover URL"
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
                    {index < albumsFields.length - 1 && <Divider sx={{ marginTop: 2 }} />}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/team')}
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

export default TeamFormPage;


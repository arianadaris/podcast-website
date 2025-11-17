import React, { useEffect, useState } from 'react';
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
  Autocomplete,
  Chip,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../hooks/useAuth';
import {
  createEvent,
  updateEvent,
  getEventById,
} from '../../services/eventService';
import { getAllTeamMembers } from '../../services/teamService';

interface EventFormData {
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
  attending_members: string[];
}

const EventFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EventFormData>({
    defaultValues: {
      name: '',
      location: '',
      date: '',
      time: '',
      description: '',
      attending_members: [],
    },
  });

  useEffect(() => {
    loadTeamMembers();
    if (isEditMode && id) {
      loadEvent(id);
    }
  }, [id, isEditMode]);

  // Track form changes
  useEffect(() => {
    setHasChanges(isDirty);
  }, [isDirty]);

  const loadTeamMembers = async () => {
    try {
      const members = await getAllTeamMembers();
      setTeamMembers(members.map(m => m.name));
    } catch (error) {
      // Silently fail
    }
  };

  const loadEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const event = await getEventById(eventId);

      if (event) {
        reset({
          name: event.name,
          location: event.location,
          date: event.date,
          time: event.time,
          description: event.description,
          attending_members: event.attending_members || [],
        });
      }
    } catch (error) {
      setError('Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EventFormData) => {

    try {
      setSaving(true);
      setError(null);

      const eventData = {
        name: data.name,
        location: data.location,
        date: data.date,
        time: data.time,
        description: data.description,
        attending_members: data.attending_members,
      };

      if (isEditMode && id) {
        await updateEvent(id, eventData);
      } else {
        await createEvent(eventData);
      }

      navigate('/admin/events');
    } catch (error: any) {
      setError(error.message || 'Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title={isEditMode ? 'Edit Event' : 'Add Event'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditMode ? 'Edit Event' : 'Add Event'}>
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
          {/* Event Information */}
          <Card
            sx={{
              backgroundColor: 'primary.light',
              border: '2px solid black',
              borderRadius: 0,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
                Event Information
              </Typography>

              <Stack spacing={2}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Event name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Event Name"
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
                  name="location"
                  control={control}
                  rules={{ required: 'Location is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      error={Boolean(errors.location)}
                      helperText={errors.location?.message}
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

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: 'Date is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        error={Boolean(errors.date)}
                        helperText={errors.date?.message}
                        disabled={false}
                        sx={{
                          flex: 1,
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
                    name="time"
                    control={control}
                    rules={{ required: 'Time is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Time"
                        placeholder="7:00 PM"
                        error={Boolean(errors.time)}
                        helperText={errors.time?.message}
                        disabled={false}
                        sx={{
                          flex: 1,
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: 0,
                            '& fieldset': { borderColor: 'black', borderWidth: 2 },
                          },
                        }}
                      />
                    )}
                  />
                </Box>

                <Controller
                  name="description"
                  control={control}
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      multiline
                      rows={4}
                      error={Boolean(errors.description)}
                      helperText={errors.description?.message}
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
                  name="attending_members"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple
                      options={teamMembers}
                      value={value}
                      onChange={(_, newValue) => onChange(newValue)}
                      disabled={false}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Attending Team Members"
                          placeholder="Select team members"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              borderRadius: 0,
                              '& fieldset': { borderColor: 'black', borderWidth: 2 },
                            },
                          }}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option}
                            {...getTagProps({ index })}
                            sx={{
                              backgroundColor: 'black',
                              color: 'white',
                              borderRadius: 0,
                              '& .MuiChip-deleteIcon': {
                                color: 'white',
                              },
                            }}
                          />
                        ))
                      }
                      sx={{
                        '& .MuiAutocomplete-tag': {
                          backgroundColor: 'black',
                          color: 'white',
                        },
                      }}
                    />
                  )}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/events')}
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

export default EventFormPage;


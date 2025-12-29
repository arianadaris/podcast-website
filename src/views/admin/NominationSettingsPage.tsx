import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getNominationSettings,
  updateNominationSettings,
  createNominationSettings,
  getNominationStats,
} from '../../services/nominationService';
import { NominationSettings } from '../../config/supabase';
import { getCategoryDisplayName } from '../../utils/nominationValidation';
import { usePageTitle } from '../../hooks/usePageTitle';

interface SettingsFormData {
  is_active: boolean;
  start_date: string;
  end_date: string;
}

const NominationSettingsPage: React.FC = () => {
  usePageTitle('Nomination Settings - Admin');

  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<SettingsFormData>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<NominationSettings | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [settingsData, statsData] = await Promise.all([
        getNominationSettings(),
        getNominationStats(),
      ]);

      setSettings(settingsData);
      setStats(statsData);

      if (settingsData) {
        reset({
          is_active: settingsData.is_active,
          start_date: settingsData.start_date || '',
          end_date: settingsData.end_date || '',
        });
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load nomination settings.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SettingsFormData) => {
    setSaving(true);
    setError(null);

    try {
      const updates = {
        is_active: data.is_active,
        start_date: data.start_date || undefined,
        end_date: data.end_date || undefined,
      };

      if (settings) {
        await updateNominationSettings(settings.id, updates);
      } else {
        await createNominationSettings(updates);
      }

      setHasChanges(false);
      await loadData();
      navigate('/admin/nominations');
    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Nomination Settings" backTo="/admin/nominations">
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Nomination Settings" backTo="/admin/nominations">
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
          {/* Statistics Card */}
          {stats && (
            <Card
              sx={{
                backgroundColor: 'primary.light',
                border: '2px solid black',
                borderRadius: 0,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
                  Nomination Statistics
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(2, 1fr)',
                      sm: 'repeat(3, 1fr)',
                      md: 'repeat(4, 1fr)',
                    },
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      border: '2px solid black',
                      borderRadius: 0,
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'black' }}>
                      {stats.totalSubmissions}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'black', opacity: 0.8 }}>
                      Total Submissions
                    </Typography>
                  </Box>
                  {Object.entries(stats.nominationsByCategory).map(([category, count]) => (
                    <Box
                      key={category}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        border: '2px solid black',
                        borderRadius: 0,
                        padding: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 700, color: 'black' }}>
                        {count as number}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'black', opacity: 0.8, fontSize: '0.75rem' }}>
                        {getCategoryDisplayName(category)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Settings Form Card */}
          <Card
            sx={{
              backgroundColor: 'primary.light',
              border: '2px solid black',
              borderRadius: 0,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
                Configure Nomination Period
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ marginBottom: 1 }}>
                  <Controller
                    name="is_active"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              setHasChanges(true);
                            }}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: 'black',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: 'black',
                              },
                            }}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: 'black' }}>
                              Nominations Active
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'black', opacity: 0.7 }}>
                              Toggle to open or close nominations
                            </Typography>
                          </Box>
                        }
                      />
                    )}
                  />
                </Box>

                <Controller
                  name="start_date"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Start Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText="Optional: Leave empty for no start date restriction"
                      onChange={(e) => {
                        field.onChange(e);
                        setHasChanges(true);
                      }}
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
                  name="end_date"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="End Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText="Optional: Leave empty for no end date restriction"
                      onChange={(e) => {
                        field.onChange(e);
                        setHasChanges(true);
                      }}
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
              </Stack>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/nominations')}
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
              startIcon={saving ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Save />}
              disabled={saving || !hasChanges}
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
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </AdminLayout>
  );
};

export default NominationSettingsPage;

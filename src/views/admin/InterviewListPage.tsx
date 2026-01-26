import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable, { Column, Action } from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { getAllInterviews, deleteInterview, getSeasons } from '../../services/interviewService';
import { Interview } from '../../config/supabase';

const InterviewListPage: React.FC = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');
  const [seasons, setSeasons] = useState<number[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [interviewToDelete, setInterviewToDelete] = useState<Interview | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    loadInterviews();
    loadSeasons();
  }, []);

  useEffect(() => {
    let filtered = interviews;

    // Filter by season
    if (seasonFilter !== 'all') {
      filtered = filtered.filter(
        (interview) => interview.season === parseInt(seasonFilter)
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((interview) =>
        interview.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInterviews(filtered);
  }, [searchTerm, seasonFilter, interviews]);

  const loadInterviews = async () => {
    try {
      setLoading(true);
      const data = await getAllInterviews();
      setInterviews(data);
      setFilteredInterviews(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to load interviews',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSeasons = async () => {
    try {
      const data = await getSeasons();
      setSeasons(data);
    } catch (error) {
      // Silently fail
    }
  };

  const handleDelete = (interview: Interview) => {
    setInterviewToDelete(interview);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!interviewToDelete) return;

    try {
      await deleteInterview(interviewToDelete.id);
      setSnackbar({
        open: true,
        message: 'Interview deleted successfully',
        severity: 'success',
      });
      loadInterviews();
      loadSeasons();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete interview',
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setInterviewToDelete(null);
    }
  };

  const columns: Column[] = [
    {
      id: 'image_url',
      label: 'Image',
      minWidth: 80,
      format: (value: string) => (
        <Box
          component="img"
          src={value}
          alt="Interview"
          sx={{
            width: 50,
            height: 50,
            objectFit: 'cover',
            border: '2px solid black',
            borderRadius: 0,
          }}
        />
      ),
    },
    {
      id: 'season',
      label: 'Season',
      minWidth: 80,
      format: (value: number) => (
        <Chip
          label={`Season ${value}`}
          size="small"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      id: 'order_number',
      label: 'Order',
      minWidth: 70,
      align: 'center' as const,
      format: (value: number) => (
        <Typography sx={{ fontWeight: 600, color: 'black' }}>
          {value}
        </Typography>
      ),
    },
    {
      id: 'name',
      label: 'Guest Name',
      minWidth: 150,
    },
    {
      id: 'link',
      label: 'Link',
      minWidth: 200,
      format: (value: string) => (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'black',
            textDecoration: 'underline',
            fontWeight: 600,
          }}
        >
          View Interview
        </a>
      ),
    },
  ];

  const actions: Action[] = [
    {
      icon: 'edit',
      label: 'Edit',
      onClick: (row: Interview) => navigate(`/admin/interviews/edit/${row.id}`),
      disabled: () => false,
    },
    {
      icon: 'delete',
      label: 'Delete',
      onClick: handleDelete,
      disabled: () => false,
    },
  ];

  return (
    <AdminLayout title="Interviews">
      <Box>
        {/* Action Bar */}
        <Box sx={{ marginBottom: 3 }}>
          {/* Row 1: Search and Add Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
              marginBottom: 2,
            }}
          >
            <TextField
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 auto' },
                minWidth: { xs: '100%', sm: 200 },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 0,
                  '& fieldset': {
                    borderColor: 'black',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'black' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/admin/interviews/new')}
              disabled={false}
              sx={{
                flex: { xs: '1 1 100%', sm: '0 0 auto' },
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
                },
              }}
            >
              Add Interview
            </Button>
          </Box>

          {/* Row 2: Filters */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ flex: { xs: 1, sm: 0 }, minWidth: { xs: '100%', sm: 150 } }}>
              <InputLabel sx={{ color: 'black' }}>Season</InputLabel>
              <Select
                value={seasonFilter}
                label="Season"
                onChange={(e) => setSeasonFilter(e.target.value)}
                sx={{
                  backgroundColor: 'primary.light',
                  borderRadius: 0,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                    borderWidth: 2,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                }}
              >
                <MenuItem value="all">All Seasons</MenuItem>
                {seasons.map((season) => (
                  <MenuItem key={season} value={season.toString()}>
                    Season {season}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Data Table */}
        <DataTable
          columns={columns}
          rows={filteredInterviews}
          actions={actions}
          loading={loading}
          emptyMessage="No interviews found"
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteDialogOpen}
          title="Delete Interview"
          message={`Are you sure you want to delete the interview with ${interviewToDelete?.name}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => {
            setDeleteDialogOpen(false);
            setInterviewToDelete(null);
          }}
          confirmColor="error"
        />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{
              backgroundColor: 'primary.light',
              border: '2px solid black',
              borderRadius: 0,
              color: 'black',
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default InterviewListPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
  Chip,
  Typography
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable, { Column, Action } from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { getAllEvents, deleteEvent } from '../../services/eventService';
import { Event } from '../../config/supabase';

const EventListPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
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
    loadEvents();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = events.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchTerm, events]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to load events',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (event: Event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      await deleteEvent(eventToDelete.id);
      setSnackbar({
        open: true,
        message: 'Event deleted successfully',
        severity: 'success',
      });
      loadEvents();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete event',
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  const columns: Column[] = [
    {
      id: 'name',
      label: 'Event Name',
      minWidth: 200,
    },
    {
      id: 'location',
      label: 'Location',
      minWidth: 150,
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 120,
      format: (value: string) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {formatDate(value)}
          {isUpcoming(value) && (
            <Chip
              label="Upcoming"
              size="small"
              sx={{
                backgroundColor: '#4caf50',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            />
          )}
        </Box>
      ),
    },
    {
      id: 'time',
      label: 'Time',
      minWidth: 100,
    },
    {
      id: 'attending_members',
      label: 'Attendees',
      minWidth: 100,
      format: (value: string[]) => `${value?.length || 0} members`,
    },
    {
      id: 'video_url',
      label: 'Video',
      minWidth: 80,
      format: (value: string) => (
        value ? (
          <Chip
            label="Has Video"
            size="small"
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          />
        ) : (
          <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)' }}>
            -
          </Typography>
        )
      ),
    },
  ];

  const actions: Action[] = [
    {
      icon: 'edit',
      label: 'Edit',
      onClick: (row: Event) => navigate(`/admin/events/edit/${row.id}`),
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
    <AdminLayout title="Events">
      <Box>
        {/* Action Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 3,
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flex: { xs: '1 1 100%', sm: '1 1 auto' },
              minWidth: { xs: '100%', sm: 250 },
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
            onClick={() => navigate('/admin/events/new')}
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
            Add Event
          </Button>
        </Box>

        {/* Data Table */}
        <DataTable
          columns={columns}
          rows={filteredEvents}
          actions={actions}
          loading={loading}
          emptyMessage="No events found"
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteDialogOpen}
          title="Delete Event"
          message={`Are you sure you want to delete "${eventToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => {
            setDeleteDialogOpen(false);
            setEventToDelete(null);
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

export default EventListPage;


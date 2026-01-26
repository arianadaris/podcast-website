import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable, { Column, Action } from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { getAllTeamMembers, deleteTeamMember } from '../../services/teamService';
import { TeamMember } from '../../config/supabase';

const TeamListPage: React.FC = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
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
    loadTeamMembers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = teamMembers.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.social_handle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(teamMembers);
    }
  }, [searchTerm, teamMembers]);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const data = await getAllTeamMembers();
      setTeamMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to load team members',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (member: TeamMember) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;

    try {
      await deleteTeamMember(memberToDelete.id);
      setSnackbar({
        open: true,
        message: 'Team member deleted successfully',
        severity: 'success',
      });
      loadTeamMembers();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete team member',
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
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
          alt="Team member"
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
      id: 'name',
      label: 'Name',
      minWidth: 150,
    },
    {
      id: 'role',
      label: 'Role',
      minWidth: 120,
    },
    {
      id: 'social_handle',
      label: 'Social Handle',
      minWidth: 150,
    },
    {
      id: 'fun_facts',
      label: 'Fun Facts',
      minWidth: 100,
      format: (value: string[]) => `${value?.length || 0} facts`,
    },
  ];

  const actions: Action[] = [
    {
      icon: 'edit',
      label: 'Edit',
      onClick: (row: TeamMember) => navigate(`/admin/team/edit/${row.id}`),
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
    <AdminLayout title="Team Members">
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
            placeholder="Search team members..."
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
            onClick={() => navigate('/admin/team/new')}
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
            Add Team Member
          </Button>
        </Box>

        {/* Data Table */}
        <DataTable
          columns={columns}
          rows={filteredMembers}
          actions={actions}
          loading={loading}
          emptyMessage="No team members found"
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteDialogOpen}
          title="Delete Team Member"
          message={`Are you sure you want to delete ${memberToDelete?.name}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => {
            setDeleteDialogOpen(false);
            setMemberToDelete(null);
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

export default TeamListPage;


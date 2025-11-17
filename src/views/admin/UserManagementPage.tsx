import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Alert,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable, { Column } from '../../components/admin/DataTable';
import { supabase } from '../../config/supabase';

interface User {
  id: string;
  email: string;
  created_at: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all users from auth.users
      const { data, error: fetchError } = await supabase.auth.admin.listUsers();

      if (fetchError) {
        setError('Failed to load users. Make sure you have admin access.');
        setLoading(false);
        return;
      }

      const usersData: User[] = data.users.map((user: any) => ({
        id: user.id,
        email: user.email || 'No email',
        created_at: user.created_at,
      }));

      setUsers(usersData);
      setFilteredUsers(usersData);
      setLoading(false);
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const columns: Column[] = [
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'created_at',
      label: 'Created At',
      format: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout title="User Management">
      <Box>
        {error && (
          <Alert
            severity="error"
            sx={{
              marginBottom: 3,
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              border: '2px solid #d32f2f',
              borderRadius: 0,
              color: 'black',
            }}
          >
            {error}
          </Alert>
        )}

        <Alert
          severity="info"
          sx={{
            marginBottom: 3,
            backgroundColor: 'rgba(2, 136, 209, 0.1)',
            border: '2px solid #0288d1',
            borderRadius: 0,
            color: 'black',
          }}
        >
          All authenticated users have full access to the admin portal. This page shows all registered users.
        </Alert>

        <Box sx={{ marginBottom: 3 }}>
          <TextField
            fullWidth
            placeholder="Search users by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'black' }} />
                </InputAdornment>
              ),
            }}
            sx={{
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
          />
        </Box>

        <DataTable
          columns={columns}
          rows={filteredUsers}
          loading={loading}
          emptyMessage="No users found"
        />
      </Box>
    </AdminLayout>
  );
};

export default UserManagementPage;

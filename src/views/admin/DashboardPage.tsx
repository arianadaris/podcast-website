import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';
import {
  People,
  Event,
  Mic,
} from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <Card
      onClick={disabled ? undefined : onClick}
      sx={{
        backgroundColor: 'primary.light',
        border: '2px solid black',
        borderRadius: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.5 : 1,
        '&:hover': {
          transform: disabled ? 'none' : 'translateY(-4px)',
          boxShadow: disabled ? 'none' : '0 8px 25px rgba(0,0,0,0.15)',
        },
        height: '100%',
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'black' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'black', opacity: 0.8 }}>
            {description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Team Members',
      description: 'Manage podcast team members and their profiles',
      icon: <People sx={{ fontSize: 40 }} />,
      path: '/admin/team',
    },
    {
      title: 'Interviews',
      description: 'Manage interview episodes and guest information',
      icon: <Mic sx={{ fontSize: 40 }} />,
      path: '/admin/interviews',
    },
    {
      title: 'Events',
      description: 'Manage upcoming events and live recordings',
      icon: <Event sx={{ fontSize: 40 }} />,
      path: '/admin/events',
    },
  ];

  return (
    <AdminLayout title="Dashboard" showBackButton={false}>
      <Box sx={{ marginTop: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: 'black',
            marginBottom: 3,
            fontWeight: 600,
          }}
        >
          Content Management
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {cards.map((card) => (
            <DashboardCard
              key={card.path}
              title={card.title}
              description={card.description}
              icon={card.icon}
              onClick={() => navigate(card.path)}
              disabled={false}
            />
          ))}
        </Box>

      </Box>
    </AdminLayout>
  );
};

export default DashboardPage;


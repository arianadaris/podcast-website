import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Alert,
  Snackbar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Settings, ExpandMore, Delete, Download } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { getAllNominations, deleteNomination } from '../../services/nominationService';
import { Nomination } from '../../config/supabase';
import { usePageTitle } from '../../hooks/usePageTitle';

const NominationListPage: React.FC = () => {
  usePageTitle('Nominations - Admin');

  const navigate = useNavigate();
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [nominationToDelete, setNominationToDelete] = useState<Nomination | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const categories: Array<{ value: string; label: string }> = [
    { value: 'project_of_the_year', label: 'Project of the Year' },
    { value: 'artist_of_the_year', label: 'Artist of the Year' },
    { value: 'group_of_the_year', label: 'Group of the Year' },
    { value: 'song_of_the_year', label: 'Song of the Year' },
    { value: 'producer_of_the_year', label: 'Producer of the Year' },
    { value: 'music_video_of_the_year', label: 'Music Video of the Year' },
  ];

  useEffect(() => {
    loadNominations();
  }, []);

  const loadNominations = async () => {
    try {
      setLoading(true);
      const data = await getAllNominations();
      setNominations(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to load nominations',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getNominationsByCategory = (categoryValue: string): Nomination[] => {
    return nominations.filter((n) => n.category === categoryValue);
  };

  const getTotalNominations = (): number => {
    return nominations.length;
  };

  const handleAccordionChange = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleExpandAll = () => {
    if (expandedCategories.length === categories.length) {
      setExpandedCategories([]);
    } else {
      setExpandedCategories(categories.map((c) => c.value));
    }
  };

  const handleExport = () => {
    const workbook = XLSX.utils.book_new();

    categories.forEach((category) => {
      const categoryNominations = getNominationsByCategory(category.value);
      const sheetData = categoryNominations.map((n) => ({
        'Artist Name': n.artist_name,
        'Project/Album': n.project_name || '',
        'Song': n.song_name || '',
        'Video URL': n.video_url || '',
        'Submitted': n.created_at ? new Date(n.created_at).toLocaleDateString() : '',
      }));

      const worksheet = XLSX.utils.json_to_sheet(sheetData);
      // Set column widths for better readability
      worksheet['!cols'] = [
        { wch: 25 }, // Artist Name
        { wch: 30 }, // Project/Album
        { wch: 30 }, // Song
        { wch: 50 }, // Video URL
        { wch: 15 }, // Submitted
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, category.label);
    });

    const date = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `2026-award-nominations-${date}.xlsx`);
  };

  const handleDelete = (nomination: Nomination) => {
    setNominationToDelete(nomination);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!nominationToDelete) return;

    try {
      await deleteNomination(nominationToDelete.id);
      setSnackbar({
        open: true,
        message: 'Nomination deleted successfully',
        severity: 'success',
      });
      loadNominations();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete nomination',
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setNominationToDelete(null);
    }
  };

  const renderNominationCard = (nomination: Nomination) => {
    return (
      <Box
        key={nomination.id}
        sx={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(0,0,0,0.2)',
          borderRadius: 0,
          padding: { xs: 1.5, sm: 2 },
          marginBottom: 1,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 1, sm: 2 },
          flexWrap: 'wrap',
        }}
      >
        {/* Artist Name - Always shown */}
        <Typography
          sx={{
            fontWeight: 700,
            color: 'black',
            fontSize: '0.95rem',
            minWidth: { xs: 'auto', sm: 150 },
            flex: { xs: '1 1 100%', sm: '0 0 auto' },
          }}
        >
          {nomination.artist_name}
        </Typography>

        {/* Project Name */}
        {nomination.project_name && (
          <Typography
            sx={{
              color: 'rgba(0,0,0,0.8)',
              fontSize: '0.9rem',
              flex: { xs: '1 1 100%', sm: '1 1 auto' },
            }}
          >
            <Box component="span" sx={{ color: 'rgba(0,0,0,0.5)', marginRight: 0.5 }}>Project:</Box>
            {nomination.project_name}
          </Typography>
        )}

        {/* Song Name */}
        {nomination.song_name && (
          <Typography
            sx={{
              color: 'rgba(0,0,0,0.8)',
              fontSize: '0.9rem',
              flex: { xs: '1 1 100%', sm: '1 1 auto' },
            }}
          >
            <Box component="span" sx={{ color: 'rgba(0,0,0,0.5)', marginRight: 0.5 }}>Song:</Box>
            {nomination.song_name}
          </Typography>
        )}

        {/* Video URL */}
        {nomination.video_url && (
          <a
            href={nomination.video_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'black',
              textDecoration: 'underline',
              fontSize: '0.9rem',
              flex: '0 0 auto',
            }}
          >
            View Video
          </a>
        )}

        {/* Spacer to push date and delete to the right on desktop */}
        <Box sx={{ flex: '1 1 auto', display: { xs: 'none', sm: 'block' } }} />

        {/* Submitted date */}
        <Typography
          sx={{
            color: 'rgba(0,0,0,0.5)',
            fontSize: '0.8rem',
            flex: '0 0 auto',
          }}
        >
          {nomination.created_at ? new Date(nomination.created_at).toLocaleDateString() : '-'}
        </Typography>

        {/* Delete button */}
        <IconButton
          onClick={() => handleDelete(nomination)}
          size="small"
          sx={{
            border: '2px solid black',
            borderRadius: 0,
            color: 'black',
            padding: 0.5,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  if (loading) {
    return (
      <AdminLayout title="Nominations">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Nominations">
      <Box>
        {/* Header with total count and actions */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            marginBottom: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'black' }}>
              Total: {getTotalNominations()} nominations
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleExpandAll}
              sx={{
                borderColor: 'black',
                color: 'black',
                borderRadius: 0,
                border: '2px solid black',
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              {expandedCategories.length === categories.length ? 'Collapse All' : 'Expand All'}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
              disabled={nominations.length === 0}
              sx={{
                borderColor: 'black',
                color: 'black',
                borderRadius: 0,
                border: '2px solid black',
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                },
                '&:disabled': {
                  borderColor: 'rgba(0,0,0,0.3)',
                  color: 'rgba(0,0,0,0.3)',
                },
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Settings />}
              onClick={() => navigate('/admin/nomination-settings')}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: 0,
                border: '2px solid black',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                },
              }}
            >
              Settings
            </Button>
          </Box>
        </Box>

        {/* Category Accordions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {categories.map((category) => {
            const categoryNominations = getNominationsByCategory(category.value);
            const count = categoryNominations.length;
            const isExpanded = expandedCategories.includes(category.value);

            return (
              <Accordion
                key={category.value}
                expanded={isExpanded}
                onChange={() => handleAccordionChange(category.value)}
                sx={{
                  backgroundColor: 'primary.light',
                  border: '2px solid black',
                  borderRadius: '0 !important',
                  boxShadow: 'none',
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: 'black' }} />}
                  sx={{
                    '&.Mui-expanded': {
                      minHeight: 48,
                      borderBottom: '2px solid black',
                    },
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center',
                      gap: 2,
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: 'black', flex: 1 }}>
                    {category.label}
                  </Typography>
                  <Chip
                    label={count}
                    size="small"
                    sx={{
                      backgroundColor: count > 0 ? 'black' : 'rgba(0,0,0,0.2)',
                      color: count > 0 ? 'white' : 'black',
                      fontWeight: 700,
                      borderRadius: 0,
                      minWidth: 40,
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 2 }}>
                  {count === 0 ? (
                    <Typography sx={{ color: 'rgba(0,0,0,0.5)', textAlign: 'center', padding: 2 }}>
                      No nominations in this category yet
                    </Typography>
                  ) : (
                    <Box>
                      {categoryNominations.map((nomination) => renderNominationCard(nomination))}
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteDialogOpen}
          title="Delete Nomination"
          message={`Are you sure you want to delete this nomination for "${nominationToDelete?.artist_name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => {
            setDeleteDialogOpen(false);
            setNominationToDelete(null);
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

export default NominationListPage;

import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any) => string | React.ReactNode;
}

export interface Action {
  icon: 'edit' | 'delete' | 'view';
  label: string;
  onClick: (row: any) => void;
  disabled?: (row: any) => boolean;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  actions?: Action[];
  loading?: boolean;
  emptyMessage?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  actions = [],
  loading = false,
  emptyMessage = 'No data available',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getActionIcon = (icon: string) => {
    switch (icon) {
      case 'edit':
        return <Edit />;
      case 'delete':
        return <Delete />;
      case 'view':
        return <Visibility />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8,
        }}
      >
        <CircularProgress sx={{ color: 'black' }} />
      </Box>
    );
  }

  if (rows.length === 0) {
    return (
      <Box
        sx={{
          backgroundColor: 'primary.light',
          border: '2px solid black',
          borderRadius: 0,
          padding: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" sx={{ color: 'black', opacity: 0.7 }}>
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  // Mobile Card Layout
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {rows.map((row, index) => {
          // Find image and name columns
          const imageColumn = columns.find((col) => col.id === 'image_url');
          const nameColumn = columns.find((col) => col.id === 'name');
          const seasonColumn = columns.find((col) => col.id === 'season');

          return (
            <Card
              key={row.id || index}
              sx={{
                backgroundColor: 'primary.light',
                border: '2px solid black',
                borderRadius: 0,
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ padding: 2, '&:last-child': { paddingBottom: 2 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  {imageColumn && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {imageColumn.format
                        ? imageColumn.format(row[imageColumn.id])
                        : row[imageColumn.id]}
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                      flex: 1,
                    }}
                  >
                    {nameColumn && (
                      <Box
                        sx={{
                          color: 'black',
                          fontWeight: 600,
                        }}
                      >
                        {nameColumn.format
                          ? nameColumn.format(row[nameColumn.id])
                          : row[nameColumn.id]}
                      </Box>
                    )}
                    {seasonColumn && (
                      <Box>
                        {seasonColumn.format
                          ? seasonColumn.format(row[seasonColumn.id])
                          : row[seasonColumn.id]}
                      </Box>
                    )}
                  </Box>
                  {actions.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                      }}
                    >
                      {actions.map((action, actionIndex) => {
                        const isDisabled = action.disabled ? action.disabled(row) : false;
                        return (
                          <IconButton
                            key={actionIndex}
                            onClick={() => action.onClick(row)}
                            disabled={isDisabled}
                            size="small"
                            sx={{
                              border: '2px solid black',
                              borderRadius: 0,
                              color: 'black',
                              '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.1)',
                              },
                              '&:disabled': {
                                borderColor: 'rgba(0,0,0,0.3)',
                                color: 'rgba(0,0,0,0.3)',
                              },
                            }}
                          >
                            {getActionIcon(action.icon)}
                          </IconButton>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    );
  }

  // Desktop Table Layout
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: 'primary.light',
        border: '2px solid black',
        borderRadius: 0,
        boxShadow: 'none',
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderBottom: '2px solid black',
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                style={{ minWidth: column.minWidth }}
                sx={{
                  fontWeight: 700,
                  color: 'black',
                  borderRight: '1px solid rgba(0,0,0,0.1)',
                  '&:last-child': {
                    borderRight: 'none',
                  },
                }}
              >
                {column.label}
              </TableCell>
            ))}
            {actions.length > 0 && (
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  color: 'black',
                  minWidth: 120,
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.id || index}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                },
                borderBottom: '2px solid black',
              }}
            >
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    sx={{
                      color: 'black',
                      borderRight: '1px solid black',
                      '&:last-child': {
                        borderRight: 'none',
                      },
                    }}
                  >
                    {column.format ? column.format(value) : value}
                  </TableCell>
                );
              })}
              {actions.length > 0 && (
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {actions.map((action, actionIndex) => {
                      const isDisabled = action.disabled ? action.disabled(row) : false;
                      return (
                        <Tooltip key={actionIndex} title={action.label}>
                          <span>
                            <IconButton
                              onClick={() => action.onClick(row)}
                              disabled={isDisabled}
                              size="small"
                              sx={{
                                border: '2px solid black',
                                borderRadius: 0,
                                color: 'black',
                                '&:hover': {
                                  backgroundColor: 'rgba(0,0,0,0.1)',
                                },
                                '&:disabled': {
                                  borderColor: 'rgba(0,0,0,0.3)',
                                  color: 'rgba(0,0,0,0.3)',
                                },
                              }}
                            >
                              {getActionIcon(action.icon)}
                            </IconButton>
                          </span>
                        </Tooltip>
                      );
                    })}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;


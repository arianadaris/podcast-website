import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGetEpisodes } from '@/services/rssService';
import EpisodeCard from '@/components/EpisodeCard';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import BackToTopButton from '@/components/BackToTopButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PageContainer, PageHeader, GlowText, GlassContainer } from '@/themes/shared';
import { alpha } from '@mui/material/styles';

const Episodes = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const episodesPerPage = 10;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { data: episodes } = useGetEpisodes();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        setSearchTerm(event.target.value);
    };

    const filteredEpisodes = episodes?.filter((episode) => 
        episode.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedEpisodes = filteredEpisodes?.slice((page - 1) * episodesPerPage, page * episodesPerPage);

    return (
        <PageContainer width="100%" spacing={8} pt={isMobile ? 18 : 24} pb={12}>
            <BackToTopButton />
            <PageHeader spacing={2} alignSelf="center">
                <Typography 
                    variant="h6" 
                    align="center"
                    sx={{ opacity: 0.7 }}
                >
                    Podcast Episodes
                </Typography>
                <GlowText 
                    variant="h1" 
                    align="center"
                    sx={{ 
                        fontSize: isMobile ? '3rem' : '4rem',
                        fontWeight: 'bold'
                    }}
                >
                    808s Episodes
                </GlowText>
            </PageHeader>
            <Stack spacing={2} width={isMobile ? "90%" : "75%"} alignSelf="center">
                <GlassContainer>
                    <TextField
                        label="Search Episodes"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start" sx={{ color: 'white' }}>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha(theme.palette.common.white, 0.2),
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha(theme.palette.common.white, 0.3),
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.primary.main,
                                },
                            }
                        }}
                        InputLabelProps={{
                            sx: {
                                color: alpha(theme.palette.common.white, 0.7),
                            }
                        }}
                    />
                </GlassContainer>
            </Stack>
            <Stack spacing={4} width={isMobile ? "90%" : "75%"} alignSelf="center">
                {paginatedEpisodes?.map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                ))}
            </Stack>
            <Stack alignItems="center">
                <Pagination
                    count={Math.ceil((filteredEpisodes?.length ?? 0) / episodesPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: 'white',
                            '&.Mui-selected': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            },
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            }
                        }
                    }}
                />
            </Stack>
        </PageContainer>
    );
};

export default Episodes;
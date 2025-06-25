import { IEpisode } from '@/interfaces/IEpisode';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Truncate from '@/components/Truncate';
import Stack from '@mui/material/Stack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@/components/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type EpisodeProps = {
    episode: IEpisode;
};

const StyledImage = styled.img`
    border-radius: 10px;
    width: 100%;
    max-width: 200px;
`;

const EpisodeCard = ({ episode }: EpisodeProps) => {
    const { id, imageUrl, title, description, releaseDate, duration, audioUrl } = episode;
    let episodeNumber = id.toString().padStart(2, '0');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = () => {
        window.open(audioUrl, '_blank');
    };

    // Format the description to ensure it ends with proper punctuation
    const formattedDescription = description.replace(
        /([a-zA-Z0-9])([\s\n\r]*(?:<[^>]*>)*[\s\n\r]*)$/,
        (match, lastChar, trailingStuff) => {
            // If the last actual character doesn't end with punctuation, add a period
            return lastChar.match(/[.!?]$/) ? match : `${lastChar}.${trailingStuff}`;
        }
    );

    return (
        <Card>
            <CardContent>
                <Grid container spacing={isMobile ? 4 : 8} sx={{ px: isMobile ? 2 : 8 }}>
                    <Grid item xs={12} sm={isMobile ? 12 : 2} display="flex" alignItems="center" justifyContent="center">
                        <StyledImage src={imageUrl} alt="Episode Cover" />
                    </Grid>
                    <Grid item xs={12} sm={isMobile ? 12 : 9} display="flex" alignItems="flex-start" sx={{ py: 1 }}>
                        <Stack spacing={2} width="100%">
                            <Stack direction={isMobile ? "column" : "row"} spacing={4} alignItems={isMobile ? "center" : "flex-start"}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <CalendarTodayIcon color="secondary" sx={{ fontSize: 28 }} />
                                    <Typography variant="body2" color="text.secondary" noWrap>{releaseDate}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <AccessTimeIcon color="secondary" sx={{ fontSize: 28 }} />
                                    <Typography variant="body2" color="text.secondary" noWrap>{duration}</Typography>
                                </Stack>
                            </Stack>
                            <Truncate variant="h6" color="text.primary" align={isMobile ? "center" : "left"}>{title}</Truncate>
                            <Typography 
                                variant="body1" 
                                color="text.primary" 
                                dangerouslySetInnerHTML={{ __html: formattedDescription }}
                                align={isMobile ? "center" : "left"}
                                sx={{ mb: 2 }}
                            />
                            <Button label="Listen Now" onClick={handleClick} sx={{ alignSelf: isMobile ? "center" : "flex-start" }}>
                                <PlayArrowIcon sx={{ color: 'white' }} />
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EpisodeCard;
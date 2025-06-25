import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Truncate from '@/components/Truncate';
import Link from '../Link';
import { IEpisode } from '@/interfaces/IEpisode';

type EpisodeProps = {
    episode: IEpisode;
};

const StyledStack = styled(Stack)`
    transition: 0.15s ease all;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const StyledImage = styled.img`
    border-radius: 10px;
`;

const EpisodeTile = ({ episode }: EpisodeProps) => {
    const { id, imageUrl, title, releaseDate, audioUrl } = episode;
    let episodeNumber = id.toString().padStart(2, '0');

    return (
        <StyledStack>
            <Grid container spacing={2} alignItems="center" sx={{ px: 2 }}>
                <Grid item xs={2} display="flex" alignItems="center">
                    <StyledImage src={imageUrl} alt="Episode Cover" width="100%" />
                </Grid>
                <Grid item xs={9} display="flex" flexDirection="column" justifyContent="center">
                    <Truncate variant="h6" color="text.primary" limit={2}>{title}</Truncate>
                    <Typography variant="body2" color="text.secondary" noWrap>{releaseDate}</Typography>
                </Grid>
                <Grid item xs={1} display="flex" alignItems="center" justifyContent="center">
                    <PlayArrowIcon />
                </Grid>
            </Grid>
        </StyledStack>
    );
};

export default EpisodeTile;
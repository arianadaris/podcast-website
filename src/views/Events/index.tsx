import React from 'react';
import { format, parseISO } from 'date-fns';
import { PageContainer, PageHeader, GlowText, GlassContainer } from '@/themes/shared';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PrimaryButton from '@/components/PrimaryButton';
import { eventsData, IEvent } from '@/utils/eventsData';
import { teamData, TeamMemberDetails } from '@/utils/teamData';
import styled from 'styled-components';

const EventCard = styled(GlassContainer)`
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    width: 100%;

    &:hover {
        transform: translateY(-4px);
    }
`;

const EventImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const EventTypeChip = styled(Chip)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.1);
`;

const Events = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const getTeamMembers = (memberIds: string[]): TeamMemberDetails[] => {
        return Object.values(teamData).filter(member => memberIds.includes(member.id));
    };

    const handleTicketClick = (url?: string) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    const handleRSVPClick = (url?: string) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    // Sort events by date
    const sortedEvents = [...eventsData].sort((a, b) => 
        parseISO(a.date).getTime() - parseISO(b.date).getTime()
    );

    return (
        <PageContainer 
            pt={isMobile ? 18 : 24} 
            pb={12} 
            spacing={8}
            sx={{ overflowY: 'auto' }}
        >
            <PageHeader spacing={4} alignSelf="center" maxWidth="800px">
                <Typography 
                    variant="h6" 
                    textAlign="center"
                    sx={{ opacity: 0.7 }}
                >
                    Come Meet Us
                </Typography>
                <GlowText 
                    variant="h1" 
                    textAlign="center"
                    sx={{ 
                        fontSize: isMobile ? '3rem' : '4rem',
                        fontWeight: 'bold'
                    }}
                >
                    Upcoming Events
                </GlowText>
                <Typography 
                    variant="body1" 
                    textAlign="center" 
                    color="text.secondary"
                    sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}
                    width={{ xs: '90%' }}
                    alignSelf="center"
                >
                    Join the 808s & Mixtapes team at these upcoming events. 
                    From live podcast recordings to music festivals, we're always 
                    looking to connect with our community and share great music.
                </Typography>
            </PageHeader>

            <Box sx={{ width: '100%', px: isMobile ? 2 : 8 }}>
                <Grid 
                    container 
                    spacing={4} 
                    justifyContent="center"
                    alignItems="stretch"
                >
                    {sortedEvents.map((event) => {
                        const teamMembers = getTeamMembers(event.teamMembers);
                        const formattedDate = format(parseISO(event.date), 'MMMM d, yyyy');
                        
                        return (
                            <Grid 
                                item 
                                xs={12} 
                                sm={10} 
                                md={6} 
                                lg={4} 
                                key={event.id}
                                sx={{ 
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <EventCard>
                                    <Box sx={{ position: 'relative' }}>
                                        <EventImage src={event.imageUrl} alt={event.name} />
                                        <EventTypeChip 
                                            label={event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                                            color="primary"
                                        />
                                    </Box>
                                    <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h5" gutterBottom>
                                            {event.name}
                                        </Typography>
                                        
                                        <Stack spacing={2} sx={{ mb: 2 }}>
                                            <Stack 
                                                direction="row" 
                                                spacing={1} 
                                                alignItems="center"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                <CalendarTodayIcon fontSize="small" />
                                                <Typography variant="body2">
                                                    {formattedDate}
                                                </Typography>
                                            </Stack>
                                            <Stack 
                                                direction="row" 
                                                spacing={1} 
                                                alignItems="center"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                <AccessTimeIcon fontSize="small" />
                                                <Typography variant="body2">
                                                    {event.time}
                                                </Typography>
                                            </Stack>
                                            <Stack 
                                                direction="row" 
                                                spacing={1} 
                                                alignItems="center"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                <LocationOnIcon fontSize="small" />
                                                <Typography variant="body2">
                                                    {event.location.venue}, {event.location.city}
                                                </Typography>
                                            </Stack>
                                        </Stack>

                                        <Typography variant="body1" paragraph>
                                            {event.description}
                                        </Typography>

                                        <Box sx={{ mt: 2, mb: 3 }}>
                                            <Typography variant="subtitle2" gutterBottom>
                                                Team Members Attending:
                                            </Typography>
                                            <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
                                                {teamMembers.map((member) => (
                                                    <Tooltip 
                                                        key={member.id}
                                                        title={member.name}
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Avatar 
                                                            alt={member.name} 
                                                            src={member.avatar}
                                                            sx={{ 
                                                                width: 32, 
                                                                height: 32,
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                    </Tooltip>
                                                ))}
                                            </AvatarGroup>
                                        </Box>

                                        <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
                                            {event.ticketUrl && (
                                                <PrimaryButton
                                                    title="Get Tickets"
                                                    onClick={() => handleTicketClick(event.ticketUrl)}
                                                    fullWidth
                                                />
                                            )}
                                            {event.rsvpUrl && (
                                                <PrimaryButton
                                                    title="RSVP"
                                                    onClick={() => handleRSVPClick(event.rsvpUrl)}
                                                    fullWidth
                                                />
                                            )}
                                        </Stack>
                                    </Box>
                                </EventCard>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Events; 
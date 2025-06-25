import React from 'react';
import styled from 'styled-components';
import TeamCard from '@/components/TeamCard';
import { teamData } from '@/utils/teamData';
import { GlassContainer } from '@/themes/shared';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Container = styled.section`
    padding: 4rem 2rem;
`;

const TeamGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const MeetTheTeam: React.FC = () => {
    const theme = useTheme();

    return (
        <Container>
            <GlassContainer>
                <Typography
                    variant="h2"
                    align="center"
                    sx={{
                        fontSize: '2.5rem',
                        marginBottom: '3rem',
                        color: theme.palette.text.primary
                    }}
                >
                    Meet The Team
                </Typography>
                <TeamGrid>
                    {Object.values(teamData).map((member) => (
                        <TeamCard
                            key={member.id}
                            name={member.name}
                            role={member.role}
                            image={member.avatar}
                            slug={member.slug}
                        />
                    ))}
                </TeamGrid>
            </GlassContainer>
        </Container>
    );
};

export default MeetTheTeam;
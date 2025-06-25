import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { getTeamMemberBySlug } from '../../utils/teamData';
import { GlassContainer, PageContainer } from '../../themes/shared';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const TeamMemberContainer = styled(Box)`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

const Avatar = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

const HeaderInfo = styled.div`
    flex: 1;
`;

const Name = styled.h1`
    font-size: 3rem;
    margin: 0;
    color: ${({ theme }) => theme.palette.text.primary};
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const Role = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.palette.primary.main};
    margin: 0.5rem 0;
`;

const Quote = styled.blockquote`
    font-style: italic;
    font-size: 1.2rem;
    margin: 1rem 0;
    padding-left: 1rem;
    border-left: 4px solid ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.text.secondary};
`;

const Section = styled(GlassContainer)`
    margin-bottom: 2rem;
    padding: 1.5rem;
`;

const SectionTitle = styled.h3`
    color: ${({ theme }) => theme.palette.text.primary};
    margin-top: 0;
    font-size: 1.5rem;
`;

const Bio = styled.p`
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.palette.text.primary};
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
`;

const ListItem = styled.li`
    padding: 0.5rem;
    color: ${({ theme }) => theme.palette.text.primary};
    &:before {
        content: "•";
        color: ${({ theme }) => theme.palette.primary.main};
        font-weight: bold;
        margin-right: 0.5rem;
    }
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
`;

const SocialLink = styled.a`
    color: ${({ theme }) => theme.palette.text.primary};
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
    transition: all 0.3s ease;
    
    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }
`;

const EpisodeCard = styled.div`
    padding: 1rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    margin-bottom: 1rem;
    margin-top: 1rem;
    
    h4 {
        margin: 0;
        color: ${({ theme }) => theme.palette.text.primary};
        padding-bottom: 0.5rem;
    }
    
    p {
        margin: 0.5rem 0;
        color: ${({ theme }) => theme.palette.text.secondary};
    }
    
    a {
        color: ${({ theme }) => theme.palette.primary.secondary};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const TeamMemberDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const member = slug ? getTeamMemberBySlug(slug) : undefined;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (!member) {
        return <Navigate to="/about" replace />;
    }

    return (
        <PageContainer pt={isMobile ? 18 : 24}>
            <TeamMemberContainer>
                <Header>
                    <Avatar src={member.avatar} alt={member.name} theme={theme} />
                    <HeaderInfo>
                        <Name theme={theme}>{member.name}</Name>
                        <Role theme={theme}>{member.role}</Role>
                        <Quote theme={theme}>"{member.quote}"</Quote>
                        <SocialLinks>
                            {member.socialLinks.twitter && (
                                <SocialLink href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" theme={theme}>
                                    Twitter
                                </SocialLink>
                            )}
                            {member.socialLinks.instagram && (
                                <SocialLink href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" theme={theme}>
                                    Instagram
                                </SocialLink>
                            )}
                            {member.socialLinks.linkedin && (
                                <SocialLink href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" theme={theme}>
                                    LinkedIn
                                </SocialLink>
                            )}
                            {member.socialLinks.spotify && (
                                <SocialLink href={member.socialLinks.spotify} target="_blank" rel="noopener noreferrer" theme={theme}>
                                    Spotify
                                </SocialLink>
                            )}
                        </SocialLinks>
                    </HeaderInfo>
                </Header>

                <Section>
                    <SectionTitle theme={theme}>Bio</SectionTitle>
                    <Bio theme={theme}>{member.bio}</Bio>
                </Section>

                <Section>
                    <SectionTitle theme={theme}>Favorite Artists</SectionTitle>
                    <List>
                        {member.favoriteArtists.map((artist, index) => (
                            <ListItem key={index} theme={theme}>{artist}</ListItem>
                        ))}
                    </List>
                </Section>

                <Section>
                    <SectionTitle theme={theme}>Favorite Albums</SectionTitle>
                    <List>
                        {member.favoriteAlbums.map((album, index) => (
                            <ListItem key={index} theme={theme}>{album}</ListItem>
                        ))}
                    </List>
                </Section>
            </TeamMemberContainer>
        </PageContainer>
    );
};

export default TeamMemberDetail; 
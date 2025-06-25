import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface TeamCardProps {
    name: string;
    role: string;
    image: string;
    slug: string;
}

const Card = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
`;

const Avatar = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: 3px solid ${({ theme }) => theme.palette.primary.main};
    object-fit: cover;
`;

const Name = styled.h3`
    margin: 0;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 1.5rem;
`;

const Role = styled.p`
    margin: 0.5rem 0 0;
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1rem;
`;

const TeamCard: React.FC<TeamCardProps> = ({ name, role, image, slug }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleClick = () => {
        navigate(`/about/${slug}`);
    };

    return (
        <Card onClick={handleClick}>
            <Avatar src={image} alt={name} theme={theme} />
            <Name theme={theme}>{name}</Name>
            <Role theme={theme}>{role}</Role>
        </Card>
    );
};

export default TeamCard;
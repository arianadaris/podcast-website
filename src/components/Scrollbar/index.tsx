import Box from '@mui/material/Box';
import styled from 'styled-components';

type CustomScrollbarProps = {
  children: React.ReactNode;
  maxHeight?: number | string;
};

const ScrollContainer = styled(Box)<{ maxHeight: number | string }>`
  max-height: ${(props) => props.maxHeight};
  overflow-y: auto;

  /* Custom scrollbar styles */
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: white rgba(255, 255, 255, 0.1); /* For Firefox */
  

  /* For WebKit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: red;
    border-radius: 10px;
  }
`;

const CustomScrollbar = ({ children, maxHeight = '100%' }: CustomScrollbarProps) => {
  return <ScrollContainer maxHeight={maxHeight}>{children}</ScrollContainer>;
};

export default CustomScrollbar;
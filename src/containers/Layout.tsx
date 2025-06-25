import { memo } from 'react';
import Stack from '@mui/material/Stack';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const RootStack = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
}));

const MainContent = styled(Box)(({ theme }) => ({
    flex: 1,
    width: '100%',
}));

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {
    return (
        <RootStack>
            <Header />
            <MainContent component="main">
                {children}
            </MainContent>
            <Footer />
        </RootStack>
    );
});

Layout.displayName = 'Layout';

export default Layout;
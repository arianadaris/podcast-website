import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import PageTitleUpdater from './PageTitleUpdater';
import TeamMemberDetail from '../views/About/TeamMemberDetail';

const Home = lazy(() => import('@/views/Home'));
const About = lazy(() => import('@/views/About'));
const Episodes = lazy(() => import('@/views/Episodes'));
const Error = lazy(() => import('@/views/Error'));
const Contact = lazy(() => import('@/views/Contact'));
const Interviews = lazy(() => import('@/views/Interviews'));
const Events = lazy(() => import('@/views/Events'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <PageTitleUpdater />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/:slug" element={<TeamMemberDetail />} />
                <Route path="/episodes" element={<Episodes />} />
                <Route path="/media/interviews" element={<Interviews />} />
                <Route path="/media/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
import { useEffect, useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_TITLE = '808s & Coldtakes';

const titleMap: { [key: string]: string } = {
    '/': 'Home',
    '/about': 'About',
    '/episodes': 'Episodes',
    '/artists': 'Artists',
    '/media': 'Media',
    '/contact': 'Contact',
};

function getTitle(pathname: string): string {
    const pageTitle = titleMap[pathname] || '404 Not Found';
    return pageTitle === 'Home' ? BASE_TITLE : `${pageTitle} | ${BASE_TITLE}`;
}

const PageTitleUpdater = memo(() => {
    const location = useLocation();
    
    const title = useMemo(() => getTitle(location.pathname), [location.pathname]);

    useEffect(() => {
        document.title = title;
    }, [title]);
    
    return null;
});

PageTitleUpdater.displayName = 'PageTitleUpdater';

export default PageTitleUpdater;
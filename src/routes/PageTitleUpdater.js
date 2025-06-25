"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var BASE_TITLE = '808s & Coldtakes';
var titleMap = {
    '/': 'Home',
    '/about': 'About',
    '/episodes': 'Episodes',
    '/artists': 'Artists',
    '/media': 'Media',
    '/contact': 'Contact',
};
function getTitle(pathname) {
    var pageTitle = titleMap[pathname] || '404 Not Found';
    return pageTitle === 'Home' ? BASE_TITLE : "".concat(pageTitle, " | ").concat(BASE_TITLE);
}
var PageTitleUpdater = (0, react_1.memo)(function () {
    var location = (0, react_router_dom_1.useLocation)();
    var title = (0, react_1.useMemo)(function () { return getTitle(location.pathname); }, [location.pathname]);
    (0, react_1.useEffect)(function () {
        document.title = title;
    }, [title]);
    return null;
});
PageTitleUpdater.displayName = 'PageTitleUpdater';
exports.default = PageTitleUpdater;

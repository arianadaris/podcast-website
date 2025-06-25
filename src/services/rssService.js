"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetEpisodes = void 0;
var react_query_1 = require("@tanstack/react-query");
var logo_png_1 = __importDefault(require("../assets/logo.png"));
var functions_1 = require("../utils/functions");
var rssFeedURL = 'https://feeds.buzzsprout.com/1737669.rss';
var fetchEpisodes = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, text, parser, xmlDoc, items, itunesNamespace;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!rssFeedURL) {
                    throw new Error('RSS Feed URL is not defined');
                }
                return [4 /*yield*/, fetch(rssFeedURL)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 2:
                text = _a.sent();
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(text, 'application/xml');
                items = Array.from(xmlDoc.querySelectorAll('item'));
                itunesNamespace = 'http://www.itunes.com/dtds/podcast-1.0.dtd';
                return [2 /*return*/, items.map(function (item, idx) {
                        var _a, _b, _c, _d, _e, _f, _g, _h;
                        var id = idx + 1;
                        var title = (_a = item.querySelector('title')) === null || _a === void 0 ? void 0 : _a.textContent;
                        var audioUrl = (_b = item.querySelector('enclosure')) === null || _b === void 0 ? void 0 : _b.getAttribute('url');
                        var imageUrl = (_d = (_c = item.getElementsByTagNameNS(itunesNamespace, 'image')[0]) === null || _c === void 0 ? void 0 : _c.getAttribute('href')) !== null && _d !== void 0 ? _d : logo_png_1.default;
                        var description = (_e = item.querySelector('description')) === null || _e === void 0 ? void 0 : _e.textContent;
                        // Format data
                        var tags = (_f = item.getElementsByTagNameNS(itunesNamespace, 'keywords')[0]) === null || _f === void 0 ? void 0 : _f.textContent;
                        if (tags) {
                            var delimiter = tags.indexOf('hip hop,');
                            tags = tags.slice(delimiter + 8).split(',').join(', ');
                        }
                        var releaseDate = new Date((_h = (_g = item.querySelector('pubDate')) === null || _g === void 0 ? void 0 : _g.textContent) !== null && _h !== void 0 ? _h : '').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        var duration = item.getElementsByTagNameNS(itunesNamespace, 'duration')[0];
                        var durationStr = '0';
                        if (duration) {
                            durationStr = (0, functions_1.formatDuration)(duration.textContent);
                        }
                        return {
                            id: id,
                            title: title !== null && title !== void 0 ? title : '',
                            description: (0, functions_1.truncateDescription)(description !== null && description !== void 0 ? description : ''),
                            releaseDate: releaseDate,
                            audioUrl: audioUrl !== null && audioUrl !== void 0 ? audioUrl : '',
                            imageUrl: imageUrl,
                            tags: tags,
                            duration: durationStr,
                        };
                    })];
        }
    });
}); };
var useGetEpisodes = function () {
    return (0, react_query_1.useQuery)({
        queryKey: ['episodes'],
        queryFn: fetchEpisodes,
    });
};
exports.useGetEpisodes = useGetEpisodes;

"use strict";
// factories.js に切り出しやすい領域
// ==============================
const DataFactories = {
    createInitialGrid: () => Array(24).fill(null),
    createCoverData: () => ({ schoolName: '秋田県立秋田きらり支援学校　高等部', title: 'キャリアノート', subtitle: '', currentGrade: '', coverImageUrl: null, enterYear: '', enterMonth: '', graduateYear: '', graduateMonth: '', themeColor: DEFAULT_COLORS.cover, updatedAt: null }),
    createTargetData: (label = '目標（高１・前期）') => ({ tabLabel: label, title: '夢の実現に向けて～目標設定シート～', term: '前期', name: '', q1: '', q2: '', q3: [{ id: generateId(), text: '' }], q4: '', q5: '', themeColor: DEFAULT_COLORS.target1, fontSizeMode: 'large', fontSizes: {}, updatedAt: null }),
    createTrainingData: (label = '実習（高１・６月）') => ({ tabLabel: label, title: '実習記録', companyName: '', period: '', startDate: '', endDate: '', daysCount: '', activities: '', goals: [{ id: Date.now(), text: '', evaluation: 0 }], comment: '', reflection: '', themeColor: DEFAULT_COLORS.training1, fontSizeMode: 'medium', fontSizes: {}, updatedAt: null }),
    createAwardsData: (label = '受賞歴①') => ({ tabLabel: label, records: [], themeColor: DEFAULT_COLORS.docs1, updatedAt: null }),
    createInitialData: (defaultColor) => ({ basicStats: JSON.parse(JSON.stringify(INITIAL_BASIC_STATS)), abilitiesGrid: DataFactories.createInitialGrid(), avatarUrl: null, themeColor: defaultColor, profile: { name: '', team: '', country: 'Japan', number: '', company: '', role: '', classGoal: '', years: '', stars: '' }, fontSizeMode: 'medium', fontSizes: { stats: 'xlarge', profileName: 'medium', abilities: 'large' }, updatedAt: null }),
    createBlankBasicStats: () => [{ id: 'stat1', name: '', records: [{ month: '4月', value: 0 }, { month: '9月', value: 0 }, { month: '3月', value: 0 }] }, { id: 'stat2', name: '', records: [{ month: '4月', value: 0 }, { month: '9月', value: 0 }, { month: '3月', value: 0 }] }, { id: 'stat3', name: '', records: [{ month: '4月', value: 0 }, { month: '9月', value: 0 }, { month: '3月', value: 0 }] }],
    createBlankCoverData: (prev) => ({ schoolName: '秋田県立秋田きらり支援学校　高等部', title: '', subtitle: '', currentGrade: '', coverImageUrl: null, enterYear: '', enterMonth: '', graduateYear: '', graduateMonth: '', themeColor: prev.themeColor }),
    createBlankTargetData: (prev) => ({ tabLabel: prev.tabLabel, title: '夢の実現に向けて～目標設定シート～', term: '前期', name: '', q1: '', q2: '', q3: [{ id: generateId(), text: '' }], q4: '', q5: '', themeColor: prev.themeColor, fontSizeMode: prev.fontSizeMode || 'large', fontSizes: prev.fontSizes }),
    createBlankTrainingData: (prev) => ({ tabLabel: prev.tabLabel, title: '実習記録', companyName: '', period: '', startDate: '', endDate: '', daysCount: '', activities: '', goals: [{ id: Date.now(), text: '', evaluation: 0 }], comment: '', reflection: '', themeColor: prev.themeColor, fontSizeMode: prev.fontSizeMode, fontSizes: prev.fontSizes }),
    createBlankAwardsData: (prev) => ({ tabLabel: prev.tabLabel, records: [], themeColor: prev.themeColor }),
    createBlankProfileData: (prev) => { var _a; return ({ basicStats: DataFactories.createBlankBasicStats(), abilitiesGrid: Array(24).fill(null), avatarUrl: null, themeColor: prev.themeColor, profile: { name: '', team: '', country: ((_a = prev.profile) === null || _a === void 0 ? void 0 : _a.country) || 'Japan', number: '', company: '', role: '', classGoal: '', years: '', stars: '' }, fontSizeMode: prev.fontSizeMode, fontSizes: prev.fontSizes }); },
};
const { createInitialGrid, createCoverData, createTargetData, createTrainingData, createAwardsData, createInitialData, createBlankBasicStats, createBlankCoverData, createBlankTargetData, createBlankTrainingData, createBlankAwardsData, createBlankProfileData, } = DataFactories;
const FONT_SIZES = { small: 'text-sm sm:text-base', medium: 'text-base sm:text-lg', large: 'text-lg sm:text-xl', xlarge: 'text-xl sm:text-2xl' };
const APP_VERSION = "v3.0.3";

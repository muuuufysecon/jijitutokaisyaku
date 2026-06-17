"use strict";
const App = () => {
    var _a, _b;
    const [isAppAuthenticated, setIsAppAuthenticated] = useState(() => {
        return localStorage.getItem('appAuth') === 'true';
    });
    const [appAuthPassword, setAppAuthPassword] = useState('');
    const [appAuthError, setAppAuthError] = useState('');
    const [allData, setAllData] = useState({
        cover: createCoverData(), target1: createTargetData('目標（高１・前期）'), training1: createTrainingData('実習（高１・６月）'), docs1: createAwardsData('受賞歴①'),
        high1: createInitialData(DEFAULT_COLORS.high1), high2: createInitialData(DEFAULT_COLORS.high2), high3: createInitialData(DEFAULT_COLORS.high3),
        skills: { tabLabel: '成長タイムライン', themeColor: '#c084fc', updatedAt: null, fontSizes: {} }
    });
    const [activeTab, setActiveTab] = useState(() => {
        return sessionStorage.getItem('carrier_note_active_tab') || 'cover';
    });
    const [history, setHistory] = useState([]);
    const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);
    const [isAddSheetMenuOpen, setIsAddSheetMenuOpen] = useState(false);
    const tabMenuRef = useRef(null);
    const colorMenuRef = useRef(null);
    const addSheetMenuRef = useRef(null);
    const restoreMenuRef = useRef(null);
    const backupMenuRef = useRef(null);
    const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isBulkExportModalOpen, setIsBulkExportModalOpen] = useState(false);
    const [bulkExportSelection, setBulkExportSelection] = useState([]);
    const [newTabModal, setNewTabModal] = useState({ isOpen: false, type: '', input1: '', input2: '' });
    const [deleteTabModal, setDeleteTabModal] = useState({ isOpen: false, targetId: null });
    const [filterGrade, setFilterGrade] = useState('all');
    const [textInputModal, setTextInputModal] = useState({ isOpen: false, title: '', value: '', onSave: null, multiline: false });
    const [sliderModal, setSliderModal] = useState({ isOpen: false, statIndex: null, recordIndex: null, value: 0, statName: '', month: '' });
    const [periodModal, setPeriodModal] = useState({ isOpen: false, startY: '', startM: '', startD: '', endY: '', endM: '', endD: '', days: '', calY: new Date().getFullYear(), calM: new Date().getMonth() + 1, activeInput: 'start', lastCalcDates: '', tempDay: null });
    const [isDataManageModalOpen, setIsDataManageModalOpen] = useState(false);
    const [importText, setImportText] = useState('');
    const [isRestoreMenuOpen, setIsRestoreMenuOpen] = useState(false);
    const [isBackupMenuOpen, setIsBackupMenuOpen] = useState(false);
    const [isTextRestoreModalOpen, setIsTextRestoreModalOpen] = useState(false);
    const [isTextBackupModalOpen, setIsTextBackupModalOpen] = useState(false);
    const [openMenuGroups, setOpenMenuGroups] = useState({ profile: true, target: false, training: false, docs: false });
    const [pdfMenuOpen, setPdfMenuOpen] = useState({ profile: true, docs: true, target: true, training: true });
    const [menuDraggedItem, setMenuDraggedItem] = useState(null);
    const [menuDragOverItem, setMenuDragOverItem] = useState(null);
    const [pdfDraggedItem, setPdfDraggedItem] = useState(null);
    const [pdfDragOverItem, setPdfDragOverItem] = useState(null);
    const [pdfFilterGrade, setPdfFilterGrade] = useState('all');
    const captureRef = useRef(null);
    const fileInputRef = useRef(null);
    const coverFileInputRef = useRef(null);
    const startMRef = useRef(null);
    const startDRef = useRef(null);
    const endYRef = useRef(null);
    const endMRef = useRef(null);
    const endDRef = useRef(null);
    const daysRef = useRef(null);
    const jsonInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCellIndex, setSelectedCellIndex] = useState(null);
    const [customAbility, setCustomAbility] = useState({ name: '', type: 'blue' });
    const [isBasicStatModalOpen, setIsBasicStatModalOpen] = useState(false);
    const [selectedBasicStatIndex, setSelectedBasicStatIndex] = useState(null);
    const [customBasicStatName, setCustomBasicStatName] = useState('');
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [syncStatus, setSyncStatus] = useState('データ読込中...');
    const [isExporting, setIsExporting] = useState(false);
    const [lastBackupDate, setLastBackupDate] = useState(null);
    const [showPwaPrompt, setShowPwaPrompt] = useState(false);
    const [backupStep, setBackupStep] = useState(0);
    const [promptCopiedModal, setPromptCopiedModal] = useState({ isOpen: false, text: '' });
    const [aiAuthModal, setAiAuthModal] = useState({ isOpen: false, pendingAction: null, password: '', error: '' });
    useEffect(() => {
        sessionStorage.setItem('carrier_note_active_tab', activeTab);
    }, [activeTab]);
    const currentData = allData[activeTab] || {};
    const basicStats = currentData.basicStats || [];
    const abilitiesGrid = currentData.abilitiesGrid || [];
    const avatarUrl = currentData.avatarUrl || null;
    const profile = currentData.profile || {};
    const checkAiAuth = () => {
        const expiresAt = localStorage.getItem('aiAuthExpiresAt');
        if (expiresAt && Date.now() < parseInt(expiresAt, 10)) {
            return true;
        }
        return false;
    };
    const requireAiAuth = (action) => {
        if (checkAiAuth()) {
            action();
        }
        else {
            setAiAuthModal({ isOpen: true, pendingAction: action, password: '', error: '' });
        }
    };
    const handleAiAuthSubmit = () => {
        if (aiAuthModal.password === 'kirari') {
            const expiresAt = Date.now() + 60 * 60 * 1000;
            localStorage.setItem('aiAuthExpiresAt', expiresAt.toString());
            if (aiAuthModal.pendingAction) {
                aiAuthModal.pendingAction();
            }
            setAiAuthModal({ isOpen: false, pendingAction: null, password: '', error: '' });
        }
        else {
            setAiAuthModal(prev => ({ ...prev, error: 'パスワードが違います' }));
        }
    };
    const handleAppAuthSubmit = (e) => {
        if (e)
            e.preventDefault();
        if (appAuthPassword === 'kirari') {
            setIsAppAuthenticated(true);
            localStorage.setItem('appAuth', 'true');
        }
        else {
            setAppAuthError('パスワードが違います');
        }
    };
    const getFontSize = (field) => {
        var _a;
        if ((_a = currentData.fontSizes) === null || _a === void 0 ? void 0 : _a[field]) {
            let size = currentData.fontSizes[field];
            if (field === 'abilities' && (size === 'small' || size === 'medium'))
                size = 'large';
            return size;
        }
        if (field === 'stats')
            return 'xlarge';
        if (field === 'profileName')
            return 'medium';
        if (field === 'abilities')
            return 'large';
        return currentData.fontSizeMode || 'medium';
    };
    const handleFontSizeChange = (field, value) => updateCurrentData(prev => ({ ...prev, fontSizes: { ...(prev.fontSizes || {}), [field]: value } }));
    const updateCurrentData = (updater, saveHistory = true) => {
        setAllData(prev => {
            if (saveHistory) {
                setHistory(h => { const newHistory = [...h, prev]; if (newHistory.length > 20)
                    newHistory.shift(); return newHistory; });
            }
            const newData = typeof updater === 'function' ? updater(prev[activeTab]) : { ...prev[activeTab], ...updater };
            newData.updatedAt = new Date().toISOString();
            return { ...prev, [activeTab]: newData };
        });
    };
    const handleUndo = () => { setHistory(h => { if (h.length === 0)
        return h; const prevData = h[h.length - 1]; setAllData(prevData); return h.slice(0, -1); }); };
    const safeMergeData = (prev, imported) => {
        var _a, _b, _c;
        const merged = { ...prev };
        for (const key in imported) {
            if (Object.prototype.hasOwnProperty.call(imported, key)) {
                if (key.startsWith('high')) {
                    const defaultData = createInitialData(DEFAULT_COLORS[key] || DEFAULT_COLORS.high1);
                    merged[key] = {
                        ...defaultData,
                        ...imported[key],
                        abilitiesGrid: (((_a = imported[key]) === null || _a === void 0 ? void 0 : _a.abilitiesGrid) || []).concat(Array(24).fill(null)).slice(0, 24),
                        basicStats: ((_b = imported[key]) === null || _b === void 0 ? void 0 : _b.basicStats) || defaultData.basicStats,
                        profile: { ...defaultData.profile, ...(((_c = imported[key]) === null || _c === void 0 ? void 0 : _c.profile) || {}) }
                    };
                }
                else if (key.startsWith('target') || key.startsWith('training') || key.startsWith('docs') || key === 'cover' || key === 'tabOrders' || key === 'skills') {
                    merged[key] = imported[key];
                }
            }
        }
        if (!merged.skills) {
            merged.skills = { tabLabel: '成長タイムライン', themeColor: '#c084fc', updatedAt: null, fontSizes: {} };
        }
        return merged;
    };
    const handleImportJSON = (event) => {
        const file = event.target.files[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (importedData && importedData.cover && importedData.high1) {
                    setAllData(prev => safeMergeData(prev, importedData));
                    setSyncStatus('✅ 読み込み完了');
                    setTimeout(() => setSyncStatus('☁️ 最新'), 3000);
                }
                else {
                    setSyncStatus('❌ 形式エラー');
                }
            }
            catch (error) {
                setSyncStatus('❌ 読み込みエラー');
                console.error(error);
            }
        };
        reader.readAsText(file);
        if (jsonInputRef.current)
            jsonInputRef.current.value = '';
    };
    const handleCopyText = () => {
        const dataStr = JSON.stringify(allData);
        if (copyToClipboard(dataStr)) {
            setSyncStatus('✅ コピー完了');
            setTimeout(() => setSyncStatus('☁️ 最新'), 3000);
        }
        else {
            setSyncStatus('❌ コピー失敗');
        }
    };
    const handleExportJSON = () => {
        const dataStr = JSON.stringify(allData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '');
        a.download = `キャリアノート_データ_${dateStr}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setIsDataManageModalOpen(false);
    };
    const handleTextImport = () => {
        if (!importText.trim())
            return;
        try {
            const importedData = JSON.parse(importText);
            if (importedData && importedData.cover && importedData.high1) {
                setAllData(prev => safeMergeData(prev, importedData));
                setIsTextRestoreModalOpen(false);
                setImportText('');
                setSyncStatus('✅ 読み込み完了');
                setTimeout(() => setSyncStatus('☁️ 最新'), 3000);
            }
            else {
                setSyncStatus('❌ データ形式エラー');
            }
        }
        catch (error) {
            setSyncStatus('❌ 読み込みエラー');
        }
    };
    const handleTextBackup = () => {
        const dataStr = JSON.stringify(allData);
        setImportText(dataStr);
        setIsTextBackupModalOpen(true);
        const isoDate = new Date().toISOString();
        saveToDB('lastBackupDate', isoDate).catch(console.error);
        setLastBackupDate(isoDate);
    };
    const handleDownloadBackup = () => {
        const fileName = 'キャリア・BackUp.json';
        const dataStr = JSON.stringify(allData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        const isoDate = new Date().toISOString();
        saveToDB('lastBackupDate', isoDate).catch(console.error);
        setLastBackupDate(isoDate);
    };
    const getDaysSinceBackup = () => {
        if (!lastBackupDate)
            return '未バックアップ';
        const diffTime = Math.abs(new Date() - new Date(lastBackupDate));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const dateStr = new Date(lastBackupDate).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
        if (diffDays === 0)
            return `${dateStr}（今日）`;
        return `${dateStr}（${diffDays}日前）`;
    };
    const openTextInput = (title, value, onSave, multiline = false) => setTextInputModal({ isOpen: true, title, value: value || '', onSave, multiline });
    const openSliderModal = (statIndex, recordIndex, value, statName, month) => setSliderModal({ isOpen: true, statIndex, recordIndex, value, statName, month });
    const openNewTabModal = (type) => {
        if (type === 'docs') {
            handleCreateNewTab('docs');
            return;
        }
        setNewTabModal({ isOpen: true, type, input1: '', input2: '' });
        setIsTabMenuOpen(false);
    };
    const handleCreateNewTab = (directType = null) => {
        const type = directType || newTabModal.type;
        let newLabel = '';
        let term = '';
        if (type === 'target') {
            const { input1, input2 } = newTabModal;
            if (!input1.trim() || !input2.trim())
                return;
            newLabel = `目標（${input1}・${input2}）`;
            term = input2;
        }
        else if (type === 'training') {
            const { input1, input2 } = newTabModal;
            if (!input1.trim() || !input2.trim())
                return;
            newLabel = `実習（${input1}・${input2}）`;
        }
        else if (type === 'docs') {
            const docsCount = Object.keys(allData).filter(k => k.startsWith('docs')).length;
            const nextNum = docsCount + 1;
            const circleNum = nextNum <= 20 ? String.fromCharCode(0x245F + nextNum) : nextNum;
            newLabel = `受賞歴${circleNum}`;
        }
        const newId = `${type}_${Date.now()}`;
        setHistory(h => [...h, allData].slice(-20));
        let newData = {};
        const baseColor = DEFAULT_COLORS[`${type}1`] || DEFAULT_COLORS.cover;
        const mockPrev = { tabLabel: newLabel, themeColor: baseColor, fontSizeMode: 'medium', fontSizes: {} };
        if (type === 'target') {
            newData = createBlankTargetData(mockPrev);
            newData.title = '夢の実現に向けて～目標設定シート～';
            newData.term = term;
        }
        else if (type === 'training') {
            newData = createBlankTrainingData(mockPrev);
            newData.title = '実習記録';
        }
        else if (type === 'docs') {
            newData = createBlankAwardsData(mockPrev);
        }
        newData.updatedAt = new Date().toISOString();
        setAllData(prev => {
            const newTabOrders = { ...(prev.tabOrders || {}) };
            const currentOrder = newTabOrders[type] || Object.keys(prev).filter(k => k.startsWith(type)).sort();
            newTabOrders[type] = [...currentOrder, newId];
            return { ...prev, [newId]: newData, tabOrders: newTabOrders };
        });
        setActiveTab(newId);
        setNewTabModal({ isOpen: false, type: '', input1: '', input2: '' });
    };
    const executeClearTab = () => {
        setHistory(h => [...h, allData].slice(-20));
        updateCurrentData(prev => {
            if (activeTab === 'cover')
                return createBlankCoverData(prev);
            if (activeTab === 'skills')
                return prev;
            if (activeTab.startsWith('target'))
                return createBlankTargetData(prev);
            if (activeTab.startsWith('training'))
                return createBlankTrainingData(prev);
            if (activeTab.startsWith('docs'))
                return createBlankAwardsData(prev);
            return createBlankProfileData(prev);
        });
        setIsClearModalOpen(false);
    };
    const handleDeleteTab = () => {
        const tabId = deleteTabModal.targetId;
        if (!tabId)
            return;
        setHistory(h => [...h, allData].slice(-20));
        setAllData(prev => {
            const newData = { ...prev };
            delete newData[tabId];
            if (newData.tabOrders) {
                const typeMatch = tabId.match(/^(target|training|docs|high)/);
                if (typeMatch) {
                    let group = typeMatch[1];
                    if (group === 'high')
                        group = 'profile';
                    if (newData.tabOrders[group]) {
                        newData.tabOrders[group] = newData.tabOrders[group].filter(id => id !== tabId);
                    }
                }
            }
            return newData;
        });
        if (activeTab === tabId)
            setActiveTab('cover');
        setDeleteTabModal({ isOpen: false, targetId: null });
    };
    const handleGoalTextChange = (index, newText) => updateCurrentData(prev => { const newGoals = [...(prev.goals || [])]; newGoals[index] = { ...newGoals[index], text: newText }; return { ...prev, goals: newGoals }; });
    const handleGoalEvalChange = (index, newEval) => updateCurrentData(prev => { const newGoals = [...(prev.goals || [])]; newGoals[index] = { ...newGoals[index], evaluation: newEval }; return { ...prev, goals: newGoals }; });
    const handleAddGoal = () => updateCurrentData(prev => ({ ...prev, goals: [...(prev.goals || []), { id: Date.now(), text: '', evaluation: 0 }] }));
    const handleRemoveGoal = (index) => updateCurrentData(prev => { const newGoals = [...(prev.goals || [])]; newGoals.splice(index, 1); return { ...prev, goals: newGoals }; });
    useEffect(() => {
        if (!periodModal.isOpen)
            return;
        const pad = (v) => v ? String(v).padStart(2, '0') : '';
        const sDateStr = (periodModal.startY && periodModal.startM && periodModal.startD)
            ? `${periodModal.startY}-${pad(periodModal.startM)}-${pad(periodModal.startD)}` : '';
        const eDateStr = (periodModal.endY && periodModal.endM && periodModal.endD)
            ? `${periodModal.endY}-${pad(periodModal.endM)}-${pad(periodModal.endD)}` : '';
        if (sDateStr && eDateStr) {
            const s = new Date(sDateStr);
            const e = new Date(eDateStr);
            if (!isNaN(s.getTime()) && !isNaN(e.getTime())) {
                const diffTime = e.getTime() - s.getTime();
                const calculated = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                if (calculated > 0 && periodModal.lastCalcDates !== `${sDateStr}_${eDateStr}`) {
                    setPeriodModal(prev => ({ ...prev, days: String(calculated), lastCalcDates: `${sDateStr}_${eDateStr}` }));
                }
            }
        }
    }, [periodModal.startY, periodModal.startM, periodModal.startD, periodModal.endY, periodModal.endM, periodModal.endD, periodModal.isOpen]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tabMenuRef.current && !tabMenuRef.current.contains(event.target)) {
                setIsTabMenuOpen(false);
                setOpenMenuGroups({ profile: false, target: false, training: false, docs: false });
            }
            if (colorMenuRef.current && !colorMenuRef.current.contains(event.target))
                setIsColorPaletteOpen(false);
            if (addSheetMenuRef.current && !addSheetMenuRef.current.contains(event.target))
                setIsAddSheetMenuOpen(false);
            if (restoreMenuRef.current && !restoreMenuRef.current.contains(event.target))
                setIsRestoreMenuOpen(false);
            if (backupMenuRef.current && !backupMenuRef.current.contains(event.target))
                setIsBackupMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isStandalone = window.navigator.standalone === true;
        if (isIos && !isStandalone) {
            const hasSeenPrompt = localStorage.getItem('hasSeenPwaPrompt');
            if (!hasSeenPrompt) {
                setShowPwaPrompt(true);
                localStorage.setItem('hasSeenPwaPrompt', 'true');
            }
        }
        const loadData = async () => {
            try {
                setSyncStatus('データ読込中...');
                let savedData = null;
                try {
                    savedData = await loadFromDB('mainData');
                }
                catch (dbError) {
                    console.warn('IndexedDB load failed, trying LocalStorage');
                }
                if (!savedData) {
                    savedData = loadFromLocalStorage('mainData');
                }
                if (savedData) {
                    setAllData(prev => safeMergeData(prev, savedData));
                }
                let savedBackupDate = null;
                try {
                    savedBackupDate = await loadFromDB('lastBackupDate');
                }
                catch (e) { }
                if (!savedBackupDate)
                    savedBackupDate = loadFromLocalStorage('lastBackupDate');
                if (savedBackupDate)
                    setLastBackupDate(savedBackupDate);
                setSyncStatus('☁️ 最新');
            }
            catch (error) {
                console.error("読み込みエラー:", error);
                setSyncStatus('読み込みエラー');
            }
            finally {
                setIsLoaded(true);
            }
        };
        loadData();
    }, []);
    const [isModified, setIsModified] = useState(false);
    const initialLoadRef = useRef(true);
    useEffect(() => {
        if (!isLoaded)
            return;
        if (initialLoadRef.current) {
            initialLoadRef.current = false;
            return;
        }
        setIsModified(true);
        setSyncStatus('⚠️ 未保存');
    }, [allData, isLoaded]);
    const handleSave = async () => {
        setSyncStatus('保存中...');
        try {
            await saveToDB('mainData', allData);
            saveToLocalStorage('mainData', allData);
            setSyncStatus('☁️ 保存完了');
            setIsModified(false);
            setTimeout(() => setSyncStatus('☁️ 最新'), 3000);
        }
        catch (e) {
            console.error(e);
            saveToLocalStorage('mainData', allData);
            setSyncStatus('保存完了(代替)');
            setIsModified(false);
            setTimeout(() => setSyncStatus('☁️ 最新'), 3000);
        }
    };
    // ==============================
    // summary-utils.js に切り出しやすい領域
    // ==============================
    const GradeUtils = {
        getCurrentGrade: (label) => {
            if (!label)
                return 3;
            if (label.match(/高1|高１|1年|１年/))
                return 1;
            if (label.match(/高2|高２|2年|２年/))
                return 2;
            if (label.match(/高3|高３|3年|３年/))
                return 3;
            return 3;
        },
        getCoverGrade: (coverData) => {
            if (!coverData || !coverData.currentGrade)
                return 3;
            let val = coverData.currentGrade;
            val = val.replace(/[１-３]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
            val = val.replace(/[^1-3]/g, '');
            const num = parseInt(val, 10);
            if (!isNaN(num) && num >= 1 && num <= 3)
                return num;
            return 3;
        },
    };
    const SummaryUtils = {
        getProfString: (profData, label) => {
            const basicStats = profData.basicStats || [];
            const abilitiesGrid = profData.abilitiesGrid || [];
            const statsStr = basicStats.map(s => { var _a, _b; return `${s.name}: ${((_b = (_a = s.records) === null || _a === void 0 ? void 0 : _a[2]) === null || _b === void 0 ? void 0 : _b.value) || 0}`; }).join(', ');
            const likes = abilitiesGrid.slice(0, 16).filter(a => a).map(a => a.name).join('、 ');
            const dislikes = abilitiesGrid.slice(16, 24).filter(a => a).map(a => a.name).join('、 ');
            return `【${label}】\n・能力: ${statsStr}\n・好きなこと・得意なこと・自慢したいこと: ${likes || '特になし'}\n・苦手なこと・手伝ってほしいこと: ${dislikes || '特になし'}`;
        },
        getFilteredProfHistory: (allData, maxGrade) => {
            const history = [];
            if (maxGrade >= 1)
                history.push(SummaryUtils.getProfString(allData.high1 || {}, '高1時点のプロフィール'));
            if (maxGrade >= 2)
                history.push(SummaryUtils.getProfString(allData.high2 || {}, '高2時点のプロフィール'));
            if (maxGrade >= 3)
                history.push(SummaryUtils.getProfString(allData.high3 || {}, '高3時点のプロフィール'));
            return history.join('\n\n');
        },
        collectFilteredAwardsData: (allData, maxGrade, getCurrentGrade) => {
            let awardsText = "";
            Object.keys(allData).forEach(key => {
                if (key.startsWith('docs') && allData[key].records) {
                    if (getCurrentGrade(allData[key].tabLabel) <= maxGrade) {
                        allData[key].records.forEach(rec => {
                            if (rec.title)
                                awardsText += `\n・【${rec.date}】${rec.title} (${rec.description})`;
                        });
                    }
                }
            });
            return awardsText;
        },
        collectFilteredTargetData: (allData, maxGrade, currentTabKey, getCurrentGrade) => {
            let text = "";
            Object.keys(allData).forEach(key => {
                if (key.startsWith('target') && key !== currentTabKey) {
                    const data = allData[key];
                    if (getCurrentGrade(data.tabLabel) <= maxGrade) {
                        const goals = Array.isArray(data.q3) ? data.q3.map(i => i.text).join('、') : data.q3;
                        const reflection = data.q5 || '';
                        if (goals || reflection)
                            text += `\n[${data.tabLabel}]\n目標: ${goals}\n振り返り: ${reflection}`;
                    }
                }
            });
            return text;
        },
        collectFilteredTrainingData: (allData, maxGrade, getCurrentGrade) => {
            let text = "";
            Object.keys(allData).forEach(key => {
                if (key.startsWith('training')) {
                    const data = allData[key];
                    if (getCurrentGrade(data.tabLabel) <= maxGrade) {
                        const company = data.companyName || '不明';
                        const reflection = data.reflection || '';
                        if (company !== '不明' || reflection)
                            text += `\n[${data.tabLabel}]\n実習先: ${company}\n振り返り: ${reflection}`;
                    }
                }
            });
            return text;
        },
        getFilteredClassGoal: (allData, maxGrade) => {
            var _a, _b, _c, _d, _e, _f;
            if (maxGrade >= 3 && ((_b = (_a = allData.high3) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b.classGoal))
                return allData.high3.profile.classGoal;
            if (maxGrade >= 2 && ((_d = (_c = allData.high2) === null || _c === void 0 ? void 0 : _c.profile) === null || _d === void 0 ? void 0 : _d.classGoal))
                return allData.high2.profile.classGoal;
            if (maxGrade >= 1 && ((_f = (_e = allData.high1) === null || _e === void 0 ? void 0 : _e.profile) === null || _f === void 0 ? void 0 : _f.classGoal))
                return allData.high1.profile.classGoal;
            return 'かいていない';
        },
    };
    const { getCurrentGrade } = GradeUtils;
    const getCoverGrade = () => GradeUtils.getCoverGrade(allData.cover);
    const getFilteredProfHistory = (maxGrade) => SummaryUtils.getFilteredProfHistory(allData, maxGrade);
    const collectFilteredAwardsData = (maxGrade) => SummaryUtils.collectFilteredAwardsData(allData, maxGrade, getCurrentGrade);
    const collectFilteredTargetData = (maxGrade, currentTabKey) => SummaryUtils.collectFilteredTargetData(allData, maxGrade, currentTabKey, getCurrentGrade);
    const collectFilteredTrainingData = (maxGrade) => SummaryUtils.collectFilteredTrainingData(allData, maxGrade, getCurrentGrade);
    const getFilteredClassGoal = (maxGrade) => SummaryUtils.getFilteredClassGoal(allData, maxGrade);
    const handleCopyAdvicePrompt = () => requireAiAuth(() => {
        const targetGrade = currentData.tabLabel || '高校生';
        const maxGrade = getCoverGrade();
        const profHistory = getFilteredProfHistory(maxGrade);
        const awardsText = collectFilteredAwardsData(maxGrade);
        const pastTargets = collectFilteredTargetData(maxGrade, activeTab);
        const pastTrainings = collectFilteredTrainingData(maxGrade);
        const q3Text = Array.isArray(currentData.q3) ? currentData.q3.map(i => `・${i.text}`).join('\n') : currentData.q3;
        const prompt = `あなたは、生徒をサポートする、やさしくて頼りになる先生です。対象の生徒は現在「${targetGrade}」の時期にいます。
以下の生徒の目標設定シートや受賞歴、プロフィールの変遷、過去の目標や実習の記録を参考にして、生徒の考えをほめつつ、具体的なアドバイスを書いてください。
※生徒の氏名や写真は送信されていないため、内容から成長を読み取ってください。
「${targetGrade}」という時期・学年であることをふまえた、論理的で実践的なアドバイスを（「〜ですね」「〜してみましょう」など）、親しみやすい口調で、150文字くらいでまとめてください。
特に、【将来どんな生活をしたいか】と【${currentData.term || '一学期'}の目標】をつなげるために、どのような視点や行動が必要かについてアドバイスしてください。
プロフィールの「好きなこと・得意なこと・自慢したいこと」「苦手なこと・手伝ってほしいこと」は、目標と関連性が高い場合のみ活用し、無理に繋げないでください。学年ごとの成長や変化も考慮してください。
一番最後に、生徒への応援メッセージを入れてください。

【プロフィールの変遷】\n${profHistory}\n【受賞歴】${awardsText || '特になし'}
【過去の目標と振り返り】${pastTargets || '特になし'}
【過去の実習記録】${pastTrainings || '特になし'}
【将来どんな生活をしたいか】\n${currentData.q1 || 'かいていない'}
【${currentData.term || '一学期'}の目標】\n${q3Text || 'かいていない'}
【目標達成に向けてがんばること】\n${currentData.q4 || 'かいていない'}
【${currentData.term || '一学期'}の振り返りと、これからがんばりたいこと】\n${currentData.q5 || 'かいていない'}`;
        if (copyToClipboard(prompt)) {
            setPromptCopiedModal({ isOpen: true, text: prompt });
        }
    });
    const handleCopyActionPlanPrompt = () => requireAiAuth(() => {
        const targetGrade = currentData.tabLabel || '高校生';
        const maxGrade = getCoverGrade();
        const profHistory = getFilteredProfHistory(maxGrade);
        const awardsText = collectFilteredAwardsData(maxGrade);
        const pastTargets = collectFilteredTargetData(maxGrade, activeTab);
        const pastTrainings = collectFilteredTrainingData(maxGrade);
        const classGoal = getFilteredClassGoal(maxGrade);
        const q3Text = Array.isArray(currentData.q3) ? currentData.q3.map(i => `・${i.text}`).join('\n') : currentData.q3;
        const prompt = `あなたは、生徒の目標づくりを一緒に考えるAIアシスタントです。対象の生徒は現在「${targetGrade}」の時期にいます。
以下のこれまでの入力、受賞歴、プロフィールの変遷、過去の目標や実習の記録などを参考にして、「目標達成に向けてがんばること」のアイデアを3つ、箇条書きで提案してください。
※名前や写真は送信されていないため、これまでの成果や現状の能力値から判断してください。
「${targetGrade}」という時期・学年であることをふまえた、論理的で実践的な内容を（「〜はどうでしょうか？」「〜してみるのも効果的です」など）、親しみやすい口調で教えてください。
プロフィールの「好きなこと・得意なこと・自慢したいこと」「苦手なこと・手伝ってほしいこと」は、目標と関連性が高い場合のみアイデアの参考にし、無理に繋げないでください。学年ごとの成長や変化も考慮してください。
そのあと、最後にやる気が出る応援メッセージを書いてください。全部で 150文字くらいでまとめてください。

【学級目標】${classGoal}
【プロフィールの変遷】\n${profHistory}\n【受賞歴】${awardsText || '特になし'}
【過去の目標と振り返り】${pastTargets || '特になし'}
【過去の実習記録】${pastTrainings || '特になし'}
【これまでの入力】\n・将来どんな生活をしたいか:\n${currentData.q1 || 'かいていない'}\n・${currentData.term || '一学期'}の目標:\n${q3Text || 'かいていない'}`;
        if (copyToClipboard(prompt)) {
            setPromptCopiedModal({ isOpen: true, text: prompt });
        }
    });
    const handleCopySkillsAdvicePrompt = () => requireAiAuth(() => {
        var _a, _b, _c;
        const maxInputGrade = getCoverGrade();
        let dreams = "";
        Object.keys(allData).forEach(key => {
            if (key.startsWith('target')) {
                const grade = getCurrentGrade(allData[key].tabLabel);
                if (grade <= maxInputGrade) {
                    const q1 = allData[key].q1;
                    if (q1)
                        dreams += `・${allData[key].tabLabel}: ${q1}\n`;
                }
            }
        });
        let abilitiesText = "";
        const seenAbilityNames = new Set();
        for (let grade = 1; grade <= maxInputGrade; grade++) {
            const grid = ((_b = (_a = allData[`high${grade}`]) === null || _a === void 0 ? void 0 : _a.abilitiesGrid) === null || _b === void 0 ? void 0 : _b.slice(0, 16)) || [];
            const added = [];
            grid.forEach(a => {
                if (a && a.name && !seenAbilityNames.has(a.name)) {
                    seenAbilityNames.add(a.name);
                    added.push(a.name);
                }
            });
            if (added.length > 0) {
                abilitiesText += `高${grade}で追加: ${added.join('、')}\n`;
            }
        }
        const totalAbilities = seenAbilityNames.size;
        let statsText = "";
        for (let grade = 1; grade <= maxInputGrade; grade++) {
            if ((_c = allData[`high${grade}`]) === null || _c === void 0 ? void 0 : _c.basicStats) {
                const gradeStats = [];
                allData[`high${grade}`].basicStats.forEach(stat => {
                    var _a, _b;
                    if (stat.name && stat.name.trim() !== '') {
                        const firstRecord = (_a = stat.records) === null || _a === void 0 ? void 0 : _a.find(r => r.value > 0);
                        const lastRecord = (_b = stat.records) === null || _b === void 0 ? void 0 : _b.slice().reverse().find(r => r.value > 0);
                        const val1 = firstRecord ? firstRecord.value : '-';
                        const val2 = lastRecord ? lastRecord.value : '-';
                        if (val1 !== '-' || val2 !== '-') {
                            gradeStats.push(`${stat.name.replace(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u, '')}[${val1}→${val2}]`);
                        }
                    }
                });
                if (gradeStats.length > 0) {
                    statsText += `・高${grade}: ${gradeStats.join('、 ')}\n`;
                }
            }
        }
        const prompt = `あなたは生徒の成長を見守ってきたAI先生です。現在、生徒は高校${maxInputGrade}年生（または修了）です。
以下の生徒の高校${maxInputGrade}年生までの成長記録と将来の夢をふまえて、夢や願いの実現に向けたポジティブで具体的なアドバイスを150文字程度で生成してください。
※能力値が大きく伸びたことや、好きなこと・得意なこと・自慢したいことが増えた（または変化した）ことに触れて褒めつつ、これからの人生や次の目標に向けたエールを送ってください。
※名前や写真は送信されていないため、内容から判断してください。
      
【将来どんな生活をしたいか（高校${maxInputGrade}年生までの回答）】
${dreams || '特になし'}
      
【獲得した「好きなこと・得意なこと・自慢したいこと」】（合計${totalAbilities}個）
${abilitiesText || '特になし'}
      
【能力値の変化（最初→最後）】
${statsText || '特になし'}
`;
        if (copyToClipboard(prompt)) {
            setPromptCopiedModal({ isOpen: true, text: prompt });
        }
    });
    const handleSavePDF = async () => {
        if (!window.html2canvas || !window.jspdf || !captureRef.current) {
            alert('PDF作成の準備ができていません。');
            return;
        }
        try {
            setSyncStatus('PDF作成中...');
            setIsExporting(true);
            window.scrollTo(0, 0);
            if (document.fonts)
                await document.fonts.ready;
            await new Promise(resolve => setTimeout(resolve, 800));
            const isPortrait = activeTab === 'cover' || activeTab.startsWith('target') || activeTab.startsWith('training') || activeTab.startsWith('docs') || activeTab === 'skills';
            const containerWidth = isPortrait ? 1000 : 1400;
            const canvas = await window.html2canvas(captureRef.current, { scale: 1.5, useCORS: true, backgroundColor: '#e2e8f0', windowWidth: containerWidth });
            const imgData = canvas.toDataURL('image/jpeg', 0.7);
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ orientation: isPortrait ? 'portrait' : 'landscape', unit: 'mm', format: 'a4' });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
            const renderWidth = canvas.width * ratio * 0.95;
            const renderHeight = canvas.height * ratio * 0.95;
            pdf.addImage(imgData, 'JPEG', (pdfWidth - renderWidth) / 2, (pdfHeight - renderHeight) / 2, renderWidth, renderHeight);
            const fileName = activeTab === 'cover' ? '表紙.pdf' : activeTab.startsWith('target') ? `${currentData.tabLabel || '目標'}.pdf` : activeTab.startsWith('training') ? `${currentData.tabLabel || '実習記録'}.pdf` : activeTab.startsWith('docs') ? `${currentData.tabLabel || '受賞歴'}.pdf` : activeTab === 'skills' ? '成長タイムライン.pdf' : `${profile.name || '名前なし'}_profile.pdf`;
            pdf.save(fileName);
            setSyncStatus('☁️ 最新');
        }
        catch (error) {
            console.error("PDF保存エラー:", error);
            setSyncStatus('PDFエラー');
        }
        finally {
            setIsExporting(false);
        }
    };
    const handleBulkPDFExport = async () => {
        if (bulkExportSelection.length === 0)
            return;
        setIsBulkExportModalOpen(false);
        setIsExporting(true);
        setSyncStatus('一括PDF作成中...');
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
            let isFirstPage = true;
            for (const tabId of bulkExportSelection) {
                setActiveTab(tabId);
                await new Promise(resolve => setTimeout(resolve, 1500));
                if (captureRef.current && document.fonts)
                    await document.fonts.ready;
                const isPortrait = tabId === 'cover' || tabId.startsWith('target') || tabId.startsWith('training') || tabId.startsWith('docs') || tabId === 'skills';
                const containerWidth = isPortrait ? 1000 : 1400;
                const canvas = await window.html2canvas(captureRef.current, { scale: 1.5, useCORS: true, backgroundColor: '#e2e8f0', windowWidth: containerWidth });
                const imgData = canvas.toDataURL('image/jpeg', 0.7);
                const orientation = isPortrait ? 'p' : 'l';
                if (!isFirstPage) {
                    pdf.addPage('a4', orientation);
                }
                else {
                    if (!isPortrait) {
                        pdf.internal.pageSize.setWidth(297);
                        pdf.internal.pageSize.setHeight(210);
                    }
                    isFirstPage = false;
                }
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
                const rW = canvas.width * ratio * 0.95;
                const rH = canvas.height * ratio * 0.95;
                pdf.addImage(imgData, 'JPEG', (pdfWidth - rW) / 2, (pdfHeight - rH) / 2, rW, rH);
            }
            pdf.save(`キャリアノート一括出力_${new Date().toLocaleDateString()}.pdf`);
            setSyncStatus('☁️ 最新');
        }
        catch (err) {
            console.error(err);
            setSyncStatus('一括出力エラー');
        }
        finally {
            setIsExporting(false);
        }
    };
    const handlePdfDragStart = (e, id) => {
        setPdfDraggedItem(id);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', id);
    };
    const handlePdfDragOver = (e, id) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (pdfDraggedItem && pdfDraggedItem !== id) {
            setPdfDragOverItem(id);
        }
    };
    const handlePdfDrop = (e, targetId) => {
        e.preventDefault();
        setPdfDragOverItem(null);
        if (!pdfDraggedItem || pdfDraggedItem === targetId) {
            setPdfDraggedItem(null);
            return;
        }
        const draggedIndex = bulkExportSelection.indexOf(pdfDraggedItem);
        const dropIndex = bulkExportSelection.indexOf(targetId);
        if (draggedIndex === -1 || dropIndex === -1) {
            setPdfDraggedItem(null);
            return;
        }
        const newSelection = [...bulkExportSelection];
        const [removed] = newSelection.splice(draggedIndex, 1);
        newSelection.splice(dropIndex, 0, removed);
        setBulkExportSelection(newSelection);
        setPdfDraggedItem(null);
    };
    const handlePdfRemoveDrop = (e) => {
        e.preventDefault();
        if (pdfDraggedItem) {
            setBulkExportSelection(prev => prev.filter(id => id !== pdfDraggedItem));
            setPdfDraggedItem(null);
        }
    };
    const handlePdfDragEnd = () => {
        setPdfDraggedItem(null);
        setPdfDragOverItem(null);
    };
    const handleProfileChange = (field, value) => updateCurrentData(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
    const handleTargetChange = (field, value) => updateCurrentData(prev => ({ ...prev, [field]: value }));
    const handleCoverChange = (field, value) => updateCurrentData(prev => ({ ...prev, [field]: value }));
    const handleThemeColorChange = (newColor) => { updateCurrentData(prev => ({ ...prev, themeColor: newColor })); setIsColorPaletteOpen(false); };
    const handleValueChange = (statIndex, recordIndex, newValue) => {
        const val = parseInt(newValue, 10);
        if (!isNaN(val))
            updateCurrentData(prev => { const newStats = [...prev.basicStats]; const newRecords = [...newStats[statIndex].records]; newRecords[recordIndex] = { ...newRecords[recordIndex], value: val }; newStats[statIndex] = { ...newStats[statIndex], records: newRecords }; return { ...prev, basicStats: newStats }; });
    };
    const handleStatNameChange = (index, newName) => updateCurrentData(prev => { const newStats = [...prev.basicStats]; newStats[index] = { ...newStats[index], name: newName }; return { ...prev, basicStats: newStats }; });
    const handleAvatarClick = () => { if (fileInputRef.current)
        fileInputRef.current.click(); };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { const img = new Image(); img.onload = () => { const dataUrl = compressImageTo100KB(img); updateCurrentData({ avatarUrl: dataUrl }); }; img.src = reader.result; };
            reader.readAsDataURL(file);
        }
        if (fileInputRef.current)
            fileInputRef.current.value = '';
    };
    const handleCoverFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { const img = new Image(); img.onload = () => { const dataUrl = compressImageTo100KB(img); updateCurrentData({ coverImageUrl: dataUrl }); }; img.src = reader.result; };
            reader.readAsDataURL(file);
        }
    };
    const handleCellClick = (index) => { setSelectedCellIndex(index); const existingAbility = abilitiesGrid[index]; if (existingAbility) {
        setCustomAbility({ name: existingAbility.name || '', type: existingAbility.type });
    }
    else {
        setCustomAbility({ name: '', type: index >= 16 ? 'red' : 'blue' });
    } setIsModalOpen(true); };
    const selectAbility = (ability) => { updateCurrentData(prev => { const newGrid = [...prev.abilitiesGrid]; newGrid[selectedCellIndex] = ability; return { ...prev, abilitiesGrid: newGrid }; }); setIsModalOpen(false); };
    const handleCustomAbilityChange = (field, value) => { setCustomAbility(prev => ({ ...prev, [field]: value })); };
    const applyCustomAbility = () => { if (!customAbility.name.trim())
        return; selectAbility({ id: `custom_${Date.now()}`, name: customAbility.name, type: customAbility.type }); setCustomAbility({ name: '', type: 'blue' }); };
    const handleDragStart = (e, index) => { if (isExporting || !abilitiesGrid[index]) {
        e.preventDefault();
        return;
    } setDraggedIndex(index); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', index.toString()); };
    const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) {
            setDraggedIndex(null);
            return;
        }
        updateCurrentData(prev => {
            const newGrid = [...prev.abilitiesGrid], sourceItem = newGrid[draggedIndex], targetItem = newGrid[targetIndex];
            newGrid[draggedIndex] = null;
            newGrid[targetIndex] = sourceItem;
            if (targetItem) {
                const isTargetGood = targetIndex < 16, startIndex = isTargetGood ? 0 : 16, endIndex = isTargetGood ? 16 : 24;
                let emptyIndex = -1;
                for (let i = startIndex; i < endIndex; i++) {
                    if (newGrid[i] === null && i !== draggedIndex) {
                        emptyIndex = i;
                        break;
                    }
                }
                if (emptyIndex === -1)
                    emptyIndex = draggedIndex;
                newGrid[emptyIndex] = targetItem;
            }
            return { ...prev, abilitiesGrid: newGrid };
        });
        setDraggedIndex(null);
    };
    const handleDragEnd = () => setDraggedIndex(null);
    const openBasicStatModal = (index) => { setSelectedBasicStatIndex(index); setCustomBasicStatName(''); setIsBasicStatModalOpen(true); };
    const applyBasicStatName = (name) => { if (!name.trim())
        return; handleStatNameChange(selectedBasicStatIndex, name); setIsBasicStatModalOpen(false); };
    const hexToRgb = (hex) => { const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b)); return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '59, 130, 246'; };
    const getProfileFontSize = (baseSize, mode) => {
        var _a;
        const sizes = {
            'base': { small: 'text-sm', medium: 'text-base', large: 'text-lg', xlarge: 'text-xl' },
            '2xl': { small: 'text-xl', medium: 'text-2xl', large: 'text-3xl', xlarge: 'text-4xl' },
            'statTitle': { small: 'text-xs sm:text-sm', medium: 'text-sm sm:text-base', large: 'text-base sm:text-lg', xlarge: 'text-lg sm:text-xl' },
            'statMonth': { small: 'text-xs', medium: 'text-sm', large: 'text-base', xlarge: 'text-lg' },
            'statValue': { small: 'text-base', medium: 'text-lg', large: 'text-xl', xlarge: 'text-2xl' },
            'ability': { small: 'text-xs md:text-sm', medium: 'text-sm md:text-base', large: 'text-base md:text-lg', xlarge: 'text-lg md:text-xl' },
        };
        return ((_a = sizes[baseSize]) === null || _a === void 0 ? void 0 : _a[mode || 'medium']) || sizes[baseSize]['medium'];
    };
    const getAbilityStyle = (type, fontSizeMode) => {
        const fontSizeClass = getProfileFontSize('ability', fontSizeMode);
        const baseStyle = `flex items-center justify-start font-extrabold rounded-lg border-[3px] pt-0 pb-2 px-2.5 w-full h-full shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all leading-tight text-left tracking-wide break-words touch-manipulation select-none border-gray-500 ${fontSizeClass}`;
        switch (type) {
            case 'rainbow': return `${baseStyle} bg-gradient-to-r from-pink-400 via-yellow-400 to-cyan-400 text-gray-900`;
            case 'gold': return `${baseStyle} bg-gradient-to-b from-yellow-200 to-yellow-400 text-gray-900`;
            case 'red':
            case 'red_f':
            case 'red_d': return `${baseStyle} bg-pink-100 text-gray-900`;
            case 'green':
            case 'green_f': return `${baseStyle} bg-emerald-100 text-gray-900`;
            case 'blue':
            case 'blue_b':
            case 'blue_d': return `${baseStyle} bg-cyan-100 text-gray-900`;
            default: return `${baseStyle} bg-white text-gray-900`;
        }
    };
    const getExportAbilityStyle = (type, fontSizeMode) => getAbilityStyle(type, fontSizeMode).split(' ').filter(cls => !cls.startsWith('hover:') && cls !== 'cursor-pointer' && cls !== 'active:scale-95').join(' ');
    const formatDate = (isoString) => { if (!isoString)
        return ''; const date = new Date(isoString); return date.toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); };
    const getOverallLastUpdated = () => {
        let maxDate = 0;
        Object.values(allData).forEach(tab => {
            if (tab && tab.updatedAt) {
                const time = new Date(tab.updatedAt).getTime();
                if (time > maxDate)
                    maxDate = time;
            }
        });
        return maxDate > 0 ? new Date(maxDate).toISOString() : null;
    };
    const formatPeriodDisplay = (start, end, daysCount, oldPeriod) => {
        if (!start && !end && !daysCount)
            return oldPeriod || '';
        const getFormattedDate = (dateStr) => {
            if (!dateStr)
                return '';
            const d = new Date(dateStr);
            if (isNaN(d.getTime()))
                return '';
            const days = ['日', '月', '火', '水', '木', '金', '土'];
            return `${d.getMonth() + 1}月${d.getDate()}日（${days[d.getDay()]}）`;
        };
        const startStr = getFormattedDate(start);
        const endStr = getFormattedDate(end);
        let result = '';
        if (startStr && endStr) {
            result = `${startStr}から${endStr}`;
        }
        else if (startStr) {
            result = `${startStr}から`;
        }
        else if (endStr) {
            result = `${endStr}まで`;
        }
        if (daysCount) {
            if (result)
                result += `　うち${daysCount}日間`;
            else
                result = `うち${daysCount}日間`;
        }
        return result || oldPeriod || '';
    };
    const openPeriodModal = () => {
        const sDate = currentData.startDate ? new Date(currentData.startDate) : null;
        const eDate = currentData.endDate ? new Date(currentData.endDate) : null;
        const isValidS = sDate && !isNaN(sDate);
        const isValidE = eDate && !isNaN(eDate);
        const pad = (v) => v ? String(v).padStart(2, '0') : '';
        const sDateStr = isValidS ? `${sDate.getFullYear()}-${pad(sDate.getMonth() + 1)}-${pad(sDate.getDate())}` : '';
        const eDateStr = isValidE ? `${eDate.getFullYear()}-${pad(eDate.getMonth() + 1)}-${pad(eDate.getDate())}` : '';
        setPeriodModal({
            isOpen: true,
            startY: isValidS ? String(sDate.getFullYear()) : '',
            startM: isValidS ? String(sDate.getMonth() + 1) : '',
            startD: isValidS ? String(sDate.getDate()) : '',
            endY: isValidE ? String(eDate.getFullYear()) : '',
            endM: isValidE ? String(eDate.getMonth() + 1) : '',
            endD: isValidE ? String(eDate.getDate()) : '',
            days: currentData.daysCount || '',
            calY: isValidS ? sDate.getFullYear() : new Date().getFullYear(),
            calM: isValidS ? sDate.getMonth() + 1 : new Date().getMonth() + 1,
            activeInput: 'start',
            lastCalcDates: `${sDateStr}_${eDateStr}`,
            tempDay: null
        });
    };
    const handleYMDChange = (e, field, nextRef, maxLength) => {
        let val = e.target.value.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
        val = val.replace(/[^0-9]/g, '');
        if (val.length > maxLength)
            val = val.slice(0, maxLength);
        setPeriodModal(prev => ({ ...prev, [field]: val }));
        if (e.nativeEvent.inputType !== 'deleteContentBackward' && val.length === maxLength && (nextRef === null || nextRef === void 0 ? void 0 : nextRef.current)) {
            nextRef.current.focus();
        }
    };
    const handleYMDKeyDown = (e, nextRef) => {
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            e.preventDefault();
            if (nextRef === null || nextRef === void 0 ? void 0 : nextRef.current) {
                nextRef.current.focus();
            }
            else {
                e.target.blur();
            }
        }
    };
    const changeCalMonth = (diff) => {
        setPeriodModal(prev => {
            let newM = prev.calM + diff;
            let newY = prev.calY;
            if (newM > 12) {
                newM = 1;
                newY++;
            }
            else if (newM < 1) {
                newM = 12;
                newY--;
            }
            return { ...prev, calY: newY, calM: newM, tempDay: null };
        });
    };
    const handleCalDayClick = (d) => {
        setPeriodModal(prev => ({ ...prev, tempDay: d }));
    };
    const confirmCalDay = () => {
        setPeriodModal(prev => {
            const isStart = prev.activeInput === 'start';
            return {
                ...prev,
                tempDay: null,
                ...(isStart ? {
                    startY: String(prev.calY),
                    startM: String(prev.calM),
                    startD: String(prev.tempDay),
                    activeInput: 'end'
                } : {
                    endY: String(prev.calY),
                    endM: String(prev.calM),
                    endD: String(prev.tempDay),
                    activeInput: 'start'
                })
            };
        });
    };
    const cancelCalDay = () => {
        setPeriodModal(prev => ({ ...prev, tempDay: null }));
    };
    const savePeriodModal = () => {
        const pad = (v) => v ? String(v).padStart(2, '0') : '';
        const sDateStr = (periodModal.startY && periodModal.startM && periodModal.startD)
            ? `${periodModal.startY}-${pad(periodModal.startM)}-${pad(periodModal.startD)}` : '';
        const eDateStr = (periodModal.endY && periodModal.endM && periodModal.endD)
            ? `${periodModal.endY}-${pad(periodModal.endM)}-${pad(periodModal.endD)}` : '';
        updateCurrentData(prev => ({
            ...prev,
            startDate: sDateStr,
            endDate: eDateStr,
            daysCount: periodModal.days,
            period: ''
        }));
        setPeriodModal(p => ({ ...p, isOpen: false }));
    };
    const getDaysArray = (year, month) => {
        const firstDay = new Date(year, month - 1, 1).getDay();
        const daysInMonth = new Date(year, month, 0).getDate();
        const arr = [];
        for (let i = 0; i < firstDay; i++)
            arr.push(null);
        for (let i = 1; i <= daysInMonth; i++)
            arr.push(i);
        return arr;
    };
    const currentThemeColor = currentData.themeColor || DEFAULT_COLORS[activeTab] || DEFAULT_COLORS.high1;
    const currentThemeRgb = hexToRgb(currentThemeColor);
    const currentThemeStyle = { mainBg: { backgroundColor: `rgba(${currentThemeRgb}, 0.1)`, borderColor: currentThemeColor }, innerBorder: { borderColor: `rgba(${currentThemeRgb}, 0.3)` } };
    const getOrderForMenu = (group, prefix) => {
        if (allData.tabOrders && allData.tabOrders[group]) {
            const existingIds = Object.keys(allData).filter(k => k.startsWith(prefix));
            const order = allData.tabOrders[group].filter(id => existingIds.includes(id));
            const newIds = existingIds.filter(id => !order.includes(id));
            return [...order, ...newIds.sort()];
        }
        return Object.keys(allData).filter(k => k.startsWith(prefix)).sort();
    };
    const targetTabs = getOrderForMenu('target', 'target').map(k => { var _a; return ({ id: k, label: ((_a = allData[k]) === null || _a === void 0 ? void 0 : _a.tabLabel) || '目標' }); });
    const trainingTabs = getOrderForMenu('training', 'training').map(k => { var _a; return ({ id: k, label: ((_a = allData[k]) === null || _a === void 0 ? void 0 : _a.tabLabel) || '実習記録' }); });
    const docsTabs = getOrderForMenu('docs', 'docs').map(k => { var _a; return ({ id: k, label: ((_a = allData[k]) === null || _a === void 0 ? void 0 : _a.tabLabel) || '受賞歴' }); });
    const profileTabs = getOrderForMenu('profile', 'high').length ? getOrderForMenu('profile', 'high').map(k => { var _a; return ({ id: k, label: ((_a = allData[k]) === null || _a === void 0 ? void 0 : _a.tabLabel) || (k === 'high1' ? '高１プロフィール' : k === 'high2' ? '高２プロフィール' : '高３プロフィール') }); }) : [{ id: 'high1', label: '高１プロフィール' }, { id: 'high2', label: '高２プロフィール' }, { id: 'high3', label: '高３プロフィール' }];
    profileTabs.push({ id: 'skills', label: ((_a = allData.skills) === null || _a === void 0 ? void 0 : _a.tabLabel) || '成長タイムライン' });
    const checkGradeMatch = (label, gradeId) => {
        if (gradeId === '1')
            return label.match(/高1|高１|1年|１年/);
        if (gradeId === '2')
            return label.match(/高2|高２|2年|２年/);
        if (gradeId === '3')
            return label.match(/高3|高３|3年|３年/);
        return false;
    };
    const isTabVisible = (tab) => {
        if (filterGrade === 'all' || tab.id === 'cover' || tab.id === `high${filterGrade}` || tab.id === 'skills')
            return true;
        if (tab.id.startsWith('high'))
            return false;
        if (checkGradeMatch(tab.label, filterGrade))
            return true;
        if (!tab.label.match(/高1|高１|1年|１年|高2|高２|2年|２年|高3|高３|3年|３年/))
            return true;
        return false;
    };
    const visibleTargetTabs = targetTabs.filter(isTabVisible);
    const visibleTrainingTabs = trainingTabs.filter(isTabVisible);
    const visibleDocsTabs = docsTabs.filter(isTabVisible);
    const visibleProfileTabs = profileTabs.filter(isTabVisible);
    const getTabSortKey = (tab) => {
        if (tab.id === 'cover')
            return { grade: 0, type: 0 };
        if (tab.id === 'skills')
            return { grade: 4, type: 1.5 };
        let grade = 3;
        if (tab.id === 'high1')
            grade = 1;
        else if (tab.id === 'high2')
            grade = 2;
        else if (tab.id === 'high3')
            grade = 3;
        else
            grade = getCurrentGrade(tab.label);
        let type = 5;
        if (tab.id.startsWith('high'))
            type = 1;
        else if (tab.id.startsWith('docs'))
            type = 2;
        else if (tab.id.startsWith('target'))
            type = 3;
        else if (tab.id.startsWith('training'))
            type = 4;
        return { grade, type };
    };
    const allTabs = [{ id: 'cover', label: '表紙' }, { id: 'skills', label: '成長タイムライン' }, ...profileTabs.filter(t => t.id !== 'skills'), ...docsTabs, ...targetTabs, ...trainingTabs].sort((a, b) => {
        if (a.id === 'cover')
            return -1;
        if (b.id === 'cover')
            return 1;
        const keyA = getTabSortKey(a);
        const keyB = getTabSortKey(b);
        if (keyA.grade !== keyB.grade)
            return keyA.grade - keyB.grade;
        if (keyA.type !== keyB.type)
            return keyA.type - keyB.type;
        return 0;
    });
    const isProfileTab = activeTab.startsWith('high');
    const exportContainerClass = isProfileTab ? 'max-w-[1400px]' : 'max-w-5xl';
    const toggleGroup = (group) => {
        setOpenMenuGroups(prev => ({
            ...prev,
            [group]: !prev[group]
        }));
    };
    const togglePdfGroup = (group) => {
        setPdfMenuOpen(prev => ({ ...prev, [group]: !prev[group] }));
    };
    // ==============================
    // tab-menu-utils.js に切り出しやすい領域
    // ==============================
    const TabMenuUtils = {
        createPdfGroups: ({ profileTabs, docsTabs, targetTabs, trainingTabs }) => [
            { id: 'profile', title: '表紙・プロフィール', tabs: [{ id: 'cover', label: '表紙' }, ...profileTabs] },
            { id: 'docs', title: '受賞歴', tabs: docsTabs },
            { id: 'target', title: '目標シート', tabs: targetTabs },
            { id: 'training', title: '実習記録', tabs: trainingTabs }
        ],
        handleMenuDragStart: (e, group, id, setMenuDraggedItem) => {
            setMenuDraggedItem({ group, id });
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', id);
        },
        handleMenuDragOver: (e, id, menuDraggedItem, setMenuDragOverItem) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (menuDraggedItem && menuDraggedItem.id !== id) {
                setMenuDragOverItem(id);
            }
        },
        updateTabOrder: ({ setAllData, history, setHistory }, group, newOrder) => {
            setAllData(prev => {
                const newHistory = [...history, prev];
                if (newHistory.length > 20)
                    newHistory.shift();
                setHistory(newHistory);
                const newTabOrders = { ...(prev.tabOrders || {}) };
                newTabOrders[group] = newOrder;
                return { ...prev, tabOrders: newTabOrders };
            });
        },
        handleMenuDrop: ({ e, group, targetId, menuDraggedItem, setMenuDragOverItem, setMenuDraggedItem, getOrderForMenu, updateTabOrder }) => {
            e.preventDefault();
            setMenuDragOverItem(null);
            if (!menuDraggedItem || menuDraggedItem.group !== group || menuDraggedItem.id === targetId) {
                setMenuDraggedItem(null);
                return;
            }
            let prefix = group;
            if (group === 'profile')
                prefix = 'high';
            const currentOrder = getOrderForMenu(group, prefix);
            const draggedIndex = currentOrder.indexOf(menuDraggedItem.id);
            const dropIndex = currentOrder.indexOf(targetId);
            if (draggedIndex === -1 || dropIndex === -1) {
                setMenuDraggedItem(null);
                return;
            }
            const newOrder = [...currentOrder];
            const [removed] = newOrder.splice(draggedIndex, 1);
            newOrder.splice(dropIndex, 0, removed);
            updateTabOrder(group, newOrder);
            setMenuDraggedItem(null);
        },
        handleMenuDragEnd: ({ setMenuDraggedItem, setMenuDragOverItem }) => {
            setMenuDraggedItem(null);
            setMenuDragOverItem(null);
        },
    };
    const pdfGroups = TabMenuUtils.createPdfGroups({ profileTabs, docsTabs, targetTabs, trainingTabs });
    const updateTabOrder = (group, newOrder) => TabMenuUtils.updateTabOrder({ setAllData, history, setHistory }, group, newOrder);
    const handleMenuDragStart = (e, group, id) => TabMenuUtils.handleMenuDragStart(e, group, id, setMenuDraggedItem);
    const handleMenuDragOver = (e, id) => TabMenuUtils.handleMenuDragOver(e, id, menuDraggedItem, setMenuDragOverItem);
    const handleMenuDrop = (e, group, targetId) => TabMenuUtils.handleMenuDrop({ e, group, targetId, menuDraggedItem, setMenuDragOverItem, setMenuDraggedItem, getOrderForMenu, updateTabOrder });
    const handleMenuDragEnd = () => TabMenuUtils.handleMenuDragEnd({ setMenuDraggedItem, setMenuDragOverItem });
    if (!isAppAuthenticated) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "min-h-screen bg-gray-200 flex items-center justify-center p-4 font-pop" },
                React.createElement("div", { className: "bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm border-[6px] border-blue-400 text-center" },
                    React.createElement("h1", { className: "text-3xl font-black text-blue-800 mb-2 tracking-widest" }, "\u30AD\u30E3\u30EA\u30A2\u30CE\u30FC\u30C8"),
                    React.createElement("p", { className: "text-gray-500 font-bold mb-6 text-sm" }, "\u95B2\u89A7\u30FB\u7DE8\u96C6\u306B\u306F\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u5FC5\u8981\u3067\u3059"),
                    React.createElement("form", { onSubmit: handleAppAuthSubmit },
                        React.createElement("input", { type: "password", value: appAuthPassword, onChange: (e) => { setAppAuthPassword(e.target.value); setAppAuthError(''); }, className: `w-full border-2 rounded-xl p-3 outline-none text-xl font-bold text-center tracking-widest text-gray-800 mb-2 ${appAuthError ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}`, placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9", autoFocus: true }),
                        appAuthError && React.createElement("p", { className: "text-red-500 text-sm font-bold mb-4" }, appAuthError),
                        React.createElement("button", { type: "submit", disabled: !appAuthPassword, className: "w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-lg shadow-md disabled:opacity-50 transition-transform active:scale-95 mt-4" }, "\u958B\u304F"))))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { dangerouslySetInnerHTML: { __html: `
            @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&display=swap');
            .font-pop { font-family: 'Zen Maru Gothic', sans-serif; letter-spacing: 0.05em; }
            * { -webkit-tap-highlight-color: transparent; }
            input[type=range].custom-slider { -webkit-appearance: none; width: 100%; height: 12px; border-radius: 6px; outline: none; background-color: #f1f5f9; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); margin: 0; }
            input[type=range].custom-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 28px; height: 28px; border-radius: 50%; background-color: #0ea5e9; cursor: pointer; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); border: none; transition: transform 0.1s; }
            input[type=range].custom-slider::-webkit-slider-thumb:active { transform: scale(0.9); }
            .pdf-export-portrait { width: 1000px !important; max-width: 1000px !important; min-height: 1414px !important; margin: 0 auto; }
            .pdf-export-landscape { width: 1400px !important; max-width: 1400px !important; min-height: 990px !important; margin: 0 auto; }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          ` } }),
        React.createElement("div", { className: "min-h-screen bg-gray-200 p-4 flex flex-col items-center font-pop overflow-x-hidden pt-4 relative" },
            React.createElement("div", { className: `w-full flex items-center justify-between bg-white border-b-2 border-gray-200 p-2 mb-4 rounded-xl shadow-sm z-40 relative max-w-5xl ${isExporting ? 'hidden' : ''}` },
                React.createElement("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 pl-2" },
                    React.createElement("span", { className: "text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full hidden sm:inline-block" },
                        "\u524D\u56DE\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7: ",
                        getDaysSinceBackup()),
                    React.createElement("span", { className: `text-xs font-bold pl-1 ${isModified ? 'text-red-500' : 'text-gray-400'}` }, syncStatus)),
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("button", { type: "button", onClick: handleSave, className: `px-3 sm:px-5 py-2 ${isModified ? 'bg-red-500 hover:bg-red-600 ring-2 ring-red-200 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-black text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all` },
                        "\uD83D\uDCBE ",
                        isModified ? '保存する！' : '保存済'),
                    React.createElement("button", { type: "button", onClick: () => window.location.reload(), className: "px-3 sm:px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1 shadow-sm border border-gray-300 active:scale-95 transition-transform", title: "\u30A2\u30D7\u30EA\u3092\u518D\u8AAD\u307F\u8FBC\u307F" }, "\uD83D\uDD04 \u66F4\u65B0"),
                    React.createElement("div", { className: "relative", ref: restoreMenuRef },
                        React.createElement("button", { onClick: () => setIsRestoreMenuOpen(!isRestoreMenuOpen), className: "px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1 shadow-sm border border-gray-300 active:scale-95 transition-transform" }, "\uD83D\uDCC2 \u5FA9\u5143"),
                        isRestoreMenuOpen && (React.createElement("div", { className: "absolute top-full right-0 sm:left-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 flex flex-col w-48 overflow-hidden" },
                            React.createElement("button", { onClick: () => { jsonInputRef.current.click(); setIsRestoreMenuOpen(false); }, className: "px-4 py-3 text-left font-bold text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors" }, "\u30D5\u30A1\u30A4\u30EB\u3067\u5FA9\u5143"),
                            React.createElement("button", { onClick: () => { setImportText(''); setIsTextRestoreModalOpen(true); setIsRestoreMenuOpen(false); }, className: "px-4 py-3 text-left font-bold text-gray-700 hover:bg-gray-50 transition-colors" }, "\u6587\u5B57\u30B3\u30FC\u30C9\u3067\u5FA9\u5143")))),
                    React.createElement("div", { className: "relative", ref: backupMenuRef },
                        React.createElement("button", { onClick: () => setIsBackupMenuOpen(!isBackupMenuOpen), className: "px-3 sm:px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-black text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition-transform" }, "\uD83D\uDCBE \u30D0\u30C3\u30AF\u30A2\u30C3\u30D7"),
                        isBackupMenuOpen && (React.createElement("div", { className: "absolute top-full right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 flex flex-col w-48 overflow-hidden" },
                            React.createElement("button", { onClick: () => { handleDownloadBackup(); setIsBackupMenuOpen(false); }, className: "px-4 py-3 text-left font-bold text-gray-700 hover:bg-indigo-50 border-b border-gray-100 transition-colors" }, "\u30D5\u30A1\u30A4\u30EB\u3067\u4FDD\u5B58"),
                            React.createElement("button", { onClick: () => { handleTextBackup(); setIsBackupMenuOpen(false); }, className: "px-4 py-3 text-left font-bold text-gray-700 hover:bg-indigo-50 transition-colors" }, "\u6587\u5B57\u30B3\u30FC\u30C9\u3067\u4FDD\u5B58")))),
                    React.createElement("input", { type: "file", accept: ".json", ref: jsonInputRef, onChange: handleImportJSON, className: "hidden" }))),
            React.createElement("div", { className: `w-full transition-all ${exportContainerClass} ${isExporting && !isProfileTab ? 'pdf-export-portrait' : isExporting && isProfileTab ? 'pdf-export-landscape' : ''}` },
                React.createElement("div", { className: `flex flex-col md:flex-row justify-between items-end z-30 relative px-2 mb-2 gap-4 md:gap-0 ${isExporting ? 'hidden' : ''}` },
                    React.createElement("div", { className: "flex flex-wrap items-center gap-2 w-full md:w-auto" },
                        React.createElement("div", { className: "relative w-full md:w-auto", ref: tabMenuRef },
                            React.createElement("button", { type: "button", onClick: () => setIsTabMenuOpen(!isTabMenuOpen), className: "w-full md:w-auto px-6 py-3 bg-white border-[3px] border-blue-400 text-blue-700 font-black text-lg sm:text-xl rounded-xl shadow-md flex items-center justify-between gap-2 touch-manipulation" },
                                React.createElement("span", { className: "flex items-center gap-2" },
                                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 10h16M4 14h16M4 18h16" })),
                                    ((_b = allTabs.find(t => t.id === activeTab)) === null || _b === void 0 ? void 0 : _b.label) || 'ページを選択'),
                                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                                    React.createElement("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }))),
                            isTabMenuOpen && (React.createElement("div", { className: "absolute left-0 mt-2 w-full md:w-80 bg-white border-[3px] border-blue-200 rounded-xl shadow-2xl z-50 overflow-hidden" },
                                React.createElement("div", { className: "max-h-[60vh] overflow-y-auto pb-4" },
                                    React.createElement("div", { className: "px-4 py-2 bg-gray-50 border-b border-gray-200 flex gap-2 justify-center sticky top-0 z-10 shadow-sm" }, ['all', '1', '2', '3'].map(g => (React.createElement("button", { key: g, onClick: () => setFilterGrade(g), className: `px-3 py-1 rounded-full text-xs font-bold transition-colors ${filterGrade === g ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}` }, g === 'all' ? 'すべて' : `高${g}`)))),
                                    filterGrade === 'all' ? (React.createElement("div", { className: "bg-gray-50" }, pdfGroups.map(group => {
                                        const hasAddBtn = group.id !== 'profile';
                                        return (React.createElement("div", { key: group.id, className: "border-b border-gray-200 last:border-b-0" },
                                            React.createElement("div", { onClick: () => toggleGroup(group.id), className: `px-4 py-3 font-bold text-sm flex justify-between items-center cursor-pointer transition-colors ${openMenuGroups[group.id] ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}` },
                                                React.createElement("span", null, group.title),
                                                React.createElement("div", { className: "flex items-center gap-3" },
                                                    hasAddBtn && (React.createElement(React.Fragment, null,
                                                        React.createElement("button", { onClick: (e) => { e.stopPropagation(); openNewTabModal(group.id); }, className: "text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded text-xs hover:bg-blue-100 font-black shadow-sm active:scale-95 transition-transform" }, "\uFF0B\u8FFD\u52A0"))),
                                                    React.createElement("span", { className: `${openMenuGroups[group.id] ? 'text-gray-600' : 'text-gray-400'} text-xs` }, openMenuGroups[group.id] ? '▼' : '▶'))),
                                            openMenuGroups[group.id] && (React.createElement("div", { className: "p-2 flex flex-col gap-2 bg-white" }, group.tabs.length > 0 ? group.tabs.map(tab => {
                                                const isActive = activeTab === tab.id;
                                                return (React.createElement(React.Fragment, null,
                                                    React.createElement("button", { key: tab.id, draggable: true, onDragStart: (e) => handleMenuDragStart(e, group.id, tab.id), onDragOver: (e) => handleMenuDragOver(e, tab.id), onDrop: (e) => handleMenuDrop(e, group.id, tab.id), onDragEnd: handleMenuDragEnd, onClick: () => {
                                                            setActiveTab(tab.id);
                                                            setIsTabMenuOpen(false);
                                                            setOpenMenuGroups({ profile: false, target: false, training: false, docs: false });
                                                        }, className: `w-full text-left px-3 py-3 rounded-lg border-2 transition-all flex items-center justify-between text-sm ${(menuDraggedItem === null || menuDraggedItem === void 0 ? void 0 : menuDraggedItem.id) === tab.id ? 'opacity-50 border-dashed bg-white' : menuDragOverItem === tab.id ? 'border-blue-500 bg-blue-100 scale-[1.02] shadow-md z-10' : isActive ? 'bg-blue-50 border-blue-400 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50 shadow-sm'}` },
                                                        React.createElement("span", { className: `font-bold truncate ${isActive ? 'text-blue-800' : 'text-gray-700'}` }, tab.label),
                                                        React.createElement("span", { className: "text-gray-300 cursor-grab px-1 hover:text-gray-500", title: "\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u4E26\u3079\u66FF\u3048" }, "\u2261"))));
                                            }) : (React.createElement(React.Fragment, null,
                                                React.createElement("div", { className: "w-full text-center px-2 py-3 text-sm text-gray-400 font-bold" }, "\u8868\u793A\u3067\u304D\u308B\u30BF\u30D6\u304C\u3042\u308A\u307E\u305B\u3093")))))));
                                    }))) : (React.createElement("div", { className: "p-2 flex flex-col gap-2 bg-white min-h-full" }, allTabs.filter(tab => {
                                        if (tab.id === 'cover' || tab.id === `high${filterGrade}`)
                                            return true;
                                        if (tab.id.startsWith('high'))
                                            return false;
                                        if (checkGradeMatch(tab.label, filterGrade))
                                            return true;
                                        if (!tab.label.match(/高1|高１|1年|１年|高2|高２|2年|２年|高3|高３|3年|３年/))
                                            return true;
                                        return false;
                                    }).map(tab => {
                                        const isActive = activeTab === tab.id;
                                        return (React.createElement("button", { key: tab.id, onClick: () => {
                                                setActiveTab(tab.id);
                                                setIsTabMenuOpen(false);
                                                setOpenMenuGroups({ profile: false, target: false, training: false, docs: false });
                                            }, className: `w-full text-left px-3 py-3 rounded-lg border-2 transition-all flex items-center justify-between text-sm ${isActive ? 'bg-blue-50 border-blue-400 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50 shadow-sm'}` },
                                            React.createElement("span", { className: `font-bold truncate ${isActive ? 'text-blue-800' : 'text-gray-700'}` }, tab.label)));
                                    })))),
                                React.createElement("div", { className: "bg-green-50 p-3 border-t-2 border-green-100" },
                                    React.createElement("div", { className: "text-xs font-bold text-green-800 mb-2 px-1" }, "\uFF0B \u30B7\u30FC\u30C8\u3092\u8FFD\u52A0"),
                                    React.createElement("div", { className: "grid grid-cols-3 gap-2" },
                                        React.createElement(AddSheetActionButton, { label: "\u76EE\u6A19\u30B7\u30FC\u30C8", onClick: () => { openNewTabModal('target'); setIsTabMenuOpen(false); } }),
                                        React.createElement(AddSheetActionButton, { label: "\u5B9F\u7FD2\u8A18\u9332", onClick: () => { openNewTabModal('training'); setIsTabMenuOpen(false); } }),
                                        React.createElement(AddSheetActionButton, { label: "\u53D7\u8CDE\u6B74", onClick: () => { openNewTabModal('docs'); setIsTabMenuOpen(false); } }))),
                                React.createElement("div", { className: "bg-indigo-50 p-3 border-t-2 border-indigo-100" },
                                    React.createElement("button", { type: "button", onClick: () => {
                                            const visibleTabIds = allTabs.filter(tab => {
                                                if (filterGrade === 'all' || tab.id === 'cover' || tab.id === `high${filterGrade}`)
                                                    return true;
                                                if (tab.id.startsWith('high'))
                                                    return false;
                                                if (checkGradeMatch(tab.label, filterGrade))
                                                    return true;
                                                if (!tab.label.match(/高1|高１|1年|１年|高2|高２|2年|２年|高3|高３|3年|３年/))
                                                    return true;
                                                return false;
                                            }).map(t => t.id);
                                            setBulkExportSelection(visibleTabIds);
                                            setPdfFilterGrade(filterGrade);
                                            setIsBulkExportModalOpen(true);
                                            setIsTabMenuOpen(false);
                                        }, className: "w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transition-transform" },
                                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" })),
                                        "\u9078\u3093\u3067\u4E00\u62ECPDF\u4F5C\u6210"))))),
                        React.createElement("div", { className: "relative w-full md:w-auto hidden", ref: addSheetMenuRef },
                            React.createElement("button", { type: "button", onClick: () => setIsAddSheetMenuOpen(!isAddSheetMenuOpen), className: "w-full md:w-auto px-4 py-3 bg-white border-[3px] border-green-400 text-green-700 font-black text-sm sm:text-base rounded-xl shadow-md flex items-center justify-between gap-1 touch-manipulation hover:bg-green-50 transition-colors" },
                                React.createElement("span", { className: "text-xl leading-none" }, "\uFF0B"),
                                " \u30B7\u30FC\u30C8\u4F5C\u6210"),
                            isAddSheetMenuOpen && (React.createElement("div", { className: "absolute left-0 mt-2 w-48 bg-white border-[3px] border-green-200 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col" },
                                React.createElement(AddSheetActionButton, { label: "\u76EE\u6A19\u30B7\u30FC\u30C8\u3092\u8FFD\u52A0", variant: "menu", onClick: () => { openNewTabModal('target'); setIsAddSheetMenuOpen(false); } }),
                                React.createElement(AddSheetActionButton, { label: "\u5B9F\u7FD2\u8A18\u9332\u3092\u8FFD\u52A0", variant: "menu", onClick: () => { openNewTabModal('training'); setIsAddSheetMenuOpen(false); } }),
                                React.createElement(AddSheetActionButton, { label: "\u53D7\u8CDE\u6B74\u3092\u8FFD\u52A0", variant: "menu", onClick: () => { openNewTabModal('docs'); setIsAddSheetMenuOpen(false); } }))))),
                    React.createElement("div", { className: "flex items-center gap-2 sm:gap-3 z-20 flex-wrap justify-end" },
                        React.createElement("button", { type: "button", onClick: handleUndo, disabled: history.length === 0, className: `px-3 py-2 rounded shadow-sm flex items-center gap-1 text-sm font-bold ${history.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-white border border-gray-300 text-gray-700 active:scale-95'}`, title: "\u623B\u308B" },
                            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" })),
                            "\u623B\u308B"),
                        React.createElement("button", { type: "button", onClick: () => setIsClearModalOpen(true), className: "px-3 py-2 bg-white border border-red-300 text-red-600 rounded shadow-sm active:scale-95 transition-transform flex items-center gap-1 text-sm font-bold" },
                            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" })),
                            "\u30AF\u30EA\u30A2"),
                        React.createElement("div", { className: "relative", ref: colorMenuRef },
                            React.createElement("button", { type: "button", onClick: () => setIsColorPaletteOpen(!isColorPaletteOpen), className: "flex items-center cursor-pointer bg-white/90 px-3 py-2 rounded shadow-sm border border-gray-300" },
                                React.createElement("span", { className: "text-sm font-bold text-gray-700 mr-2" }, "\uD83C\uDFA8\u8272"),
                                React.createElement("div", { className: "w-5 h-5 rounded-full border border-gray-400", style: { backgroundColor: currentThemeColor } })),
                            isColorPaletteOpen && (React.createElement("div", { className: "absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 p-3 grid grid-cols-6 gap-2" }, PALETTE_COLORS.map((color, i) => (React.createElement("div", { key: i, onClick: () => handleThemeColorChange(color), className: "w-8 h-8 rounded cursor-pointer border border-gray-300 hover:scale-110 active:scale-95 transition-transform", style: { backgroundColor: color } })))))),
                        React.createElement("span", { className: "text-xs font-bold text-gray-400" }, APP_VERSION),
                        React.createElement("button", { type: "button", onClick: handleSavePDF, className: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded-md shadow-md active:scale-95 transition-transform flex items-center gap-1 text-sm" },
                            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002 2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" })),
                            "PDF"))),
                React.createElement("div", { ref: captureRef, className: `w-full border-[6px] rounded-xl p-4 sm:p-6 shadow-2xl relative z-10`, style: currentThemeStyle.mainBg },
                    React.createElement("div", { className: "border-[3px] rounded-xl p-4 sm:p-8 bg-slate-50 flex flex-col gap-4 min-h-[70vh] w-full", style: currentThemeStyle.innerBorder },
                        React.createElement(ViewRouter, { activeTab: activeTab, currentData: currentData, isExporting: isExporting, handleCoverChange: handleCoverChange, openTextInput: openTextInput, coverFileInputRef: coverFileInputRef, handleCoverFileChange: handleCoverFileChange, getOverallLastUpdated: getOverallLastUpdated, formatDate: formatDate, filterGrade: filterGrade, setFilterGrade: setFilterGrade, openNewTabModal: openNewTabModal, visibleTargetTabs: visibleTargetTabs, visibleTrainingTabs: visibleTrainingTabs, visibleDocsTabs: visibleDocsTabs, visibleProfileTabs: visibleProfileTabs, setActiveTab: setActiveTab, handleTargetChange: handleTargetChange, getFontSize: getFontSize, handleFontSizeChange: handleFontSizeChange, setDeleteTabModal: setDeleteTabModal, handleCopyAdvicePrompt: handleCopyAdvicePrompt, handleCopyActionPlanPrompt: handleCopyActionPlanPrompt, openPeriodModal: openPeriodModal, formatPeriodDisplay: formatPeriodDisplay, handleGoalTextChange: handleGoalTextChange, handleGoalEvalChange: handleGoalEvalChange, handleAddGoal: handleAddGoal, handleRemoveGoal: handleRemoveGoal, updateCurrentData: updateCurrentData, allData: allData, getAbilityStyle: getAbilityStyle, handleCopySkillsAdvicePrompt: handleCopySkillsAdvicePrompt, profile: profile, avatarUrl: avatarUrl, basicStats: basicStats, abilitiesGrid: abilitiesGrid, handleProfileChange: handleProfileChange, fileInputRef: fileInputRef, handleAvatarClick: handleAvatarClick, handleFileChange: handleFileChange, setIsCountryModalOpen: setIsCountryModalOpen, FLAGS: FLAGS, getProfileFontSize: getProfileFontSize, getMuscleRank: getMuscleRank, openBasicStatModal: openBasicStatModal, openSliderModal: openSliderModal, getExportAbilityStyle: getExportAbilityStyle, handleCellClick: handleCellClick, draggedIndex: draggedIndex, handleDragStart: handleDragStart, handleDragOver: handleDragOver, handleDrop: handleDrop, handleDragEnd: handleDragEnd }))),
                React.createElement(AiPasswordModal, { aiAuthModal: aiAuthModal, setAiAuthModal: setAiAuthModal, handleAiAuthSubmit: handleAiAuthSubmit }),
                React.createElement(AbilitySelectModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), selectedCellIndex: selectedCellIndex, customAbility: customAbility, handleCustomAbilityChange: handleCustomAbilityChange, applyCustomAbility: applyCustomAbility, ABILITY_PRESETS: ABILITY_PRESETS, selectAbility: selectAbility }),
                React.createElement(BasicStatNameModal, { isOpen: isBasicStatModalOpen, onClose: () => setIsBasicStatModalOpen(false), customBasicStatName: customBasicStatName, setCustomBasicStatName: setCustomBasicStatName, applyBasicStatName: applyBasicStatName, BASIC_STAT_PRESETS: BASIC_STAT_PRESETS }),
                React.createElement(CountrySelectModal, { isOpen: isCountryModalOpen, onClose: () => setIsCountryModalOpen(false), FLAGS: FLAGS, onSelectCountry: (key) => { handleProfileChange('country', key); setIsCountryModalOpen(false); } }),
                React.createElement(PromptCopiedNoticeModal, { promptCopiedModal: promptCopiedModal, setPromptCopiedModal: setPromptCopiedModal }),
                React.createElement(TextEntryModal, { textInputModal: textInputModal, setTextInputModal: setTextInputModal }),
                React.createElement(SliderInputModal, { sliderModal: sliderModal, setSliderModal: setSliderModal, getMuscleRank: getMuscleRank, handleValueChange: handleValueChange }),
                React.createElement(PeriodInputModal, { periodModal: periodModal, setPeriodModal: setPeriodModal, cancelCalDay: cancelCalDay, confirmCalDay: confirmCalDay, changeCalMonth: changeCalMonth, getDaysArray: getDaysArray, handleCalDayClick: handleCalDayClick, handleYMDChange: handleYMDChange, handleYMDKeyDown: handleYMDKeyDown, startMRef: startMRef, startDRef: startDRef, endYRef: endYRef, endMRef: endMRef, endDRef: endDRef, daysRef: daysRef, handleTargetChange: handleTargetChange, savePeriodModal: savePeriodModal }),
                React.createElement(NewTabModal, { newTabModal: newTabModal, setNewTabModal: setNewTabModal, handleCreateNewTab: handleCreateNewTab }),
                React.createElement(DeleteTabConfirmModal, { isOpen: deleteTabModal.isOpen, onClose: () => setDeleteTabModal({ isOpen: false, targetId: null }), onConfirm: handleDeleteTab }),
                React.createElement(ClearTabConfirmModal, { isOpen: isClearModalOpen, onClose: () => setIsClearModalOpen(false), onConfirm: executeClearTab }),
                React.createElement(BulkPdfExportModal, { isOpen: isBulkExportModalOpen, onClose: () => setIsBulkExportModalOpen(false), bulkExportSelection: bulkExportSelection, allTabs: allTabs, handlePdfDragStart: handlePdfDragStart, handlePdfDragOver: handlePdfDragOver, handlePdfDrop: handlePdfDrop, handlePdfDragEnd: handlePdfDragEnd, setBulkExportSelection: setBulkExportSelection, handleBulkPDFExport: handleBulkPDFExport, isExporting: isExporting }),
                React.createElement(TextRestoreModal, { isOpen: isTextRestoreModalOpen, onClose: () => setIsTextRestoreModalOpen(false), importText: importText, setImportText: setImportText, handleTextImport: handleTextImport }),
                React.createElement(TextBackupModal, { isOpen: isTextBackupModalOpen, onClose: () => setIsTextBackupModalOpen(false), importText: importText, copyToClipboard: copyToClipboard, setSyncStatus: setSyncStatus, setIsTextBackupModalOpen: setIsTextBackupModalOpen }),
                React.createElement(PwaInstallHint, { isOpen: showPwaPrompt, onClose: () => setShowPwaPrompt(false) })))));
};

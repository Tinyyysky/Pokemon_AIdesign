// import './css/index.css';  // 确保路径正确
// 宝可梦类型数据
const pokemonTypes = [
    { name: '一般', color: 'var(--normal)' },
    { name: '火', color: 'var(--fire)' },
    { name: '水', color: 'var(--water)' },
    { name: '电', color: 'var(--electric)' },
    { name: '草', color: 'var(--grass)' },
    { name: '冰', color: 'var(--ice)' },
    { name: '格斗', color: 'var(--fighting)' },
    { name: '毒', color: 'var(--poison)' },
    { name: '地面', color: 'var(--ground)' },
    { name: '飞行', color: 'var(--flying)' },
    { name: '超能力', color: 'var(--psychic)' },
    { name: '虫', color: 'var(--bug)' },
    { name: '岩石', color: 'var(--rock)' },
    { name: '幽灵', color: 'var(--ghost)' },
    { name: '龙', color: 'var(--dragon)' },
    { name: '恶', color: 'var(--dark)' },
    { name: '钢', color: 'var(--steel)' },
    { name: '妖精', color: 'var(--fairy)' }
];
// 获取默认设计模板
function getDefaultDesign() {
    return {
        id: generateId(),
        name: '未命名宝可梦',
        height: 1.0,
        weight: 10.0,
        types: [],
        description: '暂无描述',
        abilities: [
            { name: '', description: '' },
            { name: '', description: '' },
            { name: '', description: '', isHidden: true }
        ],
        stats: {
            hp: 50,
            attack: 50,
            defense: 50,
            specialAttack: 50,
            specialDefense: 50,
            speed: 50
        },
        signatureMove: {
            name: '',
            type: '',
            category: 'physical',
            power: 0,
            accuracy: 0,
            pp: 0,
            description: ''
        },
        moves: {
            physical: [],
            special: [],
            status: []
        },
        imageUrl: 'meizuo.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}
// 分页相关变量
let currentPage = 1;
const itemsPerPage = 8;
// 当前设计数据
let currentDesign = {
    id: generateId(),
    name: '未命名宝可梦',
    height: 1.0,
    weight: 10.0,
    types: [],
    description: '暂无描述',
    abilities: [
        { name: '', description: '' },
        { name: '', description: '' },
        { name: '', description: '', isHidden: true }
    ],
    stats: {
        hp: 50,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 50
    },
    signatureMove: {
        name: '',
        type: '',
        category: 'physical',
        power: 0,
        accuracy: 0,
        pp: 0,
        description: ''
    },
    moves: {
        physical: [],
        special: [],
        status: []
    },
    imageUrl: 'meizuo.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

// 设计历史
let designHistory = [];

// DOM元素
const uploadToServerBtn = document.getElementById('uploadToServerBtn');
const shareBtn = document.getElementById('shareBtn');
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebar');
const newDesignBtn = document.getElementById('newDesignBtn');
const historyList = document.getElementById('historyList');
const saveDesignBtn = document.getElementById('saveDesignBtn');
const generateArtBtn = document.getElementById('generateArtBtn');
const pokemonCard = document.getElementById('pokemonCard');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonTypesContainer = document.getElementById('pokemonTypes');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokedexDescription = document.getElementById('pokedexDescription');
const abilitiesList = document.getElementById('abilitiesList');
const statsChart = document.getElementById('statsChart');
const signatureMoves = document.getElementById('signatureMoves');
const physicalMoves = document.getElementById('physicalMoves');
const specialMoves = document.getElementById('specialMoves');
const statusMoves = document.getElementById('statusMoves');
const moveTabs = document.querySelectorAll('.move-tab');
const moveLists = document.querySelectorAll('.move-list');
const aiStrength = document.getElementById('aiStrength');
const aiStyle = document.getElementById('aiStyle');
const aiSettingsBtn = document.getElementById('aiSettingsBtn');
const aiConversation = document.getElementById('aiConversation');
const aiInput = document.getElementById('aiInput');
const aiSubmit = document.getElementById('aiSubmit');
const apiSettingsModal = document.getElementById('apiSettingsModal');
const closeApiSettingsModal = document.getElementById('closeApiSettingsModal');
const aiProvider = document.getElementById('aiProvider');
const deepseekSettings = document.getElementById('deepseekSettings');
const customAiSettings = document.getElementById('customAiSettings');
const temperaturevalue = document.getElementById('model-temperature');
const modeltextlength = document.getElementById('modelContextLength');
const deepseekApiKey = document.getElementById('deepseekApiKey');
const deepseekModel = document.getElementById('deepseekModel');
const customApiEndpoint = document.getElementById('customApiEndpoint');
const customApiKey = document.getElementById('customApiKey');
const customModelName = document.getElementById('customModelName');
const artProvider = document.getElementById('artProvider');
const customArtSettings = document.getElementById('customArtSettings');
const customArtEndpoint = document.getElementById('customArtEndpoint');
const customArtKey = document.getElementById('customArtKey');
const saveApiSettings = document.getElementById('saveApiSettings');
const designFormModal = document.getElementById('designFormModal');
const closeDesignFormModal = document.getElementById('closeDesignFormModal');
const designName = document.getElementById('designName');
const designHeight = document.getElementById('designHeight');
const designWeight = document.getElementById('designWeight');
const designTypesContainer = document.getElementById('designTypes');
const designDescription = document.getElementById('designDescription');
const designAbility1 = document.getElementById('designAbility1');
const designAbilityDesc1 = document.getElementById('designAbilityDesc1');
const designAbility2 = document.getElementById('designAbility2');
const designAbilityDesc2 = document.getElementById('designAbilityDesc2');
const designAbilityHidden = document.getElementById('designAbilityHidden');
const designAbilityHiddenDesc = document.getElementById('designAbilityHiddenDesc');
const designStatHp = document.getElementById('designStatHp');
const designStatAtk = document.getElementById('designStatAtk');
const designStatDef = document.getElementById('designStatDef');
const designStatSpAtk = document.getElementById('designStatSpAtk');
const designStatSpDef = document.getElementById('designStatSpDef');
const designStatSpeed = document.getElementById('designStatSpeed');
const designMoveName = document.getElementById('designMoveName');
const designMoveType = document.getElementById('designMoveType');
const designMoveCategory = document.getElementById('designMoveCategory');
const designMovePower = document.getElementById('designMovePower');
const designMoveAccuracy = document.getElementById('designMoveAccuracy');
const designMovePp = document.getElementById('designMovePp');
const designMoveDescription = document.getElementById('designMoveDescription');
const saveDesignForm = document.getElementById('saveDesignForm');

// API设置
let apiSettings = {
    aiProvider: 'deepseek',
    deepseekApiKey: '',
    deepseekModel: 'deepseek-chat',
    customApiEndpoint: '',
    customApiKey: '',
    customModelName: '',
    artProvider: 'none',
    customArtEndpoint: '',
    customArtKey: '',
    temperature: 1,
    modeltextlength: 1
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 从本地存储加载数据
    loadData();
    
    // 渲染当前设计
    renderDesign(currentDesign);
    
    // 初始化类型选择
    initTypeSelection();
    
    // 初始化移动标签页
    initMoveTabs();
    
    // 加载API设置
    loadApiSettings();
    
    // 绑定事件
    bindEvents();

    // 添加视图模式切换事件
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-mode-btn').forEach(b => b.classList.remove('active'));
            showMessage('切换模式', 'success');
            btn.classList.add('active');
            const mode = btn.dataset.mode;
            if(mode=="local"){
                currentDesign=getDefaultDesign();
                renderDesign(currentDesign);
                showMessage('当前为本地设计', 'success');
            }
            filterDesignsByMode(mode);
        });
    });

    // 默认显示本地设计
    document.querySelector('.view-mode-btn[data-mode="local"]').classList.add('active');
    filterDesignsByMode('local');
    // document.querySelector('.view-mode-btn[data-mode="server"]').classList.add('active');
    // filterDesignsByMode('server');
    // 搜索功能
    const searchInput = document.querySelector('.design-search input');
    const searchBtn = document.querySelector('.design-search button');
    
    searchBtn.addEventListener('click', () => {
        filterDesignsBySearch(searchInput.value.trim());
    });
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterDesignsBySearch(searchInput.value.trim());
        }
    });

    // ID复制功能
    document.addEventListener('click', (e) => {
        if (e.target.closest('.copy-id-btn')) {
            const id = e.target.closest('.history-item').dataset.id;
            navigator.clipboard.writeText(id).then(() => {
                showMessage('ID已复制到剪贴板', 'success');
            });
        }
    });
});

// 按视图模式过滤设计
function filterDesignsByMode(mode) {
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        const designId = item.dataset.id;
        const design = designHistory.find(d => d.id === designId);
        const isLocal = design?.source === 'local';
        
        if (mode === 'all' || 
            (mode === 'local' && isLocal) || 
            (mode === 'server' && !isLocal)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    currentPage=1;
    // 重新加载数据以确保显示正确的设计
    loadData();
}

// 按搜索词过滤设计
function filterDesignsBySearch(searchTerm) {
    historyList.innerHTML = '';
    
    designHistory.forEach(design => {
        const historyItem = document.createElement('li');
        historyItem.className = 'history-item';
        historyItem.dataset.id = design.id;
        historyItem.dataset.source = design.source || 'local'; // 使用设计中的source字段
        if (design.id === currentDesign.id) {
            historyItem.classList.add('active');
        }
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'history-item-name';
        nameSpan.textContent = design.name || '未命名宝可梦';
        
        // 添加ID显示
        const idSpan = document.createElement('span');
        idSpan.className = 'history-item-id';
        idSpan.textContent = `ID: ${design.id.substring(0, 3)}...`;
        idSpan.title = design.id;
        
        // 添加复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-id-btn';
        copyBtn.dataset.id = design.id;
        copyBtn.innerHTML = '<i class="far fa-copy"></i>';
        copyBtn.title = '复制ID';
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'history-item-date';
        dateSpan.textContent = new Date(design.createdAt).toLocaleDateString();
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'history-item-delete';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.title = '删除设计';
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (design.source === 'server') {
                showMessage('无法删除服务器设计', 'warning');
                return;
            }
            if (confirm(`确定要删除设计 "${design.name}" 吗?`)) {
                designHistory = designHistory.filter(d => d.id !== design.id);
                saveData();
                renderHistoryList();
                showMessage('设计已删除', 'success');
                
                // 如果删除的是当前设计，重置为默认设计
                if (design.id === currentDesign.id) {
                    currentDesign = getDefaultDesign()
                    renderDesign(currentDesign);
                }
            }
        });

        nameSpan.appendChild(idSpan);
        nameSpan.appendChild(copyBtn);
        historyItem.appendChild(nameSpan);
        historyItem.appendChild(dateSpan);
        historyItem.appendChild(deleteBtn);
        
        historyItem.addEventListener('click', () => {
            currentDesign = {...design};
            renderDesign(currentDesign);
            
            // 更新活动状态
            document.querySelectorAll('.history-item').forEach(item => {
                item.classList.remove('active');
            });
            historyItem.classList.add('active');
            
            showMessage(`已加载设计: ${design.name}`, 'success');
        });
        
        historyList.appendChild(historyItem);
    });
    const historyItems = document.querySelectorAll('.history-item');
    const paginationControls = document.querySelector('.pagination-controls');
    if (!searchTerm) {
        historyItems.forEach(item => item.style.display = 'flex');
        renderHistoryList()
        return;
    }
    if (paginationControls) paginationControls.style.display = 'none';
    historyItems.forEach(item => {
        const name = item.querySelector('.history-item-name').textContent.toLowerCase();
        const id = item.dataset.id || '';
        if (name.includes(searchTerm.toLowerCase()) || id.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 生成随机ID
function generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 从后端或本地加载数据
async function loadData() {
    const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
    
    if (mode === 'server') {
        try {
            const response = await fetch('/api/data');
            if (!response.ok) throw new Error('加载服务器数据失败');
            const data = await response.json();
            
            // 标记数据来源为服务器
            if (data.designHistory) {
                designHistory = data.designHistory.map(d => ({...d, source: 'server'}));
                renderHistoryList();
            }
                const savedApiSettings = localStorage.getItem('pokemonDesignApiSettings');
                console.log('apiSettings',savedApiSettings);
                apiSettings = JSON.parse(savedApiSettings);
                updateApiSettingsForm();
            
            if (data.currentDesign) {
                currentDesign = {...data.currentDesign, source: 'server'};
                renderDesign(currentDesign);
            }
            
        } catch (error) {
            console.error('从服务器加载数据失败:', error);
            showMessage('连接到服务器失败', 'warning');
        }
    } else {
        // 本地模式
        const savedHistory = localStorage.getItem('pokemonDesignHistory');
        const savedApiSettings = localStorage.getItem('pokemonDesignApiSettings');
        
        if (savedHistory) {
            designHistory = JSON.parse(savedHistory).map(d => ({...d, source: 'local'}));
            renderHistoryList();
        }
        
        if (savedApiSettings) {
            apiSettings = JSON.parse(savedApiSettings);
        }
        
        // 确保当前设计有source字段
        if (!currentDesign.source) {
            currentDesign.source = 'local';
        }
    }
}
//从后端获取AI对话历史
async function loadConversationHistory(designId) {
    try {
        const response = await fetch(`/api/conversations/${designId}`);
        // console.log(response);
        if (!response.ok) {
            
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || '获取对话失败');
        }
        
        const data = await response.json();
        
        // 清空当前对话
        document.getElementById('aiConversation').innerHTML = '';
        
        // 添加初始AI欢迎消息
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'message message-ai';
        welcomeMsg.textContent = '你好！我是宝可梦设计AI助手。你可以告诉我你想要设计的宝可梦的特点，我会帮你生成完整的宝可梦数据。';
        aiConversation.appendChild(welcomeMsg);
        
        // 添加历史消息
        data.messages.forEach(msg => {
            if (msg.role === 'user') {
                addUserMessage(msg.content);
            } else if (msg.role === 'assistant') {
                addAiMessage(msg.content);
            }
        });
        
        // 滚动到底部
        aiConversation.scrollTop = aiConversation.scrollHeight;
        console.log('加载对话历史:', data.messages);
        
    } catch (error) {
        console.error('加载对话错误:', error);
        
        // 清空当前对话
        document.getElementById('aiConversation').innerHTML = '';
        
        // 添加错误消息
        const errorMsg = document.createElement('div');
        errorMsg.className = 'message message-ai';
        errorMsg.innerHTML = `
            <p>加载对话历史失败: ${error.message}</p>
            <p>可能原因:</p>
            <ul>
                <li>这是新设计，还没有对话历史</li>
                <li>对话数据已被删除</li>
                <li>服务器暂时不可用</li>
            </ul>
        `;
        aiConversation.appendChild(errorMsg);
        
        // 添加初始AI欢迎消息
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'message message-ai';
        welcomeMsg.textContent = '你好！我是宝可梦设计AI助手。你可以告诉我你想要设计的宝可梦的特点，我会帮你生成完整的宝可梦数据。';
        aiConversation.appendChild(welcomeMsg);
    }
}


//获取对话历史数据
async function getConversationHistory(designId) {
    try {
        const response = await fetch(`/api/conversations/${designId}`);
        if (!response.ok) throw new Error('获取对话失败');
        
        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.error('获取对话历史失败:', error);
        return [];
    }
}
// 保存数据到后端或本地
async function saveData() {
    const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
    
    if (mode === 'server') {
        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentDesign: {...currentDesign, source: 'server'},
                    designHistory: designHistory.filter(d => d.source === 'server'),
                    // apiSettings:apiSettings
                })
            });
            
            if (!response.ok) throw new Error('保存到服务器失败');
            
            showMessage('数据已保存到服务器', 'success');
        } catch (error) {
            console.error('保存数据到服务器失败:', error);
            showMessage('服务器保存失败', 'warning');
        }
    }
    
    // 总是保存到本地存储
    localStorage.setItem('pokemonDesignHistory', 
        JSON.stringify(designHistory.filter(d => d.source === 'local')));
    localStorage.setItem('pokemonDesignApiSettings', JSON.stringify(apiSettings));
    
    // 确保当前设计有正确的source
    currentDesign.source = mode === 'server' ? 'server' : 'local';
}

// 更新API设置表单的函数
function updateApiSettingsForm() {
    if (document.getElementById('aiProvider')) {
        document.getElementById('aiProvider').value = apiSettings.aiProvider || 'deepseek';
        document.getElementById('deepseekApiKey').value = apiSettings.deepseekApiKey || '';
        document.getElementById('deepseekModel').value = apiSettings.deepseekModel || 'deepseek-chat';
        document.getElementById('customApiEndpoint').value = apiSettings.customApiEndpoint || '';
        document.getElementById('customApiKey').value = apiSettings.customApiKey || '';
        document.getElementById('customModelName').value = apiSettings.customModelName || '';
        document.getElementById('artProvider').value = apiSettings.artProvider || 'none';
        document.getElementById('customArtEndpoint').value = apiSettings.customArtEndpoint || '';
        document.getElementById('customArtKey').value = apiSettings.customArtKey || '';
        document.getElementById('model-temperature').value = apiSettings.temperature || 1;
        document.getElementById('modelContextLength').value = apiSettings.modeltextlength || 1;
        document.getElementById("temperature-value").textContent = apiSettings.temperature || 1;
    }
}

// 加载API设置
function loadApiSettings() {
    aiProvider.value = apiSettings.aiProvider;
    deepseekApiKey.value = apiSettings.deepseekApiKey;
    deepseekModel.value = apiSettings.deepseekModel;
    customApiEndpoint.value = apiSettings.customApiEndpoint;
    customApiKey.value = apiSettings.customApiKey;
    customModelName.value = apiSettings.customModelName;
    artProvider.value = apiSettings.artProvider;
    customArtEndpoint.value = apiSettings.customArtEndpoint;
    customArtKey.value = apiSettings.customArtKey;
    temperaturevalue.value = apiSettings.temperature ;
    // console.log(temperaturevalue.value);
    modeltextlength.value = apiSettings.modeltextlength;
    // console.log('上下文',modeltextlength.value);
    toggleAiProviderSettings();
    toggleArtProviderSettings();
}

// 保存API设置
function saveApiSettingsHandler() {
    apiSettings = {
        aiProvider: aiProvider.value,
        deepseekApiKey: deepseekApiKey.value,
        deepseekModel: deepseekModel.value,
        customApiEndpoint: customApiEndpoint.value,
        customApiKey: customApiKey.value,
        customModelName: customModelName.value,
        artProvider: artProvider.value,
        customArtEndpoint: customArtEndpoint.value,
        customArtKey: customArtKey.value,
        temperature: parseFloat(temperaturevalue.value),
        modeltextlength: modeltextlength.value
    };
    // console.log(apiSettings);
    saveData();
    apiSettingsModal.classList.remove('active');
    
    // 显示成功消息
    showMessage('API设置已保存', 'success');
}

// 切换AI提供商设置显示
function toggleAiProviderSettings() {
    if (aiProvider.value === 'deepseek') {
        deepseekSettings.style.display = 'block';
        customAiSettings.style.display = 'none';
    } else {
        deepseekSettings.style.display = 'none';
        customAiSettings.style.display = 'block';
    }
}

// 切换艺术提供商设置显示
function toggleArtProviderSettings() {
    if (artProvider.value === 'custom') {
        customArtSettings.style.display = 'block';
    } else {
        customArtSettings.style.display = 'none';
    }
}

// 初始化类型选择
function initTypeSelection() {
    // 清空现有内容
    designTypesContainer.innerHTML = '';
    
    // 为设计表单添加类型选择
    pokemonTypes.forEach(type => {
        const typeBadge = document.createElement('div');
        typeBadge.className = 'type-badge';
        typeBadge.textContent = type.name;
        typeBadge.style.backgroundColor = type.color;
        typeBadge.style.cursor = 'pointer';
        typeBadge.style.marginBottom = '5px';
        typeBadge.style.opacity = '0.5';
        typeBadge.style.transition = 'opacity 0.2s';
        
        typeBadge.addEventListener('click', () => {
            const isSelected = typeBadge.style.opacity === '1';
            
            if (!isSelected && currentDesign.types.length < 2) {
                typeBadge.style.opacity = '1';
                currentDesign.types.push(type.name);
            } else if (isSelected) {
                typeBadge.style.opacity = '0.5';
                currentDesign.types = currentDesign.types.filter(t => t !== type.name);
            }
            
            renderPokemonTypes();
        });
        
        designTypesContainer.appendChild(typeBadge);
    });
    
    // 为技能类型选择添加选项
    designMoveType.innerHTML = '';
    pokemonTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.name;
        designMoveType.appendChild(option);
    });
}

// 初始化移动标签页
function initMoveTabs() {
    moveTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有活动标签
            moveTabs.forEach(t => t.classList.remove('active'));
            // 添加当前活动标签
            tab.classList.add('active');
            
            // 隐藏所有内容
            moveLists.forEach(list => list.classList.remove('active'));
            // 显示当前内容
            const tabContent = document.querySelector(`.move-list[data-tab-content="${tab.dataset.tab}"]`);
            tabContent.classList.add('active');
        });
    });
}

    // 上传设计到服务器
    async function uploadToServer() {
        const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
        if (mode !== 'local') {
            showMessage('当前设计不是本地设计', 'warning');
            return;
        }
        if (currentDesign.name === '未命名宝可梦' && currentDesign.types.length === 0) {
            showMessage('请先设计', 'warning');
            return;
        }
        if(currentDesign.source==='serve'){
            showMessage('当前设计是服务器设计', 'warning');
            return
        }
        if(!confirm('确认要上传当前设计到服务器吗')){
            return
        }
        try {
            const ser_response = await fetch('/api/data');
            if (!ser_response.ok) throw new Error('加载服务器数据失败');
            const data = await ser_response.json();
           // 2. 检查是否已存在相同ID的设计
            const existingIndex = data.designHistory.findIndex(d => d.id === currentDesign.id);
        
        if (existingIndex >= 0) {
            // 替换现有设计
            data.designHistory[existingIndex] = {...currentDesign, source: 'server'};
            showMessage('服务器上的设计已更新', 'success');
        } else {
            // 添加新设计
            data.designHistory.push({...currentDesign, source: 'server'});
            showMessage('设计已上传到服务器', 'success');
        }
            // console.log('history',data.designHistory);
            // console.log(currentDesign);
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentDesign: {...currentDesign, source: 'server'},
                    designHistory: data.designHistory
                })
            });
            
            if (!response.ok) throw new Error('上传到服务器失败');
            
            // // 更新当前设计的source
            // currentDesign.source = 'server';
            
            // // 添加到设计历史
            // const existingIndex = designHistory.findIndex(d => d.id === currentDesign.id);
            // if (existingIndex >= 0) {
            //     designHistory[existingIndex] = {...currentDesign};
            // } else {
            //     designHistory.push({...currentDesign});
            // }
            
            // showMessage('设计已上传到服务器', 'success');
        } catch (error) {
            console.error('上传设计到服务器失败:', error);
            showMessage('上传到服务器失败', 'warning');
        }


    }

// 分享设计
function shareDesign() {
    const shareModal = document.getElementById('shareModal');
    const sharePreview = document.getElementById('sharePreview');
    const copyImageBtn = document.getElementById('copyImageBtn');
    const saveImageBtn = document.getElementById('saveImageBtn');
    const closeShareModal = document.getElementById('closeShareModal');
    const signatureMoves=document.getElementById('signatureMoves');
    const physicalmove=document.getElementById('physicalMoves');
    const specialmove=document.getElementById('specialMoves');
    const statusmove=document.getElementById('statusMoves');
    // 显示加载状态
    sharePreview.innerHTML = '<div class="message-loading"><div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>生成分享图片中...</div>';
    shareModal.classList.add('active');
    physicalmove.classList.add('active');
    specialmove.classList.add('active');
    statusmove.classList.add('active');
    signatureMoves.classList.add('active');
    // 使用html2canvas截图
    html2canvas(document.getElementById('pokemonCard'), {
        width: 430,
        windowWidth: 500,
        scale: 2,
        useCORS:true,
        // backgroundColor: '#ffffff'
    }).then(canvas => {
        sharePreview.innerHTML = '';
        sharePreview.appendChild(canvas);
        
        // 复制图片功能
        copyImageBtn.addEventListener('click', () => {
            canvas.toBlob(blob => {
                navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]).then(() => {
                    showMessage('图片已复制到剪贴板', 'success');
                }).catch(err => {
                    showMessage('复制失败: ' + err, 'danger');
                });
            });
        });
        
        // 保存图片功能
        saveImageBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = `${currentDesign.name || 'pokemon-design'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            showMessage('图片已保存', 'success');
        });
    }).catch(err => {
        sharePreview.innerHTML = '<div class="message message-ai">生成分享图片失败: ' + err.message + '</div>';
    });
    
    // 关闭模态框
    closeShareModal.addEventListener('click', () => {
        shareModal.classList.remove('active');
        physicalmove.classList.remove('active');
        specialmove.classList.remove('active');
        statusmove.classList.remove('active');
        // signatureMoves.classList.remove('active');
    });
}

// 绑定事件
function bindEvents() {
    uploadToServerBtn.addEventListener('click', uploadToServer);
    shareBtn.addEventListener('click', shareDesign);
    // 侧边栏切换
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const icon = toggleSidebarBtn.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
        } else {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
        }
    });
    // 新建设计
    newDesignBtn.addEventListener('click', () => {
        const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
        if(mode === 'server') {
            showMessage('当前为服务器，请切换本地', 'warning');
            return;
        }
        // 如果当前设计有实际内容，则保存到历史记录
        if (currentDesign.name !== '未命名宝可梦' || currentDesign.types.length > 0) {
            // designHistory.push({...currentDesign});
            // renderHistoryList();
            saveData();
        }
        
        // 创建默认新设计
        currentDesign = getDefaultDesign();
        
        renderDesign(currentDesign);
        showMessage('已创建新设计', 'success');
    });

    
    // 保存设计
    saveDesignBtn.addEventListener('click', () => {
        const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
        if(mode === 'server') {
            showMessage('当前为服务器，请切换本地', 'warning');
            return;
        }
        // 检查是否已存在相同ID的设计
        const existingIndex = designHistory.findIndex(d => d.id === currentDesign.id);
        
        if (existingIndex >= 0) {
            // 更新现有设计
            designHistory[existingIndex] = {...currentDesign};
        } else {
            // 添加新设计
            designHistory.push({...currentDesign});
        }
        
        renderHistoryList();
        saveData();
        showMessage('设计已保存', 'success');
    });
    
    // 生成立绘
    generateArtBtn.addEventListener('click', () => {
        const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
        if(mode === 'server') {
            showMessage('当前为服务器，请切换本地', 'warning');
            return;
        }
        if (currentDesign.name === '未命名宝可梦' || currentDesign.types.length == 0){
            showMessage('请先设计','warning')
            return
        }
        if (apiSettings.artProvider === 'none') {
            generateArt();
            return;
        }else if (apiSettings.artProvider === 'custom') {
            showMessage('请先配置自定义立绘生成API', 'warning');
        }
        
        // generateArt();
    });
    
    // AI对话提交
    aiSubmit.addEventListener('click',()=>{
        const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
         if(mode === 'server') {
        showMessage('当前为服务器，请切换本地', 'warning');
        return;
    }
    sendAiMessage()});
    aiInput.addEventListener('keydown', (e) => {
        const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
        if(mode === 'server') {
            showMessage('当前为服务器，请切换本地', 'warning');
            return;
        }
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            sendAiMessage();
        }
    });
    
    // API设置
    aiSettingsBtn.addEventListener('click', () => {
        apiSettingsModal.classList.add('active');
    });
    
    closeApiSettingsModal.addEventListener('click', () => {
        apiSettingsModal.classList.remove('active');
    });
    
    aiProvider.addEventListener('change', toggleAiProviderSettings);
    artProvider.addEventListener('change', toggleArtProviderSettings);
    saveApiSettings.addEventListener('click', saveApiSettingsHandler);
    
    // 设计表单
    saveDesignBtn.addEventListener('click', () => {
        const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
        if(mode === 'server') {
            return;
        }
        designFormModal.classList.add('active');
        populateDesignForm();
    });
    
    closeDesignFormModal.addEventListener('click', () => {
        designFormModal.classList.remove('active');
    });
    
    // 图片上传处理
    const imageUpload = document.getElementById('imageUpload');
    imageUpload.addEventListener('change', handleImageUpload);

    saveDesignForm.addEventListener('click', () => {
        const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
        if(mode === 'server') {
            showMessage('当前为服务器，请切换本地', 'warning');
            return;
        }
        updateDesignFromForm();
        designFormModal.classList.remove('active');
        renderDesign(currentDesign);
        showMessage('设计已更新', 'success');
    });
}

// 处理图片上传
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const previewImage = document.getElementById('previewImage');
        previewImage.src = e.target.result;
        document.getElementById('imagePreview').style.display = 'block';
        
        // 更新当前设计的图片URL
        currentDesign.imageUrl = e.target.result;
        pokemonImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 渲染设计
function renderDesign(design) {
    pokemonName.textContent = design.name;
    pokemonHeight.textContent = `${design.height} m`;
    pokemonWeight.textContent = `${design.weight} kg`;
    pokedexDescription.textContent = design.description;
    pokemonImage.src = design.imageUrl;
    
    renderPokemonTypes();
    renderAbilities();
    renderStatsChart();
    renderSignatureMove();
    renderOtherMoves();
    loadConversationHistory(design.id);
    // 更新设计表单
    populateDesignForm();
}

// 渲染宝可梦类型
function renderPokemonTypes() {
    pokemonTypesContainer.innerHTML = '';
    
    currentDesign.types.forEach(typeName => {
        const type = pokemonTypes.find(t => t.name === typeName);
        if (type) {
            const typeBadge = document.createElement('div');
            typeBadge.className = 'type-badge';
            typeBadge.textContent = type.name;
            typeBadge.style.backgroundColor = type.color;
            pokemonTypesContainer.appendChild(typeBadge);
            
            // 设置卡片背景色
            pokemonCard.style.borderLeft = `8px solid ${type.color}`;
        }
    });
    
    // 如果没有类型，重置边框
    if (currentDesign.types.length === 0) {
        pokemonCard.style.borderLeft = '8px solid var(--border)';
    }
}

// 渲染特性
function renderAbilities() {
    abilitiesList.innerHTML = '';
    
    currentDesign.abilities.forEach((ability, index) => {
        if (!ability.name) return;
        
        const abilityItem = document.createElement('li');
        abilityItem.className = 'ability-item';
        
        const abilityName = document.createElement('div');
        abilityName.className = 'ability-name';
        abilityName.textContent = ability.name;
        if (ability.isHidden) {
            abilityName.textContent += ' (隐藏特性)';
        }
        
        const abilityDesc = document.createElement('div');
        abilityDesc.className = 'ability-desc';
        abilityDesc.textContent = ability.description;
        
        abilityItem.appendChild(abilityName);
        abilityItem.appendChild(abilityDesc);
        abilitiesList.appendChild(abilityItem);
    });
}

// 渲染种族值图表
function renderStatsChart() {
    statsChart.innerHTML = '';
    
    const stats = [
        { name: 'HP', value: currentDesign.stats.hp },
        { name: '攻击', value: currentDesign.stats.attack },
        { name: '防御', value: currentDesign.stats.defense },
        { name: '特攻', value: currentDesign.stats.specialAttack },
        { name: '特防', value: currentDesign.stats.specialDefense },
        { name: '速度', value: currentDesign.stats.speed }
    ];

    // 计算种族值总和
    const total = stats.reduce((sum, stat) => sum + stat.value, 0);
    
    // 添加总和显示
    const totalElement = document.createElement('div');
    totalElement.className = 'stat-total';
    totalElement.innerHTML = `
        <span class="stat-total-label">种族值总和</span>
        <span class="stat-total-value">${total}</span>
    `;
    statsChart.appendChild(totalElement);
    
    // 获取主类型颜色
    const primaryType = currentDesign.types[0];
    const typeColor = primaryType ? pokemonTypes.find(t => t.name === primaryType).color : 'var(--primary)';
    
    stats.forEach(stat => {
        const statRow = document.createElement('div');
        statRow.className = 'stat-row';
        
        const statLabel = document.createElement('div');
        statLabel.className = 'stat-label';
        statLabel.textContent = stat.name
        
        const statBarContainer = document.createElement('div');
        statBarContainer.className = 'stat-bar-container';
        
        const statBar = document.createElement('div');
        statBar.className = 'stat-bar';
        statBar.style.width = `${(stat.value / 255) * 100*1.1}%`;
        statBar.style.backgroundColor = typeColor;
        
        const statValue = document.createElement('div');
        statValue.className = 'stat-value';
        statValue.textContent = stat.value;
        
        statBar.appendChild(statValue);
        statBarContainer.appendChild(statBar);
        statRow.appendChild(statLabel);
        statRow.appendChild(statBarContainer);
        statsChart.appendChild(statRow);
    });
}

// 渲染专属技能
function renderSignatureMove() {
    signatureMoves.innerHTML = '';
    
    if (!currentDesign.signatureMove.name) {
        const emptyMsg = document.createElement('div');
        emptyMsg.textContent = '暂无专属技能';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.color = 'var(--text-light)';
        signatureMoves.appendChild(emptyMsg);
        return;
    }
    
    const moveItem = document.createElement('div');
    moveItem.className = 'move-item';
    
    const moveHeader = document.createElement('div');
    moveHeader.className = 'move-header';
    
    const moveName = document.createElement('div');
    moveName.className = 'move-name';
    moveName.textContent = currentDesign.signatureMove.name;
    
    const moveType = document.createElement('div');
    moveType.className = 'move-type';
    moveType.textContent = currentDesign.signatureMove.type;
    
    // 查找类型颜色
    const type = pokemonTypes.find(t => t.name === currentDesign.signatureMove.type);
    if (type) {
        moveType.style.backgroundColor = type.color;
    }
    
    moveHeader.appendChild(moveName);
    moveHeader.appendChild(moveType);
    
    const moveStats = document.createElement('div');
    moveStats.className = 'move-stats';
    
    const moveCategory = document.createElement('div');
    moveCategory.className = 'move-stat';
    moveCategory.innerHTML = `<span class="move-stat-label">类型:</span> ${getMoveCategoryName(currentDesign.signatureMove.category)}`;
    
    const movePower = document.createElement('div');
    movePower.className = 'move-stat';
    movePower.innerHTML = `<span class="move-stat-label">威力:</span> ${currentDesign.signatureMove.power || '-'}`;
    
    const moveAccuracy = document.createElement('div');
    moveAccuracy.className = 'move-stat';
    moveAccuracy.innerHTML = `<span class="move-stat-label">命中:</span> ${currentDesign.signatureMove.accuracy || '-'}%`;
    
    const movePp = document.createElement('div');
    movePp.className = 'move-stat';
    movePp.innerHTML = `<span class="move-stat-label">PP:</span> ${currentDesign.signatureMove.pp}`;
    
    moveStats.appendChild(moveCategory);
    moveStats.appendChild(movePower);
    moveStats.appendChild(moveAccuracy);
    moveStats.appendChild(movePp);
    
    const moveDesc = document.createElement('div');
    moveDesc.className = 'move-desc';
    moveDesc.textContent = currentDesign.signatureMove.description;
    
    moveItem.appendChild(moveHeader);
    moveItem.appendChild(moveStats);
    moveItem.appendChild(moveDesc);
    
    signatureMoves.appendChild(moveItem);
}

// 渲染其他技能
function renderOtherMoves() {
    physicalMoves.innerHTML = '';
    specialMoves.innerHTML = '';
    statusMoves.innerHTML = '';
    
    // 渲染物理技能
    if (currentDesign.moves.physical.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.textContent = '暂无物理技能';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.color = 'var(--text-light)';
        physicalMoves.appendChild(emptyMsg);
    } else {
        currentDesign.moves.physical.forEach(move => {
            physicalMoves.appendChild(createMoveElement(move));
        });
    }
    
    // 渲染特殊技能
    if (currentDesign.moves.special.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.textContent = '暂无特殊技能';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.color = 'var(--text-light)';
        specialMoves.appendChild(emptyMsg);
    } else {
        currentDesign.moves.special.forEach(move => {
            specialMoves.appendChild(createMoveElement(move));
        });
    }
    
    // 渲染变化技能
    if (currentDesign.moves.status.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.textContent = '暂无变化技能';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.color = 'var(--text-light)';
        statusMoves.appendChild(emptyMsg);
    } else {
        currentDesign.moves.status.forEach(move => {
            statusMoves.appendChild(createMoveElement(move));
        });
    }
}

// 创建技能元素
function createMoveElement(move) {
    const moveItem = document.createElement('div');
    moveItem.className = 'move-item';
    
    const moveHeader = document.createElement('div');
    moveHeader.className = 'move-header';
    
    const moveName = document.createElement('div');
    moveName.className = 'move-name';
    moveName.textContent = move.name;
    
    const moveType = document.createElement('div');
    moveType.className = 'move-type';
    moveType.textContent = move.type;
    
    // 查找类型颜色
    const type = pokemonTypes.find(t => t.name === move.type);
    if (type) {
        moveType.style.backgroundColor = type.color;
    }
    
    moveHeader.appendChild(moveName);
    moveHeader.appendChild(moveType);
    
    const moveStats = document.createElement('div');
    moveStats.className = 'move-stats';
    
    const moveCategory = document.createElement('div');
    moveCategory.className = 'move-stat';
    moveCategory.innerHTML = `<span class="move-stat-label">类型:</span> ${getMoveCategoryName(move.category)}`;
    
    const movePower = document.createElement('div');
    movePower.className = 'move-stat';
    movePower.innerHTML = `<span class="move-stat-label">威力:</span> ${move.power || '-'}`;
    
    const moveAccuracy = document.createElement('div');
    moveAccuracy.className = 'move-stat';
    moveAccuracy.innerHTML = `<span class="move-stat-label">命中:</span> ${move.accuracy || '-'}%`;
    
    const movePp = document.createElement('div');
    movePp.className = 'move-stat';
    movePp.innerHTML = `<span class="move-stat-label">PP:</span> ${move.pp}`;
    
    moveStats.appendChild(moveCategory);
    moveStats.appendChild(movePower);
    moveStats.appendChild(moveAccuracy);
    moveStats.appendChild(movePp);
    
    const moveDesc = document.createElement('div');
    moveDesc.className = 'move-desc';
    moveDesc.textContent = move.description;
    
    moveItem.appendChild(moveHeader);
    moveItem.appendChild(moveStats);
    moveItem.appendChild(moveDesc);
    
    return moveItem;
}

// 获取技能类型名称
function getMoveCategoryName(category) {
    switch (category) {
        case 'physical': return '物理';
        case 'special': return '特殊';
        case 'status': return '变化';
        default: return category;
    }
}


// 渲染历史记录列表（带分页）
async function renderHistoryList() {
    historyList.innerHTML = '';
    
    // 计算当前页的起始和结束索引
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedDesigns = designHistory.slice(startIndex, endIndex);
    
    // 渲染当前页的记录
    paginatedDesigns.forEach(design => {
        const historyItem = document.createElement('li');
        historyItem.className = 'history-item';
        historyItem.dataset.id = design.id;
        historyItem.dataset.source = design.source || 'local';
        if (design.id === currentDesign.id) {
            historyItem.classList.add('active');
        }
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'history-item-name';
        nameSpan.textContent = design.name || '未命名宝可梦';
        
        const idSpan = document.createElement('span');
        idSpan.className = 'history-item-id';
        idSpan.textContent = `ID: ${design.id.substring(0, 3)}...`;
        idSpan.title = design.id;
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-id-btn';
        copyBtn.dataset.id = design.id;
        copyBtn.innerHTML = '<i class="far fa-copy"></i>';
        copyBtn.title = '复制ID';
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'history-item-date';
        dateSpan.textContent = new Date(design.createdAt).toLocaleDateString();
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'history-item-delete';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.title = '删除设计';
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (design.source === 'server') {
                showMessage('无法删除服务器设计', 'warning');
                return;
            }
            if (confirm(`确定要删除设计 "${design.name}" 吗?`)) {
                designHistory = designHistory.filter(d => d.id !== design.id);
                saveData();
                renderHistoryList();
                showMessage('设计已删除', 'success');
                
                if (design.id === currentDesign.id) {
                    currentDesign = getDefaultDesign()
                    renderDesign(currentDesign);
                }
            }
        });

        nameSpan.appendChild(idSpan);
        nameSpan.appendChild(copyBtn);
        historyItem.appendChild(nameSpan);
        historyItem.appendChild(dateSpan);
        historyItem.appendChild(deleteBtn);
        
        historyItem.addEventListener('click', () => {
            currentDesign = {...design};
            renderDesign(currentDesign);
            
            document.querySelectorAll('.history-item').forEach(item => {
                item.classList.remove('active');
            });
            historyItem.classList.add('active');
            
            showMessage(`已加载设计: ${design.name}`, 'success');
        });
        
        historyList.appendChild(historyItem);
    });
    
    // 渲染分页控件
    renderPaginationControls();
}

// 渲染分页控件
function renderPaginationControls() {
    const totalPages = Math.ceil(designHistory.length / itemsPerPage);
    console.log('totalpages',totalPages)
    // 如果只有一页，不需要显示分页控件
    if (totalPages <= 1) {
        document.querySelector('.pagination-controls')?.remove();
        return;}
    
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-controls';
    
    // 上一页按钮
    const prevButton = document.createElement('button');
    prevButton.textContent = '上一页';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderHistoryList();
        }
    });
    
    // 页码信息
    const pageInfo = document.createElement('span');
    pageInfo.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
    
    // 下一页按钮
    const nextButton = document.createElement('button');
    nextButton.textContent = '下一页';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderHistoryList();
        }
    });
    
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageInfo);
    paginationContainer.appendChild(nextButton);
    
    // 添加到历史记录列表后面
    const historyContainer = historyList.parentNode;
    const existingPagination = historyContainer.querySelector('.pagination-controls');
    if (existingPagination) {
        historyContainer.replaceChild(paginationContainer, existingPagination);
    } else {
        historyContainer.appendChild(paginationContainer);
    }
}

// 填充设计表单
function populateDesignForm() {
    designName.value = currentDesign.name;
    designHeight.value = currentDesign.height;
    designWeight.value = currentDesign.weight;
    designDescription.value = currentDesign.description;
    
    // 设置类型选择
    document.querySelectorAll('#designTypes .type-badge').forEach(badge => {
        const typeName = badge.textContent;
        badge.style.opacity = currentDesign.types.includes(typeName) ? '1' : '0.5';
    });
    
    // 设置特性
    designAbility1.value = currentDesign.abilities[0].name;
    designAbilityDesc1.value = currentDesign.abilities[0].description;
    designAbility2.value = currentDesign.abilities[1].name;
    designAbilityDesc2.value = currentDesign.abilities[1].description;
    designAbilityHidden.value = currentDesign.abilities[2].name;
    designAbilityHiddenDesc.value = currentDesign.abilities[2].description;
    
    // 设置种族值
    designStatHp.value = currentDesign.stats.hp;
    designStatAtk.value = currentDesign.stats.attack;
    designStatDef.value = currentDesign.stats.defense;
    designStatSpAtk.value = currentDesign.stats.specialAttack;
    designStatSpDef.value = currentDesign.stats.specialDefense;
    designStatSpeed.value = currentDesign.stats.speed;
    
    // 设置专属技能
    designMoveName.value = currentDesign.signatureMove.name;
    designMoveType.value = currentDesign.signatureMove.type;
    designMoveCategory.value = currentDesign.signatureMove.category;
    designMovePower.value = currentDesign.signatureMove.power;
    designMoveAccuracy.value = currentDesign.signatureMove.accuracy;
    designMovePp.value = currentDesign.signatureMove.pp;
    designMoveDescription.value = currentDesign.signatureMove.description;
}

// 从表单更新设计
function updateDesignFromForm() {
    currentDesign.name = designName.value;
    currentDesign.height = parseFloat(designHeight.value) || 0;
    currentDesign.weight = parseFloat(designWeight.value) || 0;
    currentDesign.description = designDescription.value;
    
    // 特性
    currentDesign.abilities = [
        { name: designAbility1.value, description: designAbilityDesc1.value },
        { name: designAbility2.value, description: designAbilityDesc2.value },
        { name: designAbilityHidden.value, description: designAbilityHiddenDesc.value, isHidden: true }
    ];
    
    // 种族值
    currentDesign.stats = {
        hp: parseInt(designStatHp.value) || 0,
        attack: parseInt(designStatAtk.value) || 0,
        defense: parseInt(designStatDef.value) || 0,
        specialAttack: parseInt(designStatSpAtk.value) || 0,
        specialDefense: parseInt(designStatSpDef.value) || 0,
        speed: parseInt(designStatSpeed.value) || 0
    };
    
    // 专属技能
    currentDesign.signatureMove = {
        name: designMoveName.value,
        type: designMoveType.value,
        category: designMoveCategory.value,
        power: parseInt(designMovePower.value) || 0,
        accuracy: parseInt(designMoveAccuracy.value) || 0,
        pp: parseInt(designMovePp.value) || 0,
        description: designMoveDescription.value
    };
    
    currentDesign.updatedAt = new Date().toISOString();
}

// 发送AI消息
async function sendAiMessage() {
    const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
    if(mode === 'server') {
        aiInput.disabled = true;
        aiSubmit.disabled = true;
        showMessage('当前为服务器，请切换本地', 'warning');
        return;
    }
    if (mode ==='local'){
        aiInput.disabled = false;
        aiSubmit.disabled = false;
    }
    const message = aiInput.value.trim();
    if (!message) return;
    
    // 禁用输入和按钮
    aiInput.disabled = true;
    aiSubmit.disabled = true;
    document.querySelectorAll('.view-mode-btn').forEach(b =>b.disabled=true)
        // 添加用户消息到对话
        addUserMessage(message);
        aiInput.value = '';
        
        // 保存用户消息到服务器
        await saveConversationMessage({
            role: 'user',
            content: message,
            designId: currentDesign.id
        });
    
    // 显示加载指示器
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message message-loading';
    loadingMessage.innerHTML = `
        <div class="loading-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        AI正在思考...无法切换视图模式，请不要新建设计！
    `;
    aiConversation.appendChild(loadingMessage);
    aiConversation.scrollTop = aiConversation.scrollHeight;
    
    try {
        // 准备系统提示
        const strength = aiStrength.value;
        const style = aiStyle.value;
        
        let strengthPrompt = '';
        switch (strength) {
            case 'low':
                strengthPrompt = '设计一个中等强度的宝可梦，种族值总和在400-480之间。';
                break;
            case 'medium':
                strengthPrompt = '设计一个中等偏上强度的宝可梦，种族值总和在480-510之间。';
                break;
            case 'high':
                strengthPrompt = '设计一个强大的宝可梦，种族值总和在510-550之间。';
                break;
                break;
            case 'god_1':
                strengthPrompt = '设计一个强大的宝可梦，种族值总和在670或680。';
                break;
                break;
            case 'god_2':
                strengthPrompt = '设计一个强大的宝可梦，种族值总和在550或570或580。';
                break;
                break;
            case 'zhun_god':
                strengthPrompt = '设计一个强大的宝可梦，种族值总和600。';
                break;
            case 'custom':
                strengthPrompt = '根据用户要求设计宝可梦的强度。';
                break;
        }
        
        let stylePrompt = '';
        switch (style) {
            case 'realistic':
                stylePrompt = '设计风格偏向现实世界中的动物或植物。';
                break;
            case 'fantasy':
                stylePrompt = '设计风格偏向奇幻或神话生物。';
                break;
            case 'cute':
                stylePrompt = '设计风格偏向可爱或萌系。';
                break;
            default:
                stylePrompt = '设计风格平衡，介于现实与奇幻之间。';
        }
        
        const systemPrompt = `你是一个宝可梦设计专家，帮助用户设计新的宝可梦。宝可梦特性最好有一个独特的特性,尽可能地少使用混乱/着迷/魅惑等状态。${strengthPrompt} ${stylePrompt}
        
        请严格按照以下JSON格式返回中文设计数据，不要包含任何额外的解释或文本：
        {
            "name": "宝可梦名称",
            "height": 身高(米),
            "weight": 体重(千克),
            "types": ["属性1", "属性2(可选)"],
            "description": "(图鉴描述,外观描述和设计思路，要求详细且细致)",
            "abilities": [
                {"name": "特性1名称", "description": "特性1描述"},
                {"name": "特性2名称", "description": "特性2描述"},
                {"name": "隐藏特性名称", "description": "隐藏特性描述", "isHidden": true}
            ],
            "stats": {
                "hp": HP种族值,
                "attack": 攻击种族值,
                "defense": 防御种族值,
                "specialAttack": 特攻种族值,
                "specialDefense": 特防种族值,
                "speed": 速度种族值
            },
            "signatureMove": {
                "name": "专属技能名称",
                "type": "技能属性",
                "category": "physical/special/status",
                "power": 威力(变化技能为0),
                "accuracy": 命中率(0-100),
                "pp": PP值(5-40),
                "description": "技能描述(若为攻击技能，描述中应包含技能攻击范围(单体/群体/全场))"
            },
            "moves": {
                "physical": [
                    {"name": "技能1", "type": "属性", "category": "physical", "power": 威力, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                    {"name": "技能2", "type": "属性", "category": "physical", "power": 威力, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                    {"name": "技能3", "type": "属性", "category": "physical", "power": 威力, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                    {"name": "技能4", "type": "属性", "category": "physical", "power": 威力, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                ],
                "special": [
                    {"name": "技能1", "type": "属性", "category": "special", "power": 威力, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                    {"name": "技能2", "type": "属性", "category": "special", "power": 威力, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                    {"name": "技能3", "type": "属性", "category": "special", "power": 威力, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                    {"name": "技能4", "type": "属性", "category": "special", "power": 威力, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                ],
                "status": [
                    {"name": "技能1", "type": "属性", "category": "status", "power": 0, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                    {"name": "技能2", "type": "属性", "category": "status", "power": 0, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                    {"name": "技能3", "type": "属性", "category": "status", "power": 0, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                    {"name": "技能4", "type": "属性", "category": "status", "power": 0, "accuracy": 命中率, "pp": PP值, "description": "描述"}
                ]
            }
        }`;
        
        /// 调用API
        let response;
        if (apiSettings.aiProvider === 'deepseek') {
            // response = await callDeepSeekApi(systemPrompt, message);//无上下文调用
            response =await messages_callDeepSeekApi(systemPrompt,await getConversationHistory(currentDesign.id));//有上下文调用
            // console.log(response)
        } else {
            response = await callCustomAiApi(systemPrompt, message);
        }

        // 移除加载指示器
        aiConversation.removeChild(loadingMessage);

        // 改进的响应处理逻辑
        let designData;
        
        // 尝试1: 直接解析JSON
        try {
            designData = JSON.parse(response);
        } catch (e1) {
            // 尝试2: 提取JSON部分（处理可能的多余文本）
            try {
                const jsonStart = response.indexOf('{');
                const jsonEnd = response.lastIndexOf('}') + 1;
                const jsonString = response.slice(jsonStart, jsonEnd);
                designData = JSON.parse(jsonString);
            } catch (e2) {
                // 尝试3: 处理可能存在的JSONP格式
                try {
                    const jsonStart = response.indexOf('(') + 1;
                    const jsonEnd = response.lastIndexOf(')');
                    const jsonString = response.slice(jsonStart, jsonEnd);
                    designData = JSON.parse(jsonString);
                } catch (e3) {
                    // 所有尝试都失败，显示原始响应
                    addAiMessage(response);
                    showMessage('无法解析AI返回的数据', 'warning');
                    return;
                }
            }
        }

        // 验证设计数据是否包含必要字段
        if (!designData.name || !designData.types || !designData.stats) {
            addAiMessage(response);
            showMessage('AI返回的数据缺少必要字段', 'warning');
            return;
        }

        // 更新当前设计
        currentDesign = {
            ...currentDesign,
            ...designData,
            id: currentDesign.id,
            imageUrl: currentDesign.imageUrl,
            createdAt: currentDesign.createdAt,
            updatedAt: new Date().toISOString()
        };

        // 确保abilities数组有3个元素
        if (!currentDesign.abilities || currentDesign.abilities.length < 3) {
            currentDesign.abilities = [
                { name: '', description: '' },
                { name: '', description: '' },
                { name: '', description: '', isHidden: true }
            ];
            
            if (designData.abilities) {
                designData.abilities.forEach((ability, index) => {
                    if (index < 3) {
                        currentDesign.abilities[index] = {
                            ...currentDesign.abilities[index],
                            ...ability
                        };
                    }
                });
            }
        }

        // 确保moves对象包含所有分类
        if (!currentDesign.moves) {
            currentDesign.moves = {
                physical: [],
                special: [],
                status: []
            };
        } else {
            currentDesign.moves.physical = currentDesign.moves.physical || [];
            currentDesign.moves.special = currentDesign.moves.special || [];
            currentDesign.moves.status = currentDesign.moves.status || [];
        }



        // 添加AI消息到对话
        // const aiMessage = `已根据你的要求生成了新的宝可梦设计: ${designData.name}`;
        const aiMessage = designData;// design全部内容
        // console.log(aiMessage)
        // console.log(aiMessage)
        addAiMessage(aiMessage);

        // 渲染新设计
        renderDesign(currentDesign);
        // 保存AI消息到服务器
        await saveConversationMessage({
            role: 'assistant',
            content: aiMessage,
            designId: currentDesign.id
        });
         // 检查是否已存在相同ID的设计
         const existingIndex_new = designHistory.findIndex(d => d.id === currentDesign.id);
        
         if (existingIndex_new >= 0) {
             // 更新现有设计
             designHistory[existingIndex_new] = {...currentDesign};
         } else {
             // 添加新设计
             designHistory.push({...currentDesign});
         }
         
         renderHistoryList();
         saveData();
        document.querySelectorAll('.view-mode-btn').forEach(b =>b.disabled=false)
        showMessage('设计已保存,AI设计已应用', 'success');

    } catch (error) {
        // 移除加载指示器
        aiConversation.removeChild(loadingMessage);

        // 添加错误消息
        addAiMessage(`抱歉，发生了错误: ${error.message}`);
        showMessage('AI请求失败', 'danger');
    } finally {
        // 重新启用输入和按钮
        aiInput.disabled = false;
        aiSubmit.disabled = false;
        aiInput.focus();
    }
}



// 无上下文调用DeepSeek API
async function callDeepSeekApi(systemPrompt, userMessage) {
    if (!apiSettings.deepseekApiKey) {
        throw new Error('未配置DeepSeek API Key');
    }
    
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiSettings.deepseekApiKey}`
        },
        body: JSON.stringify({
            model: apiSettings.deepseekModel,
            temperature: apiSettings.temperature,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            stream: false
        })
    });
    
    if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}
//有上下文调用DeepSeek API
async function messages_callDeepSeekApi(systemPrompt,messages) {
    if (!apiSettings.deepseekApiKey) {
        throw new Error('未配置DeepSeek API Key');
    }
    console.log('apikey',apiSettings.deepseekApiKey)
    const apiMessages = messages.map(({ role, content }) => ({
        role,
        content: typeof content === 'string' ? content : JSON.stringify(content) // 确保 content 是字符串
    }));
    console.log('apimessages',apiMessages)
    const postmessages = [{ role: 'system', content: systemPrompt },
        ...(apiMessages.slice(-apiSettings.modeltextlength)) ]
        // console.log('postmessages',postmessages)
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiSettings.deepseekApiKey}`
        },
        body: JSON.stringify({
            model: apiSettings.deepseekModel,
            temperature: apiSettings.temperature,
            messages: postmessages,
            stream: false
        })
    });
    
    if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
    }
    
    const data = await response.json();
    // console.log(data)
    return data.choices[0].message.content;
}

// 调用自定义AI API
async function callCustomAiApi(systemPrompt, userMessage) {
    if (!apiSettings.customApiEndpoint || !apiSettings.customApiKey) {
        throw new Error('未配置自定义API端点或API Key');
    }
    
    const response = await fetch(apiSettings.customApiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiSettings.customApiKey}`
        },
        body: JSON.stringify({
            model: apiSettings.customModelName,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            stream: false
        })
    });
    
    if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// 生成立绘
async function generateArt() {
    // if (apiSettings.artProvider !== 'custom') {
    //     showMessage('请先配置立绘生成API', 'warning');
    //     return;
    // }
    
    // if (!apiSettings.customArtEndpoint || !apiSettings.customArtKey) {
    //     showMessage('未配置立绘生成API端点或API Key', 'warning');
    //     return;
    // }
    document.querySelectorAll('.view-mode-btn').forEach(b =>b.disabled=true)
    try {
        // 显示加载指示器
        pokemonImageContainer.innerHTML = '<div class="message-loading"><div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>生成立绘中...</div>';
        
        // 构建提示词
        const art_prompt=`你现在是一个ai宝可梦立绘图片生成大师，宝可梦立绘生成大师需要遵守以下规则：
        轮廓辨识度：剪影需清晰独特，避免复杂细节模糊造型。
        比例统一：符合宝可梦世界观（如头身比、眼睛大小风格化）。
        色彩限制：主色≤4种，高饱和色需谨慎使用（避免刺眼）。
        动态张力：静止姿势中隐含动态感（如尾巴翘起、攻击预备姿态）。
        属性可视化：通过造型元素直接体现属性（如火焰、金属纹理）。
        线条简化：线条需简洁流畅，避免复杂细节（如毛发、鳞片）。
        设计风格：保留宝可梦系列的设计风格，避免过于写实或奇幻，同时避免出现令人不适的元素。
        设计元素：可参考现实生物，但需避免直接模仿。
        立绘中不出现任何文字信息，除非是用户要求的特定文字。
        接下来你会收到一些提示，对这些提示解构后，用你的想象力去生动而细节地描述宝可梦的立绘（要求风格类似官方宝可梦设计，清晰，色彩明亮，细节丰富）,并转换成英文填充到下面url的占位符中，只输出一条url即可。https://image.pollinations.ai/prompt/{prompt}?width=1024&height=1024&seed=100&model=flux&nologo=true&private=true`
        const art_message = `提示内容：宝可梦名称: ${currentDesign.name}，身高: ${currentDesign.height}, 体重:${currentDesign.weight}, 类型: ${currentDesign.types.join('/')}，描述: ${currentDesign.description}，立绘中不要出现文字内容`;
        let response;
        // 调用本地代理
        if (apiSettings.aiProvider === 'deepseek') {
            response = await callDeepSeekApi(art_prompt, art_message);
        } else {
            response = await callCustomAiApi(art_prompt, art_message);
        }
        // if (!response.ok) {
        //     console.log(response)
        //     throw new Error(`API请求失败: ${response.status}`);
        // }
        
        // 假设API返回图像的URL
        const data = await response
        // console.log(data)
        if (data) {
            currentDesign.imageUrl = data;
            // console.log('当前设计',currentDesign.imageUrl)
            pokemonImage.src = data;
            pokemonImageContainer.innerHTML=`<img src="${data}" alt="宝可梦立绘" class="pokemon-image" id="pokemonImage">`; // 清除加载指示器
            showMessage('立绘生成成功,点击保存设计以保存当前立绘', 'success');
            
        } else {
            throw new Error('API未返回图像URL');
        }
    } catch (error) {
        // pokemonImage.src = 'https://via.placeholder.com/150';
        showMessage(`立绘生成失败: ${error.message}`, 'danger');
    }
    document.querySelectorAll('.view-mode-btn').forEach(b =>b.disabled=false)
}
// 生成立绘
// async function generateArt() {
//     if (apiSettings.artProvider !== 'custom') {
//       showMessage('请先配置立绘生成API', 'warning');
//       return;
//     }
  
//     if (!apiSettings.customArtEndpoint || !apiSettings.customArtKey) {
//       showMessage('未配置立绘生成API端点或API Key', 'warning');
//       return;
//     }
  
//     try {
//       // 显示加载指示器
//       pokemonImageContainer.innerHTML = '<div class="message-loading"><div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>生成立绘中...</div>';
  
//       // 构建提示词
//       const prompt = `宝可梦设计，名称: ${currentDesign.name}，类型: ${currentDesign.types.join('/')}，描述: ${currentDesign.description}`;
  
//       // 调用本地代理（而不是直接调讯飞 API）
//       const response = await fetch('http://localhost:3015/api/generate-art', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           prompt: prompt,
//           apiKey: apiSettings.customArtKey, // 传递 API Key
//         }),
//       });
  
//       const data = await response.json();
  
//       // 检查 API 返回状态
//       if (data.header && data.header.code !== 0) {
//         throw new Error(data.header.message || 'API返回错误');
//       }
  
//       // 处理返回的 base64 图像数据
//       if (data.payload?.choices?.text?.[0]?.content) {
//         const base64Image = data.payload.choices.text[0].content;
//         currentDesign.imageUrl = `data:image/png;base64,${base64Image}`;
//         pokemonImage.src = currentDesign.imageUrl;
//         showMessage('立绘生成成功', 'success');
//       } else {
//         throw new Error('API未返回有效的图像数据');
//       }
//     } catch (error) {
//       pokemonImage.src = 'https://via.placeholder.com/150';
//       showMessage(`立绘生成失败: ${error.message}`, 'danger');
//       console.error('立绘生成错误:', error);
//     }
//   }




// 添加用户消息到对话
function addUserMessage(content) {
    const message = document.createElement('div');
    message.className = 'message message-user';
    message.textContent = content;
    aiConversation.appendChild(message);
    aiConversation.scrollTop = aiConversation.scrollHeight;
}

// 添加AI消息到对话，AI上下文显示
function addAiMessage(content) {
    const message = document.createElement('div');
    message.className = 'message message-ai';
     // 生成唯一ID用于关联数据
     const messageId = 'msg-' + Date.now();
     message.dataset.messageId = messageId;
    // 检查内容是否是JSON格式
    try {
        const jsonData = content;
        const formattedContent = JSON.stringify(jsonData, null, 2);
        const contentPreview = document.createElement('div');
        contentPreview.textContent = `AI返回了设计数据，已为你设计了新的宝可梦: 「 ${jsonData.name} 」，并自动应用到当前设计中。`;
        
        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-collapse';
        toggleButton.textContent = '查看完整响应';
        toggleButton.innerHTML += '<i class="fas fa-chevron-down"></i>';
        // console.log('jsonData',jsonData)
         // 还原按钮 - 添加数据属性
         const restoreButton = document.createElement('button');
         restoreButton.className = 'restore-design';
         restoreButton.dataset.targetId = messageId; // 关联消息ID
         restoreButton.textContent = '还原设计';
         restoreButton.innerHTML += '<i class="fas fa-undo"></i>';
        message.appendChild(restoreButton);
        restoreButton.addEventListener('click', () => {
            //是否还原设计
            const mode = document.querySelector('.view-mode-btn.active')?.dataset.mode || 'local';
            if(mode === 'server') {
            showMessage('当前为服务器，请切换本地', 'warning');
            return;
            }
            const confirmRestore = confirm('是否还原设计？');
            if (confirmRestore) {
                if (jsonData.name&&jsonData.types&&jsonData.stats) {
                currentDesign = {id:currentDesign.id,...jsonData,
                    createdAt: currentDesign.createdAt,
                    updatedAt: currentDesign.updatedAt,
                    imageUrl:currentDesign.imageUrl}; // 还原设计数据
                renderDesign(currentDesign); // 渲染设计
                saveData(); // 保存数据
                showMessage('设计已还原', 'success'); // 显示成功消息
                // 还原设计逻辑
                }else {
                    showMessage('设计数据不完整，无法还原', 'warning'); // 显示警告消息
                }
            }
        });
        const fullContent = document.createElement('pre');
        fullContent.className = 'collapsible-content';
        fullContent.textContent = formattedContent;
        
        message.appendChild(contentPreview);
        message.appendChild(toggleButton);
        message.appendChild(fullContent);
        
        toggleButton.addEventListener('click', () => {
            toggleButton.classList.toggle('active');
            fullContent.style.maxHeight = toggleButton.classList.contains('active') ? `${fullContent.scrollHeight}px` : '0';
            
            if (toggleButton.classList.contains('active')) {
                toggleButton.innerHTML = '折叠响应 <i class="fas fa-chevron-up"></i>';
            } else {
                toggleButton.innerHTML = '查看完整响应 <i class="fas fa-chevron-down"></i>';
            }
        });
    } catch (e) {
        // 不是JSON，直接显示文本
        message.textContent = content;
    }
    aiConversation.appendChild(message);
    aiConversation.scrollTop = aiConversation.scrollHeight;
}

// 显示消息通知
function showMessage(text, type) {
    const message = document.createElement('div');
    message.className = `message-notification message-${type}`;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// 保存对话消息到服务器
async function saveConversationMessage(message) {
    try {
        const response = await fetch('/api/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                designId: message.designId,
                messages: [message]
            })
        });
        
        if (!response.ok) {
            throw new Error('保存对话失败');
        }
    } catch (error) {
        console.error('保存对话消息失败:', error);
    }
}

// 添加消息通知样式
const style = document.createElement('style');
style.textContent = `
    .message-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slide-in 0.3s ease;
    }
    
    .message-success {
        background-color: var(--success);
    }
    
    .message-warning {
        background-color: var(--warning);
    }
    
    .message-danger {
        background-color: var(--danger);
    }
    
    .fade-out {
        animation: fade-out 0.3s ease;
        opacity: 0;
    }
    
    @keyframes slide-in {
        from { bottom: -50px; opacity: 0; }
        to { bottom: 20px; opacity: 1; }
    }
    
    @keyframes fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);



document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById("aiInput");
    const form = document.querySelector('.ai-input-area'); // 或直接获取提交按钮
    const initialHeight = "60px"; // 与CSS中的初始高度一致

    // 动态调整高度
    function adjustHeight() {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    // 初始化 & 输入时调整
    textarea.style.height = initialHeight;
    textarea.addEventListener('input', adjustHeight);

    // 提交后恢复高度
    document.getElementById('aiSubmit').addEventListener('click', function(e) {
        e.preventDefault(); // 如果是表单提交，阻止默认行为
        
        // 这里写你的提交逻辑...
        // console.log('提交内容:', textarea.value);

        // 提交后清空并恢复高度
        textarea.value = '';
        textarea.style.height = initialHeight; // 重置为初始高度
    });
});

const backToTopButton = document.getElementById('back-to-top');
        
// 监听滚动事件
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 600) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// 点击回到顶部
backToTopButton.addEventListener('click', () => {
    scrollToTop(600); // 600ms内完成滚动
});

// 平滑滚动函数
function scrollToTop(duration) {
    const start = window.pageYOffset;
    const startTime = performance.now();
    
    function scrollStep(timestamp) {
        const currentTime = timestamp || performance.now();
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, start * (1 - easeOutCubic(progress)));
        
        if (timeElapsed < duration) {
            window.requestAnimationFrame(scrollStep);
        }
    }
    
    // 缓动函数
    function easeOutCubic(t) {
        return (--t) * t * t + 1;
    }
    
    window.requestAnimationFrame(scrollStep);
}
//模型温度调整
function updateTemperature(val) {
    document.getElementById("temperature-value").textContent = val;
    document.getElementById("model-temperature").value = val;
    console.log('模型温度:', temperaturevalue.value);
}
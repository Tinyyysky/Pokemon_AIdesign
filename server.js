const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3015;

// 中间件
app.use(cors());
// 修改这部分中间件配置
app.use(express.json({ limit: '50mb' }));  // 增加 JSON 请求体大小限制
app.use(express.urlencoded({ limit: '50mb', extended: true }));  // 增加 URL 编码请求体大小限制
app.use(express.static('public'));

// 数据文件路径
const DATA_FILE = path.join(__dirname, 'data', 'designs.json');

// 确保数据目录存在
function ensureDataDirectory() {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

// 初始化数据文件
function initializeDataFile() {
    ensureDataDirectory();
    
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify({
            currentDesign: null,
            designHistory: [],
            apiSettings: {},
            conversations: {}
        }, null, 2));
    } else {
        // 验证现有文件是否有效
        try {
            const content = fs.readFileSync(DATA_FILE, 'utf8').trim();
            if (content) JSON.parse(content);
        } catch (e) {
            // 文件损坏时重建
            fs.writeFileSync(DATA_FILE, JSON.stringify({
                currentDesign: null,
                designHistory: [],
                apiSettings: {},
                conversations: {}
            }, null, 2));
        }
    }
}

// 数据API端点
app.get('/api/data', (req, res) => {
    try {
        const content = fs.readFileSync(DATA_FILE, 'utf8').trim();
        const data = content ? JSON.parse(content) : {
            currentDesign: null,
            designHistory: [],
            apiSettings: {},
            conversations: {}
        };
        
        // 从conversation.json加载对话数据
        const CONVERSATION_FILE = path.join(__dirname, 'data', 'conversation.json');
        let conversations = {};
        try {
            const convContent = fs.readFileSync(CONVERSATION_FILE, 'utf8').trim();
            conversations = convContent ? JSON.parse(convContent).conversations || {} : {};
        } catch (error) {
            console.error('加载对话数据错误:', error);
        }

        res.json({
            currentDesign: data.currentDesign || null,
            designHistory: data.designHistory || [],
            apiSettings: data.apiSettings || {},
            conversations: conversations
        });
    } catch (error) {
        console.error('加载数据错误:', error);
        res.json({
            currentDesign: null,
            designHistory: [],
            apiSettings: {},
            conversations: {}
        });
    }
});

app.post('/api/data', (req, res) => {
    try {
        // 验证并准备数据
        const dataToSave = {
            currentDesign: req.body.currentDesign || null,
            designHistory: req.body.designHistory || [],
            apiSettings: req.body.apiSettings || {}
        };

        // 使用格式化写入，便于调试
        fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2));
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('保存数据错误:', error);
        res.status(500).json({ error: '无法保存数据' });
    }
});

// 代理生成立绘的API
// 保存对话消息
app.post('/api/conversations', (req, res) => {
    try {
        const { designId, messages } = req.body;
        
        if (!designId || !messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: '缺少必要参数' });
        }

        const CONVERSATION_FILE = path.join(__dirname, 'data', 'conversation.json');
        const content = fs.readFileSync(CONVERSATION_FILE, 'utf8').trim();
        const data = content ? JSON.parse(content) : { conversations: {} };

        // 初始化conversations对象如果不存在
        if (!data.conversations) {
            data.conversations = {};
        }

        // 为设计ID初始化对话数组如果不存在
        if (!data.conversations[designId]) {
            data.conversations[designId] = [];
        }

        // 添加新消息
        data.conversations[designId] = [
            ...data.conversations[designId],
            ...messages.map(msg => ({
                ...msg,
                timestamp: new Date().toLocaleString('zh-CN', { 
                    timeZone: 'Asia/Shanghai',
                    hour12: false 
                  })
            }))
        ];

        fs.writeFileSync(CONVERSATION_FILE, JSON.stringify(data, null, 2));
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('保存对话错误:', error);
        res.status(500).json({ error: '无法保存对话' });
    }
});
// 获取指定ID的对话
app.get('/api/conversations/:designId', (req, res) => {
    try {
        const { designId } = req.params;
        
        if (!designId) {
            return res.status(400).json({ error: '缺少designId参数' });
        }

        const CONVERSATION_FILE = path.join(__dirname, 'data', 'conversation.json');
        
        // 检查文件是否存在
        if (!fs.existsSync(CONVERSATION_FILE)) {
            return res.status(404).json({ error: '对话文件不存在' });
        }

        const content = fs.readFileSync(CONVERSATION_FILE, 'utf8').trim();
        const data = content ? JSON.parse(content) : { conversations: {} };
        // 检查是否存在该designId的对话
        if (!data.conversations || !data.conversations[designId]) {
            return res.status(404).json({ 
                error: '未找到指定ID的对话',
                suggestion: '请确认ID是否正确或对话是否已保存'
            });
        }

        // 返回该designId的所有对话
        res.status(200).json({
            status: 'success',
            messages: data.conversations[designId]
        });
    } catch (error) {
        console.error('获取对话错误:', error);
        res.status(500).json({ error: '无法获取对话' });
    }
});
// app.post('/api/generate-art', async (req, res) => {
//     try {
//         const { prompt, apiKey } = req.body;

//         if (!prompt || !apiKey) {
//             return res.status(400).json({ error: '缺少必要参数' });
//         }

//         const requestBody = {
//             header: {
//                 app_id: apiKey,
//             },
//             parameter: {
//                 chat: {
//                     domain: "general",
//                     width: 512,
//                     height: 512,
//                 },
//             },
//             payload: {
//                 message: {
//                     text: [
//                         {
//                             role: "user",
//                             content: prompt,
//                         },
//                     ],
//                 },
//             },
//         };

//         const response = await axios.post(
//             'https://spark-api.cn-huabei-1.xf-yun.com/v2.1/tti',
//             requestBody,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         res.json(response.data);
//     } catch (error) {
//         console.error('代理请求失败:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// 初始化数据文件
initializeDataFile();

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});

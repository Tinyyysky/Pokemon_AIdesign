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
// app.use(express.static(path.join(__dirname, 'dist')));// 静态文件目录

// 数据文件路径
const DATA_FILE = path.join(__dirname, 'data', 'designs.json');
const LIKES_FILE = path.join(__dirname, 'data', 'likes.json');
// 数据文件路径
const COMMENTS_FILE = path.join(__dirname, 'data', 'comments.json');

const POKEMON_NAMES = [
    // 第一世代(151只)
    '妙蛙种子', '妙蛙草', '妙蛙花', '小火龙', '火恐龙',
    '喷火龙', '杰尼龟', '卡咪龟', '水箭龟', '绿毛虫',
    '铁甲蛹', '巴大蝶', '独角虫', '铁壳蛹', '大针蜂',
    '波波', '比比鸟', '大比鸟', '小拉达', '拉达',
    '烈雀', '大嘴雀', '阿柏蛇', '阿柏怪', '皮卡丘',
    '雷丘', '穿山鼠', '穿山王', '尼多兰', '尼多娜',
    '尼多后', '尼多朗', '尼多力诺', '尼多王', '皮皮',
    '皮可西', '六尾', '九尾', '胖丁', '胖可丁',
    '超音蝠', '大嘴蝠', '走路草', '臭臭花', '霸王花',
    '派拉斯', '派拉斯特', '毛球', '摩鲁蛾', '地鼠',
    '三地鼠', '喵喵', '猫老大', '可达鸭', '哥达鸭',
    '猴怪', '火暴猴', '卡蒂狗', '风速狗', '蚊香蝌蚪',
    '蚊香君', '蚊香泳士', '凯西', '勇基拉', '胡地',
    '腕力', '豪力', '怪力', '喇叭芽', '口呆花',
    '大食花', '玛瑙水母', '毒刺水母', '小拳石', '隆隆石',
    '隆隆岩', '小火马', '烈焰马', '呆呆兽', '呆壳兽',
    '小磁怪', '三合一磁怪', '大葱鸭', '嘟嘟', '嘟嘟利',
    '小海狮', '白海狮', '臭泥', '臭臭泥', '大舌贝',
    '刺甲贝', '鬼斯', '鬼斯通', '耿鬼', '大岩蛇',
    '催眠貘', '引梦貘人', '大钳蟹', '巨钳蟹', '霹雳电球',
    '顽皮雷弹', '蛋蛋', '椰蛋树', '卡拉卡拉', '嘎啦嘎啦',
    '飞腿郎', '快拳郎', '大舌头', '瓦斯弹', '双弹瓦斯',
    '独角犀牛', '钻角犀兽', '吉利蛋', '蔓藤怪', '袋兽',
    '墨海马', '海刺龙', '角金鱼', '金鱼王', '海星星',
    '宝石海星', '魔墙人偶', '飞天螳螂', '迷唇姐', '电击兽',
    '鸭嘴火兽', '凯罗斯', '肯泰罗', '鲤鱼王', '暴鲤龙',
    '乘龙', '百变怪', '伊布', '水伊布', '雷伊布',
    '火伊布', '多边兽', '菊石兽', '多刺菊石兽', '化石盔',
    '镰刀盔', '化石翼龙', '卡比兽', '急冻鸟', '闪电鸟',
    '火焰鸟', '迷你龙', '哈克龙', '快龙', '超梦',
    '梦幻',
    
    // 第二世代(100只)
    '菊草叶', '月桂叶', '大竺葵', '火球鼠', '火岩鼠',
    '火暴兽', '小锯鳄', '蓝鳄', '大力鳄', '尾立',
    '大尾立', '咕咕', '猫头夜鹰', '芭瓢虫', '安瓢虫',
    '线球', '阿利多斯', '叉字蝠', '灯笼鱼', '电灯怪',
    '皮丘', '皮宝宝', '宝宝丁', '波克比', '波克基古',
    '天然雀', '天然鸟', '咩利羊', '绵绵', '电龙',
    '美丽花', '玛力露', '玛力露丽', '树才怪', '蚊香蛙皇',
    '毽子草', '毽子花', '毽子棉', '长尾怪手', '大尾怪手',
    '向日种子', '向日花怪', '阳阳玛', '乌波', '沼王',
    '太阳珊瑚', '铁炮鱼', '章鱼桶', '信使鸟', '巨翅飞鱼',
    '盔甲鸟', '戴鲁比', '黑鲁加', '刺龙王', '小小象',
    '顿甲', '多边兽2', '惊角鹿', '图图犬', '无畏小子',
    '战舞郎', '迷唇娃', '电击怪', '鸭嘴宝宝', '大奶罐',
    '幸福蛋', '雷公', '炎帝', '水君', '洛奇亚',
    '凤王', '时拉比',
    
    // 第三至第八世代(约750只)
    '木守宫', '森林蜥蜴', '蜥蜴王', '火稚鸡', '力壮鸡',
    '火焰鸡', '水跃鱼', '沼跃鱼', '巨沼怪', '土狼犬',
    '大狼犬', '蛇纹熊', '直冲熊', '刺尾虫', '甲壳茧',
    '狩猎凤蝶', '盾甲茧', '毒粉蛾', '莲叶童子', '莲帽小童',
    '乐天河童', '长鼻叶', '狡猾天狗', '傲骨燕', '大王燕',
    '拉鲁拉丝', '奇鲁莉安', '沙奈朵', '溜溜糖球', '雨翅蛾',
    '蘑蘑菇', '斗笠菇', '懒人獭', '过动猿', '请假王',
    '土居忍士', '铁面忍者', '脱壳忍者', '咕妞妞', '吼爆弹',
    '爆音怪', '幕下力士', '超力王', '露力丽', '朝北鼻',
    '向尾喵', '优雅猫', '勾魂眼', '大嘴娃', '可可多拉',
    '可多拉', '波士可多拉', '玛沙那', '恰雷姆', '落雷兽',
    '雷电兽', '正电拍拍', '负电拍拍', '电萤虫', '甜甜萤',
    '毒蔷薇', '溶食兽', '吞食兽', '利牙鱼', '巨牙鲨',
    '吼吼鲸', '吼鲸王', '呆火驼', '喷火驼', '煤炭龟',
    '跳跳猪', '噗噗猪', '晃晃斑', '大颚蚁', '超音波幼虫',
    '沙漠蜻蜓', '沙漠奈亚', '梦歌奈亚', '青绵鸟', '七夕青鸟',
    '猫鼬斩', '饭匙蛇', '月石', '太阳岩', '泥泥鳅',
    '鲶鱼王', '龙虾小兵', '铁螯龙虾', '天秤偶', '念力土偶',
    '触手百合', '摇篮百合', '太古羽虫', '太古盔甲', '幼基拉斯',
    '沙基拉斯', '班基拉斯', '基拉祈', '烈空坐', '固拉多',
    '盖欧卡', '拉帝亚斯', '拉帝欧斯', '代欧奇希斯', '草苗龟',
    '树林龟', '土台龟', '小火焰猴', '猛火猴', '烈焰猴',
    '波加曼', '波皇子', '帝王拿波', '姆克儿', '姆克鸟',
    '姆克鹰', '大牙狸', '大尾狸', '圆法师', '音箱蟀',
    '小猫怪', '勒克猫', '伦琴猫', '含羞苞', '罗丝雷朵',
    '头盖龙', '战槌龙', '盾甲龙', '护城龙', '结草儿',
    '结草贵妇', '绅士蛾', '三蜜蜂', '蜂女王', '帕奇利兹',
    '泳圈鼬', '浮潜鼬', '樱花宝', '樱花儿', '无壳海兔',
    '海兔兽', '双尾怪手', '飘飘球', '附和气球', '卷卷耳',
    '长耳兔', '梦妖魔', '乌鸦头头', '魅力喵', '东施喵',
    '铃铛响', '臭鼬噗', '坦克臭鼬', '铜镜怪', '青铜钟',
    '利欧路', '路卡利欧', '沙河马', '河马兽', '钳尾蝎',
    '龙王蝎', '不良蛙', '毒骷蛙', '尖牙笼', '荧光鱼',
    '霓虹鱼', '小球飞鱼', '雪笠怪', '暴雪王', '玛狃拉',
    '自爆磁怪', '大舌舔', '超甲狂犀', '巨蔓藤', '电击魔兽',
    '鸭嘴炎兽', '波克基斯', '远古巨蜓', '叶伊布', '冰伊布',
    '天蝎王', '象牙猪', '多边兽Z', '艾路雷朵', '大朝北鼻',
    '黑夜魔灵', '雪妖女', '洛托姆', '由克希', '艾姆利多',
    '亚克诺姆', '帝牙卢卡', '帕路奇亚', '席多蓝恩', '雷吉奇卡斯',
    '骑拉帝纳', '克雷色利亚', '达克莱伊', '谢米', '阿尔宙斯',
    '比克提尼', '雷希拉姆', '捷克罗姆', '酋雷姆', '凯路迪欧',
    '美洛耶塔', '盖诺赛克特', '蒂安希', '哲尔尼亚斯', '伊裴尔塔尔',
    '基格尔德', '胡帕', '波尔凯尼恩', '玛机雅娜', '玛夏多',
    '捷拉奥拉', '卡璞·鸣鸣', '卡璞·蝶蝶', '卡璞·哞哞', '卡璞·鳍鳍',
    '科斯莫古', '科斯莫姆', '索尔迦雷欧', '露奈雅拉', '虚吾伊德',
    '爆肌蚊', '费洛美螂', '电束木', '铁火辉夜', '纸御剑',
    '恶食大王', '奈克洛兹玛', '玛俐', '苍响', '藏玛然特',
    '无极汰那', '熊徒弟', '武道熊师', '萨戮德', '雷吉艾勒奇',
    '雷吉铎拉戈', '雪暴马', '灵幽马', '蕾冠王', '眷恋云',
    '诡角鹿', '劈斧螳螂', '月月熊', '幽尾玄鱼', '大狃拉',
    '万针鱼', '弃世猴', '红莲铠骑', '苍炎刃鬼', '振翼发',
    '爬地翅', '沙铁皮', '铁脖颈', '铁包袱', '铁臂膀',
    '铁荆棘', '铁毒蛾', '铁武者', '铁磐岩', '铁头壳',
    '故勒顿', '密勒顿', '厄诡椪', '太乐巴戈斯',
];
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
    if (!fs.existsSync(LIKES_FILE)) {
        fs.writeFileSync(LIKES_FILE, JSON.stringify({ likes: {} }, null, 2));
    }
    if (!fs.existsSync(COMMENTS_FILE)) {
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify({}, null, 2));
    }
    
}
// 获取所有点赞数据
function getLikesData() {
    try {
        const content = fs.readFileSync(LIKES_FILE, 'utf8').trim();
        return content ? JSON.parse(content).likes : {};
    } catch (error) {
        console.error('读取点赞数据错误:', error);
        return {};
    }
}
// 点赞/取消点赞
app.post('/api/likes/:designId', (req, res) => {
    try {
        const { designId } = req.params;
        const { clientId } = req.body; // 从客户端生成的唯一ID

        if (!clientId) {
            return res.status(400).json({ error: '缺少客户端ID' });
        }

        const likesData = getLikesData();
        
        // 初始化设计ID的点赞数据
        if (!likesData[designId]) {
            likesData[designId] = {
                count: 0,
                clientIds: []
            };
        }

        const designLikes = likesData[designId];
        const clientIndex = designLikes.clientIds.indexOf(clientId);

        if (clientIndex === -1) {
            // 添加点赞
            designLikes.count++;
            designLikes.clientIds.push(clientId);
        } else {
            // 取消点赞
            designLikes.count--;
            designLikes.clientIds.splice(clientIndex, 1);
        }

        fs.writeFileSync(LIKES_FILE, JSON.stringify({ likes: likesData }, null, 2));
        
        res.json({
            status: 'success',
            likeCount: designLikes.count,
            isLiked: designLikes.clientIds.includes(clientId)
        });

    } catch (error) {
        console.error('点赞操作错误:', error);
        res.status(500).json({ error: '点赞操作失败' });
    }
});

// 获取设计的点赞数
app.get('/api/likes/:designId', (req, res) => {
    try {
        const { designId } = req.params;
        const { clientId } = req.query;
        const likesData = getLikesData();
        
        const designLikes = likesData[designId] || { count: 0, clientIds: [] };
        
        res.json({
            likeCount: designLikes.count,
            isLiked: clientId ? designLikes.clientIds.includes(clientId) : false
        });
    } catch (error) {
        console.error('获取点赞数据错误:', error);
        res.status(500).json({ error: '获取点赞数据失败' });
    }
});
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
// 生成随机用户名
function generateRandomUsername() {
    const randomPokemon = POKEMON_NAMES[Math.floor(Math.random() * POKEMON_NAMES.length)];
    const randomNum = Math.floor(100 + Math.random() * 900); // 100-999的随机数
    return `${randomPokemon}${randomNum}`;
}

// 获取特定designId的所有评论
app.get('/api/comments/:designId', (req, res) => {
    try {
        const { designId } = req.params;
        const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
        const allComments = JSON.parse(data);
        
        res.json(allComments[designId] || []);
    } catch (err) {
        console.error('获取评论失败:', err);
        res.status(500).json({ error: '获取评论失败' });
    }
});

// 添加新评论到特定designId
app.post('/api/comments/:designId', (req, res) => {
    try {
        const { designId } = req.params;
        const { content, username, clientId } = req.body;
        
        if (!content) {
            return res.status(400).json({ error: '评论内容不能为空' });
        }
        if (!clientId) {
            return res.status(400).json({ error: '缺少客户端ID' });
        }

        // 使用用户提供的用户名或生成随机用户名
        const finalUsername = username || generateRandomUsername();
        let count=0
        // 读取现有评论
        const newComment = {
            id: Date.now().toString(), // 简单的时间戳ID
            clientId, // 客户端唯一标识
            username: finalUsername,
            content,
            timestamp: new Date().toISOString(),
            likes: 0,
            count,
        };

        // 读取现有评论
        const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
        const allComments = JSON.parse(data);
        
        // 初始化该designId的评论数组
        if (!allComments[designId]) {
            allComments[designId] = [];
        }
        count=allComments[designId].length
        newComment.count=count+1
        // 添加新评论
        allComments[designId].push(newComment);
        
        // 保存回文件
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify(allComments, null, 2));
        
        res.status(201).json(newComment);
    } catch (err) {
        console.error('添加评论失败:', err);
        res.status(500).json({ error: '添加评论失败' });
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
module.exports = app;

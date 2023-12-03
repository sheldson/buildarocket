// api/whois.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async (request, response) => {
    const { domain, suffix } = request.query;

    // 验证输入。
    if (!domain || !suffix) {
        response.status(400).json({ error: 'Missing domain or suffix in query parameters' });
        return;
    }

    try {
        // 向 WHOIS 查询接口发起请求。
        const whoisResponse = await fetch(`https://whois.freeaiapi.xyz/?name=${domain}&suffix=${suffix}`);
        if (whoisResponse.ok) {
            // 得到 WHOIS 信息并返回。
            const whoisData = await whoisResponse.json();
            response.status(200).json(whoisData);
        } else {
            // 出现问题时返回错误。
            response.status(whoisResponse.status).json({ error: 'Error fetching WHOIS data' });
        }
    } catch (error) {
        // 处理可能的网络错误。
        response.status(500).json({ error: error.message });
    }
};
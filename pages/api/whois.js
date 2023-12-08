// api/whois.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {
  const { domain, suffix } = req.query;

  // 验证输入
  if (!domain || !suffix) {
    res.status(400).json({ error: 'Missing domain or suffix in query parameters' });
    return;
  }

  try {
    // 向 WHOIS 查询接口发起请求。
    const whoisResponse = await fetch(`https://whois.freeaiapi.xyz/?name=${domain}&suffix=${suffix}`);
    
    if (!whoisResponse.ok) {
      // 如果响应状态码不是 OK（2xx），则抛出错误。
      throw new Error(`WHOIS API responded with status: ${whoisResponse.status}`);
    }
    
    // 得到 WHOIS 信息并返回。
    const whoisData = await whoisResponse.json();
    res.status(200).json(whoisData);
  } catch (error) {
    // 处理可能的网络错误。
    res.status(500).json({ error: error.message });
  }
}
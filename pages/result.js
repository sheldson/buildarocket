import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Result() {
  const router = useRouter();
  const { domainName, suffix } = router.query;
  const [whoisData, setWhoisData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!domainName || !suffix) {
      return;
    }

    // 从 localStorage 中获取当前查询的缓存
    const cachedData = getCachedData(domainName, suffix);

    if (cachedData) {
      // 如果缓存存在且仍然有效，则直接使用缓存的数据
      setWhoisData(cachedData);
    } else {
      // 如果没有缓存或缓存已经过期，发起新的 API 请求
      setLoading(true);
      fetch(`/api/whois?domain=${domainName}&suffix=${suffix}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.status !== 'error') {
            // 如果查询成功，将结果存入缓存
            cacheData(domainName, suffix, data);
          }
          setWhoisData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [domainName, suffix]);

  // 存储数据到 localStorage 的函数（24小时有效）
  function cacheData(domain, suffix, data) {
    const now = new Date().getTime();
    const item = {
      expiry: now + 24 * 60 * 60 * 1000, // 24小时
      data: data
    };
    localStorage.setItem(`${domain}_${suffix}`, JSON.stringify(item));
  }

  // 从 localStorage 获取数据的函数
  function getCachedData(domain, suffix) {
    const cacheItem = localStorage.getItem(`${domain}_${suffix}`);
    if (!cacheItem) return null;

    const { expiry, data } = JSON.parse(cacheItem);
    const now = new Date().getTime();

    // 清除过期的数据
    if (now > expiry) {
      localStorage.removeItem(`${domain}_${suffix}`);
      return null;
    }

    return data;
  }

  return (
    <div>
      <h1>Result Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {whoisData ? (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Domain Name</th>
                <td>{whoisData.domain}</td>
              </tr>
              <tr>
                <th>Suffix</th>
                <td>{whoisData.suffix}</td>
              </tr>
              <tr>
                <th>Creation Date</th>
                <td>{whoisData.creation_datetime}</td>
              </tr>
              <tr>
                <th>Expiry Date</th>
                <td>{whoisData.expiry_datetime}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{whoisData.available ? 'Available' : 'Not available'}</td>
              </tr>
              {/* 添加更多的tr来显示其他信息 */}
            </tbody>
          </table>
          <div>
            <h3>Whois Information</h3>
            <pre>{whoisData.info}</pre>
          </div>
        </div>
      ) : null}
    </div>
  );
}
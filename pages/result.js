import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Result() {
  const router = useRouter();
  const { domainName, suffix } = router.query;
  const [whoisData, setWhoisData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 确保 domainName 和 suffix 都存在
    if (domainName && suffix) {
      // 开始 API 调用
      fetch(`/api/whois?domain=${domainName}&suffix=${suffix}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(setWhoisData)
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [domainName, suffix]);

  return (
    <div>
      <h1>Result Page</h1>
      {error && <p>Error: {error}</p >}
      {whoisData ? (
        <>
          <p>Domain Name: {whoisData.domain}</p >
          <p>Suffix: {whoisData.suffix}</p >
          {/* 这里可以显示更多的 whoisData 信息 */}
        </>
      ) : (
        <p>Loading...</p >
      )}
    </div>
  );
}

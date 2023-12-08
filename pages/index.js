import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const [domainName, setDomainName] = useState('');
  // 设置默认后缀为 '.com'
  const [domainSuffix, setDomainSuffix] = useState('com'); // 默认为 .com
  const router = useRouter();

  const handleCheckDomain = () => {
    if (!domainName) {
      alert("Please enter a domain name.");
      return;
    }

    // Redirect to the result page with query parameters
    router.push(`/result?domainName=${domainName}&suffix=${domainSuffix}`);
  };

  return (
    <div>
      <h1>这个域名注册了吗？</h1>

      <div>
        <label htmlFor="domainName">域名:</label>
        <input
          type="text"
          id="domainName"
          placeholder="输入域名名称"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
        />

        <label htmlFor="domainSuffix">后缀:</label>
        <select
          id="domainSuffix"
          value={domainSuffix}
          onChange={(e) => setDomainSuffix(e.target.value)}
        >
          <option value="com">.com</option>
          <option value="net">.net</option>
          <option value="org">.org</option>
          <option value="me">.me</option>
          <option value="xyz">.xyz</option>
          <option value="info">.info</option>
          <option value="io">.io</option>
          <option value="co">.co</option>
          <option value="ai">.ai</option>
          <option value="biz">.biz</option>
          <option value="us">.us</option>
        </select>

        <button onClick={handleCheckDomain}>立即查询</button>
      </div>
    </div>
  );
}
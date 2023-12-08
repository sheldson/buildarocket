import { useState, useEffect } from 'react'; // 引入 useEffect
import { useRouter } from 'next/router';

export default function Index() {
  const [domainName, setDomainName] = useState('');
  const [domainSuffix, setDomainSuffix] = useState('com'); // 默认为 .com
  const router = useRouter();

  // 在组件加载到DOM后打印当前路由
  useEffect(() => {
    console.log('The current route is:', router.pathname);
    // 你可以选择添加router.query来打印查询参数
  }, []); // 空依赖数组，这样console.log只会在组件初次加载时执行一次

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
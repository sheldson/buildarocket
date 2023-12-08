import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Result() {
  const router = useRouter();
  const { domainName, suffix } = router.query;
  const [whoisData, setWhoisData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (domainName && suffix) {
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
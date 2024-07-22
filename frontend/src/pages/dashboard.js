import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stocks, setStocks] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch('/api/dashboard/');
      const json = await response.json();
      if (response.ok) {
        setStocks(json);
      }
    };
    fetchStocks();
  }, []);

  useEffect(() => {
    console.log('Updated stocks state:', stocks);
  }, [stocks]); // This will log whenever 'stocks' state is updated

  const formatMarketCap = (value) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(3)} T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(3)} B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(3)} M`;
    } else {
      return `$${value}`;
    }
  };

  const sortData = (key) => {
    if (!stocks) return;

    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    console.log("!!!")


    const sortedData = [...stocks.companiesData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    console.log("???")


    setSortConfig({ key, direction });
    setStocks({ ...stocks, companiesData: sortedData });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '⇅';
  };

  return (
    <div className="dashboard">
      <h2>Largest Companies by Market Cap</h2>
      {stocks ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th onClick={() => sortData('rank')}>Rank ⇅</th>
              <th onClick={() => sortData('name')}>
                Name {getSortIcon('name')}
              </th>
              <th onClick={() => sortData('symbol')}>
                Symbol {getSortIcon('symbol')}
              </th>
              <th onClick={() => sortData('marketCap')}>
                Market Cap {getSortIcon('marketCap')}
              </th>
              <th onClick={() => sortData('currentPrice')}>
                Price {getSortIcon('currentPrice')}
              </th>
              <th onClick={() => sortData('percentageChange')}>
                Today's Change {getSortIcon('percentageChange')}
              </th>
              <th onClick={() => sortData('country')}>
                Country {getSortIcon('country')}
              </th>
            </tr>
          </thead>
          <tbody>
            {stocks.companiesData.map((company, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={company.logo} alt={`${company.name} logo`} width="30" style={{ marginRight: '10px' }} />
                  {company.name}
                </td>
                <td>{company.symbol}</td>
                <td>{formatMarketCap(company.marketCap)}</td>
                <td>${company.currentPrice.toFixed(2)}</td>
                <td className={parseFloat(company.percentageChange) > 0 ? 'positive-change' : 'negative-change'}>
                  {company.percentageChange}
                </td>
                <td>{company.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stocks, setStocks] = useState(null);
  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch("/stocks");
      console.log(response[0] + "1" + response[1]);
      const json = await response.json();
      console.log(json[0] + "2" + json[1]);
      if (response.ok) {
        setStocks(json);
      }
    };
    fetchStocks();
  }, []);

  useEffect(() => {
    console.log("Updated stocks state:", stocks);
  }, [stocks]); // This will log whenever 'stocks' state is updated

  const formatMarketCap = (value) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(3)} T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(3)} B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(3)} T`;
    } else {
      return `$${value}`;
    }
  };

  return (
    <div className="dashboard">
      <h2>Largest Companies by Market Cap</h2>
      {stocks ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Today's Change</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {stocks.companiesData.map((company, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width="30"
                    style={{ marginRight: "10px" }}
                  />
                  {company.name}
                </td>
                <td>{company.symbol}</td>
                <td>{formatMarketCap(company.marketCap)}</td>
                <td>${company.currentPrice.toFixed(2)}</td>
                <td
                  className={
                    parseFloat(company.percentageChange) > 0
                      ? "positive-change"
                      : "negative-change"
                  }
                >
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

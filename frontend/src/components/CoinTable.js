import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from '../components/coin';  // Ensure the import matches the actual file name

function CoinTable() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [totalMarketCap, setTotalMarketCap] = useState(0);// useState for total number of market cap
    const [currentPage, setCurrentPage] = useState(1);//useState for current page in the table
    const coinsPerPage = 20;//set num og coins in the table per page

    useEffect(() => {
        axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            )
            .then(res => {
                const coinsData = res.data;
                setCoins(coinsData);

                // Compute total market cap
                const totalCap = coinsData.reduce((sum, coin) => sum + coin.market_cap, 0);
                setTotalMarketCap(totalCap);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleChange = e => {
        setSearch(e.target.value);
    };

    const handleSort = field => {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedCoins = [...coins].sort((a, b) => {
            if (field === 'name' || field === 'symbol') {
                return newSortOrder === 'asc'
                    ? a[field].localeCompare(b[field])
                    : b[field].localeCompare(a[field]);
            } else {
                return newSortOrder === 'asc'
                    ? a[field] - b[field]
                    : b[field] - a[field];
            }
        });
        setSortField(field);
        setSortOrder(newSortOrder);
        setCoins(sortedCoins);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);//calculate num of pages of the table

    //change the current table page
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    //function create a format for the total market cap number 
    const formatNumber = num => {
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return num.toString();
    };

    const currentCoins = filteredCoins.slice(
        (currentPage - 1) * coinsPerPage,
        currentPage * coinsPerPage
    );

    return (
        <div className='coin-app'>
            <div className='coin-header'>
                Largest Coins by Market Cap
            </div>
            <div className='coin-summary'>
                Total Coins: {filteredCoins.length} | Total Market Cap: ${formatNumber(totalMarketCap)}
            </div>
            <div className='coin-search'>
                <h1 className='coin-text'>Search a currency by name</h1>
                <input
                    className='coin-input'
                    type='text'
                    onChange={handleChange}
                    placeholder='Search by name'
                />
            </div>
            <table className='coin-table'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th className={`sortable ${sortField === 'name' ? `sorted-${sortOrder}` : ''}`} onClick={() => handleSort('name')}>
                            Name
                        </th>
                        <th className={`sortable ${sortField === 'symbol' ? `sorted-${sortOrder}` : ''}`} onClick={() => handleSort('symbol')}>
                            Symbol
                        </th>
                        <th className={`sortable ${sortField === 'current_price' ? `sorted-${sortOrder}` : ''}`} onClick={() => handleSort('current_price')}>
                            Price
                        </th>
                        <th className={`sortable ${sortField === 'market_cap' ? `sorted-${sortOrder}` : ''}`} onClick={() => handleSort('market_cap')}>
                            Market Cap
                        </th>
                        <th className={`sortable ${sortField === 'total_volume' ? `sorted-${sortOrder}` : ''}`} onClick={() => handleSort('total_volume')}>
                            Volume
                        </th>
                        <th className={`sortable ${sortField === 'price_change_percentage_24h' ? `sorted-${sortOrder}` : ''}`} onClick={() => handleSort('price_change_percentage_24h')}>
                            Price Change
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentCoins.map(coin => (
                        <tr key={coin.id}>
                            <td><img src={coin.image} alt={coin.name} style={{ width: '30px' }} /></td>
                            <td>{coin.name}</td>
                            <td>{coin.symbol}</td>
                            <td>${coin.current_price}</td>
                            <td>${coin.market_cap.toLocaleString()}</td>
                            <td>${coin.total_volume.toLocaleString()}</td>
                            <td className={coin.price_change_percentage_24h < 0 ? 'red' : 'green'}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='pagination'>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='pagination-button'
                >
                    &#9664; {/* Left arrow */}
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='pagination-button'
                >
                    &#9654; {/* Right arrow */}
                </button>
            </div>
        </div>
    );
}

export default CoinTable;

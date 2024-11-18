// src/components/Search.tsx
import React, { useState } from 'react';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!query) return;

        try {
            const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&json=true`);
            const data = await response.json();
            setResults(data.products || []);
            setError('');
        } catch (err) {
            setError('Failed to fetch data');
            setResults([]);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for food..."
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            <ul>
                {results.map((product, index) => (
                    <li key={index}>{product.product_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
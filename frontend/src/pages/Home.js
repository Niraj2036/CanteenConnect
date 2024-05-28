import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

function Home() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Handle search submit logic here
    console.log("Searching for: ", searchInput);
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <img src="../styles/logo.png" alt="Logo" />
          <span>Site Name</span>
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <button onClick={handleSearchSubmit}>
            <img src="../assets/user-icon.png" alt="Search" />
          </button>
        </div>
        <div className={styles.navButtons}>
          <div className={styles.categoryButton}>
            <span>Categories</span>
            <div className={styles.dropdownContent}>
              <a href="#">Snacks</a>
              <a href="#">Meals</a>
              <a href="#">Beverages</a>
              <a href="#">Desserts</a>
            </div>
          </div>
          <button>Cart</button>
          <button>My Account</button>
        </div>
      </header>
      <div className={styles.bodyContent}>
        <div className={styles.productCard}></div>
      </div>
    </div>
  );
}

export default Home;

// UnauthorizedPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>403 Forbidden</h1>
            <p style={styles.message}>You do not have permission to view this page.</p>
            <Link to="/" style={styles.link}>Go to Home Page</Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa'
    },
    header: {
        fontSize: '3rem',
        color: '#dc3545'
    },
    message: {
        fontSize: '1.5rem',
        margin: '1rem 0'
    },
    link: {
        fontSize: '1rem',
        color: '#007bff',
        textDecoration: 'none'
    }
};

export default UnauthorizedPage;

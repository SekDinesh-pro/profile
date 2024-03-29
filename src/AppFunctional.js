import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import axios from 'axios';
import UsersList from './Components/UsersList';


const AppFunctional = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
          try {
            setIsLoading(true);
            const response = await axios.get(
              `https://randomuser.me/api/?page=${page}&results=10`
            );
      
            // setUsers((users) => [...users, ...response.data.results]);
            setUsers([...users, ...response.data.results]);
            console.log("Data ==>", [...users, ...response.data.results]);
            console.log("Data Reload");
            setErrorMsg('');
          } catch (error) {
            setErrorMsg('Error while loading data. Try again later.');
          } finally {
            setIsLoading(false);
          }
        };
      
        loadUsers();
      }, [page]);
    
      const loadMore = () => {
        setPage((page) => page + 1);
      };
    
      return (
        <div className="main-section">
          <Header />
          <UsersList users={users} />
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <div className="load-more">
            <button onClick={loadMore} className="btn-grad">
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </div>
      );
    };
    
    export default AppFunctional;
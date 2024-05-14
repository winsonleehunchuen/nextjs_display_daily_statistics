"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSelector from '../components/UserSelector';
import DailyStatistics from '../components/DailyStatistics';
import 'bootstrap/dist/css/bootstrap.min.css';

interface User {
  UserName: string;
  UserID: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user list from API
    axios.get<User[]>('https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserList')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, []);

  const handleUserSelect = (userId: string) => {
    const user = users.find(user => user.UserID === userId);
    setSelectedUser(user || null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">User Daily Statistics</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <UserSelector users={users} onSelect={handleUserSelect} />
        </div>
      </div>
      {selectedUser && (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <DailyStatistics user={selectedUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import React from 'react';

interface UserSelectorProps {
  users: { UserName: string; UserID: string }[];
  onSelect: (userId: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ users, onSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor="userSelect">Select User:</label>
      <select id="userSelect" className="form-control" onChange={handleChange}>
        <option value="">Select...</option>
        {users.map(user => (
          <option key={user.UserID} value={user.UserID}>{user.UserName}</option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;

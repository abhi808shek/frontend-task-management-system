import { use, Suspense } from 'react';
import axios from 'axios';

const fetchUsers = async () => {
  const response = await axios.get("https://api.escuelajs.co/api/v1/users");
  return response.data;
};

// Initiate the promise OUTSIDE the component to prevent infinite loops
const usersPromise = fetchUsers();
console.log("usersPromise ",usersPromise)
function UserList() {
  // 2. Pass the Promise directly into use()
  const newData = use(usersPromise);
  
  console.log("newData", newData);

  return (
    <ul className='bg-pink-500'>
      {newData.map(user => (
        <>
        <img src={user.avatar} />
        <li className='bg-red-400' key={user.id}>{user.name}</li>
        </>
      ))}
    </ul>
  );
}

// 3. Components using use() must be wrapped in Suspense
export default function App() {
  return (
    <Suspense fallback={<p>Loading users...</p>}>
      <UserList />
    </Suspense>
  );
}
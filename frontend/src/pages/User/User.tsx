import React, {useEffect, useState} from 'react';
import './users.scss'

interface Useri {
    "id":string,
    "Email":string,
    "userName":string
}

function User()  {
    const [users, setUsers] = useState([]);
    console.log("users:  ",users)

    const handleDelete = async (index:number, id:string) =>{
        const response = await fetch('/user/:' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
            },

        });
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
    }

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('There was an error fetching users', error);
            }
        }
        fetchUsers();
    }, []);

    return (
        <ul className="user-list">
            {
                users?.map((user:Useri, index:number) =>
                <li key={index}>
                    {user.id} {user.Email}

                    <button className="deleteButton" onClick={() => handleDelete(index, user.id)}>Delete</button>
                </li>

                )
            }
        </ul>
    );
}
export default User


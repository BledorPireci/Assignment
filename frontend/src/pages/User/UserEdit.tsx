import React, {useState} from 'react';
import "./userEdit.scss"

function UserEdit()  {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const handleNameChange = (event:any) => {
        setFormData({ ...formData, name: event.target.value });
    };

    const handleEmailChange = (event:any) => {
        setFormData({ ...formData, email: event.target.value });
    };
    const handleSubmit = (event:any) => {
        event.preventDefault();
    };
    return (
        <div>
            <div className="register-card">
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="name">
                        Name
                        <input type="text" id="name" name="name" placeholder="Enter your name"
                               value={formData.name}
                               onChange={handleNameChange}
                        />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input type="email" id="email" name="email" placeholder="Enter your email"
                               value={formData.email}
                               onChange={handleEmailChange}
                        />
                    </label>
                    <button type="submit" >Save</button>
                </form>
            </div>
        </div>

    );
}
export default UserEdit;

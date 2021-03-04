import React, {useState} from 'react';
import CustomInput from "components/CustomInput/CustomInput.js";
// import { dataContext } from 'components/context/DataContext';
import Button from '@material-ui/core/Button';
// /api/users/verify/viamail.php

export default function ChangePassword() {
    //   const { PatchPost } = useContext(dataContext)
	
	const [changePassword, setChangePassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setChangePassword({...changePassword, [e.target.name]: e.target.value})
    }

    // 	const handleSubmit = (e) => {
    // 		e.preventDefault();

    // 		PatchPost(posts.title, posts.content, post.id)

    // 		setChangePassword({
    // 		currentPassword: "",
            // newPassword: "",
            // confirmPassword: "",
    // 		})
        
    // 	}
    return (
        <div style={{width: "40rem", marginTop: "0", paddingTop: "0"}}>
            <CustomInput
                labelText="Current Password"
                id="current-password"
                inputProps={{
                    type: "password",
                    name: "currentPassword",
                    onChange: (e) => handleChange(e),
                }}
                formControlProps={{
                    fullWidth: true
                }}
            />
            <CustomInput
                labelText="New Password"
                id="new-password"
                inputProps={{
                    type: "password",
                    name: "newPassword",
                    onChange: (e) => handleChange(e),
                }}
                formControlProps={{
                    fullWidth: true
                }}
            />
            <CustomInput
                labelText="Confirm Password"
                id="confirm-password"
                inputProps={{
                    type: "password",
                    name: "confirmPassword",
                    onChange: (e) => handleChange(e),
                }}
                formControlProps={{
                    fullWidth: true
                }}
            />
            <Button variant="contained" color="secondary">Save</Button>
        </div>
    )
}

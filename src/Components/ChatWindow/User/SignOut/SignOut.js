import { Button } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from "react";
import "./signOut.css";
import { useDispatch, useSelector } from "react-redux";
import { DARKMAIN } from "../../../../Theme/colorConstant";
import { logout } from "../../../../api/auth";
import { useHistory } from "react-router";

function SignOut({ setMenuOpen }) {
  const history = useHistory();

  const dispacth = useDispatch()
  const {isNightMode,auth_user } = useSelector((store) => {
    return {
      isNightMode:store.app.mode || false,
      auth_user: store.auth.auth_user || {},
    }
  });
  const signOut = async() => {
    try {
      const response = await dispacth(logout({data:{user_id:auth_user.elsemployees_empid}}));
      history.replace('/');
    }
    catch(err){
      console.log(error)
    }
  };

  return (
    <div className="signOut"  style={{background: isNightMode ? DARKMAIN: "#eee"}}>
      <div className="signOut__Message">
        <p>Do you want to Sign Out ? </p>
      </div>

      <div className="signOut__Btn">
        <Button onClick={signOut} color="primary">Yes</Button>
        <Button
          color="primary"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          No
        </Button>
      </div>
    </div>
  );
}

export default SignOut;

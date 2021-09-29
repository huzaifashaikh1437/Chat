import React, { useEffect, useState } from "react";
import { Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import "./searchBar.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserSearchResult, setSearchText } from "../../../Redux/actions/app";
import { DARKMAIN } from "../../../Theme/colorConstant";

function SearchBar() {
  
  const { auth_user,isNightMode } = useSelector((store) => {
    return {
      auth_user: store.auth.auth_user || {},
      isNightMode:store.app.mode || false
    }
  });
  const [users, setUsers] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post("/api/bwccrm/searchUser", {
        loginuser_name: auth_user?.elsemployees_empid,
        input: users,
        user_id: auth_user?.elsemployees_empid,
      })
      .then((res) => {
        dispatch(setUserSearchResult(res.data.records));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);
  return (
    <div className="searchBar" style={{border: isNightMode ?"1px solid #fff" : "1px solid #267396"}}>
      <input
        style={{background: isNightMode ? DARKMAIN : "#fff", color:isNightMode ? "#fff": "#000"}}
        className="searchBarInput"
        placeholder="Search People"
        value={users}
        onChange={(e) => {
          setUsers(e.target.value);
          dispatch(setSearchText(e.target.value));
        }}
      />
      {users ? (
        <ClearIcon
          style={{color:isNightMode ? "#fff" : "#267396"}}
          onClick={() => {
            setUsers("");
            dispatch(setSearchText(""));
          }}
        />
      ) : (
        <SearchIcon style={{color:isNightMode ? "#fff" : "#267396"}} />
      )}
    </div>
  );
}

export default SearchBar;

import { useEffect, useState } from "react";
import AxiosRepository from "../axiosRepo/axiosRepository";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    AxiosRepository.fetchUsers().then((result) => console.log(result));
  }, []);

  return <></>;
};

export default Users;

import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../Components/UseContext'


function Allusers() {
    const {categoryName}=useContext(AppContext)
    const [users,setUsers]=useState([])

    useEffect(()=>{
        const fetchData= async()=>{
            try {
                const data = await fetch(`http://localhost:5000/api/get/admin`)
                if (!data){
                    console.log('data is not send by backend')
                }
                const datajson= await data.json()
                setUsers(datajson)
                console.log(users)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])
    
    return (
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Identifier</th>
                <th>Phone</th>
                <th>City</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.identifier}</td>
                  <td>{user.addresses[0]?.phone || "N/A"}</td>
                  <td>{user.addresses[0]?.city || "N/A"}</td>
                  <td>{user.addresses[0]?.area || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
      );
    }
export default Allusers;
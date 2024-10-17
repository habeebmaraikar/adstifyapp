"use client"; // Add this to use hooks

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function RandomUser() {
  const [RandomUser, setRandomUser] = useState([]);

  useEffect(() => {
    const fetchRandomUser = async () => {
      try {
        const response = await axios.get(`/api/randomuser`);
        console.log(response.data, "rdata");
        setRandomUser(response.data);
      } catch (error) {
        console.error('Error fetching weather', error);
      }
    };

      fetchRandomUser();

  }, [RandomUser]);

 
  return (
    <>
    <div className="container">

       <div className="row justify-content-center align-self-center">
            
            <div className="col-12 mtop text-center">
              <h1>Adstify Random User</h1>
            </div>
            
            <div className="row">
              {/* Check if randdom users are not yet available and show Loading... */}
              {RandomUser.length === 0 && <p className="text-center">Loading...</p>}

                {RandomUser.length > 0  && RandomUser.map((user) => (
                    <div className="col-md-6 col-lg-4 mtop" key={user.email}>
                        <div className="card">
                              <div className="card-content">
                                    {user.picture && user.picture.large ? (
                                      <img src={user.picture.large} className="img-fluid" width="100%" height="auto" alt={user.name.first}/>
                                    ) : (
                                      <img src={user.picture.medium} className="img-fluid" width="100%" height="auto" alt={user.name.first}/>
                                    )}
                                       <h2>
                                       {user.name.title} {user.name.first} {user.name.last}
                                      </h2>
                                      <p>Age: {user.dob.age} </p>
                                      <p>Gender: {user.gender} </p>
                                      <p>Email: {user.email} </p>
                                      <p>Phone: {user.phone} </p>
                              </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>

    </div>

    </>
  );
}

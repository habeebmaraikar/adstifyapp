"use client"; // Add this to use hooks

import axios from 'axios';
import { useEffect, useState, useLayoutEffect } from 'react';

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

    // Fetch users initially
    fetchRandomUser();

    // Set interval to fetch users every 2 minutes (120000 ms)
    const intervalId = setInterval(fetchRandomUser, 60000); //1 minute

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, []);


    // Scroll animation effect
    useLayoutEffect(() => {
      const elements = document.querySelectorAll(".randomusers");
      const windowHeight = window.innerHeight;
      const elementVisible = 100;
  
      const revealOnScroll = () => {
        elements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          
          if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
          } else {
            element.classList.remove('visible');
          }
        });
    };
  
      if(elements.length>0){
        // Trigger revealOnScroll on load
        //revealOnScroll();
        setTimeout(revealOnScroll, 0);
  
        // Add scroll event listener
        window.addEventListener("scroll", revealOnScroll);
      }
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("scroll", revealOnScroll);
      };
  
    }, [RandomUser]); // Runs once when the component mounts

 
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

                {RandomUser.length > 0  && RandomUser.map((user, index) => (
                    <div className="col-md-6 col-lg-4 randomusers" key={index}>
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

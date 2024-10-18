"use client" ; // Add this to use hooks

import Image from "next/image";
import { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';


export default function Topstories() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('world'); // Default tab
  const [loading, setLoading] = useState(false); 

  //tooltip to show short description - abstract
  const [tooltip, setTooltip] = useState({ visible: false, content: '', articleUrl: '' });

  const handleMouseEnter = (content, url) => {
    setTooltip({ visible: true, content, articleUrl: url });
  };
  
  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: '', articleUrl: '' });
  };

  //arts, automobiles, books/review, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world

  const tabs = ['world', 'business', 'science', 'fashion', 'sports', 'health', 'technology', 'politics', 'travel'];


  const timeDifference = (dateString) => {
      // Convert the provided date string into a Date object
      const givenDate = new Date(dateString);
      
      // Get the current date and time
      const currentDate = new Date();
      
      // Calculate the difference in milliseconds
      const diffInMilliseconds = currentDate - givenDate;
      
      // Convert the difference into different time units
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      const diffInMonths = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
      const diffInYears = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));

      // Determine how to display the time difference
      if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
      } else if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
      } else if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
      } else {
        return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
      }
  }


    // Function to fetch news based on the selected tab (section)
    const fetchTopStories = async (section) => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        //const response1 = await axios.get( '/api/topstories');
        const response = await axios.get(`/api/topstories?section=${section}`);
        //console.log(response.data); 
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching topstories', error);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    };
  
    // Fetch topstories when activeTab changes
    useEffect(() => {
      if (typeof window !== "undefined") {  // Ensures this runs only on the client side
        fetchTopStories(activeTab);
      }
    }, [activeTab]);

  // Scroll animation effect
  useLayoutEffect(() => {
    const elements = document.querySelectorAll(".news-card");
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

  }, [articles]); // Runs once when the component mounts


  return (
     <>
      <div className="container">

            <div className="row">
                  <div className="col-12 mtop text-center">
                    <h1>Adstify Top Stories</h1>
                  </div>
              </div>

            {/* Tabs */}
            <div className="row mtop">
              <div className="tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={activeTab === tab ? 'tab active' : 'tab'}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} {/* Capitalize first letter */}
                  </button>
                ))}
              </div>  

              <div className="tab-dropdown">
                <select onChange={(e) => setActiveTab(e.target.value)} value={activeTab}>
                  {tabs.map((tab) => (
                    <option key={tab} value={tab}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">

              {loading ? (
                <p className="text-center">Loading...</p>  // Show loading message if loading is true
              ) : (
                articles.length === 0 ? (
                  <p className="text-center">No stories available</p> // Show message if no articles
                ) : (
                  // Render Top stories if present
                  articles.length > 0  && articles.map((article) => (
                    <div className="col-md-6 col-lg-4 news-card" key={article.url}>
                        <div className="card">
                              <div className="card-content">
                                 <a href={article.url} target="_blank" rel="noopener noreferrer"> 
                                 {article.multimedia && article.multimedia[1] ? (
                                      <Image
                                      className="img-fluid image"
                                      src={article.multimedia[1]['url']}
                                      alt={article.title}
                                      width={200}
                                      height={61}
                                      priority
                                    />
                                    ) : (
                                      <Image
                                      className="img-fluid image"
                                      src="https://static01.nyt.com/images/2024/10/16/crosswords/17wordle-review-art-1216/17wordle-review-art-1216-mediumThreeByTwo210.jpg"
                                      alt={article.title}
                                      width={200}
                                      height={61}
                                      priority
                                    />
                                    )}
                                       <h2 
                                        className="title"
                                        onMouseEnter={() => handleMouseEnter(article.abstract, article.url)}
                                        onMouseLeave={handleMouseLeave}
                                      >
                                        {article.title.length > 70 ? article.title.substring(0, 75) + '...' : article.title}
                                      </h2>
                                  </a>

                                   {/* Tooltip that will show based on state */}
                                   {tooltip.visible && tooltip.articleUrl === article.url && tooltip.content &&(
                                      <div className="tooltip">{tooltip.content}</div>
                                    )}
                                    
                                  <p>{article.byline ?  article.byline : 'By Anonymous'} - <span className="publishdate">{timeDifference(article.published_date)}</span></p>

                              </div>
                        </div>
                    </div>
                ))
                )
              )}     
               
            </div>

      </div>
    </>
  );
}

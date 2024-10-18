"use client" ; // Add this to use hooks

import Image from "next/image";
import { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // Default tab

  //tooltip to show short description - abstract
  const [tooltip, setTooltip] = useState({ visible: false, content: '', articleUrl: '' });

  const handleMouseEnter = (content, url) => {
    setTooltip({ visible: true, content, articleUrl: url });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: '', articleUrl: '' });
  };


  //arts, automobiles, books/review, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world

  const tabs = ['all', 'automobiles', 'business', 'science', 'sports', 'health', 'technology', 'politics', 'travel'];


  const timeDifferenceInHours = (dateString) => {
    // Convert the provided date string into a Date object
    const givenDate = new Date(dateString);
    
    // Get the current date and time
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const diffInMilliseconds = currentDate - givenDate;
    
    // Convert the difference from milliseconds to hours
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    
    // Return the result as a string, e.g., "15 hours ago"
    return `${diffInHours} hours ago`;
  }


    // Function to fetch news based on the selected tab (section)
    const fetchNews = async (section) => {
      try {
        //const response1 = await axios.get( '/api/news');
        const response = await axios.get(`/api/news?section=${section}`);
        //console.log(response.data); 
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching news', error);
      }
    };
  
    // Fetch news when activeTab changes
    useEffect(() => {
      if (typeof window !== "undefined") {  // Ensures this runs only on the client side
        fetchNews(activeTab);
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
                    <h1>Adstify News</h1>
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

                {/* Check if articles are not yet available and show Loading... */}
                {articles.length === 0 && <p className="text-center">Loading...</p>}

                {articles.length > 0  && articles.map((article) => (
                    <div className="col-md-6 col-lg-4 news-card" key={article.url}>
                        <div className="card">
                              <div className="card-content">
                                 <a href={article.url} target="_blank" rel="noopener noreferrer content"> 
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
                                   {tooltip.visible && tooltip.articleUrl === article.url &&  tooltip.content && (
                                      <div className="tooltip">{tooltip.content}</div>
                                    )}
 
                                  <p>{article.source ?  article.source : article.byline} - <span className="publishdate">{timeDifferenceInHours(article.published_date)}</span></p>

                              </div>
                        </div>
                    </div>
                ))}
            </div>

      </div>
    </>
  );
}

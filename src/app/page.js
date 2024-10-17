import styles from "./page.module.css";
import Link from 'next/link';
import Image from "next/image";

//import logo from './images/logo.png'; // Adjust the path to your images folder

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className="row">
          <div className="col-12 text-center">
            <h1>Welcome to Adstify</h1>
            <p>
            Adstify is a Global Performance Based Marketing Agency in Singapore. <br/>

            It was founded in 2015 by Erwin Li after discovering Programmatic Buying in the AdTech space. <br/>

            adstify has always pride itself in not taking any advertising spend from its client.<br/>

            With a humble journey of $3000 advertising budget of its own.  Now spending millions of advertising helping brands & partners to achieve their goals. <br/>

            Working with some of the big brands worldwide. adstify continues to grow and is well-known in the AdTech space. <br/>
            </p>
        </div>
      </div>


      <div className="row justify-content-center align-self-center">

        <div className="col-md-6 col-lg-4 mtop">
                <div className="card">
                    <div className="card-content">
                       <Image
                        className='img-fluid'
                        src="/images/logo.png"
                        alt="Adstify News"
                        width={180}
                        height={61}
                        priority
                      />

                        <h2>Adstify News</h2>
                        <p>
                          Stay updated with the latest breaking news, covering a wide range of topics from politics and business to science and technology. Adstify brings you real-time updates on global and local events.                        
                        </p>
                        <div className={`${styles.ctas} ${styles.mtop}`}>
                            <Link href="/news" className={styles.primary}>Latest News</Link>
                        </div>
                    </div>
                </div>
        </div>

        <div className="col-md-6 col-lg-4 mtop">
                <div className="card">
                    <div className="card-content">
                    <Image
                        className='img-fluid'
                        src="/images/logo.png"
                        alt="Adstify News"
                        width={180}
                        height={61}
                        priority
                      />                        
                      <h2>Adstify Top Stories</h2>
                        <p>
                          Explore the most trending and impactful stories of the day with Adstify Top Stories. Featuring top headlines and in-depth reporting, this section highlights the biggest news shaping the world today. 
                        </p>
                        <div className={`${styles.ctas} ${styles.mtop}`}>
                            <Link href="/topstories" className={styles.primary}>See Top Stories</Link>
                        </div>
                    </div>
                </div>
        </div>

        <div className="col-md-6 col-lg-4 mtop">
                <div className="card">
                    <div className="card-content">
                      <Image
                        className='img-fluid'
                        src="/images/logo.png"
                        alt="Adstify News"
                        width={180}
                        height={61}
                        priority
                      />                        
                      <h2>Adstify Weather</h2>
                        <p>
                            Stay updated with real-time weather information tailored to your location. Whether you're planning a trip, heading out for a jog, Adstify Weather is here to provide you with the latest forecasts.                        
                        </p>
                        <div className={`${styles.ctas} ${styles.mtop}`}>
                            <Link href="/weather" className={styles.primary}>Check Weather</Link>
                        </div>
                    </div>
                </div>
        </div>


        <div className="col-md-6 col-lg-4 mtop">
                <div className="card">
                    <div className="card-content">
                      <Image
                        className='img-fluid'
                        src="/images/logo.png"
                        alt="Adstify News"
                        width={180}
                        height={61}
                        priority
                      />                        
                      <h2>Adstify Random User</h2>
                        <p>
                            The Adstify Random User feature provides users with random profiles generated from publicly available data. This tool is ideal for testing, data visualization, or demonstration purposes where you need mock users to simulate real-world scenarios.                        
                        </p>
                        <div className={`${styles.ctas} ${styles.mtop}`}>
                            <Link href="/randomuser" className={styles.primary}>View Random User</Link>
                        </div>
                    </div>
                </div>
        </div>

      </div>

      
      </main>

    </div>
  );
}






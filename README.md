## Getting Started

## 1. Clone the Repository

On the target machine, clone the repository from GitHub:
```
git clone https://github.com/habeebmaraikar/adstifyapp.git 
```


### Navigate into the project directory:
```
 cd adstifyapp
```

## 2. Install Dependencies
```
    npm install
```

## 3. Run the Development Server

then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 4. Build and Run in Production Mode 
For production, you need to build the Next.js app and start it as a production server:

```
npm run build
```

Start the production server:

```
npm start
```

Access the app [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Upto above steps itself you can see the results. 


# Below steps if we want to deploy in any Public server 
## 1. Running on a Public Server (e.g., VPS) (Optional)

To run our app on a public server, you need to follow additional steps, such as configuring reverse proxy and setting up a process manager like PM2 to keep our app running. Here's how:

a) Install PM2:
PM2 is a process manager that will keep our app running in the background.

```
npm install pm2 -g
```

b) Run the app with PM2:

```
pm2 start npm --name "adstifyapp" -- start
```

c) Set up a Reverse Proxy with Nginx:
If you're deploying to a server, it’s recommended to set up Nginx as a reverse proxy to manage incoming requests to our Next.js app. First, install Nginx:

```
sudo apt install nginx
```


Configure Nginx to forward requests from port 80 to our Next.js app on port 3000. Add the following to your Nginx config:

```
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

After setting up Nginx, restart the service:

```
sudo systemctl restart nginx
```

## 2. Access the App
Once everything is set up, you can access the app via the server's IP or domain name at http://your-domain.com.




## API Keys are in
- `.env.local` file for development server
- `.env.production` file for production server


## API's Used
### Times Newswire API
- https://api.nytimes.com/svc/news/v3/content/all/${section}.json?api-key=${NYTIMES_API_KEY}

### Top Stories API
- https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYTIMES_API_KEY}

### Weather API 
- https://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${location}

### Random User API
- https://randomuser.me/api/?results=50


## Website Live link 

Access the app [https://adstifyapp.vercel.app/](https://adstifyapp.vercel.app/) with your browser to see the result.



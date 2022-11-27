# Jodelclone

This is a clone of the german social media plattform "Jodel" 

Please keep in mind that this is a hobby project for learning purposes and far from production ready. Bugs will be there. 

## How to run
For this project Docker and Node are needed

Install all node modules in `./server` and `./client`. 
This is only needed on the first run
``` bash
    cd server
    npm install
    cd ../client
    npm install
```
You need 3 terminals: 
### Database
``` bash
    cd server
    npm run start-db
```

### Node Server
``` bash
    cd server
    npm run start
```

### Frontend-Server
``` bash
    cd client
    npm start
```

After this the application can be used on http://localhost:3000/
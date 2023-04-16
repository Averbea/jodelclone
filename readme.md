# Jodelclone

This is a clone of the german social media plattform "Jodel" 

Please keep in mind that this is a hobby project for learning purposes and far from production ready.

## How to run
For this project **Docker** and **Node** are needed

Install all node modules in `./server` and `./client` with:
``` bash
    npm install
```
This is only needed on the first run


### Database
In `./server` run:
``` bash
    npm run start-db
```

### Node Server
in `./server` run:
``` bash
    npm run start
```

### Frontend-Server
in `./client` run:
``` bash
    npm start
```

After this the application can be used on http://localhost:3000/
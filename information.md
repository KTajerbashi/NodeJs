backend => docker run --name react-node-backend -p 5000:5000 -e MONGODB_URI="mongodb://host.docker.internal:27017/react-node-mongodb" -e JWT_SECRET="f1cc447c-42f8-4412-a044-edc2502ea7fb" react-node-backend

client => docker run --name react-frontend -p 3200:80 react-frontend
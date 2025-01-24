ways to run the project


1. project deployed on aws -http://51.20.96.82
:3000/
   note-mongodb is containerized in the ec2 instance so currently the mongodb does not hold any data , thats why currently enabling free access to login/signup

run locally  
setup instructions  
cd frontend  
npm i --legacy-peer-deps  
cd ..  
cd backend  
cd src  
npm install  
.env for backend .env file located at root directory backend/

MONGODB_URL= mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4  
DB_PASSWORD=6w3JO3NnmBSBMTPN  
PORT=8000  
ACCESS_WEB_TOKEN_SECRET=sadjfkejhrf329p84y5132489yr13fdnqewjk  
ACCESS_WEB_TOKEN_EXPIRY=2d  
REFRESH_WEB_TOKEN_SECRET=shuhamPHOGAT  
REFRESH_WEB_TOKEN_EXPIRY=10d  
BUCKET_NAME=msinteriors  
BUCKET_LOCATION=eu-north-1  
BUCKET_ACCESS_KEY=AKIA3M7ACRND2HRK5ORY  
BUCKET_SECRET_ACCESS_KEY=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

.env for frontend  
REACT_APP_BASE_BACKEND_URL = http://localhost:8000  
run this docker command 
To run MongoDB in Docker, use the following commands:
docker run -d --name mongodb-container -p 27017:27017  mongo  
docker exec -it <mongodbcontainer id> 
copy the mongo url and use it as connection string  


dark mode  
![Screenshot 2025-01-08 052456](https://github.com/user-attachments/assets/9ac763d1-15b2-467d-a0ff-753859b4fa05)  
![Screenshot 2025-01-08 075718](https://github.com/user-attachments/assets/010ab18e-2ff3-4c96-b43a-3315a3981a0f)  
![Screenshot 2025-01-08 075545](https://github.com/user-attachments/assets/ac01b7cf-725c-4f93-bc30-6ce19104870e)  
light theme  
![Screenshot 2025-01-08 052542 - Copy](https://github.com/user-attachments/assets/ce0b1dea-4766-430b-a7ed-3dcce36b6823)
![Screenshot 2025-01-08 052605](https://github.com/user-attachments/assets/04099898-e9c5-41c4-a8b0-df63aec78b49)  
added the page to search the book edit and delete it , added the DEBOUNCING technique and REGEX matching for search used s3 as image store
![Screenshot 2025-01-08 075824](https://github.com/user-attachments/assets/67cea1da-8a8e-40c1-89fb-a02f20921ab6)  
similarly added the search user page with their info  
![Screenshot 2025-01-08 080257](https://github.com/user-attachments/assets/8dc5c931-2505-457a-a91b-0aa46491461f)  
added the page which showa the user information which have due books  
![Screenshot 2025-01-08 080056](https://github.com/user-attachments/assets/2071c91a-0618-4901-a942-5262381f4ffb)

login/signup page  
![Screenshot 2025-01-08 052808](https://github.com/user-attachments/assets/17485ec1-4b49-4457-bbe2-6ccec8f02511)  
![Screenshot 2025-01-08 052840](https://github.com/user-attachments/assets/ced26c2b-af0f-43b9-92fc-900746890780)

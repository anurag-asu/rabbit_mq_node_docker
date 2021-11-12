# ECS265 NFT using Resilient DB

- Install docker in your system
- Clone repo
- Go to the working directory and run docker-compose up -d

Express app listens on the port 3000 and rabbitmq server runs on the posr 5673

To run Consumer Client, run:

g++ -std=c++11 test.cpp -L/usr/local/ssl/lib -lamqpcpp -lpthread -ldl -lSimpleAmqpClient -lssl -lcrypto -lSimpleAmqpClient -lboost_chrono -lboost_system -lrabbitmq -lrt -lssl

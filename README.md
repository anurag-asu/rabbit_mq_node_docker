# ECS265 NFT using Resilient DB

- Install docker in your system
- Clone repo. Run this command to install subodules: 
```git submodule update --init --recursive```
- Go to the working directory and run docker-compose up -d

Express app listens on the port 3000 and rabbitmq server runs on the posr 5673

Steps to setup and run Consumer Client:

- Install LibSSL Dev <br>
```sudo apt-get install libssl-dev```
- Run ldconfig to make sure that changes are reflected correctly.
- Commnad to execute the cpp <br>
```g++ -std=c++11 consumer_client.cpp -L/usr/local/ssl/lib -lamqpcpp -lpthread -ldl -lSimpleAmqpClient -lssl -lcrypto -lSimpleAmqpClient -lboost_chrono -lboost_system -lrabbitmq -lrt -lssl```

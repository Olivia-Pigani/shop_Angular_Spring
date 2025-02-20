# TechShop

This project is a e-commerce website specializing in high-tech products, from monitors to drones.
The front was made with Angular framework and the back was made with Spring Boot framework.

It contains some features such as: 

- Spring Security user authentication with JWT implementations.
- Expections handling with ControllerAdvice.
- Angular Signals state management.
- Angular Custom Pipes.
- Angular routes protection with authGuard.
 
<img src="./server/src/main/resources/homepage.png" alt="homepage view">

<hr>

<img src="./server/src/main/resources/basket.png" alt="basket view">

<hr>

## How to run this project ?

1. git clone the project
 ```
 https://github.com/Olivia-Pigani/shop_Angular_Spring.git
   
 ```

3. add this .env file at the root of the project and fill <?> placeholders.
You can generate a "JWT_SECRET_KEY" in terminal :

<img src="./server/src/main/resources/key generation.png" alt="secret key making view">

```
POSTGRES_USER=<?>
POSTGRES_PASSWORD=<?>
POSTGRES_PORT=5432
POSTGRES_DB_URL=jdbc:postgresql://localhost:5432/ecommerce

PGADMIN_DEFAULT_EMAIL=<?>
PGADMIN_DEFAULT_PASSWORD=<?>
PGADMIN_PORT=80

JWT_SECRET_KEY=<?> 
```

3. Run "docker compose up -d" at the docker-compose.yml location file

4. open "client" in Vs code, run "npm i" then "npm start", you can now go to http://localhost:4200/homepage

5. open "server" in an IDE like IntellJ, then, execute the code.

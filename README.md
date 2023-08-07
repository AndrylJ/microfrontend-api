# User admin API

## Initialization

1. Install dependencies
    ```bash
    npm i
    ```
2. Configure `.env` files

3. Run db container
    ```bash
    cd docker
    docker componse up --build -d
    ```

4. Run migrations
    ```bash
    npx prisma migrate dev
    ```

5. Run project
   ```bash
   npm run dev
   ```
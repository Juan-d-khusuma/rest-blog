# 🚀 Personal Blog Server 
<hr/>
## A RESTful API Backend For My (Hopefully Finished) Fullstack Blog App

### 🧪 Tech Stacks:
- Express, as the backend/server engine
- Prisma, as the ORM
- JWT as the main authentication method, using a refresh token implementation
- Other helper express middlewares

### 🚦 Routes
Path | Params | Response | Details
| :-: | :-: | :-: | :-: |
`/api/v1/` | - | - | Current root path
`auth/login` | `username: string` `password: string` | - | Routes for logging in user

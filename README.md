# chat-server
Node.js server application with user auth, chats (text, image share) using sockets

### Features checklist:
- [X] JWT Authorization 
- [X] Authentication
- [ ] Refresh JWT
- [ ] logger
- [ ] Socket connection
- [ ] Docker build
- [ ] Github Action CI/CD
- [ ] pagination

### Chat server functionalities:
1. Auth
2. List users
3. Start a chat with a user
4. Send images in chat

### How chat is going to work:
1. User logs in
2. on the left side users are listed
3. Clicks and chat opens 
    - makes a call to chat API with both users(username) involved
      - if chatId exits
        - get previous messages and display them
        - start a web socket connection
          - save every message to db
      - if chatId does not exist
        - start a web socket connection
          - save every message to db
   


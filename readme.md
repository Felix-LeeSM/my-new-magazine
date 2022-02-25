router.use(authorizeRouter)
router.use('/post', [postRouter, likeRouter]);
router.use('/login', loginRouter);
router.use('/register', [registerRouter]);
router.use('/comment', [commentRouter]);
router.use('/logout', logoutRouter);
router.use('/me', meRouter);

url

| url                    |  method  |                                         req                                          |                   res                   |
| ---------------------- | :------: | :----------------------------------------------------------------------------------: | :-------------------------------------: |
| /api/register          |  `POST`  | body: <br>{id, <br>nickname, <br>password, <br>confirmPassword, <br>profile_img_url} |       {success, <br>errorMessage}       |
| /api/login             |  `POST`  |                 header: <br>{token}<br>body: <br>{id, <br>password}                  |          {token, <br>success}           |
| /api/me                |  `GET`   |                                 header: <br>{token}                                  | {id, <br>nickname, <br>profile_img_url} |
|                        |          |                                                                                      |                                         |
| /api/post              |  `GET`   |                               header: <br>{token}<br>                                |          {success, <br>posts}           |
| /api/post/:postId      |  `GET`   |                               header: <br>{token}<br>                                |           {success, <br>post}           |
| /api/post              |  `POST`  |          header: <br>{token}<br>body: <br>{content, <br>img_url, <br>type}           |                {success}                |
| /api/post/:postId      |  `PUT`   |         header: <br>{token}<br> body: <br>{content, <br>img_url, , <br>type          |                {success}                |
| /api/post/:postId      | `DELETE` |                               header: <br>{token}<br>                                |                {success}                |
|                        |          |                                                                                      |                                         |
| /api/post/:postId/like |  `POST`  |                               header: <br>{token}<br>                                |                {success}                |
| /api/post/:postId/like | `DELETE` |                               header: <br>{token}<br>                                |                {success}                |
|                        |          |                                                                                      |                                         |
| /api/comment/:postId   |  `POST`  |                  header: <br>{token, <br>text}<br>body: <br>{text}                   |                {success}                |
| /api/comment/:postId   |  `PUT`   |                  header: <br>{token, <br>text}<br>body: <br>{text}                   |                {success}                |
| /api/comment/:postId   | `DELETE` |                               header: <br>{token}<br>                                |                {success}                |
|                        |

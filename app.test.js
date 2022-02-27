describe('running test offline', () => {
    const request = require('supertest');
    const { sequelize } = require('./models');
    const app = require('./app');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InF3ZXJAcXdlci5jb20iLCJpYXQiOjE2NDU4MTA2MjR9.tBR5gI5KQ2PEJdCTUp0UUY61YwtsB7DOnG0X2v9WGNI'
    beforeAll(async () => {
        sequelize.sync({ force: false })
            .then(() => {
                console.log('Database connected.');
            }).catch((err) => {
                console.error(err);
            });
    });

    describe('POST /api/register', () => {


        describe('given wrong factors, status should be 400', () => {
            test('nickname in password', (done) => {
                request(app).post('/api/register').send({
                    id: 'asdf@asdf.com',
                    password: 'asdfasdf',
                    confirmPassword: 'asdfasdf',
                    nickname: 'asdfasdf',
                    profile_img_url: 'akn.com'
                }).then((response) => {
                    expect(response.statusCode).toBe(400);
                    done();
                });
            });

            test('id not an email', (done) => {
                request(app).post('/api/register').send({
                    id: '1q2w3e4r',
                    password: 'asdfasdf',
                    confirmPassword: 'asdfasdf',
                    nickname: '146asf',
                    profile_img_url: 'akn.com'
                }).then((response) => {
                    expect(response.statusCode).toBe(400);
                    done();
                });
            });

            test('id required', (done) => {
                request(app).post('/api/register').send({
                    id: '',
                    password: 'asdfasdf',
                    confirmPassword: 'asdfasdf',
                    nickname: '146asf',
                    profile_img_url: 'akn.com'
                }).then((response) => {
                    expect(response.statusCode).toBe(400);
                    done();
                });
            });

            test('password required', (done) => {
                request(app).post('/api/register').send({
                    id: 'asdf@asdf.com',
                    password: 'asdfasdf',
                    confirmPassword: 'asdfasdf',
                    nickname: '146asf',
                    profile_img_url: 'akn.com'
                }).then((response) => {
                    expect(response.statusCode).toBe(400);
                    done();
                });
            });

            test('nickname required', () => {
                request(app).post('/api/register').send({
                    id: 'asdf@asdf.com',
                    password: 'asdfasdf',
                    confirmPassword: 'asdfasdf',
                    nickname: '',
                    profile_img_url: 'akn.com'
                }).then((response) => {
                    expect(response.statusCode).toBe(400);
                });
            });
        });

        describe('given factors that fit', () => {
            beforeAll(async () => {
                await request(app).post('/api/register').send({
                    id: 'qwer@qwer.com',
                    password: 'asdfasdf',
                    confirmPassword: 'qwerqwer',
                    nickname: '1q2w3e4r',
                    profile_img_url: 'akn.com'
                })
            })
            describe('given perfect factors', () => {
                test('given duplicated id', () => {
                    request(app).post('/api/register').send({
                        id: 'qwer@qwer.com',
                        password: 'asdfasdf',
                        confirmPassword: 'qwerqwer',
                        nickname: '1q2w3e4r',
                        profile_img_url: 'akn.com'
                    }).then((response) => {
                        expect(response.statusCode).toBe(400);
                    });
                });
            });
        });
    });



    describe('POST /api/login', () => {
        describe('Don`t login with wrong factors', () => {
            test('login with wrong id', async () => {
                const response = await request(app).post('/api/login').send({
                    id: 'asdf',
                    password: 'asdfasdf'
                });
                expect(response.statusCode).toBe(400);
            });

            test('login with wrong password', async () => {
                const response = await request(app).post('/api/login').send({
                    id: 'asdf@asdf.com',
                    password: 'asdf'
                });
                expect(response.statusCode).toBe(400);
            });

            test('login without anything', async () => {
                const response = await request(app).post('/api/login').send({
                    id: undefined,
                    password: undefined
                });
                expect(response.statusCode).toBe(400);
            });
        });

        describe('Login with factors that fit', () => {

            test('login with perfect id, pw', async () => {
                const response = await request(app).post('/api/login').send({
                    id: 'asdf@asdf.com',
                    password: 'asdfasdf'
                });
                expect(response.body.token).toBeDefined();
            });

        });
    });

    describe('POST /api/post', () => {
        describe('you`re posting wrong', () => {

            test('posting without authorization', () => {
                request(app).post('/api/post').send({
                    content: 'I want to post it!',
                    img_url: 'cute cat photo URL',
                    type: 2
                }).then(response => {
                    expect(response.statusCode).toBe(401);
                });
            });

            test('posting without writing content', () => {
                request(app).post('/api/post').send({
                    img_url: 'dog barking at me',
                    type: 3
                }).set('token', token)
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                    });
            });

            test('type counts!', () => {
                request(app).post('/api/post').send({
                    content: 'this one rocks',
                    img_url: 'dog barking at me'
                }).set('token', token)
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                    });
            });

            test('type must be a number between 1 and 3', () => {
                request(app).post('/api/post').send({
                    content: 'this one rocks',
                    img_url: 'dog barking at me',
                    type: 4
                }).set('token', token)
                    .then(response => {
                        expect(response.statusCode).toBe(400);
                    });

            });

        });

        describe('that`s actually a great post!', () => {

            test('you are posting it right!', () => {
                request(app).post('/api/post').send({
                    content: 'I want to post it!',
                    img_url: 'cute cat photo URL',
                    type: 2
                }).set('token', token)
                    .then(response => {
                        expect(response.success).toBe(true);
                    });

            });

            test('you are posting it right!', () => {
                request(app).post('/api/post').send({
                    content: 'I want to post it!',
                    img_url: 'cute cat photo URL',
                    type: 2
                }).set('token', token)
                    .then(response => {
                        expect(response.success).toBe(true);
                    });
            });

        });
    })
});

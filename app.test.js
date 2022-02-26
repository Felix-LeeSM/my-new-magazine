describe('running test offline', () => {
    const request = require('supertest');
    const { sequelize } = require('./models');
    const app = require('./app');

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
            describe('given perfect factors', () => {

                test('flawless input for register', async () => {
                    const response = await request(app).post('/api/register').send({
                        id: 'asdf@asdf.com',
                        password: 'asdfasdf',
                        confirmPassword: 'asdfasdf',
                        nickname: '1q2w3e4r',
                        profile_img_url: 'akn.com'
                    });
                    expect(response.statusCode).toBe(200);
                });

                test('given duplicated id', () => {
                    request(app).post('/api/register').send({
                        id: 'asdf@asdf.com',
                        password: 'asdfasdf',
                        confirmPassword: 'asdfasdf',
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

        })
    })
})
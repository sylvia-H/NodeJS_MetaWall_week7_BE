const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'MetaWall API',
    description: 'MetaWall 元宇宙社交圈 API 文件',
  },
  host: 'https://agile-badlands-31115.herokuapp.com',
  schemes: ['http', 'https'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'headers',
      name: 'authorization',
      description: '請加上 API Token',
    },
  },
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'X-API-KEY', // name of the header, query parameter or cookie
      description: "system administrators's access permission",
    },
  },
  definitions: {
    sign_up_Schema: {
      $name: 'NewUser',
      $email: 'test@gmail.com',
      $password: '12345678',
    },
    sign_in_Schema: {
      $email: 'test@gmail.com',
      $password: '12345678',
    },
    updatePassword_Schema: {
      $password: '12345678',
      $confirmPassword: '87654321',
    },
    updateProfile_Schema: {
      $name: 'OldUser',
      $sex: 'Female',
      avatar: 'https://i.imgur.com/K3dyy79.png',
    },
    getToken_Schema: {
      status: 'success',
      user: {
        token:
          'sfNhbGciOiWERzI1NiMsInR1cCI6IkpJKLH7.eyMmVRJ3HjYyYTQ1ODAxNTYzWPV3ODg2NGY3BTW6OCIsInJvbLSiOiJ1c4VyIiwiaWL0IjoxNjU0OTM3NjAxLCJleHAiOjE2NTU8NDI0MDF2.hoqeR8jfI2Wcwq38Fqdo0kW880Ud3QBxcnzBTWY1ppj',
        name: 'NewUser',
        role: 'user',
      },
    },
    getProfile_Schema: {
      status: true,
      data: {
        _id: '33b1561v5d02zz2bfr0d5506',
        name: 'NewUser',
        avatar: 'https://i.imgur.com/K3dyy79.png',
        role: 'user',
        sex: 'Female',
        createdAt: '2022-06-11T06:58:59.025Z',
        updatedAt: '2022-06-11T08:58:58.590Z',
      },
    },
    getUser_Schema: {
      status: true,
      data: [
        {
          role: 'user',
          _id: '33b1561v5d02zz2bfr0d5506',
          name: 'NewUser',
          avatar: 'https://i.imgur.com/K3dyy79.png',
          createdAt: '2022-06-02T13:30:27.204Z',
          updatedAt: '2022-06-02T13:30:27.204Z',
        },
      ],
    },
    getAllUsers_Schema: {
      status: true,
      data: [
        {
          role: 'user',
          _id: '33b1561v5d02zz2bfr0d5506',
          name: 'NewUser',
          avatar: 'https://i.imgur.com/K3dyy79.png',
          createdAt: '2022-06-02T13:30:27.204Z',
          updatedAt: '2022-06-02T13:30:27.204Z',
        },
        {
          role: 'user2',
          _id: '11b1561v5d02zz2bfr0d1132',
          name: 'NewUser',
          avatar: 'https://i.imgur.com/K3dyy79.png',
          createdAt: '2022-06-02T13:30:27.204Z',
          updatedAt: '2022-06-02T13:30:27.204Z',
        },
      ],
    },
    getPosts_Schema: {
      status: true,
      data: [
        {
          _id: '6298cd452f75e1bf5c347d55',
          author: {
            _id: '6298bdcc86d7d2a709c289e1',
            name: '波吉',
            avatar:
              'https://www.nj.com/resizer/iqV2J-QFgh0227ybHBor4exTVBk=/800x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
          },
          content: '我一定要成為很棒棒的國王！',
          tags: ['general'],
          image:
            'https://images.unsplash.com/photo-1499026008573-50eedca8407b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80',
          likes: 0,
          comments: [
            {
              _id: '6299d7788e41247531c5b899',
              articleID: '6298cd452f75e1bf5c347d55',
              author: '6298bb7386d7d2a709c289de',
              body: '加油～你可以的！',
              createdAt: '2022-06-03T09:42:16.882Z',
              updatedAt: '2022-06-03T09:42:16.882Z',
            },
          ],
          privacy: 'private',
          createdAt: '2022-06-02T14:46:29.020Z',
          updatedAt: '2022-06-03T10:16:29.092Z',
        },
      ],
    },
    createdPosts_Schema: {
      $content: '我一定要成為很棒棒的國王！',
      tags: ['general'],
      image:
        'https://images.unsplash.com/photo-1499026008573-50eedca8407b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80',
      privacy: 'private',
    },
    editPost_Schema: {
      $content: '各位我有一個作戰計畫...',
      tags: ['general'],
      image:
        'https://images.unsplash.com/photo-1500252185289-40ca85eb23a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
      privacy: 'public',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

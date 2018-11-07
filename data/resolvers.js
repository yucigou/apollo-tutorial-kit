// import { Author, View, FortuneCookie } from './connectors';

const resolvers = {
  Query: {
    author(_, args) {
    //   return Author.find({ where: args });
      return {
        id: 1,
        firstName: "Yuci",
        lastName: "Gou",
        posts: {
            id: 1,
            title: "Google",
            text: "Google is a good company"
        }
      }
    },
    allAuthors() {
      // return Author.findAll();
      return [{
        id: 1,
        firstName: "Yuci",
        lastName: "Gou"
      }, {
        id: 1,
        firstName: "Houen",
        lastName: "Gou"
      }]
    },
    getFortuneCookie() {
      // return FortuneCookie.getOne();
      return "Cache cookie"
    }
  },
  Author: {
    posts(author) {
      return [{
            id: 1,
            title: "EBI",
            text: "EBI is a good company"
        },{
            id: 2,
            title: "Google",
            text: "Google is a good company"
        }
          ]
    }
  },
  Post: {
    author(post) {
      return {
        id: 1,
        firstName: "Yuci",
        lastName: "Gou",
      }
    },
    views(post) {
      return 22
    }
  }
};

export default resolvers;
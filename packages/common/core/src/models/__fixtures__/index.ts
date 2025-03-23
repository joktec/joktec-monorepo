import { IBaseRequest, ICondition, IPopulate } from '../base.request';

enum Status {
  ACTIVE = 'active',
  DISABLE = 'disable',
}

class User {
  fullName: string;
  phone: string;
  email: string;
  age: number;
  status: Status;
}

class Comment {
  title: string;
  user: User;
  rate: number[];
  author: Author;
}

class Author {
  name: string;
  comments: Array<Comment>;
  comment: Comment;
}

class Post {
  title: string;
  author: Author;
  createdAt: Date;
  rate: number[];
}

const postPopulate: IPopulate<Post> = {
  author: {
    select: ['name', 'comment', 'comments'],
    match: {
      name: { $eq: '' },
    },
    populate: {
      comments: '*',
      comment: {
        select: ['user'],
        populate: {
          author: '*',
          user: {
            select: ['fullName'],
          },
        },
      },
    },
  },
};

const userCondition: ICondition<User> = {
  age: { $gte: 18 },
  phone: { $nin: ['0963333333', '0963333334'] },
  $or: [
    { status: Status.DISABLE },
    { status: { $in: [Status.ACTIVE, Status.DISABLE] } },
    { status: { $ne: Status.ACTIVE } },
  ],
};

const postCondition: ICondition<Post> = {
  title: { $begin: 'ABC' },
  author: {
    name: { $nil: false },
    comment: {
      title: {
        $not: { $begin: '' },
      },
    },
    comments: {
      title: { $not: { $end: 'XYZ' } },
      user: userCondition,
      rate: 1,
    },
  },
  createdAt: { $eq: null },
  // rate: { $in: [1, 2] },
  rate: { $size: 1 },
};

const postRequest: IBaseRequest<Post> = {
  select: ['title'],
  sort: {
    title: 'desc',
    createdAt: 'asc',
    author: {
      name: 'asc',
      comment: {
        title: 'desc',
      },
    },
  },
  condition: postCondition,
  populate: postPopulate,
};

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  publishedAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

export interface PostType {
  _id: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  categories: {
    title: string;
  }[];
  comments: Comment[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
  publishedAt: string;
}

export interface CategoryType {
  _id: string;
  _ref: string; // handle realtime
  title: string;
  description: string;
}

export interface ContactType {
  _id: string;
  title: string;
  body: [object];
}

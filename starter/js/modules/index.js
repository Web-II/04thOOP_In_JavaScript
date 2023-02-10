import Blog from "./Blog.js";
import GroupBlog from "./GroupBlog.js";

const ourGroupBlog = new GroupBlog(
  'Nafi Thiam',
  'Matthias Casse',
  'Bashir Abdi'
);
ourGroupBlog.addEntry('Running in Gent', 'Bashir Abdi');
console.log(ourGroupBlog.toString());

const woutsBlog = new Blog('Wout Van Aert');
woutsBlog.addEntry(
  'Work hard, you all can win 6 stages in the Tour De France!',
  woutsBlog.creator,
  'tour de france',
  'cycling'
);
woutsBlog.addEntry(
  'Focus and you can also win Milano-Sanremo and Strade Bianche in the one and the same year.'
);

console.log(woutsBlog.toString());

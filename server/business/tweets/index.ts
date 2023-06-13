import {TweetService} from "./tweet.service";
import {DatabaseTweetWriterAdapter} from "./adapters/database-tweet-writer.adapter";

export default TweetService(DatabaseTweetWriterAdapter());

import {TweetService} from "./tweet.service";
import {RestApiWriterAdapter} from "./adapter/rest-api-writer.adapter";

export default TweetService(RestApiWriterAdapter());

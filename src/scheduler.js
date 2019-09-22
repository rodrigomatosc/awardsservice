import SearchNewsInserts from './app/jobs/SearchNewsInserts';
import './database';

// SearchNewsInserts.start();
setInterval(SearchNewsInserts.start, 1000);

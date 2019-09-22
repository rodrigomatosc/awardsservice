import './database';
import Queue from './lib/Queue';
// import CollectedCoinsJob from './app/jobs/CollectedCoinsJob';

// CollectedCoinsJob.handle({ data: { users: [1] } });
Queue.processQueue();

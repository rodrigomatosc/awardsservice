import Bee from 'bee-queue';
import configRedis from '../config/redis';
import DeathsJob from '../app/jobs/DeathsJob';
import CollectedCoinsJob from '../app/jobs/CollectedCoinsJob';
import killedMonstersJob from '../app/jobs/killedMonstersJob';

const jobs = [CollectedCoinsJob, DeathsJob, killedMonstersJob];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: configRedis,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    console.time('Processo Queue');
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
    console.timeEnd('Processo Queue');
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();

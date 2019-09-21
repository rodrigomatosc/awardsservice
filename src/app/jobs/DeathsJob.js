import AwardsBase from './AwardsBase';

class DeathsJob extends AwardsBase {
  get key() {
    return 'teste';
  }

  async handle({ data }) {
    console.log('Deaths');
  }
}

export default new DeathsJob();

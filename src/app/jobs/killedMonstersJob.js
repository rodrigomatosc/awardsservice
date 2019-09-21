import AwardsBase from './AwardsBase';

class KilledMonstersJob extends AwardsBase {
  get key() {
    return 'teste';
  }

  async handle({ data }) {
    console.log('KilledMonsters');
  }
}

export default new KilledMonstersJob();

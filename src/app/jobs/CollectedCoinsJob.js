import AwardsBase from './AwardsBase';
import CollectedCoinSchema from '../schemas/ColletedConins';
import Award from '../models/Award';
import UserAward from '../models/UserAward';

class ColletedCoinsJob extends AwardsBase {
  get key() {
    return 'PROCESS_COLLECTED_COINS';
  }

  async handle({ data }) {
    const { users } = data;

    const usersSchema = await CollectedCoinSchema.find({
      user: { $in: users },
    });

    /**
     * Select * from awards inner join awar
     */

    usersSchema.forEach(userSchema => {
      const possiblesAwards = Award.findAll({
        where: {},
        include: [
          {
            model: UserAward,
          },
        ],
      });
    });

    console.log(usersSchema);
  }
}

export default new ColletedCoinsJob();

import AwardsBase from './AwardsBase';
import CollectedCoinSchema from '../schemas/ColletedConins';
import Award from '../models/Award';
import UserAward from '../models/UserAward';
import SubcategoryAward from '../models/SubcategoryAward';

const CATEGORIA_COINS = 1;

class ColletedCoinsJob extends AwardsBase {
  get key() {
    return 'PROCESS_COLLECTED_COINS';
  }

  handle = async ({ data }) => {
    const { users } = data;
    const usersSchemas = await CollectedCoinSchema.find({
      user: { $in: users },
    });

    usersSchemas.forEach(async userSchema => {
      const awards = await Award.findAll({
        where: {},
        include: [
          {
            model: UserAward,
            required: false,
            where: { user_id: userSchema.user },
          },
          {
            model: SubcategoryAward,
            required: true,
            where: { category_id: CATEGORIA_COINS },
          },
        ],
      });

      const awardsNotGain = awards.filter(award => {
        return award.UserAwards.length < 1;
      });

      this.prepare(awardsNotGain, userSchema.value);
      const result = this.result();
      result.forEach(async award => {
        await UserAward.create({
          awards_id: award.id,
          user_id: userSchema.user,
        });
      });
    });
  };
}

export default new ColletedCoinsJob();

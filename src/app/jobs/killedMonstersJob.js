import AwardsBase from './AwardsBase';
import KilledMonstersSchema from '../schemas/KilledMonsters';
import UserAward from '../models/UserAward';
import Award from '../models/Award';
import CategoryAward from '../models/CategoryAward';

const CATEGORIA_MONSTERS = 2;

class KilledMonstersJob extends AwardsBase {
  get key() {
    return 'PROCESS_KILLED_MONSTERS';
  }

  handle = async ({ data }) => {
    console.log(this.key);
    const { usersAndMonsters } = data;

    usersAndMonsters.forEach(async userAndMonster => {
      const awards = await Award.findAll({
        where: { monster_id: userAndMonster.monster },
        include: [
          {
            model: CategoryAward,
            required: true,
            where: { id: CATEGORIA_MONSTERS },
          },
          {
            model: UserAward,
            required: false,
            where: { user_id: userAndMonster.user },
          },
        ],
      });

      const userAndMonsterSchema = await KilledMonstersSchema.findOne({
        monster: userAndMonster.monster,
        user: userAndMonster.user,
      });

      const awardsNotGain = awards.filter(award => {
        return award.UserAwards.length < 1;
      });

      this.prepare(awardsNotGain, userAndMonsterSchema.value);
      const result = this.result();
      console.log(result);

      result.forEach(async award => {
        await UserAward.create({
          awards_id: award.id,
          user_id: userAndMonster.user,
        });
      });
    });
  };
}

export default new KilledMonstersJob();

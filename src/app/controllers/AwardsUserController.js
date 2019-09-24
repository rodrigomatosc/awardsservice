import Award from '../models/Award';
import CategoryAward from '../models/CategoryAward';
import UserAward from '../models/UserAward';

class AwardsUserController {
  async index(req, res) {
    console.log('veio');
    const { id } = req.params;

    const awards = await Award.findAll({
      where: {},
      // attributes: ['id', 'value'],
      include: [
        {
          model: CategoryAward,
          required: true,
          // where: { id: 3 },
          // attributes: [],
          group: [
            // 'id',
            // , 'name', 'description'
          ],
        },
        {
          model: UserAward,
          required: false,
          where: { user_id: id },
          // attributes: [],
          // group: ['id', 'user_id', 'awards_id'],
        },
      ],
      // group: [
      //   'Award.id',
      //   'Award.value',
      //   'CategoryAward.id',
      //   'CategoryAward.name',
      // ],
    });

    return res.json(awards);
  }
}

export default new AwardsUserController();

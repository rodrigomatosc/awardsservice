import Award from '../models/Award';
import SubcategoryAward from '../models/SubcategoryAward';
import CategoryAward from '../models/CategoryAward';
import UserAward from '../models/UserAward';

class AwardsUserController {
  async index(req, res) {
    console.log('veio');
    const { id } = req.params;

    const awards = await Award.findAll({
      where: {},
      include: [
        {
          model: SubcategoryAward,
          required: true,
          include: [
            {
              model: CategoryAward,
              required: true,
            },
          ],
        },
        {
          model: UserAward,
          required: false,
          where: { user_id: id },
        },
      ],
    });

    return res.json(awards);
  }
}

export default new AwardsUserController();

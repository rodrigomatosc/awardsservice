import Deaths from '../models/Deaths';

class DeadController {
  async store(req, res) {
    const { idUser } = req.body;
    console.log(idUser);
    const death = await Deaths.create({
      user_id: idUser,
    });

    return res.json(death);
  }
}

export default new DeadController();

import CollectedCoin from '../models/CollectedCoin';

class ColletedCoinController {
  async store(req, res) {
    const { idUser } = req.body;
    console.log(idUser);
    const colleted = await CollectedCoin.create({
      user_id: idUser,
      value: 10,
    });

    return res.json(colleted);
  }
}

export default new ColletedCoinController();

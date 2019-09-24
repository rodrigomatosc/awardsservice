import KilledMonster from '../models/KilledMonster';

class KillBowserController {
  async store(req, res) {
    const { idUser, idMonster } = req.body;
    console.log(idUser, idMonster);
    const kill = await KilledMonster.create({
      user_id: idUser,
      monster_id: idMonster,
    });

    return res.json(kill);
  }
}

export default new KillBowserController();

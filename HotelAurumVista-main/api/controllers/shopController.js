const shopModel = require('../models/shopModel');
const couponModel = require('../models/couponModel');

const getRewards = async (req, res) => {
  try {
    const rewards = await shopModel.getShop();
    res.status(200).json(rewards);
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt a jutalmak lekérésekor' });
  }
};

const redeemReward = async (req, res) => {
  const { rewardId } = req.body;
  const user = req.user;

  try {
    const rewards = await shopModel.getShop();
    const reward = rewards.find(r => r.id === parseInt(rewardId));

    if (!reward) {
      return res.status(404).json({ error: 'A jutalom nem található' });
    }

    if (user.points < reward.points) {
      return res.status(400).json({ error: 'Nincs elég pontod' });
    }

    await couponModel.updateUserPoints(user.id, reward.points);
    await couponModel.addCoupon(user.id, rewardId);

    user.points -= reward.points;

    res.status(200).json({
      success: true,
      message: 'Sikeres beváltás!',
      newPoints: user.points
    });
  } catch (err) {
    console.error('Hiba történt a beváltás során:', err);
    res.status(500).json({ error: 'Hiba történt a beváltás során' });
  }
};

module.exports = { getRewards, redeemReward };
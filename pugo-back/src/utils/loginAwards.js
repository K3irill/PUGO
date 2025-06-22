const { User } = require('../models')
const { updateUserTokens } = require('../services/userService')


const rewards = [5000, 10000, 15000, 20000, 30000, 40000, 50000];

function isSameDay(date1, date2) {
  
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

function isYesterday(lastDate, today) {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return isSameDay(lastDate, yesterday);
}

async function handleDailyLogin(user) {
  const now = new Date();
  const lastLogin = user.lastLoginAt ? new Date(user.lastLoginAt) : null;

  if (!lastLogin || !isSameDay(lastLogin, now)) {
    let newStreak;

    if (lastLogin && isYesterday(lastLogin, now)) {
 
      newStreak = user.loginStreak >= 7 ? 1 : user.loginStreak + 1;
    } else {
      
      newStreak = 1;
    }

    const reward = rewards[newStreak - 1]; 

    user.tokens = Number(user.tokens) + reward;
    user.loginStreak = newStreak;
    user.lastLoginAt = now;

    await user.save();

    return { reward, loginStreak: newStreak };
  }

  return null; 
}




const checkLoginAward = async (telegramId) => {
  if (!telegramId) {
    throw new Error('telegramId is required');
  }
  const user = await User.findOne({ where: { telegramId } })
  if (!user) {
    throw new Error('User not found')
  }
  const awardResult = await handleDailyLogin(user)
  return awardResult
}

module.exports = { checkLoginAward };

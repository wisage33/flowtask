import User from '../models/User.js'
import crypto from 'crypto'

export const TelegramAuth = async (req, res, next) => {
    const initData = req.body?.initData || req.query?.initData
    const {hash, ...data} = initData

    console.log(initData)

    const checkString = Object.keys(data)
        .map(k => `${k}=${data[k]}`)
        .sort()
        .join(`\n`)

    const secret = crypto.createHash('sha256')
        .update(process.env.TG_TOKEN)
        .digest()

    const hmac = crypto.createHmac('sha256', secret)
        .update(checkString)
        .digest('hex')

    if (hmac !== hash) {
        res.status(400).json({ error: 'Invalid hash'})
    }

    const user = data.user

    const dbUser = await User.findOne({ telegramId: user.id})

    if(!dbUser) {
        dbUser = await User.create({
            telegramId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            photoUrl: user.photo_url
        })
    }

    req.user = dbUser

    next();
}
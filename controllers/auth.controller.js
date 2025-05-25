import crypto from 'crypto'
import User from '../models/User.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

export const TelegramAuth = async (req, res) => {
    const { initData } = req.body
    // const initData = "user=%7B%22id%22%3A6075655377%2C%22first_name%22%3A%22pin%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22lodosb%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F5mjQ-5Ozhgt3Jq-eSyNxJphLabAvqtLJQ-KdAoMyLp6OURt1sTbd3c5INGXOiEEN.svg%22%7D&chat_instance=-2688561892202426043&chat_type=private&auth_date=1747760772&signature=Blk1DLDuHmsfwrM_S0UgGiXAKBxWdRk90bnndqOj0QJvPkVmieottXzdA2wnZlXKDZmTuMrijVv18iAElnlmAw&hash=d520b65050e01b0e3879b325dd885e427f3f0d63275dc8d3825af5b7129b8502"
    const params = new URLSearchParams(initData)
    const hash = params.get('hash')
    params.delete('hash')

    try {
        const dataCheckString = [...params.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => `${k}=${v}`)
            .join('\n')

        const secretKey = crypto.createHmac('sha256', 'WebAppData')
            .update(process.env.TG_TOKEN)
            .digest()

        const calculatedHash = crypto.createHmac('sha256', secretKey)
            .update(dataCheckString)
            .digest('hex')
            
        const user = JSON.parse(params.get('user'))

        if(calculatedHash !== hash) {
            return res.status(401).json({ error: "Invalid hash"})
        }

        let dbUser = await User.findOne({ telegramId: user.id})

        if(!dbUser) {
            dbUser = new User({
                telegramId: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                username: user.username,
                photoUrl: user.photo_url
            })
            await dbUser.save()
        }

        const token = jwt.sign({
            userId: dbUser._id,
            telegramId: dbUser.telegramId,
            username: dbUser.username,
            role: dbUser.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
        )

        res.json({ token, dbUser })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

};
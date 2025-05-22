import { json } from "express"
import User from "../models/User.js"

export const createUser = async (req, res) => {
    const user = req.user
    const dbUser = await User.findOne({ telegramId: user.id})

    if(!dbUser) {
        const newUser = new User({
            telegramId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            photoUrl: user.photo_url
        })

        await newUser.save()
        console.log(newUser)
        return res.json(newUser)
    }
    console.log(dbUser)
    res.json(dbUser)
}

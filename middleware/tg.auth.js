import crypto from 'crypto'

export const TelegramAuth = async (req, res, next) => {

    const { initData } = req.body

    const params = new URLSearchParams(initData)
    const hash = params.get('hash')
    params.delete('hash')

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

    if(calculatedHash !== hash) {
        return res.status(401).json({ error: "Invalid hash"})
    } else {
        console.log("Valid hash")
        return res.status(200).json({ message: "Valid hash"})
    }
    
};
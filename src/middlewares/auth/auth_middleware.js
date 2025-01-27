import jwt from 'jsonwebtoken'

export const authMiddleware = (req,res,next) => {
        const token = req.headers['authorization']?.split(' ')[1]
        if(!token) return res.status(401).json({message:'You must be log in'});

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,company) => {
            if(err){
                return res.status(400).json(err);
            }
            req.company = company;
            next();
        })
}
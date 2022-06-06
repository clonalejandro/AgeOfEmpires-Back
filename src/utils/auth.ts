import passport from 'passport'
import session from 'express-session'
import jwt from 'jsonwebtoken'
import { Strategy as localStrategy } from 'passport-local'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { query } from '../utils/sql'
import { compare } from '../utils/encrypt'

const passportLogin = () => {
    passport.use(
        'login',
        new localStrategy({ passReqToCallback: true }, (req, username, password, done) => {
            query('SELECT * FROM users where username = ?', [username])
                .then(({ 0: user }: any) => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' })
                    }
                    if (!compare(password, user.password)) {
                        return done(null, false, { message: 'Incorrect password.' })
                    }
                    return done(null, user)
                })
                .catch((err) => done(err))
        }),
    )
}

export default function setAuth(server: any) {
    server.use(session({ 
        secret: process.env.SESSION || 'keyboard cat', 
        resave: false, 
        saveUninitialized: true,
        cookie: {
            httpOnly:true,
            secure:true, 
            maxAge: 1000*60*60*24*7,  
            sameSite:'none',
          },
          proxy: true,
    }))
    server.use(passport.initialize())
    server.use(passport.session())

    passportLogin()

    passport.serializeUser((user: any, done: any) => done(null, user.id))
    passport.deserializeUser((id: any, done: any) =>
        query('SELECT * FROM users where id = ?', [id])
            .then(({ 0: user }: any) => done(null, user))
            .catch(done),
    )

    server.post(
        '/login',
        async (req: any, res: any, next: any) => {
            passport.authenticate(
                'login',
                async (err: any, user: any, info: any) => {
                    if (err || !user) {
                        return next(err)
                    }
                    
                    req.login(
                        user,
                        { session: false },
                        async (err: any) => {
                            if (err) {
                                return next(err)
                            }
                            const { id, username } = user
                            const token = jwt.sign({ id, username }, process.env.JWT_SECRET || 'secret')
                            return res.status(200).send({ token })
                        }
                    )
                }
            )(req, res, next)
        }
    )
    passport.use(
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
                secretOrKey: process.env.JWT_SECRET || 'secret',
            },
            (token: any, done: any) => {
                try {
                    return done(null, token)
                }
                catch (err) {
                    return done(err)
                }
            }
        )
    )
}

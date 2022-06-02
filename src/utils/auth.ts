import passport from 'passport'
import session from 'express-session'
import { Strategy } from 'passport-local'
import { query } from '../utils/sql'
import { compare } from '../utils/encrypt'

const passportLogin = () => {
    passport.use(
        'login',
        new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
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

const passportLogout = (server: any) =>
    server.get('/logout', (req: any, res: any) => req.logOut(() => res.status(200).send('Logged out successfully')))

export default function setAuth(server: any) {
    server.use(session({ secret: process.env.SESSION || 'keyboard cat', resave: false, saveUninitialized: false }))
    server.use(passport.initialize())
    server.use(passport.session())

    passportLogin()
    passportLogout(server)

    passport.serializeUser((user: any, done: any) => done(null, user.id))
    passport.deserializeUser((id: any, done: any) =>
        query('SELECT * FROM users where id = ?', [id])
            .then(({ 0: user }: any) => done(null, user))
            .catch(done),
    )

    server.post(
        '/login',
        passport.authenticate('login', {
            successMessage: 'Login success',
            failureMessage: 'Login failed',
            session: true,
        }),
        (req: any, res: any) => res.status(200).send(req.user),
    )
}

export function isAuth(req: any, res: any, next: any) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(403).send('Access denied')
}

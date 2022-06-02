import bcrypt from 'bcrypt'

export default function encrypt(word: string){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(word, salt)
}

export function compare(word: string, hash: string){
    return bcrypt.compareSync(word, hash)
}
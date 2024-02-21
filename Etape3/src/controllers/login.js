import {createHash} from "node:crypto"
import { sign } from 'jsonwebtoken'

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

export const addUser = async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    let user = users.find((u) => u.email === email)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        })
    } else {
        const newUser = { email, password: hashedPassword, role: role[Math.floor(Math.random() * role.length)] }
        users.push(newUser)
        res.status(201).send({
            message: "Utilisateur enregistré avec succès",
            user: newUser
        })
    }
}


export const loginUser = async function (req, res) {
    const { email, password } = req.body
    const user = users.find(u => u.email === email && u.password === createHash("sha256").update(password).digest().toString("hex"))

    if (!user) {
        res.status(401).send({
            message: "Utilisateur non-identifié"
        })
        return
    }

    const token = sign({ email: user.email, role: user.role }, 'secretKey', { algorithm: 'ES256' })
    res.status(200).send({ token })
}
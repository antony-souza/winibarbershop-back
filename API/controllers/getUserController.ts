import { User } from "../../schema/userSchema";

export async function GetUserAuth(req, res) {
    try {
        const userId = req.user.id; // ID do usuário autenticado
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
        }
        res.status(200).json({ success: true, user: { id: user._id, client: user.name } });
    } catch (err) {
        console.error('Error in GetUserAuth:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
 
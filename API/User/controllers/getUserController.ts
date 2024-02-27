export const GetUserAuth = async (req, res) => {
    try {
        const user = req.user; // Aqui você acessa o usuário autenticado
        if (!user) {
            return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error('Error in GetUserAuth:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

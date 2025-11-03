const db = require('../config/conexion_db');

class RolesController {
    async obtenerRoles(req, res) {
        try {
            const [roles] = await db.query('SELECT * FROM roles');
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener roles' });
        }
    }

    async obtenerRolPorId(req, res) {
        const { id } = req.params;
        try {
            const [rol] = await db.query('SELECT * FROM roles WHERE id_rol = ?', [id]);
            if (rol.length == 0) {
                return res.status(404).json({ error: 'Rol no encontrado' });
            }
            res.json(rol[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener rol' });
        }
    }

    async agregarRol(req, res) {
        const { nombre } = req.body;
        try {
            await db.query('INSERT INTO roles (nombre) VALUES (?)', [nombre]);
            res.json({ mensaje: 'Rol agregado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar rol' });
        }
    }

    async actualizarRol(req, res) {
        const { id } = req.params;
        const { nombre } = req.body;
        try {
            await db.query('UPDATE roles SET nombre = ? WHERE id_rol = ?', [nombre, id]);
            res.json({ mensaje: 'Rol actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar rol' });
        }
    }

    async eliminarRol(req, res) {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM roles WHERE id_rol = ?', [id]);
            res.json({ mensaje: 'Rol eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar rol' });
        }
    }
}

// Exportar la clase
module.exports = RolesController;
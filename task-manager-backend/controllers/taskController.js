const pool = require('../models/index');

exports.getAllTasks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, 'pending']);
        const newTask = {
            id: result.insertId,
            title,
            description,
            status: 'pending'
        };
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const [result] = await pool.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);
        if (result.affectedRows > 0) {
            res.json({ id, title, description, status });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
